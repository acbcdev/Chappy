import type { Message as MessageType } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { providerType } from "@/types/provider";

type Chat = {
	id: string;
	name: string;
	messages: MessageType[];
	createdAt: number;
	updatedAt: number;
	totalTokens: number;
};

export interface chatStore {
	chats: Chat[];
	addChat: (chat: Chat) => void;
	removeChat: (id: string) => void;
	updateChat: (id: Chat["id"], newChat: Partial<Chat>) => void;

	getChat: (id: string) => Chat | undefined;

	selectedModel: {
		id: string | null;
		provider: providerType | null;
	};

	changeModel: (modelId: string, provider: providerType) => void;
}
// const DEFAULT_CHAT: Chat = {
// 	id: "1",
// 	name: "Chat 1",
// 	messages: [],
// 	createdAt: Date.now(),
// 	updatedAt: Date.now(),
// };

export const useChatStore = create<chatStore>()(
	persist(
		(set, get) => ({
			chats: [],
			selectedModel: {
				id: "",
				provider: null,
			},
			changeModel: (modelId, provider) =>
				set(() => ({
					selectedModel: {
						id: modelId,
						provider,
					},
				})),
			addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
			removeChat: (id) =>
				set((state) => ({
					chats: state.chats.filter((chat) => chat.id !== id),
				})),
			updateChat: (id, newChat) =>
				set((state) => {
					const chatIndex = state.chats.findIndex((chat) => chat.id === id);
					if (chatIndex === -1) {
						return {};
					}
					const chat = state.chats[chatIndex];
					let chatTokens = chat.totalTokens;
					if (newChat.totalTokens) {
						chatTokens += newChat.totalTokens;
					}
					const updatedChat: Chat = {
						...chat,
						...newChat,
						updatedAt: Date.now(),
						totalTokens: chatTokens,
					};
					const updatedChats = state.chats.with(chatIndex, updatedChat);
					return { chats: updatedChats };
				}),

			getChat: (id) => get().chats.find((chat) => chat.id === id),
		}),
		{
			name: "chat-storage", // unique name
		},
	),
);
// chats: state.chats.with(
// 	state.chats.findIndex((chat) => chat.id === id),
// 	{
// 		...(state.chats.find((chat) => chat.id === id) ?? DEFAULT_CHAT),
// 		...updatedChat,
// 	},
// ),
