/**
 * Datos Estratégicos, Matrices ARCU-SUR y Afirmaciones de Empleadores
 * Informe Actividad 2 - Taller de Simulación de Sistemas (Grupo 14)
 */

import { AfirmacionEmpleador } from '../types';

export const AFIRMACIONES_EMPLEADORES: AfirmacionEmpleador[] = [
  {
    numero: 1,
    id: 'item_01',
    texto: 'La Carrera brinda confianza como formadora de profesionales del área tecnológica',
    dimension: 'Confianza y calidad del perfil'
  },
  {
    numero: 2,
    id: 'item_02',
    texto: 'El título es consistente con el nivel de formación y las competencias demostradas',
    dimension: 'Confianza y calidad del perfil'
  },
  {
    numero: 3,
    id: 'item_03',
    texto: 'Las autoridades de la Carrera consultan regularmente nuestra opinión',
    dimension: 'Vinculación con empleadores'
  },
  {
    numero: 4,
    id: 'item_04',
    texto: 'Conozco el perfil profesional y las competencias de egreso',
    dimension: 'Conocimiento del perfil'
  },
  {
    numero: 5,
    id: 'item_05',
    texto: 'El perfil profesional es coherente con el desempeño laboral de los titulados',
    dimension: 'Confianza y calidad del perfil'
  },
  {
    numero: 6,
    id: 'item_06',
    texto: 'La formación permite un desempeño destacado, profesional e integral',
    dimension: 'Confianza y calidad del perfil'
  },
  {
    numero: 7,
    id: 'item_07',
    texto: 'La Carrera incorpora las necesidades del sector en prácticas, pasantías y titulación',
    dimension: 'Vinculación con empleadores'
  },
  {
    numero: 8,
    id: 'item_08',
    texto: 'Los titulados evidencian competencias laborales (comunicación, análisis, equipo, TI)',
    dimension: 'Confianza y calidad del perfil'
  },
  {
    numero: 9,
    id: 'item_09',
    texto: 'Los titulados demuestran valores: ética, responsabilidad social, inclusión, ambiente',
    dimension: 'Confianza y calidad del perfil'
  },
  {
    numero: 10,
    id: 'item_10',
    texto: 'He participado en procesos de evaluación o retroalimentación sobre los titulados',
    dimension: 'Participación en mejora de la carrera'
  },
  {
    numero: 11,
    id: 'item_11',
    texto: 'La Carrera mantiene vínculos que generan oportunidades laborales para los titulados',
    dimension: 'Vinculación con empleadores'
  },
  {
    numero: 12,
    id: 'item_12',
    texto: 'He participado en actividades de vinculación con el entorno laboral y tecnológico',
    dimension: 'Participación en mejora de la carrera'
  },
  {
    numero: 13,
    id: 'item_13',
    texto: 'He participado en difusión de oportunidades laborales, convocatorias o pasantías',
    dimension: 'Participación en mejora de la carrera'
  },
  {
    numero: 14,
    id: 'item_14',
    texto: 'He participado en actividades de intercambio entre profesionales, empleadores, docentes y estudiantes',
    dimension: 'Participación en mejora de la carrera'
  },
  {
    numero: 15,
    id: 'item_15',
    texto: 'He sido consultado sobre el desempeño de los titulados para retroalimentar el plan de estudios',
    dimension: 'Participación en mejora de la carrera'
  },
  {
    numero: 16,
    id: 'item_16',
    texto: 'La Carrera ha consultado nuestra opinión sobre la pertinencia de la formación',
    dimension: 'Vinculación con empleadores'
  },
  {
    numero: 17,
    id: 'item_17',
    texto: 'Recurrimos a la UMSS y a la Carrera como fuente de talento profesional',
    dimension: 'Vinculación con empleadores'
  },
  {
    numero: 18,
    id: 'item_18',
    texto: 'He sido consultado periódicamente durante la autoevaluación y mejora continua',
    dimension: 'Participación en mejora de la carrera'
  }
];

