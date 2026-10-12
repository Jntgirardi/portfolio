# Portfólio — Jonathas Girardi

Portfólio profissional de **Jonathas Girardi** (Engenharia de Software · Desenvolvedor Full Stack), construído com **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP (`ScrollTrigger`)**, **Lenis**, **Motion for React** e **Lucide React**.

---

## Stack & Arquitetura

- **Next.js 16 (App Router)** — pré-renderização estática (`SSG`), geração dinâmica de Open Graph (`opengraph-image.tsx`), `sitemap.xml` e `robots.txt`.
- **TypeScript** — tipagem estrita de todo o conteúdo e componentes.
- **Tailwind CSS v4** — tokens de design em variáveis CSS (`#050506` Obsidian Dark + `#1AE57E` Emerald) e superfícies translúcidas.
- **Tipografia Auto-Hospedada (`next/font/local`)** — `Space Grotesk Variable`, `Plus Jakarta Sans Variable`, `Fraunces Variable` e `JetBrains Mono Variable` via `@fontsource-variable/*` (zero requisições externas em tempo de build).
- **Animações Cinéticas (`GSAP` + `Lenis` + `Motion`)** — abertura interativa de 2 segundos, rolagem inercial suave, curvas SVG 3D reativas ao ponteiro, faixas cinéticas sincronizadas à velocidade do scroll (`VelocityMarquee`), cartões 3D com spotlight e filtro animado de competências, respeitando `prefers-reduced-motion`.

---

## Como executar localmente

Pré-requisito: **Node.js 20+** e **npm**.

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:3000` |
| `npm run build` | Gera o bundle otimizado de produção |
| `npm run start` | Inicia o servidor de produção após o `build` |
| `npm run lint` | Executa o ESLint |
| `npm run typecheck` | Verifica os tipos com `tsc --noEmit` |

---

## Personalização de conteúdo

Todos os dados do perfil, projetos (**Estroque**, **ControllerArena**, **Monitor de Vagas**), experiências (**Gefpel**, **Pirelli**) e competências estão centralizados em:

- [`src/content/profile.ts`](./src/content/profile.ts)
