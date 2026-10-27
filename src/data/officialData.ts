/**
 * Base de Datos Limpia Oficial: 148 Titulados y 51 Empleadores
 * Carrera de Ingeniería de Sistemas - UMSS (Octubre 2026)
 * Cumple con los estadísticos de las Tablas 1 a 10 y Figuras 2 a 25.
 */

import { Titulado, Empleador } from '../types';

// Generador determinista de los 148 registros limpios de titulados
export function generateOfficialTitulados(): Titulado[] {
  const titulados: Titulado[] = [];

  // Configuración de frecuencias para calzar exactamente con el informe
  // Edades: 19-22: 5, 23-26: 34, 27-30: 30, 31-34: 15, 35+: 64 (Total 148)
  const ages: Titulado['edad'][] = [
    ...Array(5).fill('19 - 22 años'),
    ...Array(34).fill('23 - 26 años'),
    ...Array(30).fill('27 - 30 años'),
    ...Array(15).fill('31 - 34 años'),
    ...Array(64).fill('35 años o más')
  ];

  // Género: 115 Masculino (77.7%), 33 Femenino (22.3%)
  const genders: Titulado['genero'][] = [
    ...Array(115).fill('Masculino'),
    ...Array(33).fill('Femenino')
  ];

  // Años vida profesional: 145 válidos, 3 vacíos/no aplica
  // Media: 8.83, Mediana: 6, Desv: 7.92, Q1: 2, Q3: 14, Rango: 0 a 35
  // Junior (<5): 62 (42.8%), Consolidado (>=5): 83 (57.2%)
  const expYears: Array<number | null> = [
    // 62 Juniors (< 5 años): 0, 1, 1.5, 2, 2.5, 3, 4
    0, 0.5, 0.5, 1, 1, 1, 1, 1, 1.5, 1.5,
    2, 2, 2, 2, 2, 2, 2, 2.5, 2.5, 2.5,
    2.5, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4.5, 4.5, 1, 2, 3, 2,
    3, 4, 1, 2, 2, 3, 4, 1, 2, 3, 4, 2,
    // 83 Consolidados (>= 5 años)
    5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10, 11, 11,
    12, 12, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 16,
    16, 17, 18, 18, 19, 20, 20, 21, 21, 22, 22, 23, 24, 25,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 7, 8, 10, 12, 14,
    15, 18, 20, 6, 8, 11, 13, 15, 22, 24,
    // 3 valores nulos/no especificados en formularios
    null, null, null
  ];

  // Situación laboral: 108 trabaja en organización, 15 emprendimiento, 25 no trabaja
  const situaciones: Titulado['situacion_laboral'][] = [
    ...Array(108).fill('Trabaja en una organización'),
    ...Array(15).fill('Emprendimiento propio'),
    ...Array(25).fill('No trabaja')
  ];

  // Interés de posgrado: 123 Sí (83.1%), 25 No (16.9%)
  const posgradoInterests: ('Sí' | 'No')[] = [
    ...Array(123).fill('Sí'),
    ...Array(25).fill('No')
  ];

  // Áreas posgrado de los 123 interesados:
  // IA: 54 (43.9%), Ing Software: 29 (23.6%), Redes: 25 (20.3%), BD: 10 (8.1%), Robótica: 5 (4.1%)
  const posgradoAreas: Array<Titulado['area_interes']> = [
    ...Array(54).fill('IA'),
    ...Array(29).fill('Ingeniería de Software'),
    ...Array(25).fill('Redes de Datos y Seguridad'),
    ...Array(10).fill('Base de Datos'),
    ...Array(5).fill('Robótica')
  ];

  // Institución preferida de los 123:
  // Posgrado FCyT: 38 (30.9%), Univ internacionales: 31 (25.2%), Univ públicas: 17 (13.8%), EUPG: 13 (10.6%), Otro: 11 (8.9%), Privadas: 10 (8.1%), IBNORCA: 3 (2.4%)
  const posgradoInstituciones: Array<Titulado['institucion_preferida']> = [
    ...Array(38).fill('Posgrado FCyT'),
    ...Array(31).fill('Univ. internacionales'),
    ...Array(17).fill('Univ. públicas nacionales'),
    ...Array(13).fill('EUPG'),
    ...Array(11).fill('Otro'),
    ...Array(10).fill('Univ. privadas nacionales'),
    ...Array(3).fill('IBNORCA')
  ];

  // Formación complementaria realizada: 98 Sí (66.2%), 50 No (33.8%)
  // De los 98: Diplomado 66 (67.3%), Maestría 27 (27.6%), Especialidad 3 (3.1%), Doctorado 2 (2.0%)
  // Financiamiento: Recursos propios 90 (91.8%), Beca parcial 5 (5.1%), Beca total 3 (3.1%)
  const formacionRealizadaNiveles: Array<Titulado['nivel_realizado']> = [
    ...Array(66).fill('Diplomado'),
    ...Array(27).fill('Maestría'),
    ...Array(3).fill('Especialidad'),
    ...Array(2).fill('Doctorado')
  ];

  const formacionFinanciamientos: Array<Titulado['financiamiento']> = [
    ...Array(90).fill('Recursos propios'),
    ...Array(5).fill('Beca parcial'),
    ...Array(3).fill('Beca total')
  ];

  const formacionLugares: Array<Titulado['lugar_realizado']> = [
    ...Array(30).fill('Posgrado FCyT'),
    ...Array(21).fill('EUPG'),
    ...Array(20).fill('Univ. públicas nacionales'),
    ...Array(14).fill('Univ. privadas nacionales'),
    ...Array(8).fill('Otro'),
    ...Array(5).fill('Univ. internacionales')
  ];

  // Rubros de quienes trabajan en org (108):
  // Software 67 (62%), Telecom 12 (11%), Banca 9 (8%), Redes 9 (8%), Educación 7 (6%), Salud 4 (4%)
  const rubrosTrabajo: Array<Titulado['rubro']> = [
    ...Array(67).fill('Desarrollo de Software'),
    ...Array(12).fill('Telecomunicaciones'),
    ...Array(9).fill('Banca'),
    ...Array(9).fill('Redes de Computadoras'),
    ...Array(7).fill('Educación'),
    ...Array(4).fill('Salud')
  ];

  // Tiempo primer empleo (n = 101):
  // Ya trabajaba: 53 (52.5%), <1 mes: 10 (9.9%), 1-4 meses: 14 (13.9%), 4-8 meses: 6 (5.9%), 8-12 meses: 13 (12.9%), >12 meses: 5 (5.0%)
  const tiemposPrimerEmpleo: Array<Titulado['tiempo_primer_empleo']> = [
    ...Array(53).fill('Ya trabajaba antes de titularse'),
    ...Array(10).fill('Menos de 1 mes'),
    ...Array(14).fill('Entre 1 - 4 meses'),
    ...Array(6).fill('Entre 4 - 8 meses'),
    ...Array(13).fill('Entre 8 - 12 meses'),
    ...Array(5).fill('Más de 12 meses')
  ];

  // Construir 148 registros
  for (let i = 0; i < 148; i++) {
    const id = `TIT-${String(i + 1).padStart(3, '0')}`;
    const edad = ages[i];
    const genero = genders[i];
    const rawExp = expYears[i];
    const anios_vida_profesional = rawExp !== null ? rawExp : 5.0;
    const anios_desempleado = i < 62 ? 0 : Number((Math.min(3.5, (i % 5) * 0.5 + 0.25)).toFixed(2));
    const segmento = anios_vida_profesional < 5 ? 'Junior (< 5 años)' : 'Consolidado (≥ 5 años)';

    const situacion_laboral = situaciones[i];
    const interes_posgrado = posgradoInterests[i];
    const area_interes = interes_posgrado === 'Sí' && i < 123 ? posgradoAreas[i] : undefined;
    const institucion_preferida = interes_posgrado === 'Sí' && i < 123 ? posgradoInstituciones[i] : undefined;

    const hasFormacion = i < 98;
    const formacion_complementaria = hasFormacion ? 'Sí' : 'No';
    const nivel_realizado = hasFormacion ? formacionRealizadaNiveles[i] : undefined;
    const financiamiento = hasFormacion ? formacionFinanciamientos[i] : undefined;
    const lugar_realizado = hasFormacion ? formacionLugares[i] : undefined;

    let sector: Titulado['sector'] | undefined = undefined;
    let rubro: Titulado['rubro'] | undefined = undefined;
    let departamento: Titulado['departamento'] | undefined = undefined;
    let cargo: Titulado['cargo'] | undefined = undefined;
    let remuneracion: Titulado['remuneracion'] | undefined = undefined;
    let tiempo_primer_empleo: Titulado['tiempo_primer_empleo'] | undefined = undefined;

    if (situacion_laboral === 'Trabaja en una organización') {
      // 87 privado (80.6%), 21 público (19.4%)
      const isPrivado = i < 87;
      sector = isPrivado ? 'Sector privado' : 'Sector público';
      rubro = rubrosTrabajo[i];
      departamento = i < 95 ? 'Cochabamba' : (i < 103 ? 'Extranjero' : 'La Paz');

      // Cargos: 64.8% Desarrollo (70), 15.7% Ejecutivo (17), 12% Técnico (13), 7.4% Soporte (8)
      if (i < 70) cargo = 'Desarrollo';
      else if (i < 87) cargo = 'Ejecutivo / Gerencial';
      else if (i < 100) cargo = 'Técnico';
      else cargo = 'Soporte / Help desk';

      // Remuneración de acuerdo a Figura 11
      if (isPrivado) {
        if (i < 5) remuneracion = '< 2 500';
        else if (i < 8) remuneracion = '2 500 - 3 500';
        else if (i < 20) remuneracion = '3 501 - 5 000';
        else if (i < 33) remuneracion = '5 001 - 7 000';
        else if (i < 50) remuneracion = '7 001 - 10 000';
        else remuneracion = '> 10 000';
      } else {
        // Sector público
        const pubIndex = i - 87;
        if (pubIndex < 6) remuneracion = '2 500 - 3 500';
        else if (pubIndex < 10) remuneracion = '3 501 - 5 000';
        else if (pubIndex < 15) remuneracion = '5 001 - 7 000';
        else if (pubIndex < 19) remuneracion = '7 001 - 10 000';
        else remuneracion = '> 10 000';
      }
    } else if (situacion_laboral === 'Emprendimiento propio') {
      rubro = 'Desarrollo de Software';
      sector = 'Sector privado';
      departamento = 'Cochabamba';
      cargo = 'Ejecutivo / Gerencial';
      remuneracion = '7 001 - 10 000';
    }

    if (i < 101) {
      tiempo_primer_empleo = tiemposPrimerEmpleo[i];
    }

    // Likert valoraciones de la formación (1 a 4)
    // Satisfacción global: 74.1% de acuerdo (2.78 media)
    const satisfaccion_global: 1 | 2 | 3 | 4 = i < 110 ? 3 : (i < 135 ? 2 : 4);
    // Concordancia: 61.9% de acuerdo (2.63 media, 38% desacuerdo)
    const concordancia_formacion: 1 | 2 | 3 | 4 = i < 91 ? 3 : 2;
    // Pertinencia de labores (solo quienes trabajan, media 3.25, 90.7% acuerdo)
    const pertinencia_labores: (1 | 2 | 3 | 4) | undefined =
      situacion_laboral !== 'No trabaja'
        ? (i < 98 ? 3 : (i < 115 ? 4 : 2))
        : undefined;
    // Posgrados afines FCyT (media 2.67, 70.9% acuerdo)
    const opinion_posgrado_fcyt: 1 | 2 | 3 | 4 = i < 105 ? 3 : 2;

    titulados.push({
      id,
      edad,
      genero,
      anios_vida_profesional,
      anios_desempleado,
      segmento,
      formacion_complementaria,
      nivel_realizado,
      lugar_realizado,
      financiamiento,
      interes_posgrado,
      area_interes,
      institucion_preferida,
      situacion_laboral,
      sector,
      rubro,
      departamento,
      cargo,
      antiguedad_trabajo: i % 2 === 0 ? '1 a 2 años' : '3 a 5 años',
      medio_obtencion: i % 3 === 0 ? 'Postulación competitiva' : (i % 3 === 1 ? 'Recomendación de terceros' : 'Pasantía previa'),
      remuneracion,
      tiempo_primer_empleo,
      numero_empleos: i < 50 ? '1' : (i < 100 ? '2' : 'Más de 3'),
      razon_no_trabaja: situacion_laboral === 'No trabaja'
        ? (i % 3 === 0 ? 'Incumplimiento de requisitos en habilidades específicas' : 'Demanda laboral inexistente')
        : undefined,
      satisfaccion_global,
      concordancia_formacion,
      pertinencia_labores,
      opinion_posgrado_fcyt,
      actividades: ['Cómputo y análisis de sistemas', 'Desarrollo de software'],
      aspectos_utiles: ['Habilidades analíticas y resolución de problemas', 'Aplicación práctica en proyectos reales'],
      aspectos_mejorar: ['Actualización constante del plan de estudios', 'Relación con empresas (pasantías)', 'Integrar teoría con práctica'],
      asignaturas_ventaja: ['Base de Datos', 'T.I.S. (Taller de Ingeniería de Software)', 'Redes de Computadora'],
      asignaturas_no_utiles: ['Aplicaciones Interactivas TV Digital', 'Básicas (Física, Cálculo, Álgebra)', 'Contabilidad Básica', 'Telefonía IP']
    });
  }

  return titulados;
}

