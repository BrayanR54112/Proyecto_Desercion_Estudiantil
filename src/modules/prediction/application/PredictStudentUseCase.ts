import { StudentFeatures, PredictionResult } from "../domain/models";
import { FeatureEngineeringService } from "../domain/services/FeatureEngineeringService";
import { PredictionModel } from "../domain/services/PredictionModel";

export class PredictStudentUseCase {
  execute(features: StudentFeatures): PredictionResult {
    // 1. Feature Engineering
    const engineered = FeatureEngineeringService.calculateFeatures(features);

    // 2. Construir el vector de features (ORDEN EXACTO según 34 características + 5 calculadas)
    const featureVector = [
      features.marital_status,
      features.application_mode,
      features.application_order,
      features.course,
      features.daytime_evening_attendance,
      features.previous_qualification,
      features.nacionality,
      features.mother_qualification,
      features.father_qualification,
      features.mother_occupation,
      features.father_occupation,
      features.displaced,
      features.educational_special_needs,
      features.debtor,
      features.tuition_fees_up_to_date,
      features.gender,
      features.scholarship_holder,
      features.age_at_enrollment,
      features.international,
      features.curricular_units_1st_sem_credited,
      features.curricular_units_1st_sem_enrolled,
      features.curricular_units_1st_sem_evaluations,
      features.curricular_units_1st_sem_approved,
      features.curricular_units_1st_sem_grade,
      features.curricular_units_1st_sem_without_evaluations,
      features.curricular_units_2nd_sem_credited,
      features.curricular_units_2nd_sem_enrolled,
      features.curricular_units_2nd_sem_evaluations,
      features.curricular_units_2nd_sem_approved,
      features.curricular_units_2nd_sem_grade,
      features.curricular_units_2nd_sem_without_evaluations,
      features.unemployment_rate,
      features.inflation_rate,
      features.gdp,
      engineered.total_approved,
      engineered.total_enrolled,
      engineered.approval_rate,
      engineered.avg_grade,
      engineered.financial_risk
    ];

    // 3. Inferencia de Modelo Local
    const probability = PredictionModel.predictProbability(featureVector);
    const prediction = probability >= 0.5 ? 1 : 0;

    // 4. Clasificación de Riesgo
    let risk_level: "Bajo riesgo" | "Riesgo medio" | "Alto riesgo" = "Bajo riesgo";
    let message = "No presenta riesgo";

    if (probability >= 0.7) {
      risk_level = "Alto riesgo";
      message = "Alto Riesgo de Deserción";
    } else if (probability >= 0.4) {
      risk_level = "Riesgo medio";
      message = "Riesgo Moderado de Deserción";
    }

    // 5. Calculamos top_factors mostrando los resultados en la interfaz
    // Basado en los coeficientes subyacentes del modelo de Logistic Regression
    const top_factors = [
      { name: "approval_rate", value: engineered.approval_rate, impact: engineered.approval_rate * -0.551849 },
      { name: "avg_grade", value: engineered.avg_grade, impact: engineered.avg_grade * 0.058287 },
      { name: "financial_risk", value: engineered.financial_risk, impact: engineered.financial_risk * 0.324922 },
      { name: "curricular_units_2nd_sem_approved", value: features.curricular_units_2nd_sem_approved, impact: features.curricular_units_2nd_sem_approved * -1.236685 },
      { name: "tuition_fees_up_to_date", value: features.tuition_fees_up_to_date, impact: features.tuition_fees_up_to_date * -0.567538 },
      { name: "total_approved", value: engineered.total_approved, impact: engineered.total_approved * -0.799385 },
      { name: "age_at_enrollment", value: features.age_at_enrollment, impact: features.age_at_enrollment * 0.390240 }
    ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

    return {
      prediction,
      probability,
      message,
      risk_level,
      engineered_features: engineered,
      top_factors
    };
  }
}
