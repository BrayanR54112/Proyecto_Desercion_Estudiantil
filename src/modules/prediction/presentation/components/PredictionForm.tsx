import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { predictionSchema, PredictionFormValues } from "../schema/predictionSchema";
import { Input } from "@/src/shared/components/ui/Input";
import { Select } from "@/src/shared/components/ui/Select";
import { Button } from "@/src/shared/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/Card";
import { Loader2 } from "lucide-react";

interface Props {
  onSubmit: (data: PredictionFormValues) => void;
  isLoading: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      marital_status: 1,
      application_mode: 1,
      application_order: 1,
      course: 1,
      daytime_evening_attendance: 1,
      previous_qualification: 1,
      nacionality: 1,
      mother_qualification: 1,
      father_qualification: 1,
      mother_occupation: 1,
      father_occupation: 1,
      displaced: 0,
      educational_special_needs: 0,
      debtor: 0,
      tuition_fees_up_to_date: 1,
      gender: 1,
      scholarship_holder: 0,
      age_at_enrollment: 20,
      international: 0,
      curricular_units_1st_sem_credited: 0,
      curricular_units_1st_sem_enrolled: 6,
      curricular_units_1st_sem_evaluations: 6,
      curricular_units_1st_sem_approved: 5,
      curricular_units_1st_sem_grade: 12.5,
      curricular_units_1st_sem_without_evaluations: 0,
      curricular_units_2nd_sem_credited: 0,
      curricular_units_2nd_sem_enrolled: 6,
      curricular_units_2nd_sem_evaluations: 6,
      curricular_units_2nd_sem_approved: 5,
      curricular_units_2nd_sem_grade: 12.5,
      curricular_units_2nd_sem_without_evaluations: 0,
      unemployment_rate: 10.8,
      inflation_rate: 1.4,
      gdp: 1.74,
    }
  });

  const renderError = (field: keyof PredictionFormValues) => {
    if (errors[field]) {
      return <span className="text-xs text-red-500 mt-1">{errors[field]?.message}</span>;
    }
    return null;
  }

  const renderSelect = (name: keyof PredictionFormValues, label: string, options: {label: string, value: string | number}[]) => (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">{label}</label>
      <Select {...register(name)}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Select>
      {renderError(name)}
    </div>
  );

  const renderInput = (name: keyof PredictionFormValues, label: string, step: string = "1") => (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">{label}</label>
      <Input type="number" step={step} {...register(name)} />
      {renderError(name)}
    </div>
  );

  const booleanOptions = [{label: "No", value: 0}, {label: "Sí", value: 1}];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demographics & Admission */}
        <Card>
          <CardHeader>
            <CardTitle>Demografía y Admisión</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelect("marital_status", "Estado Civil", [{label: "Soltero", value: 1}, {label: "Casado", value: 2}, {label: "Divorciado", value: 4} ,{label: "Otro", value: 5}])}
            {renderSelect("gender", "Género", [{label: "Masculino", value: 1}, {label: "Femenino", value: 0}])}
            {renderInput("age_at_enrollment", "Edad al matricularse")}
            {renderSelect("international", "Estudiante Internacional", booleanOptions)}
            {renderSelect("nacionality", "Nacionalidad", [{label: "Local", value: 1}, {label: "Extranjero", value: 2}])}
            {renderSelect("application_mode", "Modo de Aplicación", [{label: "Primera fase", value: 1}, {label: "Segunda fase", value: 2}, {label: "Mayores de 23", value: 3}, {label: "Transferencia", value: 4}])}
            {renderInput("application_order", "Orden de Aplicación (0-10)")}
            {renderSelect("course", "Curso", [{label: "Ingeniería Informática", value: 1}, {label: "Diseño de Comunicación", value: 2}, {label: "Gestión", value: 3}])}
            {renderSelect("daytime_evening_attendance", "Asistencia Diurna/Nocturna", [{label: "Diurna", value: 1}, {label: "Nocturna", value: 0}])}
            {renderSelect("previous_qualification", "Calificación Previa", [{label: "Secundaria", value: 1}, {label: "Educación Superior", value: 2}, {label: "Otro", value: 3}])}
          </CardContent>
        </Card>

        {/* Socioeconomic & Parents */}
        <Card>
          <CardHeader>
            <CardTitle>Socioeconómico y Padres</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelect("mother_qualification", "Nivel Educativo Madre", [{label: "Básica", value: 1}, {label: "Secundaria", value: 2}, {label: "Superior", value: 3}])}
            {renderSelect("father_qualification", "Nivel Educativo Padre", [{label: "Básica", value: 1}, {label: "Secundaria", value: 2}, {label: "Superior", value: 3}])}
            {renderSelect("mother_occupation", "Ocupación Madre", [{label: "Estudiante", value: 1}, {label: "Clase trabajadora", value: 2}, {label: "Directivo", value: 3}])}
            {renderSelect("father_occupation", "Ocupación Padre", [{label: "Estudiante", value: 1}, {label: "Clase trabajadora", value: 2}, {label: "Directivo", value: 3}])}
            {renderSelect("displaced", "Desplazado", booleanOptions)}
            {renderSelect("educational_special_needs", "Necesidades Especiales Educativas", booleanOptions)}
            {renderSelect("debtor", "Es Deudor", booleanOptions)}
            {renderSelect("tuition_fees_up_to_date", "Matrícula al Día", booleanOptions)}
            {renderSelect("scholarship_holder", "Becario", booleanOptions)}
          </CardContent>
        </Card>
        
        {/* Academic 1st Sem */}
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento 1er Semestre</CardTitle>
          </CardHeader>
          <CardContent>
             {renderInput("curricular_units_1st_sem_credited", "Unidades Acreditadas")}
             {renderInput("curricular_units_1st_sem_enrolled", "Unidades Matriculadas")}
             {renderInput("curricular_units_1st_sem_evaluations", "Evaluaciones")}
             {renderInput("curricular_units_1st_sem_approved", "Unidades Aprobadas")}
             {renderInput("curricular_units_1st_sem_grade", "Calificación Promedio (0-20)", "0.1")}
             {renderInput("curricular_units_1st_sem_without_evaluations", "Unidades sin Evaluación")}
          </CardContent>
        </Card>

        {/* Academic 2nd Sem & Macroeconomics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento 2do Semestre</CardTitle>
            </CardHeader>
            <CardContent>
               {renderInput("curricular_units_2nd_sem_credited", "Unidades Acreditadas")}
               {renderInput("curricular_units_2nd_sem_enrolled", "Unidades Matriculadas")}
               {renderInput("curricular_units_2nd_sem_evaluations", "Evaluaciones")}
               {renderInput("curricular_units_2nd_sem_approved", "Unidades Aprobadas")}
               {renderInput("curricular_units_2nd_sem_grade", "Calificación Promedio (0-20)", "0.1")}
               {renderInput("curricular_units_2nd_sem_without_evaluations", "Unidades sin Evaluación")}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Entorno Macroeconómico</CardTitle>
            </CardHeader>
            <CardContent>
              {renderInput("unemployment_rate", "Tasa de Desempleo (%)", "0.1")}
              {renderInput("inflation_rate", "Tasa de Inflación (%)", "0.1")}
              {renderInput("gdp", "PIB (GDP)", "0.01")}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-4">
        <Button disabled={isLoading} type="submit" size="lg" className="w-full md:w-auto px-8 shadow-lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ejecutar Predicción
        </Button>
      </div>

    </form>
  );
}
