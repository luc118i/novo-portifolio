import { defineConfig } from "vite";
import path, { resolve } from "path";
import { writeFileSync } from "fs";
import { execSync } from "child_process";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const studioPublishPlugin = {
  name: "studio-publish",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use("/api/studio/publish", (req, res) => {
      if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }
      let body = "";
      req.on("data", (chunk: Buffer) => (body += chunk.toString()));
      req.on("end", () => {
        res.setHeader("Content-Type", "application/json");
        try {
          const { projects } = JSON.parse(body) as { projects: unknown[] };
          const filePath = resolve(__dirname, "src/data/ai-projects.json");
          writeFileSync(filePath, JSON.stringify({ projects }, null, 2));

          execSync("git add src/data/ai-projects.json", { cwd: __dirname });
          const diff = execSync("git status --porcelain src/data/ai-projects.json", { cwd: __dirname })
            .toString().trim();

          if (!diff) { res.end(JSON.stringify({ ok: true, noop: true })); return; }

          execSync('git commit -m "atualizando projetos"', { cwd: __dirname });
          execSync("git push origin main", { cwd: __dirname });
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(e) }));
        }
      });
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), studioPublishPlugin],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    port: 5173,
    host: "localhost",
    strictPort: true,
    historyApiFallback: true,
  },
});
