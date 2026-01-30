import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronDown,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { Project } from "./types";
import { CaseBackPill } from "./CaseBackPill";
import { CaseCta } from "./CaseCta";
import { AutomationShowcase } from "./AutomationShowcase";
import { CodeSamples } from "./CodeSamples";

interface CaseStudyProps {
  project: Project;
  nextProjectId?: string;
}

export function CaseStudy({ project, nextProjectId }: CaseStudyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [onDark, setOnDark] = useState(false);

  // 1) Define quando o CASE está "ativo" (pra evitar aparecer antes da hora)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let t: number | null = null;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (t) window.clearTimeout(t);
        t = window.setTimeout(() => {
          setIsActive(entry.isIntersecting);
        }, 80);
      },
      { threshold: [0, 0.01], rootMargin: "-25% 0px -60% 0px" },
    );

    obs.observe(el);
    return () => {
      if (t) window.clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  // 2) Define quando está em cima do HERO (pra alternar dark/light)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let current = false; // começa false se você quer header claro até entrar no hero

    const obs = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio;

        // liga "dark" só quando estiver bem dentro do hero
        if (!current && r >= 0.35) {
          current = true;
          setOnDark(true);
        }

        // desliga "dark" só quando estiver bem fora do hero
        if (current && r <= 0.12) {
          current = false;
          setOnDark(false);
        }
      },
      {
        threshold: [0, 0.12, 0.35, 1],
        rootMargin: "-64px 0px -70% 0px",
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let t: number | null = null;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // ✅ isActive: só ativa quando o topo do HERO estiver “chegando”
        // Ajuste esse gatilho conforme seu headerHeight
        const top = entry.boundingClientRect.top;
        const headerH = 64; // ajuste se seu sticky tem outra altura
        const shouldBeActive =
          top <= headerH + 8 && entry.intersectionRatio > 0;

        if (t) window.clearTimeout(t);
        t = window.setTimeout(() => setIsActive(shouldBeActive), 60);
      },
      {
        threshold: [0, 0.01, 0.1],
        // rootMargin não precisa ser agressivo aqui, porque usamos boundingClientRect.top
        rootMargin: "0px 0px 0px 0px",
      },
    );

    obs.observe(el);
    return () => {
      if (t) window.clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let current = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio;

        // ✅ histerese (anti tremor)
        if (!current && r >= 0.35) {
          current = true;
          setOnDark(true);
        } else if (current && r <= 0.12) {
          current = false;
          setOnDark(false);
        }
      },
      {
        threshold: [0, 0.12, 0.35, 1],
        rootMargin: "-64px 0px -70% 0px",
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`case-${project.id}`}
      className="bg-white scroll-mt-28"
      aria-label={`Estudo de caso: ${project.title}`}
    >
      <CaseBackPill onDark={onDark} active={isActive} />

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative py-20 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#0A0F24" }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-6"
              style={{
                backgroundColor: "rgba(194, 161, 77, 0.2)",
                color: "#C2A14D",
              }}
            >
              Estudo de caso
            </div>

            <h2
              className="text-4xl md:text-6xl mb-6"
              style={{
                color: "#FFFFFF",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h2>

            <p
              className="text-xl md:text-2xl leading-relaxed"
              style={{ color: "#A0AEC0" }}
            >
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Image */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="relative -mt-16 mb-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={project.screenshots[0]}
                alt={project.title}
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        {/* Problem */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl mb-6"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            O problema
          </h3>
          <p
            className="text-lg leading-relaxed mb-4"
            style={{ color: "#4A5568" }}
          >
            {project.problem}
          </p>
        </div>

        {/* Context */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl mb-6"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            Contexto
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: "#4A5568" }}>
            {project.context}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl mb-6"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            A solução
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: "#4A5568" }}>
            {project.solution}
          </p>
        </div>

        {project.codeSamples?.length ? (
          <>
            <AutomationShowcase samples={project.codeSamples} />
            <CodeSamples samples={project.codeSamples} />
          </>
        ) : null}

        {/* Features */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl mb-8"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            Principais funcionalidades
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50"
              >
                <Layers
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: "#C2A14D" }}
                />
                <span className="text-base" style={{ color: "#4A5568" }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl mb-8"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            Benefícios gerados
          </h3>
          <div className="grid gap-4">
            {project.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl border-l-4"
                style={{ backgroundColor: "#F7FAFC", borderColor: "#C2A14D" }}
              >
                <CheckCircle2
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: "#C2A14D" }}
                />
                <span className="text-lg" style={{ color: "#0A0F24" }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="border-t border-gray-200 pt-12">
          <h4
            className="text-xl mb-6"
            style={{ color: "#4A5568", fontWeight: 600 }}
          >
            Stack técnica utilizada
          </h4>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: "#F7FAFC",
                  color: "#4A5568",
                  border: "1px solid #E2E8F0",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {/* ✅ Fechamento / CTA final (sem redundância) */}
        <CaseCta nextProjectId={nextProjectId} />

        {/* Links do projeto */}
        {project.links?.length ? (
          <div className="mt-12">
            <h4
              className="text-xl mb-6"
              style={{ color: "#4A5568", fontWeight: 600 }}
            >
              Links do projeto
            </h4>

            <div className="flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50 transition-all"
                  style={{
                    color: "#0A0F24",
                    borderColor: "#E2E8F0",
                    fontWeight: 600,
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    className="w-4 h-4"
                    style={{ color: "#C2A14D" }}
                  />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
