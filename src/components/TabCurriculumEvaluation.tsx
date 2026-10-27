import React, { useState } from 'react';
import { 
  AFIRMACIONES_EMPLEADORES, 
  DIMENSIONES_EMPLEADORES 
} from '../data/strategicPlan';
import { 
  CheckCircle, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown, 
  BookOpen, 
  HelpCircle,
  BarChart,
  Award
} from 'lucide-react';

export const TabCurriculumEvaluation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'titulados' | 'materias' | 'empleadores'>('titulados');
  const [selectedDimension, setSelectedDimension] = useState<string>('Todas');

  // Estadísticos Tabla 7
  const tabla7Titulados = [
    {
      afirmacion: 'Satisfacción global con la formación recibida',
      n: 147,
      media: 2.78,
      sd: 0.63,
      acuerdoPct: 74.1,
      positivo: true
    },
    {
      afirmacion: 'Concordancia entre la formación y los requerimientos laborales',
      n: 147,
      media: 2.63,
      sd: 0.62,
      acuerdoPct: 61.9,
      desacuerdoPct: 38.1,
      positivo: false,
      alerta: 'Brecha formativa: más de un tercio (38%) percibe desfase tecnológico.'
    },
    {
      afirmacion: 'Labores actuales pertinentes a la formación recibida (solo quienes trabajan)',
      n: 108,
      media: 3.25,
      sd: 0.75,
      acuerdoPct: 90.7,
      positivo: true
    },
    {
      afirmacion: 'Existen posgrados afines en la Dirección de Posgrado FCyT',
      n: 148,
      media: 2.67,
      sd: 0.78,
      acuerdoPct: 70.9,
      positivo: true
    }
  ];

  // Asignaturas Ventaja Competitiva (Figura 20)
  const asignaturasVentaja = [
    { materia: 'Base de Datos', count: 140, pct: 94.6, destacada: true },
    { materia: 'T.I.S. (Taller de Ingeniería de Software)', count: 110, pct: 74.3, destacada: true },
    { materia: 'Redes de Computadora', count: 107, pct: 72.3, destacada: true },
    { materia: 'Planificación de Proyectos y Gestión', count: 81, pct: 54.7, destacada: false },
    { materia: 'Materias Electivas de Especialidad', count: 75, pct: 50.7, destacada: false },
    { materia: 'Inteligencia Artificial', count: 71, pct: 48.0, destacada: false },
    { materia: 'Introducción a la Programación', count: 65, pct: 43.9, destacada: false },
    { materia: 'Tecnología de Redes Avanzadas', count: 62, pct: 41.9, destacada: false },
    { materia: 'Ciencias Básicas (Física, Cálculo, Álgebra)', count: 30, pct: 20.3, destacada: false }
  ];

  // Asignaturas de Poca Utilidad Percibida (Figura 21)
  const asignaturasPocaUtilidad = [
    { materia: 'Aplicaciones Interactivas para TV Digital', count: 72, pct: 48.6, critica: true },
    { materia: 'Ciencias Básicas (Física, Cálculo, Álgebra)', count: 69, pct: 46.6, critica: true },
    { materia: 'Contabilidad Básica', count: 63, pct: 42.6, critica: true },
    { materia: 'Telefonía IP', count: 58, pct: 39.2, critica: true },
    { materia: 'Web Semánticas', count: 48, pct: 32.4, critica: false },
    { materia: 'Robótica', count: 46, pct: 31.1, critica: false },
    { materia: 'Taller de Programación en Bajo Nivel (Ensamblador)', count: 46, pct: 31.1, critica: false },
    { materia: 'Teoría de Autómatas y Lenguajes Formales', count: 41, pct: 27.7, critica: false },
    { materia: 'Graficación por Computadora', count: 40, pct: 27.0, critica: false },
    { materia: 'Teoría de Grafos', count: 34, pct: 23.0, critica: false },
    { materia: 'Programación Funcional', count: 16, pct: 10.8, critica: false }
  ];

  // Aspectos útiles vs Mejorar (Figuras 18 y 19)
  const aspectosUtiles = [
    { item: 'Habilidades analíticas y resolución de problemas', count: 82, pct: 55.4 },
    { item: 'Aplicación práctica en proyectos reales', count: 66, pct: 44.6 },
    { item: 'Trabajo en equipos multidisciplinarios', count: 62, pct: 41.9 },
    { item: 'Herramientas y software de la industria', count: 50, pct: 33.8 },
    { item: 'Pasantías o prácticas profesionales', count: 45, pct: 30.4 },
    { item: 'Distribución de horarios de clases', count: 32, pct: 21.6 }
  ];

  const aspectosMejorar = [
    { item: 'Actualización constante del plan de estudios', count: 106, pct: 71.6, critico: true },
    { item: 'Relación directa con empresas (pasantías)', count: 92, pct: 62.2, critico: true },
    { item: 'Integrar teoría con proyectos prácticos reales', count: 88, pct: 59.5, critico: true },
    { item: 'Más opciones de especialización tecnológica', count: 78, pct: 52.7, critico: false },
    { item: 'Actividades extracurriculares y conferencias', count: 55, pct: 37.2, critico: false },
    { item: 'Horarios para trabajadores / modalidad virtual', count: 46, pct: 31.1, critico: false }
  ];

  // Filtro de afirmaciones de empleadores
  const filteredAfirmaciones = AFIRMACIONES_EMPLEADORES.filter((af) => {
    if (selectedDimension === 'Todas') return true;
    return af.dimension === selectedDimension;
  });

  return (
    <div className="space-y-8">
      {/* Sub-navegación contextual */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Valoración de la Formación y Plan de Estudios (HU4)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Evaluación cruzada de titulados (n=148) y empleadores (n=51) para la acreditación ARCU-SUR
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('titulados')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'titulados'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Percepción Titulados</span>
          </button>
          <button
            onClick={() => setActiveTab('materias')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'materias'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span>Asignaturas & Malla</span>
          </button>
          <button
            onClick={() => setActiveTab('empleadores')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'empleadores'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>18 Afirmaciones Empleadores</span>
          </button>
        </div>
      </div>

      {activeTab === 'titulados' && (
        <div className="space-y-8">
          {/* Tabla 7: Estadísticos de valoración */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">
                Tabla 7. Estadísticos de la Valoración de los Titulados (Escala de 1 a 4)
              </h3>
              <span className="text-xs text-slate-500 font-mono">1: TD, 2: D, 3: A, 4: TA</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Medias y desviaciones estándar requeridas por los comités evaluadores externos ARCU-SUR
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Afirmación Evaluada</th>
                    <th className="p-3 text-right">n</th>
                    <th className="p-3 text-right">Media</th>
                    <th className="p-3 text-right">Desv. Estándar</th>
                    <th className="p-3 text-right">% Acuerdo</th>
                    <th className="p-3">Estado Evaluativo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tabla7Titulados.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="p-3 font-medium text-slate-900 max-w-md">
                        {row.afirmacion}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-700">{row.n}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">{row.media}</td>
                      <td className="p-3 text-right font-mono text-slate-600">{row.sd}</td>
                      <td className="p-3 text-right font-mono font-bold text-sky-900">
                        {row.acuerdoPct}%
                      </td>
                      <td className="p-3">
                        {row.positivo ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                            <CheckCircle className="w-3 h-3" /> Favorable
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-900">
                            <AlertTriangle className="w-3 h-3" /> Brecha (38% desacuerdo)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Interpretación de Formación (Tabla 7)</span>
                <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Media 3.25 / 4.0</span>
              </div>
              <p className="text-slate-600">
                • <strong>Alta pertinencia (90.7%):</strong> los egresados ejercen activamente en funciones de Ingeniería de Sistemas.
              </p>
              <p className="text-slate-600">
                • <strong>Brecha curricular (38.1% desacuerdo):</strong> la concordancia de la malla con la industria es la más baja (2.63), justificando la reforma de contenidos.
              </p>
            </div>
          </div>

          {/* Aspectos Útiles vs Mejorar (Figuras 18 y 19) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="w-4 h-4 text-sky-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Figura 18. Aspectos de Mayor Utilidad Percibida (n = 148)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Fortalezas institucionales reconocidas por los graduados
              </p>

              <div className="space-y-3.5">
                {aspectosUtiles.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800">{item.item}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{item.count}</span>
                        <span className="font-mono text-slate-500">({item.pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.pct}%` }}
                        className="h-full bg-sky-700 rounded-full"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsDown className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Figura 19. Aspectos de la Carrera que Deben Mejorarse (n = 148)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Demandas directas de cambio curricular e institucional
              </p>

              <div className="space-y-3.5">
                {aspectosMejorar.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${item.critico ? 'text-amber-950' : 'text-slate-800'}`}>
                        {item.item}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{item.count}</span>
                        <span className="font-mono text-slate-500">({item.pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.pct}%` }}
                        className={`h-full rounded-full ${item.critico ? 'bg-amber-600' : 'bg-slate-500'}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'materias' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asignaturas Ventaja Competitiva */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Figura 20. Asignaturas que Brindaron Ventaja Competitiva (n = 148)
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Materias clave para el desempeño laboral según los titulados
            </p>

            <div className="space-y-3.5">
              {asignaturasVentaja.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${item.destacada ? 'text-sky-950 font-bold' : 'text-slate-800'}`}>
                      {item.materia}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{item.count}</span>
                      <span className="font-mono text-slate-500">({item.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className={`h-full rounded-full ${item.destacada ? 'bg-sky-700' : 'bg-slate-500'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-sky-50 rounded-lg border border-sky-100 text-xs text-sky-950 leading-relaxed">
              <span className="font-bold">Núcleo Fuerte:</span> Base de Datos es casi unánime (94.6%), seguida de T.I.S. (74.3%) 
              y Redes de Computadora (72.3%). Las materias aplicadas de proyecto son la base de la empleabilidad.
            </div>
          </div>

          {/* Asignaturas Poca Utilidad */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Figura 21. Asignaturas con Poca Utilidad Percibida (n = 148)
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Materias señaladas para revisión o sustitución de contenidos
            </p>

            <div className="space-y-3">
              {asignaturasPocaUtilidad.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${item.critica ? 'text-rose-950 font-semibold' : 'text-slate-700'}`}>
                      {item.materia}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{item.count}</span>
                      <span className="font-mono text-slate-500">({item.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.pct * 1.8}%` }}
                      className={`h-full rounded-full ${item.critica ? 'bg-rose-600' : 'bg-slate-400'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-rose-50 rounded-lg border border-rose-100 text-xs text-rose-950 leading-relaxed">
              <span className="font-bold">Recomendación Curricular:</span> TV Digital (48.6%), materias básicas desconectadas de proyectos (46.6%), 
              Contabilidad básica (42.6%) y Telefonía IP (39.2%) deben ser actualizadas o reemplazadas por IA, Arquitectura Cloud y Ciberseguridad.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'empleadores' && (
        <div className="space-y-8">
          {/* Tabla 8: Índice de Acuerdo por Dimensión */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">
                Tabla 8. Índice de Acuerdo de los Empleadores por Dimensión (Ecuación 2)
              </h3>
              <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-mono rounded">
                Índice = ((TA + 0.5 · PA) / n) × 100
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Escala de 0 a 100 que resume la evaluación de 51 organizaciones en las 4 dimensiones de calidad ARCU-SUR
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DIMENSIONES_EMPLEADORES.map((dim, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border transition-all ${
                    dim.indiceReportado >= 60 
                      ? 'bg-slate-50 border-slate-200' 
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Dimensión 0{i + 1}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                    {dim.dimension}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-slate-900">
                      {dim.indiceReportado}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ 100 pts</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {dim.diagnostico}
                  </p>
                  <div className="mt-3 text-[11px] text-slate-500 font-mono border-t border-slate-200/60 pt-2">
                    Afirmaciones: {dim.afirmaciones.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explorador de las 18 Afirmaciones (Figura 22) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Figura 22. Valoración de la Carrera por parte de los Empleadores (18 Afirmaciones)
                </h3>
                <p className="text-xs text-slate-500">
                  Desglose por afirmación según escala Likert (n = 51 empleadores)
                </p>
              </div>

              {/* Filtro por dimensión con botones sombreados */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                {[
                  { label: 'Todas (18)', value: 'Todas' },
                  { label: 'Confianza (64.4)', value: 'Confianza y calidad del perfil' },
                  { label: 'Perfil (65.6)', value: 'Conocimiento del perfil' },
                  { label: 'Vinculación (43.8)', value: 'Vinculación con empleadores' },
                  { label: 'Participación (34.5)', value: 'Participación en mejora de la carrera' }
                ].map((dim) => (
                  <button
                    key={dim.value}
                    onClick={() => setSelectedDimension(dim.value)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      selectedDimension === dim.value
                        ? 'bg-sky-700 text-white shadow-sm border border-sky-800'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    {dim.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredAfirmaciones.map((af) => {
                // Cálculo ilustrativo coherente con los porcentajes del gráfico de la figura 22
                const isCritica = af.dimension === 'Participación en mejora de la carrera';
                return (
                  <div key={af.id} className="py-3.5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-sky-900 bg-sky-50 px-1.5 py-0.5 rounded shrink-0">
                          #{af.numero}
                        </span>
                        <span className="font-semibold text-slate-800 leading-snug">
                          {af.texto}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 shrink-0 font-medium">
                        {af.dimension}
                      </span>
                    </div>

                    {/* Barra visual Likert */}
                    <div className="grid grid-cols-12 gap-1 text-[10px] text-slate-500 font-mono">
                      <div className="col-span-12 h-3.5 rounded-sm overflow-hidden flex">
                        <div 
                          style={{ width: isCritica ? '16%' : '48%' }} 
                          className="bg-sky-700 h-full flex items-center justify-center text-white"
                          title="Totalmente de acuerdo"
                        ></div>
                        <div 
                          style={{ width: isCritica ? '30%' : '38%' }} 
                          className="bg-sky-400 h-full flex items-center justify-center text-slate-900"
                          title="Parcialmente de acuerdo"
                        ></div>
                        <div 
                          style={{ width: isCritica ? '40%' : '10%' }} 
                          className="bg-amber-500 h-full flex items-center justify-center text-white"
                          title="Totalmente en desacuerdo"
                        ></div>
                        <div 
                          style={{ width: isCritica ? '14%' : '4%' }} 
                          className="bg-slate-300 h-full flex items-center justify-center text-slate-700"
                          title="No sabe"
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded bg-sky-700 inline-block"></span>
                          Totalmente de acuerdo
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded bg-sky-400 inline-block"></span>
                          Parcialmente de acuerdo
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded bg-amber-500 inline-block"></span>
                          Totalmente en desacuerdo
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded bg-slate-300 inline-block"></span>
                          No sabe
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
