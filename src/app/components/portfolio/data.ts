import { Project } from "./types";

const PLACEHOLDER = "/placeholders/cover.webp";

export const projects: Project[] = [
  {
    id: "painel-operacional",
    title: "Painel Operacional (Esquemas e Rotas)",
    shortDescription:
      "Sistema para padronizar esquemas operacionais, pontos e validações com visão clara de status",
    description:
      "Aplicação full-stack para cadastro/importação de esquemas, pontos de rota e regras operacionais, com UI de revisão e consistência de dados.",
    category: "featured",
    image: "/projects/painel-operacional/cover.webp",
    screenshots: ["/projects/painel-operacional/01.webp"],
    problem:
      "Processos operacionais dependiam de planilhas e checagens manuais, gerando inconsistência, retrabalho e dificuldade de auditoria.",
    context:
      "Rotina com muitos dados (linhas, pontos, horários, regras). A operação precisava de um fluxo rápido para cadastrar/validar sem quebrar padrões.",
    solution:
      "Modelei entidades e regras, centralizei dados em banco (Supabase/Postgres) e criei uma interface de validação com feedback e status.",
    features: [
      "Cadastro e edição de esquemas e pontos com consistência",
      "Regras operacionais com alertas e severidade (ex.: sugestões vs violações)",
      "UI de revisão antes de salvar/importar (reduz erro humano)",
      "Cálculo de campos derivados e padronização de dados",
    ],
    benefits: [
      "Menos retrabalho na consolidação de dados",
      "Mais confiabilidade e rastreabilidade do que foi cadastrado",
      "Fluxo de operação mais rápido e padronizado",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
    ],
    status: "Em evolução",
    role: "Full-stack (solo) – UI, backend, dados e automação",
    links: [
      // { label: "Repo", href: "https://github.com/..." },
      // { label: "Demo", href: "https://..." },
    ],
  },

  {
    id: "portfolio-profissional-1page",
    title: "Portfólios Profissionais 1-page (Posicionamento Digital)",
    shortDescription:
      "Criação de portfólios digitais modernos focados em credibilidade, clareza e conversão de contato",
    description:
      "Serviço de criação de portfólios 1-page personalizados para profissionais que precisam de presença digital forte, com design premium, leitura fluida e foco em geração de contato.",

    category: "frontend",
    image: "/projects/portfolio-advogado-marlon/cover.webp",

    problem:
      "Muitos profissionais não possuem presença digital estruturada. Dependem apenas de redes sociais ou PDFs, o que dificulta transmitir autoridade e facilitar o contato.",

    context:
      "Portfólios 1-page são ideais para apresentar serviços, experiência e formas de contato de maneira direta, profissional e responsiva, sem complexidade desnecessária.",

    solution:
      "Desenvolvo portfólios 1-page sob medida, com identidade visual forte, hierarquia clara de informações e CTAs estratégicos para facilitar o contato do cliente.",

    features: [
      "Layout 1-page com navegação por âncoras (leitura fluida)",
      "Identidade visual personalizada (cores, tipografia, estilo)",
      "Seções organizadas para apresentação, serviços e contato",
      "CTA estratégico (WhatsApp, e-mail, LinkedIn)",
      "Responsividade e performance para qualquer dispositivo",
    ],

    benefits: [
      "Apresentação profissional clara e objetiva",
      "Maior credibilidade digital",
      "Facilidade para clientes entrarem em contato",
      "Estrutura simples, elegante e fácil de manter",
    ],

    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],

    status: "Concluído",
    role: "Front-end (solo) – design, layout, componentes e identidade visual",

    links: [
      {
        label: "Repo",
        href: "https://github.com/luc118i/Portifolio-advogado-Marlon",
      },
    ],

    screenshots: [
      "/projects/portfolio-advogado-marlon/01.webp",
      "/projects/portfolio-advogado-marlon/02.webp",
    ],
  },
  {
    id: "minimal-api-architecture",
    title: "Minimal API com Arquitetura Limpa (Projeto de Estudo)",
    shortDescription:
      "Estrutura de API focada em boas práticas, separação de camadas e organização de código",
    description:
      "Projeto de estudo voltado para aplicar conceitos de arquitetura limpa, organização de camadas, DTOs, services e repositórios em uma API minimalista.",
    category: "architecture",
    image: "/projects/minimal-api-architecture/cover.webp",
    screenshots: [
      "/projects/minimal-api-architecture/01.webp",
      "/projects/minimal-api-architecture/02.webp",
    ],
    problem:
      "Dificuldade comum em APIs simples que crescem desorganizadas, com regras espalhadas e baixa manutenibilidade.",
    context:
      "Projeto criado com foco didático para praticar arquitetura backend bem definida, facilitando testes, manutenção e evolução.",
    solution:
      "Estruturação de API com separação clara entre camadas, uso de DTOs, services e organização que favorece legibilidade e escalabilidade.",
    features: [
      "Separação clara entre camadas (handlers, services, models)",
      "Organização voltada à manutenção e legibilidade",
      "Estrutura preparada para crescimento sem acoplamento",
      "Aplicação prática de conceitos de arquitetura limpa",
    ],
    benefits: [
      "Código fácil de entender e manter",
      "Base ideal para novos projetos backend",
      "Demonstra domínio de organização arquitetural",
    ],
    stack: ["Node.js", "TypeScript", "Express"],
    links: [{ label: "Repo", href: "https://github.com/luc118i/minimal-api" }],
    status: "Concluído",
    role: "Projeto de estudo focado em arquitetura backend",
  },

  {
    id: "google-sheets-automation",
    title: "Suite de Automações em Google Sheets (Apps Script)",
    shortDescription:
      "Menu, sidebars e scripts para acelerar rotinas e padronizar dados em planilhas grandes",
    description:
      "Conjunto de automações em Apps Script focadas em produtividade operacional: menu customizado, formulários, buscas por cidade/ponto, cache de resultados e links diretos para linhas/abas.",
    category: "automation",
    image: "/projects/google-sheets-automation/cover.webp",
    screenshots: [
      "/projects/google-sheets-automation/01.webp",
      "/projects/google-sheets-automation/02.webp",
    ],

    problem:
      "Planilhas grandes exigiam conferência, busca e consolidação manual — gerando retrabalho, inconsistência visual e erro humano.",
    context:
      "Rotina operacional com várias abas/linhas. Era necessário executar ações rápidas (buscar, registrar, abrir dashboards) sem travar a planilha e com retorno direto para o ponto certo.",
    solution:
      "Implementei uma suíte em Apps Script com menu principal, sidebars, scanners por abas e cache em uma aba de resultado, usando normalização e lock para evitar inconsistências.",
    features: [
      "Menu customizado (Painel 📋) com ações operacionais (histórico, dashboard, ocorrências)",
      "Sidebars/Forms (HTMLService) para busca por Cidade ou Ponto",
      "Scanner que varre abas e retorna links diretos (gid + range) na linha encontrada",
      "Cache em aba 'RESULTADO' com agrupamento e cores por título (detecção por background)",
      "Normalização e busca fuzzy (acentos/UF) para encontrar variações de texto",
      "Controle de concorrência com LockService + fallback seguro",
    ],
    benefits: [
      "Economia de tempo nas rotinas repetitivas",
      "Menos erro manual e mais padronização",
      "Acesso rápido ao ponto certo da planilha (link direto)",
      "UX melhor: ações via menu e sidebar (sem caçar aba/linha)",
    ],
    stack: [
      "Google Apps Script",
      "JavaScript",
      "Google Sheets",
      "HTMLService",
      "Looker Studio",
    ],
    links: [
      // se você tiver um repo público ou vídeo, coloca aqui
      // { label: "Video", href: "https://..." }
    ],
    status: "Em produção",
    role: "Automação operacional – Apps Script, UI (sidebar/menu), performance e consistência",

    codeSamples: [
      {
        title: "Exemplo 1: Menu + atalhos operacionais",
        description:
          "Menu principal no Google Sheets para abrir histórico, dashboard e registrar ocorrências (Apps Script).",
        language: "javascript",
        code: `/** MENU PRINCIPAL */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Painel 📋')
    .addSubMenu(
      ui.createMenu('Ocorrências 🚐')
        .addItem('Registrar ocorrência', 'openSidebarOcorrencias')
        .addItem('Abrir histórico', 'abrirHistorico')
    )
    .addSeparator()
    .addItem('📊 Abrir Dashboard', 'abrirDashboard')
    .addToUi();
}

function abrirDashboard() {
  const url = 'https://lookerstudio.google.com/s/u5nH3lsAuXg';
  const html = HtmlService.createHtmlOutput(\`
    <script>
      window.open('\${url}', '_blank');
      google.script.host.close();
    </script>
  \`).setWidth(1).setHeight(1);

  SpreadsheetApp.getUi().showModelessDialog(html, ' ');
}`,
      },
      {
        title: "Exemplo 2: Normalização + busca fuzzy",
        description:
          "Normaliza acentos/caixa/espaços e permite match tolerante (cidade/ponto) com variações.",
        language: "javascript",
        code: `function nf(s) {
  return String(s || "")
    .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase().replace(/\\s+/g, " ").trim();
}

function fuzzyMatch(a, b) {
  const x = nf(a), y = nf(b);
  return x === y || x.startsWith(y) || y.startsWith(x) || x.includes(y) || y.includes(x);
}`,
      },
    ],
  },
];
