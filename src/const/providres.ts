import type { providerType } from "@/types/provider";

type ProviderT = {
	name: string;
	id: providerType;
};

export const providers: ProviderT[] = [
	{
		name: "OpenAI",
		id: "openai",
	},
	{
		name: "Google",
		id: "google",
	},
];
