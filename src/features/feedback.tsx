import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Kbd } from "../components/ui/kbd"
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
  InfoIcon,
  SlashIcon,
  TriangleAlertIcon,
} from "lucide-react"

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
    </div>
  );
};
