import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { usePrediction } from "./modules/prediction/application/usePrediction";
import { PredictionForm } from "./modules/prediction/presentation/components/PredictionForm";
import { PredictionResult } from "./modules/prediction/presentation/components/PredictionResult";
import { GlobalMetrics } from "./modules/prediction/presentation/pages/DashboardPage";
import { BrainCircuit, LayoutDashboard, Settings } from "lucide-react";

function MainApp() {
  const { executePrediction, result, isLoading, reset } = usePrediction();

  // Scroll to top when result changes
  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 selection:bg-slate-200 dark:selection:bg-slate-800">
      
      {/* Navbar Minimalista */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="container mx-auto max-w-5xl flex h-16 items-center px-4 md:px-6">
          <div className="flex gap-2 items-center font-bold text-lg tracking-tight">
            <BrainCircuit className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>IushPredict<span className="text-slate-400 font-light">AI</span></span>
          </div>
          <nav className="ml-auto flex gap-6 text-sm font-medium">
            <a href="#" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400"><LayoutDashboard className="h-4 w-4"/> Inicio</a>
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"><Settings className="h-4 w-4"/> Ajustes</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 md:px-6 py-12">
        
        {/* Encabezado */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Motor de Inferencia de Deserción Escolar</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Ingresa los datos socioeconómicos y académicos del estudiante para analizar su probabilidad de riesgo
            y obtener un reporte del modelo. Basado en Logistic Regression & Random Forest.
          </p>
        </div>

        {/* Sección de Resultados Arriba */}
        {result && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Reporte de Análisis</h2>
              <button onClick={reset} className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 underline decoration-slate-200 underline-offset-4 transition-colors">
                Nueva Consulta
              </button>
            </div>
            <PredictionResult result={result} />
          </div>
        )}

        {/* Formulario Principal */}
        <div className={result ? "opacity-60 grayscale-[30%] pointer-events-none transition-all duration-500" : "transition-all duration-500"}>
          {!result && <h2 className="text-2xl font-bold tracking-tight mb-6 mt-12">Datos del Estudiante</h2>}
          <PredictionForm onSubmit={executePrediction} isLoading={isLoading} />
        </div>

        {/* Dashboard Estático Informativo */}
        {!result && <GlobalMetrics />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}
