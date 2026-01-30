// ctaVariants.ts
export type CtaVariant = {
  id: string;
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const CTA_VARIANTS: CtaVariant[] = [
  {
    id: "contato-1",
    title: "Quer ver isso aplicado no seu cenário?",
    subtitle:
      "Posso te mostrar como eu desenharia a solução e quais ganhos você teria em tempo, padronização e rastreabilidade.",
    primary: { label: "Falar comigo", href: "#contato" },
    secondary: { label: "Ver próximo projeto", href: "#case-NEXT" }, // você troca em runtime
  },
  {
    id: "contato-2",
    title: "Se isso te poupasse 2h por semana, valeria?",
    subtitle:
      "Eu te ajudo a mapear o processo, desenhar o fluxo e implementar uma versão simples e confiável.",
    primary: { label: "Entrar em contato", href: "#contato" },
    secondary: { label: "Ver próximo projeto", href: "#case-NEXT" },
  },
  {
    id: "portfolio-1",
    title: "Quer ver mais soluções desse tipo?",
    subtitle:
      "Tenho outros projetos com foco em automação, padronização e UX para operação.",
    primary: { label: "Ver todos os projetos", href: "#projetos" },
    secondary: { label: "Ver próximo projeto", href: "#case-NEXT" },
  },
  {
    id: "contato-3",
    title: "Posso adaptar isso para sua operação.",
    subtitle:
      "Uma conversa rápida já resolve: te mostro o caminho e o que dá pra entregar primeiro.",
    primary: { label: "Falar comigo", href: "#contato" },
    secondary: { label: "Ver todos os projetos", href: "#projetos" },
  },
];
