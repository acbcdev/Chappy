"use client";
import { useChat } from "@ai-sdk/react";
import { Messages } from "../messages/messages";
import { Prompt } from "./prompt";
import { toast } from "sonner";
import { useKeysStore } from "@/store/keys";
import { useChatStore } from "@/store/chat";
import { use, useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export function Chat({ chatId }: { chatId?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const keys = useKeysStore((state) => state.keys);
  const selectedModel = useChatStore((state) => state.selectedModel);
  const updateChat = useChatStore((state) => state.updateChat);
  const addChat = useChatStore((state) => state.addChat);
  const getChat = useChatStore((state) => state.getChat);

  const currentChat = chatId ? getChat(chatId) : null;
  if (currentChat === undefined) {
    return redirect("/");
  }
  const {
    setInput,
    input,
    handleSubmit,
    messages,
    status,
    reload,
    id,
    setMessages,
  } = useChat({
    initialMessages: currentChat?.messages ?? [],
    onError: (error) => {
      toast.error(error.message);
    },
    onFinish: (m, options) => {
      const i = chatId ?? id;
      const chat = getChat(id);
      if (chat) {
        updateChat(i, messages, options.usage.totalTokens);
      }
    },
    body: {
      model: selectedModel,
      keys,
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages);
      setInput("");
    } else {
      setMessages([]);
    }
  }, [pathname, chatId]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const isEveryKeyEmpty = Object.values(keys).every((key) => {
      console.log("key", key);
      return key.trim() === "";
    });
    if (isEveryKeyEmpty) {
      router.push("/?modalOpen=true");
    }
    if (!chatId || !currentChat) {
      router.push("");
    }
  }, [keys]);
  const submit = () => {
    if (messages.length === 0) {
      const id = nanoid();
      addChat({
        id,
        name: input.split(" ", 3).join(" "),
        messages: messages,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        totalTokens: 0,
      });
      router.push(`/c/${id}`);
    }

    handleSubmit();
  };
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
            onSend={submit}
          />
        </form>
      </div>
    </section>
  );
}
