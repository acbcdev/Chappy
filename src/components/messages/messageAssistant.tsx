import { getSources } from "@/lib/funtions";
import type { Message as MessageAISDK } from "@ai-sdk/react";
import { Message, MessageContent } from "../ui/message";
import { cn } from "@/lib/utils";
import { Reasoning } from "./reasoning";
import { MessageActionsItem } from "./messageItemActions";
import { SourcesList } from "./SourcesList";

type MessageAssistantProps = {
	children: string;
	isLast?: boolean;
	hasScrollAnchor?: boolean;
	copied?: boolean;
	copyToClipboard?: () => void;
	onReload: () => void;
	parts?: MessageAISDK["parts"];
	status?: "streaming" | "ready" | "submitted" | "error";
};

export function MessageAssistant({
	parts,
	children,
	isLast,
	onReload,
	status,
}: MessageAssistantProps) {
	const sources = getSources(parts);

	// const toolInvocationParts = parts?.filter(
	// 	(part) => part.type === "tool-invocation",
	// );
	const reasoningParts = parts?.find((part) => part.type === "reasoning");

	const contentNullOrEmpty = children === null || children === "";

	const isLastStreaming = status === "streaming" && isLast;

	return (
		<Message
			className={
				"group/assistant flex w-full max-w-3xl flex-1 items-start gap-4 px-6 pb-2"
			}
		>
			<div className={cn("flex min-w-full flex-col gap-2", isLast && "pb-8")}>
				{reasoningParts?.reasoning && (
					<Reasoning reasoning={reasoningParts.reasoning} />
				)}

				{/* {toolInvocationParts && toolInvocationParts.length > 0 && (
					<ToolInvocation toolInvocations={toolInvocationParts} />
				)} */}

				{contentNullOrEmpty ? null : (
					<MessageContent
						className={cn(
							"prose dark:prose-invert relative min-w-full bg-transparent p-0",
							"prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-8 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:mb-3 prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto",
						)}
						markdown={true}
					>
						{children}
					</MessageContent>
				)}
				{sources && sources.length > 0 && <SourcesList sources={sources} />}

				{isLastStreaming || contentNullOrEmpty ? null : (
					<MessageActionsItem text={children} onReload={onReload} />
				)}
			</div>
		</Message>
	);
}
