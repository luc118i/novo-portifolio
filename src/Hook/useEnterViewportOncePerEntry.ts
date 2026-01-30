import { useEffect, useRef, useState } from "react";

export function useEnterViewportOncePerEntry<T extends Element>(opts?: {
  rootMargin?: string;
  threshold?: number | number[];
  lockMs?: number;
}) {
  const ref = useRef<T | null>(null);
  const [entered, setEntered] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const threshold = opts?.threshold ?? 0.25;
    const rootMargin = opts?.rootMargin ?? "0px 0px -25% 0px";
    const lockMs = opts?.lockMs ?? 700;

    let locked = false;
    let wasIntersecting = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const isNow = entry.isIntersecting;

        // detecta "borda": false -> true
        if (!wasIntersecting && isNow) {
          if (!locked) {
            locked = true;
            setEntered((n) => n + 1);
            window.setTimeout(() => (locked = false), lockMs);
          }
        }

        wasIntersecting = isNow;
      },
      { threshold, rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [opts?.rootMargin, JSON.stringify(opts?.threshold), opts?.lockMs]);

  return { ref, entered };
}
