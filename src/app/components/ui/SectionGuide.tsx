import { useEffect, useState } from "react";

type Item = {
  id: string;
  label: string;
};

const SECTIONS: Item[] = [
  { id: "home", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "solucoes", label: "Soluções" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];

export function SectionGuide() {
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const headerOffset = 120; // ajuste se necessário

    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Se estiver no final, ativa a última seção
      if (docHeight - scrollBottom < 8) {
        const lastId = SECTIONS[SECTIONS.length - 1].id;
        setActiveId((prev) => (prev === lastId ? prev : lastId));
        return;
      }

      const positions = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return null;
        return { id: s.id, top: el.getBoundingClientRect().top };
      }).filter(Boolean) as { id: string; top: number }[];

      if (!positions.length) return;

      const current =
        positions
          .filter((p) => p.top <= headerOffset)
          .sort((a, b) => b.top - a.top)[0] ?? positions[0];

      setActiveId((prev) => (prev === current.id ? prev : current.id));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      className="
        hidden lg:flex
        fixed right-6 top-1/2 -translate-y-1/2 z-50
        flex-col gap-3
        rounded-full px-3 py-4
        backdrop-blur-xl
        bg-black/45 border border-white/15
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
      aria-label="Guia de seções"
    >
      {SECTIONS.map((s) => {
        const active = s.id === activeId;

        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center justify-center"
            aria-current={active ? "true" : undefined}
          >
            <span
              className={`
                block rounded-full
                transition-all duration-300 ease-out
                ${
                  active
                    ? "h-3 w-3 bg-white"
                    : "h-2 w-2 bg-white/60 group-hover:bg-white/90"
                }
              `}
            />

            <span
              className="
                pointer-events-none opacity-0 group-hover:opacity-100
                absolute right-6 whitespace-nowrap
                rounded-md px-2 py-1 text-xs
                bg-black/80 text-white
                transition-opacity duration-200
              "
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
