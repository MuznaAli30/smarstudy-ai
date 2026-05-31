"use client";

import { useState } from "react";
import type { AIRequestType, AIResponseBody } from "@/lib/types/ai";
import { apiFetch } from "@/lib/api/client";
import { useToast } from "@/components/ui/toast-provider";

export function useAI() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastType, setLastType] = useState<AIRequestType | null>(null);
  const [lastInput, setLastInput] = useState("");
  const { toast } = useToast();

  const runAI = async (type: AIRequestType) => {
    setLoading(true);
    setResult("");
    setLastInput(text);
    setLastType(type);

    try {
      const data = await apiFetch<AIResponseBody & { error?: string }>(
        "/api/ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, text }),
        }
      );

      if (data.error) {
        toast(data.error, "error");
        setResult("");
      } else {
        setResult(data.result);
      }
    } catch {
      toast("Failed to get AI response", "error");
    } finally {
      setLoading(false);
    }
  };

  return { text, setText, result, runAI, loading, lastType, lastInput };
}
