import type { VercelRequest, VercelResponse } from '@vercel/node';
import type {GeneratePlanRequest, GeneratePlanResponse, ErrorResponse, GeminiResponse, GeminiRequest} from './types';
import { buildPrompt, hasValidTrainings } from './buildPrompt';

const GEMINI_API_KEY = process.env['GEMINI_API_KEY'];
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';


type TypedResponse<T> = VercelResponse & { json: (body: T) => void };

export default async function handler(
  req: VercelRequest,
  res: TypedResponse<GeneratePlanResponse | ErrorResponse>
) {

  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ===== VALIDAÇÃO DO MÉTODO HTTP =====
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido. Use POST.'
    });
  }

  try {
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY não configurada nas variáveis de ambiente!');
      return res.status(500).json({
        error: 'Configuração do servidor incompleta. Entre em contato com o suporte.'
      });
    }


    const { trainings, goal } = req.body as GeneratePlanRequest;

    console.log('Dados recebidos:', {
      trainings: trainings?.length || 0,
      hasGoal: !!goal?.tipo
    });

    if (!trainings || !Array.isArray(trainings)) {
      return res.status(400).json({
        error: 'Dados de treino inválidos. Envie um array de treinos.'
      });
    }

    if (!hasValidTrainings(trainings)) {
      return res.status(400).json({
        error: 'Nenhum treino válido encontrado. Preencha pelo menos um treino.'
      });
    }
    const prompt = buildPrompt(trainings, goal);
    console.log('Prompt construído com sucesso');

    if (goal?.tipo) {
      console.log(`Objetivo incluído: ${goal.tipo}`);
    }

    // ===== CHAMADA À API DO GEMINI =====
    const plan = await callGeminiApi(prompt);

    // ===== RETORNO DE SUCESSO =====
    return res.status(200).json({ plan });

  } catch (error: any) {
    console.error('Erro ao gerar plano:', error);

    return res.status(500).json({
      error: 'Erro ao gerar plano de treino. Tente novamente.',
      details: error.message
    });
  }
}

function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
} // lembrar de trocar para o link do sistema em prod

async function callGeminiApi(prompt: string): Promise<string> {
  const requestBody: GeminiRequest = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  console.log('Chamando API do Gemini...');

  const response = await fetch(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na API do Gemini:', errorData);

    if (response.status === 429) {
      throw new Error('Limite de requisições excedido. Tente novamente em alguns minutos.');
    }

    if (response.status === 401) {
      throw new Error('API Key inválida. Verifique a configuração.');
    }

    throw new Error(errorData.error?.message || 'Erro ao comunicar com a API do Gemini');
  }

  const data: GeminiResponse = await response.json();

  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    throw new Error('Resposta da API do Gemini em formato inválido');
  }

  const planText = data.candidates[0].content.parts[0].text;
  console.log('Plano gerado com sucesso');

  return planText;
}
