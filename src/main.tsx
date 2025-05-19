// Importa las funciones esenciales de React
import React from "react";
import { createRoot } from "react-dom/client";
// Importa los estilos de Tailwind y globales
import "./index.css";
// Importa y ejecuta el sistema de traducción (i18n) al arrancar la app,
// lo que activa la selección de idioma automáticamente.
import './i18n';
// Importa el componente raíz de React
import App from "./App.tsx";

// Monta la app en el elemento HTML raíz (id="root")
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
