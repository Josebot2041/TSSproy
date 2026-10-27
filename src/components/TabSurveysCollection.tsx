import React, { useState } from 'react';
import { Titulado, Empleador } from '../types';
import { DICCIONARIO_TITULADOS, DICCIONARIO_EMPLEADORES } from '../data/dictionary';
import { AFIRMACIONES_EMPLEADORES } from '../data/strategicPlan';
import { parseTituladosCSV, parseEmpleadoresCSV } from '../utils/csvParser';
import { 
  Database, 
  FileSpreadsheet, 
  PlusCircle, 
  Search, 
  Download, 
  Upload,
  CheckCircle,
  FileCheck,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface TabSurveysCollectionProps {
  titulados: Titulado[];
  empleadores: Empleador[];
  onAddTitulado: (titulado: Titulado) => void;
  onAddEmpleador: (empleador: Empleador) => void;
  onSetTitulados: (titulados: Titulado[]) => void;
  onSetEmpleadores: (empleadores: Empleador[]) => void;
  onResetToOfficial: () => void;
}

export const TabSurveysCollection: React.FC<TabSurveysCollectionProps> = ({
  titulados,
  empleadores,
  onAddTitulado,
  onAddEmpleador,
  onSetTitulados,
  onSetEmpleadores,
  onResetToOfficial
}) => {
  const [subTab, setSubTab] = useState<'explorador' | 'importar' | 'form_titulado' | 'form_empleador' | 'diccionario' | 'wrangling'>('importar');
  const [activeDataSet, setActiveDataSet] = useState<'titulados' | 'empleadores'>('titulados');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('Todos');

  // Estados de Importación de Archivos
  const [importNotice, setImportNotice] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isLoadingRealFiles, setIsLoadingRealFiles] = useState(false);
  const [lastImportedStats, setLastImportedStats] = useState<{ titulados?: number; empleadores?: number } | null>(null);

  // Form State Titulado
  const [formTitulado, setFormTitulado] = useState<Partial<Titulado>>({
    edad: '27 - 30 años',
    genero: 'Masculino',
    anios_vida_profesional: 4,
    anios_desempleado: 0,
    formacion_complementaria: 'Sí',
    nivel_realizado: 'Diplomado',
    financiamiento: 'Recursos propios',
    interes_posgrado: 'Sí',
    area_interes: 'IA',
    institucion_preferida: 'Posgrado FCyT',
    situacion_laboral: 'Trabaja en una organización',
    sector: 'Sector privado',
    rubro: 'Desarrollo de Software',
    cargo: 'Desarrollo',
    remuneracion: '7 001 - 10 000',
    tiempo_primer_empleo: 'Ya trabajaba antes de titularse',
    satisfaccion_global: 3,
    concordancia_formacion: 3,
    pertinencia_labores: 4,
    opinion_posgrado_fcyt: 3
  });
  const [tituladoSubmitted, setTituladoSubmitted] = useState(false);

  // Form State Empleador
  const [formEmpleador, setFormEmpleador] = useState<Partial<Empleador>>({
    organizacion: '',
    tipo: 'Sector privado',
    tamano: 'Mediana empresa (51-200)',
    rubro: 'Desarrollo de software',
    contrato_5_anios: 'Sí',
    posibilidad_contratacion: 'Alta probabilidad',
    nivel_demandado: 'Licenciatura',
    tendencias_texto: 'Inteligencia Artificial y Desarrollo Web',
    habilidades_texto: 'Trabajo en equipo y adaptabilidad',
    items_likert: {}
  });
  const [empleadorSubmitted, setEmpleadorSubmitted] = useState(false);

  // Manejo de carga de archivo Titulados desde el explorador del usuario
  const handleFileUploadTitulados = (e: React.ChangeEvent<HTMLInputElement>, mode: 'replace' | 'append') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const { data, errors } = parseTituladosCSV(text);
      if (data.length === 0) {
        setImportNotice({
          message: `Error al procesar el archivo: ${errors.join(', ') || 'No se reconocieron filas válidas'}`,
          type: 'error'
        });
        return;
      }

      if (mode === 'replace') {
        onSetTitulados(data);
        setImportNotice({
          message: `Se reemplazó la base con ${data.length} titulados del archivo "${file.name}".`,
          type: 'success'
        });
      } else {
        onSetTitulados([...data, ...titulados]);
        setImportNotice({
          message: `Se agregaron ${data.length} nuevos titulados a la base existente. Total: ${titulados.length + data.length}`,
          type: 'success'
        });
      }
      setLastImportedStats((prev) => ({ ...prev, titulados: data.length }));
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Manejo de carga de archivo Empleadores desde el explorador del usuario
  const handleFileUploadEmpleadores = (e: React.ChangeEvent<HTMLInputElement>, mode: 'replace' | 'append') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const { data, errors } = parseEmpleadoresCSV(text);
      if (data.length === 0) {
        setImportNotice({
          message: `Error al procesar empleadores: ${errors.join(', ') || 'No se reconocieron filas válidas'}`,
          type: 'error'
        });
        return;
      }

      if (mode === 'replace') {
        onSetEmpleadores(data);
        setImportNotice({
          message: `Se reemplazó la base con ${data.length} empleadores del archivo "${file.name}".`,
          type: 'success'
        });
      } else {
        onSetEmpleadores([...data, ...empleadores]);
        setImportNotice({
          message: `Se agregaron ${data.length} nuevos empleadores a la base existente. Total: ${empleadores.length + data.length}`,
          type: 'success'
        });
      }
      setLastImportedStats((prev) => ({ ...prev, empleadores: data.length }));
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Cargar directamente los 2 archivos CSV adjuntos en el proyecto
  const handleLoadAttachedFiles = async () => {
    setIsLoadingRealFiles(true);
    setImportNotice(null);

    try {
      // 1. Cargar Titulados
      const resTitulados = await fetch('/assets/aistudio/Reporte_Titulados_ARCUSUR_2026-10-17__1__4eeae5ed.csv');
      let titCount = 0;
      if (resTitulados.ok) {
        const textTitulados = await resTitulados.text();
        const { data: parsedTitulados } = parseTituladosCSV(textTitulados);
        if (parsedTitulados.length > 0) {
          onSetTitulados(parsedTitulados);
          titCount = parsedTitulados.length;
        }
      }

      // 2. Cargar Empleadores
      const resEmpleadores = await fetch('/assets/aistudio/Reporte_Empleadores_ARCUSUR_2026-10-17__1__17926206.csv');
      let empCount = 0;
      if (resEmpleadores.ok) {
        const textEmpleadores = await resEmpleadores.text();
        const { data: parsedEmpleadores } = parseEmpleadoresCSV(textEmpleadores);
        if (parsedEmpleadores.length > 0) {
          onSetEmpleadores(parsedEmpleadores);
          empCount = parsedEmpleadores.length;
        }
      }

      setLastImportedStats({ titulados: titCount, empleadores: empCount });
      setImportNotice({
        message: `¡Archivos cargados con éxito! Se sincronizaron ${titCount} titulados y ${empCount} empleadores. Todos los gráficos, estadísticas y simulaciones se recalcularon en tiempo real.`,
        type: 'success'
      });
    } catch (err: any) {
      setImportNotice({
        message: `Error al leer los archivos adjuntos: ${err?.message || 'Error de red'}`,
        type: 'error'
      });
    } finally {
      setIsLoadingRealFiles(false);
    }
  };

  // Exportar a CSV
  const handleExportCSV = () => {
    if (activeDataSet === 'titulados') {
      const headers = ['ID', 'Edad', 'Genero', 'Anios_Exp', 'Segmento', 'Situacion', 'Sector', 'Rubro', 'Salario', 'Interes_Posgrado', 'Area_Interes', 'Satisfaccion'];
      const rows = titulados.map((t) => [
        t.id,
        t.edad,
        t.genero,
        t.anios_vida_profesional,
        t.segmento,
        t.situacion_laboral,
        t.sector || '',
        t.rubro || '',
        t.remuneracion || '',
        t.interes_posgrado,
        t.area_interes || '',
        t.satisfaccion_global
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Base_Limpia_Titulados_UMSS.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ['ID', 'Organizacion', 'Tipo', 'Tamano', 'Rubro', 'Contrato_5_Anios', 'Posibilidad_Contratar', 'Nivel_Demandado'];
      const rows = empleadores.map((e) => [
        e.id,
        `"${e.organizacion}"`,
        e.tipo,
        `"${e.tamano}"`,
        `"${e.rubro}"`,
        e.contrato_5_anios,
        `"${e.posibilidad_contratacion}"`,
        e.nivel_demandado
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Base_Limpia_Empleadores_UMSS.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Submit Titulado manual
  const handleSubmitTitulado = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TIT-${String(titulados.length + 1).padStart(3, '0')}`;
    const exp = Number(formTitulado.anios_vida_profesional) || 1;
    const newEntry: Titulado = {
      id: newId,
      edad: formTitulado.edad as any,
      genero: formTitulado.genero as any,
      anios_vida_profesional: exp,
      anios_desempleado: Number(formTitulado.anios_desempleado) || 0,
      segmento: exp < 5 ? 'Junior (< 5 años)' : 'Consolidado (≥ 5 años)',
      formacion_complementaria: formTitulado.formacion_complementaria as any,
      nivel_realizado: formTitulado.nivel_realizado as any,
      financiamiento: formTitulado.financiamiento as any,
      interes_posgrado: formTitulado.interes_posgrado as any,
      area_interes: formTitulado.area_interes as any,
      institucion_preferida: formTitulado.institucion_preferida as any,
      situacion_laboral: formTitulado.situacion_laboral as any,
      sector: formTitulado.sector as any,
      rubro: formTitulado.rubro as any,
      cargo: formTitulado.cargo as any,
      remuneracion: formTitulado.remuneracion as any,
      tiempo_primer_empleo: formTitulado.tiempo_primer_empleo as any,
      satisfaccion_global: formTitulado.satisfaccion_global as any,
      concordancia_formacion: formTitulado.concordancia_formacion as any,
      pertinencia_labores: formTitulado.pertinencia_labores as any,
      opinion_posgrado_fcyt: formTitulado.opinion_posgrado_fcyt as any,
      actividades: ['Desarrollo de software'],
      aspectos_utiles: ['Habilidades analíticas'],
      aspectos_mejorar: ['Actualización curricular'],
      asignaturas_ventaja: ['Base de Datos'],
      asignaturas_no_utiles: ['TV Digital']
    };
    onAddTitulado(newEntry);
    setTituladoSubmitted(true);
    setTimeout(() => setTituladoSubmitted(false), 3000);
  };

  // Submit Empleador manual
  const handleSubmitEmpleador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmpleador.organizacion) return;
    const newId = `EMP-${String(empleadores.length + 1).padStart(3, '0')}`;
    const newEntry: Empleador = {
      id: newId,
      organizacion: formEmpleador.organizacion,
      tipo: formEmpleador.tipo as any,
      tamano: formEmpleador.tamano as any,
      rubro: formEmpleador.rubro as any,
      contrato_5_anios: formEmpleador.contrato_5_anios as any,
      posibilidad_contratacion: formEmpleador.posibilidad_contratacion as any,
      nivel_demandado: formEmpleador.nivel_demandado as any,
      medio_convocatoria: 'Convocatorias públicas y redes sociales',
      cargos: ['Analista de sistemas', 'Desarrollador'],
      tendencias_texto: formEmpleador.tendencias_texto || 'Inteligencia Artificial',
      habilidades_texto: formEmpleador.habilidades_texto || 'Trabajo en equipo',
      items_likert: formEmpleador.items_likert || {}
    };
    onAddEmpleador(newEntry);
    setEmpleadorSubmitted(true);
    setFormEmpleador({ ...formEmpleador, organizacion: '' });
    setTimeout(() => setEmpleadorSubmitted(false), 3000);
  };

  // Filtrado de titulados para la tabla
  const filteredTitulados = titulados.filter((t) => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.rubro && t.rubro.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.cargo && t.cargo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = filterSector === 'Todos' || t.sector === filterSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-8">
      {/* Sub-navegación contextual */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Carga de Archivos, Recolección & Base de Datos (Anexo C)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Importa y procesa tus archivos CSV/Excel de encuestas con interpretación y recálculo automático instantáneo
          </p>
        </div>

        {/* Sub-navegación con botones sombreados */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setSubTab('importar')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
              subTab === 'importar'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Cargar Archivos CSV/Excel</span>
          </button>
          <button
            onClick={() => setSubTab('explorador')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
              subTab === 'explorador'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Explorador ({titulados.length} tit / {empleadores.length} emp)</span>
          </button>
          <button
            onClick={() => setSubTab('form_titulado')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
              subTab === 'form_titulado'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Encuesta Titulado</span>
          </button>
          <button
            onClick={() => setSubTab('form_empleador')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
              subTab === 'form_empleador'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Encuesta Empleador</span>
          </button>
          <button
            onClick={() => setSubTab('diccionario')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
              subTab === 'diccionario'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Diccionario</span>
          </button>
          <button
            onClick={() => setSubTab('wrangling')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
              subTab === 'wrangling'
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/25 border border-sky-800'
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs hover:shadow'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Reglas Limpieza</span>
          </button>
        </div>
      </div>

      {/* NOTIFICACIÓN DE ESTADO DE IMPORTACIÓN */}
      {importNotice && (
        <div className={`p-4 rounded-xl text-xs font-medium border flex items-center justify-between gap-3 ${
          importNotice.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
          importNotice.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-sky-50 border-sky-200 text-sky-950'
        }`}>
          <div className="flex items-center gap-2">
            {importNotice.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{importNotice.message}</span>
          </div>
          <button onClick={() => setImportNotice(null)} className="text-slate-500 hover:text-slate-800 text-xs">✕</button>
        </div>
      )}

      {/* SUBTAB IMPORTAR ARCHIVOS CSV / EXCEL */}
      {subTab === 'importar' && (
        <div className="space-y-6">
          {/* Banner de Carga Rápida de Archivos Adjuntos */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-sky-800" />
                <h3 className="text-sm font-bold text-slate-900">
                  Carga Rápida de las Encuestas Reales Adjuntas
                </h3>
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                El sistema detectó los archivos oficiales en el proyecto: <code className="text-slate-800 font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">Reporte_Titulados_ARCUSUR_...csv</code> y <code className="text-slate-800 font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">Reporte_Empleadores_ARCUSUR_...csv</code>. Puedes cargarlos e interpretarlos de inmediato con un solo clic.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleLoadAttachedFiles}
                disabled={isLoadingRealFiles}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isLoadingRealFiles ? 'Procesando archivos...' : 'Interpretar Archivos Adjuntos'}</span>
              </button>
              <button
                onClick={onResetToOfficial}
                title="Restablecer base consolidada de 148 titulados y 51 empleadores"
                className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Base Oficial (Informe)</span>
              </button>
            </div>
          </div>

          {/* Carga Manual de Archivos del Usuario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Cargar Titulados */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="w-4 h-4 text-sky-800" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Cargar Archivo de Titulados (.csv / .xlsx)
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Exportación de Microsoft Forms o Excel con columnas: <code className="text-[11px]">edad, genero, formacionComplementaria, nivelPosgrado, situacionLaboral, aniosVidaProfesional...</code>
                </p>

                <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <label className="text-xs font-semibold text-sky-900 hover:underline cursor-pointer block">
                    Seleccionar archivo de Titulados
                    <input
                      type="file"
                      accept=".csv, .txt, text/csv"
                      className="hidden"
                      onChange={(e) => handleFileUploadTitulados(e, 'replace')}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 block mt-1">Formato CSV delimitado por punto y coma (;) o comas (,)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Registros actuales en memoria:</span>
                <span className="font-mono font-bold text-slate-900">{titulados.length}</span>
              </div>
            </div>

            {/* Box 2: Cargar Empleadores */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-700" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Cargar Archivo de Empleadores (.csv / .xlsx)
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Exportación de Google Forms con columnas: <code className="text-[11px]">nombreEmpresa, tipoOrganizacion, tamano, rubroSector, haContratado5Anios, items Likert...</code>
                </p>

                <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <label className="text-xs font-semibold text-indigo-900 hover:underline cursor-pointer block">
                    Seleccionar archivo de Empleadores
                    <input
                      type="file"
                      accept=".csv, .txt, text/csv"
                      className="hidden"
                      onChange={(e) => handleFileUploadEmpleadores(e, 'replace')}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 block mt-1">Formato CSV delimitado por punto y coma (;) o comas (,)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Registros actuales en memoria:</span>
                <span className="font-mono font-bold text-slate-900">{empleadores.length}</span>
              </div>
            </div>
          </div>

          {/* Explicación de Interpretación Automática */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 leading-relaxed space-y-2">
            <span className="font-bold text-slate-900 block">¿Cómo interpreta el sistema los datos cargados?</span>
            <p>
              1. <strong>Normalización automática</strong>: Convierte automáticamente cadenas como <code className="bg-white px-1 py-0.5 rounded border border-slate-200">"Hombre" / "Mujer"</code> a género estandarizado, interpreta las edades, traduce <code className="bg-white px-1 py-0.5 rounded border border-slate-200">"true" / "false"</code> a opciones categóricas, y divide las listas separadas por punto y coma (<code className="bg-white px-1 py-0.5 rounded border border-slate-200">";"</code>) como las asignaturas y habilidades.
            </p>
            <p>
              2. <strong>Recálculo estadístico en vivo</strong>: Al cargar nuevos archivos, las pruebas de independencia Chi-cuadrado ($\chi^2$), las medias de antigüedad, los gráficos de demanda de posgrados y los escenarios de simulación estocástica de Coss Bu se actualizan automáticamente en tiempo real.
            </p>
          </div>
        </div>
      )}

      {/* EXPLORADOR DE DATOS */}
      {subTab === 'explorador' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDataSet('titulados')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  activeDataSet === 'titulados'
                    ? 'bg-sky-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Titulados ({titulados.length} registros)
              </button>
              <button
                onClick={() => setActiveDataSet('empleadores')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  activeDataSet === 'empleadores'
                    ? 'bg-sky-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Empleadores ({empleadores.length} registros)
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar en la base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500 w-44 sm:w-56"
                />
              </div>

              {activeDataSet === 'titulados' && (
                <select
                  value={filterSector}
                  onChange={(e) => setFilterSector(e.target.value)}
                  className="text-xs border border-slate-200 rounded-md px-2.5 py-1.5 bg-slate-50 text-slate-700"
                >
                  <option value="Todos">Todos los sectores</option>
                  <option value="Sector privado">Sector privado</option>
                  <option value="Sector público">Sector público</option>
                </select>
              )}

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          {/* Tabla de Titulados */}
          {activeDataSet === 'titulados' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">ID</th>
                    <th className="p-2.5">Edad</th>
                    <th className="p-2.5">Género</th>
                    <th className="p-2.5 text-right">Experiencia</th>
                    <th className="p-2.5">Segmento</th>
                    <th className="p-2.5">Situación Laboral</th>
                    <th className="p-2.5">Sector</th>
                    <th className="p-2.5">Rubro</th>
                    <th className="p-2.5">Salario</th>
                    <th className="p-2.5">Posgrado Interés</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredTitulados.slice(0, 50).map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-sky-950 font-sans">{t.id}</td>
                      <td className="p-2.5 font-sans">{t.edad}</td>
                      <td className="p-2.5 font-sans">{t.genero}</td>
                      <td className="p-2.5 text-right">{t.anios_vida_profesional} a.</td>
                      <td className="p-2.5 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${t.segmento.includes('Junior') ? 'bg-sky-50 text-sky-800' : 'bg-slate-100 text-slate-800'}`}>
                          {t.segmento}
                        </span>
                      </td>
                      <td className="p-2.5 font-sans truncate max-w-xs">{t.situacion_laboral}</td>
                      <td className="p-2.5 font-sans">{t.sector || '-'}</td>
                      <td className="p-2.5 font-sans">{t.rubro || '-'}</td>
                      <td className="p-2.5 font-sans">{t.remuneracion || '-'}</td>
                      <td className="p-2.5 font-sans font-semibold text-indigo-900">{t.area_interes || 'Sin interés'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2.5 text-[11px] text-slate-500 text-right border-t border-slate-100">
                Mostrando primeros 50 de {filteredTitulados.length} registros
              </div>
            </div>
          )}

          {/* Tabla de Empleadores */}
          {activeDataSet === 'empleadores' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">ID</th>
                    <th className="p-2.5">Organización / Empresa</th>
                    <th className="p-2.5">Tipo</th>
                    <th className="p-2.5">Tamaño</th>
                    <th className="p-2.5">Rubro Principal</th>
                    <th className="p-2.5 text-center">Contrató 5a</th>
                    <th className="p-2.5">Posibilidad Contratación</th>
                    <th className="p-2.5">Nivel Exigido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {empleadores.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-sky-950">{e.id}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{e.organizacion}</td>
                      <td className="p-2.5">{e.tipo}</td>
                      <td className="p-2.5">{e.tamano}</td>
                      <td className="p-2.5 truncate max-w-xs">{e.rubro}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-slate-700">{e.contrato_5_anios}</td>
                      <td className="p-2.5">{e.posibilidad_contratacion}</td>
                      <td className="p-2.5 font-medium text-sky-900">{e.nivel_demandado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* FORMULARIO OFICIAL TITULADOS (Microsoft Forms) */}
      {subTab === 'form_titulado' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Formulario Oficial de Titulados de Ingeniería de Sistemas (UMSS)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Registro para la encuesta institucional de seguimiento y autoevaluación ARCU-SUR
            </p>
          </div>

          {tituladoSubmitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>¡Respuesta registrada exitosamente! Se incorporó a la base limpia y se recalculó la estadística.</span>
            </div>
          )}

          <form onSubmit={handleSubmitTitulado} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rango de Edad</label>
                <select
                  value={formTitulado.edad}
                  onChange={(e) => setFormTitulado({ ...formTitulado, edad: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
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
                  value={formTitulado.genero}
                  onChange={(e) => setFormTitulado({ ...formTitulado, genero: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Años de Vida Profesional</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="40"
                  value={formTitulado.anios_vida_profesional}
                  onChange={(e) => setFormTitulado({ ...formTitulado, anios_vida_profesional: Number(e.target.value) })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Años sin Empleo Acumulados</label>
                <input
                  type="number"
                  step="0.25"
                  min="0"
                  max="10"
                  value={formTitulado.anios_desempleado}
                  onChange={(e) => setFormTitulado({ ...formTitulado, anios_desempleado: Number(e.target.value) })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Situación Laboral</label>
                <select
                  value={formTitulado.situacion_laboral}
                  onChange={(e) => setFormTitulado({ ...formTitulado, situacion_laboral: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Trabaja en una organización">Trabaja en una organización</option>
                  <option value="Emprendimiento propio">Emprendimiento propio</option>
                  <option value="No trabaja">No trabaja actualmente</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sector Empleador</label>
                <select
                  value={formTitulado.sector}
                  onChange={(e) => setFormTitulado({ ...formTitulado, sector: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Sector privado">Sector privado</option>
                  <option value="Sector público">Sector público</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rubro de la Empresa</label>
                <select
                  value={formTitulado.rubro}
                  onChange={(e) => setFormTitulado({ ...formTitulado, rubro: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Desarrollo de Software">Desarrollo de Software</option>
                  <option value="Telecomunicaciones">Telecomunicaciones</option>
                  <option value="Banca">Banca y Finanzas</option>
                  <option value="Redes de Computadoras">Redes de Computadoras</option>
                  <option value="Educación">Educación</option>
                  <option value="Salud">Salud</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Remuneración Mensual (Bs)</label>
                <select
                  value={formTitulado.remuneracion}
                  onChange={(e) => setFormTitulado({ ...formTitulado, remuneracion: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
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
                <label className="font-semibold text-slate-700 block mb-1">Área de Posgrado de Interés</label>
                <select
                  value={formTitulado.area_interes}
                  onChange={(e) => setFormTitulado({ ...formTitulado, area_interes: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="IA">Inteligencia Artificial (IA)</option>
                  <option value="Ingeniería de Software">Ingeniería de Software</option>
                  <option value="Redes de Datos y Seguridad">Redes de Datos y Seguridad</option>
                  <option value="Base de Datos">Base de Datos</option>
                  <option value="Robótica">Robótica</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Institución Preferida</label>
                <select
                  value={formTitulado.institucion_preferida}
                  onChange={(e) => setFormTitulado({ ...formTitulado, institucion_preferida: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Posgrado FCyT">Posgrado FCyT (UMSS)</option>
                  <option value="Univ. internacionales">Universidad Internacional</option>
                  <option value="Univ. públicas nacionales">Univ. Públicas Nacionales</option>
                  <option value="EUPG">EUPG (UMSS)</option>
                  <option value="Univ. privadas nacionales">Univ. Privadas Nacionales</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-sky-900 hover:bg-sky-800 rounded-md shadow-xs transition-colors"
              >
                Guardar Respuesta Oficial
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FORMULARIO OFICIAL EMPLEADORES (Google Forms) */}
      {subTab === 'form_empleador' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Formulario de Consulta a Empleadores (Google Forms)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Instrumento oficial respaldado por la carta institucional DIR SIS 143/2026
            </p>
          </div>

          {empleadorSubmitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>¡Organización registrada! La valoración se sincronizó con las matrices de calidad.</span>
            </div>
          )}

          <form onSubmit={handleSubmitEmpleador} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Nombre de la Organización / Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Jalasoft, Banco Unión, Soluciones Digitales SRL..."
                  value={formEmpleador.organizacion}
                  onChange={(e) => setFormEmpleador({ ...formEmpleador, organizacion: e.target.value })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Naturaleza Jurídica</label>
                <select
                  value={formEmpleador.tipo}
                  onChange={(e) => setFormEmpleador({ ...formEmpleador, tipo: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Sector privado">Sector privado</option>
                  <option value="Sector público">Sector público</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tamaño de la Empresa</label>
                <select
                  value={formEmpleador.tamano}
                  onChange={(e) => setFormEmpleador({ ...formEmpleador, tamano: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Micro empresa (1-10)">Micro empresa (1-10 empleados)</option>
                  <option value="Pequeña empresa (11-50)">Pequeña empresa (11-50 empleados)</option>
                  <option value="Mediana empresa (51-200)">Mediana empresa (51-200 empleados)</option>
                  <option value="Gran empresa (>200)">Gran empresa (&gt;200 empleados)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rubro Principal</label>
                <input
                  type="text"
                  value={formEmpleador.rubro}
                  onChange={(e) => setFormEmpleador({ ...formEmpleador, rubro: e.target.value })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nivel Académico Exigido</label>
                <select
                  value={formEmpleador.nivel_demandado}
                  onChange={(e) => setFormEmpleador({ ...formEmpleador, nivel_demandado: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                >
                  <option value="Licenciatura">Licenciatura en Sistemas</option>
                  <option value="Especialidad">Especialidad</option>
                  <option value="Diplomado">Diplomado</option>
                  <option value="Maestría">Maestría</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Tecnologías y Competencias Emergentes Requeridas</label>
                <textarea
                  rows={2}
                  value={formEmpleador.tendencias_texto}
                  onChange={(e) => setFormEmpleador({ ...formEmpleador, tendencias_texto: e.target.value })}
                  placeholder="Inteligencia artificial, agentes, cloud microservicios, seguridad..."
                  className="w-full border border-slate-200 rounded-md p-2 bg-slate-50"
                ></textarea>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-sky-900 hover:bg-sky-800 rounded-md shadow-xs transition-colors"
              >
                Registrar Empleador en la Base
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DICCIONARIO DE VARIABLES (Anexo C) */}
      {subTab === 'diccionario' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Anexo C. Diccionario de Datos Oficial (Base_Limpia_Titulados_Empleadores.xlsx)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Definición estandarizada de variables para interoperabilidad y auditoría ARCU-SUR
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Hoja 1: Titulados de Sistemas (Variables Categóricas, Numéricas y Likert)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Variable</th>
                    <th className="p-2.5">Nombre Descriptivo</th>
                    <th className="p-2.5">Tipo</th>
                    <th className="p-2.5">Descripción y Valores Observados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DICCIONARIO_TITULADOS.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-sky-950">{v.codigo}</td>
                      <td className="p-2.5 font-medium text-slate-900">{v.nombre}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                          {v.tipo}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600 max-w-md">
                        <div>{v.descripcion}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{v.valoresPosibles}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REGLAS DE LIMPIEZA / DATA WRANGLING (Sección 2.4.1) */}
      {subTab === 'wrangling' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            2.4.1 Limpieza de Datos (Data Wrangling Implementado en el Sistema)
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Protocolo de depuración aplicado a las bases brutas de Microsoft Forms y Google Forms
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">1. Normalización de Respuestas Numéricas</span>
              <p className="text-slate-600 leading-relaxed">
                Años de experiencia escritos como texto («2 años», «2 anios», «1.5», «6 meses») se convirtieron a tipo flotante en años (meses divididos entre 12).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">2. Filtrado de Inconsistencias Lógicas</span>
              <p className="text-slate-600 leading-relaxed">
                Se anuló el tiempo de desempleo cuando superaba los años totales de vida profesional, y se descartaron registros sin sentido (por ejemplo, respuestas como «Vjbk»).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">3. Eliminación de Registros de Prueba</span>
              <p className="text-slate-600 leading-relaxed">
                De las 53 respuestas iniciales de empleadores, dos registros de prueba con contenido vacío («lll», «G») fueron depurados, consolidando 51 respuestas válidas.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">4. Tratamiento de Selección Múltiple</span>
              <p className="text-slate-600 leading-relaxed">
                Las respuestas de varias opciones (aspectos útiles, asignaturas, cargos) almacenadas en una sola celda delimitadas por «;» fueron separadas en arrays normalizados.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
