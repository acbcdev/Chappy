"use client";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useChatStore } from "@/store/chat";
import { Bolt, CogIcon } from "lucide-react";
import { Button } from "../ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const chats = useChatStore((state) => state.chats);
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="ghost" className="flex items-center">
              <Bolt className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>{chat.name}</SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="group/btn" size={"lg"}>
              <CogIcon className="mr-2 size-10 group-hover/btn:rotate-45 duration-200" />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
