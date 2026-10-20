# AtlasHub Web

AtlasHub Web is the browser workspace for operating an AtlasHub business. It brings finance, commerce, inventory,
people, logistics, accounting, compliance, reporting, and organization administration into one responsive
application.

The client is built with React, TypeScript, Vite, Tailwind CSS, shadcn-style primitives, TanStack Query, and a
feature-oriented Clean Architecture structure. Backend contracts are generated from the AtlasHub OpenAPI document.

## Current product status

The application is under active development. Routes are deliberately registered before every module is fully
implemented so navigation and product boundaries remain stable.

- **Implemented** means the screen has its own UI and application/data integration.
- **Designed** means the screen has a complete visual composition but still uses sample dashboard data.
- **Reserved** means the route and navigation entry exist, but the screen currently renders `PlaceholderPage`.

## Features

### Identity and onboarding

- Email/password sign-in with guarded guest and authenticated routes.
- Business registration and email verification, including verification-code resend.
- Invitation acceptance through `/invite/:token`.
- Product and team onboarding steps with a completion screen.
- Session refresh, sign-out, organization switching, and test/live environment switching.
- Authenticated user hydration from `GET /api/v1/me`.

### Business overview

The overview is a professional cross-module operating snapshot containing:

- balance, money-in, money-out, settlement, order, and shipment metrics;
- selectable cash-flow periods and chart visualization;
- items requiring attention;
- inventory urgency by outlet, including low-stock and out-of-stock items;
- commerce and logistics performance;
- recent business activity in the shared data-table pattern; and
- people, accounting, and compliance statistics.

The layout is implemented and responsive. Its dashboard values are currently presentation data; connect it to the
backend `GET /api/v1/analytics/overview` contract when the generated client is refreshed.

### Accounts

- List business accounts from `GET /api/v1/pay/accounts`.
- Multi-currency summary cards and client-side currency filtering.
- Account detail view with balance and account metadata.
- Account transaction history using the shared paginated table system.
- Create-account API integration is available in the feature application layer.

### Planned operating modules

Stable route trees and sidebar navigation are present for:

- Finance: transactions, charges, transfers, splits, settlements, billing, invoices, and cash flow.
- Commerce: products, orders, customers, point of sale, inventory, movements, purchase orders, and suppliers.
- People: employees, payroll, attendance, leave, loans, and payslips.
- Logistics: shipments, warehouses, stock transfers, returns, and shipping incentives.
- Insights and accounting: analytics, reports, chart of accounts, ledger, journals, receivables, payables, budgets,
  assets, invoices, and expenses.
- Administration: compliance, support, organization, outlets, team, roles, integrations, notifications, audit logs,
  API keys, webhooks, and security.

## Screens and routes

### Public and onboarding screens

| Route                  | Screen              |      Status | Purpose                                      |
| ---------------------- | ------------------- | ----------: | -------------------------------------------- |
| `/login`               | Login               | Implemented | Authenticate an existing user.               |
| `/register`            | Registration        | Implemented | Create a web account and begin verification. |
| `/auth/verify-email`   | Verify email        | Implemented | Verify or resend the registration code.      |
| `/invite/:token`       | Accept invitation   | Implemented | Join an organization from an invitation.     |
| `/onboarding/products` | Product setup       | Implemented | Configure the business product selection.    |
| `/onboarding/team`     | Team setup          | Implemented | Prepare the initial organization team.       |
| `/onboarding/complete` | Onboarding complete | Implemented | Confirm setup and enter the workspace.       |

### Authenticated workspace

