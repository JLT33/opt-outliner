# TODO OPT-Outliner v1.0

## Funcionalidades clave pendientes

1. Sistema de modelo de datos (Dexie.js)
   - Definición de todas las tablas del modelo indicado en el requerimiento inicial
   - Relaciones y claves foráneas simuladas
   - Función para exportar/importar toda la base como JSON
   - Generar y gestionar el `cambio_log` versiónada

2. Sincronización Google Drive
   - Login OAuth2 Google
   - Subida y bajada de backup (JSON/SQLite) en Drive del usuario (solo desde frontend)
   - Detención y merge de cambios vía `cambio_log`

3. Árbol de nodos interactivo (UI)
   - Visualización de árbol estilo outliner VSCode
   - Comportamiento expandir/colapsar global y por nodo
   - Selección, checkboxes, menú móvil/flotante
   - Acciones Mover/Nuevo/Mover a raíz, CRUD nodos, navegación archivos/carpetas

4. Formularios dinámicos (creación/edición nodos)
   - Generación automática desde campos + campos extra (multilenguaje siempre)
   - Rellenado, validación, edición, restaurar cambios

5. Agenda & calendario
   - Lista de agenda y calendario mensual/semanal
   - Creación de eventos desde calendario
   - Soporte repeticiones: diarios, semanales, mensuales, etc.

6. Filtros y outliners personalizados
   - Panel lateral con filtros dinámicos
   - Outliner por listas y subárboles

7. Multilenguaje (finalización)
   - Selector de idioma manual visible
   - Traducciones completas para nuevas vistas/componentes

8. PWA avanzada y documentación
   - Service Worker funcional para offline
   - Documentación breve para usuario y despliegue
   - Revisión cross-device mobile

---
## Pruebas automáticas

- Cobertura de pruebas para:
  - Exportar/importar DB y su consistencia
  - Sincronización/backup Drive (mock/mock API mínimo)
  - Renderizado y lógica del árbol de nodos (ejemplo: check de hijos)
  - Formularios dinámicos y validaciones
  - Filtros, agenda y calendarios (nodos visibles y repeticiones)
  - Pruebas de UI para ligereza, mobile-first y dark/light
  - i18n (que siempre muestre el idioma correcto)
- Framework sugerido: Vitest + React Testing Library

---
Puedes sugerir nuevas tareas o funcionalidades, serán añadidas con su fecha de inclusión y prioridad.
