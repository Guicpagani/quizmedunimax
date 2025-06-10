'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Fonte personalizada
import { Great_Vibes } from 'next/font/google';
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });

export default function Home() {
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false);
  const [mensagemIndex, setMensagemIndex] = useState(0);

  const mensagens = [
    "📢 Todos os dias novas questões atualizadas",
    "🧠 Novas questões de ênfase CC ⬆️",
    "🧪 Novas questões laboratórios ⬆️",
    "🚧 Estamos trabalhando no upload de SFC e SDC",
    "🔁 Cada acesso exibe 40 questões aleatórias",
    "📩 Você pode ajudar o administrador reportando questões incorretas"
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setUserChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMensagemIndex((prev) => (prev + 1) % mensagens.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!userChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative overflow-hidden">

      {/* Faixa superior de anúncio */}
      <div className="w-full bg-gray-100 text-gray-800 font-medium text-sm py-1 px-4 overflow-hidden fixed top-0 z-50 border-b">
        <div className="animate-marquee whitespace-nowrap">
          🚀 We went live – 9 de junho de 2025 &nbsp;&nbsp;&nbsp; 🚀 We went live – 9 de junho de 2025 &nbsp;&nbsp;&nbsp; 🚀 We went live – 9 de junho de 2025
        </div>
      </div>

      <main className="flex flex-col items-center justify-center flex-1 px-4 pt-28 pb-10 relative space-y-6">

        {/* Citação */}
        <p className="text-sm italic text-gray-600 text-center max-w-2xl">
          &quot;Acreditei que a vida era muito curta para passar horas em frente aos livros e agora vou passar horas em frente ao Quizmed&quot;.
          Não se iluda, você foi mais preguiçoso que o cara que fez a bandeira do Japão.
          Lembre-se: Estude para aprender, não só para passar.
        </p>

        {/* Botões de acesso */}
        <div className="flex flex-col sm:flex-row gap-2 mt-2 items-center">
          <Link href="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md">
              Entrar no Quiz
            </button>
          </Link>
          <Link href="/register">
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-md">
              Registrar-se
            </button>
          </Link>
        </div>

        {/* Logo centralizado */}
        <Image
          src="/logo-medico-fundo-branco.png"
          alt="Logo QuizMedUnimax"
          width={180}
          height={180}
          priority
        />

        {/* Card refinado com animação */}
        <div className="relative w-60 h-60 overflow-hidden">
          <div
            key={mensagens[mensagemIndex]}
            className="absolute inset-0 flex items-center justify-center text-center text-sm text-gray-800 bg-white rounded-3xl shadow-xl drop-shadow-md p-4 transition-transform duration-[2500ms] ease-in-out animate-slide-in"
          >
            {mensagens[mensagemIndex]}
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-8 text-center space-y-2 sm:absolute sm:bottom-4 sm:right-4 sm:text-right">
          <p className="text-sm text-gray-600">
            Developed by <span className={`${greatVibes.className} text-2xl`}>pagani</span>
          </p>
          <Link
            href="/admin"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Admin
          </Link>
        </div>
      </main>

      {/* Estilos */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }

        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }

        .animate-slide-in {
          animation: slideIn 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}




