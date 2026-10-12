"use client";

import gsap from "gsap";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/content/profile";
import { cn, isPlaceholder } from "@/lib/site";
import { ButtonLink } from "./ui/button-link";
import { Fill } from "./ui/fill";
import { GithubIcon } from "./ui/icons";

const details: Array<{
  key: "context" | "goal" | "contribution";
  label: string;
  code: string;
}> = [
  { key: "context", label: "Contexto", code: "01" },
  { key: "goal", label: "Objetivo", code: "02" },
  { key: "contribution", label: "Arquitetura & Contribuição", code: "03" },
];

/**
 * Vitrine de projeto em formato de palco aberto (sem cards dentro de cards):
 * - Índice monumental vazado (.stroke-display) que preenche em verde esmeralda no hover
 * - Visualizador 3D de telemetria reativo ao mouse com corte assimétrico (.shape-blade)
 * - Seletor interativo de especificações + linhas arquitetônicas abertas
 * - Botões autorais Kinetic Blade
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const titleId = `projeto-${project.slug}`;
  const hasLinks = !!(project.links.demo || project.links.repo);
  const visualRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "context" | "goal" | "contribution"
  >("all");

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !visualRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x,
        y,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
    gsap.to(visualRef.current, {
      rotateY: nx * 10,
      rotateX: -ny * 10,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
    });
  }

  function onPointerLeave() {
    if (!visualRef.current) return;
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
    }
    gsap.to(visualRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "expo.out",
    });
  }

  const visibleDetails =
    activeTab === "all"
      ? details
      : details.filter((d) => d.key === activeTab);

  return (
    <article
      data-project-card
      aria-labelledby={titleId}
      className="group relative border-t border-white/12 pt-12 transition-colors duration-500 md:pt-16"
    >
      {/* Linha de laser superior que varre horizontalmente no hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      {/* Cabeçalho aberto do projeto */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-baseline gap-5 sm:gap-7">
          <span
            aria-hidden="true"
            className="stroke-display font-display text-6xl font-bold leading-none tracking-tighter select-none sm:text-8xl"
          >
            {number}
          </span>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              <span>{project.kind}</span>
              <span className="text-white/20">/</span>
              <span className="text-muted">{project.period}</span>
            </div>
            <h3
              id={titleId}
              className="font-display text-3xl font-bold leading-none tracking-tight text-ink sm:text-5xl"
            >
              <Fill>{project.title}</Fill>
            </h3>
          </div>
        </div>

        {/* Seletor interativo de leitura da arquitetura */}
        <div
          role="group"
          aria-label={`Explorar detalhes de ${project.title}`}
          className="flex flex-wrap gap-1.5"
        >
          {(
            [
              { id: "all", label: "Visão geral" },
              { id: "context", label: "Contexto" },
              { id: "goal", label: "Objetivo" },
              { id: "contribution", label: "Arquitetura" },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shape-blade-sm relative px-3.5 py-1.5 font-sans text-xs font-medium transition-colors duration-300",
                  isSelected
                    ? "font-semibold text-accent-ink"
                    : "border border-white/10 bg-surface/60 text-muted hover:border-accent/40 hover:text-ink",
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId={`proj-tab-${project.slug}`}
                    className="shape-blade-sm absolute inset-0 z-0 bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Palco dividido em 2 colunas sem caixas aninhadas */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Coluna esquerda: Resumo + Visualizador 3D interativo + Ações */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <Fill
              as="p"
              className="font-sans text-base leading-relaxed text-muted sm:text-lg"
            >
              {project.summary}
            </Fill>

            {/* Palco visual 3D interativo ao mouse */}
            <div
              ref={visualRef}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              data-cursor-label="INTERAGIR 3D"
              className="shape-blade telemetry-grid relative mt-8 flex aspect-[16/9] items-center justify-center overflow-hidden border border-white/12 bg-[#080a0d] p-6 will-change-transform"
            >
              <div
                ref={glowRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 opacity-0 blur-2xl"
              />

              {project.image ? (
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              ) : (
                <svg
                  viewBox="0 0 400 160"
                  className="relative z-10 w-full opacity-85"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 15 125 Q 90 15, 175 90 T 325 40 T 385 80"
                    stroke="#1ae57e"
                    strokeWidth="2.2"
                    strokeDasharray="10 6"
                    className="animate-dash"
                  />
                  <path
                    d="M 15 140 Q 115 60, 205 110 T 385 55"
                    stroke="#6ef9b0"
                    strokeWidth="1.25"
                    strokeOpacity="0.45"
                  />
                  <circle cx="175" cy="90" r="4.5" fill="#1ae57e" />
                  <circle cx="325" cy="40" r="4.5" fill="#6ef9b0" />
                </svg>
              )}

              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                <span>SYS // {project.slug.toUpperCase()}</span>
                <span className="text-accent">LIVE TRACE</span>
              </div>
            </div>
          </div>

          {/* Botões Kinetic Blade */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5 pt-2">
            {project.links.demo && (
              <ButtonLink
                href={project.links.demo}
                icon={<ArrowUpRight className="size-4" />}
              >
                Ver demonstração
              </ButtonLink>
            )}
            {project.links.repo && (
              <ButtonLink
                href={project.links.repo}
                variant={project.links.demo ? "secondary" : "primary"}
                icon={<GithubIcon className="size-4" />}
              >
                Código no GitHub
              </ButtonLink>
            )}
            {!hasLinks && isPlaceholder(project.title) && (
              <Fill className="font-sans text-xs text-muted">
                [PREENCHER: links de demonstração e/ou repositório]
              </Fill>
            )}
          </div>
        </div>

        {/* Coluna direita: Linhas editoriais abertas (zero cards aninhados) */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div className="divide-y divide-white/10 border-y border-white/10">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleDetails.map(({ key, label, code }) => (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group/row grid gap-3 py-5 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="flex items-baseline gap-2.5 sm:col-span-4">
                    <span className="font-mono text-[11px] text-accent">
                      /{code}
                    </span>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors group-hover/row:text-accent">
                      {label}
                    </h4>
                  </div>
                  <div className="sm:col-span-8">
                    <Fill
                      as="p"
                      className="font-sans text-sm leading-relaxed text-muted sm:text-base"
                    >
                      {project[key]}
                    </Fill>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Entregas e Stack em layout aberto */}
          <div className="mt-8 grid gap-8 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <h4 className="eyebrow mb-4 text-accent">
                {"// RESULTADOS E IMPACTO"}
              </h4>
              <ul className="space-y-3 font-sans text-sm leading-relaxed text-ink/90">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-accent"
                    />
                    <Fill>{r}</Fill>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-5">
              <h4 className="eyebrow mb-4 text-accent">{"// STACK TÉCNICA"}</h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <li key={`${tech}-${i}`}>
                    <Fill className="shape-blade-sm inline-block border border-white/12 bg-surface px-3 py-1 font-mono text-xs text-ink/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent">
                      {tech}
                    </Fill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
