import type { providerType } from "@/types/provider";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface KeyStore {
	keys: Record<providerType, string>;
	addKey: (key: string, provider: providerType) => void;
}

export const useKeysStore = create<KeyStore>()(
	persist(
		(set) => ({
			keys: {
				openai: "",
				google: "",
				anthropic: "",
				mistral: "",
				xai: "",
			},
			addKey: (key, provider) =>
				set((state) => ({
					keys: {
						...state.keys,
						[provider]: key,
					},
				})),
		}),
		{
			name: "keys",
		},
	),
);
