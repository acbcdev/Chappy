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
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Header() {
  const pathname = usePathname();
  return (
    <header className="flex h-16 w-full justify-between items-center absolute z-10 gap-2 px-2">
      <div className="flex items-center gap-x-0.5 ">
        <SidebarTrigger />
        {pathname !== "/" && (
          <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button variant="ghost" size={"icon"}>
                  <Plus />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>new chat</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <SignedOut>
          <div className="grid grid-cols-2 gap-x-2">
            <DialogDemo />

            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">Sign up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <DialogDemo />

          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
