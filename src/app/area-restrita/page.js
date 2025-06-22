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
  { title: "Laboratorio", label: "Teste de Chegada Laboratórios" },
  { title: "SFC_pmsus", label: "Teste de Chegada SFC_pmsus" }
];

export default function AreaRestrita() {
  const [user, setUser] = useState(null);
  const [isNoticeModalOpen, setNoticeModalOpen] = useState(true);
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
  }, [router]);

  const handleCloseNoticeModal = () => {
    setNoticeModalOpen(false);
  };

  if (!user) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  const nomeUsuario = getFirstNameFromEmail(user.email);

  return (
    <>
      {/* Modal de Aviso */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          {/* MUDANÇA 1: Adicionado max-h-[90vh] para limitar a altura do modal */}
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 max-w-2xl w-full flex flex-col max-h-[90vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Uma mensagem da nossa equipe</h2>
            
            {/* MUDANÇA 2: Adicionado overflow-y-auto para criar a barra de rolagem APENAS no texto */}
            <div className="text-gray-600 space-y-4 text-left flex-grow overflow-y-auto pr-4">
              <p>
                Sabemos que essa reta final exige foco e força, e estamos com você.
              </p>
              <p>
                Conseguimos entregar boa parte do conteúdo para SFC, PMSUS — obrigado por caminhar com a gente até aqui!
              </p>
              <p>
                Mas nem tudo são glicoses normais: um bug técnico (ainda sob análise por um comitê de ornitorrincos altamente treinados) impediu a liberação completa das questões de Clínica Cirúrgica e algumas específicas de rastreamento e AR infantil. Pedimos desculpas por isso — sabemos que faz falta, mas não teremos tempo o suficiente para solucionar, com tudo, confiamos no seu potencial.
              </p>
               <p>
                Aproveitamos também para agradecer a compreensão a quem associou seu nome como parte de atrativo utilizados em algumas questões. A proposta foi promover atenção, motivação e leveza diante de um conteúdo denso e desafiador.
              </p>
              <p>
                A partir de julho iremos trabalhar no botão meu dashboard (já possível visualizar após finalizar o teste de Pmsus) a ideia é você entender qual tópico ainda está deficiente nos estudos. Logo nossa plataforma será aprimorada com mais estabilidade, mais conteúdo e ainda mais cuidado com você.
              </p>
              <p className="font-bold text-gray-700 pt-2">
                Você não está sozinho. Estamos com você até o fim. Boa prova!
              </p>
            </div>
            <div className="mt-6 text-right font-semibold text-gray-700">
                <p>– Equipe QuizMadMax 🧠💥</p>
            </div>
            <div className="mt-4 flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={handleCloseNoticeModal}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Página Principal */}
      <div className="min-h-screen bg-[#f5f7fa] py-8 px-4 sm:px-8">
        {/* Saudação */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-[#202943]">Olá {nomeUsuario}!</h1>
        </div>

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

        {/* Botões de Ação */}
        <div className="max-w-4xl mx-auto mt-10 flex items-center gap-4">
          <button
            className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-colors"
            onClick={async () => {
              await signOut(auth);
              router.push('/login');
            }}
          >
            Sair
          </button>
          <button
            className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-colors"
            onClick={() => router.push('/area-restrita/dashboard')}
          >
            Meu Dashboard
          </button>
        </div>
      </div>
    </>
  );
}