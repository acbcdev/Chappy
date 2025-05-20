import type { providerType } from "@/types/provider";

// | "togther";
type modelType = {
	id: string;
	name: string;
};

export const providers: Record<providerType, { models: modelType[] }> = {
	openai: {
		models: [
			{ id: "o1", name: "o1" },
			{ id: "o1-mini", name: "o1 mini" },
			{ id: "o1-preview", name: "o1 Preview" },
			{ id: "o3-mini", name: "o3 mini" },
			{ id: "o3", name: "o3" },
			{ id: "o4-mini", name: "o4 mini" },
			{ id: "gpt-4.1", name: "gpt 4.1" },
			{ id: "gpt-4.1-mini", name: "gpt 4.1 mini" },
			{ id: "gpt-4.1-nano", name: "gpt 4.1 nano" },
			{ id: "gpt-4o", name: "gpt 4o" },
			{ id: "gpt-4o-search-preview", name: "gpt 4o search Preview" },
			{ id: "gpt-4o-mini-search-preview", name: "gpt 4o mini search Preview" },
			{ id: "gpt-4o-mini", name: "gpt 4o mini" },
			{ id: "gpt-4.5-preview", name: "gpt 4.5 Preview" },
			{ id: "chatgpt-4o-latest", name: "chatgpt 4o latest" },
		],
	},
	google: {
		models: [
			{ id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
			{ id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite" },
			{
				id: "gemini-2.0-flash-thinking-exp-01-21",
				name: "Gemini 2.0 Flash Thinking Exp 01-21",
			},
			{ id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash Exp" },
			{ id: "gemini-2.5-pro-exp-03-25", name: "Gemini 2.5 Pro Exp 03-25" },
			{
				id: "gemini-2.5-pro-preview-05-06",
				name: "Gemini 2.5 Pro Preview 05-06",
			},
			{
				id: "gemini-2.5-flash-preview-04-17",
				name: "Gemini 2.5 Flash Preview 04-17",
			},
			{ id: "gemini-exp-1206", name: "Gemini Exp 1206" },
			{ id: "gemma-3-27b-it", name: "Gemma 3.27b IT" },
			{
				id: "learnlm-1.5-pro-experimental",
				name: "LearnLM 1.5 Pro Experimental",
			},
		],
	},
};

export const models = Object.values(providers).flatMap(
	(provider) => provider.models,
);
