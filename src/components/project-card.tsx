"use client";

import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { Project } from "@/content/profile";
import { isPlaceholder } from "@/lib/site";
import { Fill } from "./ui/fill";
import { GithubIcon } from "./ui/icons";

const details: Array<{
  key: "context" | "goal" | "contribution";
  label: string;
}> = [
  { key: "context", label: "Contexto" },
  { key: "goal", label: "Objetivo" },
  { key: "contribution", label: "Minha contribuição" },
];

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
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || !cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
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
    gsap.to(cardRef.current, {
      rotateY: nx * 3.5,
      rotateX: -ny * 3.5,
      transformPerspective: 1200,
      duration: 0.45,
      ease: "power2.out",
    });
  }

  function onPointerLeave() {
    if (!cardRef.current) return;
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
    }
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "expo.out",
    });
  }

  return (
    <article
      ref={cardRef}
      data-project-card
      data-cursor-label="PROJETO ↗"
      aria-labelledby={titleId}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="clip-corner group relative overflow-hidden border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/45 sm:p-10 md:p-12 will-change-transform"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] opacity-0 blur-3xl"
      />

      <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 font-sans text-xs font-medium">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-semibold text-accent">
            Projeto {number}
          </span>
          <Fill className="text-ink/90">{project.kind}</Fill>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Fill>{project.period}</Fill>
        </div>
      </div>

      <div className="relative z-10 grid gap-10 lg:grid-cols-12">
        <header className="flex flex-col justify-between lg:col-span-5">
          <div>
            <h3
              id={titleId}
              className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              <Fill>{project.title}</Fill>
            </h3>

            <Fill
              as="p"
              className="mt-4 font-sans text-base leading-relaxed text-muted"
            >
              {project.summary}
            </Fill>
          </div>

          {project.image ? (
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="telemetry-grid relative mt-8 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-line bg-bg p-6"
            >
              <svg
                viewBox="0 0 400 160"
                className="w-full opacity-75"
                fill="none"
              >
                <path
                  d="M 20 120 Q 90 20, 170 90 T 320 45 T 380 85"
                  stroke="#1ae57e"
                  strokeWidth="2"
                  strokeDasharray="10 6"
                  className="animate-dash"
                />
                <path
                  d="M 20 135 Q 110 65, 200 110 T 380 60"
                  stroke="#6ef9b0"
                  strokeWidth="1.25"
                  strokeOpacity="0.45"
                />
                <circle cx="170" cy="90" r="4.5" fill="#1ae57e" />
                <circle cx="320" cy="45" r="4.5" fill="#6ef9b0" />
              </svg>
              <span className="absolute bottom-3 right-4 font-sans text-[11px] font-medium text-muted/70">
                {project.title}
              </span>
            </div>
          )}
        </header>

        <div className="flex flex-col justify-between lg:col-span-7">
          <dl className="grid gap-4 sm:grid-cols-3">
            {details.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl border border-line bg-bg/70 p-4 transition-colors group-hover:border-white/10"
              >
                <dt className="mb-2 font-sans text-xs font-semibold text-accent">
                  {label}
                </dt>
                <Fill
                  as="dd"
                  className="font-sans text-sm leading-relaxed text-muted"
                >
                  {project[key]}
                </Fill>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                Resultados e entregas
              </h4>
              <ul className="space-y-2.5 font-sans text-sm leading-relaxed text-ink/90">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <Fill>{r}</Fill>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-5">
              <h4 className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                Tecnologias
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <li key={`${tech}-${i}`}>
                    <Fill className="inline-block rounded-full border border-line bg-bg px-3 py-1 font-sans text-xs font-medium text-ink/90 transition-colors group-hover:border-white/15">
                      {tech}
                    </Fill>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex flex-wrap gap-3">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex min-h-10 items-center gap-2 rounded-full bg-accent px-5 font-sans text-xs font-semibold text-accent-ink transition-colors hover:bg-ink"
                >
                  Ver demonstração
                  <span className="sr-only">
                    {" "}
                    de {project.title} (abre em nova aba)
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/repo inline-flex min-h-10 items-center gap-2.5 rounded-full border border-white/10 bg-bg px-5 font-sans text-xs font-medium text-ink/90 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <GithubIcon className="size-3.5 text-accent" />
                  <span>Ver código no GitHub</span>
                  <span className="sr-only">
                    {" "}
                    de {project.title} (abre em nova aba)
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-muted transition-transform duration-300 group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5 group-hover/repo:text-accent"
                  />
                </a>
              )}
              {!hasLinks && isPlaceholder(project.title) && (
                <Fill className="font-sans text-xs text-muted">
                  [PREENCHER: links de demonstração e/ou repositório]
                </Fill>
              )}
            </div>

            <span
              aria-hidden="true"
              className="font-display text-3xl font-bold text-white/[0.06] transition-colors group-hover:text-accent/35"
            >
              {number}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
