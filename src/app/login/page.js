'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const userDocRef = doc(db, 'usuarios', userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.aprovado) {
          router.push('/area-restrita');
        } else {
          setErro('Usuário ainda não aprovado pelo administrador.');
        }
      } else {
        setErro('Dados do usuário não encontrados.');
      }
    } catch (error) {
      setErro('Erro ao fazer login: ' + error.message);
    }

    setCarregando(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Imagem lateral esquerda */}
      <div className="w-1/2 hidden md:block relative">
        <Image
          src="/sua-foto.png"
          alt="Imagem lateral"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Formulário login à direita */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <div className="mb-6">
          <Image
            src="/logo-quizmedmax.png"
            alt="Logo"
            width={180}
            height={60}
            priority
          />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="E-mail institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-400 rounded text-black placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-400 rounded text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
        </form>
      </div>
    </div>
  );
}


