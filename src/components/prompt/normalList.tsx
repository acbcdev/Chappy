import type { models } from "@/const/models";
import { CommandGroup, CommandItem } from "../ui/command";
import type { chatStore } from "@/store/chat";
import type { providerType } from "@/types/provider";
import type { Dispatch, SetStateAction } from "react";
import { Check } from "lucide-react";
type modelType = typeof models;

type NormalListProps = {
  models: modelType;
  changeModel: chatStore["changeModel"];
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentModel: chatStore["selectedModel"];
};

export function NormalList({
  models,
  changeModel,
  setOpen,
  currentModel,
}: NormalListProps) {
  return (
    <CommandGroup>
      {models.map((model) => (
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
          {currentModel.id === model.id && <Check className="mr-2 h-4 w-4" />}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
