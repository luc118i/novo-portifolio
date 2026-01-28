import { Code2, Database, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

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
                src="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NjkzNTU3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Desenvolvedor"
                className="w-full h-full object-cover"
                loading="lazy"
              />
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

            <div className="space-y-4 mb-10">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#4A5568" }}
              >
                Sou desenvolvedor focado em transformar rotinas operacionais
                complexas em sistemas digitais claros, organizados e eficientes.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{ color: "#4A5568" }}
              >
                Meu trabalho nasce sempre de um problema real: planilhas
                confusas, retrabalho manual, falta de padronização e dificuldade
                de controle. A partir disso, modelo dados, aplico regras e
                construo ferramentas que tornam a operação mais simples, rápida
                e confiável.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{ color: "#4A5568" }}
              >
                Já desenvolvi soluções para controle operacional, automações em
                larga escala no Google Sheets, portfólios profissionais e
                sistemas completos que substituem processos manuais por fluxos
                digitais bem definidos.
              </p>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "#F7FAFC" }}
                  >
                    <skill.icon
                      className="w-6 h-6"
                      style={{ color: "#C2A14D" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-lg mb-1"
                      style={{ color: "#0A0F24", fontWeight: 600 }}
                    >
                      {skill.title}
                    </h3>
                    <p className="text-base" style={{ color: "#4A5568" }}>
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
