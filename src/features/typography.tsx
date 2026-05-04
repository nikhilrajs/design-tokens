import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TextColorEntry = {
  name: string
  tokenVar: string     // CSS var name shown in the metadata column
  textClass: string    // Tailwind utility for text color
  bgClass?: string     // Tailwind utility for background (tokens shown on a tinted surface)
  sample: string
  useCase: string
}

type TypographyRole = {
  name: string
  shorthand: string
  specs: string
  color: string
  sample: string
  useCase: string
}

type Group = {
  label: string
  roles: TypographyRole[]
}

// ---------------------------------------------------------------------------
// Data — text color entries
// ---------------------------------------------------------------------------

const NEUTRAL_TEXT_COLORS: TextColorEntry[] = [
  {
    name: 'text-default',
    tokenVar: '--pcs-color-text-default',
    textClass: 'text-foreground',
    sample: 'Invoice #1042 — Acme Corp, $4,280.00',
    useCase: 'Primary text. Body copy, headings, labels, data values.',
  },
  {
    name: 'text-muted',
    tokenVar: '--pcs-color-text-muted',
    textClass: 'text-muted-foreground',
    sample: 'Last updated 3 minutes ago · 4 comments',
    useCase: 'Secondary text. Descriptions, captions, metadata, timestamps, placeholders.',
  },
  {
    name: 'text-disabled',
    tokenVar: '--pcs-color-text-disabled',
    textClass: 'text-disabled-foreground',
    sample: 'This field is currently unavailable',
    useCase: 'Non-interactive text. WCAG-exempt. Signals the element cannot be acted upon.',
  },
  {
    name: 'text-inverse',
    tokenVar: '--pcs-color-text-inverse',
    textClass: 'text-inverse-foreground',
    bgClass: 'bg-foreground',
    sample: 'Tooltip: changes are auto-saved',
    useCase: 'Text on inverted surfaces. Tooltips, dark banners, reversed badges.',
  },
  {
    name: 'text-on-emphasis',
    tokenVar: '--pcs-color-text-on-emphasis',
    textClass: 'text-on-emphasis',
    bgClass: 'bg-primary',
    sample: 'Save and continue',
    useCase: 'Text on colored emphasis fills. Solid primary buttons, status emphasis surfaces.',
  },
]

const SEMANTIC_TEXT_COLORS: TextColorEntry[] = [
  {
    name: 'primary-text',
    tokenVar: '--pcs-color-primary-text',
    textClass: 'text-primary-text',
    bgClass: 'bg-primary-subtle',
    sample: 'View full report →',
    useCase: 'Brand-colored text. Links, selected states, active indicators on tinted surfaces.',
  },
  {
    name: 'error-text',
    tokenVar: '--pcs-color-error-text',
    textClass: 'text-error-text',
    bgClass: 'bg-error-bg',
    sample: 'Failed to save changes. Please try again.',
    useCase: 'Destructive actions, validation errors, critical alerts.',
  },
  {
    name: 'success-text',
    tokenVar: '--pcs-color-success-text',
    textClass: 'text-success-text',
    bgClass: 'bg-success-bg',
    sample: 'Payment of $4,280 processed successfully',
    useCase: 'Confirmations, completed states, positive outcomes.',
  },
  {
    name: 'warning-text',
    tokenVar: '--pcs-color-warning-text',
    textClass: 'text-warning-text',
    bgClass: 'bg-warning-bg',
    sample: 'Storage 92% full — consider archiving old files',
    useCase: 'Caution states, approaching limits, soft failures.',
  },
  {
    name: 'info-text',
    tokenVar: '--pcs-color-info-text',
    textClass: 'text-info-text',
    bgClass: 'bg-info-bg',
    sample: 'Scheduled maintenance window: Friday 10–11 pm',
    useCase: 'Informational messages, system notices, neutral status.',
  },
]

// ---------------------------------------------------------------------------
// Data — one entry per role
// ---------------------------------------------------------------------------

