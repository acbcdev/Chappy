"use client";

import { useAutoScroll } from "@/hooks/useAutoScroll";
import { cn } from "@/lib/utils";
import { Children, useEffect, useRef } from "react";

export type ChatContainerProps = {
  children: React.ReactNode;
  className?: string;
  autoScroll?: boolean;
  scrollToRef?: React.RefObject<HTMLDivElement | null>;
  ref?: React.RefObject<HTMLDivElement | null>;
} & React.HTMLAttributes<HTMLDivElement>;

function ChatContainer({
  className,
  children,
  autoScroll = true,
  scrollToRef,
  ref,
  ...props
}: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const localBottomRef = useRef<HTMLDivElement>(null);
  const bottomRef = scrollToRef || localBottomRef;
  const chatContainerRef = ref || containerRef;
  const prevChildrenRef = useRef<React.ReactNode>(null);
  const contentChangedWithoutNewMessageRef = useRef(false);

  const {
    autoScrollEnabled,
    scrollToBottom,
    isScrolling,
    scrollTriggered,
    newMessageAdded,
    setNewMessageAdded,
    prevChildrenCountRef,
  } = useAutoScroll(chatContainerRef, autoScroll);

  useEffect(() => {
    const childrenArray = Children.toArray(children);
    const currentChildrenCount = childrenArray.length;

    if (currentChildrenCount > prevChildrenCountRef.current) {
      setNewMessageAdded(true);
    } else if (prevChildrenRef.current !== children) {
      contentChangedWithoutNewMessageRef.current = true;
    }

    prevChildrenCountRef.current = currentChildrenCount;
    prevChildrenRef.current = children;
  }, [children, setNewMessageAdded, prevChildrenCountRef]);

  useEffect(() => {
    if (!autoScroll) return;

    const scrollHandler = () => {
      if (newMessageAdded) {
        scrollToBottom("smooth");
        setNewMessageAdded(false);
        contentChangedWithoutNewMessageRef.current = false;
      } else if (
        contentChangedWithoutNewMessageRef.current &&
        autoScrollEnabled &&
        !isScrolling &&
        !scrollTriggered
      ) {
        scrollToBottom("smooth");
        contentChangedWithoutNewMessageRef.current = false;
      }
    };

    requestAnimationFrame(scrollHandler);
  }, [
    autoScroll,
    autoScrollEnabled,
    isScrolling,
    scrollTriggered,
    scrollToBottom,
    newMessageAdded,
    setNewMessageAdded,
  ]);

  return (
    <div
      className={cn("flex flex-col overflow-y-auto", className)}
      role="log"
      ref={chatContainerRef}
      {...props}
    >
      {children}
      <div
        ref={bottomRef}
        className="h-[1px] w-full flex-shrink-0 scroll-mt-4"
        aria-hidden="true"
      />
    </div>
  );
}

export { ChatContainer };
