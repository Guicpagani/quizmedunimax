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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setUserChecked(true);
    });
    return () => unsubscribe();
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
      
      {/* Faixa superior de anúncio (cinza claro e animada) */}
      <div className="w-full bg-gray-100 text-gray-800 font-medium text-sm py-1 px-4 overflow-hidden fixed top-0 z-50 border-b">
        <div className="animate-marquee whitespace-nowrap">
          🚀 We are going live today – 9 de junho de 2025 &nbsp;&nbsp;&nbsp; 🚀 We are going live today – 9 de junho de 2025 &nbsp;&nbsp;&nbsp; 🚀 We are going live today – 9 de junho de 2025
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-10 relative">
        <h2 className="text-4xl font-bold mb-4 text-center">Bem-vindo ao Quizmedmax</h2>

        <p className="text-sm italic text-gray-600 text-center max-w-2xl mb-6">
          &quot;Acreditei que a vida era muito curta para passar horas em frente aos livros e agora vou passar horas em frente ao Quizmed&quot;. 
          Não se iluda, você foi mais preguiçoso que o cara que fez a bandeira do Japão. 
          Lembre-se: Estude para aprender, não só para passar.
        </p>

        <div className="mb-0">
          <Image
            src="/logo-medico-fundo-branco.png"
            alt="Logo QuizMedUnimax"
            width={200}
            height={200}
            priority
          />
        </div>

        {/* Removido o título "Pronto para testar seus conhecimentos?" */}
        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-col sm:flex-row gap-1">
            <Link href="/login">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                Entrar no Quiz
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all">
                Registrar-se
              </button>
            </Link>
          </div>
        </div>

        {/* Rodapé responsivo */}
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

      {/* Estilo da animação */}
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
      `}</style>
    </div>
  );
}




