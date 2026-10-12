"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { about } from "@/content/profile";
import { Fill } from "./ui/fill";
import { SectionHeading } from "./ui/section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Seção 01 — Sobre mim (Sem cards repetitivos):
 * - Manifesto principal com iluminação progressiva palavra por palavra sincronizada ao scroll (ScrollTrigger scrub)
 * - Narrativa editorial aberta com espinha dorsal de laser vertical animada
 * - Régua arquitetônica horizontal de especificações (sem caixas/cards fechados)
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  const leadWords = about.lead.split(/\s+/);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll<HTMLElement>("[data-scrub-word]");
      if (words.length > 0 && leadRef.current) {
        gsap.fromTo(
          words,
          { opacity: 0.18, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: leadRef.current,
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.5,
            },
          },
        );
      }

      const spine = section.querySelector<HTMLElement>("[data-about-spine]");
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: spine.parentElement,
              start: "top 75%",
              end: "bottom 45%",
              scrub: 0.4,
            },
          },
        );
      }

      gsap.fromTo(
        section.querySelectorAll("[data-about-p]"),
        { x: 28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 62%",
          },
        },
      );

      gsap.fromTo(
        section.querySelectorAll("[data-about-spec]"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-about-specs-row]"),
            start: "top 85%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="sobre-titulo"
          index="01"
          label="Sobre mim"
          telemetryTag="PROFILE // FULL STACK ARCHITECTURE"
          title={
            <>
              Arquitetura sólida &{" "}
              <span className="font-serif italic font-normal text-accent">
                visão de produto
              </span>
            </>
          }
        />

        {/* Manifesto com iluminação progressiva palavra por palavra no scroll */}
        <div className="mb-20 border-l-2 border-accent pl-6 md:pl-10">
          <p
            ref={leadRef}
            className="max-w-5xl font-display text-[clamp(1.75rem,3.8vw,3.35rem)] font-bold leading-[1.14] tracking-[-0.03em] text-ink"
          >
            {leadWords.map((word, idx) => {
              const highlight =
                /^(Full|Stack|Engenharia|Software|SaaS|nuvem\.)$/i.test(
                  word.replace(/[.,—]/g, ""),
                );
              return (
                <span
                  key={idx}
                  data-scrub-word
                  className={`inline-block transition-colors ${
                    highlight ? "text-accent" : "text-ink"
                  }`}
                >
                  {word}
                  {idx < leadWords.length - 1 ? "\u00A0" : ""}
                </span>
              );
            })}
          </p>
        </div>

        {/* Narrativa editorial fluida (sem caixas/cards) com trilha de laser vertical */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
            <div className="sticky top-32">
              <span className="eyebrow block text-accent">
                {"// ABORDAGEM DE ENGENHARIA"}
              </span>
              <p className="mt-4 font-display text-7xl font-bold leading-none tracking-tighter text-white/[0.06]">
                JG—01
              </p>
              <svg
                viewBox="0 0 220 90"
                className="mt-6 w-48 opacity-75"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 5 70 Q 55 15, 110 55 T 215 25"
                  stroke="#1ae57e"
                  strokeWidth="1.75"
                  strokeDasharray="8 5"
                  className="animate-dash"
                />
                <circle cx="110" cy="55" r="4" fill="#1ae57e" />
                <circle cx="215" cy="25" r="3.5" fill="#6ef9b0" />
              </svg>
            </div>
          </div>

          <div className="relative pl-8 md:pl-12 lg:col-span-8">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-0 top-2 w-px bg-white/10"
            />
            <span
              aria-hidden="true"
              data-about-spine
              className="absolute bottom-2 left-0 top-2 w-px origin-top scale-y-0 bg-accent"
            />

            <div className="space-y-12">
              {about.paragraphs.map((p, i) => (
                <div
                  key={i}
                  data-about-p
                  className="group relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[37px] top-2 size-2.5 rotate-45 border border-accent bg-bg transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent md:-left-[53px]"
                  />
                  <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-accent/80">
                    0{i + 1} — SÍNTESE
                  </span>
                  <Fill
                    as="p"
                    className="font-sans text-base leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink/90 md:text-lg"
                  >
                    {p}
                  </Fill>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Régua arquitetônica horizontal de especificações (substitui os 4 cards antigos) */}
        <dl
          data-about-specs-row
          className="mt-20 grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
        >
          {about.facts.map((fact, idx) => (
            <div
              key={fact.label}
              data-about-spec
              className="group relative overflow-hidden py-7 sm:px-6 first:sm:pl-0 last:sm:pr-0"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {fact.label}
                </dt>
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] text-white/20 transition-colors group-hover:text-accent"
                >
                  0{idx + 1}
                </span>
              </div>
              <Fill
                as="dd"
                className="mt-3 block font-display text-xl font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl"
              >
                {fact.value}
              </Fill>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
