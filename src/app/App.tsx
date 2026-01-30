import { Hero } from "@/app/components/portfolio/Hero";
import { FeaturedProjects } from "@/app/components/portfolio/FeaturedProjects";
import { CaseStudy } from "@/app/components/portfolio/CaseStudy";
import { OtherSolutions } from "@/app/components/portfolio/OtherSolutions";
import { About } from "@/app/components/portfolio/About";
import { Contact } from "@/app/components/portfolio/Contact";
import { projects } from "@/app/components/portfolio/data";

import { SectionGuide } from "@/app/components/ui/SectionGuide";

export default function App() {
  const withCase = projects;

  return (
    <div className="min-h-screen">
      <Hero />

      <SectionGuide />

      <FeaturedProjects projects={projects} />
      <OtherSolutions projects={projects} />

      {/* Estudos de caso na mesma página (âncoras) */}
      {withCase.map((p, i) => (
        <CaseStudy key={p.id} project={p} nextProjectId={withCase[i + 1]?.id} />
      ))}

      <About />
      <Contact />

      <footer className="py-8 px-6 md:px-12 border-t border-gray-200">
        <div
          className="max-w-7xl mx-auto text-center"
          style={{ color: "#A0AEC0" }}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Portfólio de Desenvolvedor. Sistemas
            digitais que resolvem problemas reais.
          </p>
        </div>
      </footer>
    </div>
  );
}
