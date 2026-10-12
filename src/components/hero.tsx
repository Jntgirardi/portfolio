"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
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
  const orbFlameRef = useRef<HTMLDivElement>(null);
  const orbCyanRef = useRef<HTMLDivElement>(null);

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
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          rotateY: nx * 28,
          rotateX: -ny * 28,
          x: nx * 36,
          y: ny * 26,
          duration: 0.8,
          ease: "power3.out",
        });
      }
      if (orbFlameRef.current) {
        gsap.to(orbFlameRef.current, {
          x: nx * -90,
          y: ny * -70,
          duration: 1.2,
          ease: "power2.out",
        });
      }
      if (orbCyanRef.current) {
        gsap.to(orbCyanRef.current, {
          x: nx * 90,
          y: ny * 70,
          duration: 1.2,
          ease: "power2.out",
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
      {/* Atmosfera viva em duas cores opostas (#FF3D1F Flame × #00E5FF Cyan) + escultura vetorial 3D */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div
          ref={orbFlameRef}
          className="absolute -left-24 top-1/4 size-[30rem] rounded-full bg-accent/[0.11] blur-[150px]"
        />
        <div
          ref={orbCyanRef}
          className="absolute -right-24 bottom-1/4 size-[30rem] rounded-full bg-accent-2/[0.11] blur-[150px]"
        />

        <div
          ref={coreRef}
          style={{ transformStyle: "preserve-3d" }}
          className="relative flex size-[22rem] items-center justify-center sm:size-[30rem] md:size-[38rem]"
        >
          <svg
            viewBox="0 0 600 600"
            className="size-full opacity-65"
            fill="none"
          >
            <circle
              cx="300"
              cy="300"
              r="275"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <circle
              cx="300"
              cy="300"
              r="235"
              stroke="#00e5ff"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="90 30 15 30"
              className="animate-dash"
            />
            <circle
              cx="300"
              cy="300"
              r="185"
              stroke="#ff3d1f"
              strokeOpacity="0.3"
              strokeWidth="1.25"
              strokeDasharray="40 20"
            />
            <path
              d="M95 290 C 155 160, 445 160, 505 290 C 445 365, 155 365, 95 290 Z"
              stroke="#ff3d1f"
              strokeWidth="2"
              strokeOpacity="0.65"
              fill="rgba(255,61,31,0.03)"
            />
            <path
              d="M135 290 C 190 205, 410 205, 465 290 C 410 335, 190 335, 135 290 Z"
              stroke="#00e5ff"
              strokeWidth="1.5"
              strokeOpacity="0.55"
              strokeDasharray="12 8"
              className="animate-dash"
            />
          </svg>
        </div>
      </div>

      {/* Topo expressivo do Hero (sem aparência de painel de alarmes) */}
      <div className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div data-hero-fade className="flex flex-wrap items-center gap-3">
          <span className="shape-blade-sm inline-flex items-center gap-2 border border-accent/50 bg-accent/15 px-3.5 py-1.5 font-sans text-xs font-bold tracking-tight text-white">
            <Zap className="size-3.5 text-accent-2" aria-hidden="true" />
            <span>{profile.role}</span>
          </span>
        </div>

        <div
          data-hero-fade
          className="hidden items-center gap-3 font-sans text-xs font-semibold text-muted sm:flex"
        >
          <span className="text-accent-2">UNIFAN · 5º Semestre</span>
          <span className="text-accent">×</span>
          <span className="text-ink/90">{profile.location}</span>
        </div>
      </div>

      {/* Título Cinético Monumental com contraste Flame × Cyan */}
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
                  className="inline-block transition-all duration-300 hover:-translate-y-2 hover:text-accent-2 will-change-transform"
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>{" "}
          <span
            ref={line2Ref}
            aria-hidden="true"
            className="block overflow-hidden pb-[0.06em] sm:pl-[6vw] will-change-transform"
          >
            <span className="inline-flex flex-wrap">
              {last.split("").map((ch, idx) => (
                <span
                  key={idx}
                  data-hero-char
                  className="text-accent-sheen inline-block transition-transform duration-300 hover:-translate-y-2 will-change-transform"
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

      {/* Rodapé vivo do Hero */}
      <div className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5 font-sans text-xs font-semibold text-muted">
        <div data-hero-fade className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-5 -skew-x-12 bg-gradient-to-r from-accent to-accent-2"
          />
          <Fill className="text-ink">{profile.availability}</Fill>
        </div>

        <a
          data-hero-fade
          href="#sobre"
          className="group hidden items-center gap-2 text-ink transition-colors hover:text-accent-2 sm:flex"
        >
          <span>Role para explorar</span>
          <ArrowDown
            aria-hidden="true"
            className="size-3.5 text-accent transition-transform duration-500 group-hover:translate-y-1 group-hover:text-accent-2"
          />
        </a>
      </div>
    </section>
  );
}
