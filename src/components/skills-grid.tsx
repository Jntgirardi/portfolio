"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "@/content/profile";
import { cn } from "@/lib/site";
import { Fill } from "./ui/fill";

export function SkillsGrid() {
  const [selected, setSelected] = useState<number | "all">("all");
  const visible = skillGroups
    .map((group, index) => ({ group, index }))
    .filter(({ index }) => selected === "all" || selected === index);

  const chips: Array<{ value: number | "all"; label: string }> = [
    { value: "all", label: "Todas" },
    ...skillGroups.map((g, i) => ({ value: i, label: g.name })),
  ];

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar competências por grupo"
        className="mb-10 flex flex-wrap gap-2"
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
                "relative min-h-10 rounded-full border px-4 py-2 font-sans text-xs font-medium tracking-tight transition-colors duration-300",
                isActive
                  ? "border-accent font-semibold text-accent-ink"
                  : "border-white/10 bg-surface/80 text-muted hover:border-white/25 hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-chip"
                  className="absolute inset-0 z-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Fill className="relative z-10">{chip.label}</Fill>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ group, index }) => (
            <motion.li
              key={index}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "clip-corner group relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent/45 md:p-8",
                visible.length === 1 && "sm:col-span-2 lg:col-span-3",
              )}
            >
              <div>
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-line pb-4">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    <Fill>{group.name}</Fill>
                  </h3>
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-accent">
                    {group.items.length}
                  </span>
                </div>

                {group.description && (
                  <Fill
                    as="p"
                    className="mb-6 font-sans text-sm leading-relaxed text-muted"
                  >
                    {group.description}
                  </Fill>
                )}
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <li key={`${item}-${i}`}>
                    <Fill className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 font-sans text-xs font-medium text-ink/90 transition-colors duration-300 hover:border-accent/50 hover:text-accent">
                      {item}
                    </Fill>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
