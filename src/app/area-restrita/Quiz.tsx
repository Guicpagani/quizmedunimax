'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getQuizByTitle } from "../utils/getQuizData";

type Questao = {
  pergunta: string;
  alternativas: string[];
  correta: number;
  imagem?: string;
};
type QuizData = {
  title: string;
  data: Questao[];
};

export default function Quiz({ quizTitle }: { quizTitle: string }) {
  const quizData: QuizData | undefined = getQuizByTitle(quizTitle);
  const router = useRouter();

  // Estados...
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [resposta, setResposta] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);

  // IA
  const [showPainel, setShowPainel] = useState(false);
  const [loadingPainel, setLoadingPainel] = useState(false);
  const [respostaPainel, setRespostaPainel] = useState("");

  // Checagem segura
  if (!quizData || !Array.isArray(quizData.data) || quizData.data.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-lg">
        Quiz não encontrado ou sem perguntas!
      </div>
    );
  }

  const questao = quizData.data[questaoAtual];

  // ...restante igual ao seu!

  // Fim do quiz: Mostra resultado
  if (questaoAtual >= quizData.data.length) {
    const total = quizData.data.length;
    const percentual = Math.round((acertos / total) * 100);
    const aprovado = percentual >= 60;
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <div className={`text-2xl font-bold ${aprovado ? "text-green-600" : "text-red-600"}`}>
          {aprovado ? "Parabéns! Você foi aprovado!" : "Você não atingiu a média mínima."}
        </div>
        <div className="mt-6 text-lg">
          <strong>Acertos:</strong> {acertos} de {total}
        </div>
        <div className="text-lg mb-6">
          <strong>Percentual:</strong> {percentual}%
        </div>
        <button
          onClick={() => router.push('/area-restrita')}
          className="mt-4 px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-800 transition"
        >
          Voltar para as provas
        </button>
      </div>
    );
  }

  // ...restante igual ao seu!
}