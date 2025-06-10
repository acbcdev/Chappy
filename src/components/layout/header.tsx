"use client";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { SquarePen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DialogDemo } from "../settings/Dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Header() {
  const { open } = useSidebar();
  const pathname = usePathname();
  return (
    <header className="flex z-50 h-16 w-full justify-between items-center fixed top-0  gap-2 pl-4 px-2">
      <div className="flex items-center gap-x-2 justify-between">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Chappy</h1>
        <AnimatePresence>
          {!open && (
            <motion.div
              transition={{ duration: 0.05 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <Link href={pathname === "/" ? "" : "/?new=true"}>
                    <Button variant="ghost" size={"icon"}>
                      <SquarePen className="size-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>new chat</TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-x-2">
        <DialogDemo />
      </div>
    </header>
  );
}
