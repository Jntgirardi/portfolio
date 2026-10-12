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

declare global {
  interface Window {
    __jgStart?: number;
  }
}

const PRELOADER_INLINE_SCRIPT = `(function(){try{var start=performance.now();window.__jgStart=start;var dur=1450;function tick(now){var el=document.getElementById("jg-counter");var p=Math.min(1,Math.max(0,(now-start)/dur));var ease=p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;if(el){el.textContent=String(Math.round(ease*100)).padStart(3,"0");}if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);}catch(e){}})();`;

/**
 * Motor global de movimento otimizado para Mobile & Desktop:
 * 1. Abertura cinética de 2.0 segundos acelerada via CSS GPU (@keyframes) +
 *    contador 000 -> 100% sincronizado antes e depois da hidratação do React,
 *    funcionando em toda abertura e reload sem travar o celular.
 * 2. Lenis Smooth Scroll ativado apenas em desktop (pointer: fine); no mobile usa
 *    o scroll nativo de 120Hz do iOS/Android sem sobrecarga de CPU/GPU.
 * 3. Cursor interativo exclusivo para desktop.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Garante que após a hidratação do React o contador continue sincronizado até 100%
    const start = window.__jgStart ?? performance.now();
    const dur = 1450;
    let rafId = 0;
    const syncCounter = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / dur));
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (counterRef.current) {
        counterRef.current.textContent = String(
          Math.round(ease * 100),
        ).padStart(3, "0");
      }
      if (p < 1) {
        rafId = window.requestAnimationFrame(syncCounter);
      }
    };
    rafId = window.requestAnimationFrame(syncCounter);

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    let lenis: Lenis | null = null;
    let updateTicker: ((time: number) => void) | null = null;

    // Ativa Lenis apenas em Desktop (mouse/trackpad) para deixar o touch mobile 100% nativo e leve
    if (hasFinePointer) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", (e: { velocity: number }) => {
        ScrollTrigger.update();
        const v = Math.min(Math.abs(e.velocity || 0), 60);
        document.documentElement.style.setProperty(
          "--scroll-velocity",
          v.toFixed(2),
        );
      });

      updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
    }

    if (window.location.hash) {
      const initialDest = document.querySelector<HTMLElement>(
        window.location.hash,
      );
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      if (initialDest) {
        window.setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(initialDest, { offset: -64, immediate: false });
          } else {
            initialDest.scrollIntoView({ behavior: "smooth" });
          }
        }, 2050);
      }
    }

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
        if (lenis) {
          lenis.scrollTo(dest, { offset: -64 });
        } else {
          dest.scrollIntoView({ behavior: "smooth" });
        }
        if (window.location.hash) {
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
      }
    };
    document.addEventListener("click", onAnchorClick);

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
      window.cancelAnimationFrame(rafId);
      cleanupCursor();
      document.removeEventListener("click", onAnchorClick);
      if (updateTicker) gsap.ticker.remove(updateTicker);
      lenis?.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Abertura acelerada via CSS GPU — inicia em 0ms em toda abertura e reload */}
      <div
        id="jg-preloader"
        aria-hidden="true"
        className="animate-preloader-root fixed inset-0 z-[120] select-none overflow-hidden"
      >
        <div className="grid h-full w-full grid-cols-5">
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              style={{ animationDelay: `${1.45 + col * 0.04}s` }}
              className="animate-preloader-col h-full border-r border-white/[0.04] bg-[#030304] last:border-r-0"
            />
          ))}
        </div>

        <div className="animate-preloader-hud absolute inset-0 flex flex-col justify-between p-6 sm:p-12">
          <div className="flex items-center justify-between font-sans text-xs font-semibold text-muted">
            <span className="flex items-center gap-2.5 text-ink">
              <span className="h-2 w-4 -skew-x-12 bg-gradient-to-r from-accent to-accent-2" />
              Portfólio · {profile.name}
            </span>
            <span className="text-accent-2">{profile.location}</span>
          </div>

          <div className="my-auto flex flex-col items-center text-center">
            <svg
              viewBox="0 0 360 110"
              className="mb-6 w-52 sm:w-64"
              fill="none"
            >
              <path
                d="M 20 65 C 75 15, 285 15, 340 65 C 285 98, 75 98, 20 65 Z"
                stroke="#ff3d1f"
                strokeWidth="2"
                strokeDasharray="10 6"
                className="animate-dash"
              />
              <circle
                cx="180"
                cy="58"
                r="22"
                stroke="#00e5ff"
                strokeOpacity="0.5"
              />
              <circle cx="180" cy="58" r="4.5" fill="#00e5ff" />
            </svg>
            <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              {profile.name}
            </p>
            <p className="mt-2 font-sans text-xs font-semibold text-accent-2 sm:text-sm">
              {profile.role}
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="font-sans text-xs font-semibold text-muted">
                Preparando experiência
              </span>
              <span className="text-accent-sheen font-display text-4xl font-bold leading-none tracking-tight sm:text-6xl">
                <span
                  id="jg-counter"
                  ref={counterRef}
                  suppressHydrationWarning
                >
                  000
                </span>
                <span className="text-xl text-accent-2">%</span>
              </span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div className="animate-preloader-bar h-full w-full origin-left bg-gradient-to-r from-accent via-[#ff7a00] to-accent-2" />
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{ __html: PRELOADER_INLINE_SCRIPT }}
      />

      {/* Cursor interativo Dual-Clash (apenas desktop) */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className="size-2 rotate-45 bg-accent" />
      </div>
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[109] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-300 ${
            cursorLabel
              ? "h-9 border-accent-2 bg-accent px-3.5 font-sans text-[11px] font-bold tracking-tight text-white"
              : cursorHovered
                ? "size-10 border-accent-2 bg-accent-2/10"
                : "size-7 border-accent-2/40"
          }`}
        >
          {cursorLabel && <span>{cursorLabel}</span>}
        </div>
      </div>

      {children}
    </MotionConfig>
  );
}
