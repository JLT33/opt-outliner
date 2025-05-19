// Importa las librerías de React, gestión de estado local y hooks de efectos.
import React, { useState, useEffect } from "react";
// Importa el hook para traducción multilenguaje
import { useTranslation } from "react-i18next";
// Importa los estilos principales
import "./index.css";

// Constante que contiene la marca y nombre de la aplicación (no es traducible)
const BRAND = {
  name: "OPT-Outliner",
};

// Componente que muestra el botón para cambiar el tema entre claro y oscuro.
function ThemeSwitch() {
  // Obtiene la función de traducción del hook i18n
  const { t } = useTranslation();
  // Usa el hook useState para almacenar el estado actual del tema
  const [dark, setDark] = useState(() => {
    // Lee el valor guardado en localStorage si existe, si no está es false (tema claro)
    return localStorage.getItem("theme") === "dark";
  });

  // Hook que se ejecuta cuando el valor de 'dark' cambia
  useEffect(() => {
    if (dark) {
      // Añade la clase 'dark' al elemento root del documento cuando dark=true
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // Elimina la clase 'dark' y coloca el tema en claro
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    // Botón que alterna entre tema claro y oscuro al hacer clic
    <button
      aria-label={t('switch_theme')} // Texto para accesibilidad usando i18n
      onClick={() => setDark((prev) => !prev)} // Cambia el valor booleano
      className="absolute top-4 right-4 bg-white dark:bg-neutral-900 z-10 rounded-2xl shadow-card p-2 transition"
    >
      <span className="sr-only">{t('switch_theme')}</span>
      {/* Ícono que cambia según el modo actual */}
      {dark ? (
        // Icono de luna para tema oscuro
        <svg width="22" height="22" fill="none" viewBox="0 0 20 20"><path stroke="#3399FF" strokeWidth="2" d="M11.8 2.5C8.1 2.8 5.2 5.9 5.2 9.7c0 4 3 7.3 7 7.8 1.8.3 3.4-.2 4.7-1.2.5-.4.2-1.1-.5-1.2-2.8-.6-5-3-5-5.9V2.5Z"/></svg>
      ) : (
        // Icono de sol para tema claro
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#2258A6" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.24 16.24l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.24 7.76l1.42-1.42" stroke="#2258A6" strokeWidth="2"/></svg>
      )}
    </button>
  );
}

// Componente principal de la aplicación (root)
export default function App() {
  // Hook del sistema de traducción
  const { t } = useTranslation();

  return (
    <main className="min-h-screen w-full bg-white dark:bg-neutral-900 flex flex-col items-center justify-center px-4 text-center">
      {/* Botón para intercambiar entre modo claro y oscuro */}
      <ThemeSwitch />
      {/* Logo de la app (SVG), solo se muestra visual, no traducible */}
      <img
        src="/logo.svg"
        alt="OPT-Outliner logo"
        className="w-28 h-28 rounded-2xl shadow-card mb-6 mt-8"
        draggable={false}
      />
      {/* Título principal, no traducible */}
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2 font-sans tracking-tight">
        {BRAND.name}
      </h1>
      {/* Subtítulo internacionalizable */}
      <p className="mb-6 text-base text-gray-700 dark:text-gray-200 font-sans max-w-xs mx-auto">
        {t('slogan')}
      </p>
      {/* Footer internacionalizable */}
      <footer className="text-xs text-gray-400 dark:text-gray-500 mt-12 mb-2 select-none">
        &copy; {new Date().getFullYear()} OPT-Outliner. {t('footer_copyright')}
      </footer>
    </main>
  );
}
