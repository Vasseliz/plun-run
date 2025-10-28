import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Training, TrainingGoal } from '../../models/training.model';
import { DAYS_OF_WEEK, TRAINING_TYPES, GOAL_TYPES, GOAL_PLACEHOLDERS } from 'src/app/constants/treino.constants';


@Component({
  selector: 'app-formulario-treino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-treino.component.html',
  styleUrls: ['./formulario-treino.component.css']
})
export class FormularioTreinoComponent {
  @Input() trainings: Training[] = [];
  @Input() goal: TrainingGoal = { tipo: '', detalhes: '' };
  @Input() loading: boolean = false;

  @Output() trainingsChange = new EventEmitter<Training[]>();
  @Output() goalChange = new EventEmitter<TrainingGoal>();
  @Output() generatePlan = new EventEmitter<void>();
  @Output() resetForm = new EventEmitter<void>();

  readonly daysOfWeek = DAYS_OF_WEEK;
  readonly trainingTypes = TRAINING_TYPES;
  readonly goalTypes = GOAL_TYPES;
  readonly goalPlaceholders = GOAL_PLACEHOLDERS;

  expandedDays = new Set<number>([0]);

  toggleDay(index: number): void {
    this.expandedDays.has(index)
      ? this.expandedDays.delete(index)
      : this.expandedDays.add(index);
  }

  isDayExpanded(index: number): boolean {
    return this.expandedDays.has(index);
  }

  getGoalPlaceholder(): string {
    return this.goal.tipo ? this.goalPlaceholders[this.goal.tipo] : 'Selecione um tipo de objetivo acima';
  }


  isGoalFilled(): boolean {
    return this.goal.tipo.trim() !== '' || this.goal.detalhes.trim() !== '';
  }


  emitGoalChanges(): void {
    this.goalChange.emit({ ...this.goal });
  }


  emitChanges(): void {
    this.trainingsChange.emit([...this.trainings]);
  }

  isTrainingFilled(training: Training): boolean {
    const hasTime = training.tempoMinutos !== null && training.tempoMinutos > 0;
    const hasPace = training.ritmo.trim() !== '';
    const hasDistance = training.distanciaKm !== null && training.distanciaKm > 0;
    return (hasTime || hasPace) && hasDistance;
  }

  getFilledTrainingsCount(): number {
    return this.trainings.filter((t) => this.isTrainingFilled(t)).length;
  }

  clearTraining(index: number): void {
    this.trainings[index] = {
      dia: this.daysOfWeek[index],
      distanciaKm: null,
      tempoMinutos: null,
      ritmo: '',
      tipo: '',
      observacoes: ''
    };
    this.emitChanges();
  }

  onGeneratePlan(): void {
    this.generatePlan.emit();
  }


  onResetForm(): void {
    this.resetForm.emit();
  }


  calculatePace(index: number): void {
    const training = this.trainings[index];
    if (training.distanciaKm && training.tempoMinutos) {
      if (training.distanciaKm > 0 && training.tempoMinutos > 0) {
        const pace = training.tempoMinutos / training.distanciaKm;
        const min = Math.floor(pace);
        const sec = Math.round((pace - min) * 60);
        training.ritmo = `${min}:${sec.toString().padStart(2, '0')} min/km`;
      }
    }
    this.emitChanges();
  }

  onFocusNumberField(index: number, field: 'distanciaKm' | 'tempoMinutos'): void {
    const value = this.trainings[index][field];
    if (value === 0 || value === null) {
      this.trainings[index][field] = null;
    }
  }
}
