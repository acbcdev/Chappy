"use client";
import { useChat } from "@ai-sdk/react";
import { Messages } from "../messages/messages";
import { Prompt } from "./prompt";
import { toast } from "sonner";
import { useKeysStore } from "@/store/keys";
import { useChatStore } from "@/store/chat";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Chat() {
  const router = useRouter();
  const keys = useKeysStore((state) => state.keys);
  const selectedModel = useChatStore((state) => state.selectedModel);
  const updateChat = useChatStore((state) => state.updateChat);
  const addChat = useChatStore((state) => state.addChat);
  const getChat = useChatStore((state) => state.getChat);

  const { setInput, input, handleSubmit, messages, status, reload, id } =
    useChat({
      onError: (error) => {
        toast.error(error.message);
      },
      onFinish: (m, options) => {
        const chat = getChat(id);
        if (chat) {
          updateChat(id, messages, options.usage.totalTokens);
        } else {
          addChat({
            id,
            name: messages[0].content.split(" ", 3).join(" "),
            messages: messages,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            totalTokens: options.usage.totalTokens,
          });
        }
      },
      body: {
        model: selectedModel,
        keys,
      },
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("keys", keys);

    const isEveryKeyEmpty = Object.values(keys).every((key) => {
      console.log("key", key);
      return key.trim() === "";
    });
    console.log("isEveryKeyEmpty", isEveryKeyEmpty);
    if (isEveryKeyEmpty) {
      router.push("/?modalOpen=true");
    } else {
      router.push("/");
    }
  }, [keys]);

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
