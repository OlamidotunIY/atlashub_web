# Atlas Web integration with the dedicated Atlas Storefront Portal

**Status:** Proposed integration specification only. No frontend routing, backend identity or storefront code is implemented by this document.

## Main decision — avoid duplicated dashboards

Atlas Web remains the **merchant business operations** app for commerce, POS, inventory, orders, payments, HR, accounting, analytics and general organization administration. It is not responsible for running a complete storefront marketplace or full storefront management dashboard.

The **dedicated Atlas Storefront Portal** is a new application in the existing [atlashub_storefront monorepo](https://github.com/OlamidotunIY/atlashub_storefront), alongside the Node/TypeScript management backend, React theme SDK, creator CLI, build workers and Cloudflare hosting packages. No separate storefront backend repository is required.

### Atlas Web merchant experience
1. Add a Storefront navigation entry and relevant marketplace recommendation cards within existing dashboard/commerce screens, subject to business entitlement and policy.
2. Clicking a suggested theme opens a canonical allowed **portal listing URL** with public theme ID, while retaining safe return navigation context if needed. The theme marketplace, theme purchases, installation, settings, domains, previews, publishing and rollback live **only in the Storefront Portal**.
3. If merchant already signed into Atlas Hub, portal should appear signed in via **central Atlas Hub SSO** (new OIDC Authorization Code + PKCE/BFF capability must be implemented, not assumed to exist). Browser gets portal-specific secured session.
4. Merchant explicitly selects their authorized organization/storefront there. Java backend validates membership, role, entitlements and any country/provider restrictions. Do not trust org IDs attached to recommendation URLs for authorization.
5. Once the public storefront is published, return to Atlas Web for ongoing products, orders and inventory; data automatically appears in the storefront via Java-approved public commerce APIs. Merchant does not manage two independent sets of products.

### Separate creator experience
Independent developers should not need a registered business to design and publish templates. Creator accounts live in same central Atlas Hub identity and Storefront Portal creator workspace; code writing happens via Vite/React scaffold and CLI. A user who belongs to a business and is a creator can switch workspaces in Portal. Atlas Web does not need a template-creator administration sidebar.

## Existing codebase touchpoints (confirmed by static GitHub inspection)

- `src/app/router/route.tsx` uses `createHashRouter`.
- `src/app/router/routes/merchant.routes.tsx` owns protected merchant routes and existing placeholders.
- `src/app/shell/main/sidebar/SidebarNavigation.tsx` owns business navigation.
- `src/features/dashboard/presentation/pages/dashboard-overview.page.tsx` provides business overview.
- `src/features/authentication/` handles existing session/login behavior; current workflow is not proof of implemented cross-application OIDC SSO.
- `src/constants/routes.constants.ts` defines merchant routes.

Expected future implementation: add a Storefront navigation/deep-link configuration under routes/constants and perhaps recommendations in dashboard or commerce. Keep URLs via explicit allowlisted configuration; avoid open redirects and public OAuth tokens. Do not add a second marketplace client or merchant theme settings feature here.

## SSO and origin boundary

Atlas Web may have its own authenticated session. The Portal **must** initiate a separately validated authentication exchange through central Atlas Hub identity (OIDC Authorization Code + PKCE or secure backend-for-frontend), allowing automatic sign-in **only when the central identity session exists**. Never copy JWT out of Atlas Web localStorage, expose bearer tokens through query/hash redirect fragments, grant tenant authority based on theme deep link, or share merchant admin cookies with arbitrary customer custom domains.

SSO technical design requires changes to Java auth and the Portal session backend; not simply sharing an application hostname. Logout, suspended identity, expired org membership and role changes must invalidate permissions across apps.

## Repository ownership and API contracts

- [Java backend](https://github.com/OlamidotunIY/atlashub_backend): identity, authorization, purchase/entitlement, public product/catalog/price/stock/order/checkout, provider routing.
- [Storefront monorepo](https://github.com/OlamidotunIY/atlashub_storefront): Portal (merchant+creator), metadata API, SDK/CLI, staging/build/approval, isolated Cloudflare Workers for Platforms execution, R2 asset metadata, Cloudflare for SaaS domains.
- Atlas Web (this repository): business operations and launch points for portal.

Canonical cross-project docs:
- [Storefront architecture](https://github.com/OlamidotunIY/atlashub_storefront/blob/main/docs/architecture/system.md)
- [Portal SSO and workspaces](https://github.com/OlamidotunIY/atlashub_storefront/blob/main/docs/architecture/portal-identity.md)
- [Java/TypeScript contract](https://github.com/OlamidotunIY/atlashub_storefront/blob/main/docs/contracts/platform-apis.md)
- [Runtime/security model](https://github.com/OlamidotunIY/atlashub_storefront/blob/main/docs/architecture/runtime-hosting.md)

## Integration acceptance tests

- Merchant signed in to Atlas Web can follow allowed theme deep link and complete Portal SSO without password prompt *when central IdP session valid*.
- Expired/revoked session requires authentication; link cannot pass a bearer token or impersonate organization.
- Independent creator can use Portal creator workspace without Atlas Web merchant onboarding.
- Merchant theme purchase/install/domain/publish stays in Portal; no duplicate configuration or product catalog synchronization.
- Changes to Java-authoritative catalog/stock/order data reflect on active storefront through scoped SDK/cache invalidation.
- Browser origin/cookie boundaries protect customer storefront from merchant admin cookies.
