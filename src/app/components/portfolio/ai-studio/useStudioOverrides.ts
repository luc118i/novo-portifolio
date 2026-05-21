import { useCallback, useEffect, useState } from "react";
import { Project } from "../types";

const KEY = "studio_overrides_v1";

type Store = {
  edits: Record<string, Partial<Project>>;
  hidden: string[];
};

const EMPTY: Store = { edits: {}, hidden: [] };

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function persist(s: Store) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function useStudioOverrides() {
  const [store, setStore] = useState<Store>(EMPTY);

  useEffect(() => { setStore(load()); }, []);

  const mutate = useCallback((fn: (s: Store) => Store) => {
    setStore(prev => {
      const next = fn(prev);
      persist(next);
      return next;
    });
  }, []);

  const editProject = useCallback((id: string, fields: Partial<Project>) => {
    mutate(s => ({
      ...s,
      edits: { ...s.edits, [id]: { ...(s.edits[id] ?? {}), ...fields } },
    }));
  }, [mutate]);

  const hideProject = useCallback((id: string) => {
    mutate(s => ({
      ...s,
      hidden: s.hidden.includes(id) ? s.hidden : [...s.hidden, id],
    }));
  }, [mutate]);

  const restoreProject = useCallback((id: string) => {
    mutate(s => ({ ...s, hidden: s.hidden.filter(h => h !== id) }));
  }, [mutate]);

  const resetProject = useCallback((id: string) => {
    mutate(s => {
      const { [id]: _removed, ...rest } = s.edits;
      return { ...s, edits: rest, hidden: s.hidden.filter(h => h !== id) };
    });
  }, [mutate]);

  return { overrides: store, editProject, hideProject, restoreProject, resetProject };
}
