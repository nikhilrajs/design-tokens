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

This is a **design token and component showcase app** — the reference implementation of the Proteus2 design system, built with React 19, TypeScript, Vite, and Tailwind CSS 4. Other projects copy components and token files from here; this project is the canonical source.

### Design Token System

The core of the project lives in `src/styles/tokens/`. All design tokens are CSS custom properties, organized into per-component-category files:

- `tokens.css` — Tier 1 primitives (colors, spacing, radius, shadows) + Tier 2 semantic tokens
- `tokens-button.css`, `tokens-input-field.css`, etc. — Tier 3 component-scoped tokens
- `src/styles/globals.css` — stylesheet entry point: imports all tokens, owns the `@theme inline` block, base styles
- `src/styles/shadcn-bridge.css` — maps shadcn's expected CSS variable names to our semantic tokens

Color modes are expressed as attribute-selector overrides within each token file (see Color Modes section below).

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


## Design Token Architecture

### Three-tier system
```
Tier 1 — Primitives     (raw values: colors, spacing scale, etc.)       → @proteus2/shared-ui
    ↓
Tier 2 — Semantic       (intent: color-background, color-text-error)    → @proteus2/shared-ui
    ↓
Tier 3 — Component      (scoped: button-primary-bg, input-border-focus) → local to each project
```

### Architecture boundary rules

1. **`tokens.css` is the Style Dictionary candidate.** It contains only
   Tier 1 primitives and Tier 2 semantic tokens. It will eventually be
   published as `@proteus2/shared-ui` via npm.

2. **Component token files (`tokens-*.css`) are permanently local** to each
   web project. They are NEVER published to the shared npm package. Each
   project owns and copies its component tokens manually (shadcn/ui
   copy-paste philosophy extended to tokens).

3. **`globals.css` owns the `@theme inline` block exclusively.** It is the
   single authority for Tailwind utility token registrations. Import order:
```css
   @import 'tailwindcss';
   @import './tokens/tokens.css';        /* Tier 1+2 */
   @import './tokens/tokens-button.css'; /* Tier 3 */
   /* ... other component token files */
   @import './shadcn-bridge.css';        /* shadcn compat — always last */
```

4. **`shadcn-bridge.css` only contains `:root` and `.dark` CSS custom property
   mappings.** It has NO `@theme inline` block. `globals.css` is the sole
   `@theme inline` owner. The bridge maps shadcn's variable names (`--primary`,
   `--muted`, etc.) to our semantic tokens so shadcn components render correctly
   without modification.

5. **Not all tokens flow through shadcn or Tailwind.** Extended tokens
   (role surfaces, interactive states) are consumed directly via `var()`
   in component CSS or inline styles. Do not force everything through
   Tailwind utility classes.

### @theme vs @theme inline — CRITICAL RULE

Use **`@theme inline`** when a token value references another CSS variable
(i.e., the token is an alias). Use plain **`@theme`** for static/literal values.

**Why this matters:** Plain `@theme` with a CSS variable alias produces an
invalid double-`var()` construct in Tailwind v4 output.
```css
/* CORRECT — token references another CSS var → use @theme inline */
@theme inline {
  --color-background: var(--color-bg-default);
  --color-primary: var(--color-brand-primary);
}

/* CORRECT — token is a literal value → use plain @theme */
@theme {
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
}
```

Per Adam Wathan's guidance: split the blocks by token type. Never mix
alias tokens and literal tokens in the same `@theme` block.

### @theme inline block scope

The `@theme inline` block in `globals.css` is a **curated subset** of
semantic tokens — only tokens that developers use as Tailwind utility classes
in JSX. It is NOT a full mirror of `tokens.css`. It also includes the
shadcn-specific utility names (`--color-card`, `--color-muted`, etc.) so
shadcn components can use Tailwind utilities like `bg-card`, `text-muted-foreground`.

### shadcn-bridge.css

Maps shadcn's 28 CSS variable names to our semantic tokens. Contains only
`:root` and `.dark` blocks — no `@theme inline`.

```css
/* shadcn expects --background, --foreground, --primary, etc. */
/* We map them to our semantic tokens instead of defining values directly */
:root {
  --background: var(--color-background);
  --foreground: var(--color-text-default);
  --primary:    var(--color-primary-emphasis);
  /* ... all 28 shadcn vars */
}
```

The `.dark` block in the bridge re-declares the same semantic token mappings.
The actual dark values come from the `[data-app-color-scheme="dark"]` overrides
in each token file — the bridge just ensures shadcn's `.dark` class resolves
to our tokens regardless of which mechanism triggers it.

