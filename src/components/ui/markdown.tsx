import { cn } from "@/lib/utils";
import { marked } from "marked";
import { memo, useId, useMemo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { CodeBlock, CodeBlockCode } from "./code-block";

export type MarkdownProps = {
  children: string;
  id?: string;
  className?: string;
  components?: Partial<Components>;
};

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = /language-(\w+)/.exec(className || "");
  return match ? match[1] : "plaintext";
}

const INITIAL_COMPONENTS = {
  code: ({ className, children, ...props }) => {
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line;

    if (isInline) {
      return (
        <code className="bg-background/60  text-foreground px-2 py-1  rounded-sm">
          {children}
        </code>
      );
    }

    const language = extractLanguage(className);

    return (
      <CodeBlock className={cn(className, "my-4")}>
        <CodeBlockCode code={children as string} language={language} />
      </CodeBlock>
    );
  },
  pre: ({ children }) => <pre className="my-4 bg-transparent">{children}</pre>,
  p: ({ children }) => {
    return <p className="my-1 leading-7 ">{children}</p>;
  },
  ol: ({ children }) => {
    return <ol className="list-decimal list-outside ml-4">{children}</ol>;
  },
  li: ({ children }) => {
    return <li className=" py-1 leading-7">{children}</li>;
  },
  ul: ({ children }) => {
    return <ul className="list-disc  my-1 list-outside ml-4">{children}</ul>;
  },
  strong: ({ children }) => {
    return <span className="font-extrabold">{children}</span>;
  },
  br: () => {
    return <br className="m-10" />;
  },
  a: ({ children, ...props }) => (
    <a
      target="_blank"
      rel="noreferrer"
      className=" hover:underline text-accent"
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ children }) => {
    return <h1 className="text-4xl font-black mt-6 mb-2">{children}</h1>;
  },
  h2: ({ children }) => {
    return <h2 className="text-3xl font-black mt-6 mb-2">{children}</h2>;
  },
  h3: ({ children }) => {
    return <h3 className="text-2xl font-black mt-6 mb-2">{children}</h3>;
  },
  h4: ({ children }) => {
    return <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>;
  },
  h5: ({ children }) => {
    return <h5 className="text-lg font-semibold mt-6 mb-2">{children}</h5>;
  },
  h6: ({ children }) => {
    return <h6 className="text-base font-semibold mt-6 mb-2">{children}</h6>;
  },
  blockquote: ({ children }) => {
    return (
      <blockquote className="border-l-4 border-accent my-3 pl-4 text-sm">
        {children}
      </blockquote>
    );
  },
  kbd: ({ children }) => {
    return (
      <kbd className="border border-accent rounded-md px-2 py-1 text-sm">
        {children}
      </kbd>
    );
  },
  table: ({ children }) => {
    return <table className="table-auto border border-muted">{children}</table>;
  },
  thead: ({ children }) => {
    return <thead className="text-left border border-muted">{children}</thead>;
  },
  tbody: ({ children }) => {
    return (
      <tbody className="divide-y border  border-muted divide-border">
        {children}
      </tbody>
    );
  },
  tr: ({ children }) => {
    return <tr className=" border border-muted">{children}</tr>;
  },
  td: ({ children }) => {
    return <td className="p-2 border border-muted">{children}</td>;
  },
  th: ({ children }) => {
    return <th className="p-2 border border-muted">{children}</th>;
  },
  hr: () => {
    return <hr className="my-4 border-muted" />;
  },
  main: ({ children }) => {
    return <main className="my-4 border-muted">{children}</main>;
  },
} satisfies Components;

const MemoizedMarkdownBlock = memo(
  function MarkdownBlock({
    content,
    components = INITIAL_COMPONENTS,
  }: {
    content: string;
    components?: Partial<Components>;
  }) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    );
  },
  function propsAreEqual(prevProps, nextProps) {
    return prevProps.content === nextProps.content;
  }
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

function MarkdownComponent({
  children,
  id,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownProps) {
  const generatedId = useId();
  const blockId = id ?? generatedId;
  const blocks = useMemo(() => parseMarkdownIntoBlocks(children), [children]);

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <MemoizedMarkdownBlock
          key={`${blockId}-block-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
          content={block}
          components={components}
        />
      ))}
    </div>
  );
}

const Markdown = memo(MarkdownComponent);
Markdown.displayName = "Markdown";

export { Markdown };
