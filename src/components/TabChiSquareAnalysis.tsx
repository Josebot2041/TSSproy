import React, { useState } from 'react';
import { calculateChiSquare } from '../utils/statistics';
import { 
  BarChart2, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Grid, 
  Calculator,
  ArrowRight
} from 'lucide-react';

export const TabChiSquareAnalysis: React.FC = () => {
  // Pruebas oficiales de la Tabla 4
  const tabla4Tests = [
    {
      id: 'hu3_fin',
      relacion: 'Nivel del programa realizado × Fuente de financiamiento (HU3)',
      chi2: 2.206,
      gl: 1,
      critico: 3.841,
      pValue: 0.138,
      pNote: 'Fisher: 0.109',
      cramersV: 0.15,
      decision: 'No se rechaza H₀',
      significativo: false,
      interpretacion: 'Tanto quienes hicieron diplomado como maestría pagaron mayoritariamente con recursos propios (63/66 y 27/32). La falta de financiamiento es transversal a toda la oferta.'
    },
    {
      id: 'area_inst',
      relacion: 'Área de interés × Institución preferida (Figura 7)',
      chi2: 9.726,
      gl: 6,
      critico: 12.592,
      pValue: 0.137,
      pNote: '',
      cramersV: 0.199,
      decision: 'No se rechaza H₀',
      significativo: false,
      interpretacion: 'Aunque globalmente no hay dependencia estadística, IA reparte su preferencia equitativamente entre la UMSS y el exterior, mientras Redes prefiere instituciones nacionales.'
    },
    {
      id: 'edad_form',
      relacion: 'Edad (≤ 30 / > 30 años) × Formación complementaria realizada',
      chi2: 1.234,
      gl: 1,
      critico: 3.841,
      pValue: 0.267,
      pNote: '',
      cramersV: 0.091,
      decision: 'No se rechaza H₀',
      significativo: false,
      interpretacion: 'La proporción de titulados que realiza posgrados es similar entre graduados jóvenes y consolidados; la necesidad de formación continua es una práctica generalizada en todas las edades.'
    },
    {
      id: 'sec_rem',
      relacion: 'Sector (privado / público) × Remuneración (≤ / > Bs. 7 000)',
      chi2: 4.013,
      gl: 1,
      critico: 3.841,
      pValue: 0.045,
      pNote: 'p < 0.05',
      cramersV: 0.21,
      decision: 'Se rechaza H₀',
      significativo: true,
      interpretacion: 'Relación estadísticamente significativa (p = 0.045, V = 0.21): en el sector privado el 54% gana más de Bs. 7 000, frente a solo el 25% en el sector público.'
    }
  ];

  // Matriz de calor Figura 7: Área de interés según institución preferida
  const heatmapData = [
    { area: 'IA', umss: 20, internacional: 17, otro: 17, total: 54 },
    { area: 'Ingeniería de Software', umss: 13, internacional: 10, otro: 6, total: 29 },
    { area: 'Redes de Datos y Seguridad', umss: 10, internacional: 3, otro: 12, total: 25 },
    { area: 'Base de Datos', umss: 6, internacional: 0, otro: 4, total: 10 },
    { area: 'Robótica', umss: 2, internacional: 1, otro: 2, total: 5 }
  ];

  // Calculadora interactiva personalizada de contingencia (ej. Sector x Remuneración editable)
  const [calcMatrix, setCalcMatrix] = useState<number[][]>([
    [33, 38], // Privado: <=7000 (33), >7000 (38)
    [15, 5]   // Público: <=7000 (15), >7000 (5)
  ]);
  const [rowLabels, setRowLabels] = useState<string[]>(['Sector Privado', 'Sector Público']);
  const [colLabels, setColLabels] = useState<string[]>(['≤ Bs. 7 000', '> Bs. 7 000']);

  const customResult = calculateChiSquare(calcMatrix, rowLabels, colLabels);

  const handleCellChange = (r: number, c: number, val: string) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    const updated = calcMatrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? num : cell))
    );
    setCalcMatrix(updated);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Pruebas Chi-cuadrado de Independencia y Cruce de Variables (HU3)
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Evaluación rigurosa de hipótesis estadísticas (Ecuación 1) para respaldar decisiones de acreditación ARCU-SUR
        </p>
      </div>

      {/* Tabla 4 Oficial */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-slate-900">
            Tabla 4. Pruebas Chi-cuadrado de Independencia en Titulados
          </h3>
          <span className="text-xs text-slate-500 font-mono">Nivel de significancia: α = 0.05</span>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          H₀: Las dos variables categóricas son independientes frente a H₁: Existe dependencia o asociación estadística
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Relación Evaluada (H₀: son independientes)</th>
                <th className="p-3 text-right">χ² Calc.</th>
                <th className="p-3 text-right">gl</th>
                <th className="p-3 text-right">Valor Crítico</th>
                <th className="p-3 text-right">Valor p</th>
                <th className="p-3 text-right">V de Cramér</th>
                <th className="p-3">Decisión Estadística</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tabla4Tests.map((t) => (
                <tr key={t.id} className={`hover:bg-slate-50/60 ${t.significativo ? 'bg-emerald-50/40' : ''}`}>
                  <td className="p-3 font-semibold text-slate-900 max-w-sm">
                    {t.relacion}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">{t.chi2}</td>
                  <td className="p-3 text-right font-mono text-slate-600">{t.gl}</td>
                  <td className="p-3 text-right font-mono text-slate-600">{t.critico}</td>
                  <td className="p-3 text-right font-mono font-bold text-sky-950">
                    {t.pValue} {t.pNote && <span className="text-[10px] text-slate-500 block">({t.pNote})</span>}
                  </td>
                  <td className="p-3 text-right font-mono font-semibold text-slate-800">{t.cramersV}</td>
                  <td className="p-3">
                    {t.significativo ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-900">
                        <CheckCircle className="w-3.5 h-3.5" /> Se rechaza H₀ (Significativo)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        <XCircle className="w-3.5 h-3.5" /> No se rechaza H₀
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interpretaciones de las 4 pruebas */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tabla4Tests.map((t) => (
            <div key={t.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">{t.relacion}:</span>
              <p className="text-slate-600">{t.interpretacion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Figura 7: Mapa de Calor (Heatmap) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Figura 7. Mapa de Calor: Área de Posgrado de Interés según Institución Preferida
            </h3>
            <p className="text-xs text-slate-500">
              Cruce bidimensional con conteo de titulados interesados (n = 123)
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">χ² = 9.726, gl = 6, p = 0.137</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="p-3 text-left">Área Tecnológica</th>
                <th className="p-3">UMSS (FCyT o EUPG)</th>
                <th className="p-3">Universidad Internacional</th>
                <th className="p-3">Otra Nacional u Otro</th>
                <th className="p-3 font-mono font-bold text-slate-900">Total Fila</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {heatmapData.map((row, idx) => {
                // Cálculo de intensidad de color
                const getHeatBg = (val: number) => {
                  if (val === 0) return 'bg-slate-50 text-slate-400';
                  if (val <= 5) return 'bg-sky-50 text-sky-900 font-medium';
                  if (val <= 12) return 'bg-sky-200 text-sky-950 font-semibold';
                  if (val <= 16) return 'bg-sky-400 text-slate-950 font-bold';
                  return 'bg-sky-700 text-white font-bold';
                };

                return (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3 text-left font-sans font-semibold text-slate-800">
                      {row.area}
                    </td>
                    <td className={`p-3 ${getHeatBg(row.umss)} transition-colors`}>
                      {row.umss}
                    </td>
                    <td className={`p-3 ${getHeatBg(row.internacional)} transition-colors`}>
                      {row.internacional}
                    </td>
                    <td className={`p-3 ${getHeatBg(row.otro)} transition-colors`}>
                      {row.otro}
                    </td>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50/50">
                      {row.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 text-[11px] text-slate-500 pt-2">
          <span>Intensidad:</span>
          <span className="w-4 h-3 bg-slate-50 border border-slate-200 inline-block"></span> 0
          <span className="w-4 h-3 bg-sky-100 inline-block"></span> 1-5
          <span className="w-4 h-3 bg-sky-200 inline-block"></span> 6-12
          <span className="w-4 h-3 bg-sky-400 inline-block"></span> 13-16
          <span className="w-4 h-3 bg-sky-700 inline-block"></span> 17-20
        </div>
      </div>

      {/* Calculadora Interactiva de Chi-cuadrado */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-sky-800" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Calculadora Interactiva de Pruebas Chi-cuadrado (Ecuación 1)
            </h3>
            <p className="text-xs text-slate-500">
              Modifica los valores observados para experimentar en vivo con tablas de contingencia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Matriz de Entrada */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Frecuencias Observadas (Oᵢ)
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg p-3 bg-slate-50">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-semibold text-slate-600">Categoría</th>
                    {colLabels.map((cLabel, ci) => (
                      <th key={ci} className="p-2 text-center font-semibold text-slate-700">
                        {cLabel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calcMatrix.map((row, ri) => (
                    <tr key={ri}>
                      <td className="p-2 font-medium text-slate-800">{rowLabels[ri]}</td>
                      {row.map((val, ci) => (
                        <td key={ci} className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            value={val}
                            onChange={(e) => handleCellChange(ri, ci, e.target.value)}
                            className="w-20 px-2 py-1.5 text-center font-mono font-bold text-slate-900 bg-white border border-slate-300 rounded shadow-xs focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed">
              * Nota metodológica: Si alguna celda presenta una frecuencia esperada inferior a 5 (E_i &lt; 5), 
              el informe recomienda aplicar la prueba exacta de Fisher para corroborar la significancia.
            </div>
          </div>

          {/* Resultados de la Inferencia */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Resultados del Estadístico de Prueba
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600 font-medium">Estadístico χ² Calculado:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{customResult.chi2}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600 font-medium">Grados de Libertad (gl):</span>
                  <span className="font-mono font-bold text-slate-900">{customResult.df}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600 font-medium">Valor Crítico (α = 0.05):</span>
                  <span className="font-mono font-bold text-slate-900">{customResult.criticalValue}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600 font-medium">Valor p (Significancia):</span>
                  <span className="font-mono font-bold text-sky-950 text-sm">{customResult.pValue}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600 font-medium">Coeficiente V de Cramér:</span>
                  <span className="font-mono font-bold text-slate-900">{customResult.cramersV}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-700 mb-1">Decisión de la Prueba:</div>
              {customResult.isSignificant ? (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-950 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>SE RECHAZA H₀ (p &lt; 0.05). Existe relación estadística significativa entre las variables.</span>
                </div>
              ) : (
                <div className="p-3 bg-slate-200 border border-slate-300 rounded-lg text-slate-800 text-xs font-medium flex items-center gap-2">
                  <XCircle className="w-4 h-4 shrink-0 text-slate-600" />
                  <span>NO SE RECHAZA H₀ (p ≥ 0.05). No hay evidencia de asociación; las variables son independientes.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
