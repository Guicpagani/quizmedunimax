'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Importa a fonte Great Vibes
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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative">
      {/* Barra de anúncio superior */}
      <div className="w-full bg-gray-100 text-center text-sm py-2 fixed top-0 z-20 animate-marquee whitespace-nowrap">
        🚀 We are going live today – 09/06/2025!
      </div>

      {/* Barra de navegação removida para evitar confusão com botões principais */}

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-10">
        <div className="mb-6">
          <Image
            src="/logo-medico-fundo-branco.png"
            alt="Logo QuizMedUnimax"
            width={300}
            height={300}
            priority
          />
        </div>

        <h2 className="text-3xl font-bold mb-4 text-center">Pronto para testar seus conhecimentos?</h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 text-center"
          >
            Entrar no Quiz
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg text-lg hover:bg-gray-300 text-center"
          >
            Registrar-se
          </Link>
        </div>

        <p className="text-sm italic text-gray-500 text-center max-w-xl px-4">
          &quot;Acreditei que a vida era muito curta para passar horas em frente aos livros e agora vou passar horas em frente ao Quizmed&quot;. 
          Não se iluda, você foi mais preguiçoso que o cara que fez a bandeira do Japão. 
          Lembre-se: Estude para aprender, não só para passar.
        </p>
      </main>

      {/* Rodapé fixo com Admin e assinatura */}
      <footer className="absolute bottom-4 right-4 flex flex-col items-end space-y-2 text-sm">
        <Link
          href="/admin"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Admin
        </Link>
        <p className={`${greatVibes.className} text-xl text-gray-600`}>developed by Pagani</p>
      </footer>
    </div>
  );
}
