import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
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
import { InfoIcon, Settings2Icon, UserIcon } from 'lucide-react'

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

export const Overlays: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <DialogShowcase />
      <SheetShowcase />
      <PopoverShowcase />
    </div>
  )
}
