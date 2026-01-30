import { ArrowRight } from "lucide-react";
import { useEnterViewportOncePerEntry } from "../../../Hook/useEnterViewportOncePerEntry";
import { useRotatingCta } from "../../../Hook/useRotatingCta";

type Props = {
  nextProjectId?: string;
};

export function CaseCta({ nextProjectId }: Props) {
  const { ref, entered } = useEnterViewportOncePerEntry<HTMLDivElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -20% 0px",
    lockMs: 900,
  });

  const { variant } = useRotatingCta(entered);

  const secondaryHref =
    variant.secondary.href === "#case-NEXT"
      ? nextProjectId
        ? `#case-${nextProjectId}`
        : "#projetos"
      : variant.secondary.href;

  return (
    <div
      ref={ref}
      className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h4 className="text-xl md:text-2xl" style={{ fontWeight: 800 }}>
            {variant.title}
          </h4>
          <p className="mt-2 text-base md:text-lg text-slate-600">
            {variant.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href={variant.primary.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: "#C2A14D",
              color: "#0A0F24",
              fontWeight: 800,
            }}
          >
            {variant.primary.label}
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 border transition-colors hover:bg-white"
            style={{
              borderColor: "#E2E8F0",
              color: "#0A0F24",
              fontWeight: 800,
            }}
          >
            {variant.secondary.label}
          </a>
        </div>
      </div>
    </div>
  );
}
