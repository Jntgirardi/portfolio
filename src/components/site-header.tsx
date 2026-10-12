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

  const headerSocials = socials.filter(
    (s) => s.icon === "github" || s.icon === "linkedin",
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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
            ? "border-b border-white/[0.08] bg-bg"
            : scrolled
              ? "border-b border-white/[0.06] bg-bg/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          {/* Assinatura vetorial autoral (sem caixinha de iniciais genérica de IA) */}
          <a
            href="#inicio"
            className="group flex items-center gap-3.5"
            aria-label={`${profile.name} — voltar ao início`}
            onClick={() => open && close(false)}
          >
            {/* Monograma geométrico vetorial customizado (estilo Lando Norris / F1) */}
            <svg
              viewBox="0 0 44 28"
              className="h-6 w-auto overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              {/* Asa esquerda dinâmica (J estilizado em ângulo de velocidade) */}
              <path
                d="M16 2 L22 2 L15 22 C13.8 25.2 11.2 26 7.5 26 L2 26 L4 20.5 L8.5 20.5 C10 20.5 10.8 19.8 11.4 18 L16 2 Z"
                className="fill-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5"
              />
              {/* Lâmina geométrica direita em esmeralda (G aerodinâmico) */}
              <path
                d="M26 2 L42 2 L40 7.5 L29.5 7.5 L26.2 17 C25.6 18.8 26.2 20.5 28.2 20.5 L34.5 20.5 L35.8 16.5 L30.5 16.5 L32 11.5 L42.5 11.5 L38.2 24 C37.4 25.4 36 26 33.8 26 L24.5 26 C20.5 26 19.2 23.2 20.6 19 L26 2 Z"
                className="fill-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              />
              {/* Traço diagonal de telemetria entre as lâminas */}
              <line
                x1="23.5"
                y1="0"
                x2="16.5"
                y2="28"
                stroke="#1ae57e"
                strokeWidth="1.25"
                strokeOpacity="0.45"
                className="transition-opacity duration-300 group-hover:opacity-100"
              />
            </svg>

            {/* Lockup cinético com rotação vertical no hover (só exibe o sobrenome quando rola ou passa o mouse, sem repetir o título gigante do Hero) */}
            <div className="hidden h-4 overflow-hidden font-mono text-[11px] uppercase tracking-[0.22em] sm:block">
              <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4">
                <span className="flex h-4 items-center gap-1.5 text-ink/90">
                  <span className="font-bold">GIRARDI</span>
                  <span className="text-accent">//</span>
                  <span className="text-muted">DEV</span>
                </span>
                <span className="flex h-4 items-center gap-1.5 font-semibold text-accent">
                  <span>INÍCIO</span>
                  <span>↺</span>
                </span>
              </div>
            </div>
          </a>

          {/* Navegação principal */}
          <nav
            aria-label="Principal"
            className="shape-blade hidden border border-white/[0.09] bg-[#0a0d11]/90 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl md:block"
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
                        "relative flex items-center gap-2 px-4 py-1.5 font-sans text-[13px] font-medium tracking-tight transition-colors duration-300",
                        isActive ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="shape-blade-sm absolute inset-0 z-0 border border-accent/40 bg-accent/10"
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
                          className="relative z-10 size-1.5 rotate-45 bg-accent"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Acesso rápido ao GitHub e LinkedIn */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-4 md:flex">
              {headerSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (abre em nova aba)`}
                  className="group inline-flex items-center gap-1.5 font-sans text-xs font-medium text-muted transition-colors duration-300 hover:text-ink"
                >
                  <SocialIcon
                    icon={s.icon}
                    className="size-3.5 text-accent transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="link-underline">{s.label}</span>
                </a>
              ))}
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="shape-blade-sm grid size-10 place-items-center border border-white/15 bg-surface text-ink transition-colors hover:border-accent/60 hover:text-accent md:hidden"
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
            className="telemetry-grid flex h-[calc(100dvh-4rem)] flex-col justify-between overflow-y-auto bg-bg md:hidden"
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
                        className="size-5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                    className="shape-blade-sm flex min-h-10 items-center gap-2 border border-line bg-surface px-4 font-sans text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
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
