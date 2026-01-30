import { Code2 } from "lucide-react";
import { Project } from "./types";

type Sample = NonNullable<Project["codeSamples"]>[number];

export function AutomationShowcase({ samples }: { samples: Sample[] }) {
  if (!samples?.length) return null;

  return (
    <div className="mb-10">
      <h3
        className="text-3xl md:text-4xl mb-3"
        style={{ color: "#0A0F24", fontWeight: 600 }}
      >
        Automação na prática
      </h3>

      <p className="text-base md:text-lg" style={{ color: "#4A5568" }}>
        Recursos criados dentro da planilha para acelerar a operação e reduzir
        erros.
      </p>

      <div className="mt-6 grid gap-6">
        {samples.map((s, idx) => (
          <div
            key={idx}
            className="rounded-2xl border bg-white overflow-hidden"
            style={{ borderColor: "#E2E8F0" }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Media */}
              {s.screenshot ? (
                <div className="p-4 md:p-5 bg-gray-50">
                  <div
                    className="rounded-xl overflow-hidden border shadow-sm bg-white"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <img
                      src={s.screenshot}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8 bg-gray-50 flex items-center justify-center">
                  <div
                    className="rounded-2xl border bg-white p-4"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <Code2 className="w-8 h-8" style={{ color: "#C2A14D" }} />
                  </div>
                </div>
              )}

              {/* Text */}
              <div className="p-5 md:p-8 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 rounded-lg p-2 border bg-white"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <Code2 className="w-5 h-5" style={{ color: "#C2A14D" }} />
                  </div>

                  <div className="min-w-0">
                    <h4
                      className="text-xl mb-2"
                      style={{ color: "#0A0F24", fontWeight: 600 }}
                    >
                      {s.title}
                    </h4>

                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "#4A5568" }}
                    >
                      {s.description ??
                        "Implementação técnica disponível abaixo."}
                    </p>
                  </div>
                </div>

                {/* Opcional: linguagem como pill */}
                <div className="mt-4">
                  <span
                    className="inline-flex px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: "rgba(194, 161, 77, 0.15)",
                      color: "#8A6F2A",
                      fontWeight: 600,
                    }}
                  >
                    {s.language ?? "code"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
