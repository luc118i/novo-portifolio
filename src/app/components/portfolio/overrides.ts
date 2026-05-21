/**
 * Overrides locais por projeto.
 * Estes campos complementam (ou sobrescrevem) o que vem do GitHub README.
 * Útil para: imagens locais, screenshots, codeSamples, links extras, métricas.
 */
import { CodeSample, ProjectLink, ProjectOverride } from "./types";

const codeSamplesGoogleSheets: CodeSample[] = [
  {
    title: "Menu + atalhos operacionais",
    description:
      "Menu principal no Google Sheets para abrir histórico, dashboard e registrar ocorrências (Apps Script).",
    language: "javascript",
    screenshot: "/projects/google-sheets-automation/menu.webp",
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
}`,
  },
  {
    title: "Normalização + busca fuzzy",
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
];

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  // -------------------------------------------------------------------
  // Projetos vindos do GitHub
  // -------------------------------------------------------------------
  "gerador-relatorios-operacionais": {
    image: "/projects/gerador-relatorios/cover.webp",
    screenshots: [
      "/projects/gerador-relatorios/01.webp",
      "/projects/gerador-relatorios/02.webp",
    ],
  },

  "minimal-api-architecture": {
    image: "/projects/minimal-api-architecture/cover.webp",
    screenshots: [
      "/projects/minimal-api-architecture/01.webp",
      "/projects/minimal-api-architecture/02.webp",
    ],
  },

  "portfolio-profissional-1page": {
    image: "/projects/portfolio-advogado-marlon/cover.webp",
    screenshots: [
      "/projects/portfolio-advogado-marlon/01.webp",
      "/projects/portfolio-advogado-marlon/02.webp",
    ],
    title: "Portfólios Profissionais 1-page (Posicionamento Digital)",
    shortDescription:
      "Criação de portfólios digitais modernos focados em credibilidade, clareza e conversão de contato",
    description:
      "Serviço de criação de portfólios 1-page personalizados para profissionais que precisam de presença digital forte, com design premium, leitura fluida e foco em geração de contato.",
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
  },

  // -------------------------------------------------------------------
  // Projetos locais (sem repo público)
  // -------------------------------------------------------------------
  "painel-operacional": {
    image: "/projects/painel-operacional/cover.webp",
    screenshots: ["/projects/painel-operacional/01.webp"],
    title: "Painel Operacional (Esquemas e Rotas)",
    shortDescription:
      "Sistema para padronizar esquemas operacionais, pontos e validações com visão clara de status",
    description:
      "Aplicação full-stack para cadastro/importação de esquemas, pontos de rota e regras operacionais, com UI de revisão e consistência de dados.",
    category: "featured",
    status: "Em evolução",
    role: "Full-stack (solo) – UI, backend, dados e automação",
    problem:
      "Processos operacionais dependiam de planilhas e checagens manuais, gerando inconsistência, retrabalho e dificuldade de auditoria.",
    context:
      "Rotina com muitos dados (linhas, pontos, horários, regras). A operação precisava de um fluxo rápido para cadastrar/validar sem quebrar padrões.",
    solution:
      "Modelei entidades e regras, centralizei dados em banco (Supabase/Postgres) e criei uma interface de validação com feedback e status.",
    features: [
      "Cadastro e edição de esquemas e pontos com consistência",
      "Regras operacionais com alertas e severidade",
      "UI de revisão antes de salvar/importar (reduz erro humano)",
      "Cálculo de campos derivados e padronização de dados",
    ],
    benefits: [
      "Menos retrabalho na consolidação de dados",
      "Mais confiabilidade e rastreabilidade do que foi cadastrado",
      "Fluxo de operação mais rápido e padronizado",
    ],
    stack: ["React", "Vite", "Tailwind", "Node.js", "Express", "Supabase", "PostgreSQL"],
    links: [],
  },

  "google-sheets-automation": {
    image: "/projects/google-sheets-automation/cover.webp",
    screenshots: [
      "/projects/google-sheets-automation/01.webp",
      "/projects/google-sheets-automation/02.webp",
    ],
    title: "Suite de Automações em Google Sheets (Apps Script)",
    shortDescription:
      "Menu, sidebars e scripts para acelerar rotinas e padronizar dados em planilhas grandes",
    description:
      "Conjunto de automações em Apps Script focadas em produtividade operacional: menu customizado, formulários, buscas por cidade/ponto, cache de resultados e links diretos para linhas/abas.",
    category: "automation",
    status: "Em produção",
    role: "Automação operacional – Apps Script, UI (sidebar/menu), performance e consistência",
    problem:
      "Planilhas grandes exigiam conferência, busca e consolidação manual — gerando retrabalho, inconsistência visual e erro humano.",
    context:
      "Rotina operacional com várias abas/linhas. Era necessário executar ações rápidas (buscar, registrar, abrir dashboards) sem travar a planilha.",
    solution:
      "Implementei uma suíte em Apps Script com menu principal, sidebars, scanners por abas e cache em uma aba de resultado.",
    features: [
      "Menu customizado (Painel 📋) com ações operacionais",
      "Sidebars/Forms (HTMLService) para busca por Cidade ou Ponto",
      "Scanner que varre abas e retorna links diretos (gid + range)",
      "Cache em aba 'RESULTADO' com agrupamento e cores por título",
      "Normalização e busca fuzzy (acentos/UF)",
      "Controle de concorrência com LockService + fallback seguro",
    ],
    benefits: [
      "Economia de tempo nas rotinas repetitivas",
      "Menos erro manual e mais padronização",
      "Acesso rápido ao ponto certo da planilha (link direto)",
    ],
    stack: ["Google Apps Script", "JavaScript", "Google Sheets", "HTMLService", "Looker Studio"],
    links: [],
    codeSamples: codeSamplesGoogleSheets,
  },

  esquemas: {
    image: "/placeholders/cover.webp",
    title: "BI Operacional — Esquemas e Ocorrências (Google Apps Script)",
    shortDescription:
      "Dashboard de BI construído sobre Google Sheets para monitorar ocorrências operacionais em tempo real.",
    description:
      "Sistema de Business Intelligence serverless em Google Apps Script. Consome dados de Google Sheets, exibe KPIs e gráficos em tempo real e permite busca inteligente no Google Drive.",
    category: "automation",
    status: "Em produção",
    role: "Automação operacional – Apps Script, BI, UI (dashboard/apresentação) e integração Google Drive",
    problem:
      "A equipe operacional precisava de visibilidade sobre ocorrências sem depender de ferramentas externas.",
    context:
      "O fluxo já acontecia em planilhas. A solução precisava ser embutida no mesmo ecossistema, com zero custo de infraestrutura.",
    solution:
      "Web app em Google Apps Script (HTMLService) que lê dados da planilha, consolida registros, exibe dashboards com Chart.js e oferece busca fuzzy.",
    features: [
      "Dashboard com KPIs e gráficos de ocorrências (Chart.js)",
      "Filtros por intervalo de datas com atualização dinâmica",
      "Busca inteligente de documentos no Google Drive com lazy-load",
      "Registro de novas ocorrências direto pelo dashboard",
      "Modo apresentação (tela cheia) para reuniões operacionais",
    ],
    benefits: [
      "Zero infraestrutura adicional — roda 100% no ecossistema Google",
      "Acesso imediato para toda a equipe sem instalação",
      "Visibilidade em tempo real sobre o histórico de ocorrências",
    ],
    stack: [
      "Google Apps Script",
      "JavaScript",
      "Chart.js 4",
      "Google Sheets API",
      "Google Drive API",
      "HTMLService",
    ],
    links: [],
  },

  "pc-nao-autorizado": {
    image: "/placeholders/cover.webp",
    title: "BI de PCs Não Autorizados — Monitoramento de Conformidade",
    shortDescription:
      "Dashboard com mapa interativo para monitorar paradas em locais não autorizados da frota.",
    description:
      "Sistema de BI para controle de conformidade de frota com visualização geoespacial via Leaflet.js. Agrega ocorrências históricas e integra-se ao Supabase para retroalimentação de dados.",
    category: "automation",
    status: "Em produção",
    role: "Automação operacional – Apps Script, BI geoespacial, UI (mapa/dashboard) e integração Supabase",
    problem:
      "A operação não tinha visibilidade centralizada sobre onde os veículos paravam em locais proibidos.",
    context:
      "Os registros existiam em planilhas, mas sem cruzamento geográfico, sem filtros por base/região.",
    solution:
      "Web app em Google Apps Script que agrega dados históricos, plota os PCs no mapa (Leaflet.js) e sincroniza dados via API Supabase.",
    features: [
      "Mapa interativo com marcadores georreferenciados (Leaflet.js)",
      "Filtros por data, região, base operacional e local específico",
      "KPIs e gráficos de ocorrências por base, tipo e UF (Chart.js)",
      "Formulário sidebar para registro de novas ocorrências",
      "Integração com Supabase para dados de viagem (trip_id, linha)",
      "Webhook autenticado para integração com sistemas externos",
    ],
    benefits: [
      "Visibilidade geográfica real das infrações de parada da frota",
      "Identificação rápida de padrões por base, região e período",
      "Cruzamento automático de dados de viagem via Supabase",
    ],
    stack: [
      "Google Apps Script",
      "JavaScript",
      "Chart.js 4",
      "Leaflet.js 1.9",
      "Supabase (REST API)",
      "Google Sheets API",
      "HTMLService",
    ],
    links: [],
  },
};
