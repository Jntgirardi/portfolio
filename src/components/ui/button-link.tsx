import { cn } from "@/lib/site";
import { Magnetic } from "./magnetic";

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  magnetic?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 font-sans text-[13px] font-semibold tracking-tight transition-all duration-300 active:scale-[0.98] min-h-11";

const variants = {
  primary:
    "bg-accent text-accent-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-ink hover:text-accent-ink",
  secondary:
    "border border-white/10 bg-white/[0.04] text-ink/90 hover:border-white/25 hover:bg-white/[0.08] hover:text-ink",
} as const;

/** Botão contemporâneo em formato pílula com tipografia Plus Jakarta Sans clean. */
export function ButtonLink({
  variant = "primary",
  icon,
  magnetic = true,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = rest.href?.startsWith("http");
  const anchor = (
    <a
      className={cn(base, variants[variant], className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          {icon}
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic strength={0.22}>{anchor}</Magnetic> : anchor;
}
