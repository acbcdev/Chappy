import { type Message, streamText } from "ai";
import { ai } from "@/lib/ai/ai";
import type { chatStore } from "@/store/chat";
import type { KeyStore } from "@/store/keys";
import type { SupportedModel } from "@/types/provider";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type ChatPostRequest = {
	messages: Message[];
	model: chatStore["selectedModel"];
	keys: KeyStore["keys"];
};

export async function POST(req: Request) {
	try {
		const { messages, model, keys } = (await req.json()) as ChatPostRequest;

		if (!model.id || !model.provider || !keys[model.provider]) {
			throw new Error("Model or key is missing");
		}
		const modelId = model.id as SupportedModel;
		const key = keys[model.provider];
		const result = streamText({
			model: ai(modelId, { key }),
			messages,
			system: "You are a helpful assistant.",
		});
		return result.toDataStreamResponse();
	} catch (error) {
		console.error("Error in /api/chat:", error);

		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Internal server error",
			}),
			{ status: 500 },
		);
	}
}
