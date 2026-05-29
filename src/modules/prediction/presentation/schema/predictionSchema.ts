import { z } from "zod";

export const predictionSchema = z.object({
  // Demographics & Admission
  marital_status: z.coerce.number(),
  application_mode: z.coerce.number(),
  application_order: z.coerce.number().min(0).max(10),
  course: z.coerce.number(),
  daytime_evening_attendance: z.coerce.number(),
  previous_qualification: z.coerce.number(),
  nacionality: z.coerce.number(),
  
  // Parents
  mother_qualification: z.coerce.number(),
  father_qualification: z.coerce.number(),
  mother_occupation: z.coerce.number(),
  father_occupation: z.coerce.number(),
  
  // Socioeconomic
  displaced: z.coerce.number(),
  educational_special_needs: z.coerce.number(),
  debtor: z.coerce.number(),
  tuition_fees_up_to_date: z.coerce.number(),
  gender: z.coerce.number(),
  scholarship_holder: z.coerce.number(),
  age_at_enrollment: z.coerce.number().min(15).max(100),
  international: z.coerce.number(),

  // Academic - 1st Sem
  curricular_units_1st_sem_credited: z.coerce.number().min(0),
  curricular_units_1st_sem_enrolled: z.coerce.number().min(0),
  curricular_units_1st_sem_evaluations: z.coerce.number().min(0),
  curricular_units_1st_sem_approved: z.coerce.number().min(0),
  curricular_units_1st_sem_grade: z.coerce.number().min(0).max(20),
  curricular_units_1st_sem_without_evaluations: z.coerce.number().min(0),

  // Academic - 2nd Sem
  curricular_units_2nd_sem_credited: z.coerce.number().min(0),
  curricular_units_2nd_sem_enrolled: z.coerce.number().min(0),
  curricular_units_2nd_sem_evaluations: z.coerce.number().min(0),
  curricular_units_2nd_sem_approved: z.coerce.number().min(0),
  curricular_units_2nd_sem_grade: z.coerce.number().min(0).max(20),
  curricular_units_2nd_sem_without_evaluations: z.coerce.number().min(0),

  // Macroeconomics
  unemployment_rate: z.coerce.number(),
  inflation_rate: z.coerce.number(),
  gdp: z.coerce.number(),
});

export type PredictionFormValues = z.infer<typeof predictionSchema>;
