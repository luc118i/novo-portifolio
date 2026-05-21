import { useState, useEffect } from "react";

const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
const dur = "0.8s";

function Panel({ letter, dark }: { letter: "L" | "I"; dark: boolean }) {
  const [prevDark, setPrevDark] = useState(dark);
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    if (dark === prevDark) return;
    setSweeping(true);
    const id = setTimeout(() => {
      setSweeping(false);
      setPrevDark(dark);
    }, 820);
    return () => clearTimeout(id);
  }, [dark]); // eslint-disable-line react-hooks/exhaustive-deps

  const targetBg  = dark     ? "#0A0F24" : "#F7FAFC";
  const overlayBg = prevDark ? "#0A0F24" : "#F7FAFC";
  const letterColor = dark ? "#FFFFFF"                  : "#0A0F24";
  const labelColor  = dark ? "rgba(255,255,255,0.42)"   : "rgba(10,15,36,0.38)";

  return (
    <div
      className="flex-1 relative flex flex-col items-center overflow-hidden"
      style={{ background: targetBg }}
    >
      {/* Grid branco — painel escuro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: dark ? 1 : 0,
          transition: `opacity ${dur} ${ease}`,
        }}
      />

      {/* Grid escuro — painel claro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(10,15,36,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10,15,36,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: dark ? 0 : 1,
          transition: `opacity ${dur} ${ease}`,
        }}
      />

      {/* Overlay da cor anterior — varre em espiral (clock-wipe) */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none panel-overlay ${
          sweeping ? "panel-overlay-zero" : "panel-overlay-full"
        }`}
        style={{ background: overlayBg }}
      />

      {/* Label */}
      <div
        className="relative z-20 w-full pt-5 pl-5"
        style={{
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          lineHeight: 1.7,
          color: labelColor,
          transition: `color ${dur} ${ease}`,
        }}
      >
        Lucas
        <br />
        Inácio.
      </div>

      {/* Monograma */}
      <div
        className="relative z-20 flex items-center justify-center flex-1"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: "clamp(5.5rem, 13vw, 9.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          userSelect: "none",
          color: letterColor,
          transform: sweeping ? "scale(0.93)" : "scale(1)",
          transition: `color ${dur} ${ease}, transform ${dur} ${ease}`,
        }}
      >
        {letter}
      </div>

      {/* Ponto dourado */}
      <div
        className="absolute bottom-4 right-4 z-20 rounded-full"
        style={{
          width: "5px",
          height: "5px",
          background: "#C2A14D",
          opacity: dark ? 0.75 : 0.45,
          transition: `opacity ${dur} ${ease}`,
        }}
      />
    </div>
  );
}

export function BrandMark({ interactive = true }: { interactive?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="aspect-square rounded-2xl overflow-hidden flex shadow-xl"
      style={{ cursor: interactive ? "pointer" : "default" }}
      onMouseEnter={interactive ? () => setHovered(true) : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
    >
      {/* L — escuro em repouso, claro no hover */}
      <Panel letter="L" dark={!hovered} />

      {/* Divisor dourado */}
      <div
        style={{
          width: "1.5px",
          flexShrink: 0,
          background: "#C2A14D",
          opacity: 0.35,
        }}
      />

      {/* I — claro em repouso, escuro no hover */}
      <Panel letter="I" dark={hovered} />
    </div>
  );
}
