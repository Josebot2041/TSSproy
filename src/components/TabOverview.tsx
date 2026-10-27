import React from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  Briefcase, 
  BrainCircuit, 
  Wallet, 
  Building, 
  ArrowRight, 
  BookOpen, 
  Award,
  Users,
  Compass,
  FileSpreadsheet,
  Cpu,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { INFO_INSTITUCIONAL } from '../data/strategicPlan';

interface TabOverviewProps {
  onNavigate: (tab: string) => void;
  tituladosCount: number;
  empleadoresCount: number;
}

export const TabOverview: React.FC<TabOverviewProps> = ({
  onNavigate,
  tituladosCount,
  empleadoresCount
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Banner / Academic Context */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 tracking-wide uppercase mb-2">
            <span>{INFO_INSTITUCIONAL.universidad}</span>
            <span aria-hidden="true">·</span>
            <span>{INFO_INSTITUCIONAL.facultad}</span>
            <span aria-hidden="true">·</span>
            <span>{INFO_INSTITUCIONAL.carrera}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            Análisis de Mercado sobre el Perfil, Expectativas y Empleabilidad de Titulados
          </h1>

          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Herramienta computacional de análisis estadístico y simulación estocástica 
            (metodología Coss Bu 2003) para la acreditación regional <span className="font-bold text-slate-900">ARCU-SUR</span>.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <div>
              <span className="font-semibold text-slate-700">Materia:</span> {INFO_INSTITUCIONAL.materia}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Docente:</span> {INFO_INSTITUCIONAL.docente}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Equipo:</span> {INFO_INSTITUCIONAL.grupo} ({INFO_INSTITUCIONAL.integrantes.join(', ')})
            </div>
            <div>
              <span className="font-semibold text-slate-700">Sede:</span> {INFO_INSTITUCIONAL.ubicacion} · {INFO_INSTITUCIONAL.fecha}
            </div>
          </div>

          {/* Botones de acción rápida con sombreado real */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('encuesta_titulados')}
              className="px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-md shadow-sky-900/20 border border-sky-800 inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Llenar Encuesta Titulado</span>
            </button>

            <button
              onClick={() => onNavigate('encuesta_empleadores')}
              className="px-4 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 rounded-lg shadow-sm border border-slate-300 inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Building className="w-4 h-4 text-sky-700" />
              <span>Llenar Encuesta Empleador</span>
            </button>

            <button
              onClick={() => onNavigate('simulacion')}
              className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 rounded-lg shadow-sm border border-indigo-200 inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>Simulador Coss Bu (Monte Carlo)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Muestra Titulados</div>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {tituladosCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Microsoft Forms</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Empleadores Válidos</div>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {empleadoresCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">45 organizaciones</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Tasa de Ocupación</div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            83.1%
          </div>
          <div className="mt-1 text-[11px] text-slate-500">73% org + 10.1% propio</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Inserción Temprana</div>
          <div className="mt-1 text-2xl font-bold font-mono text-sky-800 tabular-nums">
            52.5%
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Antes de titularse</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Demanda Posgrado IA</div>
          <div className="mt-1 text-2xl font-bold font-mono text-indigo-700 tabular-nums">
            43.9%
          </div>
          <div className="mt-1 text-[11px] text-slate-500">1ra preferencia</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Autofinanciamiento</div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-700 tabular-nums">
            91.8%
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Recursos propios</div>
        </div>
      </div>

      {/* Resumen Ejecutivo del Informe - Textos Resumidos y Visualmente Concretos */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-800" />
            <h2 className="text-lg font-bold text-slate-900">Resumen Ejecutivo y Hallazgos Principales</h2>
          </div>
          <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-mono border border-slate-200 w-fit">
            Cartas DIR SIS 141/2026 y 143/2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4>Inserción Laboral</h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  83.1% Ocupación
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-slate-800">73.0%</strong> trabaja en organizaciones y <strong className="text-slate-800">10.1%</strong> en emprendimientos.</li>
                <li><strong className="text-slate-800">52.5%</strong> consiguió empleo antes de graduarse.</li>
                <li><strong className="text-slate-800">76.3%</strong> se insertó en ≤ 4 meses (solo 9% desempleo acumulado).</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('mercado')}
              className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 text-sky-800 font-semibold text-xs rounded-lg border border-slate-200 shadow-xs hover:shadow inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Ver trayectoria laboral</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Briefcase className="w-4 h-4 text-sky-700 shrink-0" />
                  <h4>Sector y Salarios</h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  80.6% Privado
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-slate-800">62.0%</strong> se desempeña en desarrollo de software.</li>
                <li><strong className="text-slate-800">88.0%</strong> radica laboralmente en Cochabamba.</li>
                <li><strong className="text-slate-800">Brecha salarial significativa:</strong> privado supera al público (χ²=4.013, p=0.045).</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('mercado')}
              className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 text-sky-800 font-semibold text-xs rounded-lg border border-slate-200 shadow-xs hover:shadow inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Ver análisis salarial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <BrainCircuit className="w-4 h-4 text-indigo-700 shrink-0" />
                  <h4>Demanda de Posgrado</h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  67.5% IA / Software
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-slate-800">83.0%</strong> de graduados desea cursar un posgrado.</li>
                <li><strong className="text-slate-800">IA (43.9%)</strong> e Ing. de Software (23.6%) dominan la demanda.</li>
                <li><strong className="text-slate-800">82.0%</strong> de empleadores exige IA y agentes como prioridad técnica.</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('titulados')}
              className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 text-indigo-800 font-semibold text-xs rounded-lg border border-slate-200 shadow-xs hover:shadow inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Ver demanda educativa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Wallet className="w-4 h-4 text-amber-700 shrink-0" />
                  <h4>Financiamiento</h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  91.8% Personal
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-slate-800">91.8%</strong> pagó su posgrado con recursos propios.</li>
                <li><strong className="text-slate-800">Solo 8 titulados</strong> accedieron a becas institucionales.</li>
                <li><strong className="text-slate-800">Urgencia:</strong> convenios con empresas y créditos educativos blandos.</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('estadistica')}
              className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 text-amber-800 font-semibold text-xs rounded-lg border border-slate-200 shadow-xs hover:shadow inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Ver prueba Chi-cuadrado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 5 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-700 shrink-0" />
                  <h4>Evaluación Curricular</h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  74.1% Satisfacción
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-slate-800">90.7%</strong> afirma pertinencia con sus funciones actuales.</li>
                <li><strong className="text-slate-800">38.1%</strong> reporta brecha frente a exigencias tecnológicas reales.</li>
                <li><strong className="text-slate-800">71.6%</strong> demanda actualización urgente del plan de estudios.</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('curriculo')}
              className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 text-blue-800 font-semibold text-xs rounded-lg border border-slate-200 shadow-xs hover:shadow inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Ver evaluación curricular</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 6 */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Building className="w-4 h-4 text-rose-700 shrink-0" />
                  <h4>Vinculación Empresarial</h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  49% No Consultado
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-slate-800">86.0%</strong> de empleadores confía en la calidad de la UMSS.</li>
                <li><strong className="text-slate-800">49.0%</strong> jamás fue consultado en autoevaluaciones previas.</li>
                <li><strong className="text-slate-800">Requisito ARCU-SUR:</strong> consejo consultivo permanente empresa-academia.</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('estrategia')}
              className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 text-rose-800 font-semibold text-xs rounded-lg border border-slate-200 shadow-xs hover:shadow inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Ver plan estratégico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Flujo Metodológico de Procesamiento (Figura 1) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Flujo Metodológico del Sistema (Figura 1 del Informe)
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Procesamiento de datos paso a paso: relevamiento, limpieza de datos, estadística y simulación de escenarios
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div 
            onClick={() => onNavigate('encuestas')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-[11px] font-mono font-bold text-sky-800">01. RELEVO</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Bases Oficiales</div>
              <p className="text-xs text-slate-600 mt-1">148 titulados (MS Forms) y 51 empleadores (Google Forms).</p>
            </div>
            <div className="mt-3 text-xs text-sky-800 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Ver formularios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('encuestas')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-[11px] font-mono font-bold text-sky-800">02. LIMPIEZA</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Data Wrangling</div>
              <p className="text-xs text-slate-600 mt-1">Normalización numérica de texto a años, splits y validaciones.</p>
            </div>
            <div className="mt-3 text-xs text-sky-800 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Ver microdatos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('estadistica')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-[11px] font-mono font-bold text-sky-800">03. ANÁLISIS</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Pruebas Chi²</div>
              <p className="text-xs text-slate-600 mt-1">Medias, cuartiles, Chi-cuadrado (χ²), V de Cramér e índices 0-100.</p>
            </div>
            <div className="mt-3 text-xs text-sky-800 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Ver pruebas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('simulacion')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-[11px] font-mono font-bold text-sky-800">04. SIMULACIÓN</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Coss Bu (2003)</div>
              <p className="text-xs text-slate-600 mt-1">Generador congruencial mixto, transformada inversa y réplicas.</p>
            </div>
            <div className="mt-3 text-xs text-sky-800 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Experimentar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('estrategia')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="text-[11px] font-mono font-bold text-sky-800">05. ESTRATEGIA</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Matriz ARCU-SUR</div>
              <p className="text-xs text-slate-600 mt-1">Plan de acción, matriz de 10 hallazgos y exportación oficial.</p>
            </div>
            <div className="mt-3 text-xs text-sky-800 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Ver matriz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Criterios ARCU-SUR Resumidos */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-sky-800" />
          <h3 className="text-base font-bold text-slate-900">
            Dimensiones de Acreditación Regional ARCU-SUR
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Respaldo empírico frente a los 4 criterios de acreditación del MERCOSUR Educativo:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-sky-800 uppercase px-2 py-0.5 rounded bg-sky-100">Criterio 1</span>
            <div className="text-sm font-bold text-slate-900 mt-2">Pertinencia del Perfil</div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              90.7% ejerce labores de Sistemas, pero 38% solicita mayor actualización tecnológica.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-sky-800 uppercase px-2 py-0.5 rounded bg-sky-100">Criterio 2</span>
            <div className="text-sm font-bold text-slate-900 mt-2">Seguimiento de Graduados</div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Inserción en ≤ 4 meses (76.3%) e interés masivo en posgrados especializados (83%).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-sky-800 uppercase px-2 py-0.5 rounded bg-sky-100">Criterio 3</span>
            <div className="text-sm font-bold text-slate-900 mt-2">Sector Productivo</div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Alta reputación institucional (86%), pero 49% nunca fue consultado formalmente.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-sky-800 uppercase px-2 py-0.5 rounded bg-sky-100">Criterio 4</span>
            <div className="text-sm font-bold text-slate-900 mt-2">Mejora Continua</div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Modelado estocástico Coss Bu que cuantifica el impacto de nuevas becas y pasantías.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
