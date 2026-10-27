import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  query,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Titulado, Empleador } from '../types';
import { OFFICIAL_TITULADOS, OFFICIAL_EMPLEADORES } from '../data/officialData';

const COLLECTION_TITULADOS = 'titulados';
const COLLECTION_EMPLEADORES = 'empleadores';
const COLLECTION_SIMULACIONES = 'simulaciones';

export interface SimulationRecord {
  id: string;
  timestamp: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  parametros: string;
  impactoInsercion: number;
  impactoSalarios: number;
  impactoSatisfaccion: number;
}

/**
 * Carga todos los titulados desde Firestore.
 * Si la base de datos está vacía, sincroniza inicialmente los datos oficiales de la UMSS.
 */
export async function loadTituladosFromDb(): Promise<Titulado[]> {
  try {
    const colRef = collection(db, COLLECTION_TITULADOS);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log('Colección de titulados vacía. Inicializando con datos oficiales del informe...');
      // Inicializar en background los datos oficiales
      await seedInitialTitulados();
      return OFFICIAL_TITULADOS;
    }

    const data: Titulado[] = [];
    snapshot.forEach((d) => {
      data.push(d.data() as Titulado);
    });

    return data;
  } catch (err) {
    console.warn('Error al leer titulados de Firestore, usando datos locales:', err);
    return OFFICIAL_TITULADOS;
  }
}

/**
 * Carga todos los empleadores desde Firestore.
 * Si la base de datos está vacía, sincroniza inicialmente los datos oficiales.
 */
export async function loadEmpleadoresFromDb(): Promise<Empleador[]> {
  try {
    const colRef = collection(db, COLLECTION_EMPLEADORES);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log('Colección de empleadores vacía. Inicializando con datos oficiales...');
      await seedInitialEmpleadores();
      return OFFICIAL_EMPLEADORES;
    }

    const data: Empleador[] = [];
    snapshot.forEach((d) => {
      data.push(d.data() as Empleador);
    });

    return data;
  } catch (err) {
    console.warn('Error al leer empleadores de Firestore, usando datos locales:', err);
    return OFFICIAL_EMPLEADORES;
  }
}

/**
 * Guarda una nueva encuesta de Titulado en la base de datos persistente.
 */
export async function saveTituladoToDb(titulado: Titulado): Promise<boolean> {
  try {
    const docId = titulado.id || `TIT-${Date.now()}`;
    const docRef = doc(db, COLLECTION_TITULADOS, docId);
    await setDoc(docRef, { ...titulado, id: docId });
    return true;
  } catch (err) {
    console.error('Error al guardar titulado en Firestore:', err);
    return false;
  }
}

/**
 * Guarda una nueva encuesta de Empleador en la base de datos persistente.
 */
export async function saveEmpleadorToDb(empleador: Empleador): Promise<boolean> {
  try {
    const docId = empleador.id || `EMP-${Date.now()}`;
    const docRef = doc(db, COLLECTION_EMPLEADORES, docId);
    await setDoc(docRef, { ...empleador, id: docId });
    return true;
  } catch (err) {
    console.error('Error al guardar empleador en Firestore:', err);
    return false;
  }
}

/**
 * Guarda un escenario de simulación en Firestore.
 */
export async function saveSimulationToDb(sim: SimulationRecord): Promise<boolean> {
  try {
    const docId = sim.id || `SIM-${Date.now()}`;
    const docRef = doc(db, COLLECTION_SIMULACIONES, docId);
    await setDoc(docRef, { ...sim, id: docId });
    return true;
  } catch (err) {
    console.error('Error al guardar simulación en Firestore:', err);
    return false;
  }
}

/**
 * Carga el historial de simulaciones guardadas.
 */
export async function loadSimulationsFromDb(): Promise<SimulationRecord[]> {
  try {
    const colRef = collection(db, COLLECTION_SIMULACIONES);
    const q = query(colRef, limit(50));
    const snapshot = await getDocs(q);

    const results: SimulationRecord[] = [];
    snapshot.forEach((d) => {
      results.push(d.data() as SimulationRecord);
    });
    return results;
  } catch (err) {
    console.warn('Error al cargar simulaciones:', err);
    return [];
  }
}

/**
 * Semillero inicial de datos oficiales de titulados en Firestore
 */
async function seedInitialTitulados() {
  try {
    const promises = OFFICIAL_TITULADOS.slice(0, 30).map((t) => {
      const docRef = doc(db, COLLECTION_TITULADOS, t.id);
      return setDoc(docRef, t);
    });
    await Promise.all(promises);
  } catch (e) {
    console.warn('Error al sembrar titulados:', e);
  }
}

/**
 * Semillero inicial de datos oficiales de empleadores en Firestore
 */
async function seedInitialEmpleadores() {
  try {
    const promises = OFFICIAL_EMPLEADORES.slice(0, 30).map((e) => {
      const docRef = doc(db, COLLECTION_EMPLEADORES, e.id);
      return setDoc(docRef, e);
    });
    await Promise.all(promises);
  } catch (e) {
    console.warn('Error al sembrar empleadores:', e);
  }
}

/**
 * Restablece las encuestas en Firestore a los registros oficiales del informe
 */
export async function resetDatabaseToDefaults(): Promise<boolean> {
  try {
    // Borrar actuales o sobreescribir con oficiales
    const tPromises = OFFICIAL_TITULADOS.map((t) => {
      const docRef = doc(db, COLLECTION_TITULADOS, t.id);
      return setDoc(docRef, t);
    });
    const ePromises = OFFICIAL_EMPLEADORES.map((e) => {
      const docRef = doc(db, COLLECTION_EMPLEADORES, e.id);
      return setDoc(docRef, e);
    });
    await Promise.all([...tPromises, ...ePromises]);
    return true;
  } catch (e) {
    console.error('Error al resetear la base de datos:', e);
    return false;
  }
}
