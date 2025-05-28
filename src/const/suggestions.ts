import { Code, Frame, GraduationCap } from "lucide-react";

export const suggestionGroups = [
	{
		label: "Code",
		Icon: Code,
		highlight: "Help me",
		items: [
			"Help me write React components",
			"Help me debug code",
			"Help me learn Python",
			"Help me learn SQL",
		],
	},
	{
		label: "Design",
		Icon: Frame,
		highlight: "Design",
		items: [
			"Design a small logo",
			"Design a hero section",
			"Design a landing page",
			"Design a social media post",
		],
	},
	{
		label: "Learn",
		Icon: GraduationCap,
		highlight: "Learn",
		items: [
			"Learn about React",
			"Learn about SQL",
			"Learn about Python",
			"Learn about the teoria of AI",
		],
	},
];
