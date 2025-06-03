'use client';
import React from "react";
import Quiz from '../../Quiz';

export default function QuizPage({ params }) {
  // Pega quizTitle do params da nova forma recomendada pelo Next.js 15+
  const { quizTitle } = React.use(params);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#f5f7fa] py-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <Quiz quizTitle={quizTitle} />
      </div>
    </div>
  );
}