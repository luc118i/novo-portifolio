import { useEffect, useState, useCallback, useMemo } from "react";
import {
  X, Github, Star, Code2, Sparkles, CheckCircle2,
  Loader2, AlertCircle, Trash2, RefreshCw, BookOpen,
  Pencil, EyeOff, RotateCcw, ChevronDown, ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fetchRepoContext, generateCaseStudy } from "./groq";
import { useAICases } from "./useAICases";
import { useStudioOverrides } from "./useStudioOverrides";
import { projects as staticProjects } from "../data";
import { Project } from "../types";

// ─── Tipos ────────────────────────────────────────────────────
type GHRepo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
};

type GenPhase =
  | { type: "repos" }
  | { type: "generating"; repoName: string; stream: string }
  | { type: "done"; project: Project; repoName: string }
  | { type: "error"; message: string };

type Tab = "projects" | "generate";

const GITHUB_USER = import.meta.env.VITE_GITHUB_USER ?? "luc118i";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  featured: "Destaque",
  automation: "Automação",
  architecture: "Arquitetura",
  frontend: "Frontend",
};

// ─── Form de edição ───────────────────────────────────────────
function EditForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project;
  onSave: (fields: Partial<Project>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: project.title ?? "",
    shortDescription: project.shortDescription ?? "",
    description: project.description ?? "",
    category: project.category ?? "featured",
    problem: project.problem ?? "",
    context: project.context ?? "",
    solution: project.solution ?? "",
    stack: (project.stack ?? []).join(", "),
    features: (project.features ?? []).join("\n"),
    benefits: (project.benefits ?? []).join("\n"),
    image: project.image ?? "",
  });

  const set = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSave() {
    onSave({
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      category: form.category as Project["category"],
      problem: form.problem.trim(),
      context: form.context.trim(),
      solution: form.solution.trim(),
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      benefits: form.benefits.split("\n").map((s) => s.trim()).filter(Boolean),
      image: form.image.trim() || project.image,
    });
  }

  const inputCls =
    "w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C2A14D]/60 resize-none";
  const labelCls = "block text-xs text-white/40 mb-1 uppercase tracking-wider";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-4 flex-shrink-0 border-b border-white/06">
        <button
          onClick={onCancel}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 cursor-pointer transition-all"
        >
          <X className="w-4 h-4" />
        </button>
        <div>
          <p className="text-sm font-semibold text-white">Editando projeto</p>
          <p className="text-xs text-white/40 truncate max-w-[260px]">{project.id}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <label className={labelCls}>Título</label>
          <input className={inputCls} value={form.title} onChange={set("title")} />
        </div>
        <div>
          <label className={labelCls}>Descrição curta</label>
          <input className={inputCls} value={form.shortDescription} onChange={set("shortDescription")} />
        </div>
        <div>
          <label className={labelCls}>Descrição completa</label>
          <textarea className={inputCls} rows={3} value={form.description} onChange={set("description")} />
        </div>
        <div>
          <label className={labelCls}>Categoria</label>
          <select className={inputCls} value={form.category} onChange={set("category")}>
            <option value="featured">Destaque</option>
            <option value="automation">Automação</option>
            <option value="architecture">Arquitetura</option>
            <option value="frontend">Frontend</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Problema</label>
          <textarea className={inputCls} rows={3} value={form.problem} onChange={set("problem")} />
        </div>
        <div>
          <label className={labelCls}>Contexto</label>
          <textarea className={inputCls} rows={3} value={form.context} onChange={set("context")} />
        </div>
        <div>
          <label className={labelCls}>Solução</label>
          <textarea className={inputCls} rows={4} value={form.solution} onChange={set("solution")} />
        </div>
        <div>
          <label className={labelCls}>Stack (separado por vírgula)</label>
          <input className={inputCls} value={form.stack} onChange={set("stack")} placeholder="React, TypeScript, Node.js" />
        </div>
        <div>
          <label className={labelCls}>Funcionalidades (uma por linha)</label>
          <textarea className={inputCls} rows={5} value={form.features} onChange={set("features")} />
        </div>
        <div>
          <label className={labelCls}>Benefícios (um por linha)</label>
          <textarea className={inputCls} rows={3} value={form.benefits} onChange={set("benefits")} />
        </div>
        <div>
          <label className={labelCls}>Imagem (URL ou caminho)</label>
          <input className={inputCls} value={form.image} onChange={set("image")} placeholder="/projects/meu-projeto/cover.webp" />
        </div>
      </div>

      <div className="flex gap-3 px-6 py-4 flex-shrink-0 border-t border-white/06">
        <button
          onClick={handleSave}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: "#C2A14D", color: "#0A0F24" }}
        >
          Salvar alterações
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/08 cursor-pointer transition-all text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ─── Linha de projeto na lista ────────────────────────────────
function ProjectRow({
  project,
  isAI,
  isHidden,
  onEdit,
  onHide,
  onRestore,
  onReset,
  onDelete,
}: {
  project: Project;
  isAI: boolean;
  isHidden: boolean;
  onEdit: () => void;
  onHide: () => void;
  onRestore: () => void;
  onReset: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
      style={{
        backgroundColor: isHidden ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${isHidden ? "rgba(255,255,255,0.05)" : isAI ? "rgba(194,161,77,0.2)" : "rgba(255,255,255,0.08)"}`,
        opacity: isHidden ? 0.5 : 1,
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-white/80 font-medium truncate">{project.title || project.id}</p>
          {isAI && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C2A14D]/20 text-[#C2A14D] border border-[#C2A14D]/30 flex-shrink-0">
              IA
            </span>
          )}
        </div>
        <p className="text-xs text-white/30 mt-0.5">
          {CATEGORY_LABEL[project.category]} · {project.id}
        </p>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {isHidden ? (
          <button
            onClick={onRestore}
            title="Restaurar"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-emerald-400 hover:bg-emerald-400/10 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        ) : (
          <>
            <button
              onClick={onEdit}
              title="Editar"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-[#C2A14D] hover:bg-[#C2A14D]/10 cursor-pointer transition-all"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onHide}
              title="Ocultar"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/08 cursor-pointer transition-all"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        {isAI ? (
          <button
            onClick={onDelete}
            title="Remover definitivamente"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 cursor-pointer transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onReset}
            title="Resetar edições"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-orange-400 hover:bg-orange-400/10 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Subcomponentes de geração (reutilizados) ─────────────────
function ProgressSteps({ stream }: { stream: string }) {
  const steps = ["Repositório carregado", "README processado", "Analisando...", "Gerando estudo de caso..."];
  const filled = stream.length;
  const activeStep = filled === 0 ? 0 : filled < 100 ? 1 : filled < 400 ? 2 : 3;
  return (
    <div className="space-y-3">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          {i < activeStep ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : i === activeStep ? (
            <Loader2 className="w-4 h-4 text-[#C2A14D] animate-spin flex-shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
          )}
          <span className={`text-sm ${i <= activeStep ? "text-white/80" : "text-white/30"}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function StreamPreview({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="mt-4 rounded-xl bg-black/30 border border-white/10 p-4 h-40 overflow-hidden relative">
      <pre className="text-xs text-emerald-300/70 font-mono leading-relaxed whitespace-pre-wrap break-all">
        {text.slice(-600)}<span className="animate-pulse">▊</span>
      </pre>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

function RepoCard({ repo, saved, onSelect }: { repo: GHRepo; saved: boolean; onSelect: () => void }) {
  const days = Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / 86400000);
  const label = days === 0 ? "hoje" : days === 1 ? "ontem" : `${days}d atrás`;
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left p-4 rounded-xl border transition-all group cursor-pointer"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        borderColor: saved ? "rgba(194,161,77,0.4)" : "rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-sm text-white/90 group-hover:text-white transition-colors leading-tight">
          {repo.name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {saved && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C2A14D]/20 text-[#C2A14D] border border-[#C2A14D]/30">
              salvo
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Star className="w-3 h-3" />{repo.stargazers_count}
            </span>
          )}
        </div>
      </div>
      {repo.description && (
        <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-3 text-[11px] text-white/30">
        {repo.language && <span className="flex items-center gap-1"><Code2 className="w-3 h-3" />{repo.language}</span>}
        <span>atualizado {label}</span>
      </div>
    </motion.button>
  );
}

// ─── Modal principal ──────────────────────────────────────────
export function AIStudio({ onClose }: { onClose: () => void }) {
  const { cases, addCase, removeCase, hasCase } = useAICases();
  const { overrides, editProject, hideProject, restoreProject, resetProject } = useStudioOverrides();

  // Todos os projetos (estáticos + IA)
  const allProjects = useMemo(() => {
    const aiProjects = cases.map((c) => c.project);
    return [...staticProjects, ...aiProjects];
  }, [cases]);

  const aiIds = useMemo(() => new Set(cases.map((c) => c.project.id)), [cases]);

  // Estado de abas e edição
  const [tab, setTab] = useState<Tab>("projects");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filterText, setFilterText] = useState("");

  // Estado de geração
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [reposError, setReposError] = useState<string | null>(null);
  const [genPhase, setGenPhase] = useState<GenPhase>({ type: "repos" });
  const [repoFilter, setRepoFilter] = useState("");

  // Carrega repos quando entra na aba "generate"
  useEffect(() => {
    if (tab !== "generate" || repos.length > 0) return;
    setLoadingRepos(true);
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=50`)
      .then((r) => r.json())
      .then((data: GHRepo[]) => { setRepos(data.filter((r) => !("message" in r))); setLoadingRepos(false); })
      .catch(() => { setReposError("Não foi possível carregar repositórios."); setLoadingRepos(false); });
  }, [tab, repos.length]);

  const startGeneration = useCallback(async (repo: GHRepo) => {
    setGenPhase({ type: "generating", repoName: repo.name, stream: "" });
    try {
      const context = await fetchRepoContext(GITHUB_USER, repo.name);
      const project = await generateCaseStudy(context, (partial) => {
        setGenPhase({ type: "generating", repoName: repo.name, stream: partial });
      });
      setGenPhase({ type: "done", project, repoName: repo.name });
    } catch (err) {
      setGenPhase({ type: "error", message: err instanceof Error ? err.message : "Erro desconhecido." });
    }
  }, []);

  const saveGenerated = useCallback((project: Project, repoName: string) => {
    addCase({ id: project.id, repo: repoName, generatedAt: new Date().toISOString(), project });
    setGenPhase({ type: "repos" });
    setTab("projects");
  }, [addCase]);

  // Projetos filtrados para a aba "projects"
  const visibleProjects = useMemo(() =>
    allProjects.filter((p) =>
      !filterText ||
      p.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      p.id.includes(filterText.toLowerCase())
    ), [allProjects, filterText]);

  const hiddenProjects = useMemo(() =>
    allProjects.filter((p) => overrides.hidden.includes(p.id)), [allProjects, overrides.hidden]);

  const editedCount = Object.keys(overrides.edits).length;
  const hiddenCount = overrides.hidden.length;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d1117 0%, #0A0F24 100%)",
          border: "1px solid rgba(194,161,77,0.2)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(194,161,77,0.1)",
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Se estiver editando, mostra só o form */}
        <AnimatePresence mode="wait">
          {editingProject ? (
            <motion.div
              key="edit"
              className="flex flex-col h-full max-h-[88vh]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <EditForm
                project={editingProject}
                onSave={(fields) => {
                  editProject(editingProject.id, fields);
                  setEditingProject(null);
                }}
                onCancel={() => setEditingProject(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              className="flex flex-col flex-1 min-h-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(194,161,77,0.15)", border: "1px solid rgba(194,161,77,0.3)" }}>
                    <Sparkles className="w-4 h-4" style={{ color: "#C2A14D" }} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-sm">AI Studio</h2>
                    <p className="text-xs text-white/40">
                      {allProjects.length} projetos
                      {editedCount > 0 && ` · ${editedCount} editado${editedCount > 1 ? "s" : ""}`}
                      {hiddenCount > 0 && ` · ${hiddenCount} oculto${hiddenCount > 1 ? "s" : ""}`}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 active:scale-90 cursor-pointer transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex px-6 pt-4 gap-1 flex-shrink-0">
                {(["projects", "generate"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all"
                    style={tab === t
                      ? { backgroundColor: "rgba(194,161,77,0.15)", color: "#C2A14D", border: "1px solid rgba(194,161,77,0.3)" }
                      : { color: "rgba(255,255,255,0.4)", border: "1px solid transparent" }
                    }
                  >
                    {t === "projects" ? `Projetos (${allProjects.length})` : "Gerar com IA"}
                  </button>
                ))}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">

                  {/* ── ABA PROJETOS ── */}
                  {tab === "projects" && (
                    <motion.div key="tab-projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Filtrar projetos..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C2A14D]/50"
                      />

                      <div className="space-y-2">
                        {visibleProjects.map((p) => (
                          <ProjectRow
                            key={p.id}
                            project={p}
                            isAI={aiIds.has(p.id)}
                            isHidden={overrides.hidden.includes(p.id)}
                            onEdit={() => setEditingProject(p)}
                            onHide={() => hideProject(p.id)}
                            onRestore={() => restoreProject(p.id)}
                            onReset={() => resetProject(p.id)}
                            onDelete={() => removeCase(p.id)}
                          />
                        ))}
                      </div>

                      {hiddenProjects.length > 0 && (
                        <div className="pt-2">
                          <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Ocultos ({hiddenProjects.length})</p>
                          <div className="space-y-2">
                            {hiddenProjects.map((p) => (
                              <ProjectRow
                                key={p.id}
                                project={p}
                                isAI={aiIds.has(p.id)}
                                isHidden={true}
                                onEdit={() => {}}
                                onHide={() => {}}
                                onRestore={() => restoreProject(p.id)}
                                onReset={() => resetProject(p.id)}
                                onDelete={() => removeCase(p.id)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ── ABA GERAR ── */}
                  {tab === "generate" && (
                    <motion.div key="tab-generate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      {genPhase.type === "repos" && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Filtrar repositórios..."
                            value={repoFilter}
                            onChange={(e) => setRepoFilter(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C2A14D]/50"
                          />
                          {loadingRepos ? (
                            <div className="flex items-center justify-center py-12 gap-3 text-white/40">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span className="text-sm">Carregando repositórios...</span>
                            </div>
                          ) : reposError ? (
                            <div className="flex items-center gap-2 py-8 justify-center text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />{reposError}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {repos
                                .filter((r) => !repoFilter || r.name.toLowerCase().includes(repoFilter.toLowerCase()) || (r.description ?? "").toLowerCase().includes(repoFilter.toLowerCase()))
                                .map((repo) => (
                                  <RepoCard
                                    key={repo.id}
                                    repo={repo}
                                    saved={hasCase(repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                                    onSelect={() => startGeneration(repo)}
                                  />
                                ))}
                            </div>
                          )}
                        </div>
                      )}

                      {genPhase.type === "generating" && (
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <Github className="w-5 h-5 text-white/60" />
                            <span className="text-white/60 text-sm font-mono">{GITHUB_USER}/{genPhase.repoName}</span>
                          </div>
                          <ProgressSteps stream={genPhase.stream} />
                          <StreamPreview text={genPhase.stream} />
                          <p className="mt-4 text-xs text-white/30 text-center">Powered by Groq · LLaMA 3.3-70b</p>
                        </div>
                      )}

                      {genPhase.type === "done" && (
                        <div className="space-y-5">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span className="text-white/80 text-sm font-medium">Estudo de caso gerado</span>
                          </div>
                          <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <p className="text-white font-semibold">{genPhase.project.title}</p>
                            <p className="text-white/60 text-sm">{genPhase.project.shortDescription}</p>
                            <div className="flex flex-wrap gap-2">
                              {genPhase.project.stack.slice(0, 8).map((t, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded-md text-white/60" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>{t}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => saveGenerated(genPhase.project, genPhase.repoName)}
                              className="flex-1 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all hover:brightness-110 active:scale-95"
                              style={{ backgroundColor: "#C2A14D", color: "#0A0F24" }}
                            >
                              Salvar no portfólio
                            </button>
                            <button
                              onClick={() => { const repo = repos.find((r) => r.name === genPhase.repoName); if (repo) startGeneration(repo); }}
                              className="px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 active:scale-90 cursor-pointer transition-all"
                              title="Regenerar"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setGenPhase({ type: "repos" })}
                              className="px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 active:scale-90 cursor-pointer transition-all text-sm"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      {genPhase.type === "error" && (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-red-300 text-sm font-medium">Erro na geração</p>
                              <p className="text-red-300/70 text-xs mt-1">{genPhase.message}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setGenPhase({ type: "repos" })}
                            className="w-full py-3 rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/10 active:scale-95 cursor-pointer transition-all text-sm"
                          >
                            Voltar
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
