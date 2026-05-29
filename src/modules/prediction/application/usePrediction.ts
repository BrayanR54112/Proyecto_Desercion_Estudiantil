import { useState } from "react";
import { StudentFeatures, PredictionResult } from "../domain/models";
import { predictionRepository } from "../infrastructure/repositories/LocalPredictionRepository";

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executePrediction = async (features: StudentFeatures) => {
    setIsLoading(true);
    setError(null);
    try {
      const prediction = await predictionRepository.predictDropout(features);
      setResult(prediction);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al conectar con el motor de inferencia.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  }

  return { executePrediction, result, isLoading, error, reset };
}
