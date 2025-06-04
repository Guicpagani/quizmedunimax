"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getQuizByTitle } from "../utils/getQuizData";
import { Questao } from "../types/types";

export default function Quiz({ quizTitle }: { quizTitle: string }) {
  const quizDataWrapper = getQuizByTitle(quizTitle);
  const quizData: Questao[] | undefined = quizDataWrapper?.data?.data;

  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [respostaPainel, setRespostaPainel] = useState("");
  const [canAdvance, setCanAdvance] = useState(false);

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

    // Habilita o botão de avançar
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

  // 📊 Cálculo da pontuação final
  const total = quizData.length;
  const acertos = score;
  const erros = total - score;
  const percentualAcerto = Math.round((acertos / total) * 100);
  const percentualErro = 100 - percentualAcerto;
  const status = percentualAcerto >= 60 ? "✅ Aprovado" : "❌ Reprovado";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
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
          <div className="space-y-2">
            {currentQuestion.alternativas.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index)}
                disabled={selectedOption !== null}
                className={`w-full text-left px-4 py-2 border rounded ${
                  selectedOption === index
                    ? index === currentQuestion.correta
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {respostaPainel && (
            <div className="mt-4 text-center font-medium">{respostaPainel}</div>
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

