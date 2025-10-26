export const DAYS_OF_WEEK: readonly string[] = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
] as const;

export const TRAINING_TYPES: readonly string[] = [
  'Leve',
  'Moderado',
  'Intervalado',
  'Longo',
  'Recuperação',
  'Outro'
] as const;

export const GOAL_TYPES: readonly string[] = [
  'Preparação para Prova',
  'Melhorar Velocidade',
  'Aumentar Resistência',
  'Manter Condicionamento',
  'Perder Peso/Saúde',
  'Recuperação Ativa',
  'Voltar aos Treinos',
  'Outro'
] as const;

export const PDF_CONFIG = {
  MARGIN_LEFT: 15,
  MARGIN_RIGHT: 195,
  TITLE_FONT_SIZE: 20,
  SUBTITLE_FONT_SIZE: 14,
  NORMAL_FONT_SIZE: 9,
  LINE_HEIGHT: 5,
  MAX_Y: 280
} as const;

export const GOAL_PLACEHOLDERS: Record<string, string> = {
  'Preparação para Prova': 'Ex: Meia maratona em abril, 10km em março, maratona de São Paulo...',
  'Melhorar Velocidade': 'Ex: Melhorar pace de 6:00 para 5:30 min/km, correr 5km em menos de 25min...',
  'Aumentar Resistência': 'Ex: Conseguir correr 15km sem parar, aumentar volume semanal para 40km...',
  'Manter Condicionamento': 'Ex: Manter forma física atual, correr 3x por semana...',
  'Perder Peso/Saúde': 'Ex: Perder 5kg em 3 meses, melhorar saúde cardiovascular, controlar diabetes...',
  'Recuperação Ativa': 'Ex: Retornar após lesão no joelho, recuperação pós-cirurgia...',
  'Voltar aos Treinos': 'Ex: Parei há 3 meses, voltar progressivamente sem lesões...',
  'Outro': 'Descreva seu objetivo com o máximo de detalhes possível...'
};
