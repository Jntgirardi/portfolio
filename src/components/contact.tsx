import { ArrowUpRight } from "lucide-react";
import { contact, profile, socials } from "@/content/profile";
import { cn } from "@/lib/site";
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
      <div
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0) 70%)",
        }}
        className="pointer-events-none absolute -right-24 bottom-10 size-[30rem] rounded-full"
      />
      <div
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(255,61,31,0.14) 0%, rgba(255,61,31,0) 70%)",
        }}
        className="pointer-events-none absolute -left-24 top-10 size-[30rem] rounded-full"
      />

      <div className="container-page relative z-10">
        <SectionHeading
          id="contato-titulo"
          index="05"
          label="Contato"
          title={
            <>
              {contact.heading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-serif italic font-normal text-accent-2">
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

        {/* Faixa monumental de contato direto com choque térmico Flame × Cyan */}
        <Reveal className="mt-12" delay={0.1}>
          <Magnetic strength={0.1} className="block">
            <a
              href={`mailto:${profile.email}`}
              data-cursor-label="ENVIAR E-MAIL ↗"
              className="group relative flex flex-wrap items-center justify-between gap-6 overflow-hidden border-y border-white/15 py-9 transition-colors duration-500 hover:border-accent-2 sm:py-12"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-accent/[0.14] via-accent-2/[0.1] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />

              <div className="relative z-10">
                <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-wider text-accent-2">
                  E-mail direto
                </span>
                <span className="text-accent-sheen break-all font-display text-[clamp(1.5rem,4vw,3.4rem)] font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {profile.email}
                </span>
              </div>

              <span className="shape-blade relative z-10 grid size-14 shrink-0 place-items-center border border-accent bg-accent text-white transition-all duration-300 group-hover:border-accent-2 group-hover:bg-accent-2 group-hover:text-accent-ink">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </Magnetic>

          {/* Ações em geometria Kinetic Blade alternando Flame e Cyan */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail email={profile.email} />
            {others.map((s, idx) => {
              const external = s.href.startsWith("http");
              const isCyan = idx % 2 === 0;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "shape-blade group relative inline-flex min-h-11 items-stretch overflow-hidden border bg-surface/90 font-sans text-[13px] font-bold tracking-tight text-ink transition-colors duration-300",
                    isCyan
                      ? "border-accent-2/40 hover:border-accent-2"
                      : "border-accent/40 hover:border-accent",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 -translate-x-[108%] -skew-x-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0",
                      isCyan ? "bg-accent-2/15" : "bg-accent/15",
                    )}
                  />
                  <span className="relative z-10 flex items-center gap-2.5 px-5 py-2.5">
                    <SocialIcon
                      icon={s.icon}
                      className={cn(
                        "size-3.5",
                        isCyan ? "text-accent-2" : "text-accent",
                      )}
                    />
                    <span>{s.label}</span>
                    {external && (
                      <span className="sr-only"> (abre em nova aba)</span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "relative z-10 flex items-center justify-center border-l px-3 transition-colors duration-300",
                      isCyan
                        ? "border-accent-2/25 bg-accent-2/10 text-accent-2 group-hover:bg-accent-2 group-hover:text-accent-ink"
                        : "border-accent/25 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white",
                    )}
                  >
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
