"use client";
import type { Message as MessageType } from "ai";
import { Message } from "./message";
import { type Dispatch, type SetStateAction, useRef } from "react";
import { PulseDotLoader } from "../ui/loader";
import { ChatContainer } from "../ui/chat-container";
import { ScrollButton } from "../ui/scroll-button";
import { MessageError } from "./messageError";
import { Suggestions } from "./sugesstions";

type MessagesProps = {
  messages: MessageType[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
  onReload: () => void;
  error?: Error;
  status: "streaming" | "ready" | "submitted" | "error";
  setInput: Dispatch<SetStateAction<string>>;
};

export function Messages({
  messages,
  onReload,
  status,
  error,
  setInput,
}: MessagesProps) {
  const initialMessageCount = useRef(messages.length);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-x-hidden overflow-y-auto">
      <ChatContainer
        className="relative  flex-1 scrs  overflow-y-auto   flex w-full flex-col gap-y-5 items-center pt-20 pb-4  "
        autoScroll
        ref={containerRef}
        style={{
          scrollbarGutter: "stable both-edges",
        }}
      >
        {messages.length === 0 && (
          <div className="flex w-full md:w-2xl mx-auto px-8 md:max-w-(--breakpoint-md) justify-center flex-col h-1/2 ">
            <h1 className="mb-6 text-4xl font-medium tracking-tight">
              How may I help you?
            </h1>
            <Suggestions setInput={setInput} />
          </div>
        )}

        {messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          const hasScrollAnchor =
            isLast && messages.length > initialMessageCount.current;
          return (
            <Message
              id={message.id}
              key={message.id}
              attachments={message.experimental_attachments}
              isLast={isLast}
              hasScrollAnchor={hasScrollAnchor}
              role={message.role}
              status={status}
              parts={message.parts}
              onDelete={() => {}}
              onEdit={() => {}}
              onReload={onReload}
            >
              {message.content}
            </Message>
          );
        })}

        {status === "submitted" &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <div className="group min-h-scroll-anchor flex w-full max-w-3xl flex-col items-start gap-2 px-6 pb-2">
              <PulseDotLoader />
            </div>
          )}
        {error && <MessageError onReload={onReload} error={error} />}
      </ChatContainer>
      <div className="absolute  bottom-0 w-full max-w-3xl">
        <ScrollButton
          variant={"secondary"}
          className="absolute   top-[-50px] right-[45px]"
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}
