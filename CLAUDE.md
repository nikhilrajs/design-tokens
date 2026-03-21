# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start Vite dev server with HMR
yarn build      # TypeScript compile + Vite production build
yarn lint       # ESLint across the entire project
yarn preview    # Preview the production build locally
```

No test runner is configured in this project.

## Architecture

This is a **design token and component showcase app** — a living demo of a design system built with React 19, TypeScript, Vite, and Tailwind CSS 4.

### Design Token System

The core of the project lives in `src/styles/tokens/`. All design tokens are CSS custom properties in the **oklch() color space**, organized into per-component-category files:

- `tokens.css` — core primitives (colors, spacing, radius, shadows)
- `tokens-button.css`, `tokens-input-field.css`, etc. — component-scoped tokens
- `src/styles/globals.css` — base reset/defaults
- `src/styles/shadcn-bridge.css` — bridges shadcn's expected CSS variable names to the custom token system
- `src/styles/index.css` — imports everything together; this is the stylesheet entry point

Light and dark themes are expressed as separate custom property values within the same token files.

### Component Layer

- **`src/components/ui/`** — 22+ reusable components built on [Base UI](https://base-ui.com) primitives, styled with `class-variance-authority` (CVA). These are the tokenized components.
- **`src/components/`** — Layout-level components: `app-sidebar.tsx`, `nav-main.tsx`, `nav-projects.tsx`, `nav-user.tsx`, `team-switcher.tsx`.
- **`src/features/`** — Showcase pages (`buttons.tsx`, `inputs.tsx`, `feedback.tsx`) that demonstrate the UI components in context.

### App Shell

`App.tsx` uses a `SidebarProvider` + `SidebarInset` layout pattern with `AppSidebar` for navigation. The main content area is a tabbed interface cycling through the feature showcase pages.

### Utilities and Aliases

- `src/lib/utils.ts` exports `cn()` — a `clsx` + `tailwind-merge` class-name helper used throughout all components.
- Path alias `@/*` → `src/*` is configured in `tsconfig.json` and respected by Vite.
- shadcn/ui is configured in `components.json` (style: `base-nova`, base color: `zinc`, icons: `lucide`).
