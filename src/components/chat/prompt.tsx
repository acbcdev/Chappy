"use client";

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Square } from "lucide-react";
import { type Dispatch, type SetStateAction, useCallback } from "react";
type PropsPropmpt = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: "submitted" | "streaming" | "ready" | "error";
  onSend: () => void;
};

export function Prompt({ input, setInput, status, onSend }: PropsPropmpt) {
  const isLoading = status === "streaming";

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // First process agent command related key handling

      if (status === "submitted") {
        e.preventDefault();
        return;
      }

      if (e.key === "Enter" && status === "streaming") {
        e.preventDefault();
        return;
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend, status]
  );

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      className="w-full max-w-(--breakpoint-md)"
    >
      <PromptInputTextarea
        form="chat-form"
        autoFocus
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
      />

      <PromptInputActions className="flex items-center justify-end gap-2 pt-2">
        <PromptInputAction
          tooltip={isLoading ? "Stop generation" : "Send message"}
        >
          <Button
            variant="default"
            size="icon"
            disabled={isLoading}
            className="h-8 w-8 rounded-full"
            type="submit"
          >
            {isLoading ? (
              <Square className="size-5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
