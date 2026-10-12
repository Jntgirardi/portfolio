import { SkillsGrid } from "./skills-grid";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

export function Skills() {
  return (
    <section
      id="competencias"
      aria-labelledby="competencias-titulo"
      className="py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="competencias-titulo"
          index="03"
          label="Competências"
          telemetryTag="TECH STACK // FULL STACK MATRIX"
          title={
            <>
              Domínios e{" "}
              <span className="font-serif italic font-normal text-accent">
                tecnologias
              </span>
            </>
          }
        />
        <Reveal>
          <SkillsGrid />
        </Reveal>
      </div>
    </section>
  );
}
