'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuizByTitle } from "../utils/getQuizData";
import { Questao } from "../types/types";

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

  useEffect(() => {
    if (originalData && originalData.length > 0) {
      const shuffled = shuffleArray(originalData);
      const limit = 100;
      const selecionadas = shuffled.slice(0, Math.min(limit, shuffled.length));
      setQuizData(selecionadas);
    }
  }, [originalData]);

  if (!quizData || quizData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-lg">
        Quiz não encontrado ou sem perguntas!
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerOptionClick = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correta;
    setRespostaPainel(
      isCorrect
        ? "✅ Resposta correta!"
        : `❌ Resposta incorreta. A correta era: ${currentQuestion.alternativas[currentQuestion.correta]}`
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
    } else {
      setShowScore(true);
    }
  };

  const handleBackToHome = () => {
    router.push("/area-restrita");
  };

  const total = quizData.length;
  const acertos = score;
  const erros = total - score;
  const percentualAcerto = Math.round((acertos / total) * 100);
  const percentualErro = 100 - percentualAcerto;
  const status = percentualAcerto >= 60 ? "✅ Aprovado" : "❌ Reprovado";

  const letras = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white p-6 pb-20 rounded-xl shadow-lg w-full max-w-[95rem] mx-auto px-4 sm:px-8">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Resultado Final</h2>
          <p className="text-lg mb-1">
            Acertos: {acertos} / {total} ({percentualAcerto}%)
          </p>
          <p className="text-lg mb-1">
            Erros: {erros} / {total} ({percentualErro}%)
          </p>
          <p
            className={`text-lg font-bold mt-4 ${
              percentualAcerto >= 60 ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
          <button
            onClick={handleBackToHome}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 text-right mb-2">
            Questão {currentQuestionIndex + 1} / {total}
          </p>

          <div className="mb-4">
            <h2 className="text-sm md:text-base font-medium text-gray-800 leading-relaxed text-justify">
              {currentQuestion.pergunta}
            </h2>
            {currentQuestion.imagem && (
              <img
                src={currentQuestion.imagem}
                alt="Imagem da pergunta"
                className="mt-4 rounded-lg max-w-full h-auto"
              />
            )}
          </div>

          <div className="space-y-2 flex flex-col items-center">
            {currentQuestion.alternativas.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index)}
                disabled={selectedOption !== null}
                className={`w-full max-w-md text-left px-4 py-2 border rounded font-medium transition text-sm md:text-base
                ${
                  selectedOption === index
                    ? index === currentQuestion.correta
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}
              >
                {letras[index]}); {option}
              </button>
            ))}
          </div>

          {respostaPainel && (
            <div className="mt-4 text-center font-medium text-gray-800">
              {respostaPainel}
            </div>
          )}

          {canAdvance && (
            <div className="mt-6 text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
              >
                Próxima pergunta
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
