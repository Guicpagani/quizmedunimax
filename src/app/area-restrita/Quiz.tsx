'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getQuizByTitle } from "../utils/getQuizData";

// >>>>> ADICIONE ESSES TIPOS NO TOPO <<<<<
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
  // >>>> DEFINA O TIPO DO RETORNO <<<<
  const quizData: QuizData | undefined = getQuizByTitle(quizTitle);
  const router = useRouter();

  // Estados para quiz
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [resposta, setResposta] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);

  // Estados do painel IA
  const [showPainel, setShowPainel] = useState(false);
  const [loadingPainel, setLoadingPainel] = useState(false);
  const [respostaPainel, setRespostaPainel] = useState("");

  // >>>> CORRIJA A CONDICIONAL DE EXISTÊNCIA <<<<
  if (!quizData || !quizData.data || quizData.data.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-lg">
        Quiz não encontrado ou sem perguntas!
      </div>
    );
  }

  const questao = quizData.data[questaoAtual];

  function handleResponder(idx: number) {
    setResposta(idx);
    setRespondido(true);
    const correta = idx === (questao.correta - 1);
    setAcertou(correta);
    if (correta) setAcertos((prev) => prev + 1);
  }

  function handleAvancar() {
    setResposta(null);
    setRespondido(false);
    setAcertou(null);
    setQuestaoAtual((prev) => prev + 1);
  }

  function handleVoltar() {
    router.push('/area-restrita');
  }

  // Chamada para IA
  async function handlePerguntarAoMedmaxGPT() {
    setShowPainel(true);
    setLoadingPainel(true);
    setRespostaPainel("Carregando explicação...");
    try {
      const resp = await fetch('/api/medmaxgpt', {
        method: 'POST',
        body: JSON.stringify({
          pergunta: questao.pergunta,
          resposta: resposta !== null
            ? questao.alternativas[resposta]
            : "Nenhuma alternativa marcada"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await resp.json();
      setRespostaPainel(data.explicacao || data.error || "Não foi possível obter explicação.");
    } catch (err) {
      setRespostaPainel("Erro ao conectar ao medmaxGPT.");
    }
    setLoadingPainel(false);
  }

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
          onClick={handleVoltar}
          className="mt-4 px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-800 transition"
        >
          Voltar para as provas
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 relative">
      {/* Painel IA lateral */}
      {showPainel && (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg border-l z-50 p-6 flex flex-col animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-700">Explicação do medmaxGPT</h3>
            <button onClick={() => setShowPainel(false)} className="text-xl font-bold hover:text-red-600">×</button>
          </div>
          <div className="flex-1 overflow-auto whitespace-pre-line text-gray-900">
            {loadingPainel ? (
              <div className="animate-pulse text-gray-500">Carregando explicação...</div>
            ) : (
              respostaPainel
            )}
          </div>
        </div>
      )}

      {/* Pergunta e alternativas */}
      <div className="mb-4 text-lg font-medium">
        Pergunta {questaoAtual + 1} de {quizData.data.length}
      </div>
      <div className="mb-6 text-xl font-semibold">{questao.pergunta}</div>
      <div className="space-y-3">
        {questao.alternativas.map((alt, idx) => (
          <button
            key={alt}
            disabled={respondido}
            className={`
              w-full text-left px-4 py-3 rounded-md border transition
              ${respondido && idx === resposta && idx === (questao.correta - 1) ? "bg-green-200 border-green-600 font-bold" : ""}
              ${respondido && idx === resposta && idx !== (questao.correta - 1) ? "bg-red-200 border-red-600 font-bold" : ""}
              ${!respondido ? "hover:bg-blue-100 border-gray-300" : "border-gray-200"}
              `}
            onClick={() => handleResponder(idx)}
          >
            <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)})</span> {alt}
          </button>
        ))}
      </div>

      {respondido && (
        <>
          <div className={`mt-6 text-lg font-bold ${acertou ? "text-green-700" : "text-red-700"}`}>
            {acertou ? "Correto!" : <>Incorreto. Resposta correta: <span className="underline">{questao.alternativas[questao.correta - 1]}</span></>}
          </div>
          <button
            onClick={handleAvancar}
            className="mt-6 mr-4 px-8 py-3 rounded bg-blue-600 text-white font-semibold text-base hover:bg-blue-800 transition"
          >
            Avançar
          </button>
          <button
            onClick={handlePerguntarAoMedmaxGPT}
            className="mt-6 px-6 py-3 rounded bg-purple-600 text-white font-semibold text-base hover:bg-purple-800 transition"
          >
            Perguntar ao medmaxGPT
          </button>
        </>
      )}
    </div>
  );
}