When adding a new color mode, add a corresponding class block to `shadcn-bridge.css`:
```css
.high-contrast-dark {
  --background: var(--color-background); /* value comes from token file override */
  /* ... same 28 mappings, values unchanged */
}
```

### Color system

- Neutral primitives use **OKLCH** format (Tailwind-derived slate scale).
- Other color ramps (amber, red, yellow, emerald, sky) currently use **hex**.
  This inconsistency is intentional for Phase 1. In Phase 2 (Style Dictionary),
  all primitives will be stored as hex in DTCG JSON and transformed to OKLCH
  for CSS output, hex for React Native / email.
- Six primitive color ramps: Neutral, Amber (Primary), Red, Yellow, Emerald, Sky
- Each ramp spans 10–11 steps
- Semantic tokens swap values between light and dark modes via
  `[data-app-color-scheme="dark"]` attribute overrides in each token file.


### Color modes and multi-tenant theming

Color mode and tenant are set as `data-*` attributes on `<html>`:

```js
// Runtime toggle — set BOTH (attribute drives token values, class drives shadcn internals)
document.documentElement.setAttribute('data-app-color-scheme', 'dark')
document.documentElement.classList.add('dark')

document.documentElement.setAttribute('data-app-tenant', 'tenant1')
```

The CSS cascade handles the rest — no local overrides needed per project.
Specificity stacks naturally:

```css
:root { }                                                        /* 0,1,0 base light      */
:root[data-app-color-scheme="dark"] { }                          /* 0,2,0 dark override   */
:root[data-app-tenant="tenant1"] { }                             /* 0,2,0 tenant brand    */
:root[data-app-tenant="tenant1"][data-app-color-scheme="dark"] { } /* 0,3,0 tenant + dark */
```

This architecture scales to additional color modes (high-contrast-light,
high-contrast-dark, etc.) by adding more entries to the Style Dictionary
`colorSchemes` array and corresponding JSON files. No structural changes needed.

Use the **direct mapping approach** in tenant token files: set shadcn variable
names directly. Do not add a two-layer indirection system.


### Style Dictionary / npm package (future)

- Package name: `@proteus2/shared-ui`
- Source format: DTCG JSON (hex color values)
- Phase 1: `tokens.css` ships as-is (hand-crafted CSS custom properties)
- Phase 2: Style Dictionary transforms DTCG JSON → platform outputs:
  - CSS: hex → OKLCH transform for web/Tailwind
  - SCSS: for styled-components / vanilla-extract projects
  - JS/TS: typed token constants for React Native
  - React Native will need custom transforms for OKLCH → hex and px → dp/sp
- SD output variable names must match the existing `tokens.css` names exactly
  (e.g. DTCG `color.primary.emphasis` → CSS `--color-primary-emphasis`)
- Component token files (`tokens-*.css`) NEVER migrate to Style Dictionary
- This showcase project is the **reference implementation** — other projects
  copy `src/components/ui/` and `src/styles/tokens/tokens-*.css` from here


## Wiring Up a shadcn Component with Tokens

Follow these steps in order when connecting a shadcn component to the token system. Also be mindful that we are using BaseUI for the components. For interactive elements always check BaseUI documentation as well.

### 1. Compare token values against shadcn defaults FIRST

Before writing any token overrides, inspect shadcn's actual default styles for
the component (source CSS, not just docs). Our component tokens were created
without visual validation against a Figma reference. There will be cases where
shadcn's default value is more visually correct than what we have defined.

For each token property (color, spacing, radius, shadow, typography):
- Check what shadcn ships by default
- Check what our token resolves to in OKLCH → hex
- If our token produces a visually inferior result (too harsh, too tight,
  wrong contrast ratio), flag it before overriding
- Prefer adjusting the token value to match intent over forcing shadcn to
  use a token that doesn't look right

> The goal is to pass our design language into shadcn, not to fight it.
> If shadcn's default looks better, our token probably needs revisiting.

### 2. Structural changes are a last resort

Work strictly within the component's existing DOM structure and class API.
Do not restructure or wrap shadcn primitives unless every other option has
been exhausted.

Acceptable approaches (in order of preference):
1. CSS custom property override via token file
2. Tailwind utility class addition via `className` prop
3. CSS targeting the existing element/selector
4. Wrapping with a styled container (not the component itself)
5. ⚠️ Structural change — only if none of the above work, and only after
   flagging to Nikhil

Reason: shadcn is a copy-paste architecture. Structural changes break the
upgrade path and create maintenance debt across all three projects.

### 3. Tokens must not change component behaviour

