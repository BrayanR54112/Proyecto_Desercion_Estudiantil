import { StudentFeatures } from "../models";

export interface EngineeredFeatures {
  total_approved: number;
  total_enrolled: number;
  approval_rate: number;
  avg_grade: number;
  financial_risk: number;
}

export class FeatureEngineeringService {
  static calculateFeatures(data: StudentFeatures): EngineeredFeatures {
    const total_approved = data.curricular_units_1st_sem_approved + data.curricular_units_2nd_sem_approved;
    const total_enrolled = data.curricular_units_1st_sem_enrolled + data.curricular_units_2nd_sem_enrolled;
    const approval_rate = total_approved / (total_enrolled + 1);
    const avg_grade = (data.curricular_units_1st_sem_grade + data.curricular_units_2nd_sem_grade) / 2;
    const financial_risk = data.debtor + (1 - data.tuition_fees_up_to_date);

    return {
      total_approved,
      total_enrolled,
      approval_rate,
      avg_grade,
      financial_risk
    };
  }
}
