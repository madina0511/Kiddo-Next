// components/ai-assistant/AiChatWidget.tsx
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import styles from "@/scss/pc/ai/AiChatWidget.module.scss";
import { useAiChat } from "@/libs/hooks/useAiChat";

const AiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, connect, sendMessage } = useAiChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) connect();
  }, [open, connect]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span>🧸 Kiddo AI Assistant</span>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className={styles.body}>
            {messages.length === 0 && (
              <div className={styles.emptyState}>
                Hi! I can help you find the right clothes and sizes for your
                child 👶
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? styles.userBubble : styles.aiBubble
                }>
                {m.content || (m.streaming ? "···" : "")}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
            />
            <button
              onClick={handleSend}
              disabled={status === "connecting" || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      <button className={styles.fab} onClick={() => setOpen((v) => !v)} aria-label="AI Assistant">
	{open ? '✕' : '💬'}
	{!open && <span className={styles.fabLabel}>Ask AI</span>}
</button>
    </div>
  );
};

export default AiChatWidget;
