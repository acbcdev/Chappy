import type { Chat } from "@/store/chat";
import { SidebarItem } from "@/components/layout/sidebarItem";
import { SidebarGroup } from "@/components/ui/sidebar";

type SidebarListProps = {
  chats: Chat[];
  name: string;
  chatId?: string;
};
export function SidebarList({ chats, name, chatId }: SidebarListProps) {
  return (
    <SidebarGroup>
      <h3 className="overflow-hidden px-2 pt-3 pb-2 text-base font-semibold break-all text-ellipsis">
        {name}
      </h3>
      <div className="space-y-0.5">
        {chats.map((chat) => (
          <SidebarItem key={chat.id} chat={chat} chatId={chatId} />
        ))}
      </div>
    </SidebarGroup>
  );
}
