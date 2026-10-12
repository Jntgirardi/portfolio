import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";
import { profile, socials } from "@/content/profile";
import { isPlaceholder, siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  ...(isPlaceholder(profile.role) ? {} : { jobTitle: profile.role }),
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <noscript>
        <style>{`[data-reveal],[data-hero-char],[data-hero-fade],[data-project-card],[data-about-p],[data-about-fact],[data-timeline-item]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
      </noscript>
      <ScrollProgress />
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <VelocityMarquee
          variant="volt"
          items={[
            profile.name,
            "DESENVOLVEDOR FULL STACK",
            "ENGENHARIA DE SOFTWARE",
            "ESTROQUE SAAS",
            "CONTROLLER ARENA",
            "MONITOR DE VAGAS N8N",
          ]}
        />
        <About />
        <Projects />
        <VelocityMarquee
          variant="dark"
          direction={-1}
          items={[
            "PYTHON",
            "FASTAPI",
            "TYPESCRIPT",
            "REACT.JS",
            "POSTGRESQL",
            "MONGODB",
            "REDIS",
            "DOCKER",
            "ORACLE CLOUD",
            "N8N",
          ]}
        />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
