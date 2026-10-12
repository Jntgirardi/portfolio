import { cn } from "@/lib/site";
import { Magnetic } from "./magnetic";

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  magnetic?: boolean;
};

/**
 * Botão autoral "Kinetic Blade" (.shape-blade):
 * - Geometria assimétrica aerodinâmica (16px / 3px / 16px / 3px — nem pílula circular, nem quadrado comum)
 * - Cortina diagonal (-skew-x-12) que varre o botão no hover
 * - Efeito slot-machine 3D no texto (rola verticalmente ao passar o mouse)
 * - Compartimento técnico separado para o ícone à direita
 */
export function ButtonLink({
  variant = "primary",
  icon,
  magnetic = true,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = rest.href?.startsWith("http");
  const isPrimary = variant === "primary";

  const anchor = (
    <a
      className={cn(
        "shape-blade group relative inline-flex min-h-12 items-stretch overflow-hidden border font-sans text-[13px] font-semibold tracking-tight transition-all duration-300 active:scale-[0.98]",
        isPrimary
          ? "border-accent bg-accent text-accent-ink shadow-[0_0_28px_-10px_rgba(26,229,126,0.45)] hover:border-ink"
          : "border-white/15 bg-surface/90 text-ink hover:border-accent/60",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {/* Cortina diagonal cinética no hover */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-[108%] -skew-x-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0",
          isPrimary ? "bg-ink" : "bg-accent/15",
        )}
      />

      {/* Micro-marcador técnico no canto superior direito (3px) */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-1 top-1 size-1.5 border-r border-t transition-colors duration-300",
          isPrimary
            ? "border-accent-ink/40"
            : "border-accent/60 group-hover:border-accent",
        )}
      />

      {/* Texto com efeito de rotação vertical (slot-machine) no hover */}
      <span className="relative z-10 flex items-center px-5 py-3">
        <span className="relative block overflow-hidden leading-none">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0",
              isPrimary ? "text-accent-ink" : "text-accent",
            )}
          >
            {children}
          </span>
        </span>
      </span>

      {/* Compartimento separado de ação do ícone */}
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "relative z-10 flex items-center justify-center border-l px-3.5 transition-colors duration-300",
            isPrimary
              ? "border-accent-ink/15 bg-black/[0.06]"
              : "border-white/10 bg-white/[0.02] text-accent group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-ink",
          )}
        >
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic strength={0.22}>{anchor}</Magnetic> : anchor;
}
