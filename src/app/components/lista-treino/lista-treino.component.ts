import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-lista-treino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-treino.component.html',
  styleUrls: ['./lista-treino.component.css']
})
export class ListaTreinoComponent {
  @Input() trainings: Training[] = [];


getFilledTrainings(): Training[] {
  return this.trainings.filter(t => {
    const hasTime = t.tempoMinutos !== null && t.tempoMinutos > 0;
    const hasPace = t.ritmo.trim() !== '';
    const hasDistance = t.distanciaKm !== null && t.distanciaKm > 0;
    return (hasTime || hasPace) && hasDistance;
  });
}

  getTotalDistance(): number {
    return this.trainings.reduce((sum, t) => sum + (t.distanciaKm || 0), 0);
  }

  getTotalTime(): number {
    return this.trainings.reduce((sum, t) => sum + (t.tempoMinutos || 0), 0);
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}min`;
    }
  }

  hasFilledTrainings(): boolean {
    return this.getFilledTrainings().length > 0;
  }
}
