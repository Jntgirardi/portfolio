import { cn } from "@/lib/site";
import { Magnetic } from "./magnetic";

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  magnetic?: boolean;
};

/**
 * Botão autoral Dual-Clash Kinetic Blade:
 * - Primário: Vermelho-Chama (#FF3D1F) que é varrido por Ciano Elétrico (#00E5FF) no hover
 * - Secundário: Borda Ciano Elétrico (#00E5FF) que acende em Vermelho-Chama (#FF3D1F) no hover
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
        "shape-blade group relative inline-flex min-h-12 items-stretch overflow-hidden border font-sans text-[13px] font-bold tracking-tight transition-all duration-300 active:scale-[0.98]",
        isPrimary
          ? "border-accent bg-accent text-white shadow-[0_10px_30px_-10px_rgba(255,61,31,0.55)] hover:border-accent-2 hover:shadow-[0_10px_30px_-10px_rgba(0,229,255,0.55)]"
          : "border-accent-2/40 bg-surface/90 text-ink hover:border-accent hover:shadow-[0_10px_28px_-12px_rgba(255,61,31,0.45)]",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {/* Cortina diagonal com a cor oposta (choque térmico no hover) */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-[108%] -skew-x-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0",
          isPrimary ? "bg-accent-2" : "bg-accent",
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
              isPrimary ? "text-accent-ink" : "text-white",
            )}
          >
            {children}
          </span>
        </span>
      </span>

      {/* Compartimento separado do ícone */}
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "relative z-10 flex items-center justify-center border-l px-3.5 transition-colors duration-300",
            isPrimary
              ? "border-white/20 bg-black/15 text-white group-hover:border-accent-ink/20 group-hover:text-accent-ink"
              : "border-accent-2/25 bg-accent-2/10 text-accent-2 group-hover:border-white/20 group-hover:bg-black/15 group-hover:text-white",
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
