"use client";

import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { CirclePlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DialogDemo } from "../settings/Dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Header() {
  const pathname = usePathname();
  return (
    <header className="flex z-50 h-16 w-full justify-between items-center fixed top-0  gap-2 pl-4 px-2">
      <div className="flex items-center gap-x-2 justify-between">
        <SidebarTrigger />
        <Link href="/" className="text-lg font-semibold">
          Chappy
        </Link>
      </div>
      <div className="flex  items-center gap-x-2">
        {pathname !== "/" && (
          <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <Link href="/?new=true">
                <Button variant="ghost" size={"icon"}>
                  <CirclePlus className="size-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>new chat</TooltipContent>
          </Tooltip>
        )}
        <DialogDemo />
      </div>
    </header>
  );
}
