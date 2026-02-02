import { Code2, Database, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";
import profileImage from "@/assets/images/profile/lucas-profile.webp";

import { ProfessionalSignature } from "./ProfessionalSignature";

export function About() {
  const skills = [
    {
      icon: Code2,
      title: "Sistemas para Operações Reais",
      description:
        "Desenvolvimento de sistemas digitais baseados em problemas operacionais concretos, não em ideias abstratas.",
    },
    {
      icon: Database,
      title: "Organização e Modelagem de Dados",
      description:
        "Estruturação de dados complexos para dar clareza, padronização e rastreabilidade às operações.",
    },
    {
      icon: Zap,
      title: "Automação Inteligente de Processos",
      description:
        "Criação de automações que eliminam tarefas repetitivas e aceleram rotinas críticas do dia a dia.",
    },
  ];

  return (
    <Section id="sobre" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={profileImage}
                alt="Lucas Luiz Inacio da Silva"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mt-8">
              <a
                href="#contato"
                className="
                        inline-flex items-center gap-3
                        px-6 py-3
                        rounded-xl
                        border border-[#0A0F24]/15
                        bg-[#0A0F24]
                        text-white
                        text-sm tracking-wide
                        transition-all duration-300
                        hover:gap-4 hover:bg-[#0A0F24]/90
                        shadow-sm
                      "
              >
                Entrar em contato
                <span className="text-[#C2A14D]">→</span>
              </a>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ color: "#0A0F24", fontWeight: 600 }}
            >
              Sobre
            </h2>

            <div className="mb-6 -mt-1">
              <ProfessionalSignature birthDate="1998-01-19" />
            </div>

            <div className="space-y-4 mb-10">
              <p className="text-lg leading-relaxed text-[#4A5568]">
                Desenvolvedor focado em transformar rotinas operacionais
                complexas em sistemas digitais claros, padronizados e
                rastreáveis. Meu trabalho parte sempre de problemas reais:
                processos manuais, planilhas desorganizadas, retrabalho e falta
                de controle.
              </p>

              <p className="text-lg leading-relaxed text-[#4A5568]">
                A partir disso, modelo dados, aplico regras operacionais e
                construo ferramentas que tornam a operação mais simples, rápida
                e confiável, substituindo fluxos manuais por estruturas digitais
                bem definidas.
              </p>
            </div>

            <div className="mt-8 divide-y divide-[#0A0F24]/10 rounded-2xl border border-[#0A0F24]/10 bg-white/60 backdrop-blur-sm">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-5 px-6 py-6">
                  <div className="p-3 rounded-xl border border-[#0A0F24]/10 bg-[#F7FAFC]">
                    <skill.icon
                      className="w-6 h-6"
                      style={{ color: "#C2A14D" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-[17px] mb-1 tracking-tight"
                      style={{ color: "#0A0F24", fontWeight: 600 }}
                    >
                      {skill.title}
                    </h3>
                    <p
                      className="text-[15px] leading-relaxed"
                      style={{ color: "#4A5568" }}
                    >
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
