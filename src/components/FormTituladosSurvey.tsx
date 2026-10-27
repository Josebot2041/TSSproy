import React, { useState } from 'react';
import { Titulado } from '../types';
import { 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Briefcase, 
  DollarSign, 
  BookOpen, 
  Layers, 
  Sliders
} from 'lucide-react';

interface FormTituladosSurveyProps {
  onAddTitulado: (titulado: Titulado) => void;
  onNavigateToAnalytics: () => void;
  tituladosTotal: number;
}

export const FormTituladosSurvey: React.FC<FormTituladosSurveyProps> = ({
  onAddTitulado,
  onNavigateToAnalytics,
  tituladosTotal
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string>('');

  const [formData, setFormData] = useState({
    edad: '27 - 30 años' as Titulado['edad'],
    genero: 'Masculino' as Titulado['genero'],
    anios_vida_profesional: 4,
    anios_desempleado: 0,
    formacion_complementaria: 'Sí' as 'Sí' | 'No',
    nivel_realizado: 'Diplomado' as Titulado['nivel_realizado'],
    lugar_realizado: 'Posgrado FCyT' as Titulado['lugar_realizado'],
    financiamiento: 'Recursos propios' as Titulado['financiamiento'],
    interes_posgrado: 'Sí' as 'Sí' | 'No',
    area_interes: 'IA' as Titulado['area_interes'],
    institucion_preferida: 'Posgrado FCyT' as Titulado['institucion_preferida'],
    situacion_laboral: 'Trabaja en una organización' as Titulado['situacion_laboral'],
    sector: 'Sector privado' as Titulado['sector'],
    rubro: 'Desarrollo de Software' as Titulado['rubro'],
    cargo: 'Desarrollo' as Titulado['cargo'],
    remuneracion: '7 001 - 10 000' as Titulado['remuneracion'],
    tiempo_primer_empleo: 'Ya trabajaba antes de titularse' as Titulado['tiempo_primer_empleo'],
    satisfaccion_global: 3 as 1 | 2 | 3 | 4,
    concordancia_formacion: 3 as 1 | 2 | 3 | 4,
    pertinencia_labores: 4 as 1 | 2 | 3 | 4,
    opinion_posgrado_fcyt: 3 as 1 | 2 | 3 | 4,
    asignaturas_ventaja: ['Base de Datos', 'T.I.S. (Taller de Ingeniería de Software)'],
    asignaturas_no_utiles: ['Aplicaciones Interactivas para TV Digital']
  });

  const availableVentajas = [
    'Base de Datos',
    'T.I.S. (Taller de Ingeniería de Software)',
    'Redes de Computadora',
    'Planificación de Proyectos y Gestión',
    'Electivas de Especialidad',
    'Inteligencia Artificial',
    'Introducción a la Programación',
    'Tecnología de Redes Avanzadas'
  ];

  const availableNoUtiles = [
    'Aplicaciones Interactivas para TV Digital',
    'Ciencias Básicas (Física, Cálculo, Álgebra)',
    'Contabilidad Básica',
    'Telefonía IP',
    'Web Semánticas',
    'Robótica',
    'Taller de Programación en Bajo Nivel'
  ];

  const toggleVentaja = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      asignaturas_ventaja: prev.asignaturas_ventaja.includes(item)
        ? prev.asignaturas_ventaja.filter((i) => i !== item)
        : [...prev.asignaturas_ventaja, item]
    }));
  };

  const toggleNoUtil = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      asignaturas_no_utiles: prev.asignaturas_no_utiles.includes(item)
        ? prev.asignaturas_no_utiles.filter((i) => i !== item)
        : [...prev.asignaturas_no_utiles, item]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TIT-${String(tituladosTotal + 1).padStart(3, '0')}`;
    const exp = Number(formData.anios_vida_profesional) || 0;
    const desempleo = Number(formData.anios_desempleado) || 0;

    const newRecord: Titulado = {
      id: newId,
      edad: formData.edad,
      genero: formData.genero,
      anios_vida_profesional: exp,
      anios_desempleado: desempleo,
      segmento: exp < 5 ? 'Junior (< 5 años)' : 'Consolidado (≥ 5 años)',
      formacion_complementaria: formData.formacion_complementaria,
      nivel_realizado: formData.formacion_complementaria === 'Sí' ? formData.nivel_realizado : undefined,
      lugar_realizado: formData.formacion_complementaria === 'Sí' ? formData.lugar_realizado : undefined,
      financiamiento: formData.formacion_complementaria === 'Sí' ? formData.financiamiento : undefined,
      interes_posgrado: formData.interes_posgrado,
      area_interes: formData.interes_posgrado === 'Sí' ? formData.area_interes : undefined,
      institucion_preferida: formData.interes_posgrado === 'Sí' ? formData.institucion_preferida : undefined,
      situacion_laboral: formData.situacion_laboral,
      sector: formData.situacion_laboral !== 'No trabaja' ? formData.sector : undefined,
      rubro: formData.situacion_laboral !== 'No trabaja' ? formData.rubro : undefined,
      cargo: formData.situacion_laboral !== 'No trabaja' ? formData.cargo : undefined,
      remuneracion: formData.situacion_laboral !== 'No trabaja' ? formData.remuneracion : undefined,
      tiempo_primer_empleo: formData.tiempo_primer_empleo,
      satisfaccion_global: formData.satisfaccion_global,
      concordancia_formacion: formData.concordancia_formacion,
      pertinencia_labores: formData.situacion_laboral !== 'No trabaja' ? formData.pertinencia_labores : undefined,
      opinion_posgrado_fcyt: formData.opinion_posgrado_fcyt,
      actividades: ['Desarrollo de software', 'Cómputo'],
      aspectos_utiles: ['Habilidades analíticas y resolución de problemas'],
      aspectos_mejorar: ['Actualización constante del plan de estudios'],
      asignaturas_ventaja: formData.asignaturas_ventaja,
      asignaturas_no_utiles: formData.asignaturas_no_utiles
    };

    onAddTitulado(newRecord);
    setLastAddedId(newId);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Encabezado del Formulario */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-900 text-white flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Llenar Encuesta Oficial de Titulados
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Formulario de relevamiento de perfil, inserción laboral, posgrados y valoración curricular
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          Al enviar esta encuesta, el registro se integrará en tiempo real al análisis del observatorio: 
          la media de antigüedad (HU1), la demanda de especialización en IA (HU2), las pruebas Chi-cuadrado 
          y las simulaciones de Coss Bu se actualizarán inmediatamente.
        </p>
      </div>

      {/* Alerta de Éxito al Enviar */}
      {submitted && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 text-emerald-950 font-bold text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>¡Encuesta de Titulado #{lastAddedId} Registrada con Éxito!</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            Los datos han sido incorporados a la base limpia. La base de datos ahora cuenta con <strong>{tituladosTotal} titulados</strong> en memoria.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onNavigateToAnalytics}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Ver Impacto en Gráficos & Estadísticas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-white border border-emerald-300 hover:bg-emerald-100/50 rounded-lg transition-colors"
            >
              Llenar Otra Encuesta de Titulado
            </button>
          </div>
        </div>
      )}

      {/* Formulario Principal */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sección 1: Datos Generales y Demografía */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <GraduationCap className="w-4 h-4 text-sky-800" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              1. Caracterización General y Trayectoria
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Rango de Edad</label>
              <select
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900 focus:ring-1 focus:ring-sky-500"
              >
                <option value="19 - 22 años">19 - 22 años</option>
                <option value="23 - 26 años">23 - 26 años</option>
                <option value="27 - 30 años">27 - 30 años</option>
                <option value="31 - 34 años">31 - 34 años</option>
                <option value="35 años o más">35 años o más</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Género</label>
              <select
                value={formData.genero}
                onChange={(e) => setFormData({ ...formData, genero: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900 focus:ring-1 focus:ring-sky-500"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Años de Vida Profesional (Experiencia en Sistemas)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="40"
                required
                value={formData.anios_vida_profesional}
                onChange={(e) => setFormData({ ...formData, anios_vida_profesional: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 font-mono text-slate-900 focus:ring-1 focus:ring-sky-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                {formData.anios_vida_profesional < 5 ? '→ Segmento clasificado: Junior (< 5 años)' : '→ Segmento clasificado: Consolidado (≥ 5 años)'}
              </span>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tiempo Total de Desempleo Acumulado (Años)
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="10"
                value={formData.anios_desempleado}
                onChange={(e) => setFormData({ ...formData, anios_desempleado: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 font-mono text-slate-900 focus:ring-1 focus:ring-sky-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Coloca 0 si nunca has estado sin empleo formal
              </span>
            </div>
          </div>
        </div>

        {/* Sección 2: Formación de Posgrado y Demanda (HU2) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <BookOpen className="w-4 h-4 text-indigo-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              2. Formación Continua & Demanda de Posgrado (HU2)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">¿Realizó algún programa de posgrado?</label>
              <select
                value={formData.formacion_complementaria}
                onChange={(e) => setFormData({ ...formData, formacion_complementaria: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            {formData.formacion_complementaria === 'Sí' && (
              <>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nivel Máximo Cursado</label>
                  <select
                    value={formData.nivel_realizado}
                    onChange={(e) => setFormData({ ...formData, nivel_realizado: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Diplomado">Diplomado</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Especialidad">Especialidad</option>
                    <option value="Doctorado">Doctorado</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Institución donde Cursó</label>
                  <select
                    value={formData.lugar_realizado}
                    onChange={(e) => setFormData({ ...formData, lugar_realizado: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Posgrado FCyT">Dirección de Posgrado FCyT (UMSS)</option>
                    <option value="EUPG">EUPG (UMSS)</option>
                    <option value="Univ. públicas nacionales">Universidades Públicas Nacionales</option>
                    <option value="Univ. privadas nacionales">Universidades Privadas Nacionales</option>
                    <option value="Univ. internacionales">Universidades Internacionales</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Fuente de Financiamiento (Tabla 3)</label>
                  <select
                    value={formData.financiamiento}
                    onChange={(e) => setFormData({ ...formData, financiamiento: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Recursos propios">Recursos propios (Autofinanciamiento)</option>
                    <option value="Beca parcial">Beca parcial</option>
                    <option value="Beca total">Beca total</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="font-semibold text-slate-700 block mb-1">¿Tiene interés en cursar un nuevo posgrado?</label>
              <select
                value={formData.interes_posgrado}
                onChange={(e) => setFormData({ ...formData, interes_posgrado: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            {formData.interes_posgrado === 'Sí' && (
              <>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Área Tecnológica de Interés (Figura 5)</label>
                  <select
                    value={formData.area_interes}
                    onChange={(e) => setFormData({ ...formData, area_interes: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900 font-semibold text-indigo-900"
                  >
                    <option value="IA">Inteligencia Artificial (IA)</option>
                    <option value="Ingeniería de Software">Ingeniería de Software</option>
                    <option value="Redes de Datos y Seguridad">Redes de Datos y Seguridad</option>
                    <option value="Base de Datos">Base de Datos</option>
                    <option value="Robótica">Robótica</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Institución Preferida (Figura 6)</label>
                  <select
                    value={formData.institucion_preferida}
                    onChange={(e) => setFormData({ ...formData, institucion_preferida: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Posgrado FCyT">Dirección de Posgrado FCyT (UMSS)</option>
                    <option value="Univ. internacionales">Universidades Internacionales</option>
                    <option value="Univ. públicas nacionales">Universidades Públicas Nacionales</option>
                    <option value="EUPG">EUPG (UMSS)</option>
                    <option value="Univ. privadas nacionales">Universidades Privadas Nacionales</option>
                    <option value="IBNORCA">IBNORCA</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sección 3: Situación Laboral e Inserción */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Briefcase className="w-4 h-4 text-sky-800" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              3. Situación Ocupacional & Mercado Laboral
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Situación Laboral Actual</label>
              <select
                value={formData.situacion_laboral}
                onChange={(e) => setFormData({ ...formData, situacion_laboral: e.target.value as any })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
              >
                <option value="Trabaja en una organización">Trabaja en una organización</option>
                <option value="Emprendimiento propio">Emprendimiento propio / Empresa</option>
                <option value="No trabaja">No trabaja actualmente</option>
              </select>
            </div>

            {formData.situacion_laboral !== 'No trabaja' && (
              <>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sector Institucional</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Sector privado">Sector privado</option>
                    <option value="Sector público">Sector público</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Rubro de la Empresa</label>
                  <select
                    value={formData.rubro}
                    onChange={(e) => setFormData({ ...formData, rubro: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Desarrollo de Software">Desarrollo de Software</option>
                    <option value="Telecomunicaciones">Telecomunicaciones</option>
                    <option value="Banca">Banca y Servicios Financieros</option>
                    <option value="Redes de Computadoras">Redes de Computadoras</option>
                    <option value="Educación">Educación</option>
                    <option value="Salud">Salud</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cargo Desempeñado</label>
                  <select
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Desarrollo">Desarrollo (Frontend, Backend, Fullstack)</option>
                    <option value="Ejecutivo / Gerencial">Ejecutivo / Gerencial / Dirección</option>
                    <option value="Técnico">Técnico (Redes, BD, Soporte especializado)</option>
                    <option value="Soporte / Help desk">Soporte / Help desk</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Remuneración Mensual Líquida</label>
                  <select
                    value={formData.remuneracion}
                    onChange={(e) => setFormData({ ...formData, remuneracion: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900 font-mono"
                  >
                    <option value="< 2 500">&lt; 2 500 Bs</option>
                    <option value="2 500 - 3 500">2 500 - 3 500 Bs</option>
                    <option value="3 501 - 5 000">3 501 - 5 000 Bs</option>
                    <option value="5 001 - 7 000">5 001 - 7 000 Bs</option>
                    <option value="7 001 - 10 000">7 001 - 10 000 Bs</option>
                    <option value="> 10 000">&gt; 10 000 Bs</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tiempo para Conseguir Primer Empleo</label>
                  <select
                    value={formData.tiempo_primer_empleo}
                    onChange={(e) => setFormData({ ...formData, tiempo_primer_empleo: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-900"
                  >
                    <option value="Ya trabajaba antes de titularse">Ya trabajaba antes de titularse</option>
                    <option value="Menos de 1 mes">Menos de 1 mes</option>
                    <option value="Entre 1 - 4 meses">Entre 1 - 4 meses</option>
                    <option value="Entre 4 - 8 meses">Entre 4 - 8 meses</option>
                    <option value="Entre 8 - 12 meses">Entre 8 - 12 meses</option>
                    <option value="Más de 12 meses">Más de 12 meses</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sección 4: Valoración Likert de la Formación (HU4, Tabla 7) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sliders className="w-4 h-4 text-sky-800" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              4. Valoración de la Formación Recibida (Escala Likert 1 a 4)
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            {[
              {
                id: 'satisfaccion_global',
                label: 'Satisfacción global con la formación recibida en la UMSS',
                value: formData.satisfaccion_global
              },
              {
                id: 'concordancia_formacion',
                label: 'Concordancia entre la formación universitaria y las exigencias laborales reales',
                value: formData.concordancia_formacion
              },
              {
                id: 'pertinencia_labores',
                label: 'Mis labores actuales son plenamente pertinentes a mi perfil de Ingeniero de Sistemas',
                value: formData.pertinencia_labores
              },
              {
                id: 'opinion_posgrado_fcyt',
                label: 'Existen programas de posgrado afines y pertinentes en la Dirección de Posgrado FCyT',
                value: formData.opinion_posgrado_fcyt
              }
            ].map((likertItem) => (
              <div key={likertItem.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-semibold text-slate-800 block">{likertItem.label}</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 1, label: '1. Totalmente desacuerdo' },
                    { val: 2, label: '2. En desacuerdo' },
                    { val: 3, label: '3. De acuerdo' },
                    { val: 4, label: '4. Totalmente de acuerdo' }
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.val}
                      onClick={() => setFormData({ ...formData, [likertItem.id]: opt.val })}
                      className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all text-[11px] ${
                        likertItem.value === opt.val
                          ? 'bg-sky-900 text-white font-bold shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección 5: Asignaturas con Ventaja y Baja Utilidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
              Asignaturas que le brindaron ventaja competitiva:
            </span>
            <div className="space-y-1.5 text-xs">
              {availableVentajas.map((mat) => {
                const checked = formData.asignaturas_ventaja.includes(mat);
                return (
                  <label key={mat} className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleVentaja(mat)}
                      className="rounded text-sky-900 focus:ring-sky-500"
                    />
                    <span className={checked ? 'font-semibold text-slate-900' : 'text-slate-600'}>{mat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
              Asignaturas de poca o nula utilidad en su trabajo:
            </span>
            <div className="space-y-1.5 text-xs">
              {availableNoUtiles.map((mat) => {
                const checked = formData.asignaturas_no_utiles.includes(mat);
                return (
                  <label key={mat} className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleNoUtil(mat)}
                      className="rounded text-rose-700 focus:ring-rose-500"
                    />
                    <span className={checked ? 'font-semibold text-rose-950' : 'text-slate-600'}>{mat}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Botón de Envío con sombreado tactile */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-3.5 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-900/25 border border-sky-800 hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Guardar e Interpretar Encuesta de Titulado</span>
          </button>
        </div>
      </form>
    </div>
  );
};
