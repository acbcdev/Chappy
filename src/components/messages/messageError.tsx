import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

type MessageErrorProps = {
	error: Error;
	onReload: () => void;
};

export function MessageError({ error, onReload }: MessageErrorProps) {
	return (
		<Card className="border-destructive/20 bg-destructive/5 w-full max-w-3xl ">
			<CardContent className="pt-4">
				<div className="flex items-start gap-3">
					<AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
					<div className="space-y-1.5">
						<h4 className="font-medium text-destructive">Error</h4>
						<p className="text-sm text-foreground/90">{error.message}</p>
						<Button onClick={onReload}>Reload</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
