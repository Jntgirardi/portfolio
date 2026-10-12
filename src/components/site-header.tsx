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
          {/* Monograma vetorial Dual-Clash (#00E5FF Ciano × #FF3D1F Flame) */}
          <a
            href="#inicio"
            className="group flex items-center gap-3.5"
            aria-label={`${profile.name} — voltar ao início`}
            onClick={() => open && close(false)}
          >
            <svg
              viewBox="0 0 44 28"
              className="h-6 w-auto overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              {/* Asa esquerda em Ciano Elétrico (#00E5FF) */}
              <path
                d="M16 2 L22 2 L15 22 C13.8 25.2 11.2 26 7.5 26 L2 26 L4 20.5 L8.5 20.5 C10 20.5 10.8 19.8 11.4 18 L16 2 Z"
                fill="#00e5ff"
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5"
              />
              {/* Lâmina direita em Vermelho-Chama (#FF3D1F) */}
              <path
                d="M26 2 L42 2 L40 7.5 L29.5 7.5 L26.2 17 C25.6 18.8 26.2 20.5 28.2 20.5 L34.5 20.5 L35.8 16.5 L30.5 16.5 L32 11.5 L42.5 11.5 L38.2 24 C37.4 25.4 36 26 33.8 26 L24.5 26 C20.5 26 19.2 23.2 20.6 19 L26 2 Z"
                fill="#ff3d1f"
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              />
            </svg>

            <div className="hidden h-4 overflow-hidden font-display text-xs font-bold uppercase tracking-wider sm:block">
              <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4">
                <span className="flex h-4 items-center gap-1.5 text-ink">
                  <span>GIRARDI</span>
                  <span className="text-accent">×</span>
                  <span className="text-accent-2">FULL STACK</span>
                </span>
                <span className="flex h-4 items-center gap-1.5 text-accent-2">
                  <span>VOLTAR AO TOPO</span>
                </span>
              </div>
            </div>
          </a>

          {/* Navegação principal com destaque em duas cores */}
          <nav
            aria-label="Principal"
            className="shape-blade hidden border border-white/[0.09] bg-[#0b0c14]/90 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl md:block"
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
                        "relative flex items-center gap-2 px-4 py-1.5 font-sans text-[13px] font-semibold tracking-tight transition-colors duration-300",
                        isActive ? "text-white" : "text-muted hover:text-ink",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="shape-blade-sm absolute inset-0 z-0 border border-accent/60 bg-gradient-to-r from-accent/25 to-accent-2/20"
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
                          className="relative z-10 size-1.5 rotate-45 bg-accent-2"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Links diretos para GitHub e LinkedIn */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-5 md:flex">
              {headerSocials.map((s, idx) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (abre em nova aba)`}
                  className="group inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted transition-colors duration-300 hover:text-ink"
                >
                  <SocialIcon
                    icon={s.icon}
                    className={cn(
                      "size-3.5 transition-transform duration-300 group-hover:scale-110",
                      idx === 0 ? "text-accent" : "text-accent-2",
                    )}
                  />
                  <span className="link-underline">{s.label}</span>
                </a>
              ))}
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="shape-blade-sm grid size-10 place-items-center border border-white/15 bg-surface text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
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
                        className="size-5 text-accent-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <ul className="container-page flex flex-wrap gap-2.5 py-8">
              {socials.map((s, idx) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="shape-blade-sm flex min-h-10 items-center gap-2 border border-line bg-surface px-4 font-sans text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    <SocialIcon
                      icon={s.icon}
                      className={cn(
                        "size-3.5",
                        idx % 2 === 0 ? "text-accent" : "text-accent-2",
                      )}
                    />
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
