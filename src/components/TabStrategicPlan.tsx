import React from 'react';
import { 
  MATRIZ_HALLAZGOS_TABLA11, 
  FORTALEZAS_Y_OPORTUNIDADES_TABLA12, 
  PLAN_DE_ACCION_TABLA13, 
  INFO_INSTITUCIONAL 
} from '../data/strategicPlan';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  FileCheck, 
  Printer, 
  Briefcase, 
  Building,
  GraduationCap
} from 'lucide-react';

interface TabStrategicPlanProps {
  onOpenReport: () => void;
}

export const TabStrategicPlan: React.FC<TabStrategicPlanProps> = ({ onOpenReport }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Diagnóstico, Matriz ARCU-SUR y Plan de Acción Estratégico
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Capítulos 5 y 6: Insumos técnicos para el Plan de Desarrollo Estratégico de Ingeniería de Sistemas UMSS
          </p>
        </div>

        <button
          onClick={onOpenReport}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Generar Informe de Acreditación</span>
        </button>
      </div>

      {/* Tabla 11: Matriz de Hallazgos Principales para la Dirección de Carrera */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Tabla 11. Matriz de Hallazgos Principales para la Dirección de Carrera
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mapeo directo entre la evidencia cuantitativa y su implicancia de gestión institucional ARCU-SUR
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-12 text-center">N.º</th>
                <th className="p-3">Hallazgo Relevado</th>
                <th className="p-3">Evidencia Cuantitativa</th>
                <th className="p-3">Implicancia para la Acreditación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MATRIZ_HALLAZGOS_TABLA11.map((item) => (
                <tr key={item.numero} className="hover:bg-slate-50/70">
                  <td className="p-3 text-center font-mono font-bold text-sky-950 bg-slate-50/50">
                    {item.numero}
                  </td>
                  <td className="p-3 font-semibold text-slate-900 max-w-xs">
                    {item.hallazgo}
                  </td>
                  <td className="p-3 text-slate-600 font-mono text-[11px] max-w-xs">
                    {item.evidencia}
                  </td>
                  <td className="p-3 text-slate-800 font-medium max-w-sm">
                    {item.implicancia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla 12: Fortalezas y Oportunidades de Mejora */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Fortalezas Institucionales Consolidadas (Tabla 12)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Activos clave para el proceso de autoevaluación
            </p>

            <ul className="space-y-2.5 text-xs">
              {FORTALEZAS_Y_OPORTUNIDADES_TABLA12.fortalezas.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Sustento: Encuestas Microsoft Forms a 148 titulados.
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Oportunidades de Mejora y Brechas (Tabla 12)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Puntos críticos a intervenir en el Plan de Desarrollo Estratégico
            </p>

            <ul className="space-y-2.5 text-xs">
              {FORTALEZAS_Y_OPORTUNIDADES_TABLA12.oportunidades.map((o, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/40 border border-amber-100 text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Sustento: Consulta Google Forms a 51 empleadores.
          </div>
        </div>
      </div>

      {/* Tabla 13: Plan de Acción Propuesto */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Tabla 13. Plan de Acción Propuesto para la Carrera de Ingeniería de Sistemas
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Líneas estratégicas cuantificadas con indicadores de seguimiento y horizontes temporales
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-48">Línea de Acción</th>
                <th className="p-3">Acción Concreta</th>
                <th className="p-3">Indicador de Seguimiento</th>
                <th className="p-3 w-32">Plazo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PLAN_DE_ACCION_TABLA13.map((action, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="p-3 font-bold text-sky-950 align-top">
                    {action.linea}
                  </td>
                  <td className="p-3 text-slate-800 leading-relaxed max-w-sm align-top">
                    {action.accionConcreta}
                  </td>
                  <td className="p-3 text-slate-600 font-mono text-[11px] max-w-xs align-top">
                    {action.indicadorSeguimiento}
                  </td>
                  <td className="p-3 align-top">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800 whitespace-nowrap">
                      {action.plazo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cartas Institucionales de Respaldo (Anexo A) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-2">
          Anexo A. Cartas Institucionales Oficiales de la Dirección de Carrera
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Respaldo formal emitido por la Dirección de Carrera para la recolección de datos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {INFO_INSTITUCIONAL.cartas.map((carta, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-sky-900">{carta.codigo}</span>
                <span className="text-slate-500 text-[11px]">{carta.fecha}</span>
              </div>
              <div className="font-medium text-slate-800">
                Destinatario: <span className="font-normal text-slate-600">{carta.destinatario}</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Firmado: {carta.firmante}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
