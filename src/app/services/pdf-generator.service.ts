import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { PDF_CONFIG } from '../constants/treino.constants';
import { TrainingGoal } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  async generatePdf(planoTexto: string, goal?: TrainingGoal): Promise<void> {
    const pdf = new jsPDF();
    const { MARGIN_LEFT, MARGIN_RIGHT, LINE_HEIGHT, MAX_Y } = PDF_CONFIG;

    try {
      const logoData = await this.loadLogoImage();
      let y = 30;
      this.addLogoToCurrentPage(pdf, logoData);
      pdf.setFontSize(PDF_CONFIG.TITLE_FONT_SIZE);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Plano de Treino Personalizado', MARGIN_LEFT + 25, y);
      y += 15;

      pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE);
      pdf.setFont('helvetica', 'normal');
      const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      pdf.text(`Gerado em: ${dataAtual}`, MARGIN_LEFT + 25, y);
      y += 10;

      if (goal && goal.tipo) {
        y += 5;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE + 1);
        pdf.text('Objetivo:', MARGIN_LEFT + 25, y);
        y += 5;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE);

        const tipoLines = pdf.splitTextToSize(`- ${goal.tipo}`, MARGIN_RIGHT - MARGIN_LEFT - 25);
        tipoLines.forEach((line: string) => {
          pdf.text(line, MARGIN_LEFT + 25, y);
          y += LINE_HEIGHT;
        });


        if (goal.detalhes && goal.detalhes.trim() !== '') {
          const detalhesLines = pdf.splitTextToSize(`- ${goal.detalhes}`, MARGIN_RIGHT - MARGIN_LEFT - 25);
          detalhesLines.forEach((line: string) => {
            if (y > MAX_Y) {
              pdf.addPage();
              this.addLogoToCurrentPage(pdf, logoData);
              y = 30;
            }
            pdf.text(line, MARGIN_LEFT + 25, y);
            y += LINE_HEIGHT;
          });
        }
      }

      y += 10;

      pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE);

      const linhas = planoTexto.split('\n');

      linhas.forEach(linha => {
        if (y > MAX_Y) {
          pdf.addPage();
          this.addLogoToCurrentPage(pdf, logoData);
          y = 30;
        }

        const linhaLimpa = linha.trim();
        if (linhaLimpa === '') {
          y += LINE_HEIGHT / 2;
          return;
        }

        if (linhaLimpa.startsWith('===') && linhaLimpa.endsWith('===')) {
          y += LINE_HEIGHT;
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(PDF_CONFIG.SUBTITLE_FONT_SIZE + 2);
          const titulo = linhaLimpa.replace(/===/g, '').trim();
          pdf.text(titulo, MARGIN_LEFT, y);
          y += LINE_HEIGHT + 3;

          pdf.setDrawColor(100, 100, 100);
          pdf.line(MARGIN_LEFT, y, MARGIN_RIGHT, y);
          y += LINE_HEIGHT;

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE);
          return;
        }

        if (/^(SEGUNDA|TERÇA|QUARTA|QUINTA|SEXTA|SÁBADO|DOMINGO)(-FEIRA)?$/.test(linhaLimpa.toUpperCase())) {
          y += LINE_HEIGHT;
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(PDF_CONFIG.SUBTITLE_FONT_SIZE);
          pdf.text(linhaLimpa.toUpperCase(), MARGIN_LEFT, y);
          y += LINE_HEIGHT + 2;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE);
          return;
        }

        if (/^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ]+:/.test(linhaLimpa)) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE + 1);
          const linhasQuebradas = pdf.splitTextToSize(linhaLimpa, MARGIN_RIGHT - MARGIN_LEFT);

          linhasQuebradas.forEach((linhaQuebrada: string) => {
            if (y > MAX_Y) {
              pdf.addPage();
              this.addLogoToCurrentPage(pdf, logoData);
              y = 30;
            }
            pdf.text(linhaQuebrada, MARGIN_LEFT, y);
            y += LINE_HEIGHT;
          });

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(PDF_CONFIG.NORMAL_FONT_SIZE);
          return;
        }

        // Detectar itens de lista (começam com • ou -)
        if (linhaLimpa.startsWith('•') || linhaLimpa.startsWith('-')) {
          const textoItem = linhaLimpa.substring(1).trim();
          const linhasQuebradas = pdf.splitTextToSize(`  • ${textoItem}`, MARGIN_RIGHT - MARGIN_LEFT - 5);

          linhasQuebradas.forEach((linhaQuebrada: string, index: number) => {
            if (y > MAX_Y) {
              pdf.addPage();
              this.addLogoToCurrentPage(pdf, logoData);
              y = 30;
            }
            pdf.text(linhaQuebrada, MARGIN_LEFT + (index > 0 ? 7 : 0), y);
            y += LINE_HEIGHT;
          });
          return;
        }

        // Texto normal com indentação para sub-itens
        const indentacao = linhaLimpa.startsWith('  ') ? 10 : 0;
        const textoLimpo = linhaLimpa.trimStart();
        const linhasQuebradas = pdf.splitTextToSize(textoLimpo, MARGIN_RIGHT - MARGIN_LEFT - indentacao);

        linhasQuebradas.forEach((linhaQuebrada: string) => {
          if (y > MAX_Y) {
            pdf.addPage();
            this.addLogoToCurrentPage(pdf, logoData);
            y = 30;
          }
          pdf.text(linhaQuebrada, MARGIN_LEFT + indentacao, y);
          y += LINE_HEIGHT;
        });
      });

      // Salvar PDF
      const nomeArquivo = `plano-treino-${new Date().getTime()}.pdf`;
      pdf.save(nomeArquivo);

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      // Gerar PDF sem logo em caso de erro
      this.generatePdfWithoutLogo(pdf, planoTexto);
    }
  }


  private loadLogoImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Não foi possível criar contexto do canvas'));
        }
      };
      img.onerror = () => reject(new Error('Erro ao carregar imagem'));
      img.src = 'assets/images/plan-run.png';
    });
  }

  private addLogoToCurrentPage(pdf: jsPDF, logoData: string): void {
    try {
      const logoWidth = 20;
      const logoHeight = 20;
      const logoX = 10;
      const logoY = 10;

      pdf.addImage(
        logoData,
        'PNG',
        logoX,
        logoY,
        logoWidth,
        logoHeight
      );
    } catch (error) {
      console.error('Erro ao adicionar logo:', error);
    }
  }


  private generatePdfWithoutLogo(pdf: jsPDF, planoTexto: string): void {
    const nomeArquivo = `plano-treino-${new Date().getTime()}.pdf`;
    pdf.save(nomeArquivo);
  }
}
