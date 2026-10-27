import React from 'react';
import { 
  Menu, 
  Printer, 
  Compass, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  BarChart3, 
  Cpu, 
  Database, 
  FileText
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onOpenReport: () => void;
  tituladosCount: number;
  empleadoresCount: number;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenReport,
  tituladosCount,
  empleadoresCount,
  onToggleMobileMenu
}) => {
  const tabTitles: { [key: string]: { title: string; subtitle: string; icon: any } } = {
    overview: {
      title: 'Resumen Ejecutivo & ARCU-SUR',
      subtitle: 'Diagnóstico institucional de pertinencia y seguimiento',
      icon: Compass
    },
    titulados: {
      title: 'Perfil de Titulados & Demanda de Posgrado',
      subtitle: 'Historia de Usuario 1 (Antigüedad) e Historia de Usuario 2 (Posgrados)',
      icon: GraduationCap
    },
    mercado: {
      title: 'Oferta Laboral & Perfil de Empleadores',
      subtitle: 'Inserción, empresas de software, salarios y habilidades demandadas',
      icon: Briefcase
    },
    curriculo: {
      title: 'Valoración del Plan de Estudios & Escala Likert',
      subtitle: 'Historia de Usuario 4: materias clave y las 18 afirmaciones evaluadas',
      icon: Layers
    },
    estadistica: {
      title: 'Pruebas Chi-cuadrado de Independencia',
      subtitle: 'Historia de Usuario 3: análisis inferencial, V de Cramér y calculadora',
      icon: BarChart3
    },
    simulacion: {
      title: 'Motor de Simulación Estocástica (Coss Bu)',
      subtitle: 'Generador congruencial mixto y experimentación de Escenarios A, B y C',
      icon: Cpu
    },
    encuestas: {
      title: 'Explorador de Datos & Carga de Archivos',
      subtitle: 'Importación de encuestas CSV/Excel, microdatos y diccionario',
      icon: Database
    },
    encuesta_titulados: {
      title: 'Llenar Encuesta: Titulados de Sistemas',
      subtitle: 'Formulario oficial de relevamiento individual (Microsoft Forms)',
      icon: GraduationCap
    },
    encuesta_empleadores: {
      title: 'Llenar Encuesta: Empresas Empleadoras',
      subtitle: 'Formulario oficial con las 18 afirmaciones institucionales (Google Forms)',
      icon: Briefcase
    },
    estrategia: {
      title: 'Diagnóstico, Matriz ARCU-SUR & Plan de Acción',
      subtitle: 'Capítulo 5 y 6: Tabla 11 de hallazgos, FODA y propuestas de acreditación',
      icon: FileText
    }
  };

  const current = tabTitles[activeTab] || tabTitles.overview;
  const Icon = current.icon;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Contextual Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden shrink-0"
            aria-label="Abrir menú lateral"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-900 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 font-medium truncate hidden sm:block">
                UMSS Sistemas · Acreditación ARCU-SUR
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate tracking-tight">
                {current.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Right: Quick metric indicators and PDF export action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              <span className="font-mono font-bold text-slate-900">{tituladosCount}</span> Titulados
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              <span className="font-mono font-bold text-slate-900">{empleadoresCount}</span> Empleadores
            </span>
          </div>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-95 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Informe Oficial PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
