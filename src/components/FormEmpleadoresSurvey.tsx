import React, { useState } from 'react';
import { Empleador } from '../types';
import { AFIRMACIONES_EMPLEADORES, DIMENSIONES_EMPLEADORES } from '../data/strategicPlan';
import { 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Briefcase, 
  Cpu, 
  Users2, 
  Award,
  Layers
} from 'lucide-react';

interface FormEmpleadoresSurveyProps {
  onAddEmpleador: (empleador: Empleador) => void;
  onNavigateToAnalytics: () => void;
  empleadoresTotal: number;
}

export const FormEmpleadoresSurvey: React.FC<FormEmpleadoresSurveyProps> = ({
  onAddEmpleador,
  onNavigateToAnalytics,
  empleadoresTotal
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string>('');

  const [formData, setFormData] = useState({
    organizacion: '',
    tipo: 'Sector privado' as Empleador['tipo'],
    tamano: 'Mediana empresa (51-200)' as Empleador['tamano'],
    rubro: 'Desarrollo de Software',
    contrato_5_anios: 'Sí' as 'Sí' | 'No',
    posibilidad_contratacion: 'Alta probabilidad' as Empleador['posibilidad_contratacion'],
    nivel_demandado: 'Licenciatura' as Empleador['nivel_demandado'],
    medio_convocatoria: 'Internet y Redes sociales (LinkedIn)',
    cargos: ['Técnico', 'Analista de sistemas', 'Especialista'],
    tendencias_texto: 'Inteligencia Artificial generativa, desarrollo de APIs microservicios, Cloud AWS/GCP, automatización CI/CD',
    habilidades_texto: 'Adaptabilidad y aprendizaje autónomo, trabajo en equipo interdisciplinario, resolución lógica de problemas',
    items_likert: {} as { [key: string]: 'Totalmente de acuerdo' | 'Parcialmente de acuerdo' | 'Totalmente en desacuerdo' | 'No sabe' }
  });

  // Inicializar respuestas por defecto para los 18 ítems
  React.useEffect(() => {
    const initialLikert: { [key: string]: any } = {};
    AFIRMACIONES_EMPLEADORES.forEach((af) => {
      initialLikert[af.id] = [1, 2, 5, 6, 8, 9].includes(af.numero)
        ? 'Totalmente de acuerdo'
        : [3, 7, 11, 16, 17].includes(af.numero)
        ? 'Parcialmente de acuerdo'
        : 'Totalmente en desacuerdo';
    });
    setFormData((prev) => ({ ...prev, items_likert: initialLikert }));
  }, []);

  const handleLikertChange = (itemId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items_likert: {
        ...prev.items_likert,
        [itemId]: value
      }
    }));
  };

  const availableCargos = [
    'Técnico (desarrollo, redes, BD, soporte)',
    'Analista de sistemas / procesos',
    'Especialista (ciberseguridad, arquitectura)',
    'Apoyo / Asistencia tecnológica',
    'Supervisor / Coordinador de proyectos',
    'Jefatura o Gerencial',
    'Consultor tecnológico'
  ];

  const toggleCargo = (cargo: string) => {
    setFormData((prev) => ({
      ...prev,
      cargos: prev.cargos.includes(cargo)
        ? prev.cargos.filter((c) => c !== cargo)
        : [...prev.cargos, cargo]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organizacion.trim()) return;

    const newId = `EMP-${String(empleadoresTotal + 1).padStart(3, '0')}`;
    const newRecord: Empleador = {
      id: newId,
      organizacion: formData.organizacion.trim(),
      tipo: formData.tipo,
      tamano: formData.tamano,
      rubro: formData.rubro,
      contrato_5_anios: formData.contrato_5_anios,
      posibilidad_contratacion: formData.posibilidad_contratacion,
      nivel_demandado: formData.nivel_demandado,
      medio_convocatoria: formData.medio_convocatoria,
      cargos: formData.cargos.length > 0 ? formData.cargos : ['Técnico', 'Analista de sistemas'],
      tendencias_texto: formData.tendencias_texto,
      habilidades_texto: formData.habilidades_texto,
      items_likert: formData.items_likert
    };

    onAddEmpleador(newRecord);
    setLastAddedId(newId);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-900 text-white flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Llenar Encuesta Oficial de Empleadores
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Evaluación institucional del sector productivo respaldada por la carta oficial DIR SIS 143/2026
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          Al registrar una empresa, se recalculan al vuelo los <strong>índices de acuerdo en las 4 dimensiones de calidad</strong>, 
          los requerimientos de competencias tecnológicas y las matrices diagnósticas para ARCU-SUR.
        </p>
      </div>

      {/* Alerta de Éxito al Enviar */}
      {submitted && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 text-emerald-950 font-bold text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>¡Encuesta de Empleador #{lastAddedId} Registrada con Éxito!</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            La empresa <strong>"{formData.organizacion}"</strong> ha sido incorporada al diagnóstico de mercado. La muestra en memoria ahora suma <strong>{empleadoresTotal} empleadores</strong>.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onNavigateToAnalytics}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Ver Índices de Acuerdo en las 4 Dimensiones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData((prev) => ({ ...prev, organizacion: '' }));
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-white border border-emerald-300 hover:bg-emerald-100/50 rounded-lg transition-colors"
            >
              Llenar Otra Encuesta de Empresa
            </button>
          </div>
        </div>
      )}

      {/* Formulario Principal */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sección 1: Datos de la Organización */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Briefcase className="w-4 h-4 text-sky-800" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              1. Identificación y Perfil de la Organización
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">
                Nombre o Razón Social de la Organización / Empresa <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Jalasoft, Banco Unión, AssureSoft, Soluciones Digitales SRL..."
                value={formData.organizacion}
                onChange={(e) => setFormData({ ...formData, organizacion: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 font-medium text-slate-900 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Naturaleza Jurídica</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Sector privado">Sector privado</option>
                <option value="Sector público">Sector público</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tamaño de la Empresa</label>
              <select
                value={formData.tamano}
                onChange={(e) => setFormData({ ...formData, tamano: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Micro empresa (1-10)">Micro empresa (1 a 10 funcionarios)</option>
                <option value="Pequeña empresa (11-50)">Pequeña empresa (11 a 50 funcionarios)</option>
                <option value="Mediana empresa (51-200)">Mediana empresa (51 a 200 funcionarios)</option>
                <option value="Gran empresa (>200)">Gran empresa (Más de 200 funcionarios)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Rubro de Actividad Principal</label>
              <select
                value={formData.rubro}
                onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Desarrollo de Software">Desarrollo de software</option>
                <option value="Startups o emprendimientos tecnológicos">Startups o emprendimientos tecnológicos</option>
                <option value="Telecomunicaciones y redes">Telecomunicaciones y redes</option>
                <option value="Banca y servicios financieros">Banca y servicios financieros</option>
                <option value="Servicios de tecnologías de información (TI)">Servicios de tecnologías de información (TI)</option>
                <option value="Instituciones públicas / gobierno">Instituciones públicas / gobierno</option>
                <option value="Salud">Salud</option>
                <option value="Industria y manufactura">Industria y manufactura</option>
                <option value="Educación e investigación">Educación e investigación</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                ¿Ha contratado ingenieros de sistemas en los últimos 5 años?
              </label>
              <select
                value={formData.contrato_5_anios}
                onChange={(e) => setFormData({ ...formData, contrato_5_anios: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Previsión de Nuevas Contrataciones
              </label>
              <select
                value={formData.posibilidad_contratacion}
                onChange={(e) => setFormData({ ...formData, posibilidad_contratacion: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Alta probabilidad">Alta probabilidad de contratación</option>
                <option value="Depende del crecimiento / proyectos">Depende del crecimiento de proyectos</option>
                <option value="No prevista actualmente">No prevista actualmente</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Nivel Académico Exigido para el Puesto
              </label>
              <select
                value={formData.nivel_demandado}
                onChange={(e) => setFormData({ ...formData, nivel_demandado: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Licenciatura">Licenciatura en Sistemas</option>
                <option value="Especialidad">Especialidad</option>
                <option value="Diplomado">Diplomado</option>
                <option value="Maestría">Maestría</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sección 2: Tecnologías Emergentes y Competencias */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Cpu className="w-4 h-4 text-indigo-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              2. Tendencias Tecnológicas & Competencias Demandadas
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tecnologías y herramientas que considera indispensables (Preguntas abiertas 10 y 11):
              </label>
              <textarea
                rows={2}
                value={formData.tendencias_texto}
                onChange={(e) => setFormData({ ...formData, tendencias_texto: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900 leading-relaxed"
                placeholder="Ej. Inteligencia artificial, desarrollo web y APIs, ciberseguridad, DevOps Docker, automatización..."
              ></textarea>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Habilidades blandas y humanas más valoradas (Pregunta abierta 12):
              </label>
              <textarea
                rows={2}
                value={formData.habilidades_texto}
                onChange={(e) => setFormData({ ...formData, habilidades_texto: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900 leading-relaxed"
                placeholder="Ej. Adaptabilidad y autoaprendizaje, trabajo en equipo interdisciplinario, resolución lógica de problemas..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sección 3: Las 18 Afirmaciones de Evaluación ARCU-SUR */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-800" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                3. Evaluación de la Carrera en las 4 Dimensiones ARCU-SUR (18 Ítems)
              </h2>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Escala de 4 niveles</span>
          </div>

          <div className="space-y-6">
            {DIMENSIONES_EMPLEADORES.map((dim, dIdx) => (
              <div key={dIdx} className="space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                  <span className="font-bold text-sky-950 uppercase">
                    Dimensión 0{dIdx + 1}: {dim.dimension}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Índice histórico: {dim.indiceReportado} pts
                  </span>
                </div>

                <div className="space-y-3">
                  {AFIRMACIONES_EMPLEADORES.filter((af) => dim.afirmaciones.includes(af.numero)).map((af) => {
                    const currentVal = formData.items_likert[af.id] || 'Totalmente de acuerdo';

                    return (
                      <div key={af.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-sky-900 bg-sky-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                            #{af.numero}
                          </span>
                          <span className="font-semibold text-slate-800 leading-snug">
                            {af.texto}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {[
                            { val: 'Totalmente de acuerdo', color: 'bg-sky-900 text-white' },
                            { val: 'Parcialmente de acuerdo', color: 'bg-sky-600 text-white' },
                            { val: 'Totalmente en desacuerdo', color: 'bg-amber-600 text-white' },
                            { val: 'No sabe', color: 'bg-slate-600 text-white' }
                          ].map((opt) => (
                            <button
                              type="button"
                              key={opt.val}
                              onClick={() => handleLikertChange(af.id, opt.val)}
                              className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all text-[11px] ${
                                currentVal === opt.val
                                  ? `${opt.color} font-bold shadow-xs`
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {opt.val}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de Envío con sombreado tactile */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-3.5 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-900/25 border border-sky-800 hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Guardar e Interpretar Encuesta de Empleador</span>
          </button>
        </div>
      </form>
    </div>
  );
};
