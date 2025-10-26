import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// filhos
import { FormularioTreinoComponent } from './components/formulario-treino/formulario-treino.component';
import { ListaTreinoComponent } from './components/lista-treino/lista-treino.component';
import { ResultadoTreinoComponent } from './components/resultado-treino/resultado-treino.component';

// services
import { TrainingService } from './services/training.service';
import { GeminiApiService } from './services/gemini-api.service';
import { PdfGeneratorService } from './services/pdf-generator.service';

import { Training, TrainingGoal } from './models/training.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FormularioTreinoComponent,
    ListaTreinoComponent,
    ResultadoTreinoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  trainings: Training[] = [];
  goal: TrainingGoal = { tipo: '', detalhes: '' };
  planoTreino: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private readonly trainingService: TrainingService,
    private readonly geminiService: GeminiApiService,
    private readonly pdfService: PdfGeneratorService
  ) {}

  ngOnInit(): void {
    // inicializar treinos vazios
    this.trainings = this.trainingService.initializeWeekTrainings();
  }

  onGeneratePlan(): void {
    const validation = this.trainingService.validateAllTrainings(this.trainings);

    if (!validation.valid) {
      this.error = validation.errors.join('\n');
      return;
    }

    const filledTrainings = this.trainingService.getFilledTrainings(this.trainings);

    if (filledTrainings.length === 0) {
      this.error = 'Preencha pelo menos um treino antes de gerar o plano.';
      return;
    }
    this.error = '';
    this.planoTreino = '';
    this.loading = true;

    this.geminiService.generateTrainingPlan(filledTrainings, this.goal).subscribe({
      next: (plan: string) => {
        this.planoTreino = plan;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
        console.error('Erro ao gerar plano:', err);
      }
    });
  }

  onGoalChange(goal: TrainingGoal): void {
    this.goal = goal;
  }

  onDownloadPdf(): void {
    if (this.planoTreino) {
      this.pdfService.generatePdf(this.planoTreino);
    }
  }

  onResetForm(): void {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
      this.trainings = this.trainingService.initializeWeekTrainings();
      this.goal = { tipo: '', detalhes: '' };
      this.planoTreino = '';
      this.error = '';
    }
  }

  onNewPlan(): void {
    this.planoTreino = '';
    this.error = '';
  }
}
