'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/navigation';

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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-mail institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
      </form>
    </div>
  );
}


