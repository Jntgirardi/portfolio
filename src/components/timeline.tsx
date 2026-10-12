"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import { education, experience, type TimelineEntry } from "@/content/profile";
import { cn } from "@/lib/site";
import { Fill } from "./ui/fill";
import { SectionHeading } from "./ui/section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TimelineList({
  title,
  icon,
  entries,
  accentTone = "flame",
}: {
  title: string;
  icon: React.ReactNode;
  entries: TimelineEntry[];
  accentTone?: "flame" | "cyan";
}) {
  const headingId = `trajetoria-${title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()}`;
  const isCyan = accentTone === "cyan";

  return (
    <div>
      <h3
        id={headingId}
        className="mb-10 flex items-center gap-3.5 border-b border-white/10 pb-4 font-display text-lg font-bold tracking-tight text-ink"
      >
        <span
          className={cn(
            "shape-blade-sm grid size-9 place-items-center border",
            isCyan
              ? "border-accent-2/50 bg-accent-2/15 text-accent-2"
              : "border-accent/50 bg-accent/15 text-accent",
          )}
        >
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
          className={cn(
            "absolute bottom-0 left-[5px] top-2 w-[2px] origin-top scale-y-0 bg-gradient-to-b",
            isCyan ? "from-accent-2 to-accent" : "from-accent to-accent-2",
          )}
        />

        {entries.map((entry, i) => (
          <li
            key={i}
            data-timeline-item
            className="group relative border-b border-white/[0.08] pb-10 pt-2 last:border-b-0 last:pb-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-[29px] top-4 size-3 rotate-45 border bg-bg transition-all duration-300 group-hover:scale-125 sm:-left-[37px]",
                isCyan
                  ? "border-accent-2 group-hover:bg-accent-2"
                  : "border-accent group-hover:bg-accent",
              )}
            />

            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Fill
                  as="p"
                  className={cn(
                    "shape-blade-sm inline-block border px-3 py-0.5 font-sans text-xs font-bold",
                    isCyan
                      ? "border-accent-2/40 bg-accent-2/12 text-accent-2"
                      : "border-accent/40 bg-accent/12 text-accent",
                  )}
                >
                  {entry.period}
                </Fill>
                {entry.location && (
                  <Fill className="font-sans text-xs font-medium text-muted">
                    {entry.location}
                  </Fill>
                )}
              </div>

              <h4
                className={cn(
                  "mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink transition-colors sm:text-3xl",
                  isCyan
                    ? "group-hover:text-accent-2"
                    : "group-hover:text-accent",
                )}
              >
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
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rotate-45",
                          j % 2 === 1 ? "bg-accent-2" : "bg-accent",
                        )}
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
          title={
            <>
              Experiência e{" "}
              <span className="font-serif italic font-normal text-accent-2">
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
            accentTone="flame"
          />
          <TimelineList
            title="Formação acadêmica"
            icon={<GraduationCap className="size-4" aria-hidden="true" />}
            entries={education}
            accentTone="cyan"
          />
        </div>
      </div>
    </section>
  );
}
