import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  BoldIcon,
  ChevronDownIcon,
  ClipboardIcon,
  CopyIcon,
  ScissorsIcon,
  DownloadIcon,
  EllipsisIcon,
  FilePlusIcon,
  FolderOpenIcon,
  LayoutIcon,
  LogOutIcon,
  MoonIcon,
  PrinterIcon,
  SaveIcon,
  Settings2Icon,
  SunIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

export const Menus: React.FC = () => {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showPanel, setShowPanel] = useState(false)
  const [theme, setTheme] = useState("system")

  return (
    <div className="space-y-4">

      {/* ---- Dropdown Menu ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Dropdown Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Basic */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Basic</p>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline">
                  Open menu <ChevronDownIcon className="ml-1 size-4" />
                </Button>
              } />
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2Icon />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DownloadIcon />
                  Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Ghost trigger variants */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Ghost triggers</p>
            <div className="flex flex-wrap items-center gap-3">

              {/* Ghost text + chevron */}
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button variant="ghost">
                    Options <ChevronDownIcon className="ml-1 size-4" />
                  </Button>
                } />
                <DropdownMenuContent>
                  <DropdownMenuItem><UserIcon />Profile</DropdownMenuItem>
                  <DropdownMenuItem><Settings2Icon />Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive"><LogOutIcon />Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Ghost icon-only */}
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button variant="ghost" size="icon" aria-label="More options">
                    <EllipsisIcon />
                  </Button>
                } />
                <DropdownMenuContent>
                  <DropdownMenuItem><CopyIcon />Duplicate</DropdownMenuItem>
                  <DropdownMenuItem><DownloadIcon />Download</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive"><Trash2Icon />Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Ghost icon + label — common in toolbars */}
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button variant="ghost">
                    <UserIcon />
                    Account
                  </Button>
                } />
                <DropdownMenuContent>
                  <DropdownMenuItem><UserIcon />Profile</DropdownMenuItem>
                  <DropdownMenuItem><Settings2Icon />Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive"><LogOutIcon />Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>

          {/* Groups + labels + shortcuts */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Groups and keyboard shortcuts</p>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline">
                  File <ChevronDownIcon className="ml-1 size-4" />
                </Button>
              } />
              <DropdownMenuContent className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <FilePlusIcon />
                    New file
                    <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderOpenIcon />
                    Open
                    <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SaveIcon />
                    Save
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Edit</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <ScissorsIcon />
                    Cut
                    <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CopyIcon />
                    Copy
                    <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ClipboardIcon />
                    Paste
                    <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PrinterIcon />
                  Print
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Destructive + disabled items */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Destructive and disabled items</p>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" size="icon" aria-label="More options">
                  <EllipsisIcon />
                </Button>
              } />
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <CopyIcon />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <BoldIcon />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete
                  <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Disabled trigger */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Disabled trigger</p>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button variant="outline">
                    Open menu <ChevronDownIcon className="ml-1 size-4" />
                  </Button>
                } />
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu disabled>
                <DropdownMenuTrigger render={
                  <Button variant="outline" disabled>
                    Open menu <ChevronDownIcon className="ml-1 size-4" />
                  </Button>
                } />
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Checkbox items */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Checkbox items</p>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline">
                  <LayoutIcon />
                  View <ChevronDownIcon className="ml-1 size-4" />
                </Button>
              } />
              <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Panels</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Side panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Radio items */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Radio items</p>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline">
                  {theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <Settings2Icon />}
                  Theme <ChevronDownIcon className="ml-1 size-4" />
                </Button>
              } />
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <SunIcon />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <MoonIcon />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <Settings2Icon />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sub-menu */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Sub-menu</p>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline">
                  <UserIcon />
                  Account <ChevronDownIcon className="ml-1 size-4" />
                </Button>
              } />
              <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Settings2Icon />
                    Settings
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>General</DropdownMenuItem>
                    <DropdownMenuItem>Security</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                  </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </CardContent>
      </Card>

      {/* ---- Select ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Select</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Sizes */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Select>
                <SelectTrigger size="sm" className="w-40">
                  <SelectValue placeholder="Small" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                    <SelectItem value="opt3">Option 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                    <SelectItem value="opt3">Option 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* States */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">States</p>
            <div className="flex flex-wrap items-center gap-3">
              <Select>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="selected">
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="selected">Selected value</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="opt1">Option 1</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* With groups and labels */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With groups</p>
            <Select>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="cst">Central Time (CT)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="cet">Central European Time (CET)</SelectItem>
                  <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Disabled item */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Disabled item</p>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise" disabled>Enterprise (contact sales)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </CardContent>
      </Card>

      {/* ---- Tabs ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Default variant */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Default</p>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-3 text-sm text-[color:var(--pcs-color-text-muted)]">Manage your account settings and preferences.</TabsContent>
              <TabsContent value="billing" className="pt-3 text-sm text-[color:var(--pcs-color-text-muted)]">View invoices and manage your payment methods.</TabsContent>
              <TabsContent value="notifications" className="pt-3 text-sm text-[color:var(--pcs-color-text-muted)]">Configure how and when you receive notifications.</TabsContent>
              <TabsContent value="security" className="pt-3 text-sm text-[color:var(--pcs-color-text-muted)]">Update your password and two-factor authentication settings.</TabsContent>
            </Tabs>
          </div>

          {/* Line variant */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Line</p>
            <Tabs defaultValue="overview">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4 text-sm text-[color:var(--pcs-color-text-muted)]">Summary of key metrics and recent activity.</TabsContent>
              <TabsContent value="analytics" className="pt-4 text-sm text-[color:var(--pcs-color-text-muted)]">Detailed charts and breakdowns by segment.</TabsContent>
              <TabsContent value="reports" className="pt-4 text-sm text-[color:var(--pcs-color-text-muted)]">Scheduled and on-demand reports for your team.</TabsContent>
              <TabsContent value="export" className="pt-4 text-sm text-[color:var(--pcs-color-text-muted)]">Export data as CSV, JSON, or Excel.</TabsContent>
            </Tabs>
          </div>

          {/* Disabled tab */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With disabled tab</p>
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="integrations" disabled>Integrations</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="pt-3 text-sm text-[color:var(--pcs-color-text-muted)]">General workspace settings.</TabsContent>
              <TabsContent value="team" className="pt-3 text-sm text-[color:var(--pcs-color-text-muted)]">Manage team members and roles.</TabsContent>
            </Tabs>
          </div>

          {/* Vertical orientation */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Vertical</p>
            <Tabs defaultValue="profile" orientation="vertical" className="max-w-sm">
              <TabsList className="w-36">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="px-4 text-sm text-[color:var(--pcs-color-text-muted)]">Update your name, photo, and personal details.</TabsContent>
              <TabsContent value="appearance" className="px-4 text-sm text-[color:var(--pcs-color-text-muted)]">Choose your theme and display preferences.</TabsContent>
              <TabsContent value="privacy" className="px-4 text-sm text-[color:var(--pcs-color-text-muted)]">Control who can see your profile and activity.</TabsContent>
            </Tabs>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
