import { PromptSuggestion } from "@/components/ui/prompt-suggestion";
import { suggestionGroups } from "@/const/suggestions";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Minus, Plus } from "lucide-react";
type SuggestionsProps = {
  setInput: Dispatch<SetStateAction<string>>;
};

export function Suggestions({ setInput }: SuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState("");
  const [suggestions, setSuggestions] = useState(suggestionGroups.slice(0, 3));
  const activeCategoryData = suggestionGroups.find(
    (group) => group.label === activeCategory
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center space-y-2">
      <div className="absolute top-0 left-0 space-y-8 h-[70px] w-full">
        <div className="relative flex w-full flex-wrap  justify-start gap-2">
          {suggestions.map((suggestion) => (
            <PromptSuggestion
              key={suggestion.label}
              variant={
                activeCategory === suggestion.label ? "sugest" : "outline"
              }
              onClick={() => {
                setActiveCategory((prev) =>
                  suggestion.label === prev ? "" : suggestion.label
                );
                setInput(suggestion.highlight);
              }}
              className="capitalize"
            >
              <suggestion.Icon />
              {suggestion.label}
            </PromptSuggestion>
          ))}
          <PromptSuggestion
            variant={"outline"}
            onClick={() => {
              setSuggestions((prev) =>
                prev.length === 3
                  ? suggestionGroups
                  : suggestionGroups.slice(0, 3)
              );
              if (activeCategory !== "" && suggestions.length !== 3)
                setActiveCategory("");
            }}
          >
            {suggestions.length === 3 ? (
              <>
                <Plus />
                More
              </>
            ) : (
              <>
                <Minus />
                Less
              </>
            )}
          </PromptSuggestion>
        </div>
        <div className="flex w-full flex-col">
          {activeCategoryData?.items.map((suggestion) => (
            <PromptSuggestion
              key={suggestion}
              size={"lg"}
              highlight={activeCategoryData?.highlight}
              onClick={() => {
                setInput(suggestion);
              }}
            >
              {suggestion}
            </PromptSuggestion>
          ))}
        </div>
      </div>
    </div>
  );
}
