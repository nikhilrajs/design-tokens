import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../components/ui/field"
import { Input } from "../components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../components/ui/input-group"
import { SearchIcon, EyeIcon, EyeOffIcon, DollarSignIcon, AtSignIcon } from "lucide-react"

export const Inputs: React.FC = () => {

	const [showPassword, setShowPassword] = useState(false)

	const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]
const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

	return (
		<div className="space-y-4">
			{/* Input States Showcase */}
			<Card>
				<CardHeader>
					<CardTitle>Input States</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Textarea states */}
					<div>
						<p className="text-sm font-medium text-[color:var(--pcs-color-text-muted)] mb-3">Textarea</p>
						<div className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-lg">
							<Field>
								<FieldLabel htmlFor="textarea-default">Default</FieldLabel>
								<Textarea id="textarea-default" placeholder="Enter your message…" />
							</Field>
							<Field>
								<FieldLabel htmlFor="textarea-error">Error</FieldLabel>
								<Textarea
									id="textarea-error"
									aria-invalid="true"
									defaultValue="Too short"
								/>
								<FieldError>Message must be at least 20 characters</FieldError>
							</Field>
							<Field>
								<FieldLabel htmlFor="textarea-disabled">Disabled</FieldLabel>
								<Textarea id="textarea-disabled" placeholder="Not editable" disabled />
							</Field>
							<Field>
								<FieldLabel htmlFor="textarea-readonly">Read-only</FieldLabel>
								<Textarea id="textarea-readonly" readOnly defaultValue="Read-only content" />
							</Field>
							<Field>
								<FieldLabel htmlFor="textarea-fixed">Fixed height (autoResize=false)</FieldLabel>
								<Textarea
									id="textarea-fixed"
									autoResize={false}
									className="h-24"
									placeholder="Fixed at 96px, scrolls when full…"
								/>
							</Field>
						</div>
					</div>

					{/* Input states */}
					<div className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-lg">
						<Field>
							<FieldLabel htmlFor="state-default">Default</FieldLabel>
							<Input id="state-default" placeholder="Enter text…" />
						</Field>
						<Field>
							<FieldLabel htmlFor="state-error">Error</FieldLabel>
							<Input
								id="state-error"
								placeholder="Enter text…"
								aria-invalid="true"
								defaultValue="invalid@"
							/>
							<FieldError>This field is required</FieldError>
						</Field>
						<Field>
							<FieldLabel htmlFor="state-disabled">Disabled</FieldLabel>
							<Input id="state-disabled" placeholder="Not editable" disabled />
						</Field>
						<Field>
							<FieldLabel htmlFor="state-readonly">Read-only</FieldLabel>
							<Input
								id="state-readonly"
								readOnly
								defaultValue="Read-only content"
							/>
						</Field>
					</div>

					{/* Size comparison */}
					<div>
						<p className="text-sm font-medium text-[color:var(--pcs-color-text-muted)] mb-3">Sizes</p>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<Input size="sm" placeholder="Small" className="max-w-48" />
								<Button size="sm">Button</Button>
							</div>
							<div className="flex items-center gap-2">
								<Input placeholder="Medium" className="max-w-48" />
								<Button>Button</Button>
							</div>
							<div className="flex items-center gap-2">
								<Input size="lg" placeholder="Large" className="max-w-48" />
								<Button size="lg">Button</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Input Group Showcase */}
			<Card>
				<CardHeader>
					<CardTitle>Input Group</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4 max-w-sm">
						{/* Search — leading icon */}
						<Field>
							<FieldLabel htmlFor="ig-search">Search</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText><SearchIcon /></InputGroupText>
								</InputGroupAddon>
								<InputGroupInput id="ig-search" placeholder="Search…" />
							</InputGroup>
						</Field>

						{/* Email — leading text addon */}
						<Field>
							<FieldLabel htmlFor="ig-email">Email</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText><AtSignIcon /></InputGroupText>
								</InputGroupAddon>
								<InputGroupInput id="ig-email" type="email" placeholder="you@example.com" />
							</InputGroup>
						</Field>

						{/* Price — leading symbol, trailing unit */}
						<Field>
							<FieldLabel htmlFor="ig-price">Price</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText><DollarSignIcon /></InputGroupText>
								</InputGroupAddon>
								<InputGroupInput id="ig-price" type="number" placeholder="0.00" />
								<InputGroupAddon align="inline-end">
									<InputGroupText>USD</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</Field>

						{/* Password — trailing toggle button */}
						<Field>
							<FieldLabel htmlFor="ig-password">Password</FieldLabel>
							<InputGroup>
								<InputGroupInput
									id="ig-password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter password"
								/>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										aria-label={showPassword ? "Hide password" : "Show password"}
										onClick={() => setShowPassword(v => !v)}
									>
										{showPassword ? <EyeOffIcon /> : <EyeIcon />}
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
						</Field>

						{/* Textarea in a group */}
						<Field>
							<FieldLabel htmlFor="ig-notes">Notes</FieldLabel>
							<InputGroup>
								<InputGroupTextarea id="ig-notes" placeholder="Add a note…" />
							</InputGroup>
						</Field>

						{/* Error state */}
						<Field>
							<FieldLabel htmlFor="ig-error">Error state</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText><AtSignIcon /></InputGroupText>
								</InputGroupAddon>
								<InputGroupInput
									id="ig-error"
									aria-invalid="true"
									defaultValue="not-an-email"
								/>
							</InputGroup>
							<FieldError>Enter a valid email address</FieldError>
						</Field>
					</div>
				</CardContent>
			</Card>

			{/* Payment Method form */}
			<Card>
				<CardHeader>
					<CardTitle>Input & Textarea</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="w-full max-w-md">
						<form>
							<FieldGroup>
								<FieldSet>
									<FieldLegend>Payment Method</FieldLegend>
									<FieldDescription>
										All transactions are secure and encrypted
									</FieldDescription>
									<FieldGroup>
										<Field>
											<FieldLabel htmlFor="checkout-7j9-card-name-43j">
												Name on Card
											</FieldLabel>
											<Input
												id="checkout-7j9-card-name-43j"
												placeholder="Evil Rabbit"
												required
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor="checkout-7j9-card-number-uw1">
												Card Number
											</FieldLabel>
											<Input
												id="checkout-7j9-card-number-uw1"
												placeholder="1234 5678 9012 3456"
												required
											/>
											<FieldDescription>
												Enter your 16-digit card number
											</FieldDescription>
										</Field>
										<div className="grid grid-cols-3 gap-4">
											<Field>
												<FieldLabel htmlFor="checkout-exp-month-ts6">
													Month
												</FieldLabel>
												<Select items={months}>
													<SelectTrigger id="checkout-exp-month-ts6">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{months.map((item) => (
																<SelectItem key={item.value} value={item.value}>
																	{item.label}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</Field>
											<Field>
												<FieldLabel htmlFor="checkout-7j9-exp-year-f59">
													Year
												</FieldLabel>
												<Select items={years}>
													<SelectTrigger id="checkout-7j9-exp-year-f59">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{years.map((item) => (
																<SelectItem key={item.value} value={item.value}>
																	{item.label}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</Field>
											<Field>
												<FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
												<Input id="checkout-7j9-cvv" placeholder="123" required />
											</Field>
										</div>
									</FieldGroup>
								</FieldSet>
								<FieldSeparator />
								<FieldSet>
									<FieldLegend>Billing Address</FieldLegend>
									<FieldDescription>
										The billing address associated with your payment method
									</FieldDescription>
									<FieldGroup>
										<Field orientation="horizontal">
											<Checkbox
												id="checkout-7j9-same-as-shipping-wgm"
												defaultChecked
											/>
											<FieldLabel
												htmlFor="checkout-7j9-same-as-shipping-wgm"
												className="font-normal"
											>
												Same as shipping address
											</FieldLabel>
										</Field>
									</FieldGroup>
								</FieldSet>
								<FieldSet>
									<FieldGroup>
										<Field>
											<FieldLabel htmlFor="checkout-7j9-optional-comments">
												Comments
											</FieldLabel>
											<Textarea
												id="checkout-7j9-optional-comments"
												placeholder="Add any additional comments"
												className="resize-none"
											/>
										</Field>
									</FieldGroup>
								</FieldSet>
								<Field orientation="horizontal">
									<Button type="submit">Submit</Button>
									<Button variant="outline" type="button">
										Cancel
									</Button>
								</Field>
							</FieldGroup>
						</form>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};