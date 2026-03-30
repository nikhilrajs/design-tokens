import React from 'react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Kbd } from "../components/ui/kbd"
import { Skeleton } from "../components/ui/skeleton"
import { Spinner } from "../components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import {
  AlertCircleIcon,
  CheckCircleIcon,
  FolderOpenIcon,
  InfoIcon,
  InboxIcon,
  SearchIcon,
  SlashIcon,
  TriangleAlertIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty"

export const Feedback: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Alert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

          {/* Default / Neutral */}
          <Alert>
            <InfoIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>

          {/* Info */}
          <Alert variant="info">
            <InfoIcon />
            <AlertTitle>New version available</AlertTitle>
            <AlertDescription>
              Version 2.4.0 is available. Update to get the latest features and fixes.
            </AlertDescription>
          </Alert>

          {/* Success */}
          <Alert variant="success">
            <CheckCircleIcon />
            <AlertTitle>Changes saved</AlertTitle>
            <AlertDescription>
              Your profile has been updated successfully.
            </AlertDescription>
          </Alert>

          {/* Warning */}
          <Alert variant="warning">
            <TriangleAlertIcon />
            <AlertTitle>Unsaved changes</AlertTitle>
            <AlertDescription>
              You have unsaved changes. Leave the page and they will be lost.
            </AlertDescription>
          </Alert>

          {/* Error */}
          <Alert variant="error">
            <AlertCircleIcon />
            <AlertTitle>Submission failed</AlertTitle>
            <AlertDescription>
              There was a problem processing your request. Please try again.
            </AlertDescription>
          </Alert>

          {/* Without icon */}
          <Alert variant="info">
            <AlertTitle>No icon variant</AlertTitle>
            <AlertDescription>
              Alerts can be used without an icon when the context makes the intent clear.
            </AlertDescription>
          </Alert>

          {/* Description only */}
          <Alert variant="warning">
            <TriangleAlertIcon />
            <AlertDescription>
              Your trial expires in 3 days.
            </AlertDescription>
          </Alert>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Badge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Default weight — all appearances */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-2">Default</p>
            <div className="flex flex-wrap gap-2">
              <Badge appearance="neutral">Neutral</Badge>
              <Badge appearance="primary">Primary</Badge>
              <Badge appearance="success">Success</Badge>
              <Badge appearance="error">Error</Badge>
              <Badge appearance="warning">Warning</Badge>
              <Badge appearance="info">Info</Badge>
            </div>
          </div>
          {/* Emphasis weight — all appearances */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-2">Emphasis</p>
            <div className="flex flex-wrap gap-2">
              <Badge appearance="neutral" weight="emphasis">Neutral</Badge>
              <Badge appearance="primary" weight="emphasis">Primary</Badge>
              <Badge appearance="success" weight="emphasis">Success</Badge>
              <Badge appearance="error" weight="emphasis">Error</Badge>
              <Badge appearance="warning" weight="emphasis">Warning</Badge>
              <Badge appearance="info" weight="emphasis">Info</Badge>
            </div>
          </div>
          {/* In context */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-2">In context</p>
            <div className="flex flex-wrap gap-2">
              <Badge appearance="success">Active</Badge>
              <Badge appearance="warning">Pending</Badge>
              <Badge appearance="error">Failed</Badge>
              <Badge appearance="info">Draft</Badge>
              <Badge appearance="neutral">Archived</Badge>
              <Badge appearance="primary" weight="emphasis">New</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Placement */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Placement</p>
            <TooltipProvider>
              <div className="flex flex-wrap gap-3 items-center">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Top</Button>} />
                  <TooltipContent side="top">Tooltip on top</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Right</Button>} />
                  <TooltipContent side="right">Tooltip on right</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Bottom</Button>} />
                  <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Left</Button>} />
                  <TooltipContent side="left">Tooltip on left</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* Content types */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Content</p>
            <TooltipProvider>
              <div className="flex flex-wrap gap-3 items-center">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Short</Button>} />
                  <TooltipContent>Save file</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Long</Button>} />
                  <TooltipContent>
                    This action cannot be undone. All selected items will be permanently deleted.
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="More info"><InfoIcon className="size-4" /></Button>} />
                  <TooltipContent>More information</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* With keyboard shortcut */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With keyboard shortcut</p>
            <TooltipProvider>
              <div className="flex flex-wrap gap-3 items-center">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Bold</Button>} />
                  <TooltipContent>
                    Bold <Kbd>⌘B</Kbd>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Save</Button>} />
                  <TooltipContent>
                    Save file <Kbd>⌘S</Kbd>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm">Undo</Button>} />
                  <TooltipContent>
                    Undo <Kbd>⌘Z</Kbd>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Breadcrumb</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Basic */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Basic</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Detail</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* With ellipsis */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With ellipsis</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Detail</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Custom separator */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Custom separator</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Detail</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Separator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Horizontal */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Horizontal</p>
            <div className="space-y-2">
              <p className="text-sm text-[color:var(--pcs-color-text-default)]">Above the line</p>
              <Separator />
              <p className="text-sm text-[color:var(--pcs-color-text-default)]">Below the line</p>
            </div>
          </div>

          {/* Vertical */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Vertical</p>
            <div className="flex items-center gap-3 h-5">
              <span className="text-sm text-[color:var(--pcs-color-text-default)]">Blog</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-[color:var(--pcs-color-text-default)]">Docs</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-[color:var(--pcs-color-text-default)]">Source</span>
            </div>
          </div>

          {/* In context — section divider with label */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With label</p>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-[color:var(--pcs-color-text-subtle)]">or continue with</span>
              <Separator className="flex-1" />
            </div>
          </div>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Sizes */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Sizes</p>
            <div className="flex items-center gap-4">
              <Avatar size="sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Fallback (initials) */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Fallback</p>
            <div className="flex items-center gap-4">
              <Avatar size="sm">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>NK</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* With status badge */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With status badge</p>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>ON</AvatarFallback>
                <AvatarBadge style={{ backgroundColor: "var(--pcs-avatar-status-online)" }} />
              </Avatar>
              <Avatar>
                <AvatarFallback>OF</AvatarFallback>
                <AvatarBadge style={{ backgroundColor: "var(--pcs-avatar-status-offline)" }} />
              </Avatar>
              <Avatar>
                <AvatarFallback>BZ</AvatarFallback>
                <AvatarBadge style={{ backgroundColor: "var(--pcs-avatar-status-busy)" }} />
              </Avatar>
              <Avatar>
                <AvatarFallback>AW</AvatarFallback>
                <AvatarBadge style={{ backgroundColor: "var(--pcs-avatar-status-away)" }} />
              </Avatar>
            </div>
          </div>

          {/* Stacked group */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Group</p>
            <div className="flex flex-col gap-3">
              <AvatarGroup>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+4</AvatarGroupCount>
              </AvatarGroup>
            </div>
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spinner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Sizes */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Sizes</p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Spinner size="sm" variant="primary" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">sm · 12px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="md" variant="primary" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">md · 16px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" variant="primary" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">lg · 20px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="xl" variant="primary" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">xl · 32px</span>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Variants</p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" variant="inherit" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">inherit</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" variant="primary" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" variant="muted" />
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">muted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-md size-8" style={{ backgroundColor: 'var(--pcs-color-primary-emphasis)' }}>
                  <Spinner size="md" variant="on-emphasis" />
                </div>
                <span className="text-[10px] font-mono text-[color:var(--pcs-color-text-subtle)]">on-emphasis</span>
              </div>
            </div>
          </div>

          {/* In context */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">In context</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button disabled>
                <Spinner size="sm" variant="on-emphasis" />
                Saving…
              </Button>
              <Button variant="outline" disabled>
                <Spinner size="sm" variant="inherit" />
                Loading
              </Button>
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-[color:var(--pcs-color-border-muted)] p-8 w-48">
                <Spinner size="xl" variant="muted" />
                <span className="text-xs text-[color:var(--pcs-color-text-subtle)]">Loading data…</span>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skeleton</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-start gap-6">

            {/* Text block */}
            <div className="space-y-2 w-56">
              <Skeleton className="h-3 w-full rounded-sm" />
              <Skeleton className="h-3 w-full rounded-sm" />
              <Skeleton className="h-3 w-4/5 rounded-sm" />
            </div>

            {/* Avatar + text */}
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28 rounded-sm" />
                <Skeleton className="h-3 w-20 rounded-sm" />
              </div>
            </div>

            {/* Card */}
            <div className="w-48 space-y-3 rounded-lg border border-[color:var(--pcs-color-border-muted)] p-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-3 w-3/4 rounded-sm" />
              <Skeleton className="h-3 w-1/2 rounded-sm" />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Card anatomy showcase — uses a plain div wrapper to avoid nesting Cards */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide">Card</p>

        {/* Default — title + description + content + footer */}
        <Card>
          <CardHeader>
            <CardTitle>Payment details</CardTitle>
            <CardDescription>Update your billing information and payment method.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--pcs-color-text-muted)]">Card content goes here.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Cancel</Button>
            <Button className="ml-auto">Save changes</Button>
          </CardFooter>
        </Card>

        {/* With action in header */}
        <Card>
          <CardHeader>
            <CardTitle>Team members</CardTitle>
            <CardDescription>Invite and manage your team.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">Invite</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--pcs-color-text-muted)]">Card content goes here.</p>
          </CardContent>
        </Card>

        {/* sm size */}
        <Card size="sm">
          <CardHeader>
            <CardTitle>Compact card</CardTitle>
            <CardDescription>Using the sm size variant.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--pcs-color-text-muted)]">Reduced padding and gap.</p>
          </CardContent>
        </Card>
      </div>

      {/* ---- Empty State ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Empty State</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Icon variant */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Icon variant</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <InboxIcon />
                  </EmptyMedia>
                  <EmptyTitle>No messages</EmptyTitle>
                  <EmptyDescription>
                    You're all caught up. New messages will appear here.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FolderOpenIcon />
                  </EmptyMedia>
                  <EmptyTitle>No files yet</EmptyTitle>
                  <EmptyDescription>
                    Upload a file to get started.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm">
                    <UploadIcon />
                    Upload file
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          </div>

          {/* Default media slot */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Default media slot</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia>
                    <SearchIcon className="size-10 text-[color:var(--pcs-color-icon-muted)]" />
                  </EmptyMedia>
                  <EmptyTitle>No results found</EmptyTitle>
                  <EmptyDescription>
                    Try adjusting your search or filters to find what you're looking for.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" size="sm">Clear filters</Button>
                </EmptyContent>
              </Empty>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia>
                    <UsersIcon className="size-10 text-[color:var(--pcs-color-icon-muted)]" />
                  </EmptyMedia>
                  <EmptyTitle>No team members</EmptyTitle>
                  <EmptyDescription>
                    Invite colleagues to collaborate.{' '}
                    <a href="#">Learn more</a>
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm">Invite members</Button>
                  <Button variant="ghost" size="sm">Maybe later</Button>
                </EmptyContent>
              </Empty>
            </div>
          </div>

          {/* Text only */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Text only</p>
            <Empty className="py-8">
              <EmptyHeader>
                <EmptyTitle>Nothing here yet</EmptyTitle>
                <EmptyDescription>
                  Items you create will appear in this list.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};
