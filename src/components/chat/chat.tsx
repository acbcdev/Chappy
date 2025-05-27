"use client";
import { useChat } from "@ai-sdk/react";
import { Messages } from "../messages/messages";
import { Prompt } from "./prompt";
import { useKeysStore } from "@/store/keys";
import { useChatStore } from "@/store/chat";
import { useEffect, useMemo, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
import { useDebounce } from "@/hooks/useDebounce";
type ChatProps = {
  chatId?: string;
};

export function Chat({ chatId }: ChatProps) {
  const [chatIdState, setChatIdState] = useState<string | undefined>(chatId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const keys = useKeysStore((state) => state.keys);
  const selectedModel = useChatStore((state) => state.selectedModel);
  const updateChat = useChatStore((state) => state.updateChat);
  const addChat = useChatStore((state) => state.addChat);
  const getChat = useChatStore((state) => state.getChat);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const newChat = useMemo(
    () => searchParams.get("new"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, chatIdState]
  );

  const currentChat = useMemo(
    () => (chatIdState ? getChat(chatIdState) : null),
    [chatIdState, getChat]
  );

  const {
    setInput,
    input,
    handleSubmit,
    messages,
    status,
    reload,
    error,
    stop,
    setMessages,
  } = useChat({
    id: chatIdState,
    initialMessages: currentChat?.messages ?? [],
    // onError: (error) => {
    // toast.error(error.message);
    // setMessages((prev) => prev.slice(0, -1));
    // },
    onFinish: (_, options) => {
      if (chatId)
        updateChat(chatId, { totalTokens: options.usage.totalTokens });
    },
    body: {
      model: selectedModel,
      keys,
    },
  });
  const messagesDebounced = useDebounce(messages, 1000);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (newChat) {
      window.history.replaceState(null, "", "/");
      setMessages([]);
      setChatIdState(undefined);
    }
  }, [newChat]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (chatIdState) updateChat(chatIdState, { messages });
  }, [messagesDebounced]);

  useEffect(() => {
    const isEveryKeyEmpty = Object.values(keys).every(
      (key) => key.trim() === ""
    );
    if (isEveryKeyEmpty) {
      router.push("/?modalOpen=true");
      return;
    }
    // Solo redirige si no hay chatId y no hay chat actual
    if (!chatIdState && !currentChat) {
      router.push("");
    }
  }, [keys, chatIdState, currentChat, router]);

  // Detecta input inicial desde query param solo si es un chat nuevo
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (chatIdState && messages.length === 0) {
      const initialInput = searchParams.get("input");
      if (initialInput) {
        setInput(initialInput);
        // Ejecuta el submit solo una vez
        handleSubmit();
        router.replace(`/c/${chatIdState}`);
        // Opcional: limpia el query param después de usarlo (requiere router.replace)
        // router.replace(`/c/${chatId}`);
      }
    }
  }, [chatIdState, messages.length, searchParams, setInput, handleSubmit]);

  if (currentChat === undefined) {
    return redirect("/");
  }
  const submit = () => {
    // Si no hay chat actual, crea uno nuevo y navega
    if (!currentChat) {
      const newId = nanoid();
      addChat({
        id: newId,
        name: input.split(" ", 20).join(" "),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        totalTokens: 0,
      });
      // toast("Creating new chat...");

      window.history.pushState(null, "", `/c/${newId}`);
      setChatIdState(newId);
      // No llamar a handleSubmit aquí, el componente se reinicializa con el nuevo chatId
      // return;
    }
    // Si ya existe el chat, solo envía el mensaje
    handleSubmit();
  };

  return (
    <section className="@container/main relative flex  h-screen flex-col">
      <Messages
        messages={messages}
        onReload={reload}
        status={status}
        error={error}
      />
      <div className="sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md pt-2">
        <form
          id="chat-form"
          className="relative inset-x-0 mx-auto w-full max-w-3xl px-4 pb-4"
          onSubmit={submit}
        >
          <Prompt
            setInput={setInput}
            input={input}
            status={status}
            onSend={submit}
            onStop={stop}
          />
        </form>
      </div>
    </section>
  );
}
