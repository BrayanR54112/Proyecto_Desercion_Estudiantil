# EduPredictAI - Predicción de Deserción Escolar

Aplicación web full-stack basada en Machine Learning para predecir si un estudiante tiene riesgo de deserción universitaria.

## Arquitectura

- **Frontend:** Next.js (emulado en React/Vite para este entorno), TypeScript, TailwindCSS, React Hook Form, Zod.
- **Backend (BFF):** Node.js Express Server (Port: 3000).
- **Backend (ML):** FastAPI (Python) + Scikit-Learn.
- **Clean Architecture:** Domain/Application/Infrastructure/Presentation pattern.

## Estructura de Directorios

\`\`\`bash
/src
 ├── modules/
 │    └── prediction/
 │         ├── domain/          # Modelos, Interfaces
 │         ├── application/     # Casos de uso (custom hooks)
 │         ├── infrastructure/  # Repositorios (API calls axio)
 │         └── presentation/    # Componentes UI (Form, Cards)
 ├── shared/
 │    └── components/ui/        # Reusable UI parts
 └── App.tsx                    # Layout Router
/python-backend                 # Código de Machine Learning
 ├── app.py                     # FastAPI Endpoints
 ├── train.py                   # Entrenamiento
 └── requirements.txt
\`\`\`

## Feature Engineering Incluido

La aplicación reproduce exactamente las métricas calculadas en Python:
- \`total_approved\`
- \`total_enrolled\`
- \`approval_rate\`
- \`avg_grade\`
- \`financial_risk\`

## Ejecución Local (Node + React)

\`\`\`bash
npm install
npm run dev
\`\`\`

## Ejecución con el Modelo Python (FastAPI)

1. Ve a la carpeta \`python-backend\`:
   \`\`\`bash
   cd python-backend
   pip install -r requirements.txt
   uvicorn app:app --reload --port 8000
   \`\`\`
2. Configura Axios (en \`PredictionApiRepository.ts\`) para que apunte a \`http://localhost:8000/predict\`.

*(Nota: En este entorno de AI Studio, la matemática e inferencia de Logistic Regression han sido replicadas en el archivo \`server.ts\` en Node para que la aplicación sea 100% funcional sin levantar el servidor de Python externamente)*.
