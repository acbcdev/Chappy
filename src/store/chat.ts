import type { Message as MessageType } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { providerType } from "@/types/provider";

export type Chat = {
	id: string;
	name: string;
	messages: MessageType[];
	createdAt: number;
	updatedAt: number;
	totalTokens: number;
	pinned: boolean;
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
		Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	};

	changeModel: ({ id, provider, Icon }: chatStore["selectedModel"]) => void;
}

export const useChatStore = create<chatStore>()(
	persist(
		(set, get) => ({
			chats: [],
			selectedModel: {
				id: "",
				provider: null,
				Icon: undefined,
			},
			changeModel: ({ id, provider, Icon }) =>
				set(() => ({
					selectedModel: {
						id,
						provider,
						Icon,
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
			name: "chat-storage",
			partialize: (state) => ({
				chats: state.chats,
				selectedModel: state.selectedModel,
			}),
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
