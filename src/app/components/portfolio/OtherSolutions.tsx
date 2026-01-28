import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "./types";

interface OtherSolutionsProps {
  projects: Project[];
}

export function OtherSolutions({ projects }: OtherSolutionsProps) {
  const secondaryProjects = projects.filter((p) =>
    ["automation", "architecture", "frontend"].includes(p.category),
  );

  const CATEGORY_LABEL: Record<Project["category"], string> = {
    featured: "Sistema",
    automation: "Automação",
    architecture: "Projeto de estudo",
    frontend: "Portfólio / UI",
  };

  return (
    <section
      id="solucoes"
      className="py-24 px-6 md:px-12 bg-gray-50 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            Outras soluções e automações
          </h2>
          <p className="text-xl" style={{ color: "#4A5568" }}>
            Ferramentas, automações e scripts desenvolvidos para otimizar
            processos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={`#case-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#C2A14D" }}
                  />
                  <span className="text-sm" style={{ color: "#4A5568" }}>
                    {CATEGORY_LABEL[project.category]}
                  </span>
                </div>

                <h3
                  className="text-xl mb-3"
                  style={{ color: "#0A0F24", fontWeight: 600 }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-base mb-4 leading-relaxed"
                  style={{ color: "#4A5568" }}
                >
                  {project.shortDescription}
                </p>

                <div
                  className="flex items-center gap-2 text-sm group-hover:gap-3 transition-all"
                  style={{ color: "#C2A14D" }}
                >
                  <span style={{ fontWeight: 600 }}>Ver detalhes</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
