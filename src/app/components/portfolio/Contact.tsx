import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "./Section";

export function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "luccasinaacio@gmail.com",
      href: "mailto:luccasinaacio@gmail.com?subject=Contato%20via%20Portfólio&body=Olá%20Lucas,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Fale comigo no WhatsApp",
      href: "https://wa.me/5561998711909?text=Olá%20Lucas,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre:%0A-%20Criação%20de%20portfólio%20profissional%0A-%20Automação%20com%20Google%20Sheets%0A-%20Sistema%20digital%20para%20operação",
    },

    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/Lucas",
      href: "https://www.linkedin.com/in/lucas-da-silva-27956619b/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Lucas",
      href: "https://github.com/luc118i",
    },
  ];

  return (
    <Section
      id="contato"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#0A0F24" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl mb-6"
            style={{ color: "#FFFFFF", fontWeight: 600 }}
          >
            Vamos conversar?
          </h2>

          <p className="text-xl mb-12" style={{ color: "#A0AEC0" }}>
            Entre em contato para discutir como posso ajudar a transformar
            desafios operacionais em soluções digitais eficientes.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-xl border transition-all hover:translate-y-[-4px]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <contact.icon
                  className="w-8 h-8 mx-auto mb-4"
                  style={{ color: "#C2A14D" }}
                />
                <div className="text-sm mb-2" style={{ color: "#A0AEC0" }}>
                  {contact.label}
                </div>
                <div
                  className="text-base group-hover:underline"
                  style={{ color: "#FFFFFF", fontWeight: 500 }}
                >
                  {contact.value}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
