"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Atraso em segundos. */
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  y?: number;
};

/**
 * Entrada suave ao rolar: fade + deslocamento curto, executada uma única vez.
 * Com prefers-reduced-motion, o MotionConfig global remove o deslocamento.
 */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
