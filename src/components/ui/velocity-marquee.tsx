"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type VelocityMarqueeProps = {
  items: string[];
  variant?: "volt" | "dark";
  direction?: 1 | -1;
  className?: string;
};

/**
 * Faixa cinética em contraste duplo (Vermelho-Chama #FF3D1F × Ciano Elétrico #00E5FF)
 */
export function VelocityMarquee({
  items,
  variant = "volt",
  direction = 1,
  className,
}: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let xPercent = 0;
    let currentDir = direction;
    let velocityBoost = 0;

    const st = ScrollTrigger.create({
      onUpdate(self) {
        if (self.direction !== 0) {
          currentDir = self.direction * direction;
        }
        const v = Math.min(Math.abs(self.getVelocity()) / 350, 6);
        velocityBoost = v;
        gsap.to(track, {
          skewX: gsap.utils.clamp(-8, 8, (self.getVelocity() / 450) * direction),
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    const tick = () => {
      xPercent += -0.055 * currentDir * (1 + velocityBoost);
      if (xPercent <= -50) xPercent += 50;
      if (xPercent > 0) xPercent -= 50;
      gsap.set(track, { xPercent });
      velocityBoost *= 0.92;
    };

    gsap.ticker.add(tick);
    return () => {
      st.kill();
      gsap.ticker.remove(tick);
    };
  }, [direction]);

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border-y py-4 select-none",
        variant === "volt"
          ? "border-accent bg-accent text-white"
          : "border-accent-2/30 bg-[#07111a] text-ink",
        className,
      )}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {repeated.map((text, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-8 font-display text-lg font-bold uppercase tracking-tight sm:text-xl"
          >
            <span
              className={
                variant === "volt"
                  ? "text-white"
                  : idx % 2 === 1
                    ? "text-accent-2"
                    : "text-ink"
              }
            >
              {text}
            </span>
            <span
              className={cn(
                "inline-block size-2 rotate-45",
                variant === "volt" ? "bg-accent-2" : "bg-accent",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
