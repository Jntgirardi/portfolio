"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { projects, socials } from "@/content/profile";
import { ProjectCard } from "./project-card";
import { ButtonLink } from "./ui/button-link";
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
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
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
      className="telemetry-grid relative border-y border-white/10 bg-surface/30 py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="projetos-titulo"
          index="02"
          label="Projetos selecionados"
          telemetryTag="SELECTED WORKS // FULL STACK & CLOUD"
          title={
            <>
              Engenharia em{" "}
              <span className="font-serif italic font-normal text-accent">
                produção
              </span>
            </>
          }
        />

        <div className="space-y-20 md:space-y-28">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {github && (
          <div className="mt-16 flex justify-end border-t border-white/10 pt-10">
            <ButtonLink
              href={github.href}
              variant="secondary"
              icon={<ArrowUpRight className="size-4" />}
            >
              Explorar todos os repositórios no GitHub
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
