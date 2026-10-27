import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  Award,
  CheckCircle,
  Clock
} from 'lucide-react';
import { INFO_INSTITUCIONAL, MATRIZ_HALLAZGOS_TABLA11, PLAN_DE_ACCION_TABLA13 } from '../data/strategicPlan';

interface OfficialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center p-4 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto print:shadow-none print:border-none print:max-w-none print:my-0">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-900" />
            <span className="text-sm font-bold text-slate-900">
              Vista de Impresión Oficial · Acreditación ARCU-SUR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-sky-900 hover:bg-sky-800 rounded-md transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar como PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido Imprimible del Informe Oficial */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-10 text-slate-900 max-h-[85vh] print:max-h-none print:p-0">
          
          {/* Portada / Encabezado Formal */}
          <div className="text-center border-b-2 border-slate-900 pb-8 space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              {INFO_INSTITUCIONAL.universidad}
            </h2>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              {INFO_INSTITUCIONAL.facultad} · {INFO_INSTITUCIONAL.carrera}
            </h3>
            <div className="text-xs text-slate-500 font-mono pt-1">
              {INFO_INSTITUCIONAL.materia} · {INFO_INSTITUCIONAL.actividad}
            </div>

            <div className="py-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 max-w-2xl mx-auto leading-tight uppercase">
                Análisis de Mercado sobre el Perfil, Expectativas de Formación y Empleabilidad de los Titulados de Ingeniería de Sistemas
              </h1>
              <p className="text-xs font-medium text-slate-600 mt-2">
                Basado en las encuestas oficiales a titulados (n = 148) y empleadores (n = 51) · Enfoque de acreditación ARCU-SUR
              </p>
            </div>

            <div className="text-xs text-slate-600 pt-2 grid grid-cols-2 gap-4 max-w-lg mx-auto text-left">
              <div>
                <span className="font-bold text-slate-900 block">{INFO_INSTITUCIONAL.grupo} (Integrantes):</span>
                {INFO_INSTITUCIONAL.integrantes.map((m, i) => (
                  <div key={i}>{m}</div>
                ))}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Docente:</span>
                <div>{INFO_INSTITUCIONAL.docente}</div>
                <span className="font-bold text-slate-900 block mt-2">Fecha y Lugar:</span>
                <div>{INFO_INSTITUCIONAL.ubicacion}, {INFO_INSTITUCIONAL.fecha}</div>
              </div>
            </div>
          </div>

          {/* Resumen Ejecutivo */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide border-b border-slate-200 pb-1 text-slate-900">
              Resumen Ejecutivo
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Este informe analiza el perfil, las expectativas de formación y la empleabilidad de los titulados 
              de la Carrera de Ingeniería de Sistemas de la UMSS, como insumo para el Plan de Desarrollo Estratégico 
              y la acreditación ARCU-SUR. Se trabajó con las bases de datos oficiales entregadas por el docente: 
              148 respuestas de titulados (Microsoft Forms) y 51 respuestas válidas de empleadores (Google Forms). 
              Los datos se limpiaron, se analizaron con estadística descriptiva y pruebas chi-cuadrado, y se usaron 
              para simular escenarios de decisión con un generador de números aleatorios propio según Coss Bu (2003).
            </p>

            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
              <li><strong>Alta empleabilidad:</strong> El 73% trabaja en una organización y el 10.1% tiene un emprendimiento propio. El 52.5% ya trabajaba antes de titularse y el 76.3% consiguió empleo en cuatro meses o menos.</li>
              <li><strong>Mercado privado y de software:</strong> El 80.6% trabaja en el sector privado y el 62% en desarrollo de software. El sector privado paga mejor (χ² = 4.013, p = 0.045).</li>
              <li><strong>Fuerte demanda de posgrado en IA:</strong> El 83% quiere hacer un posgrado; IA (43.9%) e Ingeniería de Software (23.6%) concentran el 67.5% de preferencias. Empleadores coinciden (82% IA).</li>
              <li><strong>Financiamiento personal:</strong> El 91.8% de los posgrados se financió con recursos propios.</li>
              <li><strong>Buena valoración con brechas:</strong> El 74.1% está satisfecho, pero el 38% considera que la formación no concuerda del todo con los requerimientos laborales actuales.</li>
              <li><strong>Débil vinculación con empleadores:</strong> Aunque el 86% de los empleadores confía en la carrera, el 49% nunca fue consultado durante la autoevaluación.</li>
            </ul>
          </div>

          {/* Estadísticos Clave de Trayectoria y Demanda */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-3 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Años de Vida Profesional (n = 145)</span>
              <div className="space-y-1 text-slate-700 font-mono text-[11px]">
                <div className="flex justify-between"><span>Media:</span> <span>8.83 años</span></div>
                <div className="flex justify-between"><span>Mediana:</span> <span>6.00 años</span></div>
                <div className="flex justify-between"><span>Desviación estándar:</span> <span>7.92 años</span></div>
                <div className="flex justify-between"><span>Cuartiles (Q1 - Q3):</span> <span>2 y 14 años</span></div>
                <div className="flex justify-between font-bold text-slate-900"><span>Junior (&lt; 5 años):</span> <span>42.8%</span></div>
                <div className="flex justify-between font-bold text-slate-900"><span>Consolidados (≥ 5 años):</span> <span>57.2%</span></div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Demanda y Financiamiento de Posgrado</span>
              <div className="space-y-1 text-slate-700 font-mono text-[11px]">
                <div className="flex justify-between"><span>Interés activo posgrado:</span> <span>83.1% (123)</span></div>
                <div className="flex justify-between"><span>Preferencia IA:</span> <span>43.9%</span></div>
                <div className="flex justify-between"><span>Preferencia Ing. Software:</span> <span>23.6%</span></div>
                <div className="flex justify-between"><span>Preferencia FCyT UMSS:</span> <span>30.9%</span></div>
                <div className="flex justify-between"><span>Univ. Internacionales:</span> <span>25.2%</span></div>
                <div className="flex justify-between font-bold text-amber-900"><span>Autofinanciamiento:</span> <span>91.8%</span></div>
              </div>
            </div>
          </div>

          {/* Resultados de Simulación Estocástica (Coss Bu) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide border-b border-slate-200 pb-1 text-slate-900">
              Resultados de la Simulación Estocástica (Coss Bu 2003)
            </h3>
            <p className="text-xs text-slate-700">
              Generador congruencial mixto: Xₙ₊₁ = (8121·Xₙ + 28411) mod 100000. Parámetros de ciclo completo garantizado (m = 100 000).
            </p>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-2">Escenario Simulado</th>
                    <th className="p-2">Condición Base</th>
                    <th className="p-2">Resultado del Modelo</th>
                    <th className="p-2">Recomendación Estratégica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2 font-semibold">Escenario A: Posgrados FCyT</td>
                    <td className="p-2">Población 1000, umbral 15 alumnos</td>
                    <td className="p-2 font-mono">IA: 39.9 (100% prob) · Soft: 21.1 (88%)</td>
                    <td className="p-2 font-bold text-emerald-800">Apertura viable inmediata de IA y Software</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Escenario B: Convenios Becas</td>
                    <td className="p-2">Subir becas de 8.2% a 30%</td>
                    <td className="p-2 font-mono">Matrícula sube de 96.4 a 114.8 (+19.1%)</td>
                    <td className="p-2 font-bold text-sky-900">Firmar convenios con banca y empresas</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Escenario C: Pasantías</td>
                    <td className="p-2">50% de rezago pasa a inserción previa</td>
                    <td className="p-2 font-mono">Inserción ≤ 4 meses sube de 76.3% a 88.2%</td>
                    <td className="p-2 font-bold text-indigo-900">Formalizar pasantías curriculares tempranas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Matriz de Hallazgos ARCU-SUR (Tabla 11) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide border-b border-slate-200 pb-1 text-slate-900">
              Tabla 11. Matriz de Hallazgos para la Dirección de Carrera
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-2 w-8 text-center">Nº</th>
                    <th className="p-2">Hallazgo</th>
                    <th className="p-2">Evidencia</th>
                    <th className="p-2">Implicancia ARCU-SUR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MATRIZ_HALLAZGOS_TABLA11.slice(0, 6).map((h) => (
                    <tr key={h.numero}>
                      <td className="p-2 text-center font-bold text-slate-900">{h.numero}</td>
                      <td className="p-2 font-semibold text-slate-800">{h.hallazgo}</td>
                      <td className="p-2 text-slate-600 font-mono">{h.evidencia}</td>
                      <td className="p-2 text-slate-800">{h.implicancia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan de Acción (Tabla 13) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide border-b border-slate-200 pb-1 text-slate-900">
              Tabla 13. Plan de Acción Propuesto
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-2">Línea de Acción</th>
                    <th className="p-2">Acción Concreta</th>
                    <th className="p-2">Indicador de Seguimiento</th>
                    <th className="p-2">Plazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PLAN_DE_ACCION_TABLA13.map((a, i) => (
                    <tr key={i}>
                      <td className="p-2 font-bold text-slate-900">{a.linea}</td>
                      <td className="p-2 text-slate-700">{a.accionConcreta}</td>
                      <td className="p-2 text-slate-600 font-mono">{a.indicadorSeguimiento}</td>
                      <td className="p-2 font-semibold text-slate-800">{a.plazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Firmas Institucionales */}
          <div className="pt-10 border-t border-slate-200 flex justify-between text-center text-xs text-slate-600">
            <div className="w-48">
              <div className="border-t border-slate-400 pt-1">
                <strong>Grupo 14</strong><br />
                Taller de Simulación de Sistemas
              </div>
            </div>
            <div className="w-56">
              <div className="border-t border-slate-400 pt-1">
                <strong>Ing. Henrry Frank Villarroel Tapia</strong><br />
                Docente de la Materia
              </div>
            </div>
            <div className="w-56">
              <div className="border-t border-slate-400 pt-1">
                <strong>MSc. Yony Richard Montoya Burgos</strong><br />
                Director de Carrera Ing. de Sistemas
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
