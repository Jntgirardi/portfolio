"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="shape-blade group relative inline-flex min-h-11 items-stretch overflow-hidden border border-accent bg-accent font-sans text-[13px] font-bold tracking-tight text-white shadow-[0_10px_28px_-10px_rgba(255,61,31,0.5)] transition-all duration-300 hover:border-accent-2 hover:text-accent-ink active:scale-[0.98]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-[108%] -skew-x-12 bg-accent-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
        />
        <span className="relative z-10 flex items-center px-5 py-2.5">
          {copied ? "E-mail copiado!" : "Copiar e-mail"}
        </span>
        <span className="relative z-10 flex items-center justify-center border-l border-white/20 bg-black/15 px-3.5 group-hover:border-accent-ink/20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "ok" : "copy"}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex"
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "E-mail copiado para a área de transferência." : ""}
      </span>
    </>
  );
}
