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
        className="mb-10 flex items-center gap-3 font-display text-lg font-bold tracking-tight text-ink"
      >
        <span className="grid size-9 place-items-center rounded-full border border-accent/35 bg-accent/10 text-accent">
          {icon}
        </span>
        {title}
      </h3>

      <ol aria-labelledby={headingId} className="relative pl-8">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-2 w-[2px] bg-line"
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
            className="relative pb-10 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-2.5 size-3 rounded-full border-2 border-accent bg-bg"
            />

            <div className="clip-corner border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/45">
              <Fill
                as="p"
                className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 font-sans text-xs font-semibold text-accent"
              >
                {entry.period}
              </Fill>
              <h4 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                <Fill>{entry.title}</Fill>
              </h4>
              <p className="mt-1 font-sans text-xs font-medium text-ink/90">
                <Fill>{entry.organization}</Fill>
                {entry.location && (
                  <>
                    <span aria-hidden="true" className="mx-2 text-muted/60">
                      •
                    </span>
                    <Fill className="text-muted">{entry.location}</Fill>
                  </>
                )}
              </p>
              <Fill
                as="p"
                className="mt-3.5 font-sans text-sm leading-relaxed text-muted"
              >
                {entry.description}
              </Fill>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-line pt-4 font-sans text-sm text-ink/90">
                  {entry.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
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
      className="telemetry-grid border-y border-line bg-surface/35 py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="trajetoria-titulo"
          index="04"
          label="Trajetória"
          title={
            <>
              Experiência e{" "}
              <span className="font-serif italic font-normal text-accent">
                formação
              </span>
            </>
          }
        />
        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
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
