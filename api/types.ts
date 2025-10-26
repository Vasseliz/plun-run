
export interface Training {
  dia: string;
  tempoMinutos: string;
  pace: string;
  distanciaKm: string;
  tipo: string;
  observacoes: string;
}

export interface TrainingGoal {
  tipo: string;
  detalhes: string;
}

export interface GeneratePlanRequest {
  trainings: Training[];
  goal?: TrainingGoal;
}


export interface GeneratePlanResponse {
  plan: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}
