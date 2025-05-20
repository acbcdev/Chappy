import type { providerType } from "@/types/provider";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface KeyStore {
	keys: Record<providerType, string>;
}

export const useKeysStore = create<KeyStore>()(
	persist(
		(set) => ({
			keys: {
				openai: "",
				google: "",
			},
		}),
		{
			name: "keys",
		},
	),
);
