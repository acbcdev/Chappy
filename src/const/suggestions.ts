import {
  Code,
  Frame,
  GraduationCap,
  Hammer,
  Languages,
  MessageCircleQuestion,
  NotebookPen,
  NotebookTextIcon,
  Sparkle,
} from "lucide-react";

type SuggestionCategory = {
  label: string;
  Icon: any;
  highlight: string;
  items: string[];
};

export const suggestionGroups: SuggestionCategory[] = [
  {
    label: "Code",
    Icon: Code,
    highlight: "Help me",
    items: [
      "Help me write React components ",
      "Help me debug code ",
      "Help me learn Python ",
      "Help me learn SQL ",
    ],
  },
  {
    label: "Design",
    Icon: Frame,
    highlight: "Design",
    items: [
      "Design a small logo ",
      "Design a hero section ",
      "Design a landing page ",
      "Design a social media post ",
    ],
  },
  {
    label: "Learn",
    Icon: GraduationCap,
    highlight: "Learn",
    items: [
      "Learn about React ",
      "Learn about SQL ",
      "Learn about Python ",
      "Learn about the teoria of AI ",
    ],
  },
  {
    label: "Write",
    Icon: NotebookTextIcon,
    highlight: "Write",
    items: [
      "Write a blog post ",
      "Write a book ",
      "Write a report ",
      "Write a paper ",
    ],
  },
  {
    label: "Translate",
    Icon: Languages,
    highlight: "Translate",
    items: [
      "Translate a document ",
      "Translate a book ",
      "Translate a poem ",
      "Translate a this word ",
    ],
  },
  {
    label: "Inspire",
    Icon: Sparkle,
    highlight: "Inspire me",
    items: [
      "Inspire me to write a blog post ",
      "Inspire me to write a book ",
      "Inspire me to write a report ",
      "Inspire me to write a paper ",
    ],
  },

  {
    label: "Sumarize",
    Icon: NotebookPen,
    highlight: "Sumarize",
    items: [
      "Sumarize the French Revolution ",
      "Sumarize the history of America ",
      "Sumarize World War I",
      "Sumarize the benefits of meditation",
    ],
  },
  {
    label: "Ask",
    Icon: MessageCircleQuestion,
    highlight: "Ask",
    items: [
      "Ask me a question ",
      "Ask me a joke ",
      "Ask me a fact ",
      "Ask me a poem ",
    ],
  },
  {
    label: "Create",
    Icon: Hammer,
    highlight: "Create",
    items: [
      "Create  5 creative writing prompts for flash fiction  ",
      "Create a magical realism story",
      "Create a fantasy story",
    ],
  },
];
