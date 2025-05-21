import type { providerType } from "@/types/provider";

type ProviderT = {
	name: string;
	id: providerType;
	link: string;
};

export const providers: ProviderT[] = [
	{
		name: "OpenAI",
		id: "openai",
		link: "https://platform.openai.com/api-keys",
	},
	{
		name: "Google",
		id: "google",
		link: "https://aistudio.google.com/apikey",
	},
];
