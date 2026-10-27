/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OFFICIAL_TITULADOS, OFFICIAL_EMPLEADORES } from './data/officialData';
import { Titulado, Empleador } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TabOverview } from './components/TabOverview';
import { TabProfileGraduates } from './components/TabProfileGraduates';
import { TabLaborMarket } from './components/TabLaborMarket';
import { TabCurriculumEvaluation } from './components/TabCurriculumEvaluation';
import { TabChiSquareAnalysis } from './components/TabChiSquareAnalysis';
import { TabSimulationEngine } from './components/TabSimulationEngine';
import { TabSurveysCollection } from './components/TabSurveysCollection';
import { TabStrategicPlan } from './components/TabStrategicPlan';
import { FormTituladosSurvey } from './components/FormTituladosSurvey';
import { FormEmpleadoresSurvey } from './components/FormEmpleadoresSurvey';
import { OfficialReportModal } from './components/OfficialReportModal';
import { INFO_INSTITUCIONAL } from './data/strategicPlan';
import {
  loadTituladosFromDb,
  loadEmpleadoresFromDb,
  saveTituladoToDb,
  saveEmpleadorToDb,
  resetDatabaseToDefaults
} from './services/dbService';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [titulados, setTitulados] = useState<Titulado[]>(OFFICIAL_TITULADOS);
  const [empleadores, setEmpleadores] = useState<Empleador[]>(OFFICIAL_EMPLEADORES);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Carga inicial desde la base de datos persistente (Firestore)
  React.useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [dbTitulados, dbEmpleadores] = await Promise.all([
          loadTituladosFromDb(),
          loadEmpleadoresFromDb()
        ]);
        if (isMounted) {
          if (dbTitulados && dbTitulados.length > 0) {
            setTitulados(dbTitulados);
          }
          if (dbEmpleadores && dbEmpleadores.length > 0) {
            setEmpleadores(dbEmpleadores);
          }
        }
      } catch (e) {
        console.warn('Iniciando con datos locales debido a:', e);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddTitulado = (newT: Titulado) => {
    setTitulados((prev) => [newT, ...prev]);
    saveTituladoToDb(newT).catch((err) => console.error('Error guardando titulado:', err));
  };

  const handleAddEmpleador = (newE: Empleador) => {
    setEmpleadores((prev) => [newE, ...prev]);
    saveEmpleadorToDb(newE).catch((err) => console.error('Error guardando empleador:', err));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased selection:bg-sky-100 selection:text-sky-900 flex">
      {/* Sidebar Navigation (Zero horizontal scrollbar) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setReportModalOpen(true)}
        tituladosCount={titulados.length}
        empleadoresCount={empleadores.length}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
        {/* Top Header with Breadcrumbs and Actions */}
        <Header
          activeTab={activeTab}
          onOpenReport={() => setReportModalOpen(true)}
          tituladosCount={titulados.length}
          empleadoresCount={empleadores.length}
          onToggleMobileMenu={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Content Viewport */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'overview' && (
            <TabOverview
              onNavigate={(tab) => setActiveTab(tab)}
              tituladosCount={titulados.length}
              empleadoresCount={empleadores.length}
            />
          )}

          {activeTab === 'titulados' && (
            <TabProfileGraduates titulados={titulados} />
          )}

          {activeTab === 'mercado' && (
            <TabLaborMarket titulados={titulados} empleadores={empleadores} />
          )}

          {activeTab === 'curriculo' && (
            <TabCurriculumEvaluation />
          )}

          {activeTab === 'estadistica' && (
            <TabChiSquareAnalysis />
          )}

          {activeTab === 'simulacion' && (
            <TabSimulationEngine />
          )}

          {activeTab === 'encuestas' && (
            <TabSurveysCollection
              titulados={titulados}
              empleadores={empleadores}
              onAddTitulado={handleAddTitulado}
              onAddEmpleador={handleAddEmpleador}
              onSetTitulados={(newTitulados) => setTitulados(newTitulados)}
              onSetEmpleadores={(newEmpleadores) => setEmpleadores(newEmpleadores)}
              onResetToOfficial={() => {
                setTitulados(OFFICIAL_TITULADOS);
                setEmpleadores(OFFICIAL_EMPLEADORES);
                resetDatabaseToDefaults().catch((e) => console.error(e));
              }}
            />
          )}

          {activeTab === 'encuesta_titulados' && (
            <FormTituladosSurvey
              onAddTitulado={handleAddTitulado}
              onNavigateToAnalytics={() => setActiveTab('titulados')}
              tituladosTotal={titulados.length}
            />
          )}

          {activeTab === 'encuesta_empleadores' && (
            <FormEmpleadoresSurvey
              onAddEmpleador={handleAddEmpleador}
              onNavigateToAnalytics={() => setActiveTab('curriculo')}
              empleadoresTotal={empleadores.length}
            />
          )}

          {activeTab === 'estrategia' && (
            <TabStrategicPlan onOpenReport={() => setReportModalOpen(true)} />
          )}
        </main>

        {/* Quiet Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-semibold text-slate-700">{INFO_INSTITUCIONAL.universidad}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{INFO_INSTITUCIONAL.carrera}</span>
            </div>

            <div className="text-slate-400">
              {INFO_INSTITUCIONAL.materia} · {INFO_INSTITUCIONAL.grupo} · {INFO_INSTITUCIONAL.fecha}
            </div>
          </div>
        </footer>
      </div>

      {/* Modal de Impresión de Informe Oficial */}
      <OfficialReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
}
