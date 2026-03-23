import React from 'react';

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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "../components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"

export const Inputs: React.FC = () => {

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

			{/* ── Size Variants ── */}
			<Card>
				<CardHeader>
					<CardTitle>Size Variants</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						{/* Standalone inputs */}
						<div className="flex items-end gap-4">
							<Field className="w-48">
								<FieldLabel>Small (sm)</FieldLabel>
								<Input size="sm" placeholder="sm input" />
							</Field>
							<Field className="w-48">
								<FieldLabel>Medium (md)</FieldLabel>
								<Input size="md" placeholder="md input" />
							</Field>
							<Field className="w-48">
								<FieldLabel>Large (lg)</FieldLabel>
								<Input size="lg" placeholder="lg input" />
							</Field>
						</div>
						{/* Input + Button alignment */}
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<Input size="sm" placeholder="Search…" className="w-48" />
								<Button size="sm">Search</Button>
							</div>
							<div className="flex items-center gap-2">
								<Input size="md" placeholder="Search…" className="w-48" />
								<Button size="default">Search</Button>
							</div>
							<div className="flex items-center gap-2">
								<Input size="lg" placeholder="Search…" className="w-48" />
								<Button size="lg">Search</Button>
							</div>
						</div>
						{/* InputGroup sizes */}
						<div className="flex flex-col gap-3">
							<InputGroup size="sm" className="w-64">
								<InputGroupAddon align="inline-start">
									<InputGroupText>https://</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput placeholder="domain.com" />
							</InputGroup>
							<InputGroup size="md" className="w-64">
								<InputGroupAddon align="inline-start">
									<InputGroupText>https://</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput placeholder="domain.com" />
							</InputGroup>
							<InputGroup size="lg" className="w-64">
								<InputGroupAddon align="inline-start">
									<InputGroupText>https://</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput placeholder="domain.com" />
							</InputGroup>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* ── Input States ── */}
			<Card>
				<CardHeader>
					<CardTitle>Input States</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4 w-full max-w-sm">
						<Field>
							<FieldLabel>Default</FieldLabel>
							<Input placeholder="Default state" />
						</Field>
						<Field>
							<FieldLabel>Error</FieldLabel>
							<Input placeholder="Error state" aria-invalid="true" />
							<FieldError>This field is required.</FieldError>
						</Field>
						<Field>
							<FieldLabel>Disabled</FieldLabel>
							<Input placeholder="Disabled state" disabled />
						</Field>
						<Field>
							<FieldLabel>Read-only</FieldLabel>
							<Input value="read-only value" readOnly />
						</Field>
					</div>
				</CardContent>
			</Card>
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