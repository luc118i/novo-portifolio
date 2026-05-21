import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Sparkles, ArrowUp } from "lucide-react";

import { Hero } from "@/app/components/portfolio/Hero";
import { FeaturedProjects } from "@/app/components/portfolio/FeaturedProjects";
import { OtherSolutions } from "@/app/components/portfolio/OtherSolutions";
import { CaseStudy } from "@/app/components/portfolio/CaseStudy";
import { About } from "@/app/components/portfolio/About";
import { Contact } from "@/app/components/portfolio/Contact";
import { SectionGuide } from "@/app/components/ui/SectionGuide";
import { ScrollToHash } from "@/app/components/ui/ScrollToHash";

import { projects as staticProjects } from "@/app/components/portfolio/data";
import { useAICases } from "@/app/components/portfolio/ai-studio/useAICases";
import { useStudioOverrides } from "@/app/components/portfolio/ai-studio/useStudioOverrides";
import { AIStudio } from "@/app/components/portfolio/ai-studio/AIStudio";
import { Intro } from "@/app/components/portfolio/Intro";
import { Project } from "./components/portfolio/types";
import publishedOverrides from "@/data/studio-overrides.json";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-full shadow-lg cursor-pointer active:scale-90 transition-transform"
          style={{
            background: "#0A0F24",
            border: "1px solid rgba(194,161,77,0.35)",
            color: "#C2A14D",
          }}
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function useStudioAccess() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.has("studio"));
  }, []);
  return enabled;
}

function useAllProjects(): Project[] {
  const { cases } = useAICases();
  const { overrides } = useStudioOverrides();
  const publishedHidden = new Set<string>(publishedOverrides.hidden);
  // AI cases do localStorage que ainda não foram publicados no JSON
  // Excluir IDs ocultos via studio overrides (build-time) para evitar re-adição
  const staticIds = new Set(staticProjects.map((p) => p.id));
  const localOnlyAI = cases
    .map((c) => c.project)
    .filter((p) => !staticIds.has(p.id) && !publishedHidden.has(p.id));
  return [...staticProjects, ...localOnlyAI]
    .filter((p) => !overrides.hidden.includes(p.id))
    .map((p) => {
      const edit = overrides.edits[p.id];
      return edit ? { ...p, ...edit } : p;
    });
}

// ─── Página inicial ───────────────────────────────────────────
function HomePage() {
  const allProjects = useAllProjects();
  const studioEnabled = useStudioAccess();
  const [studioOpen, setStudioOpen] = useState(false);
  const { cases } = useAICases();

  const [introDone, setIntroDone] = useState(() =>
    Boolean(sessionStorage.getItem("li_intro"))
  );

  const handleIntroDone = () => {
    sessionStorage.setItem("li_intro", "1");
    setIntroDone(true);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <SectionGuide />
      <FeaturedProjects projects={allProjects} />
      <OtherSolutions projects={allProjects} />
      <About />
      <Contact />

      <footer className="py-8 px-6 md:px-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center space-y-1" style={{ color: "#A0AEC0" }}>
          <p className="text-sm font-medium" style={{ color: "#0A0F24" }}>
            Lucas Inácio Soluções
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} · Sistemas digitais que resolvem problemas reais.
          </p>
          <a
            href="https://github.com/luc118i"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs hover:underline transition-colors"
            style={{ color: "#C2A14D" }}
          >
            github.com/luc118i
          </a>
        </div>
      </footer>

      <ScrollToTopButton />

      {studioEnabled && (
        <button
          onClick={() => setStudioOpen(true)}
          className="fixed bottom-6 right-6 z-[9998] flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm cursor-pointer transition-all hover:scale-105 hover:brightness-110 active:scale-95 shadow-xl"
          style={{
            background: "linear-gradient(135deg, #C2A14D, #a88636)",
            color: "#0A0F24",
            boxShadow: "0 8px 32px rgba(194,161,77,0.4)",
          }}
          title="AI Studio"
        >
          <Sparkles className="w-4 h-4" />
          AI Studio
          {cases.length > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-[#0A0F24]/30 text-xs flex items-center justify-center">
              {cases.length}
            </span>
          )}
        </button>
      )}

      <AnimatePresence>
        {studioOpen && <AIStudio onClose={() => setStudioOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!introDone && <Intro onDone={handleIntroDone} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Página de projeto individual ────────────────────────────
function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const allProjects = useAllProjects();

  const projectIndex = allProjects.findIndex((p) => p.id === id);
  const project = allProjects[projectIndex];
  const nextProject = allProjects[projectIndex + 1];

  if (!project) return <Navigate to="/" replace />;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CaseStudy project={project} nextProjectId={nextProject?.id} />
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos/:id" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
