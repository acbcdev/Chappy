import type { Message as MessageType } from "@ai-sdk/react";
import { Message, MessageContent } from "../ui/message";
import { cn } from "@/lib/utils";

type MessageUserProps = {
	hasScrollAnchor?: boolean;
	attachments?: MessageType["experimental_attachments"];
	children: string;
	onEdit: (id: string, newText: string) => void;
	onReload: () => void;
	onDelete: (id: string) => void;
	id: string;
};

export function MessageUser({ children, hasScrollAnchor }: MessageUserProps) {
	// const [isEditing, setIsEditing] = useState(false);

	return (
		<Message
			className={cn(
				"group flex w-full max-w-3xl flex-col items-end gap-0.5 px-6 pb-2",
				hasScrollAnchor && "min-h-scroll-anchor",
			)}
		>
			{/* {attachments?.map((attachment, index) => (
				<div
					className="flex flex-row gap-2"
					key={`${attachment.name}-${index}`}
				>
					{attachment.contentType?.startsWith("image") ? (
						<MorphingDialog
							transition={{
								type: "spring",
								stiffness: 280,
								damping: 18,
								mass: 0.3,
							}}
						>
							<MorphingDialogTrigger className="z-10">
								<img
									className="mb-1 w-40 rounded-md"
									key={attachment.name}
									src={attachment.url}
									alt={attachment.name}
								/>
							</MorphingDialogTrigger>
							<MorphingDialogContainer>
								<MorphingDialogContent className="relative rounded-lg">
									<MorphingDialogImage
										src={attachment.url}
										alt={attachment.name || ""}
										className="max-h-[90vh] max-w-[90vw] object-contain"
									/>
								</MorphingDialogContent>
								<MorphingDialogClose className="text-primary" />
							</MorphingDialogContainer>
						</MorphingDialog>
					) : attachment.contentType?.startsWith("text") ? (
						<div className="text-primary mb-3 h-24 w-40 overflow-hidden rounded-md border p-2 text-xs">
							{getTextFromDataUrl(attachment.url)}
						</div>
					) : null}
				</div>
			))} */}
			{/* {isEditing ? (
				<div
					className="bg-accent relative flex min-w-[180px] flex-col gap-2 rounded-3xl px-5 py-2.5"
					style={{
						width: contentRef.current?.offsetWidth,
					}}
				>
					<textarea
						className="w-full resize-none bg-transparent outline-none"
						value={editInput}
						onChange={(e) => setEditInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSave();
							}
							if (e.key === "Escape") {
								handleEditCancel();
							}
						}}
						autoFocus
					/>
					<div className="flex justify-end gap-2">
						<Button size="sm" variant="ghost" onClick={handleEditCancel}>
							Cancel
						</Button>
						<Button size="sm" onClick={handleSave}>
							Save
						</Button>
					</div>
				</div>
			) : ( */}
			<MessageContent
				className="bg-accent relative max-w-[70%] rounded-3xl px-5 py-2.5"
				markdown={true}
				// ref={contentRef}
				components={{
					code: ({ children }) => <>{children}</>,
					pre: ({ children }) => <>{children}</>,
					h1: ({ children }) => <p>{children}</p>,
					h2: ({ children }) => <p>{children}</p>,
					h3: ({ children }) => <p>{children}</p>,
					h4: ({ children }) => <p>{children}</p>,
					h5: ({ children }) => <p>{children}</p>,
					h6: ({ children }) => <p>{children}</p>,
					p: ({ children }) => <p>{children}</p>,
					li: ({ children }) => <p>- {children}</p>,
					ul: ({ children }) => <>{children}</>,
					ol: ({ children }) => <>{children}</>,
				}}
			>
				{children}
			</MessageContent>
			{/* )} */}
		</Message>
	);
}
