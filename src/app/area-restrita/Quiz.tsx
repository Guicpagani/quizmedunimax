'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuizByTitle } from "../utils/getQuizData";
import { Questao } from "../types/types";

// Função para embaralhar as questões
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz({ quizTitle }: { quizTitle: string }) {
  const quizDataWrapper = getQuizByTitle(quizTitle);
  const originalData: Questao[] | undefined = quizDataWrapper?.data?.data;

  const router = useRouter();

  const [quizData, setQuizData] = useState<Questao[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [respostaPainel, setRespostaPainel] = useState("");
  const [canAdvance, setCanAdvance] = useState(false);

  // --- NOVOS ESTADOS PARA O VALÉRIA BOT ---
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  // -----------------------------------------

  useEffect(() => {
    if (originalData && originalData.length > 0) {
      const shuffled = shuffleArray(originalData);
      const limit = 100;
      const selecionadas = shuffled.slice(0, Math.min(limit, shuffled.length));
      setQuizData(selecionadas);
    }
  }, [originalData]);

  const currentQuestion = quizData[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-lg">
        Carregando quiz...
      </div>
    );
  }

  const handleAnswerOptionClick = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correta;
    setRespostaPainel(
      isCorrect
        ? "✅ Resposta correta!"
        : `❌ Resposta incorreta. A correta era: ${letras[currentQuestion.correta]}) ${currentQuestion.alternativas[currentQuestion.correta]}`
    );
    if (isCorrect) {
      setScore(score + 1);
    }
    setCanAdvance(true);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setRespostaPainel("");
      setCanAdvance(false);
      // Limpa a explicação anterior ao avançar
      setExplanation("");
    } else {
      setShowScore(true);
    }
  };

  const handleBackToHome = () => {
    router.push("/area-restrita");
  };

  // --- NOVA FUNÇÃO PARA CHAMAR O VALÉRIA BOT ---
  const handleExplainQuestion = async () => {
    setIsLoadingExplanation(true);
    setShowExplanationModal(true);
    setExplanation(""); // Limpa a explicação anterior

    try {
      const response = await fetch('/api/explicar-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion.pergunta,
          alternatives: currentQuestion.alternativas,
          correctAnswerIndex: currentQuestion.correta,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data = await response.json();
      setExplanation(data.explanation);

    } catch (error) {
      console.error("Erro ao buscar explicação:", error);
      setExplanation("Desculpe, não consegui gerar a explicação no momento. Tente novamente.");
    } finally {
      setIsLoadingExplanation(false);
    }
  };
  // -------------------------------------------

  const total = quizData.length;
  const acertos = score;
  const erros = total - score;
  const percentualAcerto = total > 0 ? Math.round((acertos / total) * 100) : 0;
  const percentualErro = 100 - percentualAcerto;
  const status = percentualAcerto >= 60 ? "✅ Aprovado" : "❌ Reprovado";
  const letras = ['A', 'B', 'C', 'D'];

  return (
    <div className="relative bg-white p-6 pb-20 rounded-xl shadow-lg w-full max-w-[95rem] mx-auto px-4 sm:px-8">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Resultado Final</h2>
          <p className="text-lg mb-1">Acertos: {acertos} / {total} ({percentualAcerto}%)</p>
          <p className="text-lg mb-1">Erros: {erros} / {total} ({percentualErro}%)</p>
          <p className={`text-xl font-bold mt-4 ${percentualAcerto >= 60 ? "text-green-600" : "text-red-600"}`}>{status}</p>
          <button onClick={handleBackToHome} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voltar</button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 text-right mb-2">Questão {currentQuestionIndex + 1} / {total}</p>
          <div className="mb-4">
            <h2 className="text-base md:text-lg font-medium text-gray-800 leading-relaxed text-justify">{currentQuestion.pergunta}</h2>
            {currentQuestion.imagem && <img src={currentQuestion.imagem} alt="Imagem da pergunta" className="mt-4 rounded-lg max-w-full h-auto" />}
          </div>
          <div className="space-y-3 flex flex-col items-center">
            {currentQuestion.alternativas.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index)}
                disabled={selectedOption !== null}
                className={`w-full max-w-2xl text-left px-4 py-3 border rounded-lg font-medium transition text-sm md:text-base shadow-sm
                ${ selectedOption === index ? (index === currentQuestion.correta ? "bg-green-500 border-green-600 text-white" : "bg-red-500 border-red-600 text-white") : "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300" }`}
              >
                <span className="font-bold">{letras[index]})</span> {option}
              </button>
            ))}
          </div>

          {respostaPainel && <div className="mt-4 text-center font-semibold text-gray-800 p-3 bg-gray-100 rounded-lg">{respostaPainel}</div>}

          {canAdvance && (
            <div className="mt-6 text-center flex justify-center items-center flex-wrap gap-4">
              <button onClick={handleNextQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105">Próxima pergunta</button>
              {/* --- BOTÃO VALÉRIA BOT --- */}
              <button onClick={handleExplainQuestion} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center gap-2">
                <span role="img" aria-label="robô">🤖</span> Valéria Bot Explica
              </button>
              {/* ------------------------- */}
            </div>
          )}
        </>
      )}

      {/* --- MODAL DA EXPLICAÇÃO --- */}
      {showExplanationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><span role="img" aria-label="robô">🤖</span> Explicação do Valéria Bot</h3>
              <button onClick={() => setShowExplanationModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
            </div>
            {isLoadingExplanation ? (
              <p className="text-center text-gray-600">Carregando explicação...</p>
            ) : (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: explanation.replace(/\*\*/g, '<strong>').replace(/\*/g, '<em>') }}>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ------------------------- */}
    </div>
  );
}