Tokens carry visual design only. If applying a token changes how a component
behaves (interaction, focus, visibility, layout flow, accessibility), stop
and reassess the token.

Check explicitly:
- Focus ring still visible and WCAG-compliant after token application
- Hover/active/disabled states still function and are visually distinct
- Component is keyboard-navigable as Radix/shadcn intends
- ARIA attributes and roles are unaffected
- Animation/transition timing is not broken by token overrides

### 4. Add to the showcase page after wiring

Once tokens are applied and visually validated (see step 5), add the component
to the showcase page.
- If the component belongs to an existing category → add as a new card under
  that category's tab
- If it is a new category → add a new tab

### 5. Visual review before committing

Do not commit or push until a visual review pass is complete. This is
especially important given the absence of a Figma reference.

Visual review checklist:
- [ ] Light mode: component looks intentional, not accidental
- [ ] Dark mode: component is legible, contrast is sufficient
- [ ] All interactive states: default, hover, focus, active, disabled
- [ ] Tokens produce visually coherent results alongside adjacent components
- [ ] No jarring contrast jumps compared to shadcn's defaults
- [ ] Spot-check in both Chromium and Firefox

Only after this review should you run `git commit` and `git push`.

### 6. Audit all comments in component and token files

Before committing, read every comment in the component file and its
corresponding token file critically.

Remove or rewrite comments that:
- State the obvious (`/* sets the background color */`)
- Are stale or no longer accurate
- Were copied from shadcn source and no longer apply
- Are TODO/FIXME items that have already been resolved

Keep comments that:
- Explain a non-obvious decision ("using inline here because value is an alias")
- Document a known quirk or workaround
- Clarify why a token deviates from shadcn's default

### 7. Flag unused and questionable tokens

After wiring is complete, review the component's token file for:
- Tokens defined but not referenced anywhere in the component
- Tokens that duplicate a semantic token already available in `tokens.css`
- Tokens whose resolved value does not match their name's intent
  (e.g., `--badge-border-radius` resolving to `0` when badges clearly
  have a pill shape in the UI)
- Tokens that exist only because they were copy-pasted from another
  component's file and never cleaned up

Do not silently remove uncertain tokens. Highlight them to Nikhil with a
brief reason. He decides whether they are removed, corrected, or kept.

### 8. Validate token granularity — avoid over-specification

Some component token files were created by reasoning through possibilities
rather than working from actual implementation. This can lead to over-specified
token sets where a simple Tailwind utility class or a single semantic token
would be the more appropriate solution.

When reviewing a token file, ask for each token:
> "Is this token doing something a Tailwind utility class or a semantic token
> could not do on its own?"

If the answer is no — it is a candidate for simplification.

**Signs of over-specification:**
- Multiple tokens for what is essentially one visual property
  (e.g., `--skeleton-bg`, `--skeleton-shimmer-start`, `--skeleton-shimmer-end`,
  `--skeleton-shimmer-speed` when shadcn/Tailwind handles the animation
  with a single `animate-pulse` class)
- Variant tokens for things Tailwind already handles idiomatically
  (`--skeleton-shape-square`, `--skeleton-shape-circle` when `rounded-full`
  and `rounded-none` are the idiomatic Tailwind approach)
- Implementation detail tokens — tokens that encode how something works
  rather than what it looks like (keyframe stops, animation duration,
  transform values)
- Tokens that will always be a constant and will never need to differ
  between light/dark mode, themes, or component variants

**Signs that specificity is justified:**
- The value genuinely needs to differ between light and dark mode
- The value is reused across multiple components and benefits from a
  single source of truth
- The value is part of the brand/design language (color, radius, typography)
  that needs to stay consistent under theming
- The value overrides a shadcn default that conflicts with our design language

**The balance to find:**
Do not over-simplify either. Collapsing tokens that genuinely need to be
independently adjustable creates a different problem — you end up with
magic numbers scattered in component files that are hard to track and
impossible to theme.

When in doubt, flag the specific tokens to Nikhil with a brief note:
- What the token currently does
- What the simpler alternative would be (Tailwind class, semantic token,
  or inline value)
- What would be lost by simplifying

Do not simplify unilaterally. The decision belongs to Nikhil.

## Token Reuse and File Governance

### The default position: reuse before create

When wiring a new component, the first question is always:
> "Does a token file already exist that covers this component's
> visual properties?"

You need a reason to CREATE a new token file.
You do not need a reason to REUSE an existing one.

If a component belongs to an established family (see below), wire
it to that family's token file. Do not create a new token file for
it under any circumstances unless it is genuinely a new visual
category with no overlap with any existing family.

