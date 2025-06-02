'use client'

import Image from "next/image";
import Link from "next/link";
import { getAuth } from "firebase/auth";

export default function Home() {
  const user = getAuth().currentUser;
  const isAdmin = user && user.email === "guilherme.pagani449@al.unieduk.com.br";

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Barra de navegação fixa */}
      <header className="flex justify-between items-center px-6 py-4 border-b shadow-md bg-white fixed w-full z-10">
        <h1 className="text-xl font-bold">QuizMed Unimax</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-black-600 hover:underline">Login</Link>
          <Link href="/register" className="text-blue-600 hover:underline">Registrar</Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100"
            >
              Admin
            </Link>
          )}
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 pt-32 pb-10">
        <h2 className="text-3xl font-bold mb-2 text-center">Bem-vindo</h2>
        <p className="text-sm italic text-center text-gray-500 mb-6">
          "Acreditei que a vida era muito curta para passar horas em frente aos livros e agora vou passar horas em frente ao Quizmed". Não se iluda, você foi mais preguiçoso que o cara que fez a bandeira do Japão. Lembre-se: Estude para aprender, não só para passar.
        </p>

        {/* Logo com fundo branco */}
        <div className="mb-8">
          <Image
            src="/logo-medico-fundo-branco.png"
            alt="Logo QuizMedUnimax"
            width={300}
            height={300}
            priority
          />
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Developed by <span className="font-semibold">G. Pagani</span>
        </p>
      </main>
    </div>
  );
}
