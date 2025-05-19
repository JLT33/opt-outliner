// Importa i18next (núcleo de internationalización)
import i18n from 'i18next';
// Importa la integración de i18next para React
import { initReactI18next } from 'react-i18next';
// Importa los archivos de traducción español e inglés británico
import esES from './es-ES/common.json';
import enGB from './en-GB/common.json';

// Detecta el idioma del navegador del usuario
const browserLang = navigator.language || navigator.userLanguage;
// Lista de idiomas soportados por la app
const supported = ['es-ES', 'en-GB'];
// Idioma por defecto si el navegador no está en los soportados
const fallbackLng = 'es-ES';

// Selecciona el idioma detectado solo si está soportado, si no usa el de default
const detectedLang = supported.includes(browserLang) ? browserLang : fallbackLng;

// Inicializa i18next: registra recursos, idioma, fallback y settings para React
i18n.use(initReactI18next).init({
  resources: {
    'es-ES': { common: esES }, // Traducciones en español de España
    'en-GB': { common: enGB }, // Traducciones en inglés británico
  },
  lng: detectedLang,              // Idioma inicial
  fallbackLng,                   // Idioma fallback
  ns: ['common'],                // Namespace usado (puede haber varios)
  defaultNS: 'common',           // Namespace por defecto
  interpolation: { escapeValue: false }, // No hace falta escapar HTML (por seguridad de React)
});

// Exporta la instancia configurada
export default i18n;
