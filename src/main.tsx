import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./styles/index.css";

console.log(
  "%c LI %c Lucas Inácio Soluções\n%cSistemas · Dados · Automação\n\n%c🔗 https://github.com/luc118i",
  "background:#0A0F24;color:#C2A14D;font-weight:700;font-size:13px;padding:3px 8px;border-radius:4px 0 0 4px;",
  "background:#0A0F24;color:#fff;font-size:13px;padding:3px 10px 3px 6px;border-radius:0 4px 4px 0;",
  "color:#A0AEC0;font-size:11px;",
  "color:#C2A14D;font-size:11px;"
);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
