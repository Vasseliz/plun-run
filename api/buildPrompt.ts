import type { Training, TrainingGoal } from "./types";

export function buildPrompt(trainings: Training[], goal?: TrainingGoal): string {
  const treinosPreenchidos = trainings.filter(
    t => t.tempoMinutos || t.distanciaKm
  );

  const dadosTreinos = formatTrainingData(treinosPreenchidos);
  const dadosObjetivo = formatGoalData(goal);

  return `Você é um treinador profissional de corrida altamente experiente. Analise os dados dos treinos anteriores${goal ? ' e o objetivo do corredor' : ''} abaixo e crie um plano de treino DETALHADO, PROGRESSIVO e PERSONALIZADO para a PRÓXIMA SEMANA (7 dias).

IMPORTANTE - FORMATAÇÃO:
- NÃO USE EMOJIS (o PDF não os renderiza corretamente)
- Use apenas texto simples e marcadores (-, •)
- Mantenha uma estrutura hierárquica clara com indentação
- Títulos principais devem estar entre === ===
- Use MAIÚSCULAS para dias da semana
- Mantenha linhas curtas e bem organizadas

${dadosObjetivo}

DADOS DOS TREINOS ANTERIORES:
${dadosTreinos}

ESTRUTURA OBRIGATÓRIA DA RESPOSTA:

=== ANÁLISE DOS TREINOS ANTERIORES ===

Volume Total Semanal:
[Análise do volume acumulado]

Padrão de Intensidade:
[Análise das intensidades]

Pontos Fortes Observados:
- [Ponto forte 1]
- [Ponto forte 2]
- [Ponto forte 3]

Áreas de Atenção:
- [Área 1 com explicação]
- [Área 2 com explicação]
- [Área 3 com explicação]

${goal ? `\n=== ALINHAMENTO COM O OBJETIVO ===\n\n[Análise de como o plano semanal está alinhado com o objetivo: ${goal.tipo}${goal.detalhes ? ' - ' + goal.detalhes : ''}]\n[Explicação de como os treinos propostos vão contribuir para alcançar este objetivo]\n[Métricas ou marcos que indicam progresso em direção ao objetivo]\n` : ''}

=== PLANO SEMANAL DE TREINO ===

SEGUNDA-FEIRA

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos - ex: 10 min caminhada + 5 min trote leve]
- Parte Principal: [detalhes do treino principal com série, repetições, intensidades]
- Desaquecimento: [detalhes - ex: 5 min trote leve + alongamentos]

Dicas Específicas:
[Dica personalizada para este treino, focada em técnica, precauções ou otimização]


TERÇA-FEIRA

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos]
- Parte Principal: [detalhes do treino principal]
- Desaquecimento: [detalhes]

Dicas Específicas:
[Dica personalizada para este treino]


QUARTA-FEIRA

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos]
- Parte Principal: [detalhes do treino principal]
- Desaquecimento: [detalhes]

Dicas Específicas:
[Dica personalizada para este treino]


QUINTA-FEIRA

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos]
- Parte Principal: [detalhes do treino principal]
- Desaquecimento: [detalhes]

Dicas Específicas:
[Dica personalizada para este treino]


SEXTA-FEIRA

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos]
- Parte Principal: [detalhes do treino principal]
- Desaquecimento: [detalhes]

Dicas Específicas:
[Dica personalizada para este treino]


SÁBADO

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos]
- Parte Principal: [detalhes do treino principal]
- Desaquecimento: [detalhes]

Dicas Específicas:
[Dica personalizada para este treino]


DOMINGO

Objetivo: [objetivo específico do dia]

Duração/Distância: [tempo ou km]

Pace Sugerido: [ritmo em min/km ou faixa de esforço]

Descrição:
- Aquecimento: [detalhes específicos]
- Parte Principal: [detalhes do treino principal]
- Desaquecimento: [detalhes]

Dicas Específicas:
[Dica personalizada para este treino]


=== DICAS E RECOMENDAÇÕES PARA A SEMANA ===

NUTRIÇÃO:

Pre-Treino:
[Dica específica com exemplos práticos e timing]

Hidratação:
[Orientações detalhadas sobre quantidade e frequência]

Recuperação Nutricional:
[Janela anabólica, combinações ideais de nutrientes]


RECUPERAÇÃO:

Importância do Sono:
[Explicação sobre quantidade, qualidade e impacto no desempenho]

Alongamento e Mobilidade:
[Rotina sugerida com grupos musculares prioritários]

Massagem e Liberação Miofascial:
[Técnicas e áreas de foco]


TÉCNICA DE CORRIDA:

Postura:
[Descrição detalhada da postura ideal]

Cadência:
[Orientação sobre passos por minuto e como trabalhar isso]

Respiração:
[Padrões respiratórios e técnicas]


PREVENÇÃO DE LESÕES:

Fortalecimento Específico:
[Exercícios prioritários e frequência recomendada]

Sinais de Alerta:
[Como identificar e o que fazer]

Quando Descansar:
[Critérios claros para descanso adicional]


PROGRESSÃO:

Próximas Semanas:
[Plano de evolução gradual baseado nos dados atuais${goal ? ' e alinhado com o objetivo' : ''}]

Metas de Médio Prazo:
[Objetivos para 4-8 semanas${goal ? ' considerando: ' + goal.tipo : ''}]

Variáveis para Ajustar:
[Elementos que podem ser modificados conforme evolução]


=== RESUMO DA SEMANA ===

- Volume Total Previsto: [X km]
- Dias de Treino: [X dias]
- Dia(s) de Descanso: [dia(s)]
- Foco Principal: [objetivo macro da semana]
- Intensidade Média: [baixa/moderada/alta]


=== OBSERVAÇÕES IMPORTANTES ===

1. [Observação personalizada sobre progressão]

2. [Cuidado específico baseado nos dados fornecidos]

3. [Ajuste recomendado]

4. [Ponto de atenção crítico]


=== CRÉDITOS E AVISOS ===

Este plano foi gerado pelo Plan Run, um aplicativo de auxílio ao treinamento de corrida.

AVISO IMPORTANTE: Este plano é uma sugestão baseada em dados gerais e não substitui o acompanhamento de profissionais qualificados. Para um treino verdadeiramente personalizado e seguro, consulte:
- Educador Físico especializado em corrida
- Médico do Esporte para avaliação física completa
- Nutricionista esportivo para orientação alimentar adequada
- Fisioterapeuta em caso de lesões ou desconfortos

A prática de atividade física deve sempre ser iniciada e acompanhada por profissionais de saúde.


Plan Run - Seu companheiro de treino inteligente`;
}

