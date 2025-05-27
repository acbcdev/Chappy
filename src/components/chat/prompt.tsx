"use client";

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, CircleStop } from "lucide-react";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { ComboboxSelect } from "./comboboxSelect";

type PropsPropmpt = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: "submitted" | "streaming" | "ready" | "error";
  onSend: VoidFunction;
  onStop: VoidFunction;
};
export function Prompt({
  input,
  setInput,
  status,
  onSend,
  onStop,
}: PropsPropmpt) {
  const isLoading = status === "streaming";

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
      className="w-full max-w-(--breakpoint-md) bg-muted/70 border-none"
    >
      <PromptInputTextarea
        form="chat-form"
        autoFocus
        onKeyDown={handleKeyDown}
        placeholder="How may I help you?"
      />

      <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
        <PromptInputAction tooltip="Select Model">
          <ComboboxSelect />
        </PromptInputAction>

        <PromptInputAction
          tooltip={isLoading ? "Stop generation" : "Send message"}
        >
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            type={isLoading ? "button" : "submit"}
            onClick={isLoading ? onStop : () => {}}
          >
            {isLoading ? (
              <CircleStop className="size-5" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
