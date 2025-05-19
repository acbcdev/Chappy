"use client";

import { Prompt } from "@/components/chat/prompt";
import { Messages } from "@/components/messages/messages";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";

export default function Home() {
  const { setInput, input, handleSubmit, messages, status, reload } = useChat({
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <section className="@container/main relative flex  h-screen flex-col">
      <Messages messages={messages} onReload={reload} status={status} />
      <div className="sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md pt-2">
        <form
          id="chat-form"
          className="relative inset-x-0 mx-auto w-full max-w-3xl px-4 pb-4"
          onSubmit={handleSubmit}
        >
          <Prompt
            setInput={setInput}
            input={input}
            status={status}
            onSend={handleSubmit}
          />
        </form>
      </div>
    </section>
  );
}
