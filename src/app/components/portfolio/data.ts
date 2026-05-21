import { Project } from "./types";
import { PROJECT_OVERRIDES } from "./overrides";
import githubData from "@/data/github-projects.json";

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

export const projects: Project[] = [...githubMerged, ...localProjects].sort(
  (a, b) => (ORDER[a.category] ?? 9) - (ORDER[b.category] ?? 9)
);
