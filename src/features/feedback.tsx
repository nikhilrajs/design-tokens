import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

export const Feedback: React.FC = () => {

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Feedback</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-2">
						Feedback
					</div>
				</CardContent>
			</Card>
		</div>
	);
};