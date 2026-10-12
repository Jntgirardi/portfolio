"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { projects, socials } from "@/content/profile";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./ui/section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const github = socials.find((s) => s.icon === "github");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll("[data-project-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 56, scale: 0.97, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.85,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      aria-labelledby="projetos-titulo"
      className="telemetry-grid relative border-y border-line bg-surface/35 py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="projetos-titulo"
          index="02"
          label="Projetos selecionados"
          title={
            <>
              Trabalhos em{" "}
              <span className="font-serif italic font-normal text-accent">
                destaque
              </span>
            </>
          }
        />

        <div className="space-y-10 md:space-y-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {github && (
          <div className="mt-14 flex justify-end">
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-surface px-6 font-sans text-[13px] font-semibold tracking-tight text-ink transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <span>Ver mais repositórios no GitHub</span>
              <span className="sr-only"> (abre em nova aba)</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
