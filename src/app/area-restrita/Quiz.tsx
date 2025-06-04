"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getQuizByTitle } from "../utils/getQuizData";
import { Questao } from "../types/types";

export default function Quiz({ quizTitle }: { quizTitle: string }) {
  const quizWrapper = getQuizByTitle(quizTitle);
  const quizData: Questao[] | undefined = quizWrapper?.data;

  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [respostaPainel, setRespostaPainel] = useState("");

  if (!quizData || quizData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center text-lg">
        Quiz não encontrado ou sem perguntas!
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerOptionClick = (index: number) => {
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
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedOption(null);
        setRespostaPainel("");
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const handleBackToHome = () => {
    router.push("/area-restrita");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Você acertou {score} de {quizData.length} perguntas!
          </h2>
          <button
            onClick={handleBackToHome}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            <div className="mt-4 text-center font-medium">
              {respostaPainel}
            </div>
          )}
        </>
      )}
    </div>
  );
}
