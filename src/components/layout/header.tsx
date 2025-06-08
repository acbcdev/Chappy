"use client";

import { Button } from "../ui/button";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DialogDemo } from "../settings/Dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Header() {
  const { open } = useSidebar();
  return (
    <header className="flex z-50 h-16 w-full justify-between items-center fixed top-0  gap-2 pl-4 px-2">
      <div className="flex items-center gap-x-2 justify-between">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Chappy</h1>
        {!open && (
          <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <Link href="/?new=true">
                <Button variant="ghost" size={"icon"}>
                  <Plus className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>new chat</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex  items-center gap-x-2">
        <DialogDemo />
      </div>
    </header>
  );
}
