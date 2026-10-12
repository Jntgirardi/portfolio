"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "@/content/profile";
import { cn } from "@/lib/site";
import { Fill } from "./ui/fill";

/**
 * Matriz Cinética de Competências em Faixas Horizontais (Substitui o grid de 6 cards):
 * - Zero caixas/cards repetitivos: faixas arquitetônicas full-width separadas por linhas de 1px
 * - Varredura diagonal esmeralda no hover + números vazados (.stroke-display)
 * - Filtro superior com geometria assimétrica (.shape-blade-sm)
 */
export function SkillsGrid() {
  const [selected, setSelected] = useState<number | "all">("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const visible = skillGroups
    .map((group, index) => ({ group, index }))
    .filter(({ index }) => selected === "all" || selected === index);

  const chips: Array<{ value: number | "all"; label: string }> = [
    { value: "all", label: " Matriz Completa" },
    ...skillGroups.map((g, i) => ({ value: i, label: g.name })),
  ];

  return (
    <div>
      {/* Barra de filtros assimétrica (.shape-blade-sm) */}
      <div
        role="group"
        aria-label="Filtrar competências por domínio"
        className="mb-12 flex flex-wrap gap-2"
      >
        {chips.map((chip) => {
          const isActive = selected === chip.value;
          return (
            <button
              key={String(chip.value)}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(chip.value)}
              className={cn(
                "shape-blade-sm relative min-h-10 border px-4 py-2 font-sans text-xs font-medium tracking-tight transition-colors duration-300",
                isActive
                  ? "border-accent font-semibold text-accent-ink"
                  : "border-white/12 bg-surface/70 text-muted hover:border-accent/45 hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-chip"
                  className="shape-blade-sm absolute inset-0 z-0 bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Fill className="relative z-10">{chip.label}</Fill>
            </button>
          );
        })}
      </div>

      {/* Faixas cinéticas horizontais full-width (Zero cards em grid) */}
      <motion.ul
        layout
        className="divide-y divide-white/10 border-y border-white/10"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ group, index }) => {
            const isHovered = hoveredIdx === index;
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
                className="group relative overflow-hidden py-8 transition-colors duration-500 md:py-10"
              >
                {/* Cortina luminosa diagonal no hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-accent/[0.06] via-accent/[0.03] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                />

                {/* Barra lateral ativa */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />

                <div className="relative z-10 grid gap-6 md:grid-cols-12 md:items-center md:gap-8 md:pl-5">
                  {/* Coluna 1: Índice vazado + Nome do domínio */}
                  <div className="flex items-baseline gap-4 md:col-span-5">
                    <span
                      aria-hidden="true"
                      className="stroke-display font-display text-4xl font-bold leading-none tracking-tighter select-none sm:text-5xl"
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent sm:text-3xl">
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

                  {/* Coluna 2: Tags técnicas com corte assimétrico .shape-blade-sm */}
                  <div className="md:col-span-6">
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item, i) => (
                        <li key={`${item}-${i}`}>
                          <Fill
                            className={cn(
                              "shape-blade-sm inline-block border px-3.5 py-1.5 font-mono text-xs transition-all duration-300",
                              isHovered
                                ? "border-accent/45 bg-accent/10 text-ink hover:bg-accent hover:text-accent-ink"
                                : "border-white/12 bg-surface/80 text-ink/90",
                            )}
                          >
                            {item}
                          </Fill>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Coluna 3: Contador técnico */}
                  <div className="hidden justify-end md:col-span-1 md:flex">
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                      [{String(group.items.length).padStart(2, "0")}]
                    </span>
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
