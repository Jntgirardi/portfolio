"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Motor global de movimento:
 * 1. Abertura cinética de exatamente 2.0 segundos com bloqueio de interação/scroll,
 *    liberando o controle total ao usuário assim que a cortina se abre.
 * 2. Lenis Smooth Scroll sincronizado ao GSAP + ScrollTrigger.
 * 3. Cursor interativo discreto e responsivo.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      if (preloaderRef.current) preloaderRef.current.style.display = "none";
      return;
    }

    // Inicializa Lenis pausado durante os 2 segundos de abertura
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const unlockInteraction = () => {
      document.body.style.overflow = prevOverflow;
      lenis.start();
      if (preloaderRef.current) {
        preloaderRef.current.style.display = "none";
        preloaderRef.current.style.pointerEvents = "none";
      }
      ScrollTrigger.refresh();
    };

    // Fallback de segurança caso a aba fique em background
    const safetyTimer = window.setTimeout(unlockInteraction, 2300);

    // Abertura cinética de 2.0 segundos (1.45s telemetria + 0.55s cortina)
    if (preloaderRef.current) {
      const obj = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safetyTimer);
          unlockInteraction();
        },
      });

      if (barRef.current) {
        tl.fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.45, ease: "power2.inOut" },
          0,
        );
      }

      tl.to(
        obj,
        {
          val: 100,
          duration: 1.45,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(obj.val),
              ).padStart(3, "0");
            }
          },
        },
        0,
      );

      if (hudRef.current) {
        tl.to(
          hudRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.28,
            ease: "power2.in",
          },
          1.42,
        );
      }

      tl.to(
        preloaderRef.current.querySelectorAll("[data-preloader-col]"),
        {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.55,
          stagger: 0.04,
          ease: "expo.inOut",
        },
        1.45,
      );
    }

    lenis.on("scroll", (e: { velocity: number }) => {
      ScrollTrigger.update();
      const v = Math.min(Math.abs(e.velocity || 0), 60);
      document.documentElement.style.setProperty(
        "--scroll-velocity",
        v.toFixed(2),
      );
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (ev: MouseEvent) => {
      const target = (ev.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;
      const dest = document.querySelector<HTMLElement>(hash);
      if (dest) {
        ev.preventDefault();
        lenis.scrollTo(dest, { offset: -64 });
        history.pushState(null, "", hash);
      }
    };
    document.addEventListener("click", onAnchorClick);

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    let cleanupCursor = () => {};

    if (hasFinePointer && cursorDotRef.current && cursorRingRef.current) {
      const xDot = gsap.quickTo(cursorDotRef.current, "x", {
        duration: 0.08,
        ease: "power3",
      });
      const yDot = gsap.quickTo(cursorDotRef.current, "y", {
        duration: 0.08,
        ease: "power3",
      });
      const xRing = gsap.quickTo(cursorRingRef.current, "x", {
        duration: 0.28,
        ease: "power3",
      });
      const yRing = gsap.quickTo(cursorRingRef.current, "y", {
        duration: 0.28,
        ease: "power3",
      });

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        xDot(e.clientX);
        yDot(e.clientY);
        xRing(e.clientX);
        yRing(e.clientY);

        const el = e.target as HTMLElement | null;
        const labeled = el?.closest?.(
          "[data-cursor-label]",
        ) as HTMLElement | null;
        const interactive = el?.closest?.("a, button, [role='button']");

        if (labeled) {
          setCursorLabel(labeled.getAttribute("data-cursor-label") || "VER");
          setCursorHovered(true);
        } else if (interactive) {
          setCursorLabel("");
          setCursorHovered(true);
        } else {
          setCursorLabel("");
          setCursorHovered(false);
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      cleanupCursor = () => window.removeEventListener("pointermove", onMove);
    }

    return () => {
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = prevOverflow;
      cleanupCursor();
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Abertura de 2 segundos — bloqueia interação até concluir */}
      <div
        ref={preloaderRef}
        aria-hidden="true"
        className="pointer-events-auto fixed inset-0 z-[120] select-none overflow-hidden"
      >
        <div className="grid h-full w-full grid-cols-5">
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              data-preloader-col
              className="h-full border-r border-white/[0.04] bg-[#030304] last:border-r-0"
            />
          ))}
        </div>

        <div
          ref={hudRef}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12"
        >
          <div className="flex items-center justify-between font-sans text-xs font-medium text-muted">
            <span className="flex items-center gap-2.5 text-ink">
              <span className="size-2 rounded-full bg-accent" />
              Portfólio · {profile.name}
            </span>
            <span>{profile.location}</span>
          </div>

          <div className="my-auto flex flex-col items-center text-center">
            <svg
              viewBox="0 0 360 110"
              className="mb-6 w-52 sm:w-64"
              fill="none"
            >
              <path
                d="M 20 65 C 75 15, 285 15, 340 65 C 285 98, 75 98, 20 65 Z"
                stroke="#1ae57e"
                strokeWidth="1.75"
                strokeDasharray="10 6"
                className="animate-dash"
              />
              <circle cx="180" cy="58" r="22" stroke="rgba(255,255,255,0.2)" />
              <circle cx="180" cy="58" r="4" fill="#1ae57e" />
            </svg>
            <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              {profile.name}
            </p>
            <p className="mt-2 font-sans text-xs font-medium text-accent sm:text-sm">
              {profile.role}
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="font-sans text-xs font-medium text-muted">
                Iniciando experiência
              </span>
              <span className="font-display text-4xl font-bold leading-none tracking-tight text-accent sm:text-6xl">
                <span ref={counterRef}>000</span>
                <span className="text-xl text-muted">%</span>
              </span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                ref={barRef}
                className="h-full w-full origin-left scale-x-0 bg-accent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cursor interativo clean */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className="size-1.5 rounded-full bg-accent" />
      </div>
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[109] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-300 ${
            cursorLabel
              ? "h-9 px-3.5 border-accent bg-accent font-sans text-[11px] font-semibold tracking-tight text-accent-ink"
              : cursorHovered
                ? "size-10 border-accent/70 bg-accent/5"
                : "size-7 border-white/20"
          }`}
        >
          {cursorLabel && <span>{cursorLabel}</span>}
        </div>
      </div>

      {children}
    </MotionConfig>
  );
}
