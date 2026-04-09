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

5. **`@theme inline` is the developer-facing utility API.** Only tokens that
   developers would reach for across multiple components belong here —
   system-wide surfaces, text colors, borders, radii. If a developer building
   a new component would naturally think "I need this value" without reading
   any existing component's code, it belongs in `@theme inline`.

   Tokens consumed by one or very few components, or used in CSS properties
   Tailwind doesn't map well (complex shadows, gradients, calculations),
   stay as direct `var()` references in component CSS. These are internal
   wiring, not shared vocabulary.

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

- Neutral primitives use **OKLCH** format (Tailwind-derived zinc scale).
- Other color ramps (amber, red, yellow, emerald, sky) currently use **hex**.
  This inconsistency is intentional for Phase 1. In Phase 2 (Style Dictionary),
  all primitives will be stored as hex in DTCG JSON and transformed to OKLCH
  for CSS output, hex for React Native / email.
- Six primitive color ramps: Neutral, Amber (Primary), Red, Yellow, Emerald, Sky
- Each ramp spans 10–11 steps
- Semantic tokens swap values between light and dark modes via
  `[data-app-color-scheme="dark"], .dark` attribute/class overrides in each token file.


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

Follow these steps in order when connecting a shadcn component to the token system. Also be mindful that we are using BaseUI for the components.

### 1. Compare token values against shadcn defaults FIRST

Before writing any token overrides, inspect shadcn's actual default styles for
the component (source CSS, not just docs). Our component tokens were created
without visual validation against a Figma reference. There will be cases where
shadcn's default value is more visually correct than what we have defined.

For each token property (color, spacing, radius, shadow, typography):
- Check what shadcn ships by default
- If our token produces a visually inferior result (too harsh, too tight,
  wrong contrast ratio), flag it before overriding
- Prefer adjusting the token value to match intent over forcing shadcn to
  use a token that doesn't look right

> The goal is to pass our design language into shadcn, not to fight it.
> If shadcn's default looks better, our token probably needs revisiting.

### 2. Structural changes are a last resort

Work strictly within the component's existing DOM structure and class API.
Do not restructure or wrap shadcn primitives unless every other option has
been exhausted. For interactive elements always check BaseUI documentation as well.

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

### 7. Validate tokens against ownership boundaries

Test each token against the authoring gate and boundary rules in
"Token Ownership & Boundary Rules." Flag uncertain tokens to Nikhil.

---

## Token Ownership & Boundary Rules

### What is a design decision?

A value choice that:
1. Expresses brand identity or UX intent (not structural mechanics)
2. Changes when theme, mode, tenant, or platform context changes —
   OR would need coordinated cross-component change if it evolved
3. Cannot be derived from a utility framework's defaults without losing intent
4. Would create visual inconsistency if developers made independent choices
   about it (the ambiguity test)

### Token authoring gate (run before creating any token)

Three sequential tests — stop at the first YES:
1. Does Tailwind handle this without a design decision? → NO TOKEN (Tailwind owns it)
2. Does a semantic token already express the intent? → USE SEMANTIC (no component token)
3. Is this a genuine component-specific themeable decision? → CREATE COMPONENT TOKEN

### Boundary rules — Universal (all platforms)

B1 — Brand identity tokens (colors, typography values, radii, shadows,
     elevation, motion) are consumed via semantic tokens. Every platform
     needs these.

B6 — When removing over-specified component tokens for brand values:
     replace with semantic-direct reference.

B7 — Semantic-direct pattern: Simple components whose only design
     decision is a color role consume semantic tokens via the
     @theme inline → Tailwind utility path. No component token
     alias layer is created.

B10 — CSS constants (transparent, solid, currentColor, inherit, etc.)
      don't warrant tokenization. Use CSS keywords directly.

B11 — Mobile component tokens are authored independently from web.
      Shared design decisions flow through primitives and semantics
      in the centralized repo; component tokens are platform-native
      and live in the platform repo.

### Boundary rules — Web-only (Tailwind + shadcn)

B2 — Component structure (padding, width, gap, sizing) is platform-local.
     On web, Tailwind and shadcn own these. No tokens needed.

