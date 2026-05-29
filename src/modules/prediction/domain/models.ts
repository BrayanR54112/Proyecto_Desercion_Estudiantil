export interface StudentFeatures {
  marital_status: number;
  application_mode: number;
  application_order: number;
  course: number;
  daytime_evening_attendance: number;
  previous_qualification: number;
  nacionality: number;
  mother_qualification: number;
  father_qualification: number;
  mother_occupation: number;
  father_occupation: number;
  displaced: number;
  educational_special_needs: number;
  debtor: number;
  tuition_fees_up_to_date: number;
  gender: number;
  scholarship_holder: number;
  age_at_enrollment: number;
  international: number;
  curricular_units_1st_sem_credited: number;
  curricular_units_1st_sem_enrolled: number;
  curricular_units_1st_sem_evaluations: number;
  curricular_units_1st_sem_approved: number;
  curricular_units_1st_sem_grade: number;
  curricular_units_1st_sem_without_evaluations: number;
  curricular_units_2nd_sem_credited: number;
  curricular_units_2nd_sem_enrolled: number;
  curricular_units_2nd_sem_evaluations: number;
  curricular_units_2nd_sem_approved: number;
  curricular_units_2nd_sem_grade: number;
  curricular_units_2nd_sem_without_evaluations: number;
  unemployment_rate: number;
  inflation_rate: number;
  gdp: number;
}

export interface PredictionResult {
  prediction: number;
  probability: number;
  message: string;
  risk_level: "Bajo riesgo" | "Riesgo medio" | "Alto riesgo";
  engineered_features: {
    total_approved: number;
    total_enrolled: number;
    approval_rate: number;
    avg_grade: number;
    financial_risk: number;
  };
  top_factors: Array<{
    name: string;
    value: number;
    impact: number;
  }>;
}

export interface IPredictionRepository {
  predictDropout(features: StudentFeatures): Promise<PredictionResult>;
}
