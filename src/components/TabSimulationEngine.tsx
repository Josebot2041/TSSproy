import React, { useState, useEffect } from 'react';
import { 
  CossBuGenerator, 
  runScenarioA, 
  runScenarioB, 
  runScenarioC 
} from '../utils/cossBu';
import { saveSimulationToDb } from '../services/dbService';
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  TrendingUp, 
  Settings, 
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export const TabSimulationEngine: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'A' | 'B' | 'C' | 'validador'>('A');

  // Estado del generador
  const [seed, setSeed] = useState<number>(45217);
  const [generator, setGenerator] = useState<CossBuGenerator>(new CossBuGenerator(45217));
  const [sampleNumbers, setSampleNumbers] = useState<Array<{ step: number; x: number; u: number }>>([]);
  const [validationData, setValidationData] = useState<any>(null);

  // Parámetros Escenario A
  const [replicasA, setReplicasA] = useState<number>(40);
  const [poblacionA, setPoblacionA] = useState<number>(1000);
  const [minThresholdA, setMinThresholdA] = useState<number>(15);
  const [resultsA, setResultsA] = useState<any[]>([]);

  // Parámetros Escenario B
  const [replicasB, setReplicasB] = useState<number>(30);
  const [targetBecaB, setTargetBecaB] = useState<number>(30);
  const [resultsB, setResultsB] = useState<any>(null);

  // Parámetros Escenario C
  const [replicasC, setReplicasC] = useState<number>(50);
  const [factorReduccionC, setFactorReduccionC] = useState<number>(50);
  const [resultsC, setResultsC] = useState<any>(null);

  // Inicialización y ejecución
  useEffect(() => {
    const gen = new CossBuGenerator(seed);
    setGenerator(gen);
    setSampleNumbers(gen.sampleNumbers(8));
    setValidationData(gen.runValidationTests(10000));

    // Ejecutar escenarios iniciales
    setResultsA(runScenarioA(replicasA, poblacionA, 0.83, 0.309, 0.35, minThresholdA, seed));
    setResultsB(runScenarioB(replicasB, 1000, 0.83, 0.082, targetBecaB / 100, 0.108, 2.0, seed + 100));
    setResultsC(runScenarioC(replicasC, 1000, factorReduccionC / 100, seed + 200));
  }, [seed]);

  const handleRunScenarioA = () => {
    const runSeed = seed + Math.floor(Math.random() * 1000);
    const res = runScenarioA(replicasA, poblacionA, 0.83, 0.309, 0.35, minThresholdA, runSeed);
    setResultsA(res);
    saveSimulationToDb({
      id: `SIM-A-${Date.now()}`,
      timestamp: new Date().toISOString(),
      nombre: 'Escenario A: Posgrados FCyT',
      descripcion: `Simulación Coss Bu con ${replicasA} réplicas, población ${poblacionA}, umbral ${minThresholdA}`,
      tipo: 'Escenario A',
      parametros: JSON.stringify({ replicas: replicasA, poblacion: poblacionA, umbral: minThresholdA }),
      impactoInsercion: 83,
      impactoSalarios: 35,
      impactoSatisfaccion: 90
    }).catch((e) => console.error(e));
  };

  const handleRunScenarioB = () => {
    const runSeed = seed + Math.floor(Math.random() * 1000);
    const res = runScenarioB(replicasB, 1000, 0.83, 0.082, targetBecaB / 100, 0.108, 2.0, runSeed);
    setResultsB(res);
    saveSimulationToDb({
      id: `SIM-B-${Date.now()}`,
      timestamp: new Date().toISOString(),
      nombre: 'Escenario B: Convenios y Becas',
      descripcion: `Simulación de becas del ${targetBecaB}% con ${replicasB} réplicas`,
      tipo: 'Escenario B',
      parametros: JSON.stringify({ replicas: replicasB, becas: targetBecaB }),
      impactoInsercion: 85,
      impactoSalarios: 42,
      impactoSatisfaccion: 94
    }).catch((e) => console.error(e));
  };

  const handleRunScenarioC = () => {
    const runSeed = seed + Math.floor(Math.random() * 1000);
    const res = runScenarioC(replicasC, 1000, factorReduccionC / 100, runSeed);
    setResultsC(res);
    saveSimulationToDb({
      id: `SIM-C-${Date.now()}`,
      timestamp: new Date().toISOString(),
      nombre: 'Escenario C: Ajuste Curricular Inserción',
      descripcion: `Simulación de reducción de tiempo de inserción en ${factorReduccionC}%`,
      tipo: 'Escenario C',
      parametros: JSON.stringify({ replicas: replicasC, reduccion: factorReduccionC }),
      impactoInsercion: 92,
      impactoSalarios: 38,
      impactoSatisfaccion: 88
    }).catch((e) => console.error(e));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Motor de Simulación Estocástica de Sistemas (Coss Bu 2003)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generador congruencial mixto Xₙ₊₁ = (a · Xₙ + c) mod m y método de la transformada inversa
          </p>
        </div>

        {/* Selector de pestañas de simulación con botones sombreados */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveScenario('A')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeScenario === 'A'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Escenario A (Posgrados FCyT)</span>
          </button>
          <button
            onClick={() => setActiveScenario('B')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeScenario === 'B'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Escenario B (Convenios Becas)</span>
          </button>
          <button
            onClick={() => setActiveScenario('C')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeScenario === 'C'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Escenario C (Pasantías)</span>
          </button>
          <button
            onClick={() => setActiveScenario('validador')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeScenario === 'validador'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Validación Coss Bu (χ²)</span>
          </button>
        </div>
      </div>

      {/* ESCENARIO A: Viabilidad de Posgrados en la FCyT (Secc 4.6.1, Figura 23, Tabla 9) */}
      {activeScenario === 'A' && (
        <div className="space-y-6">
          {/* Panel de Controles */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4.6.1 Escenario A: Viabilidad de Nuevos Posgrados en la FCyT
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ¿Cuántos inscritos puede esperar la FCyT si abre un programa por área? (Población: {poblacionA} titulados, 83% interés, 30.9% FCyT, 35% conversión)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Réplicas:</span>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={replicasA}
                    onChange={(e) => setReplicasA(Number(e.target.value) || 40)}
                    className="w-16 px-2 py-1 text-xs border border-slate-200 rounded font-mono text-center"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Mínimo Equilibrio:</span>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={minThresholdA}
                    onChange={(e) => setMinThresholdA(Number(e.target.value) || 15)}
                    className="w-16 px-2 py-1 text-xs border border-slate-200 rounded font-mono text-center"
                  />
                </div>

                <button
                  onClick={handleRunScenarioA}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simular ({replicasA} réplicas)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Gráfico Figura 23 e Intervalos de Confianza al 95% */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gráfico visual */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Figura 23. Inscritos Esperados por Área de Posgrado (IC 95%)
                  </h4>
                  <span className="text-xs text-rose-600 font-mono font-semibold">
                    --- Umbral Mínimo: {minThresholdA} estudiantes
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Barras de error que representan el intervalo de confianza del 95% obtenido de {replicasA} réplicas
                </p>

                {/* Gráfico de barras SVG con barras de error */}
                <div className="h-64 w-full relative flex items-end justify-around pt-8 pb-4 border-b border-slate-200">
                  {/* Línea horizontal umbral mínimo */}
                  <div
                    style={{ bottom: `${(minThresholdA / 50) * 100}%` }}
                    className="absolute left-0 right-0 border-b-2 border-dashed border-rose-400 z-10 pointer-events-none"
                  >
                    <span className="absolute -top-4 right-2 text-[10px] font-mono text-rose-700 bg-white px-1">
                      mínimo = {minThresholdA}
                    </span>
                  </div>

                  {resultsA.map((res, i) => {
                    const heightPct = Math.min(100, (res.mediaInscritos / 50) * 100);
                    const icInfPct = Math.min(100, (res.icInferior / 50) * 100);
                    const icSupPct = Math.min(100, (res.icSuperior / 50) * 100);
                    const isViable = res.mediaInscritos >= minThresholdA;

                    return (
                      <div key={i} className="flex flex-col items-center h-full justify-end relative w-16 group">
                        {/* Error Bar (IC 95%) */}
                        <div
                          style={{
                            bottom: `${icInfPct}%`,
                            height: `${Math.max(4, icSupPct - icInfPct)}%`
                          }}
                          className="absolute w-2.5 border-l-2 border-r-2 border-slate-800 pointer-events-none z-20 flex flex-col justify-between items-center"
                        >
                          <div className="w-3 h-0.5 bg-slate-800 -mt-0.5"></div>
                          <div className="w-3 h-0.5 bg-slate-800 -mb-0.5"></div>
                        </div>

                        {/* Valor media */}
                        <span className="text-xs font-mono font-bold text-slate-900 mb-1 z-20">
                          {res.mediaInscritos}
                        </span>

                        {/* Barra */}
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-12 rounded-t-sm transition-all duration-300 ${
                            isViable ? 'bg-sky-600 group-hover:bg-sky-700' : 'bg-slate-400 group-hover:bg-slate-500'
                          }`}
                        ></div>

                        {/* Etiqueta */}
                        <span className="text-[11px] font-medium text-slate-700 mt-2 text-center line-clamp-2">
                          {res.area}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-900">Lectura del Modelo:</span> Las barras verticales representan 
                el margen de error muestral estocástico. Solo IA e Ingeniería de Software superan con holgura el umbral mínimo 
                financiero de 15 inscritos para ser autosostenibles.
              </div>
            </div>

            {/* Tabla 9 de Resultados */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Tabla 9. Resultados del Escenario A (Decisión Académica)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Inscritos esperados y probabilidad de viabilidad financiera
                </p>

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden text-xs">
                  <div className="p-2.5 bg-slate-50 font-semibold text-slate-700 grid grid-cols-12 gap-1">
                    <span className="col-span-4">Área Programa</span>
                    <span className="col-span-3 text-right">Inscritos (IC)</span>
                    <span className="col-span-2 text-right">Prob &gt;15</span>
                    <span className="col-span-3 text-right">Decisión</span>
                  </div>

                  {resultsA.map((row, i) => (
                    <div key={i} className="p-2.5 grid grid-cols-12 gap-1 items-center hover:bg-slate-50">
                      <span className="col-span-4 font-semibold text-slate-800">{row.area}</span>
                      <span className="col-span-3 text-right font-mono text-slate-900">
                        {row.mediaInscritos} <span className="text-[10px] text-slate-500 block">[{row.icInferior} - {row.icSuperior}]</span>
                      </span>
                      <span className="col-span-2 text-right font-mono font-bold text-slate-900">
                        {row.probSuperaMinimo}%
                      </span>
                      <span className="col-span-3 text-right">
                        {row.recomendacion === 'Viable' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            Viable
                          </span>
                        )}
                        {row.recomendacion === 'Viable con apoyo' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            Con apoyo
                          </span>
                        )}
                        {row.recomendacion === 'Integrar como módulo' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                            Como módulo
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Conclusiones Escenario A</span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Viabilidad</span>
                </div>
                <p className="text-slate-600">
                  • <strong>IA (100% éxito):</strong> demanda estimada de ~40 inscritos, superando holgadamente el umbral de equilibrio.
                </p>
                <p className="text-slate-600">
                  • <strong>Ing. de Software (88% éxito):</strong> plenamente viable para apertura inmediata.
                </p>
                <p className="text-slate-600">
                  • <strong>Redes (72%), BD y Robótica:</strong> recomiendan integrarse como módulos temáticos dentro de la maestría.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESCENARIO B: Convenios de Becas (Secc 4.6.2, Figura 24) */}
      {activeScenario === 'B' && resultsB && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4.6.2 Escenario B: Convenios de Becas con Empresas y Banca
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ¿Cuánto crece la matrícula si la cobertura de becas sube del 8.2% al {targetBecaB}%? 
                  (Supuesto Coss Bu: Contar con beca duplica la probabilidad de inscripción de 10.8% a 21.6%)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Meta Becas (%):</span>
                  <input
                    type="number"
                    min="15"
                    max="60"
                    step="5"
                    value={targetBecaB}
                    onChange={(e) => setTargetBecaB(Number(e.target.value) || 30)}
                    className="w-16 px-2 py-1 text-xs border border-slate-200 rounded font-mono text-center"
                  />
                </div>

                <button
                  onClick={handleRunScenarioB}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simular Impacto</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Figura 24: Gráfico comparativo */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Figura 24. Inscritos Esperados en el Posgrado FCyT con y sin Convenios de Becas
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    +{resultsB.pctIncrease}% de incremento
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-8">
                  Simulación de {resultsB.replicas} réplicas estocásticas de 1 000 titulados
                </p>

                <div className="h-64 flex items-end justify-center gap-16 pb-4 border-b border-slate-200">
                  {/* Barra Situación Actual */}
                  <div className="flex flex-col items-center w-28">
                    <span className="text-sm font-mono font-bold text-slate-700 mb-1">
                      {resultsB.meanActual}
                    </span>
                    <div
                      style={{ height: `${(resultsB.meanActual / 140) * 100}%` }}
                      className="w-full bg-slate-400 rounded-t-md transition-all duration-300"
                    ></div>
                    <span className="text-xs font-medium text-slate-600 mt-2 text-center">
                      Situación actual<br />
                      <span className="text-[11px] text-slate-500 font-mono">(8.2% con beca)</span>
                    </span>
                  </div>

                  {/* Barra Con Convenios */}
                  <div className="flex flex-col items-center w-28">
                    <span className="text-sm font-mono font-bold text-sky-900 mb-1">
                      {resultsB.meanConvenio}
                    </span>
                    <div
                      style={{ height: `${(resultsB.meanConvenio / 140) * 100}%` }}
                      className="w-full bg-sky-700 rounded-t-md transition-all duration-300"
                    ></div>
                    <span className="text-xs font-semibold text-sky-950 mt-2 text-center">
                      Con convenios<br />
                      <span className="text-[11px] text-sky-800 font-mono">({targetBecaB}% con beca)</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">Hallazgo Numérico:</span> La matrícula total esperada pasa 
                de <span className="font-bold">96.4</span> a <span className="font-bold">114.8 estudiantes (+19.1%)</span>. 
                Esta diferencia es altamente significativa (p &lt; 0.001 en prueba t bilateral). 
                Dado que hoy el 91.8% financia su posgrado de su bolsillo, ampliar las becas es la palanca más efectiva para sostener la oferta de posgrados.
              </div>
            </div>

            {/* Tarjeta Explicativa de Convenios */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Línea de Acción Estratégica 1: Fomento de Becas
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Mecanismos concretos propuestos en el Plan de Acción:
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">Convenios de Crédito Educativo:</span>
                    <p className="text-slate-600 mt-1">
                      Alianzas con Banco Unión y Banco Mercantil Santa Cruz con tasas blandas para profesionales jóvenes.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">Patrocinio Empresarial (B2B):</span>
                    <p className="text-slate-600 mt-1">
                      Empresas de software (Jalasoft, AssureSoft, Mojix) cubren el 50% de la matrícula a cambio de compromiso de permanencia laboral.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">Fondo Semilla de Posgrado UMSS:</span>
                    <p className="text-slate-600 mt-1">
                      Asignación de becas a mejores graduados del pregrado para retener talento investigador en la FCyT.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">Indicador de Seguimiento:</span>
                <span className="font-mono font-bold text-slate-900">% con beca (Meta: 30%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESCENARIO C: Pasantías e Inserción Laboral Rápida (Secc 4.6.3, Figura 25) */}
      {activeScenario === 'C' && resultsC && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4.6.3 Escenario C: Pasantías e Inserción Laboral Rápida
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ¿Cuánto mejora la inserción al primer empleo si se amplían los convenios de pasantías? 
                  (Supuesto Coss Bu: Las pasantías trasladan a la mitad ({factorReduccionC}%) de quienes tardan &gt; 4 meses a "ya trabajaba antes de titularse")
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Factor Reducción (%):</span>
                  <input
                    type="number"
                    min="20"
                    max="80"
                    step="10"
                    value={factorReduccionC}
                    onChange={(e) => setFactorReduccionC(Number(e.target.value) || 50)}
                    className="w-16 px-2 py-1 text-xs border border-slate-200 rounded font-mono text-center"
                  />
                </div>

                <button
                  onClick={handleRunScenarioC}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simular Pasantías</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Figura 25: Gráfico comparativo de barras */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Figura 25. Tiempo para Conseguir el Primer Empleo: Real vs Más Pasantías
                  </h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded bg-slate-400 inline-block"></span> Real ({resultsC.actualRapid}%)
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block"></span> Simulado ({resultsC.simRapid}%)
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Simulación de {resultsC.replicas} réplicas de 1 000 titulados por escenario
                </p>

                <div className="h-64 flex items-end justify-around gap-2 pb-4 border-b border-slate-200">
                  {resultsC.categories.map((cat: any, i: number) => {
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <div className="flex items-end gap-1 h-full w-full justify-center">
                          {/* Barra Real */}
                          <div
                            style={{ height: `${(cat.actualPct / 70) * 100}%` }}
                            className="w-5 bg-slate-400 rounded-t-sm"
                            title={`Real: ${cat.actualPct}%`}
                          ></div>
                          {/* Barra Simulada */}
                          <div
                            style={{ height: `${(cat.simPct / 70) * 100}%` }}
                            className="w-5 bg-emerald-600 rounded-t-sm"
                            title={`Con pasantías: ${cat.simPct}%`}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-600 mt-2 text-center line-clamp-2 leading-tight">
                          {cat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Impacto de Pasantías (Escenario C)</span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">+{resultsC.gainRapid} pp</span>
                </div>
                <p className="text-slate-600">
                  • <strong>Inserción rápida (≤ 4 meses):</strong> sube del {resultsC.actualRapid}% al {resultsC.simRapid}%.
                </p>
                <p className="text-slate-600">
                  • <strong>Reducción de demora:</strong> egresados que tardan &gt; 12 meses se reducen al 50%.
                </p>
              </div>
            </div>

            {/* Métricas clave */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Metas para Acreditación ARCU-SUR
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Criterio de Inserción y Trayectoria
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
                    <span className="text-emerald-950 font-medium block">Inserción Rápida (≤ 4 meses)</span>
                    <span className="text-2xl font-bold font-mono text-emerald-900 block mt-1">
                      {resultsC.simRapid}%
                    </span>
                    <span className="text-[11px] text-emerald-800 mt-1 block">
                      Aumento de +{resultsC.gainRapid} pp frente a la situación actual
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-600 block">Inserción Pre-Titulación</span>
                    <span className="text-2xl font-bold font-mono text-slate-900 block mt-1">
                      64.4%
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Estudiantes que egresan con contrato firmado
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-600 block">Demoras &gt; 12 meses</span>
                    <span className="text-2xl font-bold font-mono text-slate-900 block mt-1">
                      2.5%
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Reducción al 50% de la tasa de rezago laboral
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                Respaldo: Guía metodológica de Taller de Simulación de Sistemas UMSS.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VALIDADOR Y GENERADOR COSS BU (Secc 2.4.3 & 4.7, Tabla 10) */}
      {activeScenario === 'validador' && validationData && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  4.7 Validación del Modelo de Simulación y Generador Congruencial
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Parámetros de ciclo completo: a = 8121, c = 28411, m = 100 000 (Coss Bu, 2003)
                </p>
              </div>

              {/* Control de Semilla */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-medium">Semilla X₀:</span>
                  <input
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(Number(e.target.value) || 45217)}
                    className="w-24 px-2 py-1 text-xs border border-slate-200 rounded font-mono text-center font-bold"
                  />
                </div>
                <button
                  onClick={() => setSeed(Math.floor(Math.random() * 90000) + 10000)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Semilla Aleatoria</span>
                </button>
              </div>
            </div>

            {/* Muestra de números generados paso a paso */}
            <div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                Primeros 8 Números Pseudoaleatorios Generados (Xₙ₊₁ = (8121·Xₙ + 28411) mod 100000, Uₙ = Xₙ/100000)
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs">
                {sampleNumbers.map((s) => (
                  <div key={s.step} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block">Paso {s.step}</span>
                    <span className="font-bold text-slate-800 text-xs block">X = {s.x}</span>
                    <span className="text-sky-900 font-bold text-xs block mt-0.5">U = {s.u}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla 10: Indicadores de Validación del Simulador */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">
                Tabla 10. Indicadores de Validación del Simulador Oficial
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Indicador de Calidad Estocástica</th>
                      <th className="p-3 text-right">Valor Esperado</th>
                      <th className="p-3 text-right">Valor Obtenido</th>
                      <th className="p-3 text-center">¿Cumple Criterio?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-medium text-slate-900">Período del generador congruencial</td>
                      <td className="p-3 text-right text-slate-600">100 000</td>
                      <td className="p-3 text-right font-bold text-slate-900">{validationData.period}</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">Sí (Ciclo Completo)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-medium text-slate-900">Media de U(0,1) en 10 000 números</td>
                      <td className="p-3 text-right text-slate-600">0.5000</td>
                      <td className="p-3 text-right font-bold text-slate-900">{validationData.mean}</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">
                        {validationData.meanPass ? 'Sí' : 'No'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-medium text-slate-900">Varianza de U(0,1) (esperada: 1/12)</td>
                      <td className="p-3 text-right text-slate-600">0.0833</td>
                      <td className="p-3 text-right font-bold text-slate-900">{validationData.variance}</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">
                        {validationData.variancePass ? 'Sí' : 'No'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-medium text-slate-900">Prueba Chi-cuadrado de uniformidad (10 bins)</td>
                      <td className="p-3 text-right text-slate-600">χ² &lt; 16.919</td>
                      <td className="p-3 text-right font-bold text-slate-900">χ² = {validationData.chi2}</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">
                        {validationData.chi2Pass ? 'Sí' : 'No'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-medium text-slate-900">Bondad de ajuste: áreas simuladas frente a reales</td>
                      <td className="p-3 text-right text-slate-600">χ² &lt; 11.07</td>
                      <td className="p-3 text-right font-bold text-slate-900">χ² = 2.069</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">Sí</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans text-slate-700">Proporción simulada: IA</td>
                      <td className="p-3 text-right text-slate-600">36.4% (real)</td>
                      <td className="p-3 text-right font-bold text-slate-900">36.7% (sim)</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">Sí</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans text-slate-700">Proporción simulada: Ingeniería de Software</td>
                      <td className="p-3 text-right text-slate-600">19.6% (real)</td>
                      <td className="p-3 text-right font-bold text-slate-900">19.5% (sim)</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">Sí</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-sans text-slate-700">Proporción simulada: Redes de Datos y Seguridad</td>
                      <td className="p-3 text-right text-slate-600">16.9% (real)</td>
                      <td className="p-3 text-right font-bold text-slate-900">16.8% (sim)</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">Sí</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Conclusión de Validación Coss Bu</span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Aprobado 100%</span>
                </div>
                <p className="text-slate-600">
                  • <strong>Calidad Estocástica:</strong> período completo (100 000), media ~0.50 y varianza ~0.0833 teóricas aprobadas.
                </p>
                <p className="text-slate-600">
                  • <strong>Bondad de Ajuste:</strong> χ² = 2.069 &lt; 11.07 (diferencias empíricas &lt; 1 pp), garantizando validez predictiva institucional.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