B3 — Tailwind owns the application mechanism (utility classes).
     Our tokens own the values for brand-defining categories.
     For layout spacing, Tailwind owns both mechanism AND value
     (our spacing scale matches Tailwind's default — no override needed).

B4 — Border radius, color, typography, shadow values flow through
     @theme from our tokens into Tailwind utilities.

B5 — When removing over-specified component tokens for structural
     values: restore shadcn's original utility class, don't create
     a new token.

B8 — @theme inline rule: Alias tokens referencing other CSS variables
     require @theme inline to avoid double-var() output in TailwindCSS v4.

B9 — shadcn bridge rule: shadcn's own variables are internal to shadcn,
     redirected via bridge file, never used directly in our component
     tokens or JSX.

### Validation tests

**Over-specification test:** If a component defines tokens for a child
element that is itself a standalone component (e.g., Dialog defining
close-button tokens), the token is over-specified UNLESS the child's
appearance is truly coupled to the parent's design.

**Coupled test:** Does the child's appearance need to change when the
parent's design changes? If no → over-specified, remove.

**A token is justified when** it needs to differ between light/dark mode,
overrides a shadcn default that conflicts with our design language, or
encodes a brand decision (color, radius, typography) that must stay
consistent under theming.

**A token is over-specified when** it encodes implementation details
(keyframe stops, animation duration, transform values), duplicates what
Tailwind utilities handle idiomatically, or will never vary across modes
or themes.

Do not simplify or remove unilaterally. Flag uncertain tokens to Nikhil
with: what the token does, the simpler alternative, and what would be lost.

## Spacing Scale

Our spacing scale matches Tailwind's default (4px base).
- Web: Tailwind's built-in scale is used directly. No @theme override.
- Mobile/Other: Scale is tokenized in centralized repo as primitives,
  consumed via Style Dictionary transforms.
- Core sizes (per Uber Base pattern): 4, 8, 16, 24, 32, 48.

## Platform Distribution Model

| Touchpoint         | Dependency | Consumes                                                        | From                                                                    |
|--------------------|------------|-----------------------------------------------------------------|-------------------------------------------------------------------------|
| Web apps (AA/CC/PP)| Heavy      | Primitives + semantics + component tokens via @theme + CSS vars | App repo (component tokens) + centralized repo (primitives/semantics)   |
| React Native mobile| Heavy      | Primitives + semantics as TS constants + mobile component tokens| Centralized repo (Style Dictionary → TS) + mobile app repo              |
| .NET HTML          | Minimal    | Lightweight CSS file (colors, radii, spacing scale)             | Centralized repo (Style Dictionary → CSS)                               |
| Identity Server    | Minimal    | Same lightweight CSS file                                       | Centralized repo                                                        |
| Email templates    | Minimal    | Hardcoded inline values per documented scale                    | Documentation only                                                      |

## Component Validation Classifications

For each `var(--pcs-*)` reference in a `.tsx` file:
- KEEP — references a surviving token that passes the ownership boundary test
- REPLACE-TAILWIND — token was removed; restore shadcn's original Tailwind utility
- REPLACE-SEMANTIC — component token removed; wire directly to semantic token
- CRITICAL-FIX — references a token that no longer exists (runtime break)

For each hardcoded value or Tailwind utility:
- CORRECT — Tailwind utility for structural/layout value (B2 confirms this)
- WIRE-TO-TOKEN — hardcoded brand value that should reference a token

---

## Token Reuse and File Governance

### The default position: reuse before create

When wiring a new component, follow this sequence:

1. Identify which token family the component belongs to (inspect `tokens/`)
2. If the family file already covers the visual properties → wire directly
3. If the family file needs new tokens → add to the existing file
4. If no family fits → flag to Nikhil before creating a new file

You need a reason to CREATE a new token file.
You do not need a reason to REUSE an existing one.

---

## Text Color Hierarchy (two levels + states)
- text-default:     Primary text. Body copy, headings, labels.
- text-muted:       Secondary text. Descriptions, captions, metadata,
                    timestamps, placeholders, helper text.
- text-disabled:    Non-interactive text. WCAG-exempt. Signals
                    element cannot be acted upon.
- text-inverse:     Text on inverted surfaces.
- text-on-emphasis: Text on colored emphasis backgrounds (brand,
                    status).

Dropped: text-subtle (merged into text-muted). Two hierarchy
levels match shadcn's model and eliminate muted/subtle ambiguity.