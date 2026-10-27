import React, { useState } from 'react';
import { Titulado, Empleador } from '../types';
import { 
  Briefcase, 
  Building2, 
  Clock, 
  DollarSign, 
  Cpu, 
  Lightbulb, 
  AlertCircle,
  Network,
  Users2
} from 'lucide-react';

interface TabLaborMarketProps {
  titulados: Titulado[];
  empleadores: Empleador[];
}

export const TabLaborMarket: React.FC<TabLaborMarketProps> = ({ titulados, empleadores }) => {
  const [activeSubTab, setActiveSubTab] = useState<'titulados_laboral' | 'empleadores_perfil' | 'tendencias'>('titulados_laboral');

  // Rubros de titulados (Figura 8)
  const rubrosTitulados = [
    { rubro: 'Desarrollo de Software', count: 67, pct: 62.0 },
    { rubro: 'Telecomunicaciones', count: 12, pct: 11.1 },
    { rubro: 'Banca y Servicios Financieros', count: 9, pct: 8.3 },
    { rubro: 'Redes de Computadoras', count: 9, pct: 8.3 },
    { rubro: 'Educación', count: 7, pct: 6.5 },
    { rubro: 'Salud', count: 4, pct: 3.7 }
  ];

  // Inserción al primer empleo (Figura 10)
  const insercionLaboral = [
    { label: 'Ya trabajaba antes de titularse', count: 53, pct: 52.5, rapid: true },
    { label: 'Menos de 1 mes', count: 10, pct: 9.9, rapid: true },
    { label: 'Entre 1 - 4 meses', count: 14, pct: 13.9, rapid: true },
    { label: 'Entre 4 - 8 meses', count: 6, pct: 5.9, rapid: false },
    { label: 'Entre 8 - 12 meses', count: 13, pct: 12.9, rapid: false },
    { label: 'Más de 12 meses', count: 5, pct: 5.0, rapid: false }
  ];

  // Remuneración según sector (Figura 11)
  const salariosComparativa = [
    { range: '< 2 500 Bs', privadoPct: 7.0, publicoPct: 0.0 },
    { range: '2 500 - 3 500 Bs', privadoPct: 4.2, publicoPct: 30.0 },
    { range: '3 501 - 5 000 Bs', privadoPct: 16.9, publicoPct: 20.0 },
    { range: '5 001 - 7 000 Bs', privadoPct: 18.3, publicoPct: 25.0 },
    { range: '7 001 - 10 000 Bs', privadoPct: 23.9, publicoPct: 20.0 },
    { range: '> 10 000 Bs', privadoPct: 29.6, publicoPct: 5.0 }
  ];

  // Razones no trabaja (Tabla 6)
  const razonesNoTrabaja = [
    { razon: 'Incumplimiento de requisitos en habilidades específicas (idiomas, frameworks)', count: 7, pct: 28.0 },
    { razon: 'Demanda laboral inexistente o saturación percibida', count: 6, pct: 24.0 },
    { razon: 'Incumplimiento de requisitos de experiencia previa solicitada', count: 4, pct: 16.0 },
    { razon: 'Otros motivos personales o formativos', count: 4, pct: 16.0 },
    { razon: 'Ofertas laborales con remuneración muy bajas no aceptadas', count: 2, pct: 8.0 },
    { razon: 'Red de contactos limitada en el ecosistema', count: 1, pct: 4.0 },
    { razon: 'Habilidades deficientes en las entrevistas técnicas', count: 1, pct: 4.0 }
  ];

  // Rubros de los 51 empleadores (Figura 12)
  const rubrosEmpleadores = [
    { rubro: 'Desarrollo de software', count: 21, pct: 41.2 },
    { rubro: 'Startups o emprendimientos tecnológicos', count: 4, pct: 7.8 },
    { rubro: 'Telecomunicaciones y redes', count: 4, pct: 7.8 },
    { rubro: 'Otros sectores', count: 4, pct: 7.8 },
    { rubro: 'Salud', count: 3, pct: 5.9 },
    { rubro: 'Instituciones públicas / gobierno', count: 3, pct: 5.9 },
    { rubro: 'Servicios de tecnologías de información (TI)', count: 3, pct: 5.9 },
    { rubro: 'Soporte técnico y mantenimiento de sistemas', count: 3, pct: 5.9 },
    { rubro: 'Industria y manufactura', count: 2, pct: 3.9 },
    { rubro: 'Educación e investigación', count: 1, pct: 2.0 },
    { rubro: 'Banca y servicios financieros', count: 1, pct: 2.0 },
    { rubro: 'Consultoría en sistemas / transformación digital', count: 1, pct: 2.0 },
    { rubro: 'Comercio y comercio electrónico', count: 1, pct: 2.0 }
  ];

  // Tecnologías emergentes mencionadas por empleadores (Figura 15)
  const tecnologiasEmergentes = [
    { tech: 'Inteligencia artificial / agentes / Machine Learning', count: 41, pct: 82.0 },
    { tech: 'Desarrollo web y móvil / Arquitectura de APIs', count: 16, pct: 32.0 },
    { tech: 'Ciberseguridad / Seguridad informática', count: 14, pct: 28.0 },
    { tech: 'Automatización / IoT', count: 12, pct: 24.0 },
    { tech: 'Cloud Computing / DevOps / Contenedores (Docker, K8s)', count: 12, pct: 24.0 },
    { tech: 'Análisis de datos / Big Data / BI', count: 10, pct: 20.0 },
    { tech: 'Gestión ágil / Product Management (Scrum)', count: 7, pct: 14.0 },
    { tech: 'Control de versiones profesional (Git / GitHub)', count: 6, pct: 12.0 }
  ];

  // Habilidades blandas (Figura 16)
  const habilidadesBlandas = [
    { skill: 'Adaptabilidad y aprendizaje continuo', count: 16, pct: 31.4 },
    { skill: 'Trabajo en equipo y colaboración efectiva', count: 13, pct: 25.5 },
    { skill: 'Resolución de problemas y pensamiento lógico-crítico', count: 12, pct: 23.5 },
    { skill: 'Comunicación y expresión asertiva', count: 9, pct: 17.6 },
    { skill: 'Responsabilidad, compromiso y ética profesional', count: 8, pct: 15.7 },
    { skill: 'Comprensión de requerimientos y lógica del negocio', count: 6, pct: 11.8 },
    { skill: 'Tolerancia al trabajo bajo presión y plazos cortos', count: 5, pct: 9.8 },
    { skill: 'Proactividad e iniciativa autónoma', count: 5, pct: 9.8 },
    { skill: 'Dominio del idioma inglés técnico', count: 3, pct: 5.9 }
  ];

  return (
    <div className="space-y-8">
      {/* Sub-navegación contextual */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Oferta Laboral y Requerimientos del Sector Productivo (Capítulo 4)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Evidencia empírica sobre inserción laboral, salarios y demandas de la industria de software
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveSubTab('titulados_laboral')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'titulados_laboral'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Trayectoria Titulados</span>
          </button>
          <button
            onClick={() => setActiveSubTab('empleadores_perfil')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'empleadores_perfil'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Demanda Empleadores (n=51)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('tendencias')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'tendencias'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Tecnologías & Soft Skills</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'titulados_laboral' && (
        <div className="space-y-8">
          {/* Fila 1: Situación Laboral y Rubros */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tabla 5: Situación laboral */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Tabla 5. Situación Laboral Actual de los Titulados (n = 148)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Distribución ocupacional en el mercado
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 bg-sky-50/60 rounded-lg border border-sky-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-sky-950">Trabaja en una organización</span>
                      <span className="font-mono font-bold text-sky-950 text-base">108 (73.0%)</span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-sky-200 rounded-full overflow-hidden">
                      <div className="w-[73%] h-full bg-sky-700 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-emerald-950">Emprendimiento propio / Startup</span>
                      <span className="font-mono font-bold text-emerald-950 text-base">15 (10.1%)</span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="w-[10.1%] h-full bg-emerald-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-700">No trabaja actualmente</span>
                      <span className="font-mono font-bold text-slate-900 text-base">25 (16.9%)</span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-[16.9%] h-full bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Ocupación Activa: 83.1%</span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Alta Empleabilidad</span>
                </div>
                <p className="text-slate-600">
                  • <strong>80.6%</strong> en sector privado y <strong>88.0%</strong> en Cochabamba.
                </p>
                <p className="text-slate-600">
                  • Solo 16.9% no ocupado actualmente (la mayoría con experiencia previa).
                </p>
              </div>
            </div>

            {/* Figura 8: Rubros donde trabajan */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Figura 8. Rubro de la Organización Empleadora (n = 108 en org)
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Concentración de empleo en el sector tecnológico
              </p>

              <div className="space-y-3.5">
                {rubrosTitulados.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.rubro}</span>
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

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Cargos Desarrollo</span>
                  <span className="font-mono font-bold text-slate-900">64.8%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cargos Ejecutivos</span>
                  <span className="font-mono font-bold text-slate-900">15.7%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cargos Técnicos</span>
                  <span className="font-mono font-bold text-slate-900">12.0%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Pertinencia de labores</span>
                  <span className="font-mono font-bold text-emerald-700">90.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fila 2: Inserción al Primer Empleo (Figura 10) y Remuneración Privado vs Público (Figura 11) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Figura 10 */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Figura 10. Tiempo para Conseguir Primer Empleo (n = 101)
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-800 font-mono font-semibold rounded">
                    76.3% en ≤ 4 meses
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Evidencia fundamental para el criterio de seguimiento a graduados ARCU-SUR
                </p>

                <div className="space-y-3">
                  {insercionLaboral.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${item.rapid ? 'text-slate-900' : 'text-slate-600'}`}>
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{item.count}</span>
                          <span className="font-mono text-slate-500">({item.pct}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${item.pct}%` }}
                          className={`h-full rounded-full ${item.rapid ? 'bg-sky-600' : 'bg-slate-400'}`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Absorción Temprana: 52.5%</span>
                  <span className="text-[11px] font-mono font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">Pre-grado</span>
                </div>
                <p className="text-slate-600">
                  • <strong>76.3%</strong> insertado en ≤ 4 meses.
                </p>
                <p className="text-slate-600">
                  • Vías de contratación: postulación competitiva (41.1%) y recomendación (29.9%).
                </p>
              </div>
            </div>

            {/* Figura 11: Remuneración mensual según sector */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    Figura 11. Remuneración Mensual según Sector
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-sky-800">
                      <span className="w-2.5 h-2.5 rounded bg-sky-600 inline-block"></span>
                      <span>Privado (n=71)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-800">
                      <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span>
                      <span>Público (n=20)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Diferencia salarial comprobada con prueba Chi-cuadrado (p = 0.045, V = 0.21)
                </p>

                <div className="space-y-3">
                  {salariosComparativa.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{item.range}</span>
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="text-sky-700">{item.privadoPct}%</span>
                          <span className="text-amber-700">{item.publicoPct}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 h-2.5">
                        <div className="w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${item.privadoPct * 3}%` }}
                            className="h-full bg-sky-600 rounded-full"
                          ></div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${item.publicoPct * 3}%` }}
                            className="h-full bg-amber-500 rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Brecha Salarial (p = 0.045)</span>
                  <span className="text-[11px] font-mono font-semibold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">Significativo</span>
                </div>
                <p className="text-slate-600">
                  • <strong>53.5%</strong> del sector privado gana &gt; Bs. 7 000 (29.6% &gt; Bs. 10 000).
                </p>
                <p className="text-slate-600">
                  • En el sector público solo 25% supera los Bs. 7 000 (concentrado en 2 500 - 5 000 Bs).
                </p>
              </div>
            </div>
          </div>

          {/* Fila 3: Titulados que no trabajan (Tabla 6) y Emprendedores */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Tabla 6. Razones por las que no Trabajan en el Área (n = 25 no ocupados)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                El 68% de los 25 sí tuvo empleo previo en el área tecnológica. Barreras identificadas:
              </p>

              <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden text-xs">
                {razonesNoTrabaja.map((r, i) => (
                  <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50">
                    <span className="font-medium text-slate-800 pr-4">{r.razon}</span>
                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <span className="font-bold text-slate-900">{r.count}</span>
                      <span className="text-slate-500">({r.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Emprendedores (n = 15 titulados)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  10.1% de la población de egresados
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Origen del emprendimiento</span>
                    <span className="font-bold text-slate-900">80.0% ideas propias / con compañeros</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Financiamiento inicial</span>
                    <span className="font-bold text-slate-900">66.7% financiado con recursos propios</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Satisfacción con el negocio</span>
                    <span className="font-bold text-slate-900">53.3% satisfecho con su empresa</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Aporte formativo de la UMSS</span>
                    <span className="font-bold text-emerald-800">80.0% formación importante/muy importante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'empleadores_perfil' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block">Total Muestra Válida</span>
              <span className="text-2xl font-bold font-mono text-slate-900">51 empresas</span>
              <span className="text-xs text-slate-500 block mt-1">45 orgs únicas filtradas</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block">Sector Privado</span>
              <span className="text-2xl font-bold font-mono text-sky-800">76.5% (39 orgs)</span>
              <span className="text-xs text-slate-500 block mt-1">Sector Público: 23.5% (12)</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block">Contrató en últimos 5 años</span>
              <span className="text-2xl font-bold font-mono text-emerald-700">80.4%</span>
              <span className="text-xs text-slate-500 block mt-1">41 de 51 empleadores</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block">Previsión de Contratación</span>
              <span className="text-2xl font-bold font-mono text-indigo-700">80.0%</span>
              <span className="text-xs text-slate-500 block mt-1">29% alta / 51% según proy.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Figura 12: Rubros de empleadores */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Figura 12. Organizaciones Empleadoras según Rubro (n = 51)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Composición de los sectores económicos que demandan ingenieros de la UMSS
              </p>

              <div className="space-y-2.5">
                {rubrosEmpleadores.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800 truncate pr-2">{item.rubro}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono font-bold text-slate-900">{item.count}</span>
                        <span className="font-mono text-slate-500">({item.pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.pct * 2.2}%` }}
                        className="h-full bg-emerald-600 rounded-full"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Figura 13 & 14: Posibilidad de Contratación y Cargos */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Figura 13. Nivel de Formación Demandado por Empleadores
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Requisito académico de ingreso
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-sky-50 rounded-md border border-sky-200">
                    <span className="font-bold text-sky-950">Licenciatura en Sistemas</span>
                    <span className="font-mono font-bold text-sky-950">37 (72.5%)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-md border border-slate-100">
                    <span className="font-medium text-slate-800">Especialidad</span>
                    <span className="font-mono font-bold text-slate-900">8 (15.7%)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-md border border-slate-100">
                    <span className="font-medium text-slate-800">Diplomado</span>
                    <span className="font-mono font-bold text-slate-900">4 (7.8%)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-md border border-slate-100">
                    <span className="font-medium text-slate-800">Maestría</span>
                    <span className="font-mono font-bold text-slate-900">2 (3.9%)</span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  El posgrado funciona como factor de diferenciación salarial y ascensos, no como filtro excluyente de ingreso.
                </p>
              </div>

              {/* Figura 14: Cargos */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Figura 14. Cargos Desempeñados por Titulados (Selección Múltiple)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Roles donde las empresas asignan a los ingenieros
                </p>

                <div className="space-y-2 text-xs">
                  {[
                    { cargo: 'Técnico en Sistemas / Desarrollo', count: 36, pct: 70.6 },
                    { cargo: 'Analista de Sistemas / Procesos', count: 26, pct: 51.0 },
                    { cargo: 'Especialista Tecnológico', count: 22, pct: 43.1 },
                    { cargo: 'Apoyo / Asistencia Tecnológica', count: 20, pct: 39.2 },
                    { cargo: 'Supervisor / Coordinador de Equipo', count: 16, pct: 31.4 },
                    { cargo: 'Jefatura o Gerencial', count: 11, pct: 21.6 },
                    { cargo: 'Consultor Tecnológico Externo', count: 7, pct: 13.7 }
                  ].map((c, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100">
                      <span className="font-medium text-slate-700">{c.cargo}</span>
                      <span className="font-mono font-semibold text-slate-900">{c.count} ({c.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'tendencias' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Figura 15: Tecnologías Emergentes */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-5 h-5 text-indigo-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Figura 15. Tecnologías Emergentes Demandadas (Preguntas Abiertas 10 y 11)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Análisis por palabras clave de 50 respuestas válidas de empleadores
            </p>

            <div className="space-y-3.5">
              {tecnologiasEmergentes.map((t, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{t.tech}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-indigo-950">{t.count}</span>
                      <span className="font-mono text-slate-500">({t.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${t.pct}%` }}
                      className="h-full bg-indigo-700 rounded-full"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 bg-indigo-50/70 rounded-lg border border-indigo-200 text-xs text-indigo-950 space-y-1">
              <div className="font-bold flex items-center justify-between">
                <span>Alineación en IA: 82%</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-200 font-bold">Prioridad #1</span>
              </div>
              <p className="text-slate-600">
                • Demanda unánime: la industria busca perfiles con IA, machine learning y agentes autónomos.
              </p>
              <p className="text-slate-600">
                • Coincide con el 43.9% de titulados que desea posgrados en IA, validando la oferta de formación.
              </p>
            </div>
          </div>

          {/* Figura 16: Habilidades Blandas Fundamentales */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <Users2 className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Figura 16. Habilidades y Competencias Blandas Fundamentales (Pregunta Abierta 12)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Competencias profesionales demandadas por empleadores (n = 51)
            </p>

            <div className="space-y-3.5">
              {habilidadesBlandas.map((h, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">{h.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-950">{h.count}</span>
                      <span className="font-mono text-slate-500">({h.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${h.pct * 2.5}%` }}
                      className="h-full bg-emerald-600 rounded-full"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 bg-emerald-50/70 rounded-lg border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center justify-between">
                <span>Habilidades Blandas Más Exigidas</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 font-bold">ARCU-SUR</span>
              </div>
              <p className="text-slate-600">
                • <strong>Adaptabilidad</strong> (31.4%), <strong>trabajo en equipo</strong> (25.5%) y <strong>pensamiento crítico</strong> (23.5%).
              </p>
              <p className="text-slate-600">
                • Recomienda incluir metodologías ágiles y proyectos interdisciplinarios en la malla curricular.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
