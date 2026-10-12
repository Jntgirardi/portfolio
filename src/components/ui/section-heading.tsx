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
      <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="shape-blade-sm inline-flex items-center gap-2 border border-accent-2/40 bg-accent-2/10 px-3.5 py-1 font-sans text-xs font-bold tracking-tight text-accent-2">
            <span
              className="size-1.5 rotate-45 bg-accent"
              aria-hidden="true"
            />
            {label}
          </span>
          <span className="font-display text-sm font-bold text-accent">
            {index}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="h-0.5 w-16 bg-gradient-to-r from-accent to-accent-2"
        />
      </Reveal>

      <Reveal>
        <h2
          id={id}
          className="max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.035em]"
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
