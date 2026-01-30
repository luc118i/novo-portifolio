import { useEffect, useMemo, useState } from "react";

type CtaVariant = {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const STORAGE_KEY = "portfolio.caseCtaIndex.v1";

const VARIANTS: CtaVariant[] = [
  {
    title: "Quer ver isso aplicado no seu cenário?",
    subtitle:
      "Posso te mostrar como eu desenharia a solução e quais ganhos você teria em tempo, padronização e rastreabilidade.",
    primary: { label: "Falar comigo", href: "#contato" },
    secondary: { label: "Ver próximo projeto", href: "#case-NEXT" },
  },
  {
    title: "Quer acelerar sua operação com automação?",
    subtitle:
      "Eu consigo transformar rotinas manuais em fluxos rápidos e rastreáveis com planilhas, scripts e sistemas sob medida.",
    primary: { label: "Entrar em contato", href: "#contato" },
    secondary: { label: "Ver próximo projeto", href: "#case-NEXT" },
  },
  {
    title: "Quer ver mais soluções parecidas?",
    subtitle:
      "Tenho outros projetos com foco em organização, automação e clareza operacional.",
    primary: { label: "Ver todos os projetos", href: "#projetos" },
    secondary: { label: "Ver próximo projeto", href: "#case-NEXT" },
  },
];

function safeReadIndex() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function safeWriteIndex(n: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(n));
  } catch {
    // ignore
  }
}

export function useRotatingCta(entered: number) {
  const [baseIndex, setBaseIndex] = useState(0);

  // lê do localStorage 1x no mount
  useEffect(() => {
    setBaseIndex(safeReadIndex());
  }, []);

  // sempre que "entered" aumentar, avança e persiste
  useEffect(() => {
    if (entered <= 0) return;

    setBaseIndex((prev) => {
      const next = prev + 1;
      safeWriteIndex(next);
      return next;
    });
  }, [entered]);

  const variant = useMemo(() => {
    const idx =
      ((baseIndex % VARIANTS.length) + VARIANTS.length) % VARIANTS.length;
    return VARIANTS[idx];
  }, [baseIndex]);

  return { variant };
}
