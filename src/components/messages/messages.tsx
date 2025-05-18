import type { UIMessage } from "ai";
import { Message } from "./message";
import { useRef } from "react";
import { Loader } from "../ui/loader";
import { ChatContainer } from "../ui/chat-container";
import { ScrollButton } from "../ui/scroll-button";

type MessagesProps = {
	messages: UIMessage[];
	onDelete?: (id: string) => void;
	onEdit?: (id: string, newText: string) => void;
	onReload: () => void;
	status: "streaming" | "ready" | "submitted" | "error";
};

export function Messages({ messages, onReload, status }: MessagesProps) {
	const initialMessageCount = useRef(messages.length);
	const scrollRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	if (!messages || messages.length === 0)
		return <div className="h-full w-full" />;

	return (
		<>
			<ChatContainer
				className="relative flex w-full flex-col gap-y-5 items-center pt-20 pb-4"
				autoScroll={true}
				ref={containerRef}
				scrollToRef={scrollRef}
				style={{
					scrollbarGutter: "stable both-edges",
				}}
			>
				{messages.map((message, index) => {
					const isLast =
						index === messages.length - 1 && status !== "submitted";
					const hasScrollAnchor =
						isLast && messages.length > initialMessageCount.current;
					return (
						<Message
							id={message.id}
							key={message.id}
							attachments={message.experimental_attachments}
							isLast={isLast}
							onDelete={() => {}}
							onEdit={() => {}}
							onReload={onReload}
							hasScrollAnchor={hasScrollAnchor}
							parts={message.parts}
							status={status}
							role={message.role}
						>
							{message.content}
						</Message>
					);
				})}

				{status === "submitted" &&
					messages.length > 0 &&
					messages[messages.length - 1].role === "user" && (
						<div className="group min-h-scroll-anchor flex w-full max-w-3xl flex-col items-start gap-2 px-6 pb-2">
							<Loader variant="pulse-dot" />
						</div>
					)}
			</ChatContainer>
			<div className="absolute bottom-0 w-full max-w-3xl">
				<ScrollButton
					className="absolute top-[-50px] right-[30px]"
					scrollRef={scrollRef}
					containerRef={containerRef}
				/>
			</div>
		</>
	);
}
