'use client';

import { use } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Quiz from '../../Quiz';

export default function QuizPage(props) {
  const { quizTitle } = use(props.params);
  const router = useRouter();

  useEffect(() => {
    const blockCopy = (e) => e.preventDefault();
    const blockContext = (e) => e.preventDefault();
    const blockSelect = () => {
      document.body.style.userSelect = "none";
    };

    document.addEventListener("copy", blockCopy);
    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("selectstart", blockSelect);

    const blockKeys = (e) => {
      const key = e.key.toLowerCase();
      if (
        key === 'printscreen' ||
        (e.ctrlKey && key === 'u') ||
        (e.ctrlKey && key === 'c') ||
        key === 'f12' ||
        (e.ctrlKey && e.shiftKey && key === 'i')
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("selectstart", blockSelect);
      window.removeEventListener("keydown", blockKeys);
      document.body.style.userSelect = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#f5f7fa] py-8 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 pb-20 w-full max-w-[95rem] sm:px-8">

        {/* Botão de Voltar */}
        <button
          onClick={() => router.push('/area-restrita')}
          className="mb-6 text-sm text-blue-600 hover:underline bg-gray-100 px-4 py-2 rounded-xl shadow"
        >
          ← Voltar para o menu principal
        </button>

        <Quiz quizTitle={quizTitle} />
      </div>
    </div>
  );
}