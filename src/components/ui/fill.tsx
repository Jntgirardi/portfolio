import { cn, isPlaceholder } from "@/lib/site";

type FillProps = {
  children: string;
  className?: string;
  as?: "span" | "p" | "h3" | "dd" | "li" | "strong";
};

/**
 * Renderiza um texto do arquivo de conteúdo. Se o texto ainda for um
 * marcador "[PREENCHER: ...]", aplica um destaque tracejado para que ele
 * seja facilmente identificado antes da publicação.
 */
export function Fill({ children, className, as: Tag = "span" }: FillProps) {
  const pending = isPlaceholder(children);
  return (
    <Tag
      className={cn(pending && "placeholder", className)}
      data-placeholder={pending || undefined}
    >
      {children}
    </Tag>
  );
}
