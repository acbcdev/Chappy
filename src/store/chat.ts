import type { Message as MessageType } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Chat = {
	id: string;
	name: string;
	messages: MessageType[];
	modelSelected: string;
	createdAt: number;
};

interface chatStore {
	chats: Chat[];
	addChat: (chat: Chat) => void;
	removeChat: (id: string) => void;
	updateChat: (id: string, updatedChat: Partial<Chat>) => void;
	getChat: (id: string) => Chat | undefined;
}
const DEFAULT_CHAT: Chat = {
	id: "1",
	name: "Chat 1",
	messages: [],
	modelSelected: "gpt-4o-mini",
	createdAt: Date.now(),
};

export const useChatStore = create<chatStore>()(
	persist(
		(set, get) => ({
			chats: [],
			addChat: (chat: Chat) =>
				set((state) => ({ chats: [...state.chats, chat] })),
			removeChat: (id: string) =>
				set((state) => ({
					chats: state.chats.filter((chat) => chat.id !== id),
				})),
			updateChat: (id: string, updatedChat: Partial<Chat>) =>
				set((state) => ({
					chats: state.chats.with(
						state.chats.findIndex((chat) => chat.id === id),
						{
							...(state.chats.find((chat) => chat.id === id) ?? DEFAULT_CHAT),
							...updatedChat,
						},
					),
				})),
			getChat: (id: string) => get().chats.find((chat) => chat.id === id),
		}),
		{
			name: "chat-storage", // unique name
		},
	),
);
