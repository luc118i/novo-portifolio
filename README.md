

# Portfólio Profissional — Sistemas Digitais para Operações Reais

Este projeto é um **portfólio 1-page** desenvolvido em **React + Vite + Tailwind**, com navegação por âncoras e estudos de caso integrados na mesma página.

O objetivo não é apenas apresentar projetos, mas **demonstrar, com clareza, como tecnologia pode resolver problemas operacionais reais** através de sistemas, automações e boas práticas arquiteturais.

---

## Proposta do Portfólio

Este portfólio foi pensado como um **produto** e não apenas uma página pessoal.

Ele foi estruturado para:

* Destacar projetos principais com estudo de caso completo
* Apresentar automações, arquiteturas e soluções secundárias
* Mostrar domínio técnico com exemplos reais de código (Apps Script)
* Servir também como **modelo de portfólio profissional para clientes**

---

## Stack utilizada

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide Icons

---

## Estrutura do Projeto

```
src/
  app/
    components/
      portfolio/
        Hero.tsx
        FeaturedProjects.tsx
        OtherSolutions.tsx
        CaseStudy.tsx
        About.tsx
        Contact.tsx
        data.ts
        types.ts
```

A aplicação é totalmente orientada a **dados**.
Os projetos são definidos em `data.ts` e renderizados dinamicamente nas seções.

---

## Seções do Portfólio

### Hero

Posicionamento direto e profissional.

### Projetos em destaque

Projetos principais com foco em **sistemas reais**.

### Outras soluções

Automações, arquiteturas e frontends.

### Estudos de caso (âncoras)

Cada projeto possui uma seção detalhada na mesma página.

### Sobre

Posicionamento profissional + competências centrais.

### Contato

WhatsApp, Email, LinkedIn e GitHub com links diretos.

---

## Projetos atuais

* **Painel Operacional (Esquemas e Rotas)** — Sistema full-stack para padronização operacional
* **Suite de Automações Google Sheets (Apps Script)** — Scripts reais em produção
* **Minimal API com Arquitetura Limpa** — Projeto de estudo arquitetural
* **Portfólio 1-page (Advocacia)** — Exemplo real de portfólio profissional para cliente

---

## Conceito arquitetural

Este portfólio foi construído para ser:

* Escalável
* Orientado a dados
* Fácil de manter
* Fácil de adaptar para novos projetos
* Base reutilizável para criação de portfólios profissionais para clientes

---

## Etapa atual do projeto

Nesta etapa o projeto já possui:

* Estrutura completa de seções
* Navegação por âncoras com scrollspy
* Estudos de caso funcionais
* Organização profissional das imagens em `/public/projects`
* Sistema de categorias de projetos (`featured`, `automation`, `architecture`, `frontend`)
* Integração de exemplos de código nos estudos de caso
* Estrutura pronta para deploy (Vercel / Netlify)

Próximos refinamentos:

* Ajustes visuais finos (tipografia, espaçamentos, imagens)
* Criação das covers personalizadas dos projetos
* Otimização final para deploy

---

## Como rodar o projeto

```bash
npm install
npm run dev
```

---

## Objetivo maior

Este portfólio representa uma filosofia:

> Tecnologia aplicada para resolver problemas reais de operação.

E também serve como base para oferecer:

* Criação de portfólios profissionais
* Sistemas digitais personalizados
* Automações operacionais

---

## Autor

Lucas Luiz Inacio da Silva
Desenvolvedor focado em transformar operações reais em sistemas digitais eficientes.
