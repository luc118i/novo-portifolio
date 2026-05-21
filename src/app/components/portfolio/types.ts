export type ProjectCategory =
  | "featured"    // projetos principais / produto real
  | "automation"  // scripts, sheets, rotinas
  | "architecture" // estudo técnico, base, boas práticas
  | "frontend";   // landing pages, portfólios, UI

export type ProjectLink = {
  label: "Repo" | "Demo" | "Case" | "Video";
  href: string;
};

export type CodeSample = {
  title: string;
  description?: string;
  language?: "javascript" | "ts" | "bash" | "json";
  code: string;
  screenshot?: string;
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;

  image: string;
  screenshots?: string[];

  problem: string;
  context: string;
  solution: string;

  features: string[];
  benefits: string[];
  stack: string[];

  links?: ProjectLink[];
  status?: "Em produção" | "Em evolução" | "POC" | "Concluído";
  role?: string;
  metrics?: Array<{ label: string; value: string; note?: string }>;
  codeSamples?: CodeSample[];

  // Metadados do GitHub (preenchidos quando o projeto vem de um repo)
  repo?: string;
  repoUrl?: string;
  stars?: number;
  updatedAt?: string;
  readme?: string; // README.md completo em markdown
};

// Campos que podem ser sobrescritos/complementados localmente no overrides.ts
export type ProjectOverride = Partial<Omit<Project, "id">>;