| Area       | Routes                              |      Status | Details                                                                                  |
| ---------- | ----------------------------------- | ----------: | ---------------------------------------------------------------------------------------- |
| Overview   | `/dashboard`                        |    Designed | Cross-module metrics, charts, urgency cards, and activity table.                         |
| Accounts   | `/accounts`, `/accounts/:accountId` | Implemented | Account balances, currencies, details, and transactions.                                 |
| Finance    | `/finance/*`                        |    Reserved | Transactions, charges, transfers, splits, settlements, billing, invoices, and cash flow. |
| Commerce   | `/commerce/*`                       |    Reserved | Products, orders, customers, POS, and inventory workflows.                               |
| People     | `/hr/*`                             |    Reserved | Employees, attendance, leave, payroll, loans, and payslips.                              |
| Logistics  | `/logistics/*`                      |    Reserved | Shipments, warehouses, transfers, returns, and incentives.                               |
| Insights   | `/insights/*`                       |    Reserved | Analytics and business reports.                                                          |
| Accounting | `/accounting/*`                     |    Reserved | Ledger, journals, AR/AP, budgets, assets, expenses, and reports.                         |
| Compliance | `/compliance`                       |    Reserved | Business compliance status and actions.                                                  |
| Support    | `/support`                          |    Reserved | Support tickets and service assistance.                                                  |
| Settings   | `/settings/*`                       |    Reserved | Organization, outlets, access, integrations, audit, developer, and security settings.    |

The application uses a hash router, so deployed URLs appear as `/#/dashboard` and similar paths.

## Architecture

```text
src/
├── app/                    # Bootstrap, providers, guards, router, and application shell
├── constants/              # Route, API, and authentication constants
├── domains/                # Framework-independent entities, value objects, errors, and repository contracts
├── features/
│   └── <feature>/
│       ├── application/    # Queries, mutations, state, and handlers
│       ├── infrastructure/ # REST clients and repository implementations
│       └── presentation/
│           ├── pages/      # Route-level screens
│           ├── components/ # Feature compositions
│           └── widgets/    # Reusable visual units
└── shared/                 # API client, generated contracts, hooks, UI primitives, and composites
```

Dependency direction is presentation → application → domain. Infrastructure implements domain contracts; domain
code must not import React, Axios, generated transport types, or UI packages.

Tables follow the project convention: each feature table owns a folder containing its table component, a separate
column-definition file, and an index export. Generic pagination, loading, empty-state, and horizontal-scroll behavior
lives in `src/shared/composites/data-table`.

## API and real-time integration

- `VITE_API_BASE_URL` configures the REST API.
- `VITE_WS_BASE_URL` configures STOMP/WebSocket connectivity and defaults to `ws://localhost:3000/ws/`.
- Axios interceptors attach authentication and normalize API errors.
- TanStack Query owns server-state caching and invalidation.
- Zustand owns client/session workflow state.
- `src/shared/api/generated` contains generated OpenAPI transport contracts. Do not hand-edit generated files.
- WebSocket event routing is isolated under `src/shared/api/websocket`.

Generate a fresh client after backend contract changes:

```bash
pnpm exec openapi-ts
```

The generator reads `${VITE_API_BASE_URL}/v3/api-docs`.

## Getting started

Requirements:

- Node.js 22 or newer
- pnpm 10 or newer
- A running AtlasHub backend, or access to the deployed API

Create `.env` in the project root:

```dotenv
VITE_API_BASE_URL=https://api.atlashub.name.ng
VITE_WS_BASE_URL=wss://api.atlashub.name.ng/ws/
```

Install and run:

```bash
pnpm install
pnpm dev
```

## Quality commands

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm format
```

Run type checking, linting, and the production build before merging functional changes.

## UI system

- Tailwind CSS 4 provides design tokens and responsive styling.
- Shared primitives live in `src/shared/ui`; feature code should compose them instead of duplicating controls.
- Recharts powers dashboard data visualization.
- Oxanium is the product typeface.
- Light/dark theme behavior is provided through `next-themes`.
- Phosphor and Lucide supply interface icons.

## Development rules

- A feature owns its route pages, application logic, infrastructure adapter, and feature-specific UI.
- Pages compose; widgets render focused UI; neither should make raw Axios calls.
- Add routes through the centralized constants and route configuration.
- Derive organization and environment from the authenticated session, never from arbitrary form input.
- Keep backend-generated types at the transport boundary and map them into domain entities.
- Mark unfinished screens as placeholders in documentation and navigation reviews; do not present them as shipped.
