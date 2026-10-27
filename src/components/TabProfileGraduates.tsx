import React, { useState } from 'react';
import { Titulado } from '../types';
import { 
  Users, 
  Clock, 
  GraduationCap, 
  TrendingUp, 
  DollarSign, 
  BookMarked,
  Layers,
  Sparkles
} from 'lucide-react';

interface TabProfileGraduatesProps {
  titulados: Titulado[];
}

export const TabProfileGraduates: React.FC<TabProfileGraduatesProps> = ({ titulados }) => {
  const [segmentFilter, setSegmentFilter] = useState<'Todos' | 'Junior' | 'Consolidado'>('Todos');

  // Filtrado reactivo si el usuario agrega nuevos titulados
  const filteredTitulados = titulados.filter((t) => {
    if (segmentFilter === 'Junior') return t.segmento.includes('Junior');
    if (segmentFilter === 'Consolidado') return t.segmento.includes('Consolidado');
    return true;
  });

  // Datos para gráficos de barras exactos del informe
  const ageDistribution = [
    { label: '19 - 22 años', count: 5, pct: 3.4 },
    { label: '23 - 26 años', count: 34, pct: 23.0 },
    { label: '27 - 30 años', count: 30, pct: 20.3 },
    { label: '31 - 34 años', count: 15, pct: 10.1 },
    { label: '35 años o más', count: 64, pct: 43.2 }
  ];

  const posgradoAreas = [
    { area: 'Inteligencia Artificial (IA)', count: 54, pct: 43.9, color: 'bg-indigo-600' },
    { area: 'Ingeniería de Software', count: 29, pct: 23.6, color: 'bg-sky-600' },
    { area: 'Redes de Datos y Seguridad', count: 25, pct: 20.3, color: 'bg-blue-600' },
    { area: 'Base de Datos', count: 10, pct: 8.1, color: 'bg-teal-600' },
    { area: 'Robótica', count: 5, pct: 4.1, color: 'bg-amber-600' }
  ];

  const preferredInstitutions = [
    { name: 'Dirección de Posgrado FCyT (UMSS)', count: 38, pct: 30.9, color: 'bg-sky-700' },
    { name: 'Universidades Internacionales (Exterior)', count: 31, pct: 25.2, color: 'bg-purple-700' },
    { name: 'Universidades Públicas Nacionales', count: 17, pct: 13.8, color: 'bg-slate-700' },
    { name: 'EUPG (Escuela Universitaria de Posgrado UMSS)', count: 13, pct: 10.6, color: 'bg-emerald-700' },
    { name: 'Otras Instituciones / Certificadoras', count: 11, pct: 8.9, color: 'bg-slate-500' },
    { name: 'Universidades Privadas Nacionales', count: 10, pct: 8.1, color: 'bg-amber-700' },
    { name: 'IBNORCA', count: 3, pct: 2.4, color: 'bg-rose-700' }
  ];

  const complementariaNivel = [
    { nivel: 'Diplomado', count: 66, pct: 67.3 },
    { nivel: 'Maestría', count: 27, pct: 27.6 },
    { nivel: 'Especialidad', count: 3, pct: 3.1 },
    { nivel: 'Doctorado', count: 2, pct: 2.0 }
  ];

  const complementariaLugar = [
    { lugar: 'Posgrado FCyT', count: 30, pct: 30.6 },
    { lugar: 'EUPG UMSS', count: 21, pct: 21.4 },
    { lugar: 'Univ. públicas nacionales', count: 20, pct: 20.4 },
    { lugar: 'Univ. privadas nacionales', count: 14, pct: 14.3 },
    { lugar: 'Otras instituciones', count: 8, pct: 8.2 },
    { lugar: 'Univ. internacionales', count: 5, pct: 5.1 }
  ];

  return (
    <div className="space-y-8">
      {/* Header de Sección con Filtro de Segmentación */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Demanda Educativa y Perfil de los Titulados (Capítulo 3)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Análisis de datos de 148 titulados de Ingeniería de Sistemas UMSS (Microsoft Forms)
          </p>
        </div>

        {/* Filtro interactivo de segmentación profesional con botones sombreados */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
          {(['Todos', 'Junior', 'Consolidado'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setSegmentFilter(seg)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
                segmentFilter === seg
                  ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{seg === 'Todos' ? `Todos (${titulados.length})` : seg === 'Junior' ? 'Junior (< 5 años)' : 'Consolidados (≥ 5 años)'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* HISTORIA DE USUARIO 1 (HU1): Antigüedad Profesional y Demografía */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tabla 2 Oficial */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-sky-800" />
              <h3 className="text-sm font-bold text-slate-900">
                Tabla 2. Estadísticos de Años de Vida Profesional (HU1)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Segmentación oficial según la guía metodológica de la cátedra para diseño curricular diferenciado.
            </p>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 font-semibold text-slate-700">
                <span>Indicador</span>
                <span>Valor Oficial</span>
              </div>
              <div className="flex justify-between p-2.5 hover:bg-slate-50/50">
                <span className="text-slate-600">Respuestas válidas</span>
                <span className="font-mono font-bold text-slate-900">145</span>
              </div>
              <div className="flex justify-between p-2.5 bg-sky-50/40">
                <span className="font-medium text-sky-950">Media aritmética</span>
                <span className="font-mono font-bold text-sky-950">8.83 años</span>
              </div>
              <div className="flex justify-between p-2.5 bg-sky-50/40">
                <span className="font-medium text-sky-950">Mediana</span>
                <span className="font-mono font-bold text-sky-950">6.00 años</span>
              </div>
              <div className="flex justify-between p-2.5 hover:bg-slate-50/50">
                <span className="text-slate-600">Desviación estándar</span>
                <span className="font-mono font-bold text-slate-900">7.92 años</span>
              </div>
              <div className="flex justify-between p-2.5 hover:bg-slate-50/50">
                <span className="text-slate-600">Primer y tercer cuartil (Q1 - Q3)</span>
                <span className="font-mono font-bold text-slate-900">2 y 14 años</span>
              </div>
              <div className="flex justify-between p-2.5 hover:bg-slate-50/50">
                <span className="text-slate-600">Rango de experiencia</span>
                <span className="font-mono font-bold text-slate-900">0 a 35 años</span>
              </div>
              <div className="flex justify-between p-2.5 bg-amber-50/50">
                <span className="font-medium text-amber-900">Junior (menos de 5 años)</span>
                <span className="font-mono font-bold text-amber-900">62 (42.8%)</span>
              </div>
              <div className="flex justify-between p-2.5 bg-emerald-50/50">
                <span className="font-medium text-emerald-900">Consolidados (5 años o más)</span>
                <span className="font-mono font-bold text-emerald-900">83 (57.2%)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Interpretación HU1</span>
              <span className="text-[11px] font-mono font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">Mediana 6 años</span>
            </div>
            <p className="text-slate-600">
              • <strong>Junior (42.8%):</strong> egresados con &lt; 5 años demandan cursos cortos de especialización práctica y bootcamps.
            </p>
            <p className="text-slate-600">
              • <strong>Consolidados (57.2%):</strong> profesionales con &ge; 5 años requieren programas ejecutivos de maestría y gestión.
            </p>
          </div>
        </div>

        {/* Gráfico Figura 3: Distribución Años de Experiencia */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">
                Figura 3. Distribución de Años de Vida Profesional (n = 145)
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-0.5 bg-amber-500 inline-block"></span>
                  <span>Mediana: 6 a.</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-0.5 bg-rose-500 inline-block"></span>
                  <span>Media: 8.8 a.</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Frecuencia de titulados por tramos de 2 años de experiencia profesional.
            </p>

            {/* Histograma estilizado con SVG */}
            <div className="h-56 w-full flex items-end gap-2 pt-6 pb-2 border-b border-slate-200">
              {[
                { range: '0-2', count: 26, junior: true },
                { range: '2-4', count: 29, junior: true },
                { range: '4-6', count: 17, consolidado: true },
                { range: '6-8', count: 9, consolidado: true },
                { range: '8-10', count: 6, consolidado: true },
                { range: '10-12', count: 3, consolidado: true },
                { range: '12-14', count: 10, consolidado: true },
                { range: '14-16', count: 16, consolidado: true },
                { range: '16-18', count: 5, consolidado: true },
                { range: '18-20', count: 2, consolidado: true },
                { range: '20-22', count: 9, consolidado: true },
                { range: '22-24', count: 4, consolidado: true },
                { range: '24-26', count: 4, consolidado: true },
                { range: '26-28', count: 1, consolidado: true },
                { range: '28+', count: 4, consolidado: true }
              ].map((bar, idx) => {
                const heightPct = (bar.count / 30) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10 font-mono">
                      {bar.range} años: {bar.count} tit.
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-700 mb-1">
                      {bar.count}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        bar.junior ? 'bg-sky-500 hover:bg-sky-600' : 'bg-slate-700 hover:bg-slate-800'
                      }`}
                    ></div>
                    <span className="text-[9px] text-slate-500 mt-1 whitespace-nowrap">
                      {bar.range}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estadísticas de Desempleo (Sección 3.2) */}
          <div className="mt-4 grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Nunca desempleado</span>
              <span className="font-bold text-slate-900 font-mono text-sm">42.0%</span>
            </div>
            <div>
              <span className="text-slate-500 block">Mediana tiempo cesante</span>
              <span className="font-bold text-slate-900 font-mono text-sm">0.75 años</span>
            </div>
            <div>
              <span className="text-slate-500 block">Desempleo vs Trayectoria</span>
              <span className="font-bold text-emerald-700 font-mono text-sm">Solo el 9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demografía: Edades y Género (Figura 2) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              Figura 2. Distribución de Titulados según Rango de Edad (n = 148)
            </h3>
            <span className="text-xs text-slate-500 font-mono">Total: 148 respuestas</span>
          </div>

          <div className="space-y-3">
            {ageDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 font-semibold">{item.count}</span>
                    <span className="text-slate-500 font-mono">({item.pct}%)</span>
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

          <div className="mt-5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
            Predomina el segmento de 35 años o más (43.2%), junto a una sólida base joven de 23 a 30 años (43.3%), 
            lo que consolida un equilibrio entre experiencia senior y dinamismo recién graduado.
          </div>
        </div>

        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Composición por Género</h3>
            <p className="text-xs text-slate-500 mb-6">Participación en la carrera de Sistemas</p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">Hombres</span>
                  <span className="font-mono font-bold text-sky-900 text-sm">115 (77.7%)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[77.7%] h-full bg-sky-700 rounded-full"></div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">Mujeres</span>
                  <span className="font-mono font-bold text-indigo-900 text-sm">33 (22.3%)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[22.3%] h-full bg-indigo-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Refleja la brecha de género habitual en las carreras de ingeniería en el país, constituyendo un punto de atención para políticas de inclusión ARCU-SUR.
          </p>
        </div>
      </div>

      {/* HISTORIA DE USUARIO 2 (HU2): Demanda de Posgrado */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Demanda de Posgrado (Historia de Usuario 2)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              El 83.1% de los titulados (123 de 148) manifiesta interés activo en cursar un posgrado.
            </p>
          </div>
          <div className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono text-xs font-semibold rounded-md self-start sm:self-auto">
            Concentración Crítica: 67.5% (IA + Software)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Figura 5: Área de posgrado de interés */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Figura 5. Área de Posgrado de Interés (n = 123 interesados)
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Preferencia temática de formación continua.
            </p>

            <div className="space-y-3.5">
              {posgradoAreas.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.area}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{item.count}</span>
                      <span className="font-mono text-slate-500">({item.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className={`h-full ${item.color} rounded-full transition-all`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">Hallazgo Estratégico:</span> La Inteligencia Artificial domina con el 43.9%. 
              Sumada a Ingeniería de Software (23.6%) concentran el 67.5% del mercado de posgrado. En cambio, Base de Datos (8.1%) 
              y Robótica (4.1%) no sustentan programas independientes y deben ofrecerse como módulos.
            </div>
          </div>

          {/* Figura 6: Institución preferida */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Figura 6. Institución Preferida para el Posgrado (n = 123)
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Dónde planean matricularse los titulados de Sistemas.
            </p>

            <div className="space-y-3">
              {preferredInstitutions.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 truncate pr-2">{item.name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-slate-900">{item.count}</span>
                      <span className="font-mono text-slate-500">({item.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className={`h-full ${item.color} rounded-full`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">Competencia de Mercado:</span> La Dirección de Posgrado FCyT lidera con 30.9%, 
              pero las universidades extranjeras (25.2%) representan una amenaza competitiva directa debido a la oferta 100% online y títulos de doble titulación.
            </div>
          </div>
        </div>
      </div>

      {/* Formación Complementaria Realizada y Financiamiento (Sección 3.3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Nivel cursado e Institución (Figura 4) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Figura 4. Formación Complementaria Realizada (n = 98 titulados)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              El 66.2% de los titulados ya cursó o cursa formación de posgrado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Nivel del Programa
              </div>
              <div className="space-y-2.5 text-xs">
                {complementariaNivel.map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800">{n.nivel}</span>
                    <span className="font-mono font-semibold text-sky-900">{n.count} ({n.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Institución donde Cursó
              </div>
              <div className="space-y-2.5 text-xs">
                {complementariaLugar.map((l, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800 truncate pr-2">{l.lugar}</span>
                    <span className="font-mono font-semibold text-slate-900 shrink-0">{l.count} ({l.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
            El Diplomado es la modalidad dominante (67.3%), seguido de la Maestría (27.6%). La UMSS capta al 52% (FCyT 30.6% + EUPG 21.4%).
          </div>
        </div>

        {/* Tabla 3: Fuente de Financiamiento */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Tabla 3. Fuente de Financiamiento del Posgrado Realizado
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Base: n = 98 titulados que realizaron posgrados.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-950">Recursos Propios (Autofinanciamiento)</span>
                  <span className="font-mono font-bold text-amber-950 text-base">90 (91.8%)</span>
                </div>
                <div className="mt-2 w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                  <div className="w-[91.8%] h-full bg-amber-600 rounded-full"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700">Beca Parcial</span>
                  <span className="font-mono font-bold text-slate-900">5 (5.1%)</span>
                </div>
                <div className="mt-2 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[5.1%] h-full bg-slate-600 rounded-full"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700">Beca Total</span>
                  <span className="font-mono font-bold text-slate-900">3 (3.1%)</span>
                </div>
                <div className="mt-2 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[3.1%] h-full bg-slate-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Conclusión:</span> Solo el 8.2% (8 personas) contó con algún tipo de beca. 
            Esta dependencia extrema de los ahorros y salarios personales limita la matrícula en programas de mayor duración (maestrías).
          </div>
        </div>
      </div>
    </div>
  );
};
