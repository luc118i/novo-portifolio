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
        title: "Menu + atalhos operacionais",
        description:
          "Menu principal no Google Sheets para abrir histórico, dashboard e registrar ocorrências (Apps Script).",
        language: "javascript",
        screenshot: "/projects/google-sheets-automation/menu.webp", // ✅ print do menu/atalhos
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
        title: "Normalização + busca fuzzy",
        description:
          "Normaliza acentos/caixa/espaços e permite match tolerante (cidade/ponto) com variações.",
        language: "javascript",
        screenshot: "/projects/google-sheets-automation/busca.webp", // ✅ seu print de busca
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
      {
        title: "Registro de ocorrência (formulário)",
        description:
          "Formulário dentro do Sheets para registrar ocorrência padronizada sem depender de mensagens soltas.",
        language: "javascript",
        screenshot: "/projects/google-sheets-automation/ocorrencia.webp", // ✅ seu print do formulário
        code: `// (Trecho essencial) Form + integração Apps Script (HTMLService)

/** Helpers */
const $ = (s) => document.querySelector(s);
const setStatus = (el, msg, ok) => {
  el.textContent = msg;
  el.className = ok ? "status ok" : "status err";
};

let locaisCache = [];
let motoristasCache = [];

/** Boot: carrega dados para os selects */
google.script.run.withSuccessHandler((locais) => {
  locaisCache = locais;
  const sel = $("#localSelect");
  sel.innerHTML = '<option value="">Selecione o local...</option>';
  locais.forEach((l) => {
    const opt = document.createElement("option");
    opt.value = \`\${l.id}::\${l.nome}\`;
    opt.textContent = l.nome;
    sel.appendChild(opt);
  });
}).getLocais();

google.script.run.withSuccessHandler((motoristas) => {
  motoristasCache = motoristas;
  const sel = $("#motoristaSelect");
  sel.innerHTML = '<option value="">Selecione o motorista...</option>';
  motoristas.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = \`\${m.id}::\${m.nome}\`;
    opt.textContent = m.nome;
    sel.appendChild(opt);
  });
}).getMotoristas();

/** Sync: ID <-> select (evita erro operacional) */
function buscarLocal() {
  const id = $("#localIdInput").value.trim();
  if (!id) return;
  const local = locaisCache.find((l) => String(l.id) === id);
  $("#localSelect").value = local ? \`\${local.id}::\${local.nome}\` : "";
}

function sincronizarIdLocal() {
  const val = $("#localSelect").value;
  if (!val) return;
  const [id] = val.split("::");
  $("#localIdInput").value = id;
}

function buscarMotorista() {
  const id = $("#motoristaIdInput").value.trim();
  if (!id) return;
  const mot = motoristasCache.find((m) => String(m.id) === id);
  $("#motoristaSelect").value = mot ? \`\${mot.id}::\${mot.nome}\` : "";
}

function sincronizarIdMotorista() {
  const val = $("#motoristaSelect").value;
  if (!val) return;
  const [id] = val.split("::");
  $("#motoristaIdInput").value = id;
}

/** Navegação: tela principal <-> cadastro (UX de sistema) */
function abrirCadastroMotorista() {
  $("#telaPrincipal").classList.add("hidden");
  $("#telaCadastroMotorista").classList.remove("hidden");
}

function voltarParaPrincipal() {
  $("#telaCadastroMotorista").classList.add("hidden");
  $("#telaPrincipal").classList.remove("hidden");
}

/** Cadastro: adiciona motorista e rehidrata select */
function salvarMotorista() {
  const id = $("#novoMotoristaId").value.trim();
  const nome = $("#novoMotoristaNome").value.trim();
  const base = $("#novoMotoristaBase").value.trim();
  const status = $("#statusMotorista");

  if (!id || !nome || !base) {
    setStatus(status, "Preencha ID, Nome e Base do motorista.", false);
    return;
  }

  google.script.run
    .withSuccessHandler(() => {
      setStatus(status, "✅ Motorista adicionado com sucesso!", true);
      // Recarrega o select para refletir a inclusão
      google.script.run.withSuccessHandler((motoristas) => {
        motoristasCache = motoristas;
        const sel = $("#motoristaSelect");
        sel.innerHTML = '<option value="">Selecione o motorista...</option>';
        motoristas.forEach((m) => {
          const opt = document.createElement("option");
          opt.value = \`\${m.id}::\${m.nome}\`;
          opt.textContent = m.nome;
          sel.appendChild(opt);
        });
      }).getMotoristas();

      voltarParaPrincipal();
    })
    .withFailureHandler((err) => {
      setStatus(status, err?.message || "Erro ao salvar.", false);
    })
    .addMotorista({ id, nome, base });
}

/** Registro: valida e salva ocorrência */
function salvarOcorrencia() {
  const localRaw = $("#localSelect").value;
  const carro = $("#carroInput").value.trim();
  const motoristaRaw = $("#motoristaSelect").value;
  const status = $("#status");

  if (!localRaw || !carro || !motoristaRaw) {
    setStatus(status, "Preencha todos os campos obrigatórios.", false);
    return;
  }

  const [localId, localNome] = localRaw.split("::");
  const [motoristaId, motoristaNome] = motoristaRaw.split("::");

  google.script.run
    .withSuccessHandler(() => {
      setStatus(status, "✅ Registro salvo com sucesso!", true);
      $("#carroInput").focus();
    })
    .withFailureHandler((err) => {
      setStatus(status, err?.message || "Erro ao salvar.", false);
    })
    .addOcorrencia({ localId, localNome, carro, motoristaId, motoristaNome });
}`,
      },
    ],
  },
  {
    id: "gerador-relatorios-operacionais",
    title: "Gerador de Relatórios Operacionais (Full-Stack)",
    shortDescription:
      "Ecossistema completo para registro de ocorrências logísticas com IA, geração de PDF automatizada e integração com Google Drive.",
    description:
      "Aplicação full-stack para registro de ocorrências de frota, gestão de motoristas e geração de laudos formais em PDF — com correção ortográfica por IA, sumarização automática, upload direto ao Google Drive e deploy containerizado.",
    category: "featured",
    image: "/projects/gerador-relatorios/cover.webp",
    screenshots: [
      "/projects/gerador-relatorios/01.webp",
      "/projects/gerador-relatorios/02.webp",
    ],
    problem:
      "Relatórios eram feitos manualmente, com erros de data (fuso horário), texto sem padrão, fotos pesadas e entrega demorada ao cliente. Nenhum controle de motoristas por ocorrência.",
    context:
      "A operação precisava registrar paradas não autorizadas, excessos de velocidade e outras infrações de campo e exportar um PDF formal em segundos — com evidências fotográficas embutidas e entrega automática ao Google Drive.",
    solution:
      "Desenvolvi um frontend React com editor rich-text (Tiptap) e uma API Node.js que usa Puppeteer para renderizar PDFs fiéis ao modelo físico, Sharp para comprimir imagens, Groq + LanguageTool para correção inteligente de texto e Google Drive API para entrega automatizada com lógica de upsert.",
    features: [
      "Calendário com tratamento de fuso horário (UTC vs Local)",
      "Editor rich-text (Tiptap) com cor, sublinhado e estilos — laudos com formatação profissional",
      "Geração de PDF via Puppeteer com layout fiel ao modelo físico",
      "Compressão automática de imagens de evidências com Sharp (1200px, 75% JPEG)",
      "Pipeline de IA duplo: LanguageTool detecta erros → Groq LLaMA 3.3-70b corrige preservando HTML",
      "Sumarização executiva automática da ocorrência via Groq (resumo de 3 frases para gestores)",
      "Upload em lote para Google Drive via OAuth2 com upsert (sem duplicatas)",
      "Cache de PDF com TTL e invalidação forçada (Supabase Storage + signed URLs)",
      "CRUD de motoristas com snapshot por ocorrência (rastreabilidade histórica)",
      "Listagem otimizada com TanStack Query e feedback instantâneo",
      "Deploy containerizado com Docker + Chromium e fallback para Browserless.io",
    ],
    benefits: [
      "Eliminação de erros de data e dia da semana nos registros",
      "Redução do tempo de geração de relatórios de minutos para segundos",
      "Padronização total dos documentos entregues ao cliente final",
      "Redação mais rápida com sumarização automática e correção ortográfica por IA",
      "Entrega direta ao Google Drive sem passos manuais",
      "Rastreabilidade completa de motoristas por ocorrência via snapshots",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Puppeteer",
      "Sharp",
      "Tiptap",
      "TanStack Query",
      "Groq API (LLaMA 3.3-70b)",
      "LanguageTool API",
      "Google Drive API",
      "Zod",
      "Tailwind CSS",
      "Docker",
    ],
    status: "Em produção",
    role: "Full-stack (solo) – Arquitetura, API, Frontend, IA e DevOps (Docker)",
    links: [
      {
        label: "Repo",
        href: "https://github.com/luc118i/Gerador-de-Relatorios-Operacionais-api",
      },
    ],
  },

  {
    id: "esquemas",
    title: "BI Operacional — Esquemas e Ocorrências (Google Apps Script)",
    shortDescription:
      "Dashboard de BI construído sobre Google Sheets para monitorar ocorrências operacionais e acessar documentos de forma ágil.",
    description:
      "Sistema de Business Intelligence serverless desenvolvido em Google Apps Script para a operação de transporte da Viação Catedral. Consome dados diretamente de planilhas Google Sheets, exibe KPIs e gráficos em tempo real e permite busca inteligente de documentos no Google Drive — sem infraestrutura adicional.",
    category: "automation",
    image: PLACEHOLDER,
    problem:
      "A equipe operacional precisava de visibilidade sobre ocorrências (tipos, motoristas, bases, plantonistas) sem depender de ferramentas externas, exportações manuais ou acesso a sistemas complexos.",
    context:
      "O fluxo já acontecia em planilhas Google Sheets. A solução precisava ser embutida no mesmo ecossistema, com zero custo de infraestrutura e acesso imediato para todos os usuários da organização.",
    solution:
      "Desenvolvi um web app em Google Apps Script (HTMLService) que lê os dados da planilha de controle, consolida registros, exibe dashboards com Chart.js e oferece busca fuzzy de documentos no Google Drive por prefixo de arquivo.",
    features: [
      "Dashboard com KPIs e gráficos de ocorrências por tipo, base e motorista (Chart.js)",
      "Filtros por intervalo de datas com atualização dinâmica",
      "Busca inteligente de documentos no Google Drive com lazy-load e cache",
      "Normalização fuzzy de nomes (acentos, caixa, espaços) para match tolerante",
      "Registro de novas ocorrências direto pelo dashboard com merge de células",
      "Mapeamento automático de bases para gestores responsáveis",
      "Modo apresentação (tela cheia) para reuniões operacionais",
      "Design dark com identidade visual da operação (Barlow, laranja #f47920)",
    ],
    benefits: [
      "Zero infraestrutura adicional — roda 100% no ecossistema Google",
      "Acesso imediato para toda a equipe sem instalação ou cadastro",
      "Visibilidade em tempo real sobre o histórico de ocorrências",
      "Busca de documentos sem sair da planilha",
    ],
    stack: [
      "Google Apps Script",
      "JavaScript",
      "HTML5 / CSS3",
      "Chart.js 4",
      "Google Sheets API",
      "Google Drive API",
      "HTMLService",
    ],
    status: "Em produção",
    role: "Automação operacional – Apps Script, BI, UI (dashboard/apresentação) e integração Google Drive",
  },

  {
    id: "pc-nao-autorizado",
    title: "BI de PCs Não Autorizados — Monitoramento de Conformidade",
    shortDescription:
      "Dashboard com mapa interativo para monitorar paradas em locais não autorizados da frota, com integração a Supabase e Google Sheets.",
    description:
      "Sistema de BI para controle de conformidade de frota, desenvolvido em Google Apps Script com visualização geoespacial via Leaflet.js. Agrega ocorrências históricas de paradas em locais não autorizados, exibe a distribuição por região e base em gráficos, e plota os pontos no mapa com coordenadas reais. Integra-se ao Supabase para retroalimentação de dados de viagens.",
    category: "automation",
    image: PLACEHOLDER,
    problem:
      "A operação não tinha visibilidade centralizada sobre onde e com que frequência os veículos paravam em locais proibidos (PCs não autorizados), dificultando ações corretivas e auditorias.",
    context:
      "Os registros existiam em planilhas, mas sem cruzamento geográfico, sem filtros por base/região e sem integração com os dados de viagem do sistema operacional (Supabase).",
    solution:
      "Desenvolvi um web app em Google Apps Script que agrega dados históricos de ocorrências, plota os PCs no mapa (Leaflet.js com coordenadas reais), exibe KPIs e gráficos por filtro (região, base, data) e sincroniza dados de linha/viagem via API Supabase.",
    features: [
      "Mapa interativo com marcadores georreferenciados dos PCs não autorizados (Leaflet.js)",
      "Filtros por data, região, base operacional e local específico",
      "KPIs e gráficos de ocorrências por base, tipo e estado/UF (Chart.js)",
      "Formulário sidebar para registro de novas ocorrências com seleção de motorista e local",
      "Integração com Supabase para retroalimentação de dados de viagem (trip_id, linha)",
      "Webhook autenticado (token) para integração com sistemas externos",
      "Normalização de nomes de base (acentos, sufixos como LTDA/FILIAL) para agrupamento consistente",
      "Modo apresentação para reuniões de conformidade operacional",
      "CRUD de motoristas com validação de matrícula e base",
    ],
    benefits: [
      "Visibilidade geográfica real das infrações de parada da frota",
      "Identificação rápida de padrões por base, região e período",
      "Registro padronizado de ocorrências diretamente pelo dashboard",
      "Cruzamento automático de dados de viagem via Supabase — rastreabilidade de linha e horário",
    ],
    stack: [
      "Google Apps Script",
      "JavaScript",
      "HTML5 / CSS3",
      "Chart.js 4",
      "Leaflet.js 1.9",
      "Supabase (REST API)",
      "Google Sheets API",
      "HTMLService",
    ],
    status: "Em produção",
    role: "Automação operacional – Apps Script, BI geoespacial, UI (mapa/dashboard) e integração Supabase",
  },
];
