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
        className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-accent px-5 font-sans text-[13px] font-semibold tracking-tight text-accent-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-colors duration-300 hover:bg-ink"
      >
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
        {copied ? "E-mail copiado!" : "Copiar e-mail"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "E-mail copiado para a área de transferência." : ""}
      </span>
    </>
  );
}
