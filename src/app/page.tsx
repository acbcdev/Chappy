"use client";

import { Prompt } from "@/components/chat/prompt";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  const { setInput, input } = useChat({});
  return (
    <>
      <section className="max-w-prose mx-auto">
        <form action="">
          <Prompt setInput={setInput} input={input} />
        </form>
      </section>
    </>
  );
}
