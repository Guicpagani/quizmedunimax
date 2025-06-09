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
      console.log('onAuthStateChanged:', u);
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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      
      {/* Faixa de aviso superior */}
      <div className="w-full bg-gray-100 text-center py-1 text-sm text-gray-700 font-semibold shadow-sm fixed top-0 z-50 animate-pulse">
        🚀 We are going live: 09/06/2025
      </div>

      {/* Conteúdo principal com padding compensando a faixa superior */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 pt-20 pb-10">

        <h2 className="text-3xl font-bold mb-2 text-center">Bem-vindo ao QuizMedmax</h2>

        <p className="text-sm italic text-gray-600 text-center mb-6 max-w-xl">
          "Acreditei que a vida era muito curta para passar horas em frente aos livros e agora vou passar horas em frente ao Quizmed".
          Não se iluda, você foi mais preguiçoso que o cara que fez a bandeira do Japão.
          Lembre-se: Estude para aprender, não só para passar.
        </p>

        <div className="mb-6">
          <Image
            src="/logo-medico-fundo-branco.png"
            alt="Logo QuizMedUnimax"
            width={300}
            height={300}
            priority
          />
        </div>

        {/* Bloco de ações de login/registro */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <h3 className="text-lg font-semibold mb-2 text-center">Pronto para testar seus conhecimentos?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/login">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Entrar no Quiz
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                Registrar-se
              </button>
            </Link>
          </div>
        </div>

        {/* Rodapé fixo lateral inferior direita em telas maiores, central em mobile */}
        <div className="flex flex-col items-center sm:items-end sm:absolute sm:bottom-4 sm:right-4 text-sm text-gray-600">
          <p className="mb-1">
            Developed by <span className={`${greatVibes.className} text-xl`}>pagani</span>
          </p>
          <Link
            href="/admin"
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
          >
            Admin
          </Link>
        </div>

      </main>
    </div>
  );
}
