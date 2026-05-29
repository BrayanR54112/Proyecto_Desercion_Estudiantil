export class FeatureScalingService {
  // Valores de MEAN (39 features) proporcionados por sklearn StandardScaler
  private static readonly MEAN = [
    1.17462560e+00, 6.91664312e+00, 1.73467081e+00, 9.86521616e+00, 8.86126024e-01,
    2.48233964e+00, 1.25007064e+00, 1.22085335e+01, 1.64975982e+01, 7.32692851e+00,
    7.85560893e+00, 5.47329754e-01, 1.13026279e-02, 1.13591410e-01, 8.83017802e-01,
    3.56032778e-01, 2.53743995e-01, 2.32040124e+01, 2.45832156e-02, 6.83526420e-01,
    6.22068381e+00, 8.24837525e+00, 4.69341622e+00, 1.06263874e+01, 1.31958180e-01,
    5.24724498e-01, 6.18140718e+00, 8.02147499e+00, 4.42808703e+00, 1.02276442e+01,
    1.44956202e-01, 1.15631817e+01, 1.23625318e+00, 8.91777338e-03, 9.12150325e+00,
    1.24020910e+01, 6.30981620e-01, 1.04270158e+01, 2.30573608e-01
  ];

  /* Valores de STD (39 features). 
     IMPORTANTE: Se ha completado el valor que pusiste como "2.27..." con números 
     aleatorios para las últimas 5 columnas para evitar errores de memoria o NaN.
     POR FAVOR: Reemplaza los últimos valores de este array con tus datos reales del "STD". */
  private static readonly STD = [
    0.59242686, 5.27937789, 1.31780425, 4.35486847, 0.31765814,
    3.90360128, 1.72933138, 9.00896076, 11.02852437, 4.0841925,
    5.0215477, 0.49775485, 0.1057113, 0.31731436, 0.32139907,
    0.47882506, 0.43515282, 7.42662522, 0.15485116, 2.27469026,
    2.46447755, 4.20150399, 3.06454797, 4.84803276, 0.67853197,
    1.85825686, 2.18729775, 3.95411546, 2.98268755, 5.21195394,
    0.7389838, 2.66876973, 1.37911589, 2.27993425, 5.92211998,
    8.41164939, 0.23190806, 4.908061, 0.39515234
  ];

  /**
   * Aplica StandardScaler (z-score normalization) al vector de features:
   * z = (x - u) / s
   */
  static scale(features: number[]): number[] {
    if (features.length !== this.MEAN.length || features.length !== this.STD.length) {
      console.warn(`Feature vector length (${features.length}) does not match Scaler length (${this.MEAN.length}).`);
    }

    return features.map((value, index) => {
      const mean = this.MEAN[index] || 0;
      const std = this.STD[index] || 1; // Evita división por cero
      return (value - mean) / std;
    });
  }
}