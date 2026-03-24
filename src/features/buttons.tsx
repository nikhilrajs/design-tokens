import React, {useState} from 'react';

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
	Toggle
} from "../components/ui/toggle"
import {
	ToggleGroup, ToggleGroupItem
} from "../components/ui/toggle-group"
import {
	Spinner
} from "../components/ui/spinner"
import { ButtonGroup } from "../components/ui/button-group"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
	ArchiveIcon,
	ArrowLeftIcon,
	CalendarPlusIcon,
	ClockIcon,
	ListFilterIcon,
	MailCheckIcon,
	MoreHorizontalIcon,
	PlusIcon,
	SearchIcon,
	Settings2Icon,
	TagIcon,
	Trash2Icon,
} from "lucide-react"

export const Buttons: React.FC = () => {

const [label, setLabel] = useState("personal")
	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Buttons & Button Group</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Variants */}
					<div className="flex flex-wrap gap-2">
						<Button>Default</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="destructive-outline">Destructive Outline</Button>
					</div>

					{/* Rounded */}
					<div className="flex flex-wrap items-center gap-2">
						<Button size="xs" rounded>XSmall</Button>
						<Button size="sm" rounded>Small</Button>
						<Button rounded>Medium</Button>
						<Button size="lg" rounded>Large</Button>
						<Button variant="outline" rounded>Outline</Button>
						<Button variant="ghost" rounded>Ghost</Button>
					</div>

					{/* Sizes */}
					<div className="flex flex-wrap items-center gap-2">
						<Button size="xs">XSmall</Button>
						<Button size="sm">Small</Button>
						<Button>Medium</Button>
						<Button size="lg">Large</Button>
					</div>

					{/* Icon-only sizes */}
					<div className="flex flex-wrap items-center gap-2">
						<Button variant="outline" size="icon-xs" aria-label="Settings"><Settings2Icon /></Button>
						<Button variant="outline" size="icon-sm" aria-label="Settings"><Settings2Icon /></Button>
						<Button variant="outline" size="icon" aria-label="Settings"><Settings2Icon /></Button>
						<Button variant="outline" size="icon-lg" aria-label="Settings"><Settings2Icon /></Button>
					</div>

					{/* xs filter group — intended use case */}
					<div className="flex flex-wrap items-center gap-2">
						<ButtonGroup>
							<Button variant="outline" size="xs"><ListFilterIcon />All</Button>
							<Button variant="outline" size="xs">Open</Button>
							<Button variant="outline" size="xs">In Progress</Button>
							<Button variant="outline" size="xs">Closed</Button>
						</ButtonGroup>
					</div>

					{/* Icon + label */}
					<div className="flex flex-wrap items-center gap-2">
						<Button><PlusIcon />New Issue</Button>
						<Button variant="outline"><SearchIcon />Search</Button>
					</div>

					{/* States */}
					<div className="flex flex-wrap items-center gap-2">
						<Button disabled>Disabled</Button>
						<Button variant="outline" disabled>Disabled Outline</Button>
						<Button><Spinner className="mr-2 h-4 w-4" />Loading</Button>
					</div>

					{/* Button Group */}
					<div className="flex flex-wrap gap-2">
						<ButtonGroup>
							<ButtonGroup className="hidden sm:flex">
								<Button variant="outline" size="icon" aria-label="Go Back">
									<ArrowLeftIcon />
								</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button variant="outline">Archive</Button>
								<Button variant="outline">Report</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button variant="outline">Snooze</Button>
								<DropdownMenu>
									<DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More Options"><MoreHorizontalIcon /></Button>} />
									<DropdownMenuContent align="end" className="w-40">
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<MailCheckIcon />
												Mark as Read
											</DropdownMenuItem>
											<DropdownMenuItem>
												<ArchiveIcon />
												Archive
											</DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<ClockIcon />
												Snooze
											</DropdownMenuItem>
											<DropdownMenuItem>
												<CalendarPlusIcon />
												Add to Calendar
											</DropdownMenuItem>
											<DropdownMenuItem>
												<ListFilterIcon />
												Add to List
											</DropdownMenuItem>
											<DropdownMenuSub>
												<DropdownMenuSubTrigger>
													<TagIcon />
													Label As...
												</DropdownMenuSubTrigger>
												<DropdownMenuSubContent>
													<DropdownMenuRadioGroup
														value={label}
														onValueChange={setLabel}
													>
														<DropdownMenuRadioItem value="personal">
															Personal
														</DropdownMenuRadioItem>
														<DropdownMenuRadioItem value="work">
															Work
														</DropdownMenuRadioItem>
														<DropdownMenuRadioItem value="other">
															Other
														</DropdownMenuRadioItem>
													</DropdownMenuRadioGroup>
												</DropdownMenuSubContent>
											</DropdownMenuSub>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem variant="destructive">
												<Trash2Icon />
												Trash
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</ButtonGroup>
						</ButtonGroup>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Toggle & Toggle Group</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-4">
						<Toggle variant="outline">Bold</Toggle>
						<ToggleGroup variant="outline" defaultValue={["bold"]}>
							<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
							<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
							<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};