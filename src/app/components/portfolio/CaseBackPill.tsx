import { ArrowLeft } from "lucide-react";

export function CaseBackPill({
  onDark,
  active,
}: {
  onDark: boolean;
  active: boolean;
}) {
  return (
    <div
      className={[
        "fixed top-4 left-0 right-0 z-[9999]",
        "transition-all duration-300 ease-out",
        active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        "pointer-events-none", // container não clicável
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pointer-events-auto">
        <a
          href="#projetos"
          className={[
            "inline-flex items-center gap-2 rounded-full px-4 py-2",
            "border transition-all",
            "hover:gap-3 hover:-translate-y-0.5",
            "backdrop-blur-md",
            onDark
              ? "bg-[#0A0F24]/40 border-white/15 text-white/90"
              : "bg-white/70 border-slate-200 text-slate-900",
          ].join(" ")}
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-sm">Voltar aos projetos</span>
        </a>
      </div>
    </div>
  );
}
