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
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'

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

export const Overlays: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <DialogShowcase />
      <SheetShowcase />
    </div>
  )
}