export const DIMENSIONES_EMPLEADORES = [
  {
    dimension: 'Confianza y calidad del perfil de egreso',
    afirmaciones: [1, 2, 5, 6, 8, 9],
    indiceReportado: 64.4,
    diagnostico: 'Alta confianza institucional (86%) y reconocimiento de sólidos valores éticos y rigor analítico.'
  },
  {
    dimension: 'Conocimiento del perfil profesional',
    afirmaciones: [4],
    indiceReportado: 65.6,
    diagnostico: 'Claridad aceptable sobre el rol del egresado, aunque requiere mayor difusión con empresas emergentes.'
  },
  {
    dimension: 'Vinculación de la Carrera con los empleadores',
    afirmaciones: [3, 7, 11, 16, 17],
    indiceReportado: 43.8,
    diagnostico: 'Punto débil: 43% afirma que la carrera no consulta la pertinencia laboral y no hay bolsa institucional activa.'
  },
  {
    dimension: 'Participación del empleador en la mejora de la Carrera',
    afirmaciones: [10, 12, 13, 14, 15, 18],
    indiceReportado: 34.5,
    diagnostico: 'Brecha más crítica para ARCU-SUR: 49% nunca fue consultado en la autoevaluación y ~40% no participa en ninguna actividad.'
  }
];

export const MATRIZ_HALLAZGOS_TABLA11 = [
  {
    numero: 1,
    hallazgo: 'Alta empleabilidad e inserción temprana',
    evidencia: '83.1% trabaja o emprende; 52.5% ya trabajaba antes de titularse (Figura 10)',
    implicancia: 'Fortaleza clave para el criterio de pertinencia ARCU-SUR'
  },
  {
    numero: 2,
    hallazgo: 'Labores pertinentes a la formación',
    evidencia: '90.7% de acuerdo (Tabla 7)',
    implicancia: 'Evidencia directa de pertinencia del perfil profesional'
  },
  {
    numero: 3,
    hallazgo: 'Mercado privado y de desarrollo de software',
    evidencia: '80.6% en el sector privado; 62% en desarrollo de software (Figura 8)',
    implicancia: 'Reforzar ingeniería de software moderna en la malla curricular'
  },
  {
    numero: 4,
    hallazgo: 'El sector privado paga más',
    evidencia: 'χ² significativo = 4.013, p = 0.045, V = 0.21 (Tabla 4)',
    implicancia: 'Orientar la vinculación estratégica hacia empresas de software exportadoras'
  },
  {
    numero: 5,
    hallazgo: 'Alta demanda de posgrado en IA',
    evidencia: '83% interesados; IA + Ing. de Software = 67.5% de preferencias (Figura 5)',
    implicancia: 'Priorizar programas modulares en IA e Ingeniería de Software en FCyT'
  },
  {
    numero: 6,
    hallazgo: 'Los empleadores piden IA',
    evidencia: '82% menciona IA (agentes, ML, LLMs) como tendencia clave (Figura 15)',
    implicancia: 'Incorporar IA de forma transversal y aplicada en el plan de estudios'
  },
  {
    numero: 7,
    hallazgo: 'Financiamiento casi totalmente personal',
    evidencia: '91.8% pagó su posgrado con recursos propios (Tabla 3)',
    implicancia: 'Gestionar convenios con la banca y becas con empresas para toda la oferta'
  },
  {
    numero: 8,
    hallazgo: 'Brecha entre formación y requerimientos laborales',
    evidencia: '38% en desacuerdo con la concordancia; 71.6% pide actualizar el plan (Figura 19)',
    implicancia: 'Actualización curricular periódica alineada al mercado tecnológico'
  },
  {
    numero: 9,
    hallazgo: 'Débil vinculación con empleadores',
    evidencia: '49% nunca fue consultado en la autoevaluación (Figura 22)',
    implicancia: 'Institucionalizar la consulta sistemática mediante un consejo consultivo B2B'
  },
  {
    numero: 10,
    hallazgo: 'Asignaturas de baja utilidad percibida',
    evidencia: 'TV Digital 48.6%, Contabilidad 42.6%, Telefonia IP 39.2% (Figura 21)',
    implicancia: 'Revisar la vigencia de materias electivas y sustituirlas por tecnologías vigentes'
  }
];

