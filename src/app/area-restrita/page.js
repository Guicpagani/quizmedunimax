'use client';
import { auth } from "../../firebase";
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Função utilitária para extrair o primeiro nome do e-mail
function getFirstNameFromEmail(email) {
  if (!email) return "";
  const namePart = email.split('@')[0];
  const firstName = namePart.split(/[.\-_]/)[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

// Lista de provas/quizzes com nome amigável
const quizzes = [
  { title: "SDC", label: "Teste de Chegada SDC" },
  { title: "SFC", label: "Teste de Chegada SFC" },
  { title: "Enfase", label: "Teste de Chegada Ênfase CC" },
  { title: "Laboratorio", label: "Teste de Chegada Laboratórios" }
];

export default function AreaRestrita() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUser(usuario);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  const nomeUsuario = getFirstNameFromEmail(user.email);

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8 px-2">
      {/* Saudação */}
      <h1 className="text-3xl font-semibold mb-8 text-[#202943]">Olá {nomeUsuario}!</h1>

      {/* Card principal */}
      <div className="bg-white shadow rounded-2xl p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-[#202943]">Minhas Provas</h2>
        <div className="divide-y">
          {quizzes.map((quiz) => (
            <div
              key={quiz.title}
              className="flex items-center justify-between py-4 px-2 bg-[#f8fafd] hover:bg-[#f0f4fa] rounded-xl my-3 shadow-sm transition"
            >
              <span className="text-base font-normal text-[#202943]">{quiz.label}</span>
              <button
                className="px-5 py-2 rounded bg-blue-500 text-white font-medium text-base hover:bg-blue-700 transition"
                onClick={() => router.push(`/area-restrita/quiz/${quiz.title}`)}
              >
                Iniciar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Botão de sair */}
      <button
        className="mt-10 px-5 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-colors"
        onClick={async () => {
          await signOut(auth);
          router.push('/login');
        }}
      >
        Sair
      </button>
    </div>
  );
}

