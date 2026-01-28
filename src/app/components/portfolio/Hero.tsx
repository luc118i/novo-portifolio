import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

interface HeroProps {
  onProjectsClick: () => void;
}

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export function Hero() {
  return (
    <Section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#0A0F24" }}
      />

      {/* Pattern */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-8 tracking-tight text-white font-semibold leading-[1.15]">
            Transformando problemas reais
            <br />
            em sistemas digitais funcionais
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-slate-300">
            Projetos desenvolvidos a partir de necessidades operacionais reais,
            aplicando tecnologia para organizar, automatizar e dar clareza a
            processos complexos.
          </p>

          {/* AQUI MUDA TUDO */}
          <a
            href="#projetos"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundColor: "#C2A14D",
              color: "#0A0F24",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            Ver projetos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </Section>
  );
}
