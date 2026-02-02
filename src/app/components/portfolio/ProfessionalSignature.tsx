import React, { useEffect, useId, useRef, useState } from "react";

type Props = {
  name?: string;
  birthDate: string; // "YYYY-MM-DD"
  degree?: string;
  role?: string;
  className?: string;
};

export function ProfessionalSignature({
  name = "Lucas Luiz Inácio da Silva",
  birthDate,
  degree = "Análise e Desenvolvimento de Sistemas",
  role = "Sistemas operacionais e automações",
  className = "",
}: Props) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  // === IDADE DINÂMICA (precisa) ===
  const age = getAgeFromBirthDate(birthDate);

  useEffect(() => {
    const mq = window.matchMedia?.("(pointer: coarse)");
    const update = () => setIsCoarse(Boolean(mq?.matches));
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const toggleIfMobile = () => {
    if (!isCoarse) return;
    setOpen((v) => !v);
  };

  return (
    <div
      ref={rootRef}
      className={["relative inline-flex group pt-3", className].join(" ")}
    >
      <span
        aria-describedby={`${id}-card`}
        aria-haspopup="dialog"
        aria-expanded={open}
        tabIndex={0}
        onClick={toggleIfMobile}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        className={[
          "select-none outline-none",
          "cursor-pointer",
          "inline-flex items-center gap-2",
          "text-xs sm:text-sm",
          "tracking-[0.22em] uppercase",
          "text-[#0A0F24]/75",
          "focus-visible:ring-1 focus-visible:ring-[#C2A14D]/35",
          "focus-visible:rounded-md focus-visible:px-1 focus-visible:-mx-1",
        ].join(" ")}
      >
        <span className="h-[6px] w-[6px] rounded-full bg-[#C2A14D]/60" />
        {name}
      </span>

      <div
        id={`${id}-card`}
        role="dialog"
        className={[
          "absolute left-0 top-full z-20",

          "w-[340px] max-w-[85vw]",
          "rounded-2xl",
          "border border-[#0A0F24]/10",
          "bg-white/95",
          "shadow-[0_18px_60px_-30px_rgba(10,15,36,0.45)]",
          "backdrop-blur-md",
          "p-4",

          // fechado
          "pointer-events-none opacity-0 translate-y-2 scale-[0.985]",
          "transition-all duration-200 ease-out",

          // visível no desktop
          "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:cursor-pointer",
          "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:cursor-pointer",

          // visível no mobile (tap)
          open
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100 cursor-pointer"
            : "",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.22em] uppercase text-[#0A0F24]/60">
              Identificação
            </div>
            <div className="mt-1 font-semibold text-[15px] leading-snug text-[#0A0F24]">
              {name}
            </div>
          </div>

          <div className="shrink-0 rounded-xl border border-[#C2A14D]/25 bg-[#C2A14D]/10 px-2.5 py-1">
            <span className="text-[11px] tracking-[0.18em] uppercase text-[#0A0F24]/80">
              {age} anos
            </span>
          </div>
        </div>

        <div className="mt-3 h-px w-full bg-[#0A0F24]/10" />

        <dl className="mt-3 space-y-2">
          <Row label="Formação" value={degree} />
          <Row label="Atuação" value={role} />
        </dl>

        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C2A14D]/70" />
          <span className="text-xs text-[#4A5568]">
            Modelagem de dados • regras operacionais • automações
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-3 items-start">
      <dt className="text-[11px] tracking-[0.2em] uppercase text-[#0A0F24]/60">
        {label}
      </dt>
      <dd className="text-sm text-[#0A0F24]/85 leading-snug">{value}</dd>
    </div>
  );
}

function getAgeFromBirthDate(birthDate: string) {
  // Espera "YYYY-MM-DD"
  const [y, m, d] = birthDate.split("-").map((n) => Number(n));
  if (!y || !m || !d) return 0;

  const today = new Date();
  let age = today.getFullYear() - y;

  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > m ||
    (today.getMonth() + 1 === m && today.getDate() >= d);

  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}
