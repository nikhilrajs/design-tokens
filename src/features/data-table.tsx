import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../components/ui/badge"
import { DataTable } from "../components/ui/data-table"
import { AdvancedDataTable } from "../components/ui/advanced-data-table"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

// ─── Shared types ─────────────────────────────────────────────────────────────

type InvoiceStatus = "paid" | "pending" | "draft" | "overdue"

const statusConfig: Record<InvoiceStatus, { appearance: "success" | "error" | "warning" | "neutral"; label: string }> = {
  paid:    { appearance: "success", label: "Paid" },
  pending: { appearance: "warning", label: "Pending" },
  draft:   { appearance: "neutral", label: "Draft" },
  overdue: { appearance: "error",   label: "Overdue" },
}

// ─── Simple DataTable ─────────────────────────────────────────────────────────

interface Invoice {
  id: string
  customer: string
  email: string
  amount: number
  status: InvoiceStatus
  date: string
}

const invoices: Invoice[] = [
  { id: "INV-001", customer: "Acme Corp",        email: "billing@acme.com",       amount: 4250.00,  status: "paid",    date: "2025-03-01" },
  { id: "INV-002", customer: "Globex Systems",    email: "ap@globex.io",           amount: 1800.50,  status: "pending", date: "2025-03-05" },
  { id: "INV-003", customer: "Initech Ltd",       email: "finance@initech.com",    amount: 9100.00,  status: "overdue", date: "2025-02-14" },
  { id: "INV-004", customer: "Umbrella Inc",      email: "accounts@umbrella.org",  amount: 640.75,   status: "draft",   date: "2025-03-10" },
  { id: "INV-005", customer: "Stark Industries",  email: "tony@stark.io",          amount: 22500.00, status: "paid",    date: "2025-03-08" },
  { id: "INV-006", customer: "Wayne Enterprises", email: "finance@wayne.com",      amount: 3375.00,  status: "pending", date: "2025-03-12" },
  { id: "INV-007", customer: "Oscorp",            email: "ar@oscorp.net",          amount: 1125.25,  status: "overdue", date: "2025-02-20" },
  { id: "INV-008", customer: "Pied Piper",        email: "billing@piedpiper.com",  amount: 890.00,   status: "draft",   date: "2025-03-14" },
  { id: "INV-009", customer: "Hooli",             email: "ap@hooli.com",           amount: 15600.00, status: "paid",    date: "2025-03-03" },
  { id: "INV-010", customer: "Dunder Mifflin",    email: "michael@dm.com",         amount: 420.00,   status: "pending", date: "2025-03-15" },
  { id: "INV-011", customer: "Vandelay Ind",      email: "george@vandelay.com",    amount: 3000.00,  status: "paid",    date: "2025-03-07" },
  { id: "INV-012", customer: "Bluth Company",     email: "gob@bluth.com",          amount: 750.00,   status: "overdue", date: "2025-02-28" },
]

const simpleColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
    cell: ({ row }) => (
      <span className="font-mono text-[color:var(--pcs-color-text-default)]">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as InvoiceStatus
      const { appearance, label } = statusConfig[status]
      return <Badge appearance={appearance}>{label}</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number
      return (
        <span className="block text-right tabular-nums">
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}
        </span>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date") as string)
      return (
        <span className="text-[color:var(--pcs-color-text-muted)]">
          {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date)}
        </span>
      )
    },
  },
]

// ─── Tables List (highlighted row) ───────────────────────────────────────────
// Demonstrates the provider-row highlight. One row is designated as the
// "Provider Table" and receives data-variant="highlighted".

interface DatabaseTable {
  name: string
  schema: string
  rows: number
  size: string
  lastModified: string
  isProvider: boolean
}

const databaseTables: DatabaseTable[] = [
  { name: "users",          schema: "public",   rows: 84320,  size: "42 MB",   lastModified: "2025-05-01", isProvider: false },
  { name: "provider_table", schema: "public",   rows: 12800,  size: "18 MB",   lastModified: "2025-05-06", isProvider: true  },
  { name: "orders",         schema: "public",   rows: 230100, size: "310 MB",  lastModified: "2025-05-05", isProvider: false },
  { name: "products",       schema: "catalog",  rows: 4500,   size: "9 MB",    lastModified: "2025-04-28", isProvider: false },
  { name: "sessions",       schema: "auth",     rows: 99200,  size: "120 MB",  lastModified: "2025-05-06", isProvider: false },
  { name: "audit_log",      schema: "internal", rows: 512000, size: "1.2 GB",  lastModified: "2025-05-07", isProvider: false },
]

const tableListColumns: ColumnDef<DatabaseTable>[] = [
  {
    accessorKey: "name",
    header: "Table Name",
    cell: ({ row }) => (
      <span className="font-mono text-[color:var(--pcs-color-text-default)]">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "schema",
    header: "Schema",
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {row.getValue("schema")}
      </span>
    ),
  },
  {
    accessorKey: "rows",
    header: "Rows",
    cell: ({ row }) => (
      <span className="block text-right tabular-nums text-[color:var(--pcs-color-text-muted)]">
        {(row.getValue("rows") as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <span className="block text-right tabular-nums text-[color:var(--pcs-color-text-muted)]">
        {row.getValue("size")}
      </span>
    ),
  },
  {
    accessorKey: "lastModified",
    header: "Last Modified",
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(row.getValue("lastModified") as string))}
      </span>
    ),
  },
]

// ─── Advanced DataTable ───────────────────────────────────────────────────────
// Wider dataset — enough columns to trigger horizontal scroll and make
// column pinning meaningful.

