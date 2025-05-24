import type { Message as MessageType } from "@ai-sdk/react";
import { MessageUser } from "./messageUser";
import { MessageAssistant } from "./messageAssistant";

type MessageProps = {
  role: MessageType["role"];
  children: string;
  id: string;
  attachments?: MessageType["experimental_attachments"];
  isLast?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onReload: VoidFunction;
  hasScrollAnchor?: boolean;
  parts?: MessageType["parts"];
  status?: "streaming" | "ready" | "submitted" | "error";
};

export function Message({
  role,
  children,
  id,
  attachments,
  isLast,
  hasScrollAnchor,
  parts,
  status,
  onDelete,
  onEdit,
  onReload,
}: MessageProps) {
  if (role === "user") {
    return (
      <MessageUser
        id={id}
        onDelete={onDelete}
        onEdit={onEdit}
        onReload={onReload}
        hasScrollAnchor={hasScrollAnchor}
        attachments={attachments}
      >
        {children}
      </MessageUser>
    );
  }

  if (role === "assistant") {
    return (
      <MessageAssistant
        isLast={isLast}
        hasScrollAnchor={hasScrollAnchor}
        parts={parts}
        status={status}
        onReload={onReload}
      >
        {children}
      </MessageAssistant>
    );
  }
  return null;
}
