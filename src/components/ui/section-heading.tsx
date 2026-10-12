import { Reveal } from "./reveal";

type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  telemetryTag?: string;
};

export function SectionHeading({
  id,
  index,
  label,
  title,
  telemetryTag,
}: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div className="flex items-center gap-3">
          <span className="shape-blade-sm inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 font-sans text-xs font-semibold tracking-tight text-accent">
            <span
              className="size-1.5 rotate-45 bg-accent"
              aria-hidden="true"
            />
            {label}
          </span>
          <span className="font-mono text-xs text-muted/70">/{index}</span>
        </div>

        {telemetryTag && (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/60">
            {telemetryTag}
          </span>
        )}
      </Reveal>

      <Reveal>
        <h2
          id={id}
          className="max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.035em]"
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
