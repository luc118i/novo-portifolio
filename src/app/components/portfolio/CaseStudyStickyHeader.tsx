import { ArrowLeft } from "lucide-react";

export function CaseStudyStickyHeader({ onDark }: { onDark: boolean }) {
  return (
    <div
      className={[
        "sticky top-0 z-[9999] transition-colors",
        // fundo + borda
        onDark
          ? "bg-[#0A0F24]/70 border-b border-white/10"
          : "bg-white/90 border-b border-slate-200",
        // evita bug do blur
        "supports-[backdrop-filter:blur(0)]:backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <a
          href="#projetos"
          className={[
            "flex items-center gap-2 hover:gap-3 transition-all",
            onDark ? "text-white" : "text-slate-900",
          ].join(" ")}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Voltar aos projetos</span>
        </a>
      </div>
    </div>
  );
}
