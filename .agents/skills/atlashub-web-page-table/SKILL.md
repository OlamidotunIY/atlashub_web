---
name: atlashub-web-page-table
description: Create an AtlasHub web page data table using the established Account feature structure, shared DataTable composite, separated columns, and feature-owned table component.
---

# AtlasHub Web Page Table

Use this skill when a routed AtlasHub web page needs a business data table. The Account feature is the structural reference.

## Structure

Create the table as a feature component, not inline in the page:

```text
src/features/<feature>/presentation/components/<resource>-table/
├── columns.tsx
├── <resource>-table.tsx
└── index.ts
```

- `columns.tsx` owns `createColumnHelper`, the typed row shape, rendering for every column, and column visibility IDs.
- `<resource>-table.tsx` owns `DataTable` configuration: data, loading/reload state, filters, search, empty state, column labels, and row selection callbacks.
- `index.ts` re-exports the table and columns.
- The page owns route-level data loading, mutations, and navigation. It composes the table; it does not define columns or recreate table behavior.
- Use presentation widgets only for reusable cell visuals such as status badges or formatted amounts. The table itself remains in `presentation/components`.

## Implementation rules

- Follow `features/account/presentation/components/accounts-table` and `account-transactions` before writing code.
- Use `DataTable` from `@/shared/composites/data-table`; do not write raw table markup for application data.
- Type columns with `createColumnHelper<DataTableFeatures, RowType>()`. Prefer the feature/domain response type rather than duplicating a second row model.
- Give each table a meaningful empty heading, description, and icon. Configure search/filter/reload only when the page supports them.
- Keep table-only mock data out of a production page table. Make the component accept data and state through props so the page can wire the endpoint later.

## Finish

Update parent barrels and page imports, then search for stale paths. Run `pnpm run typecheck` and `git diff --check` before committing.
