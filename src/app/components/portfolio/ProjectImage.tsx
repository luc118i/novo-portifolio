import { useState } from "react";
import { ProjectCategory } from "./types";

// ---------------------------------------------------------------------------
// Mapeamento tech → Simple Icons slug + cor oficial da marca
// Simple Icons CDN: https://cdn.simpleicons.org/{slug}/{hexSemHash}
// ---------------------------------------------------------------------------
const TECH_ICONS: Record<string, { slug: string; color: string }> = {
  "react":                              { slug: "react",                color: "61DAFB" },
  "node.js":                            { slug: "nodedotjs",            color: "339933" },
  "node.js 20+":                        { slug: "nodedotjs",            color: "339933" },
  "typescript":                         { slug: "typescript",           color: "3178C6" },
  "typescript 5.9":                     { slug: "typescript",           color: "3178C6" },
  "javascript":                         { slug: "javascript",           color: "F7DF1E" },
  "vite":                               { slug: "vite",                 color: "646CFF" },
  "tailwind css":                       { slug: "tailwindcss",          color: "06B6D4" },
  "tailwind":                           { slug: "tailwindcss",          color: "06B6D4" },
  "supabase":                           { slug: "supabase",             color: "3ECF8E" },
  "supabase (postgresql + storage)":    { slug: "supabase",             color: "3ECF8E" },
  "postgresql":                         { slug: "postgresql",           color: "4169E1" },
  "docker":                             { slug: "docker",               color: "2496ED" },
  "express":                            { slug: "express",              color: "FFFFFF" },
  "express 5":                          { slug: "express",              color: "FFFFFF" },
  "express 5 · zod":                    { slug: "express",              color: "FFFFFF" },
  "zod":                                { slug: "zod",                  color: "3E67B1" },
  "google apps script":                 { slug: "googleappsscript",     color: "4285F4" },
  "google drive api":                   { slug: "googledrive",          color: "4285F4" },
  "google sheets":                      { slug: "googlesheets",         color: "34A853" },
  "google sheets api":                  { slug: "googlesheets",         color: "34A853" },
  "c#":                                 { slug: "csharp",               color: "239120" },
  "c# e asp.net core (minimal api)":    { slug: "dotnet",               color: "512BD4" },
  "chart.js":                           { slug: "chartdotjs",           color: "FF6384" },
  "chart.js 4":                         { slug: "chartdotjs",           color: "FF6384" },
  "leaflet.js":                         { slug: "leaflet",              color: "199900" },
  "leaflet.js 1.9":                     { slug: "leaflet",              color: "199900" },
  "puppeteer":                          { slug: "puppeteer",            color: "40B5A4" },
  "sql server":                         { slug: "microsoftsqlserver",   color: "CC2927" },
  "swagger":                            { slug: "swagger",              color: "85EA2D" },
  "jwt (json web token) para autenticação": { slug: "jsonwebtokens",    color: "000000" },
  "entity framework core para acesso ao banco de dados": { slug: "dotnet", color: "512BD4" },
  "radix ui":                           { slug: "radixui",              color: "161618" },
  "lucide-react":                       { slug: "lucide",               color: "F56565" },
  "looker studio":                      { slug: "looker",               color: "4285F4" },
  "htmlservice":                        { slug: "html5",                color: "E34F26" },
  "html5 / css3":                       { slug: "html5",                color: "E34F26" },
  "sharp":                              { slug: "sharp",                color: "99CC00" },
  "tiptap":                             { slug: "tiptap",               color: "616062" },
};

function resolveIcon(tech: string) {
  const key = tech.toLowerCase().trim();
  return TECH_ICONS[key] ?? null;
}

function iconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

// ---------------------------------------------------------------------------
// Acento de cor por categoria (para o brilho/badge)
// ---------------------------------------------------------------------------
const CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  featured:     "#C2A14D",
  automation:   "#4A90D9",
  architecture: "#6EE7B7",
  frontend:     "#C084FC",
};

// ---------------------------------------------------------------------------
// Placeholder
// ---------------------------------------------------------------------------
interface PlaceholderProps {
  title: string;
  category: ProjectCategory;
  stack: string[];
  className?: string;
  hideTitle?: boolean;
}

function ProjectPlaceholder({ title, category, stack, className, hideTitle = false }: PlaceholderProps) {
  const accent = CATEGORY_ACCENT[category] ?? "#C2A14D";

  const icons = stack
    .map((t) => resolveIcon(t))
    .filter((i): i is NonNullable<typeof i> => i !== null)
    .slice(0, 6);

  // Cores dos blobs: usa cor dos ícones quando disponível
  const blobColors = [
    icons[0] ? `#${icons[0].color}` : accent,
    icons[1] ? `#${icons[1].color}` : "#3178C6",
    icons[2] ? `#${icons[2].color}` : "#61DAFB",
  ];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: "#07091a" }}
    >
      {/* Blobs animados — GPU via will-change: transform */}
      <div
        className="ph-blob-1 absolute rounded-full pointer-events-none"
        style={{
          width: "55%", height: "55%",
          top: "5%", left: "5%",
          background: blobColors[0],
          filter: "blur(52px)",
          opacity: 0.28,
          willChange: "transform",
        }}
      />
      <div
        className="ph-blob-2 absolute rounded-full pointer-events-none"
        style={{
          width: "45%", height: "45%",
          bottom: "5%", right: "8%",
          background: blobColors[1],
          filter: "blur(44px)",
          opacity: 0.22,
          willChange: "transform",
        }}
      />
      <div
        className="ph-blob-3 absolute rounded-full pointer-events-none"
        style={{
          width: "30%", height: "30%",
          top: "35%", right: "5%",
          background: blobColors[2],
          filter: "blur(36px)",
          opacity: 0.18,
          willChange: "transform",
        }}
      />

      {/* Camada de vidro */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 px-6 py-5 rounded-2xl text-center"
        style={{
          background: "rgba(7, 9, 26, 0.45)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {icons.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-3">
            {icons.map(({ slug, color }, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <img
                  src={iconUrl(slug, color)}
                  alt={slug}
                  width={22}
                  height={22}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${accent}20`, border: `1px solid ${accent}40` }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke={accent} strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke={accent} strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke={accent} strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke={accent} strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {!hideTitle && (
          <p
            className="text-xs font-medium leading-snug max-w-[180px] opacity-40"
            style={{ color: "#CBD5E0" }}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Componente público
// ---------------------------------------------------------------------------
interface ProjectImageProps {
  src: string;
  alt: string;
  title: string;
  category: ProjectCategory;
  stack?: string[];
  className?: string;
  hideTitle?: boolean;
}

export function ProjectImage({
  src,
  alt,
  title,
  category,
  stack = [],
  className,
  hideTitle = false,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const isPlaceholder = !src || src.includes("/placeholders/");

  if (failed || isPlaceholder) {
    return (
      <ProjectPlaceholder
        title={title}
        category={category}
        stack={stack}
        className={className}
        hideTitle={hideTitle}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
