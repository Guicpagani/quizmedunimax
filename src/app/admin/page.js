'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function AdminPage() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [questao, setQuestao] = useState("");
  const [gabarito, setGabarito] = useState("");
  const [pasta, setPasta] = useState("SDC");

  const handleLogin = () => {
    if (senha === "admin123") {
      setAutenticado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, pasta), {
        questao,
        gabarito,
        timestamp: new Date(),
      });
      alert("Questão salva com sucesso!");
      setQuestao("");
      setGabarito("");
    } catch (error) {
      alert("Erro ao salvar questão: " + error.message);
    }
  };

  if (!user || user.email !== "guilherme.pagani449@al.unieduk.com.br") {
    return <p className="p-8 text-red-600">Acesso restrito ao administrador.</p>;
  }

  if (!autenticado) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Área Administrativa</h1>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite a senha"
          className="border px-4 py-2 mr-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enviar Questão</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={pasta}
          onChange={(e) => setPasta(e.target.value)}
          className="w-full border p-2"
        >
          <option value="SDC">SDC</option>
          <option value="SFC">SFC</option>
          <option value="Ênfase">Ênfase</option>
          <option value="Laboratórios">Laboratórios</option>
        </select>

        <textarea
          value={questao}
          onChange={(e) => setQuestao(e.target.value)}
          placeholder="Cole aqui a questão"
          rows={6}
          className="w-full border p-2"
        />

        <input
          value={gabarito}
          onChange={(e) => setGabarito(e.target.value)}
          placeholder="Letra correta (ex: c)"
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Salvar Questão
        </button>
      </form>
    </div>
  );
}
✅ 3. Confirme que o Firebase está configurado corretamente
Seu firebase.js deve exportar o db corretamente:

js
Copiar
Editar
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  // ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };