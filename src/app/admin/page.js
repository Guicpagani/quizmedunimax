'use client'

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (
      email.trim().toLowerCase() === "guilherme.pagani449@al.unieduk.com.br" &&
      password === "admin123"
    ) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("E-mail ou senha incorretos.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Login do Administrador</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded mb-3 text-gray-800 placeholder-gray-600 bg-white"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded mb-3 text-gray-800 placeholder-gray-600 bg-white"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Entrar
          </button>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Painel do Administrador</h1>
      <p className="mb-6 text-center text-gray-700">Você tem acesso total às funcionalidades do sistema.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <Link
          href="/area-restrita/quiz/SDC"
          className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded"
        >
          Quiz SDC
        </Link>
        <Link
          href="/area-restrita/quiz/SFC"
          className="block bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded"
        >
          Quiz SFC
        </Link>
        <Link
          href="/area-restrita/quiz/ENFASE"
          className="block bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 rounded"
        >
          Quiz Ênfase
        </Link>
        <Link
          href="/area-restrita/quiz/LABORATORIO"
          className="block bg-purple-500 hover:bg-purple-600 text-white text-center py-3 rounded"
        >
          Quiz Laboratório
        </Link>
      </div>
    </div>
  );
}
