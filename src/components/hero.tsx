"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { ButtonLink } from "./ui/button-link";
import { Fill } from "./ui/fill";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function splitName(full: string): [string, string] {
  const parts = full.trim().split(/\s+/);
  if (parts.length <= 1) return [full, ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: "0512", y: "0384" });

  const [first, last] = splitName(profile.name);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const chars = section.querySelectorAll<HTMLElement>("[data-hero-char]");
      const fades = section.querySelectorAll<HTMLElement>("[data-hero-fade]");

      gsap.fromTo(
        chars,
        { yPercent: 112, rotateZ: 4, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.025,
          ease: "power4.out",
          delay: 0.15,
        },
      );

      gsap.fromTo(
        fades,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.35,
        },
      );

      if (line1Ref.current && line2Ref.current) {
        gsap.to(line1Ref.current, {
          xPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(line2Ref.current, {
          xPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, section);

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setCoords({
        x: String(Math.round(e.clientX)).padStart(4, "0"),
        y: String(Math.round(e.clientY)).padStart(4, "0"),
      });
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          rotateY: nx * 26,
          rotateX: -ny * 26,
          x: nx * 32,
          y: ny * 24,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ctx.revert();
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="telemetry-grid relative flex min-h-dvh flex-col justify-between overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12"
    >
      {/* Formas vetoriais 3D reativas ao ponteiro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="size-[34rem] rounded-full bg-accent/[0.045] blur-[140px]" />
        <div
          ref={coreRef}
          style={{ transformStyle: "preserve-3d" }}
          className="relative flex size-[22rem] items-center justify-center sm:size-[30rem] md:size-[38rem]"
        >
          <svg
            viewBox="0 0 600 600"
            className="size-full opacity-50"
            fill="none"
          >
            <circle
              cx="300"
              cy="300"
              r="275"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <circle
              cx="300"
              cy="300"
              r="235"
              stroke="#1ae57e"
              strokeOpacity="0.32"
              strokeWidth="1.25"
              strokeDasharray="90 30 15 30"
              className="animate-dash"
            />
            <circle
              cx="300"
              cy="300"
              r="185"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
            <path
              d="M95 290 C 155 160, 445 160, 505 290 C 445 365, 155 365, 95 290 Z"
              stroke="#1ae57e"
              strokeWidth="1.75"
              strokeOpacity="0.55"
              fill="rgba(26,229,126,0.02)"
            />
            <path
              d="M135 290 C 190 205, 410 205, 465 290 C 410 335, 190 335, 135 290 Z"
              stroke="#6ef9b0"
              strokeWidth="1.15"
              strokeOpacity="0.38"
              strokeDasharray="12 8"
              className="animate-dash"
            />
            <line
              x1="300"
              y1="10"
              x2="300"
              y2="590"
              stroke="rgba(26,229,126,0.09)"
              strokeWidth="1"
            />
            <line
              x1="10"
              y1="300"
              x2="590"
              y2="300"
              stroke="rgba(26,229,126,0.09)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* Barra superior com telemetria interativa do mouse + posicionamento Full Stack */}
      <div className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div data-hero-fade className="flex flex-wrap items-center gap-3">
          <span className="shape-blade-sm inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-sans text-xs font-semibold tracking-tight text-accent">
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span>{profile.role}</span>
          </span>
        </div>

        <div
          data-hero-fade
          aria-hidden="true"
          className="hidden items-center gap-5 font-mono text-[11px] text-muted sm:flex"
        >
          <span>
            POS <strong className="text-accent">{coords.x}</strong> :{" "}
            <strong className="text-accent">{coords.y}</strong>
          </span>
          <span className="text-white/15">|</span>
          <span className="font-sans text-xs font-medium">
            UNIFAN · {profile.location}
          </span>
        </div>
      </div>

      {/* Título Cinético Monumental */}
      <div className="container-page relative z-10 my-auto py-8 md:py-12">
        <h1
          id="hero-title"
          aria-label={profile.name}
          className="font-display text-[clamp(2.85rem,9.2vw,8.25rem)] font-bold leading-[0.94] tracking-[-0.04em] select-none"
        >
          <span className="sr-only">{profile.name}</span>
          <span
            ref={line1Ref}
            aria-hidden="true"
            className="block overflow-hidden pb-[0.04em] will-change-transform"
          >
            <span className="inline-flex">
              {first.split("").map((ch, idx) => (
                <span
                  key={idx}
                  data-hero-char
                  className="inline-block transition-transform duration-300 hover:-translate-y-1.5 will-change-transform"
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>{" "}
          <span
            ref={line2Ref}
            aria-hidden="true"
            className="block overflow-hidden pb-[0.06em] text-accent sm:pl-[6vw] will-change-transform"
          >
            <span className="inline-flex flex-wrap">
              {last.split("").map((ch, idx) => (
                <span
                  key={idx}
                  data-hero-char
                  className="text-accent-sheen inline-block transition-transform duration-300 hover:-translate-y-1.5 will-change-transform"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p
            data-hero-fade
            className="max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg md:col-span-7"
          >
            <Fill>{profile.tagline}</Fill>
          </p>

          <div
            data-hero-fade
            className="flex flex-wrap gap-3.5 md:col-span-5 md:justify-end"
          >
            <ButtonLink href="#projetos" icon={<ArrowDown className="size-4" />}>
              Ver projetos
            </ButtonLink>
            <ButtonLink
              href="#contato"
              variant="secondary"
              icon={<ArrowUpRight className="size-4" />}
            >
              Entrar em contato
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Rodapé de telemetria do Hero */}
      <div className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5 font-sans text-xs font-medium text-muted">
        <div data-hero-fade className="flex items-center gap-2.5">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rotate-45 bg-accent" />
          </span>
          <Fill className="text-ink/90">{profile.availability}</Fill>
        </div>

        <a
          data-hero-fade
          href="#sobre"
          className="group hidden items-center gap-2 text-muted transition-colors hover:text-ink sm:flex"
        >
          <span>Role para explorar</span>
          <ArrowDown
            aria-hidden="true"
            className="size-3.5 text-accent transition-transform duration-500 group-hover:translate-y-1"
          />
        </a>
      </div>
    </section>
  );
}
