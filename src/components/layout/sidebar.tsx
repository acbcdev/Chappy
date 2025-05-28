"use client";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useChatStore } from "@/store/chat";

import { usePathname } from "next/navigation";
import { groupChats } from "@/lib/utils";
import { useMemo } from "react";
import { SidebarList } from "@/components/layout/sidebarList";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const chats = useChatStore((state) => state.chats);
  const pathname = usePathname();
  const chatId = pathname.split("/").at(-1);
  const groupedChats = useMemo(() => groupChats(chats), [chats]);
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarContent className="mt-16 ">
        <SidebarMenu>
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
