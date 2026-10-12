"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, profile, socials } from "@/content/profile";
import { cn } from "@/lib/site";
import { SocialIcon } from "./ui/icons";

type SectionId = (typeof navItems)[number]["id"];

function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const els = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-42% 0px -48% 0px" },
    );
    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.35) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const firstLink =
      headerRef.current?.querySelector<HTMLElement>("[data-menu-link]");
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !headerRef.current) return;
      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ).filter((el) => el.offsetParent !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) close(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          open
            ? "border-b border-white/[0.07] bg-bg"
            : scrolled
              ? "border-b border-white/[0.06] bg-bg/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          {/* Marca pessoal clean e moderna */}
          <a
            href="#inicio"
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — voltar ao início`}
            onClick={() => open && close(false)}
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] font-display text-xs font-bold tracking-tight text-accent transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-accent-ink"
            >
              {profile.initials}
            </span>
            <span className="hidden font-sans text-sm font-semibold tracking-tight text-ink sm:inline">
              {profile.shortName}
            </span>
          </a>

          {/* Navegação em cápsula de vidro contemporânea */}
          <nav
            aria-label="Principal"
            className="hidden rounded-full border border-white/[0.08] bg-[#0b0d10]/85 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:block"
          >
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[13px] font-medium tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-ink"
                          : "text-muted hover:text-ink",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 z-0 rounded-full border border-white/[0.09] bg-white/[0.07]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="relative z-10 size-1.5 rounded-full bg-accent"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Ação rápida clean à direita */}
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-sans text-xs font-medium text-ink transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-ink md:inline-flex"
            >
              <span className="size-1.5 rounded-full bg-accent transition-colors" />
              <span>Falar comigo</span>
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-surface text-ink transition-colors hover:border-accent/50 hover:text-accent md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? (
                    <X className="size-4" aria-hidden />
                  ) : (
                    <Menu className="size-4" aria-hidden />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="flex h-[calc(100dvh-4rem)] flex-col justify-between overflow-y-auto bg-bg md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Menu móvel" className="container-page pt-8">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.04,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-line"
                  >
                    <a
                      data-menu-link
                      href={`#${item.id}`}
                      onClick={() => close(false)}
                      className="group flex items-center justify-between py-5 font-display text-3xl font-bold tracking-tight text-ink transition-colors hover:text-accent"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <ul className="container-page flex flex-wrap gap-2.5 py-8">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 font-sans text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <SocialIcon icon={s.icon} className="size-3.5 text-accent" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
