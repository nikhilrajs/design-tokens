import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../components/ui/badge"
import { DataTable } from "../components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

type InvoiceStatus = "paid" | "pending" | "draft" | "overdue"

interface Invoice {
  id: string
  customer: string
  email: string
  amount: number
  status: InvoiceStatus
  date: string
}

const data: Invoice[] = [
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

const statusConfig: Record<InvoiceStatus, { appearance: "success" | "error" | "warning" | "neutral"; label: string }> = {
  paid:    { appearance: "success", label: "Paid" },
  pending: { appearance: "warning", label: "Pending" },
  draft:   { appearance: "neutral", label: "Draft" },
  overdue: { appearance: "error",   label: "Overdue" },
}

const columns: ColumnDef<Invoice>[] = [
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

export function DataGrid() {
  return (
    <div className="space-y-6 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} pageSize={5} />
        </CardContent>
      </Card>
    </div>
  )
}
