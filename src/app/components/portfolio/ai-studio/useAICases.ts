import { useState, useEffect, useCallback } from "react";
import { Project } from "../types";

const STORAGE_KEY = "ai_portfolio_cases_v1";

export type AICase = {
  id: string;
  repo: string;
  generatedAt: string;
  project: Project;
};

function load(): AICase[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(cases: AICase[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export function useAICases() {
  const [cases, setCases] = useState<AICase[]>(load);

  // Sincroniza com localStorage sempre que mudar
  useEffect(() => {
    save(cases);
  }, [cases]);

  const addCase = useCallback((entry: AICase) => {
    setCases((prev) => {
      // Substitui se já existir o mesmo repo
      const filtered = prev.filter((c) => c.id !== entry.id);
      return [...filtered, entry];
    });
  }, []);

  const removeCase = useCallback((id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const hasCase = useCallback(
    (id: string) => cases.some((c) => c.id === id),
    [cases]
  );

  return { cases, addCase, removeCase, hasCase };
}
