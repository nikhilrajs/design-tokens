# Proteus Design Token System — Developer Documentation

> **Version:** 1.0 — Post Phase 1 Audit
> **Stack:** React · TypeScript · TailwindCSS v4 · shadcn/ui · Base UI
> **Namespace:** `--pcs-*`
> **Token Guardian:** The role responsible for owning the token source of truth,
> reviewing authoring requests, enforcing boundary rules, and signing off on
> design decisions. Raise all token requests to the Token Guardian before
> proceeding with any addition, modification, or structural change.

---

## Table of Contents

1. [Token Architecture Overview](#1-token-architecture-overview)
2. [Naming Convention Guide](#2-naming-convention-guide)
3. [Developer Consumption Guide](#3-developer-consumption-guide)
4. [Token Authoring Guide](#4-token-authoring-guide)
5. [Common Mistakes & Worked Examples](#5-common-mistakes--worked-examples)
6. [Governance Protocol](#6-governance-protocol)

---

## 1. Token Architecture Overview

### 1.1 The Three-Tier Model

All design tokens in the Proteus system are CSS custom properties organised
into three tiers. Each tier has a distinct purpose and a defined owner.

```
Tier 1 — Primitives
  Raw values with no semantic meaning.
  Examples: --pcs-primitive-color-neutral-900, --pcs-primitive-radius-md
  Owner: centralized repo (@proteus/shared-ui)
      ↓
Tier 2 — Semantic Tokens
  Intent-named aliases over primitives. These are what components consume.
  Examples: --pcs-color-text-default, --pcs-color-error-background, --pcs-radius-lg
  Owner: centralized repo (@proteus/shared-ui)
      ↓
Tier 3 — Component Tokens
  Scoped design decisions that cannot be expressed by a semantic token alone.
  Examples: --pcs-button-primary-bg, --pcs-input-border-focus
  Owner: each app repo (never published to shared-ui)
```

The critical rule: **components consume Tier 2 (semantic) tokens directly
wherever possible. Tier 3 tokens are created only when a genuine
component-specific design decision exists that no semantic token expresses.**

---

### 1.2 What Lives Where

#### Centralised Repo (`@proteus/shared-ui`)

- All Tier 1 primitive tokens (color ramps, spacing scale, radius, shadow,
  border width primitives)
- All Tier 2 semantic tokens (color intent, surface hierarchy, feedback states,
  focus, overlay, z-index)
- Tenant brand overrides (applied via `data-app-tenant` attribute on `<html>`)
- Dark mode overrides (applied via `data-app-color-scheme="dark"` on `<html>`)

**Component tokens are never published here.** Each project owns and copies
its own component token files (shadcn/ui copy-paste philosophy extended to tokens).

#### App Repo (AB / CC / CP)

- Component token files (`tokens-*.css`) — one file per component family
- `globals.css` — stylesheet entry point; owns the `@theme inline` block exclusively
- `shadcn-bridge.css` — maps shadcn's internal variable names to our semantic tokens

---

### 1.3 File Structure and Import Order

```
src/styles/
├── globals.css                                    ← Entry point. @theme inline lives here only.
├── shadcn-bridge.css                              ← shadcn compat. Always imported last.
└── tokens/
    ├── tokens.css                                 ← Tier 1 + Tier 2 (Style Dictionary candidate)
    ├── tokens-button.css                          ← Tier 3: button component tokens
    ├── tokens-input-field.css                     ← Tier 3: input component tokens
    └── tokens-[component-family].css              ← Tier 3: one file per family
```

Import order in `globals.css` is mandatory and must not change:

```css
@import 'tailwindcss';
@import './tokens/tokens.css';                     /* Tier 1 + 2 */
@import './tokens/tokens-button.css';              /* Tier 3 */
/* ... other component token files */
@import './shadcn-bridge.css';                     /* Always last */
```

---

### 1.4 How Web Consumption Works

Tier 2 (semantic) tokens enter Tailwind's utility system via the
`@theme inline` block in `globals.css`. This is the developer-facing API
for utility classes.

```css
/* globals.css — @theme inline maps our semantic tokens to Tailwind utilities */
@theme inline {
  --color-background:      var(--pcs-color-background);
  --color-foreground:      var(--pcs-color-text-default);
  --color-primary:         var(--pcs-color-primary-emphasis);
  --color-error:           var(--pcs-color-error-emphasis);
  --radius-lg:             var(--pcs-radius-lg);
  --shadow-md:             var(--pcs-shadow-md);
  /* ... */
}
```

This allows developers to write standard Tailwind utilities in JSX:

```tsx
// Tailwind utility — powered by our semantic token behind the scenes
<div className="bg-background text-foreground rounded-lg shadow-md" />
```

Component tokens are NOT registered in `@theme inline`. They are consumed
via Tailwind's arbitrary value syntax:

```tsx
// Component token — used only inside the component that owns it
<button className="bg-[var(--pcs-button-primary-bg)]" />
```

**`@theme inline` is a curated subset**, not a full mirror of the token file.
Only tokens that developers would naturally reach for across multiple
components belong here.

> **Why `@theme inline` and not `@theme`?**
> In TailwindCSS v4, `@theme` with a CSS variable alias produces an invalid
> double-`var()` in the compiled output. All alias tokens (tokens whose value
> references another CSS variable) must use `@theme inline`.

---

### 1.5 The `shadcn-bridge.css` Contract

shadcn/ui components expect a specific set of CSS variables (`--primary`,
`--muted`, `--destructive`, etc.). Rather than overriding our tokens to
match shadcn's names, the bridge file maps shadcn's names to our semantic tokens:

```css
/* shadcn-bridge.css */
:root {
  --primary:     var(--pcs-color-primary-emphasis);
  --destructive: var(--pcs-color-error-emphasis);
  --muted:       var(--pcs-color-surface-muted);
  /* ... */
}
```

**Rules:**
- `shadcn-bridge.css` contains only `:root` and `.dark` mappings.
- It has no `@theme inline` block — `globals.css` is the sole owner.
- Never use shadcn's variable names (`--primary`, `--muted`) directly in
  your component tokens or JSX. Always use our `--pcs-*` names.

---

### 1.6 Platform Distribution Model

The centralized repo is the single source of truth for Tier 1 and Tier 2
tokens. Each platform receives a transformed output suited to its runtime.

| Platform             | Dependency | What It Consumes                                                          | Source                                                         |
|----------------------|------------|---------------------------------------------------------------------------|----------------------------------------------------------------|
| Web (AB / CC / CP)   | Heavy      | Primitives + semantics via `@theme inline`; component tokens via `var()` | Centralized repo (T1+T2) + app repo (T3)                       |
| React Native mobile  | Heavy      | Primitives + semantics as TypeScript constants; mobile component tokens   | Centralized repo (Style Dictionary → TS) + mobile app repo     |
| .NET HTML            | Minimal    | Lightweight CSS (colors, radii, spacing scale)                            | Centralized repo (Style Dictionary → CSS)                      |
| Identity Server      | Minimal    | Same lightweight CSS file                                                 | Centralized repo                                               |
| Email templates      | Minimal    | Hardcoded inline values per documented scale                              | Documentation only — no runtime token file                     |

**Key point for React Native developers:** You do not consume CSS custom
properties. Style Dictionary transforms the same DTCG-format JSON source
into typed TypeScript constants. Component tokens are authored independently
per platform — they are never shared from the web token files.

---

### 1.7 Color Mode and Multi-Tenant Architecture

Color mode and tenant are set as data attributes on the `<html>` element
at runtime. The CSS cascade handles the rest — no per-component overrides
are needed.

```js
// Set color mode
document.documentElement.setAttribute('data-app-color-scheme', 'dark');
document.documentElement.classList.add('dark'); // Required for shadcn internals

// Set tenant
document.documentElement.setAttribute('data-app-tenant', 'tenant1');
```

Specificity stacks naturally across contexts:

```css
:root { }                                                         /* base light      */
:root[data-app-color-scheme="dark"] { }                           /* dark override   */
:root[data-app-tenant="tenant1"] { }                              /* tenant brand    */
:root[data-app-tenant="tenant1"][data-app-color-scheme="dark"] {} /* tenant + dark   */
```

Primitives never change between modes. Only Tier 2 semantic tokens
are overridden in dark mode — primitives stay fixed.

---

### 1.8 Current Phase vs. Target State

| Aspect                  | Phase 1 (current)                            | Phase 2 (target)                                  |
|-------------------------|----------------------------------------------|---------------------------------------------------|
| Token source            | Hand-crafted `tokens.css` in app repo        | DTCG JSON in centralized repo                     |
| Distribution            | Copied manually between projects             | Published as `@proteus/shared-ui` npm package    |
| `@theme inline` owner   | `globals.css` in each app repo               | `tailwind-theme.css` in the package               |
| Color format            | OKLCH (neutral) + hex (other ramps)          | DTCG hex → Style Dictionary → OKLCH for web       |
| React Native tokens     | Not yet established                          | Style Dictionary → typed TS constants             |

The import swap in Phase 2 is a single block in `globals.css`. Component
token imports remain local and are unaffected by the migration.

---

## 2. Naming Convention Guide

### 2.1 The Base Pattern

All tokens in the Proteus system follow a single hierarchical pattern:

```
--pcs-[tier-prefix]-[category]-[property]-[variant]-[state]
       └─ namespace  └─ tier    └─ intent   └─ scale   └─ interaction
```

Not every segment is present in every token — segments are included only
when they add meaningful disambiguation. The minimum is:

```
--pcs-[category]-[property]
```

---

### 2.2 The `--pcs-` Namespace

Every token in this system is prefixed with `--pcs-`. This prefix:
- Prevents collisions with Tailwind's own CSS variables, shadcn variables,
  and any third-party library
- Makes token provenance immediately identifiable in any codebase
- Is the first thing to check when reviewing whether a variable belongs
  to our system

If you see a CSS variable without `--pcs-`, it is either a Tailwind internal,
a shadcn variable, or something that does not belong in our token files.

---

### 2.3 Tier-Specific Prefixes

The tier a token belongs to is encoded in its name:

| Tier       | Prefix after `--pcs-`     | Example                                    |
|------------|---------------------------|--------------------------------------------|
| Tier 1     | `primitive-`              | `--pcs-primitive-color-neutral-900`        |
| Tier 2     | *(no prefix)*             | `--pcs-color-text-default`                 |
| Tier 3     | `[component-name]-`       | `--pcs-button-primary-bg`                  |

**Tier 1 always starts with `primitive-`.** This is the clearest boundary
signal in the system — if you see `primitive-`, the token is a raw value and
should never be consumed directly in a component.

**Tier 2 has no tier prefix** — the category segment follows the namespace
directly. This makes semantic tokens the most concise, which is intentional:
they are the most-reached-for tier.

**Tier 3 starts with the component name** — this scopes the token to its
owner and makes file organisation obvious.

---

### 2.4 Tier 1 — Primitive Naming

```
--pcs-primitive-[type]-[ramp]-[step]
                  └─ color / space / radius / shadow / border-width / font-*
```

**Examples:**

```css
--pcs-primitive-color-neutral-900     /* Zinc-900 from the neutral ramp   */
--pcs-primitive-color-brand-500       /* Mid-point of the amber/brand ramp */
--pcs-primitive-color-red-600         /* Error-family red                  */
--pcs-primitive-space-4               /* 16px — matches Tailwind's space-4 */
--pcs-primitive-radius-lg             /* 8px border radius                 */
--pcs-primitive-shadow-md             /* Standard card shadow              */
--pcs-primitive-font-weight-semibold  /* 600                               */
```

**Color ramps** (six total):

| Ramp name  | Role                        | Format (Phase 1)  |
|------------|-----------------------------|-------------------|
| `neutral`  | Greys (Zinc scale)          | OKLCH             |
| `brand`    | Primary / Amber             | OKLCH             |
| `red`      | Error / destructive         | OKLCH             |
| `yellow`   | Warning                     | OKLCH             |
| `emerald`  | Success                     | OKLCH             |
| `sky`      | Info / informational        | OKLCH             |

> **Phase 2 note:** In Phase 2 all ramps will be stored as hex in DTCG JSON
> and transformed to OKLCH for CSS output. Do not reference hex values directly
> in component code.

**Step naming:** Color ramp steps follow the numeric Tailwind scale
(50, 100, 200 … 900, 950). Spacing steps mirror Tailwind's spacing scale
(0, px, 0.5, 1, 1.5, 2 … 16). Do not invent step names.

**Never consume Tier 1 tokens in components.** They have no semantic meaning
and will not respond to theme or tenant overrides.

---

### 2.5 Tier 2 — Semantic Naming

```
--pcs-[category]-[property]-[variant]
```

Semantic tokens are named by **intent**, not by visual appearance.

**Correct:** `--pcs-color-text-error` (intent: text that signals an error)
**Wrong:** `--pcs-color-text-red` (appearance: red text)

**Recognised semantic categories:**

| Category       | Covers                                              | Example tokens                                                     |
|----------------|-----------------------------------------------------|--------------------------------------------------------------------|
| `color`        | All colour roles: surface, text, border, icon, state, feedback | `--pcs-color-background`, `--pcs-color-text-muted`    |
| `radius`       | Border radius scale                                 | `--pcs-radius-lg`, `--pcs-radius-full`                             |
| `shadow`       | Elevation shadows                                   | `--pcs-shadow-md`, `--pcs-shadow-xl`                               |
| `size`         | Named sizes (avatar, icon)                          | `--pcs-size-avatar-md`, `--pcs-size-icon-lg`                       |
| `z`            | Z-index layers                                      | `--pcs-z-modal`, `--pcs-z-toast`                                   |
| `focus-ring`   | Focus ring dimensions (two-word category)           | `--pcs-focus-ring-width`, `--pcs-focus-ring-offset`                |
| `border-width` | Named border width scale                            | `--pcs-border-width-default`, `--pcs-border-width-thick`           |

**Colour sub-categories** (within `--pcs-color-*`):

| Sub-category  | Intent                                             | Example                              |
|---------------|----------------------------------------------------|--------------------------------------|
| `background`  | Page-level background                              | `--pcs-color-background`             |
| `surface`     | Elevated surfaces (card, muted, overlay, sidebar)  | `--pcs-color-surface-card`           |
| `border`      | Borders and dividers                               | `--pcs-color-border-default`         |
| `text`        | Text roles (default, muted, disabled, inverse)     | `--pcs-color-text-muted`             |
| `icon`        | Icon colour roles                                  | `--pcs-color-icon-default`           |
| `primary`     | Brand/primary interactive colour                   | `--pcs-color-primary-emphasis`       |
| `state`       | Interaction state overlays (hover, selected)       | `--pcs-color-state-hover`            |
| `focus-ring`  | Focus indicator colour                             | `--pcs-color-focus-ring`             |
| `overlay`     | Scrim and backdrop                                 | `--pcs-color-overlay`                |
| `success`     | Success feedback                                   | `--pcs-color-success-background`     |
| `error`       | Error / destructive feedback                       | `--pcs-color-error-border`           |
| `warning`     | Warning feedback                                   | `--pcs-color-warning-text`           |
| `info`        | Informational feedback                             | `--pcs-color-info-icon`              |

**Text colour hierarchy:**

```
--pcs-color-text-default     Primary text — body copy, headings, labels
--pcs-color-text-muted       Secondary text — captions, metadata, placeholders
--pcs-color-text-disabled    Non-interactive text
--pcs-color-text-inverse     Text on inverted surfaces
--pcs-color-text-on-emphasis Text on filled/emphasis backgrounds (e.g. primary button label)
```

> **Naming asymmetry — documented and accepted:** The neutral text family
> groups by role first, then variant: `--pcs-color-text-muted`.
> The feedback family groups by state first, then role: `--pcs-color-error-text`.
> This split is structural, not accidental — the feedback family owns multiple
> roles (bg, border, text, icon) that belong together under the state name.
> Do not "fix" this asymmetry.

---

### 2.6 Tier 3 — Component Token Naming

```
--pcs-[component]-[variant]-[property]-[state]
```

All segments after the component name follow the same intent-over-appearance
principle as semantic tokens.

**Examples:**

```css
--pcs-button-primary-bg               /* button / primary variant / background          */
--pcs-button-primary-bg-hover         /* button / primary variant / background / hover  */
--pcs-button-primary-border           /* button / primary variant / border color        */
--pcs-input-border-focus              /* input / no variant / border color / focus      */
--pcs-input-size-sm-height            /* input / size-sm variant / height               */
--pcs-badge-neutral-bg                /* badge / neutral variant / background           */
```

**Recognised component variant patterns:**

| Pattern          | Usage                                              | Example                            |
|------------------|----------------------------------------------------|------------------------------------|
| Named variants   | `primary`, `secondary`, `destructive`, `ghost`     | `--pcs-button-ghost-bg`            |
| Feedback variants| `success`, `error`, `warning`, `info`, `neutral`  | `--pcs-badge-success-text`         |
| Size variants    | `size-{scale}` as a compound variant name          | `--pcs-button-size-xs-height`      |

> **`size-{scale}` is a valid variant name**, not a separate tier. It reads
> as `[component]-[size-xs]-[property]` and is consistent across button and
> input components.

---

### 2.7 Abbreviation Conventions

Abbreviation rules differ intentionally by tier. This asymmetry is a
deliberate signal — it helps identify which tier a token belongs to at a glance.

| Property          | Tier 2 (semantic) form  | Tier 3 (component) form | Notes                             |
|-------------------|-------------------------|-------------------------|-----------------------------------|
| Background        | `background`            | `bg`                    | Intentional split — do not align  |
| Border color      | `border`                | `border`                | Same at both tiers                |
| Text color        | `text`                  | `text`                  | Same at both tiers                |
| Font size         | `font-size`             | `font-size`             | Same at both tiers                |
| Border radius     | `radius`                | `radius`                | Same at both tiers                |

Do not rename tokens to align abbreviations across tiers. The `background` vs
`bg` split is documented and intentional.

---

### 2.8 Accepted Exceptions and Special Cases

These patterns deviate slightly from the base formula but are codified as
accepted conventions — do not "fix" them:

| Token(s)                                            | Exception                                | Rationale                                                              |
|-----------------------------------------------------|------------------------------------------|------------------------------------------------------------------------|
| `--pcs-focus-ring-width`, `--pcs-focus-ring-offset` | Two-word category (`focus-ring`)         | "Focus ring" is a distinct design concern; forcing it into `border` misrepresents the concept |
| `--pcs-border-width-default/medium/thick`           | Scale names instead of semantic names    | Border width meaning *is* its scale; accepted exception pending theme-variability confirmation |
| `--pcs-button-size-xs-height`                       | `size-{scale}` as compound variant       | Consistent across button and input; reads correctly as `[component]-[size-xs]-[property]` |
| `--pcs-tabs-list-padding: 3px`                      | Hardcoded literal with no primitive      | 3px is a visual-tuning value outside the spacing scale; a 3px primitive would violate scale integrity |

---

### 2.9 What Not to Name

These are naming anti-patterns that have appeared in the codebase and must
not be repeated:

```css
/* ❌ Appearance-based name — describes colour, not intent */
--pcs-color-text-red

/* ❌ Missing category segment */
--pcs-text-muted             /* should be --pcs-color-text-muted */

/* ❌ Tier 1 consumed directly in a component token */
--pcs-button-bg: var(--pcs-primitive-color-brand-500);
/* should alias a semantic token: var(--pcs-color-primary-emphasis) */

/* ❌ CSS constant tokenised unnecessarily */
--pcs-border-style: solid;   /* use the `solid` keyword directly — B10 */
--pcs-color-transparent: transparent; /* use `transparent` directly — B10 */

/* ❌ shadcn variable used directly in component JSX or token file */
bg-[var(--primary)]          /* use --pcs-color-primary-emphasis instead */
```

---

## 3. Developer Consumption Guide

### 3.1 How to Find Tokens

There are three places to look, in this order:

**1. `globals.css` — `@theme inline` block**
This is your first stop. It contains the curated set of semantic tokens
registered as Tailwind utility classes. If a token is here, you can use it
as a standard Tailwind utility in JSX — no `var()` needed.

```tsx
// These work because the semantic token is registered in @theme inline
<div className="bg-background text-foreground" />
<p className="text-muted-foreground" />
<div className="border border-border-default rounded-lg shadow-md" />
```

**2. `tokens.css` — full Tier 1 + Tier 2 reference**
If the `@theme inline` block doesn't have what you need, search `tokens.css`
for the full semantic token catalogue. A token here but not in `@theme inline`
is consumed via `var()` directly — typically because it has no Tailwind
utility path (complex shadows, calculations, overlays).

```tsx
// Token exists in tokens.css but not in @theme inline — use var() directly
<div style={{ boxShadow: 'var(--pcs-shadow-xl)' }} />
```

**3. `tokens-[component].css` — component token files**
Component-scoped tokens live here, one file per component family. Only look
here when you are working inside that specific component. If you find yourself
reaching for another component's token file, stop — that is an ownership
violation.

```tsx
// Component token — only valid inside button.tsx
<button className="bg-[var(--pcs-button-primary-bg)]" />
```

**Quick search tips:**
- Search `--pcs-color-` for any colour need
- Search `--pcs-radius-` for border radius
- Search `--pcs-shadow-` for elevation
- Search by component name (e.g. `--pcs-button-`) to find all tokens for
  a component family
- If your search returns zero results: the property is likely Tailwind's
  domain — use a Tailwind utility directly

---

### 3.2 The Three Styling Authorities

Understanding which system owns a given style property is the core
skill for working with this token system. There are three authorities:

| Authority        | Owns                                                                           | How you use it                              |
|------------------|--------------------------------------------------------------------------------|---------------------------------------------|
| **Our tokens**   | Color, border radius, shadow/elevation, typography scale, motion/animation     | Tailwind utility (via `@theme inline`) or `var()` |
| **Tailwind**     | Layout spacing (padding, gap, margin), sizing, font size scale, font weights   | Standard Tailwind utility class             |
| **shadcn/ui**    | Component structure defaults (inner padding, sizing, focus ring, transitions)  | Leave shadcn's classes in place; don't override unless wiring a token |

The key boundary: **Tailwind owns layout mechanics. Our tokens own
brand-defining values.** When these collide, the rule is:

- If the value would look the same regardless of theme, tenant, or
  color mode → Tailwind owns it
- If the value needs to change when the theme, tenant, or color mode
  changes → our token owns it

---

### 3.3 When to Use What: Quick Reference

| You need...                             | Use this                                              | Example                                      |
|-----------------------------------------|-------------------------------------------------------|----------------------------------------------|
| Page background color                   | Tailwind utility from `@theme inline`                 | `bg-background`                              |
| Primary brand color                     | Tailwind utility from `@theme inline`                 | `bg-primary`                                 |
| Muted text                              | Tailwind utility from `@theme inline`                 | `text-muted-foreground`                      |
| Error state text                        | `var()` direct reference                              | `color: var(--pcs-color-error-text)`         |
| Border radius on a card                 | Tailwind utility from `@theme inline`                 | `rounded-lg`                                 |
| Shadow on an overlay                    | Tailwind utility from `@theme inline`                 | `shadow-lg`                                  |
| Body copy                               | `type-*` utility class                                | `type-body-md`                               |
| Section heading                         | `type-*` utility class                                | `type-title-md`                              |
| Form label                              | `type-*` utility class                                | `type-label-lg`                              |
| Inner padding on a button               | Tailwind default (shadcn owns this)                   | `px-4 py-2`                                  |
| Gap between flex children               | Tailwind default                                      | `gap-4`                                      |
| Primary button background               | Component token via `var()`                           | `bg-[var(--pcs-button-primary-bg)]`          |
| Input focus border                      | Component token via `var()`                           | `border-[var(--pcs-input-border-focus)]`     |
| CSS keyword (transparent, solid, etc.)  | Inline CSS keyword — no token                         | `border-transparent`, `border-solid`         |

---

### 3.4 Decision Flowchart: "I Need to Style X — What Do I Do?"

```
START: I need to apply a style to a component
│
├─► Is this padding, gap, margin, width, height?
│     └─► YES → Use a Tailwind utility class directly. Stop.
│                (e.g. px-4, gap-2, w-full)
│
├─► Is this a CSS keyword? (transparent, solid, currentColor, inherit)
│     └─► YES → Use the CSS keyword directly. No token. Stop.
│
├─► Is this a typographic role? (heading, body copy, label, caption)
│     └─► YES → Use a type-* utility class. Stop.
│                (e.g. type-title-md, type-body-md, type-label-lg)
│
├─► Is this a color, radius, shadow, or elevation value?
│     └─► YES ─► Is the Tailwind utility registered in @theme inline?
│                  (check globals.css)
│                  ├─► YES → Use the Tailwind utility. Stop.
│                  │         (e.g. bg-background, text-foreground, rounded-lg)
│                  │
│                  └─► NO ──► Does a semantic token exist in tokens.css?
│                               ├─► YES → Use var(--pcs-[token]) directly. Stop.
│                               └─► NO ──► Is this a component-specific design
│                                          decision that no semantic token covers?
│                                           ├─► YES → You may need a component
│                                           │         token. Go to Section 4
│                                           │         (Authoring Guide) first.
│                                           └─► NO → Use a Tailwind default or
│                                                     flag to the Token Guardian.
│
├─► Am I inside a specific component file (e.g. button.tsx)?
│     └─► YES ─► Does a component token exist in tokens-[component].css?
│                  ├─► YES → Use bg-[var(--pcs-button-*)] syntax. Stop.
│                  └─► NO ──► Follow authoring guide (Section 4) before
│                              creating a new token.
│
└─► Still unsure? → Flag to the Token Guardian before proceeding.
```

---

### 3.5 Semantic-Direct vs. Component Token: When Each Applies

This is the most common decision point for developers working on
components. The rule is stated in Boundary 7 (B7):

> **Semantic-direct pattern:** Simple components whose only design
> decision is a colour role consume semantic tokens via the
> `@theme inline` → Tailwind utility path. No component token
> alias layer is created.

In practice, ask two questions:

**Question 1: Does this component have a unique visual identity that
differs from the semantic token's general meaning?**

- If **no** (the component just uses the standard border colour, or
  the standard muted text) → use the semantic token directly via
  Tailwind utility. Do not create a component token.

- If **yes** (the component has a design decision that goes beyond
  what the semantic token expresses — a specific hover state, a unique
  background treatment, a variant colour) → a component token may be
  warranted. Run the authoring gate (Section 4) first.

**Question 2: Would creating a component token just alias the semantic
token with no added meaning?**

```css
/* ❌ Pass-through alias — adds no value, creates redundant indirection */
--pcs-separator-color: var(--pcs-color-border-default);

/* ✅ Correct: use the semantic token directly in the component */
.separator { border-color: var(--pcs-color-border-default); }
/* or via Tailwind: className="border-border-default" */
```

If your component token would just rename the semantic token, skip the
component token and consume the semantic token directly.

**Real examples from the codebase:**

| Component    | Decision                   | Why                                                                          |
|--------------|----------------------------|------------------------------------------------------------------------------|
| `Separator`  | Semantic-direct            | Only design decision is border colour — `--pcs-color-border-default` already expresses this exactly |
| `Button`     | Component tokens           | Has multiple variants (primary, secondary, ghost, destructive) with unique bg, border, text, and hover colours not expressible by a single semantic token |
| `Badge`      | Component tokens           | Feedback variants (success, error, warning, info) require specific combinations not in the semantic layer |
| `Input`      | Component tokens           | Focus ring colour, border state transitions, and size variants are genuine component-level decisions |

---

### 3.6 The `@theme inline` Contract

What is registered in `@theme inline` and what is not is a deliberate
curatorial decision — it is not a complete mirror of `tokens.css`.

**A token belongs in `@theme inline` if:** a developer building any
new component would naturally reach for it as a Tailwind utility without
reading any existing component code first.

**A token does NOT belong in `@theme inline` if:** it is consumed by
only one or two specific components, or it is used in CSS properties
Tailwind doesn't map cleanly (complex shadows, calc expressions,
overlay values).

This means some semantic tokens are intentionally only consumable via
`var()`. This is correct behaviour — not a gap to fill.

```tsx
// In @theme inline → Tailwind utility is the correct path
<div className="bg-background text-foreground rounded-lg" />

// NOT in @theme inline → var() is the correct path
<div style={{ zIndex: 'var(--pcs-z-modal)' }} />
```

Do not add tokens to `@theme inline` without Token Guardian sign-off.
The `globals.css` file is the sole owner of this block.

---

### 3.7 Using Component Tokens in JSX

Component tokens are not registered in `@theme inline`, so they cannot
be used as plain Tailwind utilities. Use Tailwind's arbitrary value
syntax:

```tsx
// ✅ Correct — arbitrary value syntax with var()
<button className="bg-[var(--pcs-button-primary-bg)]
                   text-[color:var(--pcs-button-primary-text)]
                   border-[color:var(--pcs-button-primary-border)]" />

// ❌ Wrong — component token used as if it were in @theme inline
<button className="bg-button-primary-bg" />

// ❌ Wrong — shadcn variable used directly (B9 violation)
<button className="bg-[var(--primary)]" />
```

Component tokens should only appear inside the component file
that owns them. If you find yourself using `--pcs-button-*` tokens
inside `badge.tsx`, stop — something is wrong.

---

### 3.8 What Tailwind Defaults Are Still in Use

Not every styling decision goes through our token system. Tailwind's
built-in scale is used directly — and correctly — for structural values.
Developers should not attempt to replace these with tokens.

**Tailwind-owned (use as-is, no token needed):**
```tsx
// Spacing — layout mechanics, not brand decisions
className="px-4 py-2 gap-3 mt-6 mb-2"

// Width / height sizing utilities
className="w-full h-full min-w-0 max-w-sm"

// Display, flex, grid
className="flex items-center justify-between grid grid-cols-2"
```

**Our tokens own (use via `@theme inline` or `var()`):**
```tsx
// Colors — all color decisions go through tokens
className="bg-background text-foreground text-muted-foreground"
className="border border-border-default"

// Radius — flows through @theme inline
className="rounded-sm rounded-md rounded-lg rounded-full"

// Shadow / elevation — flows through @theme inline
className="shadow-sm shadow-md shadow-lg"

// Typography roles — flows through @utility (type-* classes)
className="type-display type-title-lg type-body-md type-label-lg type-caption"
```

---

### 3.9 Typography Roles — `type-*` Utility Classes

Intentional typographic roles use `type-*` utility classes, not raw
Tailwind `text-*` utilities. Each `type-*` class bundles font-size,
font-weight, line-height, and font-family into a single declaration.

**Available roles:**

| Class             | Usage                                      |
|-------------------|--------------------------------------------|
| `type-display`    | Hero / splash text                         |
| `type-title-lg`   | Page-level headings                        |
| `type-title-md`   | Section headings                           |
| `type-title-sm`   | Sub-section headings                       |
| `type-subtitle`   | Supporting titles                          |
| `type-body-lg`    | Large body copy                            |
| `type-body-md`    | Default body copy (**app default**)        |
| `type-body-sm`    | Small body copy                            |
| `type-label-lg`   | Form labels, button text, metadata         |
| `type-label-sm`   | Small labels, badge text                   |
| `type-caption`    | Timestamps, helper text, fine print        |
| `type-code`       | Inline code                                |

```tsx
// ✅ Semantic typographic role — bundles size, weight, and line-height
<h2 className="type-title-md">Section Title</h2>
<p className="type-body-md">Body text</p>
<label className="type-label-lg">Email address</label>
<span className="type-caption text-muted-foreground">Last updated 2h ago</span>

// ❌ Raw Tailwind — loses weight and line-height intent for intentional roles
<h2 className="text-xl font-semibold leading-normal">Section Title</h2>
```

> **Why `type-` and not `text-`?** `tailwind-merge` treats all `text-*`
> classes as potential font-size or color utilities and will silently drop
> unknown ones inside `cn()` calls. The `type-` prefix is unambiguous and
> conflict-free.

Use raw Tailwind `text-sm`, `text-xs` etc. only for incidental sizing
within a component (e.g. a tooltip, a badge inner label) where no
semantic typographic role applies.

---

## 4. Token Authoring Guide

This section is for situations where you believe a new token is needed.
The default position is: **you probably don't need a new token.**
Read this section completely before creating anything.

---

### 4.1 What Qualifies as a Design Decision?

A token is only justified if the value it holds is a **design decision** —
not an implementation detail. A value is a design decision when all four
of these are true:

1. It expresses brand identity or UX intent — not structural mechanics
2. It changes when theme, color mode, tenant, or platform context changes;
   OR it would need coordinated cross-component change if it evolved
3. It cannot be derived from Tailwind's defaults without losing that intent
4. It would create visual inconsistency if different developers made
   independent choices about it (the ambiguity test)

If the value fails any one of these four tests, it is not a design decision
and should not become a token.

**Quick gut-checks:**

> "Would this value look the same regardless of which tenant or color mode
> is active?" → If yes, it's not a design decision. Use Tailwind directly.

> "If two developers independently chose a value here, would the UI look
> inconsistent?" → If no, no token needed.

> "Does a semantic token already say what I mean?" → If yes, use it.

---

### 4.2 The Three-Gate Authoring Test

Run these three tests in sequence before creating any token. Stop at the
first YES.

```
GATE 1 — Does Tailwind handle this without a design decision?
  YES → NO TOKEN. Use the Tailwind utility directly.
        (padding, gap, margin, font-size scale, font-weight, width, height)
  NO  → Proceed to Gate 2.

GATE 2 — Does a semantic token already express this intent?
  YES → USE THE SEMANTIC TOKEN. Do not create a component token.
        (check tokens.css — color, radius, shadow, typography role)
  NO  → Proceed to Gate 3.

GATE 3 — Is this a genuine component-specific themeable design decision
          that no semantic token covers?
  YES → A component token MAY be warranted. Continue to 4.3.
  NO  → Use Tailwind default, a CSS keyword, or flag to the Token Guardian.
```

**This test is sequential. You cannot skip Gate 1 to get to Gate 3.**
A border-radius on a button is not automatically a component token just
because it's on a component — if `--pcs-radius-md` already expresses the
intent, Gate 2 stops you.

---

### 4.3 Additional Tests Before Creating a Component Token

If Gate 3 passes, run two further tests:

**Over-Specification Test**

Does this token define a style for a child element that is itself a
standalone component?

```
Example: A Dialog component defining tokens for its close button
  → The close button IS a Button component
  → Button tokens already govern how buttons look
  → Dialog tokens for the close button are over-specified
```

If the child is a standalone component (Button, Badge, Icon, etc.), the
token is over-specified and must not be created. Independent children
should look like every other instance of that component type.

**Coupled Test**

Ask: *Does the child element's appearance need to change when the
parent component's design changes?*

- If **yes** → the child is coupled to the parent. A component token
  may be valid.
- If **no** → the child is independent. The token is over-specified.
  Do not create it.

```
Example: Accordion chevron rotation angle
  → The chevron's open/close rotation IS coupled to the Accordion's
    expand/collapse design
  → The token is valid (though the value is a hardcoded literal —
    see 4.6)

Example: Dialog's close button colour
  → The close button's colour does NOT need to change when the Dialog's
    background changes
  → Independent. Over-specified. Do not create.
```

---

### 4.4 Where to Put a New Token

If all tests pass and a new token is justified:

**Determine the tier first.**

| The value is...                                  | Tier          | File                      |
|--------------------------------------------------|---------------|---------------------------|
| A raw value with no semantic meaning             | Tier 1        | `tokens.css` (primitives section) |
| An intent-named alias over a primitive           | Tier 2        | `tokens.css` (semantics section)  |
| A component-scoped design decision               | Tier 3        | `tokens-[component].css`          |

**For Tier 3 — file governance:**

Follow this sequence before creating anything:

1. Identify which component family the token belongs to
   (inspect `src/styles/tokens/`)
2. If a family file exists and covers similar properties → add to that file
3. If the family file exists but needs a new section → add the section
4. If no family file exists → flag to the Token Guardian before creating a new file

**You need a reason to create a new token file.
You do not need a reason to add to an existing one.**

**For Tier 1 and Tier 2 — additional constraint:**

Tier 1 and Tier 2 tokens are candidates for the centralized repo
(`@proteus/shared-ui`). Any additions here must be reviewed and
approved by the Token Guardian before they are authored — they affect
all platforms, not just the web project you are working in.

---

### 4.5 Authoring Rules for Each Tier

**Tier 1 — Primitives**

```css
/* ✅ Correct — raw value, no semantic meaning, follows ramp + step naming */
--pcs-primitive-color-brand-550: oklch(62% 0.162 43.7);

/* ❌ Wrong — primitive token aliasing another variable */
--pcs-primitive-color-brand-emphasis: var(--pcs-primitive-color-brand-600);
/* Primitives hold raw values only. Aliases belong at Tier 2. */
```

- Must follow the `--pcs-primitive-[type]-[ramp]-[step]` pattern
- Must hold a raw value — never a `var()` reference
- Color primitives: use OKLCH format
- Never consumed directly in components

**Tier 2 — Semantic tokens**

```css
/* ✅ Correct — intent name, aliases a primitive */
--pcs-color-surface-overlay: var(--pcs-primitive-color-neutral-900);

/* ✅ Correct — has a dark mode override */
--pcs-color-border-strong: var(--pcs-primitive-color-neutral-300);
/* in dark mode: */
--pcs-color-border-strong: var(--pcs-primitive-color-neutral-600);

/* ❌ Wrong — semantic token hardcoding a raw value */
--pcs-color-text-default: #1a1a1a;
/* Semantic tokens alias primitives. Raw values belong at Tier 1. */
```

- Must follow the `--pcs-[category]-[property]-[variant]` pattern
- Must alias a Tier 1 primitive — never hardcode a raw value
- Must have a dark mode override entry if the value differs between modes
- If the value is identical in light and dark mode → it belongs at
  Tier 1, not Tier 2

**Tier 3 — Component tokens**

```css
/* ✅ Correct — aliases a semantic token, component-specific decision */
--pcs-button-primary-bg:       var(--pcs-color-primary-emphasis);
--pcs-button-primary-bg-hover: var(--pcs-color-primary-emphasis-hover);

/* ❌ Wrong — component token aliasing a primitive directly (skips Tier 2) */
--pcs-button-primary-bg: var(--pcs-primitive-color-brand-600);

/* ❌ Wrong — pass-through alias that adds no meaning */
--pcs-separator-color: var(--pcs-color-border-default);
/* Use the semantic token directly. No component token needed. */

/* ❌ Wrong — CSS constant tokenised */
--pcs-button-border-style: solid;
/* Use the `solid` keyword directly. (B10) */
```

- Must alias a Tier 2 semantic token — never a Tier 1 primitive
- Must represent a genuine design decision, not a pass-through alias
- Must be scoped to the component file that owns it
- Must not define tokens for child elements that are standalone components

---

### 4.6 Hardcoded Literals — When They Are Acceptable

Not every value in a component token file needs to be a token. Some
values are implementation details or visual-tuning constants that
legitimately exist as hardcoded literals:

| Value type                            | Example                                      | Correct treatment              |
|---------------------------------------|----------------------------------------------|--------------------------------|
| Visual tuning outside spacing scale   | `3px` (tabs list padding alignment)          | Hardcoded literal with comment |
| Animation timing (component-scoped)   | `0.75s` (spinner duration)                   | Hardcoded literal              |
| Transform values                      | `180deg` (accordion chevron rotate)          | Hardcoded literal              |
| CSS constants                         | `solid`, `transparent`, `currentColor`       | CSS keyword directly — no token|

When keeping a hardcoded literal that sits outside a recognised scale,
add an inline comment explaining why:

```css
/* Visual alignment — intentionally outside spacing scale */
--pcs-tabs-list-padding: 3px;
```

---

### 4.7 The `@theme inline` Authoring Rule

Adding a new semantic token to `tokens.css` does **not** automatically
add it to `@theme inline`. These are separate decisions.

A token belongs in `@theme inline` only if a developer building a new
component would naturally reach for it as a Tailwind utility without
consulting any existing component code.

**Before adding to `@theme inline`:**
1. Confirm the token is a semantic (Tier 2) token — component tokens
   are never registered here
2. Confirm the token value is a `var()` reference — use `@theme inline`,
   not `@theme` (B8)
3. Get Token Guardian sign-off — `globals.css` is under change control

```css
/* ✅ Correct — semantic token, alias value, registered in @theme inline */
@theme inline {
  --color-new-surface: var(--pcs-color-surface-new);
}

/* ❌ Wrong — component token registered in @theme inline */
@theme inline {
  --color-button-primary-bg: var(--pcs-button-primary-bg);
}

/* ❌ Wrong — literal value using @theme inline (should be plain @theme) */
@theme inline {
  --radius-xs: 2px;
}
```

---

### 4.8 React Native Authoring Note

Component tokens on web do not transfer to React Native. The shared
boundary ends at Tier 2 (semantic tokens), which Style Dictionary
transforms into TypeScript constants for mobile consumption.

When a React Native component needs a design decision:
- Check if a semantic token already covers the intent — if so, use
  the TS constant derived from it
- If a component-specific mobile token is needed, author it in the
  **mobile app repo** — never in the web token files
- Never use rem, CSS calc, or CSS custom property syntax in React Native
  token values — use numeric dp values

```typescript
// ✅ Correct — semantic token consumed as TS constant
import { tokens } from '@proteus/shared-ui/native';
const styles = StyleSheet.create({
  surface: { backgroundColor: tokens.color.surface.card }
});

// ❌ Wrong — CSS variable syntax in React Native
const styles = StyleSheet.create({
  surface: { backgroundColor: 'var(--pcs-color-surface-card)' }
});
```

---

## 5. Common Mistakes & Worked Examples

This section documents anti-patterns found during the Phase 1 audit,
explains why each is wrong, and shows the correct alternative.
Each pattern is labelled with the boundary rule it violates.

---

### 5.1 Anti-Pattern: Tailwind-Owned Values Tokenised as Component Tokens

**Violation: B1, B2**

The most common audit finding — structural layout and typography values
wrapped in component tokens that Tailwind already owns.

```css
/* ❌ Every one of these was removed from tokens-feedback.css */
--pcs-alert-border-radius: 8px;          /* B2 → rounded-lg */
--pcs-alert-padding: 16px;               /* B2 → px-2.5 py-2 */
--pcs-alert-gap: 8px;                    /* B2 → gap-2 */
--pcs-alert-icon-size: 16px;             /* B2 → h-4 w-4 */
--pcs-alert-accent-border-width: 4px;    /* B2 → border-l-4 */
--pcs-alert-title-font-size: 14px;       /* B1 → type-label-lg */
--pcs-alert-title-font-weight: 500;      /* B1 → type-label-lg (bundled) */
--pcs-alert-title-line-height: 1.5;      /* B1 → type-label-lg (bundled) */
--pcs-alert-description-font-size: 14px; /* B1 → type-body-md */
```

**Why wrong:** None of these values change between themes, color modes, or
tenants. A developer making independent choices would land on the same values
anyway. They fail all four criteria for a design decision.

**Correct approach:**

```tsx
// ✅ Tailwind utilities and type-* roles — no tokens needed
<div className="rounded-lg px-2.5 py-2 gap-2 border-l-4">
  <p className="type-label-lg">Title</p>
  <p className="type-body-md text-muted-foreground">Description</p>
</div>
```

**Rule of thumb:** If removing the token and replacing with a Tailwind utility
or `type-*` class produces visually identical output, the token should not exist.

---

### 5.2 Anti-Pattern: Component Token as Pass-Through Alias

**Violation: B7 — semantic-direct pattern**

Creating a component token that simply renames a semantic token adds an
indirection layer with no design value.

```css
/* ❌ Removed — pure pass-through alias, adds no meaning */
--pcs-separator-color: var(--pcs-color-border-default);
--pcs-separator-color-strong: var(--pcs-color-border-strong);
```

```tsx
/* ❌ Consuming the redundant alias */
<hr className="border-[var(--pcs-separator-color)]" />
```

**Why wrong:** `--pcs-color-border-default` already expresses the intent
exactly. The component token adds a second name for the same thing.

**Correct approach — semantic-direct:**

```tsx
/* ✅ Semantic token consumed directly via @theme inline utility */
<hr className="border-border-default" />

/* or via var() if the utility isn't registered */
<hr className="border-[var(--pcs-color-border-default)]" />
```

Separator is a **semantic-direct component** — its only design decision
is a colour role that a semantic token already expresses. No component
token layer should exist.

---

### 5.3 Anti-Pattern: CSS Constant Wrapped in a Token

**Violation: B10**

```css
/* ❌ Found in tokens-button.css — removed */
--pcs-color-transparent: transparent;

/* consumed as: */
bg-[var(--pcs-color-transparent, transparent)]
```

**Why wrong:** `transparent` is a CSS keyword. It has one value. It never
changes between themes, modes, or tenants.

**Correct approach:**

```tsx
/* ✅ CSS keyword used directly */
<button className="bg-transparent border-transparent" />
```

Other constants that must never be tokenised: `solid`, `currentColor`,
`inherit`, `none`, `auto`.

---

### 5.4 Anti-Pattern: Over-Specified Child Component Tokens

**Violation: Over-specification test**

Defining tokens on a parent component for a child element that is itself
a standalone component with its own token family.

```css
/* ❌ All removed from tokens-overlays.css (dialog section) */
--pcs-dialog-close-button-size: 32px;
--pcs-dialog-close-button-position: absolute;
--pcs-dialog-close-button-offset: 12px;
--pcs-dialog-close-button-icon-size: 16px;
--pcs-dialog-close-button-color: var(--pcs-color-icon-default);
--pcs-dialog-close-button-hover: var(--pcs-color-icon-muted);
--pcs-dialog-close-button-border-radius: var(--pcs-radius-sm);
```

**Why wrong:** The close button IS a Button instance. Button already has
its own token family. Coupled test: does the close button's colour need
to change when the Dialog's background changes? No. Independent child.
Over-specified.

**Correct approach:** The Dialog close button inherits from Button tokens
automatically. If the close button needs a visual tweak, that change
belongs in the Button token family.

---

### 5.5 Anti-Pattern: Primitive Token Consumed Directly in a Component

**Violation: B1 — brand identity flows through semantic tokens**

```css
/* ❌ Component token bypassing the semantic tier */
--pcs-button-primary-bg: var(--pcs-primitive-color-brand-600);
```

**Why wrong:** If the brand primary colour shifts from brand-600 to
brand-550, you must hunt every primitive reference across all component
files. The semantic tier exists to centralise that mapping.

```css
/* ✅ Component token aliases a semantic token */
--pcs-button-primary-bg: var(--pcs-color-primary-emphasis);
```

Now only `--pcs-color-primary-emphasis` in `tokens.css` needs updating.
Every component token that aliases it updates automatically.

---

### 5.6 Anti-Pattern: Speculative Pre-Implementation Tokens

**Violation: governance**

Authoring tokens for a component before the component exists or before
design decisions have been made.

```css
/* ❌ Entire file removed — no Table component exists */
/* tokens-table.css — ~60 tokens, "NOT YET CONSUMED" */

/* ❌ Entire section removed — no Toast component exists */
/* tokens-feedback.css (toast section) — ~20 tokens */

/* ❌ Entire section removed — Accordion deferred */
/* tokens-card-accordion-collapsible-scrollarea-slider.css */
```

**Why wrong:** Speculative tokens encode assumptions before any design
decisions are confirmed. When the component is built, the real decisions
will likely differ — leaving developers with a large token set to
evaluate, correct, or delete.

**Correct approach:** Author tokens at implementation time, after design
decisions are confirmed. Deferred components are listed in CLAUDE.md —
check that list before starting a new component.

---

### 5.7 Anti-Pattern: shadcn Variable Used Directly in JSX

**Violation: B9 — shadcn bridge rule**

```tsx
/* ❌ shadcn's internal variable used directly */
<div className="bg-[var(--primary)]" />
<div className="bg-[var(--muted)]" />
```

**Why wrong:** `--primary` and `--muted` are shadcn's internal variable
names. If the bridge mapping changes, or shadcn renames its internals,
every JSX reference breaks. Our API is `--pcs-*`.

```tsx
/* ✅ Our semantic token consumed directly or via @theme inline */
<div className="bg-primary" />                             {/* if registered */}
<div className="bg-[var(--pcs-color-primary-emphasis)]" /> {/* direct var() */}
```

---

### 5.8 Anti-Pattern: Dead Tokens with Explanatory Comments Kept in File

**Violation: governance**

```css
/* ❌ Found in tokens-breadcrumb-pagination.css */
--pcs-breadcrumb-item-padding-x: 8px;  /* padding was removed */
--pcs-breadcrumb-icon-color: ...;       /* no leading-icon slot */
--pcs-breadcrumb-ellipsis-bg-hover: ...; /* ellipsis is static */
--pcs-breadcrumb-item-max-width: 200px; /* truncation not implemented */
```

**Why wrong:** A token with a comment explaining why it is unused is
still a dead token. The comment does not rehabilitate it. Future
developers will either try to wire it or wonder why the dead code was kept.

**Correct approach:** Delete the token and its comment. If the feature
may be implemented later, document the intended design decision in
CLAUDE.md — not as a dead token in a token file.

---

### 5.9 Gold Standard: Button — Well-Wired Component

Button is the reference implementation for multi-variant component tokens.
Study this pattern when wiring a new component with variants.

**Token file structure (`tokens-button.css`):**

```css
/* Tier 3 — all values alias Tier 2 semantic tokens */

/* Variant: primary */
--pcs-button-primary-bg:            var(--pcs-color-primary-emphasis);
--pcs-button-primary-bg-hover:      var(--pcs-color-primary-emphasis-hover);
--pcs-button-primary-bg-active:     var(--pcs-color-primary-emphasis-active);
--pcs-button-primary-text:          var(--pcs-color-text-on-emphasis);
--pcs-button-primary-border:        var(--pcs-color-primary-emphasis);
--pcs-button-primary-border-hover:  var(--pcs-color-primary-emphasis-hover);
--pcs-button-primary-border-active: var(--pcs-color-primary-emphasis-active);
--pcs-button-primary-shadow:        var(--pcs-shadow-xs);
--pcs-button-primary-shadow-hover:  var(--pcs-shadow-sm);

/* Size variant (compound variant name — correct pattern) */
--pcs-button-size-xs-height:    28px;   /* visual-tuning — outside spacing scale */
--pcs-button-size-xs-padding-x: var(--pcs-primitive-space-2-5);
--pcs-button-size-xs-gap:       var(--pcs-primitive-space-1-5);
--pcs-button-size-xs-font-size: var(--pcs-primitive-font-size-xs);
--pcs-button-size-xs-radius:    var(--pcs-radius-sm);
```

**JSX consumption (`button.tsx`):**

```tsx
/* ✅ All correct patterns demonstrated */

// Focus ring — component token
"focus-visible:ring-3 focus-visible:ring-[var(--pcs-button-focus-ring-color)]/50"
"focus-visible:border-[color:var(--pcs-button-focus-ring-color)]"

// Variant classes — component tokens, arbitrary value syntax
"bg-[var(--pcs-button-primary-bg)]"
"text-[color:var(--pcs-button-primary-text)]"
"border-[color:var(--pcs-button-primary-border)]"
"shadow-[var(--pcs-button-primary-shadow)]"
"hover:bg-[var(--pcs-button-primary-bg-hover)]"
"active:bg-[var(--pcs-button-primary-bg-active)]"

// Size variant — component tokens for brand values
"h-[var(--pcs-button-size-md-height)]"
"px-[var(--pcs-button-size-md-padding-x)]"
"gap-[var(--pcs-button-size-md-gap)]"
"text-[length:var(--pcs-button-size-md-font-size)]"
"rounded-[var(--pcs-button-size-md-radius)]"
```

**What makes this the gold standard:**
- Every component token aliases a Tier 2 semantic token (not a primitive)
- State variants (hover, active) are explicit component tokens
- Size variants use the compound `size-{scale}` pattern consistently
- No shadcn variables appear anywhere in the file
- No CSS constants are tokenised

---

### 5.10 Gold Standard: Badge — Feedback Variant Pattern

Badge demonstrates the correct pattern for components with multiple
feedback-state variants (success, error, warning, info, neutral).

```tsx
/* ✅ badge.tsx — feedback variant consumption */

// Shared structure tokens (consistent across all variants)
"h-[var(--pcs-badge-height)]"
"px-[var(--pcs-badge-padding-x)] py-[var(--pcs-badge-padding-y)]"
"rounded-[var(--pcs-badge-border-radius)]"
"border-[length:var(--pcs-badge-border-width)]"
"text-[length:var(--pcs-badge-font-size)]"
"tracking-[var(--pcs-badge-letter-spacing)]"

// Variant-specific colour tokens
// success:
"bg-[var(--pcs-badge-success-bg)]"
"border-[color:var(--pcs-badge-success-border)]"
"text-[color:var(--pcs-badge-success-text)]"

// success emphasis:
"bg-[var(--pcs-badge-success-emphasis-bg)]"
"border-[color:var(--pcs-badge-success-emphasis-border)]"
"text-[color:var(--pcs-badge-success-emphasis-text)]"
```

**Key pattern:** Structure tokens (height, padding, radius, border-width,
font-size) are shared across all variants. Colour tokens are
variant-specific. Structure is a component decision; colour is a variant
decision.

---

## 6. Governance Protocol

This section defines how token changes flow from request to production.
It applies to all token tiers — Tier 1, Tier 2, and Tier 3 — with
different approval requirements per tier.

The underlying principle: **tokens are shared contracts.** A change to
any token can affect every component, every platform, and every tenant
that consumes it. Governance exists to make that impact visible before
a change lands, not after.

---

### 6.1 The Token Guardian Role

The **Token Guardian** is the role responsible for:
- Owning and maintaining the token source of truth
- Reviewing all token addition, modification, and structural requests
- Enforcing boundary rules and the authoring gate
- Signing off on design decisions that affect visual output across
  themes, modes, or tenants
- Keeping `CLAUDE.md` current as the governance source of truth

This role may be held by a UI Engineer, Design Systems Lead, or UX
Engineer — whoever holds it has design sign-off authority over the
token system. All token requests are raised to the Token Guardian
before proceeding.

---

### 6.2 Change Categories

Every token change falls into one of four categories. The category
determines the approval path.

| Category | Description | Examples |
|---|---|---|
| **A — Addition** | New token that does not exist | New semantic colour role, new component token family |
| **M — Modification** | Existing token value or name changed | Colour value adjusted, token renamed |
| **D — Deletion** | Token removed from the system | Dead token cleanup, over-specified tokens removed |
| **S — Structural** | Architecture change | New token file, `@theme inline` entries added/removed, Style Dictionary config change |

---

### 6.3 Approval Requirements by Tier

| Change type | Tier 1 (Primitive) | Tier 2 (Semantic) | Tier 3 (Component) | `@theme inline` / `globals.css` |
|---|---|---|---|---|
| Addition | Token Guardian sign-off | Token Guardian sign-off | Token Guardian review | Token Guardian sign-off |
| Modification | Token Guardian sign-off | Token Guardian sign-off | Token Guardian review | Token Guardian sign-off |
| Deletion | Token Guardian review | Token Guardian review | Developer self-service (audit gate passed) | Token Guardian review |
| Structural | Token Guardian sign-off | Token Guardian sign-off | Token Guardian review | Token Guardian sign-off |

**Token Guardian sign-off** means the change has been reviewed and approved
as a design decision — not just a code change. Required whenever the visual
output could change across themes, modes, or tenants.

**Token Guardian review** means the change is reasoned through and approved
in a Claude AI thread before execution. No token change is executed without
a reasoning record.

**Developer self-service** applies only to Tier 3 deletions of tokens
confirmed dead through the audit gate — zero consumption, no component
wired to them, passes ownership boundary tests. These may be batched and
executed without individual sign-off, provided deletions are documented
in the thread and the Token Guardian spot-checks the batch.

---

### 6.4 Request Process

**Step 1: Check before requesting**

Before raising a token request, the developer must run the authoring
gate (Section 4.2) and confirm:
- The value is a design decision by all four criteria
- No existing token already expresses the intent
- The correct tier has been identified

If any check fails, no request is needed — the answer is already in
the documentation.

**Step 2: Raise the request in a Claude AI thread**

All token requests are raised in a Claude AI thread, not in a PR
comment or Slack message. The thread becomes the reasoning record.

A valid request includes:
- What token is being added, modified, deleted, or restructured
- Which tier and which file it belongs to
- The four-criteria check (does it pass all four design decision tests?)
- The authoring gate result (which gate stopped it?)
- What component or context requires this token
- What the token value will be and what it aliases

**Step 3: Reasoning review**

The Token Guardian reviews the request in the thread. The outcome is:
- **Confirmed** — proceed to execution
- **Redirect** — an existing token already covers this; use that instead
- **Deferred** — the need is real but the design decision is not yet
  confirmed; logged in CLAUDE.md
- **Rejected** — fails the authoring gate or boundary rules; documented
  with rationale

**Step 4: Execution in Claude Code**

Only confirmed changes proceed to Claude Code. The developer copies the
confirmed commit block from the Claude AI thread into Claude Code.
Claude Code performs mechanical execution only — no reasoning, no
design decisions during execution.

**Step 5: Verification**

After execution, the developer runs the verification checklist from the
thread and reports back. Any checklist failure stops the commit and
returns to Step 3 for re-evaluation.

---

### 6.5 Files Under Change Control

These files require Token Guardian review for any modification.

| File | Why it is change-controlled |
|---|---|
| `globals.css` | Sole owner of `@theme inline`. Changes affect every Tailwind utility in the app. |
| `tokens.css` | Contains all Tier 1 and Tier 2 tokens. Changes affect all platforms. |
| `shadcn-bridge.css` | Maps shadcn internals to our semantic tokens. Changes affect all shadcn components. |
| `CLAUDE.md` | Governance rules and deferred component registry. Changes affect team behaviour. |

Component token files (`tokens-*.css`) are under lighter governance —
Token Guardian review is required for additions and structural changes,
but developers may execute confirmed deletions independently.

---

### 6.6 `CLAUDE.md` as the Governance Source of Truth

`CLAUDE.md` is the authoritative governance document. It holds:
- Token ownership boundary rules (B1–B11)
- The authoring gate
- The deferred component registry
- The semantic-direct component list
- The wiring procedure for new components
- Known design decisions for deferred components

**What does not belong in `CLAUDE.md`:**
- Audit status tables or completion trackers
- Token inventories or full token lists
- Historical commentary or "as of date X" notes

`CLAUDE.md` is evergreen. It reflects the current rules, not the rules
as they were at any point in the past.

---

### 6.7 Deferred Components Registry

Components whose tokens have been removed pending implementation are
listed in `CLAUDE.md` under **Deferred Components**. When a deferred
component is eventually built:

1. Read the `CLAUDE.md` entry for that component before authoring any tokens
2. Apply the authoring gate (Section 4.2) to every intended token
3. Author tokens at implementation time — do not pre-author
4. Raise token additions as a standard request (Section 6.4)

**Current deferred components** (check `CLAUDE.md` for the authoritative
list and design decisions to carry forward):
- Table (component selection pending — TanStack Table under evaluation)
- Accordion (design decisions not yet confirmed)
- Toast (component not yet built)

---

### 6.8 Component Wiring Procedure

When connecting a shadcn/Base UI component to the token system for the
first time, follow this sequence:

```
1. Compare token values against shadcn defaults FIRST
   Do not override shadcn until you know what you are overriding.
   If our token produces a visually inferior result, flag it before wiring.

2. Structural changes are a last resort
   Order of preference:
     (a) CSS custom property override via token file
     (b) Tailwind utility class addition via className prop
     (c) CSS targeting the existing element/selector
     (d) Wrapping with a styled container (not the component itself)
     (e) ⚠ Structural change — flag to Token Guardian before proceeding

3. Tokens must not change component behaviour
   Visual only. If a token changes interaction, focus, visibility,
   layout flow, or accessibility — stop and reassess.

4. Visual review before committing
   [ ] Light mode — intentional, not accidental
   [ ] Dark mode — legible, sufficient contrast
   [ ] All interactive states: default, hover, focus, active, disabled
   [ ] No jarring contrast jumps vs. adjacent components
   [ ] Spot-check: Chromium and Firefox

5. Add to showcase page after wiring
   Existing category → new card under that tab
   New category → new tab

6. Validate tokens against boundary rules (Section 4)
   Flag uncertain tokens to the Token Guardian before committing.
```

---

### 6.9 What to Do When Unsure

The default action when uncertain is always **flag to the Token Guardian**
— not proceed with best judgement, not ask in a PR comment, not add a
TODO to the code.

Specifically:
- Uncertain whether a value is a design decision → flag, run gate together
- Found a token that looks wrong but it is consumed → flag, do not delete
- Want to add to `@theme inline` → flag, requires sign-off
- Found a potential boundary violation in existing code → flag, log in
  thread, do not touch unilaterally
- Deferred component is being built → flag before authoring any tokens

Bring the token name, what it does, the simpler alternative you are
considering, and what would be lost. That framing makes the review fast.

---

### 6.10 Periodic Health Checks

Token governance is not a one-time audit. As the codebase grows, new
violations will be introduced. Run these checks at the end of each
project phase and bring results to a Claude AI thread before acting.

```bash
# 1. Dead tokens — component tokens with zero consumption
grep -r "pcs-" src/styles/tokens/ --include="*.css" -h | \
  grep -o 'pcs-[^:]*' | sort | uniq > /tmp/defined_tokens.txt
grep -r "pcs-" src/components/ --include="*.tsx" -h | \
  grep -o 'pcs-[^)\"]*' | sort | uniq > /tmp/consumed_tokens.txt
comm -23 /tmp/defined_tokens.txt /tmp/consumed_tokens.txt
# Output = potentially dead tokens (verify context before deleting)

# 2. Primitive token direct consumption — should return 0
grep -r "pcs-primitive-" src/components/ --include="*.tsx"

# 3. shadcn variable direct usage — should return 0
grep -r "var(--primary)\|var(--muted)\|var(--destructive)" \
  src/components/ --include="*.tsx"

# 4. CSS constants tokenised — should return 0
grep -r "pcs-.*: transparent\|pcs-.*: solid\|pcs-.*: currentColor" \
  src/styles/tokens/ --include="*.css"

# 5. @theme inline additions since last review
git log --oneline src/styles/globals.css
```

> **Note:** These scripts are instructional approximations. Exclude the
> showcase file (`tokens.tsx`) from checks 2–4 as it intentionally
> demonstrates token values. Check 1 output requires context — not all
> unconsumed tokens are dead (see deferred components registry).

---

*End of Proteus Design Token System — Developer Documentation v1.0*
