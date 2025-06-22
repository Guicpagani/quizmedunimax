'use client'; // Necessário para componentes que usam hooks ou interatividade no App Router

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardResultados() {
  const [topErrors, setTopErrors] = useState<{ topic: string, errors: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Tenta carregar os resultados do localStorage
    const storedResultsJson = localStorage.getItem('quizErrorsByTopic');
    if (storedResultsJson) {
      const storedResults = JSON.parse(storedResultsJson);

      // Converte o objeto de { "topico1": 5, "topico2": 3 } para um array de objetos [{ topic: "topico1", errors: 5 }]
      const topicArray = Object.keys(storedResults).map(topic => ({
        topic,
        errors: storedResults[topic]
      }));

      // Ordena o array por número de erros (do maior para o menor)
      // e pega os Top 10 (ou quantos existirem se for menos de 10)
      const sortedTopErrors = topicArray.sort((a, b) => b.errors - a.errors).slice(0, 10);
      setTopErrors(sortedTopErrors);
    }
  }, []); // O array vazio [] como dependência faz com que este useEffect rode apenas uma vez ao montar o componente

  // Função para limpar os dados do dashboard (opcional, mas útil para testes)
  const handleClearData = () => {
    localStorage.removeItem('quizErrorsByTopic');
    setTopErrors([]); // Limpa o estado para refletir a remoção
    alert('Dados do dashboard limpos! Faça mais quizzes para atualizar.');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-2xl p-6">
        <h1 className="text-3xl font-semibold mb-6 text-[#202943] text-center">Meu Dashboard de Estudos</h1>

        {topErrors.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Nenhum dado de erro disponível ainda. Faça alguns quizzes para começar!</p>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-[#343a40] text-center">Top 10 Tópicos para Focar</h2>
            <ul className="list-none p-0">
              {topErrors.map((item, index) => (
                <li key={item.topic} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-3 shadow-sm">
                  <span className="text-lg font-medium text-gray-800">
                    {index + 1}. {item.topic}
                  </span>
                  <span className="text-xl font-bold text-red-600">{item.errors} erros</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push('/area-restrita')}
            className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md"
          >
            Voltar para Provas
          </button>
          {/* Botão de limpar dados, visível apenas se houver dados */}
          {topErrors.length > 0 && (
            <button
              onClick={handleClearData}
              className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md"
            >
              Limpar Dados do Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}