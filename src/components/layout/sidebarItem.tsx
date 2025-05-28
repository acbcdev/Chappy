import Link from "next/link";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Ellipsis, Pencil, Pin, Trash, X } from "lucide-react";
import { useChatStore, type Chat } from "@/store/chat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type SidebarItemProps = {
  chat: Chat;
  chatId?: Chat["id"];
};

export function SidebarItem({ chat, chatId }: SidebarItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const deleteChat = useChatStore((state) => state.removeChat);
  const updateChat = useChatStore((state) => state.updateChat);
  const handleRename = (newName: string) => {
    if (newName.trim() === "") return; // Prevent empty names
    updateChat(chat.id, { name: newName });
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Link
      key={chat.id}
      href={`/c/${chat.id}`}
      className={`flex items-center justify-between hover:bg-border duration-200  rounded-md ${
        isEditing ? "" : "px-2"
      } ${chatId === chat.id ? "bg-border " : ""}`}
    >
      {isEditing ? (
        <Input
          onBlur={handleCancel}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRename(e.currentTarget.value);
            else if (e.key === "Escape") handleCancel();
          }}
          defaultValue={chat.name}
          autoFocus
          type="text"
          className="w-full rounded-md bg-transparent z-10 px-2 py-1 text-sm text-muted-foreground"
          placeholder="Chat name"
        />
      ) : (
        <>
          <p className="cursor-pointer truncate py-1.5">{chat.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="iconSm"
                variant="ghost"
                className="rounded-full z-10"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  updateChat(chat.id, { pinned: !chat.pinned });
                }}
              >
                <Pin className={`${chat.pinned ? "fill-foreground" : ""}`} />
                Pin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
              >
                <Pencil /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                variant="destructive"
                onClick={() => {
                  deleteChat(chat.id);
                  if (chatId === chat.id) router.push("/?new=true");
                }}
              >
                <Trash className="text-destructive" /> Remove
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </Link>
  );
}
