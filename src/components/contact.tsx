import { ArrowUpRight } from "lucide-react";
import { contact, profile, socials } from "@/content/profile";
import { CopyEmail } from "./copy-email";
import { SocialIcon } from "./ui/icons";
import { Magnetic } from "./ui/magnetic";
import { Reveal } from "./ui/reveal";

export function Contact() {
  const others = socials.filter((s) => s.icon !== "mail");

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="container-page">
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-sans text-xs font-semibold tracking-tight text-accent">
            <span
              className="size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            Contato
          </span>
          <span className="font-sans text-xs font-medium text-muted/60">
            05
          </span>
        </Reveal>

        <Reveal>
          <h2
            id="contato-titulo"
            className="font-display text-[clamp(2.5rem,7vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.035em]"
          >
            {contact.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-serif italic font-normal text-accent">
              {contact.heading.split(" ").slice(-1)}
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5" delay={0.05}>
            <p className="max-w-md font-sans text-base leading-relaxed text-muted sm:text-lg">
              {contact.body}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <Magnetic strength={0.12} className="block">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-label="E-MAIL ↗"
                className="clip-corner group flex items-center justify-between gap-4 border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/50 sm:p-8"
              >
                <div>
                  <span className="mb-2 block font-sans text-xs font-semibold text-accent">
                    E-mail direto
                  </span>
                  <span className="break-all font-display text-[clamp(1.25rem,2.8vw,2.2rem)] font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {profile.email}
                  </span>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/35 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>
              </a>
            </Magnetic>

            <div className="mt-5 flex flex-wrap gap-2.5">
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
                    className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-surface px-5 font-sans text-[13px] font-medium tracking-tight text-ink/90 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                  >
                    <SocialIcon icon={s.icon} className="size-3.5 text-accent" />
                    <span>{s.label}</span>
                    {external && (
                      <span className="sr-only"> (abre em nova aba)</span>
                    )}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
