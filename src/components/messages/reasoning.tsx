import {
	Reasoning as ReasoningPure,
	ReasoningContent,
	ReasoningResponse,
	ReasoningTrigger,
} from "../ui/reasoning";

export function Reasoning({ reasoning }: { reasoning: string }) {
	return (
		<ReasoningPure>
			<ReasoningTrigger>Show reasoning</ReasoningTrigger>
			<ReasoningContent className="ml-2 border-l-2 border-l-slate-200 px-2 pb-1 dark:border-l-slate-700">
				<ReasoningResponse text={reasoning} />
			</ReasoningContent>
		</ReasoningPure>
	);
}
