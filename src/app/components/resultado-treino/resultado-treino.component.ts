import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado-treino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado-treino.component.html',
  styleUrls: ['./resultado-treino.component.css']
})
export class ResultadoTreinoComponent {
  @Input() planoTreino: string = '';
  @Input() loading: boolean = false;
  @Input() error: string = '';

  @Output() downloadPdf = new EventEmitter<void>();
  @Output() newPlan = new EventEmitter<void>();

  hasContent(): boolean {
    return this.planoTreino !== '' || this.loading || this.error !== '';
  }
  onDownloadPdf(): void {
    this.downloadPdf.emit();
  }

  onNewPlan(): void {
    this.newPlan.emit();
  }

  formatPlano(plano: string): string {
    if (!plano) return '';

    return plano
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
}