function formatGoalData(goal?: TrainingGoal): string {
  if (!goal || !goal.tipo) {
    return '';
  }

  let goalText = `OBJETIVO DO CORREDOR:\n`;
  goalText += `- Tipo: ${goal.tipo}\n`;

  if (goal.detalhes && goal.detalhes.trim() !== '') {
    goalText += `- Detalhes: ${goal.detalhes}\n`;
  }

  goalText += `\nIMPORTANTE: Leve em consideração este objetivo ao criar o plano. Todos os treinos devem estar alinhados com este objetivo específico.\n`;

  return goalText;
}

function formatTrainingData(trainings: Training[]): string {
  if (trainings.length === 0) {
    return 'Nenhum treino registrado na semana anterior.';
  }

  return trainings
    .map((t, index) => `
DIA ${index + 1} - ${t.dia}:
- Tempo: ${t.tempoMinutos || 'Não informado'} minutos
- Pace: ${t.pace || 'Não informado'} min/km
- Distância: ${t.distanciaKm || 'Não informado'} km
- Tipo: ${t.tipo || 'Não informado'}
- Observações: ${t.observacoes || 'Nenhuma'}
`)
    .join('\n');
}

export function hasValidTrainings(trainings: Training[]): boolean {
  return trainings.some(t => t.tempoMinutos || t.distanciaKm);
}