const GROUPS: Group[] = [
  {
    label: 'Headings',
    roles: [
      {
        name: 'Display',
        shorthand: '--pcs-text-display-shorthand',
        specs: '36px · Semibold · 1.375',
        color: 'var(--pcs-color-text-default)',
        sample: 'Quarterly Performance Review',
        useCase: 'Hero moments, empty state headlines, onboarding splash screens. Rare — at most once per view.',
      },
      {
        name: 'Title LG',
        shorthand: '--pcs-text-title-lg-shorthand',
        specs: '24px · Semibold · 1.5',
        color: 'var(--pcs-color-text-default)',
        sample: 'Project Settings',
        useCase: 'Primary page heading. One per view. Pairs with Subtitle for supporting context.',
      },
      {
        name: 'Title MD',
        shorthand: '--pcs-text-title-md-shorthand',
        specs: '20px · Semibold · 1.625',
        color: 'var(--pcs-color-text-default)',
        sample: 'Team Members',
        useCase: 'Modal titles, major card headings, drawer headers, full-page panel titles.',
      },
      {
        name: 'Title SM',
        shorthand: '--pcs-text-title-sm-shorthand',
        specs: '16px · Semibold · 1.5',
        color: 'var(--pcs-color-text-default)',
        sample: 'Billing Information',
        useCase: 'Section headers within a page, form group labels, sidebar section headings, table group titles. Most common heading in the app.',
      },
    ],
  },
  {
    label: 'Supporting',
    roles: [
      {
        name: 'Subtitle',
        shorthand: '--pcs-text-subtitle-shorthand',
        specs: '16px · Regular · 1.625',
        color: 'var(--pcs-color-text-muted)',
        sample: "Manage your team's access and permissions across all projects.",
        useCase: 'Supporting text directly beneath Title LG. Not used under Title MD or SM — Body MD serves that role.',
      },
    ],
  },
  {
    label: 'Body',
    roles: [
      {
        name: 'Body LG',
        shorthand: '--pcs-text-body-lg-shorthand',
        specs: '16px · Regular · 1.5',
        color: 'var(--pcs-color-text-default)',
        sample: 'Review the changes below before publishing your report to all team members in your organisation.',
        useCase: 'Comfortable reading in low-density contexts: empty states, onboarding copy, confirmation dialogs with longer explanations.',
      },
      {
        name: 'Body MD',
        shorthand: '--pcs-text-body-md-shorthand',
        specs: '14px · Regular · 1.5',
        color: 'var(--pcs-color-text-default)',
        sample: 'This is the default text size used across the application for data, descriptions, form values, and most interface copy.',
        useCase: 'App default. Table cells, form values, dropdown options, card descriptions, sidebar items, tooltips. If in doubt, use this.',
      },
      {
        name: 'Body SM',
        shorthand: '--pcs-text-body-sm-shorthand',
        specs: '12px · Regular · 1.625',
        color: 'var(--pcs-color-text-muted)',
        sample: 'Created by Alex Chen · 3 hours ago · 4 comments',
        useCase: 'Secondary information in constrained spaces: activity feeds, compact list metadata, secondary descriptions alongside a primary value.',
      },
    ],
  },
  {
    label: 'UI Chrome',
    roles: [
      {
        name: 'Label LG',
        shorthand: '--pcs-text-label-lg-shorthand',
        specs: '14px · Medium · 1.5',
        color: 'var(--pcs-color-text-default)',
        sample: 'Company Name',
        useCase: 'Form field labels, table column headers, nav item text, button labels, filter chips. Medium weight provides just enough emphasis over body text.',
      },
      {
        name: 'Label SM',
        shorthand: '--pcs-text-label-sm-shorthand',
        specs: '12px · Medium · 1.5',
        color: 'var(--pcs-color-text-muted)',
        sample: 'Optional',
        useCase: 'Sub-labels, badge text, compact tag text, secondary metadata that needs slight emphasis. Use sparingly — prefer Caption for purely informational small text.',
      },
      {
        name: 'Caption',
        shorthand: '--pcs-text-caption-shorthand',
        specs: '12px · Regular · 1.375',
        color: 'var(--pcs-color-text-muted)',
        sample: 'Last updated 2 minutes ago',
        useCase: 'Timestamps, footnotes, helper text beneath form fields, image captions, legal fine print. Lightest color in the hierarchy — purely informational.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Row component
// ---------------------------------------------------------------------------

function TypographyRow({ role }: { role: TypographyRole }) {
  return (
    <div className="grid grid-cols-[1fr_220px] gap-x-8 py-5 border-b border-border-muted last:border-0">

      {/* Left — live sample + use case */}
      <div className="min-w-0 space-y-2">
        <p style={{ font: `var(${role.shorthand})`, color: role.color }}>
          {role.sample}
        </p>
        <p className="text-[11px] leading-snug" style={{ color: 'var(--pcs-color-text-muted)' }}>
          {role.useCase}
        </p>
      </div>

      {/* Right — specs */}
      <div className="shrink-0 text-right space-y-1 pt-0.5">
        <p className="text-xs font-semibold" style={{ color: 'var(--pcs-color-text-default)' }}>
          {role.name}
        </p>
        <p className="text-[10px]" style={{ color: 'var(--pcs-color-text-muted)' }}>
          {role.specs}
        </p>
        <p
          className="text-[10px] font-mono"
          style={{ color: 'var(--pcs-color-text-muted)' }}
          title={role.shorthand}
        >
          {role.shorthand.replace('--pcs-', '')}
        </p>
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// TextColorRow component
// ---------------------------------------------------------------------------

function TextColorRow({ entry }: { entry: TextColorEntry }) {
  return (
    <div className="grid grid-cols-[1fr_220px] gap-x-8 py-5 border-b border-border-muted last:border-0">

      {/* Left — live sample + use case */}
      <div className="min-w-0 space-y-2">
        {entry.bgClass ? (
          <div className={`inline-block rounded-md px-3 py-2 ${entry.bgClass}`}>
            <p className={`text-sm ${entry.textClass}`}>{entry.sample}</p>
          </div>
        ) : (
          <p className={`text-sm ${entry.textClass}`}>{entry.sample}</p>
        )}
        <p className="text-[11px] leading-snug text-muted-foreground">
          {entry.useCase}
        </p>
      </div>

      {/* Right — token metadata */}
      <div className="shrink-0 text-right space-y-1 pt-0.5">
        <p className="text-xs font-semibold text-foreground">{entry.name}</p>
        <p
          className="text-[10px] font-mono text-muted-foreground"
          title={entry.tokenVar}
        >
          {entry.tokenVar.replace('--pcs-', '')}
        </p>
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export const Typography: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {GROUPS.map((group) => (
        <Card key={group.label}>
          <CardHeader>
            <CardTitle>{group.label}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-2">
            {group.roles.map((role) => (
              <TypographyRow key={role.name} role={role} />
            ))}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Neutral Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-2">
          {NEUTRAL_TEXT_COLORS.map((entry) => (
            <TextColorRow key={entry.name} entry={entry} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semantic Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-2">
          {SEMANTIC_TEXT_COLORS.map((entry) => (
            <TextColorRow key={entry.name} entry={entry} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
