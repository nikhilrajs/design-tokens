import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '../components/ui/popover'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { AlertTriangleIcon, CalendarIcon, InfoIcon, LinkIcon, MessageSquareIcon, Settings2Icon, Trash2Icon, UserIcon } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../components/ui/hover-card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip'

// ---------------------------------------------------------------------------
// Sheet showcase
// ---------------------------------------------------------------------------

type SheetSide = 'right' | 'left' | 'top' | 'bottom'

function SheetShowcase() {
  const [open, setOpen] = useState(false)
  // activeSide is set on open and held stable through the close animation
  const [activeSide, setActiveSide] = useState<SheetSide>('right')

  const sides: SheetSide[] = ['right', 'left', 'top', 'bottom']

  function openSheet(side: SheetSide) {
    setActiveSide(side)
    setOpen(true)
  }

  return (
    <>
      {/* activeSide never resets to a fallback during close — no mid-animation side switch */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={activeSide}>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Alex Chen" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sheet-email">Email</Label>
              <Input id="sheet-email" defaultValue="alex@example.com" />
            </div>
          </div>
          <SheetFooter className="px-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Trigger row */}
      <Card>
        <CardHeader>
          <CardTitle>Sheet — sides</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {sides.map((side) => (
            <Button key={side} variant="outline" onClick={() => openSheet(side)}>
              Open {side}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Scrim comparison — narrow sheet with minimal content to see the overlay */}
      <Card>
        <CardHeader>
          <CardTitle>Sheet — header anatomy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Open any sheet above to inspect:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Title weight</strong> — currently <code>font-semibold</code> (600). Compare against <code>font-medium</code> (500) preference.</li>
            <li><strong>Header gap</strong> — currently <code>gap-0.5</code> (2px between title and description). Token says 4px, shadcn default is 6px.</li>
            <li><strong>Overlay scrim</strong> — dark navy at 64% opacity (<code>--pcs-primitive-color-neutral-alpha-on-light-500</code>).</li>
          </ul>
        </CardContent>
      </Card>
    </>
  )
}

// ---------------------------------------------------------------------------
// Alert Dialog showcase
// ---------------------------------------------------------------------------

function AlertDialogShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Dialog</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">

        {/* Default — confirmation */}
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline">Confirmation</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save changes?</AlertDialogTitle>
              <AlertDialogDescription>
                Your unsaved changes will be lost if you leave without saving.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Discard</AlertDialogCancel>
              <AlertDialogAction>Save changes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Destructive */}
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline">Destructive</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your account and all associated data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* With media icon */}
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline">With icon</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <AlertTriangleIcon className="text-[color:var(--pcs-color-warning-icon)]" />
              </AlertDialogMedia>
              <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Are you sure you want to leave this page?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay</AlertDialogCancel>
              <AlertDialogAction>Leave page</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* sm size — destructive with icon */}
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline">Small size</Button>} />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia>
                <Trash2Icon className="text-[color:var(--pcs-color-error-icon)]" />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete file?</AlertDialogTitle>
              <AlertDialogDescription>
                This file will be moved to trash.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Dialog showcase
// ---------------------------------------------------------------------------

function DialogShowcase() {
  const [openSimple, setOpenSimple] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [openDestructive, setOpenDestructive] = useState(false)

  return (
    <>
      <Dialog open={openSimple} onOpenChange={setOpenSimple}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save changes?</DialogTitle>
            <DialogDescription>
              Your unsaved changes will be lost if you leave without saving.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSimple(false)}>Discard</Button>
            <Button onClick={() => setOpenSimple(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your display name and email address.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" defaultValue="Alex Chen" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dialog-email">Email</Label>
              <Input id="dialog-email" defaultValue="alex@example.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenForm(false)}>Cancel</Button>
            <Button onClick={() => setOpenForm(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDestructive} onOpenChange={setOpenDestructive}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All data associated with this project will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDestructive(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpenDestructive(false)}>Delete project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setOpenSimple(true)}>Confirmation</Button>
          <Button variant="outline" onClick={() => setOpenForm(true)}>Form</Button>
          <Button variant="outline" onClick={() => setOpenDestructive(true)}>Destructive</Button>
        </CardContent>
      </Card>
    </>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Popover showcase
// ---------------------------------------------------------------------------

function PopoverShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popover</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Basic */}
        <div>
          <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Basic</p>
          <div className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger render={<Button variant="outline"><InfoIcon />Info</Button>} />
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>What is this?</PopoverTitle>
                  <PopoverDescription>
                    This is a popover. It stays open until you click outside or press Escape.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger render={<Button variant="outline"><UserIcon />Account</Button>} />
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Alex Chen</PopoverTitle>
                  <PopoverDescription>alex.chen@example.com · Admin</PopoverDescription>
                </PopoverHeader>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" className="flex-1">Profile</Button>
                  <Button size="sm" variant="outline" className="flex-1">Sign out</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* With form */}
        <div>
          <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">With form</p>
          <Popover>
            <PopoverTrigger render={<Button variant="outline"><Settings2Icon />Edit dimensions</Button>} />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>Set the width and height for this element.</PopoverDescription>
              </PopoverHeader>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="space-y-1">
                  <Label htmlFor="pop-width" className="text-xs">Width</Label>
                  <Input id="pop-width" defaultValue="100%" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pop-height" className="text-xs">Height</Label>
                  <Input id="pop-height" defaultValue="auto" />
                </div>
              </div>
              <Button size="sm" className="w-full mt-2">Apply</Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Placement */}
        <div>
          <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Placement</p>
          <div className="flex flex-wrap gap-3">
            {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
              <Popover key={side}>
                <PopoverTrigger render={<Button variant="outline" className="capitalize">{side}</Button>} />
                <PopoverContent side={side}>
                  <PopoverDescription>Opens to the {side}.</PopoverDescription>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Hover Card showcase
// ---------------------------------------------------------------------------

function HoverCardShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hover Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* User profile */}
        <div>
          <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">User profile</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <HoverCard>
              <HoverCardTrigger
                render={
                  <span className="cursor-pointer font-medium underline underline-offset-4 text-[color:var(--pcs-color-primary-emphasis)]">
                    @alex_chen
                  </span>
                }
              />
              <HoverCardContent>
                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--pcs-color-surface-muted)]">
                    <UserIcon className="size-5 text-[color:var(--pcs-color-icon-muted)]" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="font-[number:var(--pcs-text-label-lg-weight)] text-[color:var(--pcs-color-text-default)]">Alex Chen</p>
                    <p className="text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)]">@alex_chen</p>
                    <p className="text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)] pt-1">
                      Design systems engineer. Building Proteus2.
                    </p>
                    <div className="flex gap-3 pt-1 text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)]">
                      <span><strong className="text-[color:var(--pcs-color-text-default)]">142</strong> Following</span>
                      <span><strong className="text-[color:var(--pcs-color-text-default)]">3.4k</strong> Followers</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger
                render={
                  <span className="cursor-pointer font-medium underline underline-offset-4 text-[color:var(--pcs-color-primary-emphasis)]">
                    @nikhil_raj
                  </span>
                }
              />
              <HoverCardContent>
                <div className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--pcs-color-surface-muted)]">
                    <UserIcon className="size-5 text-[color:var(--pcs-color-icon-muted)]" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="font-[number:var(--pcs-text-label-lg-weight)] text-[color:var(--pcs-color-text-default)]">Nikhil Raj</p>
                    <p className="text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)]">@nikhil_raj</p>
                    <p className="text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)] pt-1">
                      Product designer. Focused on scalable UI systems.
                    </p>
                    <div className="flex gap-3 pt-1 text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)]">
                      <span><strong className="text-[color:var(--pcs-color-text-default)]">89</strong> Following</span>
                      <span><strong className="text-[color:var(--pcs-color-text-default)]">1.2k</strong> Followers</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Link preview */}
        <div>
          <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-4">Link preview</p>
          <HoverCard>
            <HoverCardTrigger
              render={
                <span className="inline-flex items-center gap-1.5 cursor-pointer text-sm font-medium underline underline-offset-4 text-[color:var(--pcs-color-primary-emphasis)]">
                  <LinkIcon className="size-3.5" />
                  Proteus2 Design System
                </span>
              }
            />
            <HoverCardContent side="top">
              <div className="space-y-2">
                <p className="font-[number:var(--pcs-text-label-lg-weight)] text-[color:var(--pcs-color-text-default)]">
                  Proteus2 Design System
                </p>
                <p className="text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)]">
                  Shared token and component library for all web products. Built on Base UI + Tailwind CSS 4.
                </p>
                <div className="flex items-center gap-1.5 text-[length:var(--pcs-hover-card-meta-font-size)] text-[color:var(--pcs-hover-card-meta-color)]">
                  <CalendarIcon className="size-3.5" />
                  Last updated March 2025
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Floating UIs inside overlay context
// Tooltip, Popover, and HoverCard must render above the modal/sheet scrim
// (z-tooltip: 600 > z-modal: 400). This showcase surfaces any z-index
// regression visually.
// ---------------------------------------------------------------------------

function FloatingInOverlayShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)

  const floatingContent = (
    <div className="flex flex-col gap-6">
      {/* Tooltip */}
      <div>
        <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-3">
          Tooltip
        </p>
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="outline" size="sm">
                    <InfoIcon />
                    Hover me
                  </Button>
                }
              />
              <TooltipContent>Should appear above the overlay</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="outline" size="sm">
                    <MessageSquareIcon />
                    Another tip
                  </Button>
                }
              />
              <TooltipContent side="right">Tooltip to the right</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Popover */}
      <div>
        <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-3">
          Popover
        </p>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" size="sm">
                  <Settings2Icon />
                  Open popover
                </Button>
              }
            />
            <PopoverContent side="bottom">
              <PopoverHeader>
                <PopoverTitle>Popover inside overlay</PopoverTitle>
                <PopoverDescription>
                  This should float above the modal/sheet scrim.
                </PopoverDescription>
              </PopoverHeader>
              <div className="pt-1 space-y-1">
                <Label htmlFor="floating-pop-w" className="text-xs">Width</Label>
                <Input id="floating-pop-w" defaultValue="100%" />
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" size="sm">
                  <UserIcon />
                  Account
                </Button>
              }
            />
            <PopoverContent side="top">
              <PopoverHeader>
                <PopoverTitle>Alex Chen</PopoverTitle>
                <PopoverDescription>alex.chen@example.com · Admin</PopoverDescription>
              </PopoverHeader>
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="outline" className="flex-1">Profile</Button>
                <Button size="sm" variant="outline" className="flex-1">Sign out</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Hover Card */}
      <div>
        <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-3">
          Hover Card
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <HoverCard>
            <HoverCardTrigger
              render={
                <span className="cursor-pointer font-medium underline underline-offset-4 text-[color:var(--pcs-color-primary-emphasis)]">
                  @alex_chen
                </span>
              }
            />
            <HoverCardContent side="bottom">
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--pcs-color-surface-muted)]">
                  <UserIcon className="size-4 text-[color:var(--pcs-color-icon-muted)]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="font-semibold text-[color:var(--pcs-color-text-default)]">Alex Chen</p>
                  <p className="text-xs text-[color:var(--pcs-color-text-muted)]">Design systems engineer. Building Proteus2.</p>
                  <div className="flex gap-3 pt-0.5 text-xs text-[color:var(--pcs-color-text-muted)]">
                    <span><strong className="text-[color:var(--pcs-color-text-default)]">142</strong> Following</span>
                    <span><strong className="text-[color:var(--pcs-color-text-default)]">3.4k</strong> Followers</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger
              render={
                <span className="inline-flex items-center gap-1.5 cursor-pointer text-sm font-medium underline underline-offset-4 text-[color:var(--pcs-color-primary-emphasis)]">
                  <LinkIcon className="size-3.5" />
                  Proteus2 Design System
                </span>
              }
            />
            <HoverCardContent side="top">
              <div className="space-y-1.5">
                <p className="font-semibold text-[color:var(--pcs-color-text-default)]">Proteus2 Design System</p>
                <p className="text-xs text-[color:var(--pcs-color-text-muted)]">
                  Shared token and component library for all web products.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[color:var(--pcs-color-text-muted)]">
                  <CalendarIcon className="size-3.5" />
                  Last updated March 2025
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Floating UIs inside a Dialog</DialogTitle>
            <DialogDescription>
              Tooltip, Popover, and HoverCard should each render above this
              modal overlay (z-tooltip 600 &gt; z-modal 400).
            </DialogDescription>
          </DialogHeader>
          {floatingContent}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Floating UIs inside a Sheet</SheetTitle>
            <SheetDescription>
              Same z-index test as the dialog — each floating element must
              appear above the sheet scrim.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">{floatingContent}</div>
          <div className="px-4 pb-4 mt-2 border-t pt-4">
            <p className="text-xs font-medium text-[color:var(--pcs-color-text-muted)] uppercase tracking-wide mb-3">
              Alert Dialog
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteAlertOpen(true)}
            >
              <Trash2Icon />
              Delete item
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Alert dialog rendered outside the sheet so it layers above it (z-modal 400 > z-overlay 300) */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2Icon className="text-[color:var(--pcs-color-error-icon)]" />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The item will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader>
          <CardTitle>Floating UIs in overlay context</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[color:var(--pcs-color-text-muted)] mb-4">
            Open either overlay and interact with the Tooltip, Popover, and
            HoverCard inside it. Each should appear above the scrim — if any
            float beneath it, the z-index token needs raising.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Button variant="outline" onClick={() => setSheetOpen(true)}>
              Open Sheet
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export const Overlays: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <AlertDialogShowcase />
      <DialogShowcase />
      <SheetShowcase />
      <PopoverShowcase />
      <HoverCardShowcase />
      <FloatingInOverlayShowcase />
    </div>
  )
}
