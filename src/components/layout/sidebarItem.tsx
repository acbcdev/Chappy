import Link from "next/link";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Ellipsis, Pencil, Trash, X } from "lucide-react";
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
  const [newName, setNewName] = useState("");

  const router = useRouter();
  const deleteChat = useChatStore((state) => state.removeChat);
  const updateChat = useChatStore((state) => state.updateChat);
  const handleRename = () => {
    if (newName.trim() === "") return; // Prevent empty names
    updateChat(chat.id, { name: newName });
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setNewName(chat.name); // Reset to original name
  };

  return (
    <SidebarMenuItem
      key={chat.id}
      className={`flex items-center hover:bg-muted duration-200 rounded-md ${
        isEditing ? "" : "pl-2"
      } ${chatId === chat.id ? "bg-muted/90" : ""}`}
    >
      {isEditing ? (
        <div className="flex relative w-full">
          <Input
            onBlur={handleCancel}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
              else if (e.key === "Escape") handleCancel();
            }}
            defaultValue={chat.name}
            autoFocus
            type="text"
            className="w-full rounded-md bg-transparent px-2 py-1 text-sm text-muted-foreground"
            placeholder="Chat name"
          />
          <div className="absolute flex right-2 gap-x-1 justify-center items-center inset-y-0">
            <Check
              onClick={handleRename}
              aria-label="Save"
              className="size-5 hover:text-green-500 duration-200"
            />
            <X
              onClick={handleCancel}
              aria-label="Cancel"
              className="size-5 hover:text-destructive duration-200"
            />
          </div>
        </div>
      ) : (
        <>
          <Link
            href={`/c/${chat.id}`}
            className="flex-1 flex items-center h-full cursor-pointer truncate line-clamp-1 "
          >
            {chat.name}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
              {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </SidebarMenuItem>
  );
}
