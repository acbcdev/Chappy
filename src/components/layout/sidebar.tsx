"use client";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useChatStore } from "@/store/chat";

import { usePathname } from "next/navigation";
import { groupChats } from "@/lib/utils";
import { useMemo } from "react";
import { SidebarList } from "@/components/layout/sidebarList";
import Link from "next/link";
import { SquarePen } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const chats = useChatStore((state) => state.chats);
  const pathname = usePathname();
  const chatId = pathname.split("/").at(-1);
  const groupedChats = useMemo(() => groupChats(chats), [chats]);
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarContent className="mt-16 ">
        <SidebarMenu>
          <SidebarGroup>
            <Link href={pathname === "/" ? "" : "/?new=true"}>
              <SidebarMenuButton
                className=" h-10"
                disabled={pathname === "/"}
                tooltip={"Create a new chat"}
              >
                <SquarePen /> New Chat
              </SidebarMenuButton>
            </Link>
          </SidebarGroup>

          {groupedChats?.map((group) => (
            <SidebarList
              key={group.name}
              name={group.name}
              chatId={chatId}
              chats={group.chats}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