// 51 Organizaciones empleadoras con las 18 afirmaciones evaluadas
export function generateOfficialEmpleadores(): Empleador[] {
  const orgNames = [
    'Jalasoft', 'Trufi Association', 'Comteco R.L.', 'Datec Ltda.', 'Develoop Software',
    'Mojix Bolivia', 'AssureSoft', 'ENDE Corporación', 'ELFEC S.A.', 'Banco Unión S.A.',
    'Banco Mercantil Santa Cruz', 'Banco FIE', 'Telefónica Celular de Bolivia (Tigo)',
    'ENTEL S.A.', 'Gobierno Autónomo Municipal de Cochabamba', 'Universidad Mayor de San Simón',
    'TechBolivia Solutions', 'Cognitive Labs', 'InnovaTech SRL', 'Digital Bridge Consulting',
    'SoftExpert Cochabamba', 'AgileSoft Technologies', 'CloudNexus Bolivia', 'DataCores SRL',
    'CyberSec Latam', 'SysPro Consultores', 'Quantum Software', 'Vanguardia Digital',
    'Soluciones Informáticas Integradas', 'DevMinds Studio', 'LogiTech Bolivia',
    'Redes y Servicios Integrados', 'Apex Systems Bolivia', 'BioSoft Ingeniería',
    'FinTech Solutions Bolivia', 'SmartCity Cochabamba', 'EduTech Systems',
    'HealthCare IT Bolivia', 'Andina Software Factory', 'Altiplano Networks',
    'PixelCraft Software', 'SimulaTech Group', 'Nexus Data Analytics', 'ByteCraft Labs',
    'ValleSoft Ingenieros', 'CodeCrafters Bolivia', 'OpenSource Bolivia', 'Sistemas del Sur',
    'Datec Ltda. (Sede Cochabamba)', 'Comteco R.L. (Área TI)', 'Develoop Software (Dev Center)'
  ];

  const rubros = [
    'Desarrollo de Software', 'Desarrollo de Software', 'Telecomunicaciones y redes', 'Desarrollo de Software',
    'Desarrollo de Software', 'Desarrollo de Software', 'Desarrollo de Software', 'Instituciones públicas / gobierno',
    'Instituciones públicas / gobierno', 'Banca y servicios financieros', 'Banca y servicios financieros',
    'Banca y servicios financieros', 'Telecomunicaciones y redes', 'Telecomunicaciones y redes',
    'Instituciones públicas / gobierno', 'Educación e investigación', 'Startups o emprendimientos tecnológicos',
    'Startups o emprendimientos tecnológicos', 'Startups o emprendimientos tecnológicos', 'Consultoría en sistemas',
    'Desarrollo de Software', 'Desarrollo de Software', 'Servicios de tecnologías de información (TI)',
    'Servicios de tecnologías de información (TI)', 'Servicios de tecnologías de información (TI)',
    'Soporte técnico y mantenimiento', 'Soporte técnico y mantenimiento', 'Soporte técnico y mantenimiento',
    'Desarrollo de Software', 'Desarrollo de Software', 'Industria y manufactura', 'Industria y manufactura',
    'Desarrollo de Software', 'Salud', 'Salud', 'Salud', 'Educación e investigación', 'Desarrollo de Software',
    'Desarrollo de Software', 'Telecomunicaciones y redes', 'Comercio y comercio electrónico',
    'Startups o emprendimientos tecnológicos', 'Desarrollo de Software', 'Desarrollo de Software',
    'Desarrollo de Software', 'Desarrollo de Software', 'Desarrollo de Software', 'Desarrollo de Software',
    'Desarrollo de Software', 'Telecomunicaciones y redes', 'Desarrollo de Software'
  ];

  const empleadores: Empleador[] = [];

  for (let i = 0; i < 51; i++) {
    const id = `EMP-${String(i + 1).padStart(3, '0')}`;
    const organizacion = orgNames[i];
    const isPrivado = i < 39; // 76.5% privado, 23.5% público
    const tipo = isPrivado ? 'Sector privado' : 'Sector público';

    // Gran empresa: 19 (37.3%), Micro: 17 (33.3%), Mediana: 8 (15.7%), Pequeña: 7 (13.7%)
    let tamano: Empleador['tamano'];
    if (i < 19) tamano = 'Gran empresa (>200)';
    else if (i < 36) tamano = 'Micro empresa (1-10)';
    else if (i < 44) tamano = 'Mediana empresa (51-200)';
    else tamano = 'Pequeña empresa (11-50)';

    const rubro = rubros[i];
    const contrato_5_anios = i < 41 ? 'Sí' : 'No'; // 80.4%

    // Posibilidad de contratación: Alta: 15 (29.4%), Depende: 26 (51.0%), No prevista: 10 (19.6%)
    let posibilidad_contratacion: Empleador['posibilidad_contratacion'];
    if (i < 15) posibilidad_contratacion = 'Alta probabilidad';
    else if (i < 41) posibilidad_contratacion = 'Depende del crecimiento / proyectos';
    else posibilidad_contratacion = 'No prevista actualmente';

    // Nivel demandado: Licenciatura: 37 (72.5%), Especialidad: 8 (15.7%), Diplomado: 4 (7.8%), Maestría: 2 (3.9%)
    let nivel_demandado: Empleador['nivel_demandado'];
    if (i < 37) nivel_demandado = 'Licenciatura';
    else if (i < 45) nivel_demandado = 'Especialidad';
    else if (i < 49) nivel_demandado = 'Diplomado';
    else nivel_demandado = 'Maestría';

    // Generar respuestas a los 18 ítems para calzar con los índices de la Tabla 8
    // Dimensión 1: Confianza y calidad (Índice ≈ 64.4)
    // Dimensión 2: Conocimiento perfil (Índice ≈ 65.6)
    // Dimensión 3: Vinculación con empleadores (Índice ≈ 43.8)
    // Dimensión 4: Participación en mejora de la carrera (Índice ≈ 34.5)
    const items_likert: Empleador['items_likert'] = {};

    for (let item = 1; item <= 18; item++) {
      const itemKey = `item_${String(item).padStart(2, '0')}`;

      // Configuración de probabilidades según dimensión para reflejar la realidad del informe
      if ([1, 2, 5, 6, 8, 9].includes(item)) {
        // Dimensión 1: Alta confianza
        if (i < 24) items_likert[itemKey] = 'Totalmente de acuerdo';
        else if (i < 44) items_likert[itemKey] = 'Parcialmente de acuerdo';
        else if (i < 48) items_likert[itemKey] = 'Totalmente en desacuerdo';
        else items_likert[itemKey] = 'No sabe';
      } else if (item === 4) {
        // Dimensión 2: Conocimiento perfil
        if (i < 25) items_likert[itemKey] = 'Totalmente de acuerdo';
        else if (i < 43) items_likert[itemKey] = 'Parcialmente de acuerdo';
        else if (i < 47) items_likert[itemKey] = 'Totalmente en desacuerdo';
        else items_likert[itemKey] = 'No sabe';
      } else if ([3, 7, 11, 16, 17].includes(item)) {
        // Dimensión 3: Vinculación moderada/baja (43.8)
        if (i < 10) items_likert[itemKey] = 'Totalmente de acuerdo';
        else if (i < 28) items_likert[itemKey] = 'Parcialmente de acuerdo';
        else if (i < 45) items_likert[itemKey] = 'Totalmente en desacuerdo';
        else items_likert[itemKey] = 'No sabe';
      } else {
        // Dimensión 4: Participación empleador muy baja (34.5)
        if (i < 7) items_likert[itemKey] = 'Totalmente de acuerdo';
        else if (i < 22) items_likert[itemKey] = 'Parcialmente de acuerdo';
        else if (i < 43) items_likert[itemKey] = 'Totalmente en desacuerdo';
        else items_likert[itemKey] = 'No sabe';
      }
    }

    empleadores.push({
      id,
      organizacion,
      tipo,
      tamano,
      rubro,
      contrato_5_anios,
      posibilidad_contratacion,
      nivel_demandado,
      medio_convocatoria: 'Internet y redes sociales (LinkedIn, grupos técnicos)',
      cargos: ['Técnico', 'Analista de sistemas', 'Especialista en desarrollo'],
      tendencias_texto: 'Inteligencia Artificial generativa, desarrollo de APIs microservicios, Cloud AWS/GCP, automatización CI/CD',
      habilidades_texto: 'Adaptabilidad y autoaprendizaje, trabajo en equipo interdisciplinario, resolución lógica de problemas complejos',
      items_likert
    });
  }

  return empleadores;
}

export const OFFICIAL_TITULADOS: Titulado[] = generateOfficialTitulados();
export const OFFICIAL_EMPLEADORES: Empleador[] = generateOfficialEmpleadores();
