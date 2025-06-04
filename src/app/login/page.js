'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/area-restrita");
    } catch (err) {
      setErro("Usuário ou senha inválidos.");
    }
    setCarregando(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Esquerda - Imagem lateral */}
      <div className="w-1/2 hidden md:block relative">
        <Image
          src="/sua-foto.png"
          alt="Foto Lateral"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Direita - Formulário de Login */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        {/* Seu logo */}
        <div className="mb-8">
          <Image
            src="/logo-quizmedmax.png"
            alt="Quizmedmax Logo"
            width={180}
            height={60}
            priority
          />
        </div>

        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:ring-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:ring-2"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
          {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}
        </form>
      </div>
    </div>
  );
}
