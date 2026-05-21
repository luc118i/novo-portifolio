export type RepoContext = {
  name: string;
  description: string;
  readme: string;
  languages: Record<string, number>;
  topics: string[];
  stars: number;
  updatedAt: string;
};

export function buildPrompt(repo: RepoContext): string {
  const langList = Object.keys(repo.languages).join(", ");
  const readmeTruncated = repo.readme.slice(0, 4000);

  return `Você é um especialista em criar estudos de caso técnicos para portfólios de desenvolvedores sênior.

Analise o repositório abaixo e gere um estudo de caso profissional em português (pt-BR).

## Repositório
- Nome: ${repo.name}
- Descrição: ${repo.description || "sem descrição"}
- Linguagens: ${langList}
- Topics: ${repo.topics.join(", ") || "nenhum"}
- Stars: ${repo.stars}

## README
${readmeTruncated}

## Instruções
Gere APENAS um JSON válido (sem markdown, sem blocos de código) com esta estrutura exata:

{
  "title": "título profissional e descritivo (não use o nome cru do repo)",
  "shortDescription": "uma frase clara sobre o que faz e para quem",
  "description": "2-3 frases descrevendo o projeto com linguagem técnica e profissional",
  "category": "featured",
  "problem": "qual problema real ou técnico este projeto resolve (2-4 frases)",
  "context": "contexto do projeto: quando, por que, para quem foi criado (2-3 frases)",
  "solution": "como o projeto resolve o problema tecnicamente, arquitetura e decisões chave (3-5 frases)",
  "features": ["funcionalidade específica 1", "funcionalidade específica 2", "...até 8 itens"],
  "benefits": ["benefício concreto 1", "benefício concreto 2", "...até 5 itens"],
  "stack": ["Tecnologia1", "Tecnologia2", "...apenas tecnologias realmente usadas"],
  "status": "Concluído",
  "role": "papel do desenvolvedor neste projeto (ex: Full-stack solo, Backend, Estudo técnico)"
}

Regras obrigatórias:
- Escreva tudo em português pt-BR profissional
- features: 5-8 itens específicos e relevantes (não genéricos)
- benefits: 3-5 itens focados em impacto técnico ou de negócio
- stack: extraia APENAS do código/README, não invente tecnologias
- category deve ser um de: "featured", "automation", "architecture", "frontend"
- Retorne SOMENTE o JSON, nada mais`;
}
