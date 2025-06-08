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
import { Plus } from "lucide-react";

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
            <Link href="/?new=true">
              <SidebarMenuButton
                className="[&>svg]:size-7 h-10"
                tooltip={"Create a new chat"}
              >
                <Plus className=" bg-border rounded-full p-1" /> New Chat
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