interface InvoiceExtended {
  id: string
  customer: string
  email: string
  project: string
  region: string
  status: InvoiceStatus
  amount: number
  issueDate: string
  dueDate: string
  paymentMethod: string
}

const invoicesExtended: InvoiceExtended[] = [
  { id: "INV-001", customer: "Acme Corp",        email: "billing@acme.com",       project: "Platform Rebuild",   region: "North America", status: "paid",    amount: 4250.00,  issueDate: "2025-03-01", dueDate: "2025-03-31", paymentMethod: "Bank Transfer" },
  { id: "INV-002", customer: "Globex Systems",    email: "ap@globex.io",           project: "API Integration",    region: "Europe",        status: "pending", amount: 1800.50,  issueDate: "2025-03-05", dueDate: "2025-04-04", paymentMethod: "Credit Card" },
  { id: "INV-003", customer: "Initech Ltd",       email: "finance@initech.com",    project: "Legacy Migration",   region: "North America", status: "overdue", amount: 9100.00,  issueDate: "2025-02-14", dueDate: "2025-03-16", paymentMethod: "Bank Transfer" },
  { id: "INV-004", customer: "Umbrella Inc",      email: "accounts@umbrella.org",  project: "Security Audit",     region: "Asia Pacific",  status: "draft",   amount: 640.75,   issueDate: "2025-03-10", dueDate: "2025-04-09", paymentMethod: "Wire" },
  { id: "INV-005", customer: "Stark Industries",  email: "tony@stark.io",          project: "AI Research Suite",  region: "North America", status: "paid",    amount: 22500.00, issueDate: "2025-03-08", dueDate: "2025-04-07", paymentMethod: "Bank Transfer" },
  { id: "INV-006", customer: "Wayne Enterprises", email: "finance@wayne.com",      project: "Infrastructure",     region: "North America", status: "pending", amount: 3375.00,  issueDate: "2025-03-12", dueDate: "2025-04-11", paymentMethod: "Credit Card" },
  { id: "INV-007", customer: "Oscorp",            email: "ar@oscorp.net",          project: "Data Pipeline",      region: "Europe",        status: "overdue", amount: 1125.25,  issueDate: "2025-02-20", dueDate: "2025-03-22", paymentMethod: "Bank Transfer" },
  { id: "INV-008", customer: "Pied Piper",        email: "billing@piedpiper.com",  project: "Compression Engine", region: "North America", status: "draft",   amount: 890.00,   issueDate: "2025-03-14", dueDate: "2025-04-13", paymentMethod: "Wire" },
  { id: "INV-009", customer: "Hooli",             email: "ap@hooli.com",           project: "Search Overhaul",    region: "North America", status: "paid",    amount: 15600.00, issueDate: "2025-03-03", dueDate: "2025-04-02", paymentMethod: "Bank Transfer" },
  { id: "INV-010", customer: "Dunder Mifflin",    email: "michael@dm.com",         project: "Paper Tracker",      region: "North America", status: "pending", amount: 420.00,   issueDate: "2025-03-15", dueDate: "2025-04-14", paymentMethod: "Credit Card" },
  { id: "INV-011", customer: "Vandelay Ind",      email: "george@vandelay.com",    project: "Export Portal",      region: "Europe",        status: "paid",    amount: 3000.00,  issueDate: "2025-03-07", dueDate: "2025-04-06", paymentMethod: "Wire" },
  { id: "INV-012", customer: "Bluth Company",     email: "gob@bluth.com",          project: "Real Estate CRM",    region: "North America", status: "overdue", amount: 750.00,   issueDate: "2025-02-28", dueDate: "2025-03-30", paymentMethod: "Credit Card" },
]

const fmt = {
  date: (s: string) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(s)),
  currency: (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n),
}

const advancedColumns: ColumnDef<InvoiceExtended>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
    size: 100,
    cell: ({ row }) => (
      <span className="font-mono text-[color:var(--pcs-color-text-default)]">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    size: 160,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "project",
    header: "Project",
    size: 170,
  },
  {
    accessorKey: "region",
    header: "Region",
    size: 130,
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {row.getValue("region")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 110,
    cell: ({ row }) => {
      const status = row.getValue("status") as InvoiceStatus
      const { appearance, label } = statusConfig[status]
      return <Badge appearance={appearance}>{label}</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 120,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {fmt.currency(row.getValue("amount") as number)}
      </span>
    ),
  },
  {
    accessorKey: "issueDate",
    header: "Issued",
    size: 130,
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {fmt.date(row.getValue("issueDate") as string)}
      </span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due",
    size: 130,
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {fmt.date(row.getValue("dueDate") as string)}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    size: 140,
    cell: ({ row }) => (
      <span className="text-[color:var(--pcs-color-text-muted)]">
        {row.getValue("paymentMethod")}
      </span>
    ),
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DataGrid() {
  return (
    <div className="space-y-6 py-4">

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={simpleColumns} data={invoices} pageSize={5} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Invoice Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvancedDataTable columns={advancedColumns} data={invoicesExtended} pageSize={5} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tables List — highlighted row</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={tableListColumns}
            data={databaseTables}
            pageSize={6}
            getRowVariant={(row) => row.isProvider ? "highlighted" : undefined}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tables List — advanced grid with highlighted row</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvancedDataTable
            columns={tableListColumns}
            data={databaseTables}
            pageSize={6}
            getRowVariant={(row) => row.isProvider ? "highlighted" : undefined}
          />
        </CardContent>
      </Card>

    </div>
  )
}
