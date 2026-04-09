import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

const NEUTRAL_STEPS = ['50','100','200','300','400','500','600','700','800','900','950']
const BRAND_STEPS   = ['50','100','200','300','400','500','600','700','800','900','950']
const RED_STEPS     = ['50','100','200','300','400','500','600','700','800','900','950']
const YELLOW_STEPS  = ['50','100','200','300','400','500','600','700','800','900','950']
const EMERALD_STEPS = ['50','100','200','300','400','500','600','700','800','900','950']
const SKY_STEPS     = ['50','100','200','300','400','500','600','700','800','900','950']

// ---------------------------------------------------------------------------
// Shared swatch components
// ---------------------------------------------------------------------------

function ColorSwatch({ token, label }: { token: string; label?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-10 w-full rounded-md border border-border-default"
        style={{ background: `var(${token})` }}
      />
      <p className="text-[10px] leading-tight text-text-muted font-mono truncate" title={token}>
        {label ?? token.replace('--pcs-', '')}
      </p>
    </div>
  )
}

function ColorRow({ name, steps, prefix }: { name: string; steps: string[]; prefix: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-default capitalize">{name}</p>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map(step => (
          <ColorSwatch key={step} token={`--pcs-${prefix}-${step}`} label={step} />
        ))}
      </div>
    </div>
  )
}

