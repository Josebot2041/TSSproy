/**
 * Parser y normalizador de archivos CSV / Excel de encuestas ARCU-SUR
 * Compatible con delimitador por punto y coma (;) o coma (,)
 * Procesa las exportaciones reales de Microsoft Forms y Google Forms de la UMSS
 */

import { Titulado, Empleador } from '../types';

/**
 * Parsea una cadena de texto CSV con soporte para comillas y saltos de línea dentro de campos
 */
export function parseCSV(text: string, delimiter?: string): string[][] {
  // Detección automática del delimitador si no se especifica
  if (!delimiter) {
    const firstLine = text.split(/\r\n|\n|\r/)[0] || '';
    const semicolons = (firstLine.match(/;/g) || []).length;
    const commas = (firstLine.match(/,/g) || []).length;
    delimiter = semicolons >= commas ? ';' : ',';
  }

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  // Limpiar posible BOM al inicio del archivo
  const cleanText = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // saltar comilla escapada
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // saltar \n en \r\n
      }
      currentRow.push(currentField.trim());
      if (currentRow.length > 0 && currentRow.some((c) => c !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((c) => c !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Convierte registros CSV de Titulados al modelo estandarizado de la aplicación
 */
export function parseTituladosCSV(csvText: string): { data: Titulado[]; errors: string[] } {
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    return { data: [], errors: ['El archivo no contiene suficientes filas (encabezado + datos)'] };
  }

  const rawHeaders = rows[0].map((h) => h.toLowerCase().replace(/["\s_]/g, ''));
  const data: Titulado[] = [];
  const errors: string[] = [];

  // Mapeo flexible de columnas por nombres habituales
  const getCol = (row: string[], names: string[]): string => {
    for (const name of names) {
      const idx = rawHeaders.findIndex((h) => h.includes(name));
      if (idx !== -1 && row[idx] !== undefined) {
        return row[idx].replace(/^"|"$/g, '').trim();
      }
    }
    return '';
  };

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    try {
      const idRaw = getCol(row, ['id']) || `TIT-${String(r).padStart(3, '0')}`;
      const edadRaw = getCol(row, ['edad']);
      let edad: Titulado['edad'] = '27 - 30 años';
      if (edadRaw.includes('19') || edadRaw.includes('22')) edad = '19 - 22 años';
      else if (edadRaw.includes('23') || edadRaw.includes('26')) edad = '23 - 26 años';
      else if (edadRaw.includes('27') || edadRaw.includes('30') || edadRaw.includes('25-34')) edad = '27 - 30 años';
      else if (edadRaw.includes('31') || edadRaw.includes('34')) edad = '31 - 34 años';
      else if (edadRaw.includes('35')) edad = '35 años o más';

      const generoRaw = getCol(row, ['genero', 'sexo']).toLowerCase();
      const genero: Titulado['genero'] = generoRaw.includes('fem') || generoRaw.includes('mujer') ? 'Femenino' : 'Masculino';

      const expNum = parseFloat(getCol(row, ['aniosvidaprofesional', 'experiencia', 'antiguedad'])) || 0;
      const desempNum = parseFloat(getCol(row, ['aniosdesempleo', 'desempleo'])) || 0;
      const anios_vida_profesional = Math.max(0, expNum);
      const anios_desempleado = Math.min(anios_vida_profesional, Math.max(0, desempNum));
      const segmento = anios_vida_profesional < 5 ? 'Junior (< 5 años)' : 'Consolidado (≥ 5 años)';

      const formCompRaw = getCol(row, ['formacioncomplementaria']).toLowerCase();
      const formacion_complementaria: 'Sí' | 'No' = (formCompRaw === 'true' || formCompRaw === 'sí' || formCompRaw === 'si') ? 'Sí' : 'No';

      const nivelRaw = getCol(row, ['nivelposgrado', 'nivelrealizado']);
      let nivel_realizado: Titulado['nivel_realizado'] | undefined = undefined;
      if (nivelRaw.toLowerCase().includes('diplomad')) nivel_realizado = 'Diplomado';
      else if (nivelRaw.toLowerCase().includes('maestr')) nivel_realizado = 'Maestría';
      else if (nivelRaw.toLowerCase().includes('especial')) nivel_realizado = 'Especialidad';
      else if (nivelRaw.toLowerCase().includes('doctor')) nivel_realizado = 'Doctorado';

      const lugar_realizado = (getCol(row, ['institucionposgrado', 'lugarrealizado']) || undefined) as any;
      const financiamiento = (getCol(row, ['fuentefinanciamiento', 'financiamiento']) || undefined) as any;

      const interesRaw = getCol(row, ['interesposgrado']).toLowerCase();
      const interes_posgrado: 'Sí' | 'No' = (interesRaw === 'true' || interesRaw === 'sí' || interesRaw === 'si') ? 'Sí' : 'No';

      const areaRaw = getCol(row, ['areainteresposgrado', 'areainteres']);
      let area_interes: Titulado['area_interes'] | undefined = undefined;
      if (areaRaw.toLowerCase().includes('inteligencia') || areaRaw.toLowerCase().includes('ia')) area_interes = 'IA';
      else if (areaRaw.toLowerCase().includes('software')) area_interes = 'Ingeniería de Software';
      else if (areaRaw.toLowerCase().includes('redes') || areaRaw.toLowerCase().includes('seguridad')) area_interes = 'Redes de Datos y Seguridad';
      else if (areaRaw.toLowerCase().includes('base de datos') || areaRaw.toLowerCase().includes('datos')) area_interes = 'Base de Datos';
      else if (areaRaw.toLowerCase().includes('rob')) area_interes = 'Robótica';

      const institucion_preferida = (getCol(row, ['organizacionposgrado', 'institucionpreferida']) || undefined) as any;

      const sitRaw = getCol(row, ['situacionlaboral']).toLowerCase();
      let situacion_laboral: Titulado['situacion_laboral'] = 'Trabaja en una organización';
      if (sitRaw.includes('emprend') || sitRaw.includes('propio')) situacion_laboral = 'Emprendimiento propio';
      else if (sitRaw.includes('no trabaja') || sitRaw.includes('desempleado') || sitRaw.includes('cesante')) situacion_laboral = 'No trabaja';

      const tiempo_primer_empleo = (getCol(row, ['tiempoprimerempleo']) || undefined) as any;

      // Likert scales
      const sat = parseInt(getCol(row, ['satisfaccioncarrera', 'satisfaccionglobal']), 10) || 3;
      const satisfaccion_global = Math.min(4, Math.max(1, sat)) as 1 | 2 | 3 | 4;

      const conc = parseInt(getCol(row, ['concordanciamercado', 'concordanciaformacion']), 10) || 3;
      const concordancia_formacion = Math.min(4, Math.max(1, conc)) as 1 | 2 | 3 | 4;

      const pert = parseInt(getCol(row, ['importanciaformacion', 'pertinencialabores']), 10) || 3;
      const pertinencia_labores = Math.min(4, Math.max(1, pert)) as 1 | 2 | 3 | 4;

      const opPos = parseInt(getCol(row, ['opinionposgradofcyt']), 10) || 3;
      const opinion_posgrado_fcyt = Math.min(4, Math.max(1, opPos)) as 1 | 2 | 3 | 4;

      // Listas de selección múltiple delimitadas por ';'
      const splitList = (val: string): string[] => {
        if (!val) return [];
        return val.split(';').map((s) => s.trim()).filter((s) => s.length > 0);
      };

      const aspectos_utiles = splitList(getCol(row, ['aspectosutiles']));
      const aspectos_mejorar = splitList(getCol(row, ['aspectosmejorar']));
      const asignaturas_ventaja = splitList(getCol(row, ['asignaturasutiles', 'asignaturasventaja']));
      const asignaturas_no_utiles = splitList(getCol(row, ['asignaturasinutiles', 'asignaturasnoutiles']));

      data.push({
        id: idRaw,
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
        sector: situacion_laboral !== 'No trabaja' ? 'Sector privado' : undefined,
        rubro: 'Desarrollo de Software',
        cargo: 'Desarrollo',
        tiempo_primer_empleo,
        satisfaccion_global,
        concordancia_formacion,
        pertinencia_labores,
        opinion_posgrado_fcyt,
        actividades: ['Desarrollo de software'],
        aspectos_utiles: aspectos_utiles.length > 0 ? aspectos_utiles : ['Habilidades analíticas y resolución de problemas'],
        aspectos_mejorar: aspectos_mejorar.length > 0 ? aspectos_mejorar : ['Actualización constante del plan de estudios'],
        asignaturas_ventaja: asignaturas_ventaja.length > 0 ? asignaturas_ventaja : ['Base de Datos', 'T.I.S.'],
        asignaturas_no_utiles: asignaturas_no_utiles.length > 0 ? asignaturas_no_utiles : ['Aplicaciones Interactivas para TV Digital']
      });
    } catch (err: any) {
      errors.push(`Fila ${r}: ${err?.message || 'Error al procesar registro'}`);
    }
  }

  return { data, errors };
}

/**
 * Convierte registros CSV de Empleadores al modelo de la aplicación
 */
export function parseEmpleadoresCSV(csvText: string): { data: Empleador[]; errors: string[] } {
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    return { data: [], errors: ['El archivo no contiene suficientes filas (encabezado + datos)'] };
  }

  const rawHeaders = rows[0].map((h) => h.toLowerCase().replace(/["\s_]/g, ''));
  const data: Empleador[] = [];
  const errors: string[] = [];

  const getCol = (row: string[], names: string[]): string => {
    for (const name of names) {
      const idx = rawHeaders.findIndex((h) => h.includes(name));
      if (idx !== -1 && row[idx] !== undefined) {
        return row[idx].replace(/^"|"$/g, '').trim();
      }
    }
    return '';
  };

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    try {
      const idRaw = getCol(row, ['id']) || `EMP-${String(r).padStart(3, '0')}`;
      const organizacion = getCol(row, ['nombreempresa', 'empresa', 'organizacion']) || `Empresa ${r}`;
      
      const tipoRaw = getCol(row, ['tipoorganizacion', 'tipo']).toLowerCase();
      const tipo: Empleador['tipo'] = tipoRaw.includes('pub') ? 'Sector público' : 'Sector privado';

      const tamanoRaw = getCol(row, ['tamano', 'tamanio']).toLowerCase();
      let tamano: Empleador['tamano'] = 'Mediana empresa (51-200)';
      if (tamanoRaw.includes('micro') || tamanoRaw.includes('1 a 10')) tamano = 'Micro empresa (1-10)';
      else if (tamanoRaw.includes('pequ') || tamanoRaw.includes('11 a 30') || tamanoRaw.includes('11 a 50')) tamano = 'Pequeña empresa (11-50)';
      else if (tamanoRaw.includes('gran') || tamanoRaw.includes('mas de 100') || tamanoRaw.includes('>200')) tamano = 'Gran empresa (>200)';

      const rubro = getCol(row, ['rubrosector', 'rubro']) || 'Desarrollo de software';
      const contrato5Raw = getCol(row, ['hacontratado5anios', 'contrato5']).toLowerCase();
      const contrato_5_anios: 'Sí' | 'No' = (contrato5Raw === 'true' || contrato5Raw === 'sí' || contrato5Raw === 'si') ? 'Sí' : 'No';

      const proyRaw = getCol(row, ['proyeccioncontratacion', 'posibilidad']).toLowerCase();
      let posibilidad_contratacion: Empleador['posibilidad_contratacion'] = 'Depende del crecimiento / proyectos';
      if (proyRaw.includes('alta') || proyRaw.includes('sí') || proyRaw.includes('si')) posibilidad_contratacion = 'Alta probabilidad';
      else if (proyRaw.includes('no')) posibilidad_contratacion = 'No prevista actualmente';

      const nivelRaw = getCol(row, ['nivelformaciondemanda', 'nivel']).toLowerCase();
      let nivel_demandado: Empleador['nivel_demandado'] = 'Licenciatura';
      if (nivelRaw.includes('especial')) nivel_demandado = 'Especialidad';
      else if (nivelRaw.includes('diplom')) nivel_demandado = 'Diplomado';
      else if (nivelRaw.includes('maestr')) nivel_demandado = 'Maestría';

      const medio_convocatoria = getCol(row, ['medioconvocatoria']) || 'Internet y Redes sociales';

      const splitList = (val: string): string[] => {
        if (!val) return [];
        return val.split(';').map((s) => s.trim()).filter((s) => s.length > 0);
      };
      const cargos = splitList(getCol(row, ['cargosdesempenados', 'cargos']));

      const tendencias_texto = [
        getCol(row, ['areasemergentes']),
        getCol(row, ['herramientastecnologicas'])
      ].filter(Boolean).join(', ') || 'Inteligencia artificial y desarrollo web';

      const habilidades_texto = getCol(row, ['habilidadesrequeridas', 'habilidades']) || 'Trabajo en equipo y adaptabilidad';

      // Ítems Likert del empleador
      const items_likert: Empleador['items_likert'] = {};
      const likertCols = [
        'likertconfianza',
        'likerttituloconsistente',
        'likertconsultaopinion',
        'likertconoceperfil',
        'likertperfilcoherente',
        'likertdesempenodestacado',
        'likertconsideraopinion',
        'likertcompetencias',
        'likertvalores',
        'likertparticipacion'
      ];

      likertCols.forEach((colName, idx) => {
        const itemKey = `item_${String(idx + 1).padStart(2, '0')}`;
        const val = parseInt(getCol(row, [colName]), 10);
        if (val >= 4) items_likert[itemKey] = 'Totalmente de acuerdo';
        else if (val === 3) items_likert[itemKey] = 'Parcialmente de acuerdo';
        else if (val === 2 || val === 1) items_likert[itemKey] = 'Totalmente en desacuerdo';
        else items_likert[itemKey] = 'No sabe';
      });

      data.push({
        id: idRaw,
        organizacion,
        tipo,
        tamano,
        rubro,
        contrato_5_anios,
        posibilidad_contratacion,
        nivel_demandado,
        medio_convocatoria,
        cargos: cargos.length > 0 ? cargos : ['Técnico', 'Analista de sistemas'],
        tendencias_texto,
        habilidades_texto,
        items_likert
      });
    } catch (err: any) {
      errors.push(`Fila ${r}: ${err?.message || 'Error al procesar empleador'}`);
    }
  }

  return { data, errors };
}
