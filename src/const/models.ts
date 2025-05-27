import {
	Anthropic,
	Gemini,
	MistralAI,
	OpenAI,
	xAIGrok,
} from "@/components/icons";
import type { providerType } from "@/types/provider";
import type { SVGProps } from "react";

// | "togther";
type modelType = {
	id: string;
	name: string;
};

export const providers: Record<
	providerType,
	{
		models: modelType[];
		active: boolean;
		Icon: React.FC<SVGProps<SVGSVGElement>>;
	}
> = {
	openai: {
		active: true,
		Icon: OpenAI,
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
		],
	},
	google: {
		active: true,
		Icon: Gemini,
		models: [
			{ id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
			{ id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite" },
			{
				id: "gemini-2.0-flash-thinking-exp-01-21",
				name: "Gemini 2.0 Flash Thinking Exp ",
			},
			{ id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash Exp" },
			{ id: "gemini-2.5-pro-exp-03-25", name: "Gemini 2.5 Pro Exp " },
			{
				id: "gemini-2.5-pro-preview-05-06",
				name: "Gemini 2.5 Pro Preview ",
			},
			{
				id: "gemini-2.5-flash-preview-04-17",
				name: "Gemini 2.5 Flash Preview",
			},
			// { id: "gemini-exp-1206", name: "Gemini Exp 1206" },
			// { id: "gemma-3-27b-it", name: "Gemma 3.27b IT" },
			// {
			// 	id: "learnlm-1.5-pro-experimental",
			// 	name: "LearnLM 1.5 Pro Experimental",
			// },
		],
	},
	anthropic: {
		active: false,
		Icon: Anthropic,
		models: [
			{ id: "claude-3-7-sonnet-20250219", name: "Claude 3.7 Sonnet 20250219" },
			{ id: "claude-3-5-sonnet-latest", name: "Claude 3.5 Sonnet Latest" },
			{ id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet 20241022" },
			{ id: "claude-3-5-sonnet-20240620", name: "Claude 3.5 Sonnet 20240620" },
			{ id: "claude-3-5-haiku-latest", name: "Claude 3.5 Haiku Latest" },
			{ id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku 20241022" },
			{ id: "claude-3-opus-latest", name: "Claude 3.0 Opus Latest" },
			{ id: "claude-3-opus-20240229", name: "Claude 3.0 Opus 20240229" },
			{ id: "claude-3-sonnet-20240229", name: "Claude 3.0 Sonnet 20240229" },
			{ id: "claude-3-haiku-20240307", name: "Claude 3.0 Haiku 20240307" },
		],
	},
	mistral: {
		active: false,
		Icon: MistralAI,
		models: [
			{ id: "ministral-3b-latest", name: "Ministral 3B Latest" },
			{ id: "ministral-8b-latest", name: "Ministral 8B Latest" },
			{ id: "mistral-large-latest", name: "Mistral Large Latest" },
			{ id: "mistral-small-latest", name: "Mistral Small Latest" },
			{ id: "pixtral-large-latest", name: "Pixtral Large Latest" },
			{ id: "pixtral-12b-2409", name: "Pixtral 12B 2409" },
			{ id: "open-mistral-7b", name: "Open Mistral 7B" },
			{ id: "open-mixtral-8x7b", name: "Open Mixtral 8x7B" },
			{ id: "open-mixtral-8x22b", name: "Open Mixtral 8x22B" },
		],
	},
	xai: {
		Icon: xAIGrok,
		active: false,
		models: [],
	},
};

export const models = Object.entries(providers)
	.flatMap(([provider, value]) =>
		value.models.map((model) => ({
			provider,
			...model,
			active: value.active,
			Icon: value.Icon,
		})),
	)
	.filter((models) => models.active);
