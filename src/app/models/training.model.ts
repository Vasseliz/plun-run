export interface Training {
  dia: string;
  distanciaKm: number | null;
  tempoMinutos: number | null;
  ritmo: string;
  tipo: string;
  observacoes: string;
}
export interface TrainingGoal {
  tipo: string;
  detalhes: string;
}
export interface TrainingFormData {
  objetivo: TrainingGoal;
  treinos: Training[];
}
export enum TrainingType {
  LEVE = 'Leve',
  MODERADO = 'Moderado',
  INTERVALADO = 'Intervalado',
  LONGO = 'Longo',
  RECUPERACAO = 'Recuperação',
  OUTRO = 'Outro'
}
export enum GoalType {
  PROVA = 'Preparação para Prova',
  VELOCIDADE = 'Melhorar Velocidade',
  RESISTENCIA = 'Aumentar Resistência',
  MANUTENCAO = 'Manter Condicionamento',
  SAUDE = 'Perder Peso/Saúde',
  RECUPERACAO = 'Recuperação Ativa',
  RETORNO = 'Voltar aos Treinos',
  OUTRO = 'Outro'
}

// tipo da da resposta do gemini
export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}


