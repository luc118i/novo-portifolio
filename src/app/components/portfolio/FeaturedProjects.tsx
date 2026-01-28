import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "./types";
import { Section } from "./Section";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter((p) => p.category === "featured");

  return (
    <Section id="projetos" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ color: "#0A0F24", fontWeight: 600 }}
          >
            Projetos em destaque
          </h2>
          <p className="text-xl" style={{ color: "#4A5568" }}>
            Sistemas desenvolvidos para resolver problemas operacionais reais
          </p>
        </div>

        <div className="grid gap-8">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={`#case-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group block cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-4 rounded-2xl"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-full overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm mb-4 w-fit"
                      style={{ backgroundColor: "#C2A14D", color: "#0A0F24" }}
                    >
                      Sistema Digital
                    </div>

                    <h3
                      className="text-3xl mb-4"
                      style={{ color: "#0A0F24", fontWeight: 600 }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-lg mb-6 leading-relaxed"
                      style={{ color: "#4A5568" }}
                    >
                      {project.shortDescription}
                    </p>

                    <div
                      className="flex items-center gap-2 group-hover:gap-3 transition-all"
                      style={{ color: "#C2A14D" }}
                    >
                      <span style={{ fontWeight: 600 }}>
                        Ver estudo de caso completo
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
