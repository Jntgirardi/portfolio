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

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (leadRef.current) {
        gsap.fromTo(
          leadRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: leadRef.current,
              start: "top 85%",
            },
          },
        );
      }

      gsap.fromTo(
        section.querySelectorAll("[data-about-p]"),
        { x: -32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        },
      );

      gsap.fromTo(
        section.querySelectorAll("[data-about-fact]"),
        { y: 28, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
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
          title={
            <>
              Arquitetura sólida &{" "}
              <span className="font-serif italic font-normal text-accent">
                mentalidade prática
              </span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div
              ref={leadRef}
              className="border-l-2 border-accent pl-6 md:pl-8"
            >
              <Fill
                as="p"
                className="font-display text-2xl font-semibold leading-[1.2] tracking-tight text-ink sm:text-3xl md:text-4xl"
              >
                {about.lead}
              </Fill>
            </div>

            <div className="mt-10 space-y-5 font-sans text-base leading-relaxed text-muted md:text-lg">
              {about.paragraphs.map((p, i) => (
                <div
                  key={i}
                  data-about-p
                  className="clip-corner group relative border border-line bg-surface/70 p-6 transition-colors duration-300 hover:border-accent/40"
                >
                  <Fill as="p">{p}</Fill>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="grid gap-4">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  data-about-fact
                  className="clip-corner group relative overflow-hidden border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <dt className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-accent"
                    />
                    {fact.label}
                  </dt>
                  <Fill
                    as="dd"
                    className="mt-2.5 block font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
                  >
                    {fact.value}
                  </Fill>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
