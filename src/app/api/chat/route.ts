import { streamText } from "ai";
import { ai } from "@/lib/ai/ai";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	try {
		const { messages, model, keys } = await req.json();

		const result = streamText({
			model: ai(model),
			messages,
			system: "You are a helpful assistant.",
		});
		return result.toDataStreamResponse();
	} catch (error: unknown) {
		console.error("Error in /api/chat:", error);

		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Internal server error",
			}),
			{ status: 500 },
		);
	}
}
