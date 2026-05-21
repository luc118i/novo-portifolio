import { buildPrompt, RepoContext } from "./prompt";
import { Project } from "../types";

const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

function getApiKey(): string {
  const key = import.meta.env.VITE_GROQ_API_KEY as string;
  if (!key) throw new Error("VITE_GROQ_API_KEY não configurado no .env");
  return key;
}

// ---------------------------------------------------------------------------
// Busca dados do repositório via GitHub API
// ---------------------------------------------------------------------------
export async function fetchRepoContext(
  owner: string,
  repoName: string
): Promise<RepoContext> {
  const headers = { Accept: "application/vnd.github.v3+json" };

  const [repoRes, readmeRes, langsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repoName}`, { headers }),
    fetch(`https://api.github.com/repos/${owner}/${repoName}/readme`, { headers }).catch(() => null),
    fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, { headers }),
  ]);

  const [repo, langs] = await Promise.all([
    repoRes.json(),
    langsRes.json(),
  ]);

  let readme = "";
  if (readmeRes?.ok) {
    const readmeData = await readmeRes.json();
    readme = atob(readmeData.content.replace(/\n/g, ""));
  }

  return {
    name: repo.name,
    description: repo.description ?? "",
    readme,
    languages: langs,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}

// ---------------------------------------------------------------------------
// Streaming: chama Groq e itera sobre os chunks
// Chama onChunk(delta) a cada pedaço de texto recebido
// Retorna o texto completo ao final
// ---------------------------------------------------------------------------
export async function generateCaseStudy(
  repo: RepoContext,
  onChunk: (partial: string) => void
): Promise<Project> {
  const apiKey = getApiKey();
  const prompt = buildPrompt(repo);

  const res = await fetch(GROQ_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: true,
      max_tokens: 2000,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

    for (const line of lines) {
      const data = line.slice(6); // remove "data: "
      if (data === "[DONE]") continue;
      try {
        const parsed = JSON.parse(data);
        const delta: string = parsed.choices?.[0]?.delta?.content ?? "";
        if (delta) {
          fullText += delta;
          onChunk(fullText);
        }
      } catch {
        // chunk inválido — ignora
      }
    }
  }

  // Extrai JSON do texto (remove possível markdown residual)
  const jsonMatch = fullText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("IA não retornou JSON válido");

  const data = JSON.parse(jsonMatch[0]) as Partial<Project>;

  // Garante que o objeto é compatível com Project
  const id = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    id,
    repo: repo.name,
    repoUrl: `https://github.com/${import.meta.env.VITE_GITHUB_USER ?? "luc118i"}/${repo.name}`,
    updatedAt: repo.updatedAt,
    links: [{ label: "Repo", href: `https://github.com/${import.meta.env.VITE_GITHUB_USER ?? "luc118i"}/${repo.name}` }],
    image: "/placeholders/cover.webp",
    screenshots: [],
    features: [],
    benefits: [],
    stack: [],
    problem: "",
    context: "",
    solution: "",
    ...data,
    title: data.title ?? repo.name,
    shortDescription: data.shortDescription ?? repo.description,
    description: data.description ?? repo.description,
    category: (["featured", "automation", "architecture", "frontend"].includes(data.category ?? "") ? data.category : "featured") as Project["category"],
  };
}
