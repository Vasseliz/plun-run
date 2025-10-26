import { Injectable } from '@angular/core';
import { Training } from '../models/training.model';
import { DAYS_OF_WEEK } from '../constants/treino.constants';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  initializeWeekTrainings(): Training[] {
    return DAYS_OF_WEEK.map(dia => this.createEmptyTraining(dia));
  }

  createEmptyTraining(dia: string): Training {
    return {
      dia,
      distanciaKm: 0,
      tempoMinutos: 0,
      ritmo: '',
      tipo: '',
      observacoes: ''
    };
  }

  isTrainingFilled(training: Training): boolean {
    const hasTime = training.tempoMinutos !== null && training.tempoMinutos > 0;
    const hasPace = training.ritmo.trim() !== '';
    const hasDistance = training.distanciaKm !== null && training.distanciaKm > 0;
    return (hasTime || hasPace) && hasDistance;
  }

  hasValidTrainings(trainings: Training[]): boolean {
    return trainings.some(training => this.isTrainingFilled(training));
  }

  getFilledTrainings(trainings: Training[]): Training[] {
    return trainings.filter(training => this.isTrainingFilled(training));
  }


  validateTraining(training: Training): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    const hasAnyData =
      (training.distanciaKm !== null && training.distanciaKm > 0) ||
      (training.tempoMinutos !== null && training.tempoMinutos > 0) ||
      training.ritmo.trim() !== '' ||
      training.tipo.trim() !== '' ||
      training.observacoes.trim() !== '';

    if (hasAnyData) {
      const validDistanceOrTime =
        (training.distanciaKm !== null && training.distanciaKm > 0) ||
        (training.tempoMinutos !== null && training.tempoMinutos > 0);

      if (!validDistanceOrTime) {
        errors.push(`${training.dia}: Preencha distância ou tempo`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateAllTrainings(trainings: Training[]): { valid: boolean; errors: string[] } {
    const allErrors: string[] = [];

    trainings.forEach(training => {
      const validation = this.validateTraining(training);
      allErrors.push(...validation.errors);
    });

    return {
      valid: allErrors.length === 0,
      errors: allErrors
    };
  }
}
