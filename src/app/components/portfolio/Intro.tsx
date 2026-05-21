import { useEffect } from "react";
import { motion } from "motion/react";
import { BrandMark } from "./BrandMark";

interface IntroProps {
  onDone: () => void;
}

export function Intro({ onDone }: IntroProps) {
  useEffect(() => {
    const id = setTimeout(onDone, 3800);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 overflow-hidden"
      style={{ background: "#0A0F24", cursor: "pointer", minHeight: "-webkit-fill-available" }}
      onClick={onDone}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
    >
      {/* Grid — mesmo do Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 w-56 md:w-72"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrandMark interactive={false} />
      </motion.div>

      {/* Soluções */}
      <motion.p
        className="relative z-10 text-center"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.08em",
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        soluções
      </motion.p>

      {/* Hint de clique */}
      <motion.p
        className="absolute bottom-8 z-10"
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.15)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        clique para continuar
      </motion.p>
    </motion.div>
  );
}
