"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { cards } from "@/data/content";
type Progress = {
  currentId: string;
  viewed: string[];
  verified: string[];
  answers: Record<string, string>;
  completed: boolean;
};
const empty: Progress = {
  currentId: "",
  viewed: [],
  verified: [],
  answers: {},
  completed: false,
};
const StateContext = createContext<{
  progress: Progress;
  ready: boolean;
  update: (fn: (p: Progress) => Progress) => void;
  reset: () => void;
}>({ progress: empty, ready: false, update: () => {}, reset: () => {} });
export function Preferences({
  children,
  storageKey = "antes-do-voto:v2",
}: {
  children: React.ReactNode;
  storageKey?: string | null;
}) {
  const [progress, setProgress] = useState<Progress>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = JSON.parse(
        (storageKey ? localStorage.getItem(storageKey) : null) || "null",
      );
      if (
        raw &&
        Array.isArray(raw.viewed) &&
        Array.isArray(raw.verified) &&
        typeof raw.answers === "object" &&
        raw.answers &&
        typeof raw.currentId === "string"
      )
        setProgress({
          currentId: cards.some((c) => c.id === raw.currentId)
            ? raw.currentId
            : "",
          viewed: [
            ...new Set<string>(
              raw.viewed.filter((id: unknown) =>
                cards.some((c) => c.id === id),
              ),
            ),
          ],
          verified: [
            ...new Set<string>(
              raw.verified.filter((id: unknown) =>
                cards.some((c) => c.id === id),
              ),
            ),
          ],
          answers: Object.fromEntries(
            Object.entries(raw.answers)
              .filter(
                ([id, answer]) =>
                  cards.some((c) => c.id === id && c.type === "quiz") &&
                  ["Verdadeiro", "Falso", "Falta contexto"].includes(
                    answer as string,
                  ),
              )
              .map(([id, answer]) => [id, String(answer)]),
          ),
          completed: raw.completed === true,
        });
    } catch {}
    setReady(true);
  }, [storageKey]);
  useEffect(() => {
    if (ready && storageKey)
      try {
        localStorage.setItem(storageKey, JSON.stringify(progress));
      } catch {}
  }, [progress, ready, storageKey]);
  return (
    <StateContext.Provider
      value={{
        progress,
        ready,
        update: setProgress,
        reset: () => setProgress(empty),
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export const useProgress = () => useContext(StateContext);
export function AccessibilityControls() {
  const [large, setLarge] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    try {
      const prefs = JSON.parse(
        localStorage.getItem("antes-do-voto:accessibility") || "{}",
      );
      setLarge(!!prefs.large);
      setReduce(!!prefs.reduce);
      document.documentElement.dataset.large = String(!!prefs.large);
      document.documentElement.dataset.reduce = String(!!prefs.reduce);
    } catch {}
  }, []);
  function change(nextLarge: boolean, nextReduce: boolean) {
    setLarge(nextLarge);
    setReduce(nextReduce);
    document.documentElement.dataset.large = String(nextLarge);
    document.documentElement.dataset.reduce = String(nextReduce);
    try {
      localStorage.setItem(
        "antes-do-voto:accessibility",
        JSON.stringify({ large: nextLarge, reduce: nextReduce }),
      );
    } catch {}
  }
  return (
    <div className="accessibility">
      <button
        aria-label="Aumentar tamanho da fonte"
        aria-pressed={large}
        onClick={() => change(!large, reduce)}
      >
        A<span>+</span>
      </button>
      <button
        aria-label="Reduzir animações"
        aria-pressed={reduce}
        onClick={() => change(large, !reduce)}
        className="motion-toggle"
      >
        {reduce ? "Animações reduzidas" : "Reduzir animações"}
      </button>
    </div>
  );
}
