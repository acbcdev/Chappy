"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  ListFilter,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { models } from "@/const/models";
import { useState } from "react";
import { useKeysStore } from "@/store/keys";
import { getProviderForModel } from "@/lib/ai/map";
import type { providerType, SupportedModel } from "@/types/provider";
import { useChatStore } from "@/store/chat";
import { Separator } from "../ui/separator";

export function ComboboxSelect() {
  const keys = useKeysStore((state) => state.keys);
  const changeModel = useChatStore((state) => state.changeModel);
  const value = useChatStore((state) => state.selectedModel);
  const [open, setOpen] = useState(false);

  const currentModel = models.find((model) => model.id === value.id);

  const activeModels = models.filter((model) => {
    const provider = getProviderForModel(model.id as SupportedModel, false);
    return keys[provider] !== "";
  });
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
          {currentModel?.Icon && <currentModel.Icon className=" h-4 w-4" />}
          {value.id ? currentModel?.name : "Select a model..."}
          {open ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[400px] p-1.5">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList className="scroll">
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {activeModels.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.id}
                  onSelect={(currentValue) => {
                    changeModel({
                      id: currentValue,
                      provider: model.provider as providerType,
                      Icon: model.Icon,
                    });
                    setOpen(false);
                  }}
                >
                  <model.Icon />
                  {model.name}
                  {value.id === model.id && <Check className="mr-2 h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {/* <Separator />
          <div className="p-1.5 pb-1">
            <Button variant={"ghost"} size={"icon"}>
              <ListFilter />
            </Button>
          </div> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
