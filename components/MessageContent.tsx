import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cleans raw LLM output so the chat only ever shows a readable answer:
 * - removes source / citation references ("According to Source 2", "(Source 1)", "[Source 1: ...]")
 * - removes stray HTML the model sometimes emits
 * - normalises whitespace left behind by those removals
 *
 * Markdown *symbols* are not removed here — they are rendered properly by
 * `renderInline` below. Anything unmatched is stripped as residue.
 */
const CITATION_RULES: Array<[RegExp, string]> = [
  // "[Source 1: Experience.md]" / "[source 1]"
  [/\[\s*sources?\s*\d+\s*(?::[^\]]*)?\]/gi, ""],
  // "(Source 1)" / "(Sources 1 & 2: projects.md)"
  [/\(\s*sources?\s*\d+(?:[^)\n]*)\)/gi, ""],
  // "According to the context" / "According to Source 2"
  [
    /\baccording\s+to\s+(?:the\s+)?(?:provided\s+)?(?:context\b|knowledge\s+base\b|notes?\b|sources?\s*\d+|documents?\s*\d+|snippets?\s*\d+)/gi,
    "",
  ],
  // "as mentioned/stated in the context" (must run before the generic
  // "in <context>" rule below, which would otherwise eat half of it)
  [
    /\bas\s+(?:mentioned|stated|described|noted|given|shown)\s+in\s+(?:the\s+)?(?:provided\s+)?(?:context\b|sources?\s*\d+|documents?\s*\d+|information\b|above\b)/gi,
    "",
  ],
  // "from source 2" / "from the document 1" / "in source 3" / "from the context"
  [
    /\b(?:from|in|per|by)\s+(?:the\s+)?(?:provided\s+)?(?:context\b|sources?\s*\d+|documents?\s*\d+|snippets?\s*\d+|notes?\s*\d+)/gi,
    "",
  ],
  // "based on the context above"
  [
    /\bbased\s+(?:strictly\s+)?on\s+(?:the\s+)?(?:provided\s+)?(?:context\b|sources?\s*\d+|documents?\s*\d+|above\b|information\b)/gi,
    "",
  ],
  // bare "Source 1" / "sources 1, 2 and 3" (also eats a trailing colon)
  [/\bsources?\s*\d+(?:\s*[,;&]\s*\d+)*[ \t]*[:\-–—]?[ \t]*/gi, ""],
  // numeric citation markers "[1]", "[1, 2]"
  [/\[\s*\d+(?:\s*[,;&]\s*\d+)*\s*\]/g, ""],
  // HTML line breaks / wrappers
  [/<br\s*\/?>/gi, "\n"],
  [/<\/p\s*>/gi, "\n\n"],
  [/<[^>]+>/g, ""],
  // common entities
  [/&nbsp;/gi, " "],
  [/&amp;/gi, "&"],
  [/&quot;/gi, '"'],
  [/&#39;|&apos;/gi, "'"],
];

/** Residual markdown emphasis symbols that never survived tokenisation. */
function stripStrayMarkers(text: string): string {
  return text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/~~/g, "");
}

/**
 * Lines that started with a citation. Once the citation is stripped the
 * remainder can start mid-sentence, so those lines get their first letter
 * re-capitalised.
 */
