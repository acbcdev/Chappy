"use client";

import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export type PromptSuggestionProps = {
  children: React.ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  highlight?: string;
  isHighlightMode?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function PromptSuggestion({
  children,
  variant,
  size,
  className,
  highlight,
  isHighlightMode,
  ...props
}: PromptSuggestionProps) {
  const content = typeof children === "string" ? children : "";

  if (!isHighlightMode) {
    return (
      <Button
        variant={variant || "outline"}
        size={size || "lg"}
        className={cn("rounded-full", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }

  if (!content) {
    return (
      <Button
        variant={variant || "ghost"}
        size={size || "sm"}
        className={cn(
          "w-full cursor-pointer justify-start rounded-xl py-2",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }

  const trimmedHighlight = highlight?.trim();
  const contentLower = content.toLowerCase();
  const highlightLower = trimmedHighlight?.toLowerCase() ?? "";
  const shouldHighlight = contentLower.includes(highlightLower);

  return (
    <Button
      variant={variant || "ghostSecondary"}
      size={size || "sm"}
      className={cn(
        "w-full cursor-pointer justify-start gap-0 rounded-xl py-2 ",
        className
      )}
      {...props}
    >
      {shouldHighlight ? (
        (() => {
          const index = contentLower.indexOf(highlightLower);
          if (index === -1)
            return (
              <span className="text-muted-foreground whitespace-pre-wrap">
                {content}
              </span>
            );

          const actualHighlightedText = content.substring(
            index,
            index + highlightLower.length
          );

          const before = content.substring(0, index);
          const after = content.substring(index + actualHighlightedText.length);

          return (
            <>
              {before && (
                <span className="text-muted-foreground/80 whitespace-pre-wrap">
                  {before}
                </span>
              )}
              <span className="text-foreground font-medium whitespace-pre-wrap text-left">
                {actualHighlightedText}
              </span>
              {after && (
                <span className="text-muted-foreground/80 whitespace-pre-wrap">
                  {after}
                </span>
              )}
            </>
          );
        })()
      ) : (
        <span className="text-muted-foreground whitespace-pre-wrap">
          {content}
        </span>
      )}
    </Button>
  );
}

export { PromptSuggestion };
