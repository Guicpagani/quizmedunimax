'use client';
import { auth } from '@/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AreaRestrita() {
  const [user, setUser] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('SDC');
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

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'SDC':
        return <p>Aqui vai o quiz da aba <strong>SDC</strong>.</p>;
      case 'SFC':
        return <p>Aqui vai o quiz da aba <strong>SFC</strong>.</p>;
      case 'Ênfase':
        return <p>Aqui vai o quiz da aba <strong>Ênfase</strong>.</p>;
      case 'Laboratórios':
        return <p>Aqui vai o quiz da aba <strong>Laboratórios</strong>.</p>;
      default:
        return null;
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Área Restrita</h1>
      <p>Bem-vindo, <strong>{user.email}</strong>!</p>

      {/* Mensagem importante */}
      <div className="bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded-md">
        📢 <strong>Aviso:</strong> Após a validação do pagamento, o curso será liberado.
      </div>

      {/* Aviso fixo acima das abas */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-md">
        <p className="font-semibold mb-2">💬 Informações de doação:</p>
        <p>Valores sugeridos: <strong>50 a 75 reais</strong>.</p>
        <p>Enviar comprovante para: <strong>gcp_t@hotmail.com</strong></p>
        <p className="mt-4 font-semibold">📋 Programas selecionados (Não são parceiros):</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            📷 Instagram:{' '}
            <a
              href="https://www.instagram.com/anjosdepatasindaiatuba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @anjosdepatasindaiatuba
            </a>
          </li>
          <li>
            📷 Instagram:{' '}
            <a
              href="https://www.instagram.com/acaomawe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @acaomawe
            </a>
          </li>
          <li>
            🌐 Instituto Ayrton Senna:{' '}
            <a
              href="https://institutoayrtonsenna.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              institutoayrtonsenna.org.br
            </a>
          </li>
        </ul>
      </div>

      {/* Menu de abas */}
      <div className="flex gap-4 flex-wrap">
        {['SDC', 'SFC', 'Ênfase', 'Laboratórios'].map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`px-4 py-2 rounded border ${abaAtiva === aba ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba */}
      <div className="border p-4 rounded bg-gray-50">
        {renderConteudo()}
      </div>

      {/* Botão de logout */}
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
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