import { TrainingType, TrainingTypeOption } from '../models/training.model';

export const DIAS_SEMANA: readonly string[] = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
] as const;

export const TIPOS_TREINO: readonly TrainingTypeOption[] = [
  { value: TrainingType.LEVE, label: 'Treino Leve' },
  { value: TrainingType.MODERADO, label: 'Treino Moderado' },
  { value: TrainingType.INTENSO, label: 'Treino Intenso' },
  { value: TrainingType.INTERVALO, label: 'Treino Intervalado' },
  { value: TrainingType.LONGO, label: 'Treino Longo' },
  { value: TrainingType.DESCANSO, label: 'Descanso' }
] as const;


