import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Project } from "./types";

import { CodeBlock } from "./CodeBlock";

type Sample = NonNullable<Project["codeSamples"]>[number];

export function CodeSamples({ samples }: { samples: Sample[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const items = useMemo(() => samples ?? [], [samples]);
  if (!items.length) return null;

  return (
    <div
      className="mb-20 rounded-2xl border"
      style={{ borderColor: "#E2E8F0" }}
    >
      {/* Botão principal */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
          if (isOpen) setOpenIdx(null);
        }}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors rounded-2xl"
      >
        <div>
          <h3
            className="text-xl md:text-2xl"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            Ver implementação técnica
          </h3>
        </div>

        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform"
          style={{
            color: "#4A5568",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Collapse principal */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="impl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t"
            style={{ borderColor: "#E2E8F0" }}
          >
            <div className="p-5">
              <div className="mb-4">
                <h4
                  className="text-lg"
                  style={{ color: "#0A0F24", fontWeight: 600 }}
                >
                  Implementação técnica
                </h4>
                <p className="mt-1 text-sm" style={{ color: "#4A5568" }}>
                  Trechos reais utilizados para automatizar rotinas dentro do
                  Google Sheets.
                </p>
              </div>

              {/* Acordeão por sample */}
              <div className="grid gap-4">
                {items.map((s, idx) => {
                  const open = openIdx === idx;
                  const lang = s.language ?? "code";

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border overflow-hidden bg-white"
                      style={{ borderColor: "#E2E8F0" }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenIdx((cur) => (cur === idx ? null : idx))
                        }
                        aria-expanded={open}
                        className="w-full p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h5
                              className="text-lg"
                              style={{ color: "#0A0F24", fontWeight: 600 }}
                            >
                              {s.title}
                            </h5>
                            {s.description ? (
                              <p
                                className="mt-2 text-sm leading-relaxed"
                                style={{ color: "#4A5568" }}
                              >
                                {s.description}
                              </p>
                            ) : null}
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className="px-3 py-1 rounded-full text-xs"
                              style={{
                                backgroundColor: "rgba(194, 161, 77, 0.15)",
                                color: "#8A6F2A",
                                fontWeight: 600,
                              }}
                            >
                              {lang}
                            </span>

                            <ChevronDown
                              className="w-4 h-4 transition-transform"
                              style={{
                                color: "#4A5568",
                                transform: open
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            />
                          </div>
                        </div>
                      </button>

                      {/* Lazy code */}
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            key={`code-${idx}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <CodeBlock code={s.code} language={lang} />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
