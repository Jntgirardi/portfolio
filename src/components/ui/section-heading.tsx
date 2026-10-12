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
}: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="mb-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-sans text-xs font-semibold tracking-tight text-accent">
          <span
            className="size-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          {label}
        </span>
        <span className="font-sans text-xs font-medium text-muted/60">
          {index}
        </span>
      </Reveal>

      <Reveal>
        <h2
          id={id}
          className="max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.035em]"
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
