/**
 * Busca metadados e READMEs dos repos listados em CATALOG via GitHub API.
 * Saída: src/data/github-projects.json
 *
 * Uso:
 *   node scripts/fetch-github-projects.mjs
 *
 * Para evitar rate limit (60 req/h), defina GITHUB_TOKEN no ambiente:
 *   $env:GITHUB_TOKEN="ghp_xxx"; node scripts/fetch-github-projects.mjs
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_FILE = resolve(ROOT, "src/data/github-projects.json");

// ---------------------------------------------------------------------------
// CATÁLOGO — adicione ou remova repos aqui
// Campos neste objeto são metadados fixos que NÃO vêm do README.
// Campos como problem/solution/features serão lidos do README de cada repo.
// ---------------------------------------------------------------------------
const CATALOG = [
  {
    repo: "luc118i/Gerador-de-Relatorios-Operacionais-api",
    id: "gerador-relatorios-operacionais",
    category: "featured",
    status: "Em produção",
    role: "Full-stack (solo) – Arquitetura, API, Frontend, IA e DevOps (Docker)",
  },
  {
    repo: "luc118i/minimal-api",
    id: "minimal-api-architecture",
    category: "architecture",
    status: "Concluído",
    role: "Projeto de estudo focado em arquitetura backend",
  },
  {
    repo: "luc118i/Portifolio-advogado-Marlon",
    id: "portfolio-profissional-1page",
    category: "frontend",
    status: "Concluído",
    role: "Front-end (solo) – design, layout, componentes e identidade visual",
  },
];

// ---------------------------------------------------------------------------
// Seções esperadas no README (aceita variações pt-BR / EN)
// O matching normaliza emojis, números e acentos antes de comparar.
// ---------------------------------------------------------------------------
const SECTION_MAP = {
  problem: ["problema", "problem", "o problema", "the problem", "motivacao", "motivação"],
  context: [
    "contexto", "context", "cenario", "scenario",
    "sobre o projeto", "sobre", "about", "objetivo", "objetivo da api",
    "proposito", "propósito do projeto", "propósito",
  ],
  solution: [
    "solucao", "solution", "a solucao", "the solution",
    "como funciona", "how it works", "arquitetura",
    "destaques de implementacao", "destaques",
  ],
  features: [
    "funcionalidades", "features", "o que faz", "recursos", "capabilities",
    "funcionalidades principais", "features principais", "o que tem",
    "principais funcionalidades",
  ],
  benefits: ["beneficios", "benefits", "resultados", "results", "impacto", "impact", "vantagens"],
  stack: [
    "stack", "tecnologias", "technologies", "tech stack",
    "tecnologias utilizadas", "stack de tecnologias",
    "tecnologias usadas", "built with", "feito com", "dependencias",
  ],
  usage: [
    "como usar", "usage", "como executar", "getting started",
    "instalacao", "install", "rodando", "execucao", "como rodar",
    "prerequisites", "pre-requisitos",
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-fetch-script",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch(url) {
  const res = await fetch(url, { headers: githubHeaders() });
  if (res.status === 403) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    const reset = res.headers.get("x-ratelimit-reset");
    const resetDate = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : "?";
    throw new Error(
      `GitHub rate limit atingido (remaining: ${remaining}). Tente novamente após ${resetDate} ou defina GITHUB_TOKEN.`
    );
  }
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`);
  return res.json();
}

function decodeBase64(str) {
  return Buffer.from(str, "base64").toString("utf-8");
}

// Remove markdown links, badges e HTML para texto limpo
function stripMarkdown(text) {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, "") // imagens
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → texto
    .replace(/<[^>]+>/g, "") // HTML
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // inline code
    .replace(/^\s*[-*>]\s*/gm, "") // bullets/quotes
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1") // bold/italic
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/\s*--\s*$/, "") // remove trailing "--"
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Extrai bullet points de um bloco de markdown como array de strings
function extractBullets(text) {
  const lines = text.split("\n");
  const bullets = [];
  for (const line of lines) {
    const match = line.match(/^\s*[-*+]\s+(.+)/) || line.match(/^\s*\d+\.\s+(.+)/);
    if (match) {
      const clean = stripMarkdown(match[1]).trim();
      if (clean) bullets.push(clean);
    }
  }
  return bullets;
}

// Normaliza heading para comparação: remove emojis, números iniciais, acentos, pontuação
function normalizeHeading(text) {
  return text
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, "") // emojis
    .replace(/[✅✓✔☑]/g, "")
    .replace(/^\s*\d+\.\s*/, "") // "1. Título" → "Título"
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // acentos
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // pontuação
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parser hierárquico: mantém relação H2 → [H3 titles].
 * Retorna { sections, h3sOf } onde:
 *   sections[normalizedKey] = content string
 *   h3sOf[h2NormalizedKey] = [h3NormalizedTitle, ...]
 */
