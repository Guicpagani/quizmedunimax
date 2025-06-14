// Caminho do arquivo: src/app/api/explicar-quiz/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { question, alternatives, correctAnswerIndex } = await req.json();
    const correctAnswerText = alternatives[correctAnswerIndex];

    const prompt = `
      Você é um assistente de estudos de medicina chamado "Valéria Bot".
      Sua tarefa é explicar de forma clara e didática a seguinte questão de um quiz, incluindo o contexto do assunto e o motivo de cada alternativa ser correta ou incorreta.
      Use uma linguagem acessível para um estudante de medicina.

      **Questão:**
      "${question}"

      **Alternativas:**
      ${alternatives.map((alt, index) => `${String.fromCharCode(65 + index)}) ${alt}`).join('\n')}

      **Alternativa Correta:**
      ${String.fromCharCode(65 + correctAnswerIndex)}) ${correctAnswerText}

      **Siga esta estrutura para a sua resposta:**
      1.  **Contexto Geral:** Ofereça um parágrafo introdutório sobre o tema principal da questão.
      2.  **Análise da Alternativa Correta:** Explique em detalhes por que a alternativa "${correctAnswerText}" é a correta.
      3.  **Análise das Alternativas Incorretas:** Explique, uma por uma, por que as outras alternativas estão erradas.
    `;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const explanation = response.text();

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Erro na API /api/explicar-quiz:", error);
    return NextResponse.json({ error: 'Falha ao gerar a explicação.' }, { status: 500 });
  }
}