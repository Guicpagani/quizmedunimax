import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      
      {/* HEADER COM LOGIN E REGISTRO */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <h1 className="text-xl font-bold">QuizMedUnimax</h1>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-full border border-black/[.08] dark:border-white/[.15] hover:bg-[#f0f0f0] dark:hover:bg-[#1a1a1a] transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Registrar
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex flex-col gap-8 items-center justify-center px-6 sm:px-20 py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">Welcome to QuizMedUnimax!</h2>

        {/* CRÉDITO DESTACADO */}
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-small italic">
          developed by G. Pagani
        </p>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-decimal list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Edite o arquivo{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Salve e veja as alterações em tempo real.</li>
        </ol>

        <div className="flex gap-4 flex-col sm:flex-row">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 flex items-center justify-center gap-2 transition-colors"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logo"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/[.08] dark:border-white/[.15] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 flex items-center justify-center transition-colors"
          >
            Read our docs
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="row-start-3 flex gap-6 justify-center items-center p-4">
        <a
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Templates
        </a>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Next.js
        </a>
      </footer>
    </div>
  );
}