function parseReadmeSections(markdown) {
  const lines = markdown.split("\n");
  const sections = {};
  const h3sOf = {}; // h2key → [h3 labels]

  let currentH2 = "_intro";
  let currentKey = "_intro";
  let buffer = [];

  const flush = () => {
    const content = buffer.join("\n").trim();
    if (content) sections[currentKey] = (sections[currentKey] ? sections[currentKey] + "\n" : "") + content;
    buffer = [];
  };

  for (const line of lines) {
    const h1m = line.match(/^#\s+(.+)/);
    const h2m = !h1m && line.match(/^##\s+(.+)/);
    const h3m = !h1m && !h2m && line.match(/^###\s+(.+)/);

    if (h1m || h2m) {
      flush();
      currentH2 = normalizeHeading((h1m || h2m)[1]);
      currentKey = currentH2;
      if (!h3sOf[currentH2]) h3sOf[currentH2] = [];
    } else if (h3m) {
      flush();
      const h3label = normalizeHeading(h3m[1]);
      h3sOf[currentH2] = [...(h3sOf[currentH2] || []), h3label];
      currentKey = currentH2 + ">>>" + h3label;
    } else {
      buffer.push(line);
    }
  }
  flush();

  return { sections, h3sOf };
}

function findSection({ sections }, aliases) {
  for (const [key, content] of Object.entries(sections)) {
    const baseKey = key.includes(">>>") ? key.split(">>>")[0] : key;
    for (const alias of aliases) {
      if (baseKey === alias || baseKey.startsWith(alias) || alias.startsWith(baseKey)) {
        return content || null;
      }
    }
  }
  return null;
}

// Coleta conteúdo de TODAS as sub-seções (H2 + H3s) que correspondem aos aliases
function findAllSectionContent({ sections }, aliases) {
  const parts = [];
  for (const [key, content] of Object.entries(sections)) {
    const baseKey = key.includes(">>>") ? key.split(">>>")[0] : key;
    for (const alias of aliases) {
      if (baseKey === alias || baseKey.startsWith(alias) || alias.startsWith(baseKey)) {
        if (content) parts.push(content);
        break;
      }
    }
  }
  return parts.join("\n");
}

function findH3s({ h3sOf }, aliases) {
  for (const [key, h3list] of Object.entries(h3sOf)) {
    for (const alias of aliases) {
      if (key === alias || key.startsWith(alias) || alias.startsWith(key)) return h3list;
    }
  }
  return [];
}

// Extrai título H1 do README
function extractH1(markdown) {
  const match = markdown.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : null;
}

// Primeira linha/parágrafo não vazio da intro
function extractIntroLine({ sections }) {
  const intro = sections["_intro"] || sections[Object.keys(sections)[0]] || "";
  const lines = intro
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !l.startsWith("![") && // não é imagem
        !l.startsWith("[!") && // não é badge
        !l.startsWith("<") && // não é HTML
        l.length > 20
    );
  return lines[0] ? stripMarkdown(lines[0]).slice(0, 250) : null;
}

// Extrai stack como array: bullets → células de tabela (1ª coluna) → inline
function extractStack(text) {
  if (!text) return [];

  // Bullets
  const bullets = extractBullets(text);
  if (bullets.length) return bullets.map((b) => b.replace(/^`|`$/g, "").trim()).filter(Boolean);

  // Markdown table: pega primeira coluna ignorando cabeçalho e separador
  const tableRows = text.match(/^\|([^|]+)\|/gm) || [];
  if (tableRows.length > 1) {
    return tableRows
      .map((row) => row.replace(/^\||\|$/g, "").trim())
      .filter((cell) => cell && !cell.match(/^[-:]+$/) && !cell.toLowerCase().includes("tecnologia") && !cell.toLowerCase().includes("tech"))
      .map((cell) => stripMarkdown(cell).trim())
      .filter((s) => s.length > 1 && s.length < 50);
  }

  // fallback: separado por vírgula/newline
  return text
    .split(/[,\n]/)
    .map((s) => stripMarkdown(s).trim())
    .filter((s) => s.length > 1 && s.length < 50 && !s.includes("|"));
}

// ---------------------------------------------------------------------------
// Processar um repo
// ---------------------------------------------------------------------------
async function processRepo(entry) {
  const [owner, repoName] = entry.repo.split("/");
  console.log(`  → ${entry.repo}`);

  const [repoData, readmeData] = await Promise.all([
    githubFetch(`https://api.github.com/repos/${owner}/${repoName}`),
    githubFetch(`https://api.github.com/repos/${owner}/${repoName}/readme`).catch(() => null),
  ]);

  const rawReadme = readmeData ? decodeBase64(readmeData.content) : "";
  const parsed = rawReadme ? parseReadmeSections(rawReadme) : { sections: {}, h3sOf: {} };

  // --- Campos derivados do README ---
  const h1 = rawReadme ? extractH1(rawReadme) : null;
  const introLine = rawReadme ? extractIntroLine(parsed) : null;

  const problemText  = findSection(parsed, SECTION_MAP.problem);
  const contextText  = findSection(parsed, SECTION_MAP.context);
  const solutionText = findSection(parsed, SECTION_MAP.solution);
  const featuresText = findSection(parsed, SECTION_MAP.features);
  const benefitsText = findSection(parsed, SECTION_MAP.benefits);
  const stackText    = findSection(parsed, SECTION_MAP.stack);
  const usageText    = findSection(parsed, SECTION_MAP.usage);

  // Features: coleta bullets de TODOS os H3s da seção → H3 titles como fallback
  const allFeaturesContent = findAllSectionContent(parsed, SECTION_MAP.features);
  let features = allFeaturesContent ? extractBullets(allFeaturesContent) : [];
  if (!features.length) {
    const h3list = findH3s(parsed, SECTION_MAP.features);
    features = h3list
      .map((t) => t.replace(/^\d+\s*/, "").replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 3 && t.length < 120);
  }

  const benefits = benefitsText ? extractBullets(benefitsText) : [];

  // Stack: normaliza separadores compostos (apenas · — evita split de parênteses como "Supabase (A + B)")
  const rawStack = stackText ? extractStack(stackText) : (repoData.language ? [repoData.language] : []);
  const stack = rawStack.flatMap((item) =>
    item.includes(" · ") ? item.split(" · ").map((s) => s.trim()) : [item]
  ).filter((s) => s.length > 1);

  // --- Montar objeto de saída ---
  return {
    // metadados fixos do catálogo
    id: entry.id,
    category: entry.category,
    status: entry.status,
    role: entry.role,

    // do GitHub API
    repo: entry.repo,
    repoUrl: repoData.html_url,
    stars: repoData.stargazers_count,
    updatedAt: repoData.updated_at,

    // título: README H1 → repo name formatado
    title: h1 || repoData.name.replace(/-/g, " "),

    // descrição curta: GitHub description → intro do README
    shortDescription: repoData.description || introLine || "",

    // descrição longa: intro do README
    description: introLine || repoData.description || "",

    // campos estruturados do README
    problem: problemText ? stripMarkdown(problemText).slice(0, 600) : "",
    context: contextText ? stripMarkdown(contextText).slice(0, 600) : "",
    solution: solutionText ? stripMarkdown(solutionText).slice(0, 600) : "",
    usage: usageText ? stripMarkdown(usageText).slice(0, 800) : "",
    features,
    benefits,
    stack,

    // README completo (para render no CaseStudy futuramente)
    readme: rawReadme,

    // links automáticos
    links: [{ label: "Repo", href: repoData.html_url }],
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("🔍 Buscando projetos do GitHub...\n");

  // Se o arquivo existente foi gerado há menos de 1 hora sem flag --force, pula
  const force = process.argv.includes("--force");
  if (!force && existsSync(OUT_FILE)) {
    const existing = JSON.parse(readFileSync(OUT_FILE, "utf-8"));
    const age = Date.now() - new Date(existing.generated).getTime();
    if (age < 60 * 60 * 1000) {
      console.log(`✅ JSON recente (${Math.round(age / 60000)} min). Use --force para forçar atualização.\n`);
      return;
    }
  }

  const results = [];
  for (const entry of CATALOG) {
    try {
      const project = await processRepo(entry);
      results.push(project);
    } catch (err) {
      console.error(`  ✗ Erro em ${entry.repo}: ${err.message}`);
      // Se já existe dado anterior, manter
      if (existsSync(OUT_FILE)) {
        const existing = JSON.parse(readFileSync(OUT_FILE, "utf-8"));
        const prev = existing.projects?.find((p) => p.id === entry.id);
        if (prev) {
          console.warn(`  ↩ Mantendo dado anterior para ${entry.id}`);
          results.push(prev);
        }
      }
    }
  }

  // Garantir que o diretório existe
  mkdirSync(resolve(ROOT, "src/data"), { recursive: true });

  const output = {
    generated: new Date().toISOString(),
    projects: results,
  };

  writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\n✅ ${results.length} projetos salvos em src/data/github-projects.json`);
}

main().catch((err) => {
  console.error("Erro fatal:", err.message);
  process.exit(1);
});
