"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, RotateCcw, Send, User, X } from "lucide-react";
import MessageContent from "./MessageContent";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

const SUGGESTIONS = [
  "What are Sujib's top projects?",
  "What technologies does Sujib use?",
  "Is Sujib available for hire?",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm Sujib's AI assistant. Ask me anything about his projects, skills, or experience.",
} as const satisfies Message;

const STOPPED_MESSAGE = "Response stopped.";

function updateLast(messages: Message[], patch: Partial<Message>): Message[] {
  const next = [...messages];
  const last = next[next.length - 1];
  if (last && last.role === "assistant") {
    next[next.length - 1] = { ...last, ...patch };
  }
  return next;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef<string | null>(null);

  // Closing hands focus back to the toggle button so keyboard users never
  // lose their place on the page.
  const closeChat = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Keep the transcript pinned to the newest message (never the page itself).
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  // Focus can be dropped on <body> when the panel flips to inert, so restore
  // it to the toggle button once the closed state has actually rendered.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) toggleRef.current?.focus();
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Escape closes the widget.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeChat]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const runQuery = useCallback(async (query: string) => {
    setIsLoading(true);
    setMessages((prev) => updateLast(prev, { content: "", error: false }));

    let accumulated = "";

    try {
      abortRef.current = new AbortController();
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("Failed to get response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => updateLast(prev, { content: accumulated }));
      }

      if (accumulated.includes("[Error generating response]")) {
        throw new Error("Stream error");
      }

      if (!accumulated.trim()) {
        throw new Error("Empty response");
      }

      setMessages((prev) => updateLast(prev, { content: accumulated.trim() }));
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setMessages((prev) =>
          updateLast(prev, {
            content: accumulated.trim() || STOPPED_MESSAGE,
          })
        );
      } else {
        setMessages((prev) =>
          updateLast(prev, {
            content:
              "Sorry, something went wrong. Please try again or contact Sujib directly.",
            error: true,
          })
        );
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, []);

  const sendQuery = useCallback(
    (rawQuery: string) => {
      const query = rawQuery.trim();
      if (!query || isLoading) return;

      lastQueryRef.current = query;
      setInput("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: query },
        { role: "assistant", content: "" },
      ]);
      void runQuery(query);
    },
    [isLoading, runQuery]
  );

  const retry = useCallback(() => {
    const query = lastQueryRef.current;
    if (!query || isLoading) return;
    void runQuery(query);
  }, [isLoading, runQuery]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendQuery(input);
  };

  const lastMessage = messages[messages.length - 1];
  const isStreaming =
    isLoading &&
    lastMessage?.role === "assistant" &&
    lastMessage.content.length > 0;
  const isWaiting =
    isLoading &&
    lastMessage?.role === "assistant" &&
    lastMessage.content.length === 0;

  return (
    <>
      {/* Toggle button */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className={`fixed bottom-6 right-6 z-[200] flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea7b] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          isOpen
            ? "border border-white/15 bg-[#111111] hover:border-white/30"
            : "bg-[#00ea7b] text-black hover:bg-[#22c55e] hover:shadow-[0_0_28px_rgba(0,234,123,0.45)]"
        }`}
      >
        {isOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <MessageCircle size={20} aria-hidden="true" />
        )}
      </button>

      {/* Chat window */}
      <div
        role="dialog"
        aria-label="Chat with Sujib's assistant"
        inert={!isOpen}
        className={`chat-panel fixed bottom-24 right-4 z-[200] flex w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out origin-bottom-right sm:right-6 sm:w-[380px] ${
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-white/10 bg-[#111111] px-4 py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00ea7b]/10 ring-1 ring-inset ring-[#00ea7b]/25">
            <Bot size={16} className="text-[#00ea7b]" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-white">
              Sujib&apos;s Assistant
            </p>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#00ea7b]"
                aria-hidden="true"
              />
              Ask about Sujib
            </p>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea7b]/60"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        {/* Messages */}
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-busy={isLoading}
          className="chat-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5"
        >
          {messages.map((msg, i) => {
            const isLast = i === messages.length - 1;
            const showTyping = isLast && isWaiting && !msg.error;
            const showCaret = isLast && isStreaming;
            const isUser = msg.role === "user";

            return (
              <div
                key={i}
                className={`flex gap-2.5 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00ea7b]/25 bg-[#00ea7b]/10"
                    aria-hidden="true"
                  >
                    <Bot size={12} className="text-[#00ea7b]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] px-3.5 py-2.5 ${
                    isUser
                      ? "rounded-2xl rounded-tr-md bg-[#00ea7b] text-sm font-medium leading-relaxed text-black"
                      : "rounded-2xl rounded-tl-md border border-white/[0.08] bg-[#141414] text-gray-300"
                  }`}
                >
                  {isUser ? (
                    <span className="block whitespace-pre-wrap break-words">
                      {msg.content}
                    </span>
                  ) : showTyping ? (
                    <span className="flex items-center gap-1.5 py-1">
                      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#00ea7b]" />
                      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#00ea7b] [animation-delay:150ms]" />
                      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#00ea7b] [animation-delay:300ms]" />
                      <span className="sr-only">Assistant is typing</span>
                    </span>
                  ) : (
                    <>
                      <MessageContent
                        content={msg.content}
                        className={`text-[13.5px] leading-[1.65] ${
                          showCaret ? "chat-streaming" : ""
                        } ${msg.error ? "text-gray-400" : "text-gray-300"}`}
                      />
                      {msg.error && (
                        <button
                          type="button"
                          onClick={retry}
                          disabled={isLoading}
                          className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-300 transition-colors hover:border-[#00ea7b]/40 hover:text-[#00ea7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea7b]/60 disabled:opacity-50"
                        >
                          <RotateCcw size={12} aria-hidden="true" />
                          Try again
                        </button>
                      )}
                    </>
                  )}
                </div>

                {isUser && (
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5"
                    aria-hidden="true"
                  >
                    <User size={12} className="text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Suggestions (only while the transcript is untouched) */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendQuery(suggestion)}
                disabled={isLoading}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-gray-400 transition-colors hover:border-[#00ea7b]/40 hover:bg-[#00ea7b]/5 hover:text-[#00ea7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea7b]/60 disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-white/10 bg-[#111111] px-4 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Sujib..."
            aria-label="Your question"
            disabled={isLoading}
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-sm leading-normal text-white transition-colors placeholder:text-gray-500 focus:border-[#00ea7b]/60 focus:outline-none focus:ring-2 focus:ring-[#00ea7b]/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00ea7b] text-black transition-all duration-200 hover:bg-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea7b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] disabled:cursor-not-allowed disabled:bg-[#00ea7b] disabled:opacity-30"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