const CITATION_LINE_START =
  /^\s*\(?\[?\s*(?:sources?\s*\d|according\s+to\b|as\s+mentioned\s+in\b|based\s+on\b|from\s+(?:the\s+)?(?:provided\s+)?(?:context\b|sources?\s*\d|documents?\s*\d)|in\s+(?:the\s+)?(?:provided\s+)?(?:context\b|sources?\s*\d|documents?\s*\d))/i;

function tidy(text: string): string {
  return text
    .replace(/[ \t]{2,}/g, " ")
    // drop padding before punctuation, but never inside things like ".NET"
    .replace(/[ \t]+([,.;:!?])(?=[ \t]|$)/g, "$1")
    .replace(/,[ \t]*,/g, ",")
    // "vector search. , embeddings" -> "vector search. embeddings"
    .replace(/\.[ \t]*,[ \t]*/g, ". ")
    .replace(/\([ \t]*\)/g, "")
    .replace(/\[[ \t]*\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^[ \t]*[,;:.][ \t]+/gm, "")
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    .trim();
}

/** Re-caps the word after a sentence end that a citation removal may have orphaned. */
function fixSentenceCase(text: string): string {
  return text.replace(
    /([.!?\u2026][ \t\n]+)([a-z])/g,
    (_match, separator: string, letter: string) => separator + letter.toUpperCase()
  );
}

export function cleanAssistantText(raw: string): string {
  const cleanedLines = raw.split("\n").map((line) => {
    let text = line;
    for (const [pattern, replacement] of CITATION_RULES) {
      text = text.replace(pattern, replacement);
    }
    text = tidy(text);

    if (text !== line && CITATION_LINE_START.test(line) && /^[a-z]/.test(text)) {
      text = text[0].toUpperCase() + text.slice(1);
    }
    return text;
  });

  return tidy(cleanedLines.join("\n"));
}

/* -------------------------------------------------------------------------- */
/* Block parsing                                                              */
/* -------------------------------------------------------------------------- */

type Block =
  | { type: "paragraph"; lines: string[] }
  | { type: "heading"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; code: string };

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let code: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", lines: paragraph });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const line of text.split("\n")) {
    if (/^\s*```/.test(line)) {
      if (code) {
        blocks.push({ type: "code", code: code.join("\n") });
        code = null;
      } else {
        flushAll();
        code = [];
      }
      continue;
    }
    if (code) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = line.match(/^\s*#{1,6}\s+(.*)$/);
    if (heading) {
      flushAll();
      blocks.push({ type: "heading", text: heading[1].trim() });
      continue;
    }

    const bullet = line.match(/^\s*[-*•·]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1].trim());
      continue;
    }

    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushParagraph();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(numbered[1].trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  if (code) blocks.push({ type: "code", code: code.join("\n") });
  flushAll();
  return blocks;
}

/* -------------------------------------------------------------------------- */
/* Inline parsing                                                             */
/* -------------------------------------------------------------------------- */

const INLINE_PATTERN =
  /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(__[^_\n]+__)|(\*[^*\n]+\*)|(\[[^\]\n]+\]\((?:https?:\/\/|mailto:)[^\s)]+\))/g;

function plainText(text: string, key: number): ReactNode {
  return <Fragment key={key}>{stripStrayMarkers(text)}</Fragment>;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    const [full, code, boldA, boldB, italic, link] = match;

    // An "*" directly after another "*" is the tail of an unmatched "**"
    // (e.g. "**unclosed *bold") — leave it as plain residue instead of
    // turning half the sentence italic.
    if (italic && match.index > 0 && text[match.index - 1] === "*") {
      INLINE_PATTERN.lastIndex = match.index + 1;
      continue;
    }

    if (match.index > lastIndex) {
      nodes.push(plainText(text.slice(lastIndex, match.index), key++));
    }

    if (code) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-[#00ea7b]"
        >
          {code.slice(1, -1)}
        </code>
      );
    } else if (boldA || boldB) {
      const marker = boldA ?? boldB ?? "";
      nodes.push(
        <strong key={key++} className="font-semibold text-white">
          {stripStrayMarkers(marker.slice(2, -2))}
        </strong>
      );
    } else if (italic) {
      nodes.push(
        <em key={key++} className="italic text-white/90">
          {stripStrayMarkers(italic.slice(1, -1))}
        </em>
      );
    } else if (link) {
      const close = link.lastIndexOf("](");
      const label = link.slice(1, close);
      const href = link.slice(close + 2, -1);
      nodes.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#00ea7b] underline decoration-[#00ea7b]/40 underline-offset-2 transition-colors hover:decoration-[#00ea7b]"
        >
          {label}
        </a>
      );
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(plainText(text.slice(lastIndex), key++));
  }
  return nodes;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

interface MessageContentProps {
  content: string;
  className?: string;
}

/**
 * Renders assistant (or user) chat text with comfortable typography:
 * paragraphs, headings, lists, inline emphasis and code — with all leftover
 * LLM markdown symbols stripped instead of shown to the visitor.
 */
export default function MessageContent({ content, className }: MessageContentProps) {
  const blocks = parseBlocks(cleanAssistantText(content));

  if (blocks.length === 0) return null;

  return (
    <div className={cn("space-y-2.5 break-words", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="whitespace-pre-line">
                {renderInline(fixSentenceCase(block.lines.join("\n")))}
              </p>
            );
          case "heading":
            return (
              <p key={i} className="font-semibold text-white">
                {renderInline(fixSentenceCase(block.text))}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-4 marker:text-[#00ea7b]">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(fixSentenceCase(item))}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="list-decimal space-y-1.5 pl-4 marker:text-[#00ea7b] marker:font-medium"
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(fixSentenceCase(item))}</li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs leading-relaxed text-[#00ea7b]"
              >
                <code>{block.code}</code>
              </pre>
            );
        }
      })}
    </div>
  );
}