function SemanticSwatch({ token, name }: { token: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 shrink-0 rounded-md border border-border-default"
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0">
        <p className="text-xs font-medium text-text-default truncate">{name}</p>
        <p className="text-[10px] text-text-muted font-mono truncate" title={token}>{token.replace('--pcs-', '')}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export const Tokens: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">

      {/* ------------------------------------------------------------------ */}
      {/* PRIMITIVE COLORS                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Color Primitives">
        <div className="space-y-6">
          <ColorRow name="Neutral" steps={NEUTRAL_STEPS} prefix="primitive-color-neutral" />
          <ColorRow name="Brand"   steps={BRAND_STEPS}   prefix="primitive-color-brand" />
          <ColorRow name="Red"     steps={RED_STEPS}     prefix="primitive-color-red" />
          <ColorRow name="Yellow"  steps={YELLOW_STEPS}  prefix="primitive-color-yellow" />
          <ColorRow name="Emerald" steps={EMERALD_STEPS} prefix="primitive-color-emerald" />
          <ColorRow name="Sky"     steps={SKY_STEPS}     prefix="primitive-color-sky" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SEMANTIC — SURFACES & BORDERS                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Semantic — Surfaces &amp; Borders">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
          <SemanticSwatch token="--pcs-color-background"       name="Background" />
          <SemanticSwatch token="--pcs-color-surface-card"     name="Surface / Card" />
          <SemanticSwatch token="--pcs-color-surface-muted"    name="Surface / Muted" />
          <SemanticSwatch token="--pcs-color-surface-overlay"  name="Surface / Overlay" />
          <SemanticSwatch token="--pcs-color-surface-sidebar"  name="Surface / Sidebar" />
          <SemanticSwatch token="--pcs-color-border-muted"     name="Border / Muted" />
          <SemanticSwatch token="--pcs-color-border-default"   name="Border / Default" />
          <SemanticSwatch token="--pcs-color-border-strong"    name="Border / Strong" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SEMANTIC — TEXT & ICONS                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Semantic — Text &amp; Icons">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
          <SemanticSwatch token="--pcs-color-text-default"  name="Text / Default" />
          <SemanticSwatch token="--pcs-color-text-muted"    name="Text / Muted" />
          <SemanticSwatch token="--pcs-color-text-muted"   name="Text / Subtle" />
          <SemanticSwatch token="--pcs-color-text-disabled" name="Text / Disabled" />
          <SemanticSwatch token="--pcs-color-text-inverse"  name="Text / Inverse" />
          <SemanticSwatch token="--pcs-color-icon-default"  name="Icon / Default" />
          <SemanticSwatch token="--pcs-color-icon-muted"    name="Icon / Muted" />
          <SemanticSwatch token="--pcs-color-icon-disabled" name="Icon / Disabled" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SEMANTIC — PRIMARY                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Semantic — Primary / Brand">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
          <SemanticSwatch token="--pcs-color-primary-subtle"          name="Primary / Subtle" />
          <SemanticSwatch token="--pcs-color-primary-subtle-hover"    name="Primary / Subtle Hover" />
          <SemanticSwatch token="--pcs-color-primary-border"          name="Primary / Border" />
          <SemanticSwatch token="--pcs-color-primary-icon"            name="Primary / Icon" />
          <SemanticSwatch token="--pcs-color-primary-text"            name="Primary / Text" />
          <SemanticSwatch token="--pcs-color-primary-emphasis"        name="Primary / Emphasis" />
          <SemanticSwatch token="--pcs-color-primary-emphasis-hover"  name="Primary / Emphasis Hover" />
          <SemanticSwatch token="--pcs-color-primary-emphasis-active" name="Primary / Emphasis Active" />
          <SemanticSwatch token="--pcs-color-primary-on-emphasis"     name="Primary / On Emphasis" />
          <SemanticSwatch token="--pcs-color-focus-ring"              name="Focus Ring" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SEMANTIC — STATUS                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Semantic — Status">
        {(['success','error','warning','info'] as const).map(role => (
          <div key={role} className="mb-5 last:mb-0">
            <p className="mb-3 text-xs font-semibold text-text-default capitalize">{role}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-4 lg:grid-cols-7">
              <SemanticSwatch token={`--pcs-color-${role}-background`}      name="Background" />
              <SemanticSwatch token={`--pcs-color-${role}-background-hover`} name="Bg Hover" />
              <SemanticSwatch token={`--pcs-color-${role}-border`}          name="Border" />
              <SemanticSwatch token={`--pcs-color-${role}-text`}            name="Text" />
              <SemanticSwatch token={`--pcs-color-${role}-icon`}            name="Icon" />
              <SemanticSwatch token={`--pcs-color-${role}-emphasis`}        name="Emphasis" />
              <SemanticSwatch token={`--pcs-color-${role}-on-emphasis`}     name="On Emphasis" />
            </div>
          </div>
        ))}
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SEMANTIC — INTERACTIVE STATES                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Semantic — Interactive States">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
          <SemanticSwatch token="--pcs-color-state-hover"           name="State / Hover" />
          <SemanticSwatch token="--pcs-color-state-active"          name="State / Active" />
          <SemanticSwatch token="--pcs-color-state-selected"        name="State / Selected" />
          <SemanticSwatch token="--pcs-color-state-selected-border" name="State / Selected Border" />
          <SemanticSwatch token="--pcs-color-state-disabled-bg"     name="Disabled / BG" />
          <SemanticSwatch token="--pcs-color-text-disabled"   name="Disabled / Text" />
          <SemanticSwatch token="--pcs-color-state-disabled-border" name="Disabled / Border" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* RADIUS                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {[
            { name: 'none', token: '--pcs-radius-none' },
            { name: 'sm',   token: '--pcs-radius-sm' },
            { name: 'md',   token: '--pcs-radius-md' },
            { name: 'lg',   token: '--pcs-radius-lg' },
            { name: 'xl',   token: '--pcs-radius-xl' },
            { name: '2xl',  token: '--pcs-radius-2xl' },
            { name: 'full', token: '--pcs-radius-full' },
          ].map(({ name, token }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-14 w-14 border-2 border-border-strong bg-surface-muted"
                style={{ borderRadius: `var(${token})` }}
              />
              <p className="text-xs font-medium text-text-default">{name}</p>
              <p className="text-[10px] text-text-muted font-mono">{token.replace('--pcs-', '')}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SHADOWS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Shadows">
        <div className="flex flex-wrap gap-8">
          {[
            { name: 'sm', token: '--pcs-shadow-sm' },
            { name: 'md', token: '--pcs-shadow-md' },
            { name: 'lg', token: '--pcs-shadow-lg' },
            { name: 'xl', token: '--pcs-shadow-xl' },
          ].map(({ name, token }) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div
                className="h-20 w-32 rounded-lg bg-surface-card"
                style={{ boxShadow: `var(${token})` }}
              />
              <div className="text-center">
                <p className="text-xs font-medium text-text-default">{name}</p>
                <p className="text-[10px] text-text-muted font-mono">{token.replace('--pcs-', '')}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* TYPOGRAPHY                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Typography Scale">
        <div className="space-y-4 divide-y divide-border-muted">
          {[
            { name: 'Display',     size: 'var(--pcs-text-display-size)',     weight: 'var(--pcs-text-display-weight)',     desc: '36px · Bold' },
            { name: 'Title LG',   size: 'var(--pcs-text-title-lg-size)',     weight: 'var(--pcs-text-title-lg-weight)',    desc: '30px · Semibold' },
            { name: 'Title MD',   size: 'var(--pcs-text-title-md-size)',     weight: 'var(--pcs-text-title-md-weight)',    desc: '24px · Semibold' },
            { name: 'Title SM',   size: 'var(--pcs-text-title-sm-size)',     weight: 'var(--pcs-text-title-sm-weight)',    desc: '20px · Semibold' },
            { name: 'Subtitle',   size: 'var(--pcs-text-subtitle-size)',     weight: 'var(--pcs-text-subtitle-weight)',   desc: '18px · Regular' },
            { name: 'Body LG',    size: 'var(--pcs-text-body-lg-size)',      weight: 'var(--pcs-text-body-lg-weight)',    desc: '16px · Regular' },
            { name: 'Body MD',    size: 'var(--pcs-text-body-md-size)',      weight: 'var(--pcs-text-body-md-weight)',    desc: '14px · Regular · App default' },
            { name: 'Body SM',    size: 'var(--pcs-text-body-sm-size)',      weight: 'var(--pcs-text-body-sm-weight)',    desc: '12px · Regular' },
            { name: 'Label LG',   size: 'var(--pcs-text-label-lg-size)',     weight: 'var(--pcs-text-label-lg-weight)',   desc: '14px · Medium' },
            { name: 'Label SM',   size: 'var(--pcs-text-label-sm-size)',     weight: 'var(--pcs-text-label-sm-weight)',   desc: '12px · Medium' },
            { name: 'Caption',    size: 'var(--pcs-text-caption-size)',      weight: 'var(--pcs-text-caption-weight)',    desc: '12px · Regular · Tight' },
          ].map(({ name, size, weight, desc }) => (
            <div key={name} className="flex items-baseline justify-between gap-4 pt-4 first:pt-0">
              <p
                className="text-text-default"
                style={{ fontSize: size, fontWeight: weight, lineHeight: 1 }}
              >
                {name}
              </p>
              <p className="shrink-0 text-[10px] text-text-muted font-mono">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

    </div>
  )
}
