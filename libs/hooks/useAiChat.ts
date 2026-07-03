// libs/hooks/useAiChat.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

type ConnectionStatus = "idle" | "connecting" | "open" | "closed" | "error";

// main.ts: app.listen(process.env.PORT_KIDDO ?? 3007), WsAdapter shu serverga ulangan.
// AiGateway'da path berilmagan -> root darajada ulanadi.
const AI_WS_URL = process.env.NEXT_PUBLIC_AI_WS_URL ?? "ws://localhost:3007";

const MAX_CONNECT_WAIT_MS = 5000;

export function useAiChat() {
  const user = useReactiveVar(userVar);
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const streamingIdRef = useRef<string | null>(null);

  const connect = useCallback(() => {
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    setStatus("connecting");
    const ws = new WebSocket(AI_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => setStatus("open");

    ws.onmessage = (event) => {
      let parsed: any;
      try {
        parsed = JSON.parse(event.data);
      } catch {
        return;
      }

      switch (parsed.event) {
        case "ai:start": {
          const id = `assistant-${Date.now()}`;
          streamingIdRef.current = id;
          setMessages((prev) => [
            ...prev,
            { id, role: "assistant", content: "", streaming: true },
          ]);
          break;
        }
        case "ai:chunk": {
          const id = streamingIdRef.current;
          if (!id) return;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === id ? { ...m, content: m.content + parsed.chunk } : m,
            ),
          );
          break;
        }
        case "ai:end": {
          const id = streamingIdRef.current;
          streamingIdRef.current = null;
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, streaming: false } : m)),
          );
          break;
        }
        case "ai:error": {
          const id = streamingIdRef.current;
          streamingIdRef.current = null;
          setMessages((prev) => {
            if (id) {
              return prev.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      content:
                        parsed.message ||
                        "Could not connect to the server. Please try again.",
                      streaming: false,
                    }
                  : m,
              );
            }
            return [
              ...prev,
              {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: parsed.message || "Xatolik yuz berdi",
              },
            ];
          });
          break;
        }
      }
    };

    ws.onerror = () => setStatus("error");
    ws.onclose = () => setStatus("closed");
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: "user", content: trimmed },
      ]);

      const payload = JSON.stringify({
        event: "aiChat",
        data: { message: trimmed, userId: user?._id },
      });

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(payload);
        return;
      }

      connect();
      const startedAt = Date.now();
      const waitAndSend = () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(payload);
        } else if (Date.now() - startedAt < MAX_CONNECT_WAIT_MS) {
          setTimeout(waitAndSend, 150);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              role: "assistant",
              content: "Could not connect to the server. Please try again.",
            },
          ]);
        }
      };
      waitAndSend();
    },
    [connect, user?._id],
  );

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return { messages, status, connect, sendMessage };
}
