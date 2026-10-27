/**
 * Tipos de datos para el Observatorio y Simulador de Mercado
 * Carrera de Ingeniería de Sistemas - UMSS
 * Enfoque de Acreditación ARCU-SUR (Taller de Simulación de Sistemas)
 */

export interface Titulado {
  id: string;
  edad: '19 - 22 años' | '23 - 26 años' | '27 - 30 años' | '31 - 34 años' | '35 años o más';
  genero: 'Masculino' | 'Femenino';
  anios_vida_profesional: number;
  anios_desempleado: number;
  segmento: 'Junior (< 5 años)' | 'Consolidado (≥ 5 años)';
  formacion_complementaria: 'Sí' | 'No';
  nivel_realizado?: 'Diplomado' | 'Maestría' | 'Especialidad' | 'Doctorado' | 'Otro';
  lugar_realizado?: 'Posgrado FCyT' | 'EUPG' | 'Univ. públicas nacionales' | 'Univ. privadas nacionales' | 'Univ. internacionales' | 'Otro';
  financiamiento?: 'Recursos propios' | 'Beca parcial' | 'Beca total';
  interes_posgrado: 'Sí' | 'No';
  area_interes?: 'IA' | 'Ingeniería de Software' | 'Redes de Datos y Seguridad' | 'Base de Datos' | 'Robótica';
  institucion_preferida?: 'Posgrado FCyT' | 'Univ. internacionales' | 'Univ. públicas nacionales' | 'EUPG' | 'Univ. privadas nacionales' | 'IBNORCA' | 'Otro';
  situacion_laboral: 'Trabaja en una organización' | 'Emprendimiento propio' | 'No trabaja';
  sector?: 'Sector privado' | 'Sector público';
  rubro?: 'Desarrollo de Software' | 'Telecomunicaciones' | 'Banca' | 'Redes de Computadoras' | 'Educación' | 'Salud' | 'Otro';
  departamento?: 'Cochabamba' | 'La Paz' | 'Santa Cruz' | 'Extranjero' | 'Otro';
  cargo?: 'Desarrollo' | 'Ejecutivo / Gerencial' | 'Técnico' | 'Soporte / Help desk' | 'Consultoría' | 'Otro';
  antiguedad_trabajo?: 'Menos de 1 año' | '1 a 2 años' | '3 a 5 años' | 'Más de 5 años';
  medio_obtencion?: 'Postulación competitiva' | 'Recomendación de terceros' | 'Pasantía previa' | 'Bolsa de trabajo' | 'Contacto directo' | 'Otro';
  remuneracion?: '< 2 500' | '2 500 - 3 500' | '3 501 - 5 000' | '5 001 - 7 000' | '7 001 - 10 000' | '> 10 000';
  tiempo_primer_empleo?: 'Ya trabajaba antes de titularse' | 'Menos de 1 mes' | 'Entre 1 - 4 meses' | 'Entre 4 - 8 meses' | 'Entre 8 - 12 meses' | 'Más de 12 meses';
  numero_empleos?: '1' | '2' | '3' | 'Más de 3';
  razon_no_trabaja?: string;
  satisfaccion_global: 1 | 2 | 3 | 4; // 1: Totalmente en desacuerdo, 2: En desacuerdo, 3: De acuerdo, 4: Totalmente de acuerdo
  concordancia_formacion: 1 | 2 | 3 | 4;
  pertinencia_labores?: 1 | 2 | 3 | 4;
  opinion_posgrado_fcyt: 1 | 2 | 3 | 4;
  actividades: string[];
  aspectos_utiles: string[];
  aspectos_mejorar: string[];
  asignaturas_ventaja: string[];
  asignaturas_no_utiles: string[];
}

export interface Empleador {
  id: string;
  organizacion: string;
  tipo: 'Sector privado' | 'Sector público';
  tamano: 'Micro empresa (1-10)' | 'Pequeña empresa (11-50)' | 'Mediana empresa (51-200)' | 'Gran empresa (>200)';
  rubro: string;
  contrato_5_anios: 'Sí' | 'No';
  posibilidad_contratacion: 'Alta probabilidad' | 'Depende del crecimiento / proyectos' | 'No prevista actualmente';
  nivel_demandado: 'Licenciatura' | 'Especialidad' | 'Diplomado' | 'Maestría';
  medio_convocatoria: string;
  cargos: string[];
  tendencias_texto: string;
  habilidades_texto: string;
  items_likert: {
    [key: string]: 'Totalmente de acuerdo' | 'Parcialmente de acuerdo' | 'Totalmente en desacuerdo' | 'No sabe';
  };
}

export interface AfirmacionEmpleador {
  numero: number;
  id: string;
  texto: string;
  dimension: 'Confianza y calidad del perfil' | 'Conocimiento del perfil' | 'Vinculación con empleadores' | 'Participación en mejora de la carrera';
}

export interface ChiSquareResult {
  chi2: number;
  df: number;
  criticalValue: number;
  pValue: number;
  cramersV: number;
  isSignificant: boolean;
  observed: number[][];
  expected: number[][];
  rowLabels: string[];
  colLabels: string[];
}

export interface SimAreaResult {
  area: string;
  mediaInscritos: number;
  icInferior: number;
  icSuperior: number;
  probSuperaMinimo: number;
  recomendacion: 'Viable' | 'Viable con apoyo' | 'Integrar como módulo';
}

export interface ValidationMetric {
  indicador: string;
  esperado: string | number;
  obtenido: string | number;
  cumple: boolean;
  detalle: string;
}
