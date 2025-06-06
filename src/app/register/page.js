'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!email.endsWith('@al.unieduk.com.br')) {
      setErro('Este e-mail não é permitido.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        email,
        aprovado: false,
        criadoEm: new Date()
      });

      setSucesso('✅ Cadastro realizado com sucesso! Aguarde autorização do administrador.');
      setEmail('');
      setSenha('');
      setTimeout(() => {
        router.push('/login');
      }, 2500); // Redireciona após 2,5s
    } catch (error) {
      setErro('Erro ao registrar: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Registrar</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Registrar
        </button>
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm font-medium">{sucesso}</p>}
      </form>
    </div>
  );
}
