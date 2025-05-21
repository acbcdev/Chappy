import { createGoogleGenerativeAI, type google } from "@ai-sdk/google";
import { createOpenAI, type openai } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "@ai-sdk/provider";
import { getProviderForModel } from "./map";
import type {
	// AnthropicModel,
	GeminiModel,
	// MistralModel,
	OpenAIModel,
	SupportedModel,
	// XaiModel,
} from "@/types/provider";

type OpenAIChatSettings = Parameters<typeof openai>[1];
// type MistralProviderSettings = Parameters<typeof mistral>[1];
type GoogleGenerativeAIProviderSettings = Parameters<typeof google>[1];
// type AnthropicProviderSettings = Parameters<typeof anthropic>[1];
// type XaiProviderSettings = Parameters<typeof xai>[1];

// type ModelSettings<T extends SupportedModel> = T extends OpenAIModel
// 	? OpenAIChatSettings
// 	: T extends MistralModel
// 		? MistralProviderSettings
// 		: T extends GeminiModel
// 			? GoogleGenerativeAIProviderSettings
// 			: T extends AnthropicModel
// 				? AnthropicProviderSettings
// 				: T extends XaiModel
// 					? XaiProviderSettings
// 					: never;

type ModelSettings<T extends SupportedModel> = T extends OpenAIModel
	? OpenAIChatSettings
	: T extends GeminiModel
		? GoogleGenerativeAIProviderSettings
		: never;

export type OpenProvidersOptions<T extends SupportedModel> = ModelSettings<T>;

export function ai<T extends SupportedModel>(
	modelId: T,
	settings?: OpenProvidersOptions<T> & { key: string | null },
): LanguageModelV1 {
	const provider = getProviderForModel(modelId);
	if (settings?.key === null) {
		throw new Error(`API key is required for ${provider}`);
	}
	if (provider === "openai") {
		const openai = createOpenAI({ apiKey: settings?.key });
		return openai(modelId as OpenAIModel, settings as OpenAIChatSettings);
	}
	if (provider === "google") {
		const google = createGoogleGenerativeAI({ apiKey: settings?.key });

		return google(
			modelId as GeminiModel,
			settings as GoogleGenerativeAIProviderSettings,
		);
	}

	// if (provider === "mistral") {
	// 	return mistral(
	// 		modelId as MistralModel,
	// 		settings as MistralProviderSettings,
	// 	);
	// }

	// if (provider === "anthropic") {
	// 	return anthropic(
	// 		modelId as AnthropicModel,
	// 		settings as AnthropicProviderSettings,
	// 	);
	// }

	// if (provider === "xai") {
	// 	return xai(modelId as XaiModel, settings as XaiProviderSettings);
	// }

	throw new Error(`Unsupported model: ${modelId}`);
}
