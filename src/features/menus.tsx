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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../components/ui/menubar"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../components/ui/context-menu"
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
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  useComboboxAnchor,
} from '../components/ui/combobox'
import { Label } from '../components/ui/label'
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
  PlusIcon,
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
  const [ctxShowRulers, setCtxShowRulers] = useState(false)
  const [ctxViewMode, setCtxViewMode] = useState("fit")
  const [mbShowStatusBar, setMbShowStatusBar] = useState(true)
  const [mbShowPanel, setMbShowPanel] = useState(false)
  const [mbTheme, setMbTheme] = useState("system")
  const [comboSingle, setComboSingle] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Design'])
  const chipsAnchor = useComboboxAnchor()
  const [creatableItems, setCreatableItems] = useState(['React', 'Vue', 'Angular', 'Svelte', 'Solid'])
  const [creatableValue, setCreatableValue] = useState('')
  const [creatableQuery, setCreatableQuery] = useState('')

  function createItem() {
    if (!creatableQuery) return
    setCreatableItems(prev => [...prev, creatableQuery])
    setCreatableValue(creatableQuery)
    setCreatableQuery('')
  }

  return (
    <div className="space-y-4">

      {/* ---- Menubar ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Menubar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Basic */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Basic</p>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <FilePlusIcon />
                    New file
                    <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <FolderOpenIcon />
                    Open
                    <MenubarShortcut>⌘O</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <SaveIcon />
                    Save
                    <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <PrinterIcon />
                    Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <ScissorsIcon />
                    Cut
                    <MenubarShortcut>⌘X</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <CopyIcon />
                    Copy
                    <MenubarShortcut>⌘C</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <ClipboardIcon />
                    Paste
                    <MenubarShortcut>⌘V</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem disabled>
                    <BoldIcon />
                    Find &amp; Replace
                    <MenubarShortcut>⌘H</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarGroup>
                    <MenubarLabel>Panels</MenubarLabel>
                    <MenubarCheckboxItem
                      checked={mbShowStatusBar}
                      onCheckedChange={setMbShowStatusBar}
                    >
                      Status bar
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem
                      checked={mbShowPanel}
                      onCheckedChange={setMbShowPanel}
                    >
                      Side panel
                    </MenubarCheckboxItem>
                  </MenubarGroup>
                  <MenubarSeparator />
                  <MenubarGroup>
                    <MenubarLabel>Appearance</MenubarLabel>
                    <MenubarRadioGroup value={mbTheme} onValueChange={setMbTheme}>
                      <MenubarRadioItem value="light">
                        <SunIcon />
                        Light
                      </MenubarRadioItem>
                      <MenubarRadioItem value="dark">
                        <MoonIcon />
                        Dark
                      </MenubarRadioItem>
                      <MenubarRadioItem value="system">
                        <Settings2Icon />
                        System
                      </MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarGroup>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Documentation</MenubarItem>
                  <MenubarItem>Keyboard shortcuts</MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>More tools</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Developer tools</MenubarItem>
                      <MenubarItem>Extensions</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem variant="destructive">
                    <LogOutIcon />
                    Sign out
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

        </CardContent>
      </Card>

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

      {/* ---- Context Menu ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Context Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Basic — right-click area */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Basic</p>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-[color:var(--pcs-color-border-default)] text-sm text-[color:var(--pcs-color-text-muted)]">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuItem>
                  <CopyIcon />
                  Copy
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <ScissorsIcon />
                  Cut
                  <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <ClipboardIcon />
                  Paste
                  <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          {/* Groups + sub-menu + disabled */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Groups, sub-menu, and disabled</p>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-[color:var(--pcs-color-border-default)] text-sm text-[color:var(--pcs-color-text-muted)]">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuGroup>
                  <ContextMenuLabel>File</ContextMenuLabel>
                  <ContextMenuItem>
                    <FilePlusIcon />
                    New file
                    <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <SaveIcon />
                    Save
                    <ContextMenuShortcut>⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem disabled>
                    <PrinterIcon />
                    Print
                    <ContextMenuShortcut>⌘P</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Settings2Icon />
                    Preferences
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>General</ContextMenuItem>
                    <ContextMenuItem>Appearance</ContextMenuItem>
                    <ContextMenuItem>Shortcuts</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          {/* Checkbox + radio items */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Checkbox and radio items</p>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-[color:var(--pcs-color-border-default)] text-sm text-[color:var(--pcs-color-text-muted)]">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuGroup>
                  <ContextMenuLabel>View</ContextMenuLabel>
                  <ContextMenuCheckboxItem
                    checked={ctxShowRulers}
                    onCheckedChange={setCtxShowRulers}
                  >
                    Show rulers
                  </ContextMenuCheckboxItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuLabel>Zoom</ContextMenuLabel>
                  <ContextMenuRadioGroup value={ctxViewMode} onValueChange={setCtxViewMode}>
                    <ContextMenuRadioItem value="fit">Fit to screen</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="actual">Actual size</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="fill">Fill</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
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

      {/* ---- Combobox ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Combobox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Basic — single select */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Single select</p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="combo-framework">Framework</Label>
            <Combobox value={comboSingle} onValueChange={setComboSingle}>
              <ComboboxInput id="combo-framework" placeholder="Search framework…" className="w-56" />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxItem value="react">React</ComboboxItem>
                  <ComboboxItem value="vue">Vue</ComboboxItem>
                  <ComboboxItem value="angular">Angular</ComboboxItem>
                  <ComboboxItem value="svelte">Svelte</ComboboxItem>
                  <ComboboxItem value="solid">Solid</ComboboxItem>
                  <ComboboxEmpty>No results.</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            </div>
          </div>

          {/* With groups + separator */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Groups and separator</p>
            <Combobox>
              <ComboboxInput placeholder="Select timezone…" className="w-64" showClear />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxGroup>
                    <ComboboxLabel>North America</ComboboxLabel>
                    <ComboboxItem value="est">Eastern Time (ET)</ComboboxItem>
                    <ComboboxItem value="cst">Central Time (CT)</ComboboxItem>
                    <ComboboxItem value="pst">Pacific Time (PT)</ComboboxItem>
                  </ComboboxGroup>
                  <ComboboxSeparator />
                  <ComboboxGroup>
                    <ComboboxLabel>Europe</ComboboxLabel>
                    <ComboboxItem value="gmt">Greenwich (GMT)</ComboboxItem>
                    <ComboboxItem value="cet">Central European (CET)</ComboboxItem>
                  </ComboboxGroup>
                  <ComboboxEmpty>No results.</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          {/* Multi-select with chips */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Multi-select (chips)</p>
            <Combobox
              items={['Design', 'Engineering', 'Product', 'Marketing', 'Data']}
              multiple
              value={selectedTags}
              onValueChange={(v) => setSelectedTags(v)}
            >
              <ComboboxChips ref={chipsAnchor} className="w-72">
                {selectedTags.map((item) => (
                  <ComboboxChip key={item} value={item}>{item}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Add tags…" />
              </ComboboxChips>
              <ComboboxContent anchor={chipsAnchor}>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                  )}
                </ComboboxList>
                <ComboboxEmpty>No results.</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </div>

          {/* Creatable */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Creatable</p>
            <Combobox
              value={creatableValue}
              onValueChange={(v) => { setCreatableValue(v); setCreatableQuery('') }}
            >
              <ComboboxInput
                placeholder="Select or create…"
                className="w-56"
                onChange={(e) => setCreatableQuery((e.target as HTMLInputElement).value)}
              />
              <ComboboxContent>
                <ComboboxList>
                  {creatableItems.map(item => (
                    <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                  ))}
                  <ComboboxEmpty className="justify-start text-left py-0">
                    {creatableQuery ? (
                      <button
                        className="flex w-full items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] py-[var(--pcs-menu-item-padding-y)] px-[var(--pcs-menu-item-padding-x)] text-[length:var(--pcs-menu-item-font-size)] text-foreground hover:bg-[var(--pcs-menu-item-bg-hover)] cursor-default"
                        onMouseDown={(e) => { e.preventDefault(); createItem() }}
                      >
                        <PlusIcon className="size-4 shrink-0 text-muted-foreground" />
                        Create "{creatableQuery}"
                      </button>
                    ) : null}
                  </ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          {/* Disabled */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Disabled</p>
            <Combobox disabled>
              <ComboboxInput placeholder="Unavailable…" className="w-56" disabled />
            </Combobox>
          </div>

        </CardContent>
      </Card>

      {/* ---- Pagination ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Default */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Default</p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">9</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* Active on last page — Next disabled */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Last page (Next disabled)</p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">7</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>9</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" aria-disabled="true" className="pointer-events-none" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* No labels — icon-only controls */}
          <div>
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Icon-only controls</p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" text="" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" text="" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
