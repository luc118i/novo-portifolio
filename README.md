# Portfólio Lucas Inácio - Soluções Digitais

Portfólio profissional em **React + TypeScript + Vite** para apresentar sistemas digitais, automações e estudos de caso de projetos reais.

O projeto funciona como uma vitrine técnica orientada a dados: projetos podem vir de JSON local, de metadados sincronizados do GitHub ou de estudos de caso gerados pelo AI Studio.

## O que este portfólio entrega

- Home com apresentação, projetos em destaque, outras soluções, sobre e contato.
- Páginas individuais para estudos de caso em `/projetos/:id`.
- Renderização dinâmica de projetos a partir de dados estruturados.
- Integração com GitHub para buscar metadados e README dos repositórios catalogados.
- AI Studio opcional para gerar, editar, ocultar e publicar estudos de caso.
- Animações com Motion e componentes UI baseados em Radix/shadcn.
- Estrutura pronta para build estático e deploy em plataformas como Vercel ou Netlify.

## Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- React Router
- Motion
- Radix UI
- Lucide React
- PrismJS
- Groq API, usada apenas no AI Studio
- GitHub API, usada pelo script de sincronização

## Estrutura principal

```text
src/
  app/
    App.tsx
    components/
      portfolio/
        Hero.tsx
        FeaturedProjects.tsx
        OtherSolutions.tsx
        CaseStudy.tsx
        About.tsx
        Contact.tsx
        data.ts
        overrides.ts
        types.ts
        ai-studio/
      ui/
  data/
    github-projects.json
    ai-projects.json
    studio-overrides.json
  styles/
public/
  projects/
scripts/
  fetch-github-projects.mjs
```

## Como os projetos são carregados

O arquivo `src/app/components/portfolio/data.ts` monta a lista final nesta ordem:

1. Projetos vindos de `src/data/github-projects.json`.
2. Projetos locais definidos por IDs em `LOCAL_ONLY_IDS` e complementados em `overrides.ts`.
3. Projetos gerados/publicados pelo AI Studio em `src/data/ai-projects.json`.
4. Edições e itens ocultos definidos em `src/data/studio-overrides.json`.

Os projetos são ordenados por categoria:

- `featured`
- `automation`
- `architecture`
- `frontend`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

Scripts disponíveis:

- `npm run dev`: atualiza os projetos do GitHub se o cache estiver velho e inicia o Vite.
- `npm run build`: gera a build de produção em `dist/`.
- `npm run preview`: abre uma prévia local da build.
- `npm run fetch:github`: sincroniza repositórios catalogados em `scripts/fetch-github-projects.mjs`.
- `npm run fetch:github:force`: força nova sincronização, ignorando o cache de 1 hora.

## Variáveis de ambiente

Crie um `.env` a partir de `.env.example`:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_GITHUB_USER=luc118i
```

Também é possível definir `GITHUB_TOKEN` no ambiente do terminal antes de rodar `fetch:github`, evitando o limite anônimo da GitHub API:

```powershell
$env:GITHUB_TOKEN="ghp_xxx"
npm run fetch:github:force
```

## AI Studio

O AI Studio fica escondido por padrão. Para ativar em desenvolvimento, acesse:

```text
http://localhost:5173/?studio
```

Ele permite:

- buscar contexto de repositórios no GitHub;
- gerar estudos de caso com Groq;
- salvar casos no `localStorage`;
- editar ou ocultar projetos;
- publicar alterações em `src/data/ai-projects.json` e `src/data/studio-overrides.json`.

Durante o desenvolvimento, o plugin `studio-publish` configurado em `vite.config.ts` também tenta executar `git add`, `git commit` e `git push` ao publicar pelo Studio.

## Catálogo do GitHub

Os repositórios sincronizados ficam no array `CATALOG` de `scripts/fetch-github-projects.mjs`.

Para adicionar um novo repositório público:

1. Inclua uma entrada no `CATALOG` com `repo`, `id`, `category`, `status` e `role`.
2. Rode `npm run fetch:github:force`.
3. Se necessário, complemente textos, imagens e links em `src/app/components/portfolio/overrides.ts`.

## Imagens dos projetos

As imagens públicas ficam em:

```text
public/projects/<id-do-projeto>/
```

Use caminhos absolutos a partir de `public`, por exemplo:

```ts
image: "/projects/painel-operacional/cover.webp"
```

## Deploy

Para gerar a versão de produção:

```bash
npm run build
```

O resultado sai em `dist/`. Em hosts estáticos, configure fallback para `index.html`, pois as páginas de projeto usam React Router.

## Autor

Lucas Luiz Inácio da Silva

Desenvolvedor focado em transformar operações reais em sistemas digitais eficientes.
