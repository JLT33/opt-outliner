// OPT-Outliner - Modelo de datos v0.1.0
// Autor: Jónatan Lucena Tomás
// Fecha de creación: 2025-05-19
// Si modificas, mantén la autoría o usa 'fork de Jónatan Lucena Tomás'.
// ------------------------------------------------------

// --- Esquema de datos Dexie.js para OPT-Outliner ---
// Cada tabla se representa como un interface TypeScript para tipado fuerte.
// Dexie facilitará el acceso IndexDB y las transacciones entre tablas.
// Incluye comentarios didácticos para principiantes (leerlos!).

import Dexie, { Table } from 'dexie';

// Definición de la tabla principal: Nodo
// Representa objetivos, proyectos o tareas (según tipo)
export interface Nodo {
  id: string;                     // PK única global (usualmente UUID)
  titulo: string;
  estado_id: string;
  completado: boolean;
  nota: string;
  deadline: string | null;        // timestamp ISO o null
  created_at: string;             // ISO
  updated_at: string;             // ISO
}

// Tabla relación nodo padre-hijo (muchos a muchos, triada padre-hijo)
export interface Relacion {
  id?: number;                    // PK autoincremental
  padre_id: string;
  hijo_id: string;
  nota_relacion: string;
  created_at: string;
  updated_at: string;
}

// Tabla de estados posibles para nodos
export interface Estado {
  id: string;
  nombre: string;                 // Ejemplo: "activo", "planificación", etc.
  created_at: string;
  updated_at: string;
}

// Tabla de contextos para los nodos
export interface Contexto {
  id: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

// Tipo de árbol donde vive un nodo
export interface TipoDeArbol {
  id: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

// Relación nodo → contexto (muchos a muchos)
export interface NodoContexto {
  id?: number;
  nodo_id: string;
  contexto_id: string;
  created_at: string;
  updated_at: string;
}

// Listas definidas por el usuario (filtros, outliners)
export interface Lista {
  id: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

// Relación lista <-> nodo (y el orden en esa lista)
export interface ListaNodo {
  id?: number;
  lista_id: string;
  nodo_id: string;
  orden: number;
  created_at: string;
  updated_at: string;
}

// Inbox: tabla especial para nodos marcados como "entrada"
export interface Inbox {
  id?: number;
  nodo_id: string;
  created_at: string;
  updated_at: string;
}

// Archivos (MD) vinculados
export interface Archivo {
  id: string;
  nombre: string;
  contenido_md: string;
  parent_folder_id: string | null;
  orden: number;
  created_at: string;
  updated_at: string;
}

// Carpetas de archivos
export interface Carpeta {
  id: string;
  nombre: string;
  parent_folder_id: string | null;
  orden: number;
  created_at: string;
  updated_at: string;
}

// Campos definidos por el usuario (extra)
export interface CampoDefinido {
  id: string;
  nombre: string;
  tipo_dato: string;
  created_at: string;
  updated_at: string;
}
export interface ValorDefinido {
  id: string;
  campo_definido_id: string;
  valor: string;    // Puede mapearse luego al tipo correcto
  created_at: string;
  updated_at: string;
}
// Relación nodo <-> valor de campo definido por usuario
export interface ValorCampo {
  id?: number;
  nodo_id: string;
  campo_definido_id: string;
  valor_id: string;
  created_at: string;
  updated_at: string;
}
// Tabla de intervalos de repetición (para planificación recurrente)
export interface RepeticionIntervalo {
  id: string;
  nombre_intervalo: string;
  ms_intervalo: number;
  created_at: string;
  updated_at: string;
}
export interface Recordatorio {
  id?: number;
  nodo_id: string;
  ms_antes: number;
  created_at: string;
  updated_at: string;
}
// Registro de cambios: todas las transacciones quedan aquí para sincronización
export interface CambioLog {
  seq_id?: number; // AUTO_INCREMENT
  tabla: string;
  tipo_accion: "create" | "update" | "delete";
  antes: any | null;     // JSON del objeto antes
  despues: any | null;   // JSON del objeto después
  timestamp: string;     // ISO
}

// Estado de sesión, para configuración temporal, etc
export interface SesionEstado {
  clave: string;
  valor: any;
}

// Clase Dexie que agrupa toda la base de datos local.
export class OptOutlinerDB extends Dexie {
  nodos!: Table<Nodo, string>;
  relaciones!: Table<Relacion, number>;
  estados!: Table<Estado, string>;
  contextos!: Table<Contexto, string>;
  tipos_de_arbol!: Table<TipoDeArbol, string>;
  nodos_contexto!: Table<NodoContexto, number>;
  listas!: Table<Lista, string>;
  listas_nodo!: Table<ListaNodo, number>;
  inbox!: Table<Inbox, number>;
  archivos!: Table<Archivo, string>;
  carpetas!: Table<Carpeta, string>;
  campos_definidos!: Table<CampoDefinido, string>;
  valores_definidos!: Table<ValorDefinido, string>;
  valores_campo!: Table<ValorCampo, number>;
  repeticion_intervalos!: Table<RepeticionIntervalo, string>;
  recordatorios!: Table<Recordatorio, number>;
  cambio_log!: Table<CambioLog, number>;
  sesion_estado!: Table<SesionEstado, string>;

  constructor() {
    super('OptOutlinerDB');
    // Define los índices y claves según cada tabla (ver documentación Dexie, sólo puedes indexar campos simples)
    this.version(1).stores({
      nodos: 'id, created_at, updated_at, estado_id',
      relaciones: '++id, padre_id, hijo_id',
      estados: 'id',
      contextos: 'id',
      tipos_de_arbol: 'id',
      nodos_contexto: '++id, nodo_id, contexto_id',
      listas: 'id',
      listas_nodo: '++id, lista_id, nodo_id, orden',
      inbox: '++id, nodo_id',
      archivos: 'id, parent_folder_id',
      carpetas: 'id, parent_folder_id',
      campos_definidos: 'id',
      valores_definidos: 'id, campo_definido_id',
      valores_campo: '++id, nodo_id, campo_definido_id, valor_id',
      repeticion_intervalos: 'id',
      recordatorios: '++id, nodo_id',
      cambio_log: '++seq_id, tabla, tipo_accion, timestamp',
      sesion_estado: 'clave',
    });
  }

  // --- MÉTODOS CRUD con logging ---

  // Crear un nodo (registra en log de cambios)
  async createNodo(nodo: Nodo) {
    await this.transaction('rw', this.nodos, this.cambio_log, async () => {
      await this.nodos.add(nodo);
      await this.cambio_log.add({
        tabla: 'nodos',
        tipo_accion: 'create',
        antes: null,
        despues: nodo,
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Actualizar un nodo (guarda el estado anterior en el log)
  async updateNodo(id: string, changes: Partial<Nodo>) {
    await this.transaction('rw', this.nodos, this.cambio_log, async () => {
      const antes = await this.nodos.get(id);
      if (!antes) throw new Error('Nodo no encontrado');
      const updated = { ...antes, ...changes, updated_at: new Date().toISOString() };
      await this.nodos.update(id, updated);
      await this.cambio_log.add({
        tabla: 'nodos',
        tipo_accion: 'update',
        antes,
        despues: updated,
        timestamp: new Date().toISOString(),
      });
    });
  }
}

// Instancia real de la base. Usa esto para operar con el almacenamiento local.
export const db = new OptOutlinerDB();
