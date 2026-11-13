"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Persist small bits of UI state (checklist progress, training progress) in
 * the browser via useSyncExternalStore, so server and first client render
 * agree (`hydrated` is false on the server snapshot).
 */

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage full or unavailable; state still updates in-memory listeners
  }
  emit();
}

export function useLocalStorage<T>(key: string, initial: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return initial;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  }, [raw, initial]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = (() => {
        const r = readRaw(key);
        if (r === null) return initial;
        try {
          return JSON.parse(r) as T;
        } catch {
          return initial;
        }
      })();
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(current) : next;
      writeRaw(key, JSON.stringify(resolved));
    },
    [key, initial],
  );

  return [value, update, hydrated] as const;
}

const EMPTY: string[] = [];

/** Convenience for sets of completed ids. */
export function useCompletedSet(key: string) {
  const [ids, setIds, hydrated] = useLocalStorage<string[]>(key, EMPTY);
  const toggle = useCallback(
    (id: string) =>
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [setIds],
  );
  const reset = useCallback(() => setIds([]), [setIds]);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  return { ids, toggle, reset, has, hydrated };
}
