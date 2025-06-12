// Caminho: src/app/components/OnlineUsersCounter.js
'use client';

import { useOnlineStatus } from '../utils/useOnlineStatus'; // Importa nosso hook de presença

export default function OnlineUsersCounter() {
  // O hook nos dá a contagem de usuários em tempo real
  const onlineCount = useOnlineStatus();

  // Para não poluir a tela, só mostramos o contador se houver pelo menos 1 pessoa online
  if (onlineCount === 0) {
    return null;
  }

  return (
    // Um pouco de estilo para deixar o contador bonito no canto da tela
    <div className="fixed bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm text-sm text-gray-800 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 z-50">
      {/* Bolinha verde que pulsa */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>

      {/* O texto que muda conforme o número de pessoas */}
      <span>
        {onlineCount} {onlineCount === 1 ? 'pessoa online' : 'pessoas online'}
      </span>
    </div>
  );
}