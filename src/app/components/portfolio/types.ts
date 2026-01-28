// types.ts
export type ProjectCategory =
  | "featured" // projetos principais / produto real
  | "automation" // scripts, sheets, rotinas
  | "architecture" // estudo técnico, base, boas práticas
  | "frontend"; // landing pages, portfólios, UI

export type ProjectLink = {
  label: "Repo" | "Demo" | "Case" | "Video";
  href: string;
};

export type CodeSample = {
  title: string;
  description?: string;
  language?: "javascript" | "ts" | "bash" | "json";
  code: string;
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;

  image: string; // path local: "/projects/<id>/cover.webp" ou placeholder
  screenshots?: string[]; // paths locais

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
};
