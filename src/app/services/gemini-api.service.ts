import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Training, TrainingGoal } from '../models/training.model';
import { environment } from 'src/environments/environment';

interface BackendResponse {
  plan: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeminiApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}
  generateTrainingPlan(trainings: Training[], goal?: TrainingGoal): Observable<string> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const payload: { trainings: Training[]; goal?: TrainingGoal } = { trainings };

    if (goal && (goal.tipo || goal.detalhes)) {
      payload.goal = goal;
    }

    return this.http.post<BackendResponse>(this.apiUrl, payload, { headers }).pipe(
      map(response => response.plan),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro ao gerar plano de treino.';

    if (error.status === 0) {
      errorMessage = 'Erro de conexão com o servidor.';
    } else if (error.status === 400) {
      errorMessage = 'Dados de treino inválidos.';
    } else if (error.status === 500) {
      errorMessage = error.error?.error || 'Erro no servidor. Tente novamente.';
    } else if (error.status === 429) {
      errorMessage = 'Muitas requisições. Aguarde um momento.';
    }

    console.error('Erro:', error);
    return throwError(() => new Error(errorMessage));
  }
}
