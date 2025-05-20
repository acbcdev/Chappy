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

  const { setInput, input, handleSubmit, messages, status, reload } = useChat({
    onError: (error) => {
      toast.error(error.message);
    },
    body: {
      model: selectedModel,
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!keys.openai && !keys.google) {
      router.push("/?modalOpen=true");
    }
  }, []);

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
