import { Project } from "./types";
import { PROJECT_OVERRIDES } from "./overrides";
import githubData from "@/data/github-projects.json";
import aiProjectsRaw from "@/data/ai-projects.json";
import studioOverridesRaw from "@/data/studio-overrides.json";

// Projetos sem repo público — dados completos definidos em overrides.ts
const LOCAL_ONLY_IDS = [
  "painel-operacional",
  "google-sheets-automation",
  "esquemas",
  "pc-nao-autorizado",
];

const localProjects: Project[] = LOCAL_ONLY_IDS.map((id) => {
  const override = PROJECT_OVERRIDES[id];
  if (!override) return null;
  return {
    id,
    title: "",
    shortDescription: "",
    description: "",
    problem: "",
    context: "",
    solution: "",
    features: [],
    benefits: [],
    stack: [],
    category: "featured",
    image: "/placeholders/cover.webp",
    links: [],
    ...override,
  } as Project;
}).filter(Boolean) as Project[];

// Projetos do GitHub com overrides locais mesclados por cima
const githubMerged: Project[] = (githubData.projects as Project[]).map((p) => {
  const override = PROJECT_OVERRIDES[p.id] ?? {};
  return { ...p, ...override };
});

const ORDER: Record<string, number> = {
  featured: 0,
  automation: 1,
  architecture: 2,
  frontend: 3,
};

const staticIds = new Set([...githubMerged.map((p) => p.id), ...localProjects.map((p) => p.id)]);
const aiProjects: Project[] = (aiProjectsRaw.projects as Project[]).filter(
  (p) => !staticIds.has(p.id)
);

const studioHidden = new Set<string>((studioOverridesRaw as { hidden: string[]; edits: Record<string, Partial<Project>> }).hidden);
const studioEdits = (studioOverridesRaw as { hidden: string[]; edits: Record<string, Partial<Project>> }).edits;

export const projects: Project[] = [...githubMerged, ...localProjects, ...aiProjects]
  .filter((p) => !studioHidden.has(p.id))
  .map((p) => {
    const edit = studioEdits[p.id];
    return edit ? { ...p, ...edit } : p;
  })
  .sort((a, b) => (ORDER[a.category] ?? 9) - (ORDER[b.category] ?? 9));
