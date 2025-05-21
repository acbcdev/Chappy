"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DialogDemo } from "../settings/Dialog";
import type { Message as MessageType } from "ai";
export function Header({
  setMessages,
}: {
  setMessages: (
    messages: MessageType[] | ((messages: MessageType[]) => MessageType[])
  ) => void;
}) {
  return (
    <header className="flex h-16 w-full justify-between items-center absolute z-10 gap-2 px-2">
      <div className="flex items-center gap-x-0.5 ">
        <SidebarTrigger />
        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={"icon"}
              onClick={() => setMessages([])}
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>new chat</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-x-2">
        <SignedOut>
          <div className="grid grid-cols-2 gap-x-2">
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">Sign up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <DialogDemo />
      </div>
    </header>
  );
}
