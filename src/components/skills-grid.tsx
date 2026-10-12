"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "@/content/profile";
import { cn } from "@/lib/site";
import { Fill } from "./ui/fill";

export function SkillsGrid() {
  const [selected, setSelected] = useState<number | "all">("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const visible = skillGroups
    .map((group, index) => ({ group, index }))
    .filter(({ index }) => selected === "all" || selected === index);

  const chips: Array<{ value: number | "all"; label: string }> = [
    { value: "all", label: "Todas as áreas" },
    ...skillGroups.map((g, i) => ({ value: i, label: g.name })),
  ];

  return (
    <div>
      {/* Barra de filtros assimétrica alternando Flame e Cyan */}
      <div
        role="group"
        aria-label="Filtrar competências por domínio"
        className="mb-12 flex flex-wrap gap-2"
      >
        {chips.map((chip, idx) => {
          const isActive = selected === chip.value;
          const isCyan = idx % 2 === 1;
          return (
            <button
              key={String(chip.value)}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(chip.value)}
              className={cn(
                "shape-blade-sm relative min-h-10 border px-4 py-2 font-sans text-xs font-bold tracking-tight transition-colors duration-300",
                isActive
                  ? isCyan
                    ? "border-accent-2 text-accent-ink"
                    : "border-accent text-white"
                  : "border-white/12 bg-surface/80 text-muted hover:border-accent-2/50 hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-chip"
                  className={cn(
                    "shape-blade-sm absolute inset-0 z-0",
                    isCyan ? "bg-accent-2" : "bg-accent",
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Fill className="relative z-10">{chip.label}</Fill>
            </button>
          );
        })}
      </div>

      {/* Faixas cinéticas horizontais alternando Vermelho-Chama e Ciano Elétrico */}
      <motion.ul
        layout
        className="divide-y divide-white/10 border-y border-white/10"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ group, index }) => {
            const isHovered = hoveredIdx === index;
            const isCyan = index % 2 === 1;
            return (
              <motion.li
                key={index}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                onPointerEnter={() => setHoveredIdx(index)}
                onPointerLeave={() => setHoveredIdx(null)}
                onClick={() =>
                  setHoveredIdx((prev) => (prev === index ? null : index))
                }
                className="group relative overflow-hidden py-8 transition-colors duration-500 md:py-10"
              >
                {/* Cortina luminosa em contraste duplo no hover */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0",
                    isCyan
                      ? "from-accent-2/[0.1] via-accent/[0.04]"
                      : "from-accent/[0.1] via-accent-2/[0.04]",
                  )}
                />

                {/* Barra lateral ativa */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
                    isCyan ? "bg-accent-2" : "bg-accent",
                  )}
                />

                <div className="relative z-10 grid gap-6 md:grid-cols-12 md:items-center md:gap-8 md:pl-5">
                  <div className="flex items-baseline gap-4 md:col-span-5">
                    <span
                      aria-hidden="true"
                      className="stroke-display font-display text-4xl font-bold leading-none tracking-tighter select-none sm:text-5xl"
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "font-display text-2xl font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-3xl",
                          isCyan
                            ? "group-hover:text-accent-2"
                            : "group-hover:text-accent",
                        )}
                      >
                        <Fill>{group.name}</Fill>
                      </h3>
                      {group.description && (
                        <Fill
                          as="p"
                          className="mt-1.5 max-w-md font-sans text-xs leading-relaxed text-muted sm:text-sm"
                        >
                          {group.description}
                        </Fill>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item, i) => (
                        <li key={`${item}-${i}`}>
                          <Fill
                            className={cn(
                              "shape-blade-sm inline-block border px-3.5 py-1.5 font-sans text-xs font-semibold transition-all duration-300",
                              isHovered
                                ? i % 2 === 1
                                  ? "border-accent-2/60 bg-accent-2/15 text-ink hover:bg-accent-2 hover:text-accent-ink"
                                  : "border-accent/60 bg-accent/15 text-ink hover:bg-accent hover:text-white"
                                : "border-white/12 bg-surface/80 text-ink/90",
                            )}
                          >
                            {item}
                          </Fill>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
