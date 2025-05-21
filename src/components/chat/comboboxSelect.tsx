"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Check, ChevronDown, ChevronUp, ShowerHead } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "../ui/command";
import { models } from "@/const/models";
import { useState } from "react";
import { useKeysStore } from "@/store/keys";
import { getProviderForModel } from "@/lib/ai/map";
import type { providerType, SupportedModel } from "@/types/provider";
import { useChatStore } from "@/store/chat";

export function ComboboxSelect() {
  const keys = useKeysStore((state) => state.keys);
  const changeModel = useChatStore((state) => state.changeModel);
  const value = useChatStore((state) => state.selectedModel);
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-expanded={open}
          className="min-w-[150px] justify-between "
        >
          {value.id
            ? models.find((model) => model.id === value.id)?.name
            : "Select model..."}
          {open ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command className=" p-2">
          <CommandInput placeholder="Search models..." />
          <CommandList className="scroll">
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models
                .filter((model) => {
                  const provider = getProviderForModel(
                    model.id as SupportedModel,
                    false
                  );
                  return keys[provider] !== "";
                })
                .map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.id}
                    onSelect={(currentValue) => {
                      console.log(
                        "Selected model:",
                        currentValue,
                        model.provider
                      );
                      changeModel(currentValue, model.provider as providerType);
                      setOpen(false);
                    }}
                  >
                    {model.name}
                    {value.id === model.id && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
