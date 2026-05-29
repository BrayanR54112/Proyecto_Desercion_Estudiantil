import React from "react";
import { PredictionResult as IPredictionResult } from "../../domain/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/Card";
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp, AlertCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

interface Props {
  result: IPredictionResult;
}

export function PredictionResult({ result }: Props) {
  const isHighRisk = result.risk_level === "Alto riesgo";
  const isMediumRisk = result.risk_level === "Riesgo medio";
  const isLowRisk = result.risk_level === "Bajo riesgo";
  const percentage = (result.probability * 100).toFixed(1);

  return (
    <div className="space-y-6">
      
      <Card className={cn("border-2", 
        isHighRisk ? "border-red-500/50 bg-red-50/50 dark:bg-red-950/20" : 
        isMediumRisk ? "border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20" : 
        "border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20"
      )}>
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {isHighRisk ? (
              <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
            ) : isMediumRisk ? (
              <div className="h-20 w-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ShieldAlert className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}
          </motion.div>
          
          <div className="space-y-1">
            <h2 className={cn("text-3xl font-bold tracking-tight", 
              isHighRisk ? "text-red-700 dark:text-red-400" : 
              isMediumRisk ? "text-amber-700 dark:text-amber-400" : 
              "text-emerald-700 dark:text-emerald-400"
            )}>
              {result.message}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Nivel: {result.risk_level}
            </p>
          </div>

          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm font-semibold">
              <span className={isHighRisk ? "text-red-700 dark:text-red-400" : isMediumRisk ? "text-amber-700 dark:text-amber-400" : "text-emerald-700 dark:text-emerald-400"}>{percentage}% Riesgo global</span>
              <span className="text-slate-500">100%</span>
            </div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${result.probability * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn("h-full rounded-full", isHighRisk ? "bg-red-500" : isMediumRisk ? "bg-amber-500" : "bg-emerald-500")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-slate-500" /> 
               Variables de Mayor Impacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.top_factors.map((factor, index) => (
              <div key={factor.name} className="flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">
                    {factor.name.replace(/_/g, " ")}
                  </span>
                  <span className="font-mono text-xs">{factor.value.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {factor.impact > 0 ? <TrendingUp className="h-4 w-4 text-red-500"/> : <TrendingDown className="h-4 w-4 text-emerald-500"/>}
                  <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", factor.impact > 0 ? "bg-red-500" : "bg-emerald-500")}
                      style={{ width: `${Math.min(100, Math.abs(factor.impact) * 20)}%` }} // Normalized UI multiplier for presentation
                    />
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
               *Rojo: Incrementa la probabilidad de deserción. Verde: Reduce la probabilidad.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ingeniería de Características en Memoria</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-3">
                <dt className="text-slate-500 pb-1">Tasa Aprobación Global</dt>
                <dd className="text-xl font-semibold">{(result.engineered_features.approval_rate * 100).toFixed(0)}%</dd>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-3">
                <dt className="text-slate-500 pb-1">Promedio Calificaciones</dt>
                <dd className="text-xl font-semibold">{result.engineered_features.avg_grade.toFixed(1)} / 20</dd>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-3">
                <dt className="text-slate-500 pb-1">Marcador de Riesgo Financiero</dt>
                <dd className="text-xl font-semibold">{result.engineered_features.financial_risk}</dd>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-3">
                <dt className="text-slate-500 pb-1">Total Materias Aprobadas</dt>
                <dd className="text-xl font-semibold">{result.engineered_features.total_approved}</dd>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-3 col-span-2 text-center bg-slate-50 dark:bg-slate-900">
                 <span className="text-xs text-slate-500">Cálculo ejecutado 100% en cliente sin API (Local)</span>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
