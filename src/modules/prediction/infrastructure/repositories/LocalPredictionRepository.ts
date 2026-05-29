import { IPredictionRepository, PredictionResult, StudentFeatures } from "../../domain/models";
import { PredictStudentUseCase } from "../../application/PredictStudentUseCase";

export class LocalPredictionRepository implements IPredictionRepository {
  private useCase: PredictStudentUseCase;

  constructor() {
    this.useCase = new PredictStudentUseCase();
  }

  async predictDropout(features: StudentFeatures): Promise<PredictionResult> {
    // Retraso artificial para simular procesamiento y mejorar UX de estado de carga
    await new Promise((resolve) => setTimeout(resolve, 800));

    return this.useCase.execute(features);
  }
}

export const predictionRepository = new LocalPredictionRepository();
