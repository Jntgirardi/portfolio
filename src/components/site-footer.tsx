import { ArrowUp } from "lucide-react";
import { navItems, profile, socials } from "@/content/profile";
import { Fill } from "./ui/fill";
import { SocialIcon } from "./ui/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-bold tracking-tight">
            {profile.name}
          </p>
          <p className="mt-2 font-sans text-sm font-medium text-accent">
            <Fill>{profile.role}</Fill>
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
            Navegação
          </h2>
          <ul className="space-y-2.5 font-sans text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="link-underline transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
            Redes e contato
          </h2>
          <ul className="space-y-3 font-sans text-sm text-muted">
            {socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-3 transition-colors hover:text-ink"
                  >
                    <SocialIcon
                      icon={s.icon}
                      className="size-4 text-accent transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="link-underline">{s.handle}</span>
                    {external && (
                      <span className="sr-only">
                        {" "}
                        ({s.label}, abre em nova aba)
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-sans text-xs text-muted">
        <p>
          © {year} {profile.name.replace(/\.$/, "")}. Todos os direitos
          reservados.
        </p>
        <a
          href="#inicio"
          className="group inline-flex min-h-11 items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
        >
          Voltar ao topo
          <ArrowUp
            aria-hidden="true"
            className="size-3.5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