export const FORTALEZAS_Y_OPORTUNIDADES_TABLA12 = {
  fortalezas: [
    'Alta empleabilidad e inserción antes de titularse (52.5% ya labora como egresado)',
    'Labores pertinentes a la formación recibida (90.7% en funciones de Sistemas)',
    'Sólidas habilidades analíticas y de resolución de problemas reconocidas por empleadores (55.4%)',
    'Asignaturas aplicadas muy valoradas (Base de Datos 94.6%, T.I.S. 74.3%, Redes 72.3%)',
    'Confianza institucional de los empleadores en la UMSS (índice 64.4, 86% de confianza)',
    'La Dirección de Posgrado FCyT es la primera opción de posgrado elegida (30.9%)'
  ],
  oportunidades: [
    'Elevar la concordancia de la formación con requerimientos laborales actuales (hoy 38% de brecha)',
    'Actualización constante del plan de estudios hacia IA, nube, DevOps y microservicios (71.6% de demanda)',
    'Ampliar convenios de pasantías e inserción temprana con empresas de software (solo 30.4% valora pasantías actuales)',
    'Reforzar formación intensiva en inglés técnico, ciberseguridad y habilidades de comunicación',
    'Institucionalizar la consulta y participación sistemática de empleadores en autoevaluación ARCU-SUR',
    'Crear programas de becas y financiamiento educativo para competir con la oferta internacional (25.2%)'
  ]
};

export const PLAN_DE_ACCION_TABLA13 = [
  {
    linea: '1. Becas y financiamiento',
    accionConcreta: 'Firmar convenios con banca para créditos educativos y convenios con empresas de software para patrocinio y becas parciales',
    indicadorSeguimiento: '% de estudiantes de posgrado con beca o crédito (meta: pasar de 8.2% a 30%)',
    plazo: 'Corto plazo (1 año)'
  },
  {
    linea: '2. Posgrados modulares',
    accionConcreta: 'Ofrecer diplomados en IA, Ingeniería de Software y Redes acumulables hacia Maestría en modalidad híbrida/virtual; integrar Base de Datos y Robótica como módulos',
    indicadorSeguimiento: 'Matrícula por programa frente al mínimo de equilibrio (≥ 15 inscritos, meta IA: 39 inscritos)',
    plazo: 'Mediano plazo (1–2 años)'
  },
  {
    linea: '3. Vinculación B2B',
    accionConcreta: 'Crear el Consejo Consultivo de Empleadores e institucionalizar convenios de pasantías con empresas de Cochabamba y el país',
    indicadorSeguimiento: '% de empleadores consultados periódicamente (meta: >70%, hoy 33%) e inserción en ≤ 4 meses (meta: 88.2%)',
    plazo: 'Corto plazo (1 año)'
  },
  {
    linea: '3. Vinculación B2B',
    accionConcreta: 'Actualización curricular integral con incorporación transversal de Inteligencia Artificial, computación en la nube, ciberseguridad e inglés técnico',
    indicadorSeguimiento: '% de titulados que perciben concordancia plena con el mercado (meta: >80%, hoy 61.9%)',
    plazo: 'Mediano plazo (2 años)'
  },
  {
    linea: '4. Observatorio permanente',
    accionConcreta: 'Aplicar las encuestas cada gestión académica con la herramienta web de simulación, actualizar la base de datos limpia y recalibrar los escenarios de decisión',
    indicadorSeguimiento: 'Número de titulados (≥ 150/año) y empleadores (≥ 50/año) registrados de manera continua en la plataforma',
    plazo: 'Permanente'
  }
];

export const INFO_INSTITUCIONAL = {
  universidad: 'Universidad Mayor de San Simón (UMSS)',
  facultad: 'Facultad de Ciencias y Tecnología',
  carrera: 'Carrera de Ingeniería de Sistemas',
  materia: 'Taller de Simulación de Sistemas',
  actividad: 'Actividad 2: Análisis de Mercado y Simulación Estocástica',
  grupo: 'Grupo 14',
  integrantes: [
    'Aguilar Condori Alvaro',
    'Choque Calle Gabriel',
    'Muraña Mamani Jose'
  ],
  docente: 'Ing. Henrry Frank Villarroel Tapia',
  fecha: 'Octubre de 2026',
  ubicacion: 'Cochabamba – Bolivia',
  cartas: [
    {
      codigo: 'DIR SIS 141/2026',
      fecha: '30 de septiembre de 2026',
      destinatario: 'A quien corresponda (Instituciones con titulados de la Carrera)',
      firmante: 'MSc. Yony Richard Montoya Burgos - Director de Carrera'
    },
    {
      codigo: 'DIR SIS 143/2026',
      fecha: '05 de octubre de 2026',
      destinatario: 'A quien corresponda (Instituciones Empleadoras)',
      firmante: 'MSc. Yony Richard Montoya Burgos - Director de Carrera'
    }
  ]
};
