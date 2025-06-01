import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center text-center">
      <Image
        src="/logo-medico.png"
        alt="Logo QuizMedUnimax"
        width={200}
        height={200}
        className="mb-6"
        priority
      />
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao QuizMed Unimax!</h1>
      <p className="text-lg text-gray-700 max-w-xl">
        Plataforma de questões médicas para alunos da Unimax. Faça login ou registre-se com e-mail institucional para começar.
      </p>
    </main>
  );
}
