import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  BarChart3, 
  Cpu, 
  Database, 
  FileText,
  Printer,
  ChevronRight,
  Sparkles,
  Building2,
  UserCheck,
  X
} from 'lucide-react';
import { INFO_INSTITUCIONAL } from '../data/strategicPlan';

interface NavItem {
  id: string;
  label: string;
  desc: string;
  icon: any;
  badge?: string;
  count?: string;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReport: () => void;
  tituladosCount: number;
  empleadoresCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReport,
  tituladosCount,
  empleadoresCount,
  isOpenMobile,
  onCloseMobile
}) => {
  // Grupos organizados con iconos representativos
  const navSections: NavSection[] = [
    {
      group: 'DIAGNÓSTICO ARCU-SUR',
      items: [
        {
          id: 'overview',
          label: 'Resumen & ARCU-SUR',
          desc: 'KPIs, justificación y flujo',
          icon: Compass
        },
        {
          id: 'estrategia',
          label: 'Plan Estratégico',
          desc: 'Matriz de 10 hallazgos y FODA',
          icon: FileText
        }
      ]
    },
    {
      group: 'ESTUDIO DE MERCADO',
      items: [
        {
          id: 'titulados',
          label: 'Perfil & Posgrados',
          desc: 'HU1: Antigüedad · HU2: Demanda',
          icon: GraduationCap
        },
        {
          id: 'mercado',
          label: 'Mercado & Empleadores',
          desc: 'Inserción laboral y 51 empresas',
          icon: Briefcase
        },
        {
          id: 'curriculo',
          label: 'Plan de Estudios & Likert',
          desc: 'HU4: Materias y 18 afirmaciones',
          icon: Layers
        }
      ]
    },
    {
      group: 'SIMULACIÓN & ESTADÍSTICA',
      items: [
        {
          id: 'simulacion',
          label: 'Simulador Coss Bu',
          desc: 'Escenarios A, B, C y validación',
          icon: Cpu,
          badge: 'Coss Bu'
        },
        {
          id: 'estadistica',
          label: 'Pruebas Chi-cuadrado',
          desc: 'HU3: Independencia y calculadora',
          icon: BarChart3,
          badge: 'χ²'
        }
      ]
    },
    {
      group: 'LLENAR ENCUESTAS (MANUAL)',
      items: [
        {
          id: 'encuesta_titulados',
          label: 'Encuesta: Titulados',
          desc: 'Registro individual de egresado',
          icon: UserCheck,
          badge: 'MS Forms'
        },
        {
          id: 'encuesta_empleadores',
          label: 'Encuesta: Empleadores',
          desc: '18 afirmaciones institucionales',
          icon: Building2,
          badge: 'Google Forms'
        }
      ]
    },
    {
      group: 'BASE DE DATOS & ARCHIVOS',
      items: [
        {
          id: 'encuestas',
          label: 'Explorador & Cargar CSV',
          desc: 'Importar archivos y ver microdatos',
          icon: Database,
          count: `${tituladosCount}+${empleadoresCount}`
        }
      ]
    }
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Backdrop overlay for mobile drawer */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-900 text-white flex flex-col items-center justify-center font-bold tracking-tight shadow-xs">
              <span className="text-[11px] leading-none">UMSS</span>
              <span className="text-[8px] font-mono text-sky-200 leading-none mt-0.5">FCyT</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
                Ingeniería de Sistemas
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Observatorio & Simulador
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list (Vertical, zero horizontal scrollbar) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-600">
                {sec.group}
              </div>

              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-sky-900 text-white shadow-xs font-semibold'
                          : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-xs truncate font-medium">
                            {item.label}
                          </div>
                          <div
                            className={`text-[10px] truncate ${
                              isActive ? 'text-sky-200' : 'text-slate-600'
                            }`}
                          >
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {item.count && (
                        <span
                          className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer with primary action & institutional info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
          <button
            onClick={() => {
              onOpenReport();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 rounded-xl transition-all shadow-md shadow-sky-900/25 border border-sky-800 active:scale-98 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Generar Informe Oficial PDF</span>
          </button>

          <div className="px-2 text-[10px] text-slate-600 flex items-center justify-between">
            <span>{INFO_INSTITUCIONAL.grupo} · Simulación</span>
            <span>{INFO_INSTITUCIONAL.fecha}</span>
          </div>
        </div>
      </aside>
    </>
  );
};
