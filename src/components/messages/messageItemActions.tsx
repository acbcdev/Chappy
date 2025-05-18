"use client";

import { MessageAction, MessageActions } from "@/components/ui/message";
import { Button } from "@/components/ui/button";
import { Check, Copy, RotateCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { type ReactNode, useState } from "react";

export function MessageActionsItem({
	text,
	onReload,
}: {
	text: string & ReactNode;
	onReload: () => void;
}) {
	const [liked, setLiked] = useState<boolean | null>(null);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text as string);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<MessageActions className="self-start group-hover/assistant:opacity-100 duration-300 opacity-0">
			<MessageAction tooltip="Copy to clipboard">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 rounded-full"
					onClick={handleCopy}
				>
					{copied ? <Check /> : <Copy />}
				</Button>
			</MessageAction>

			<MessageAction tooltip="Regenerate">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 rounded-full"
					onClick={onReload}
				>
					<RotateCw className="size-4" />
				</Button>
			</MessageAction>

			<MessageAction tooltip="Helpful">
				<Button
					variant="ghost"
					size="icon"
					className={`h-8 w-8 rounded-full ${liked === true ? "bg-green-100 text-green-500" : ""}`}
					onClick={() => setLiked((prev) => (prev === true ? null : true))}
				>
					<ThumbsUp className="size-4" />
				</Button>
			</MessageAction>

			<MessageAction tooltip="Not helpful">
				<Button
					variant="ghost"
					size="icon"
					className={`h-8 w-8 rounded-full ${liked === false ? "bg-red-100 text-red-500" : ""}`}
					onClick={() => setLiked((prev) => (prev === false ? null : false))}
				>
					<ThumbsDown className="size-4" />
				</Button>
			</MessageAction>
		</MessageActions>
	);
}
