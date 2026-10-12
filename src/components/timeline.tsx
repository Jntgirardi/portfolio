"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import { education, experience, type TimelineEntry } from "@/content/profile";
import { Fill } from "./ui/fill";
import { SectionHeading } from "./ui/section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TimelineList({
  title,
  icon,
  entries,
}: {
  title: string;
  icon: React.ReactNode;
  entries: TimelineEntry[];
}) {
  const headingId = `trajetoria-${title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()}`;

  return (
    <div>
      <h3
        id={headingId}
        className="mb-10 flex items-center gap-3.5 border-b border-white/10 pb-4 font-display text-lg font-bold tracking-tight text-ink"
      >
        <span className="shape-blade-sm grid size-9 place-items-center border border-accent/40 bg-accent/10 text-accent">
          {icon}
        </span>
        {title}
      </h3>

      <ol aria-labelledby={headingId} className="relative pl-8 sm:pl-10">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-2 w-[2px] bg-white/10"
        />
        <span
          aria-hidden="true"
          data-timeline-progress
          className="absolute bottom-0 left-[5px] top-2 w-[2px] origin-top scale-y-0 bg-accent"
        />

        {entries.map((entry, i) => (
          <li
            key={i}
            data-timeline-item
            className="group relative border-b border-white/[0.08] pb-10 pt-2 last:border-b-0 last:pb-0"
          >
            {/* Nó de telemetria rotacionado que pulsa no hover */}
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-4 size-3 rotate-45 border border-accent bg-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-accent sm:-left-[37px]"
            />

            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Fill
                  as="p"
                  className="shape-blade-sm inline-block border border-accent/35 bg-accent/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-accent"
                >
                  {entry.period}
                </Fill>
                {entry.location && (
                  <Fill className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {entry.location}
                  </Fill>
                )}
              </div>

              <h4 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                <Fill>{entry.title}</Fill>
              </h4>

              <p className="mt-1 font-sans text-sm font-semibold text-ink/90">
                <Fill>{entry.organization}</Fill>
              </p>

              <Fill
                as="p"
                className="mt-3.5 font-sans text-sm leading-relaxed text-muted sm:text-base"
              >
                {entry.description}
              </Fill>

              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 pt-2 font-sans text-sm text-ink/90">
                  {entry.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-accent"
                      />
                      <Fill>{h}</Fill>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll("[data-timeline-progress]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: bar.parentElement,
              start: "top 75%",
              end: "bottom 45%",
              scrub: 0.4,
            },
          },
        );
      });

      section.querySelectorAll("[data-timeline-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { x: 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
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
      id="trajetoria"
      aria-labelledby="trajetoria-titulo"
      className="telemetry-grid border-y border-white/10 bg-surface/30 py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="trajetoria-titulo"
          index="04"
          label="Trajetória"
          telemetryTag="CAREER TRACK // EXPERIENCE & EDUCATION"
          title={
            <>
              Experiência e{" "}
              <span className="font-serif italic font-normal text-accent">
                formação
              </span>
            </>
          }
        />
        <div className="grid gap-16 md:grid-cols-2 md:gap-14">
          <TimelineList
            title="Experiência profissional"
            icon={<BriefcaseBusiness className="size-4" aria-hidden="true" />}
            entries={experience}
          />
          <TimelineList
            title="Formação acadêmica"
            icon={<GraduationCap className="size-4" aria-hidden="true" />}
            entries={education}
          />
        </div>
      </div>
    </section>
  );
}