If you believe a new token file is warranted, stop and flag it to
Nikhil with:
- Which existing family files you considered
- Why none of them cover this component's needs
- What the new file would contain that does not already exist

---

### Established token families

These are the confirmed token families derived from the actual
codebase. Every new component should be mapped to one of these
before any token work begins.

**Form inputs** → `tokens-input-field.css`
input, textarea, input-group, label, field, native-select,
and any future field-like element (date picker, search input,
number input, OTP input)

**Selection controls** → `tokens-checkbox-radio-switch-toggle.css`
checkbox, radio-group, toggle, toggle-group,
and any future binary or multi-select control

**Overlays** → `tokens-overlays.css`
dialog, sheet, tooltip, popover, hover-card, alert-dialog,
and any future floating or modal surface

**Menus** → `tokens-menus.css`
dropdown-menu, select, context-menu, menubar, combobox,
and any future trigger-and-panel or command surface

**Feedback** → `tokens-feedback.css`
alert, toast, empty state,
and any future inline message, banner, or status pattern

**Navigation** → `tokens-breadcrumb-pagination.css`
breadcrumb, pagination,
and any future wayfinding or paging component

**Containment** → `tokens-card-accordion-collapsible-scrollarea-slider.css`
card, collapsible, scroll-area,
accordion and slider when their components are built

**Buttons** → `tokens-button.css`
button, button-group

**Utility group** → `tokens-avatar-skeleton-spinner-separator-kbd.css`
avatar, skeleton, spinner, separator, kbd

**Standalone files** (justified by complexity or distinct identity)
- `tokens-badge.css` — badge
- `tokens-tabs.css` — tabs
- `tokens-sidebar.css` — sidebar

---

### New component wiring checklist

Before writing a single token, answer these in order:

1. Which family does this component belong to?
   → Identify the family file from the list above

2. Does the family file already have tokens that cover this
   component's visual properties?
   → If yes, wire to those tokens directly. Do not add new ones.

3. Does the family file need new tokens to cover this component?
   → If yes, add them to the existing family file.
   → Do not create a new file.

4. Is this component genuinely a new visual category with no
   overlap with any existing family?
   → If yes, flag to Nikhil before creating anything.

---

### Known family mappings for unwired components

The following components are installed and ready to wire. Their
token homes are already confirmed — no new token files needed:

| Component | Wire to |
|---|---|
| alert-dialog | tokens-overlays.css |
| context-menu | tokens-menus.css |
| menubar | tokens-menus.css |
| combobox | tokens-menus.css |
| pagination | tokens-breadcrumb-pagination.css |
| native-select | tokens-input-field.css |
| field | tokens-input-field.css |
| kbd | tokens-avatar-skeleton-spinner-separator-kbd.css |
| collapsible | tokens-card-accordion-collapsible-scrollarea-slider.css |

---

### Token granularity rules

**Before adding any new token to a family file, ask all three:**

1. Does this value need to change per theme, tenant, or color
   scheme — or must it stay consistent across multiple components
   in this family?
   → If neither: use a Tailwind utility class directly

2. Does a semantic token in tokens.css already express this intent?
   → If yes: use var(--pcs-semantic-token) directly in the
   component. Do not create a component token that just aliases it.

3. Does this component token add specific meaning beyond what the
   semantic token name already communicates?
   → If no: it is a redundant pass-through. Do not add it.

Only if a token passes at least one of these tests is it worth
adding to the family file.

**Signs of over-specification (do not add these):**
- Multiple tokens for what is one visual property
- Variant tokens for things Tailwind handles idiomatically
  (e.g., rounded-full vs rounded-none for shape variants)
- Implementation detail tokens — tokens that encode how something
  works rather than what it looks like (keyframe stops, animation
  timing, transform values)
- Tokens that will always be a constant and never differ between
  themes, modes, or variants

The skeleton component is the canonical example of over-
specification in this codebase. Use it as the reference for
what not to do.

**Signs that a new token is justified:**
- The value needs to differ between light and dark mode
- The value is reused across multiple components in the same family
- The value is part of the brand/design language (color, radius,
  typography) that must stay consistent under theming
- The value overrides a shadcn default that conflicts with our
  design language

When in doubt, flag the candidate token to Nikhil with a one-line
reason. Do not add it unilaterally.

## Deferred Components

### Table — Pending component selection

TanStack Table is under evaluation. Author tokens at implementation time;
apply ownership boundaries before defining.

Known design decisions to carry forward:
- Action column width: 80px (content-driven, outside spacing scale)
- Selected row bg: `--pcs-color-primary-subtle`
- Header font-weight: semibold (via `--pcs-primitive-font-weight-semibold`)
