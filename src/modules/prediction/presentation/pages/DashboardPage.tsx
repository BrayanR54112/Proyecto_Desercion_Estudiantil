import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

export function GlobalMetrics() {
  const modelData = [
    { name: 'Regresión Logística', accuracy: 87, precision0: 87, precision1: 86 },
    { name: 'Random Forest', accuracy: 86, precision0: 86, precision1: 85 },
  ];

  const variablesData = [
    { name: 'approval_rate', importance: 0.18 },
    { name: 'curricular_units_2nd_sem_approved', importance: 0.15 },
    { name: 'total_approved', importance: 0.12 },
    { name: 'avg_grade', importance: 0.09 },
    { name: 'tuition_fees_up_to_date', importance: 0.08 },
    { name: 'age_at_enrollment', importance: 0.05 },
    { name: 'financial_risk', importance: 0.05 },
  ];

  return (
    <div className="space-y-6 mt-12 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1 text-slate-900 dark:text-slate-50">Dashboard del Modelo</h2>
        <p className="text-slate-500 dark:text-slate-400">Rendimiento global y métricas de los algoritmos subyacentes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Comparación de Modelos (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                <YAxis domain={[80, 100]} fontSize={12} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="accuracy" name="Accuracy" fill="#0f172a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="precision1" name="Precision (Riesgo)" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Importancia de Variables (Feature Importance)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={variablesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
                <XAxis type="number" fontSize={12} hide />
                <YAxis dataKey="name" type="category" width={100} fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => val.replace(/_/g, ' ')}/>
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="importance" name="Importancia" fill="#0f172a" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
