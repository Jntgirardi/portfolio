import { ArrowUpRight } from "lucide-react";
import { contact, profile, socials } from "@/content/profile";
import { CopyEmail } from "./copy-email";
import { SocialIcon } from "./ui/icons";
import { Magnetic } from "./ui/magnetic";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

export function Contact() {
  const others = socials.filter((s) => s.icon !== "mail");

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="contato-titulo"
          index="05"
          label="Contato"
          telemetryTag="DIRECT CHANNEL // LET'S BUILD"
          title={
            <>
              {contact.heading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-serif italic font-normal text-accent">
                {contact.heading.split(" ").slice(-1)}
              </span>
            </>
          }
        />

        <Reveal delay={0.05}>
          <p className="max-w-xl font-sans text-base leading-relaxed text-muted sm:text-lg">
            {contact.body}
          </p>
        </Reveal>

        {/* Faixa monumental de contato direto (substitui o card fechado) */}
        <Reveal className="mt-12" delay={0.1}>
          <Magnetic strength={0.1} className="block">
            <a
              href={`mailto:${profile.email}`}
              data-cursor-label="ENVIAR E-MAIL ↗"
              className="group relative flex flex-wrap items-center justify-between gap-6 overflow-hidden border-y border-white/15 py-9 transition-colors duration-500 hover:border-accent sm:py-12"
            >
              {/* Cortina diagonal luminosa no hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-accent/[0.08] via-accent/[0.03] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />

              <div className="relative z-10">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {"// CANAL DIRETO"}
                </span>
                <span className="break-all font-display text-[clamp(1.5rem,4vw,3.4rem)] font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent">
                  {profile.email}
                </span>
              </div>

              <span className="shape-blade relative z-10 grid size-14 shrink-0 place-items-center border border-accent/45 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </Magnetic>

          {/* Ações em geometria Kinetic Blade (.shape-blade) */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail email={profile.email} />
            {others.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="shape-blade group relative inline-flex min-h-11 items-stretch overflow-hidden border border-white/15 bg-surface/90 font-sans text-[13px] font-medium tracking-tight text-ink/90 transition-colors duration-300 hover:border-accent/60 hover:text-accent"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-[108%] -skew-x-12 bg-accent/12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                  />
                  <span className="relative z-10 flex items-center gap-2.5 px-5 py-2.5">
                    <SocialIcon icon={s.icon} className="size-3.5 text-accent" />
                    <span>{s.label}</span>
                    {external && (
                      <span className="sr-only"> (abre em nova aba)</span>
                    )}
                  </span>
                  <span className="relative z-10 flex items-center justify-center border-l border-white/10 bg-white/[0.02] px-3 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-ink">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
