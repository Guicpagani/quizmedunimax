// Caminho: src/app/utils/useOnlineStatus.js
'use client';

import { useState, useEffect } from 'react';
import { ref, onValue, onDisconnect, set, serverTimestamp, remove } from "firebase/database";
import { auth, database } from '../../firebase'; // Verifique se o 'database' está sendo exportado do seu arquivo firebase.js

export function useOnlineStatus() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

  useEffect(() => {
    // Se não houver usuário logado, não faz nada.
    if (!auth.currentUser) {
      return;
    }

    // Cria uma referência para a lista de usuários online no Realtime Database.
    const onlineUsersRef = ref(database, 'onlineUsers');

    // Cria uma referência específica para o usuário atual.
    const myUserRef = ref(database, `onlineUsers/${auth.currentUser.uid}`);

    // Referência especial do Firebase para detectar conexões/desconexões.
    const connectedRef = ref(database, '.info/connected');

    const unsubscribe = onValue(connectedRef, (snap) => {
      // Se o usuário está conectado...
      if (snap.val() === true) {
        // ...adiciona ele à lista de online.
        set(myUserRef, {
          email: auth.currentUser.email,
          last_seen: serverTimestamp(),
        });

        // Define a ação para quando ele desconectar: remover da lista.
        onDisconnect(myUserRef).remove();
      }
    });

    // Fica "ouvindo" a lista de usuários online e atualiza nosso contador.
    const unsubscribeUsers = onValue(onlineUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        setOnlineUsersCount(snapshot.size);
      } else {
        setOnlineUsersCount(0);
      }
    });

    // Função de limpeza: remove os "ouvintes" quando o componente desmontar.
    return () => {
      unsubscribe();
      unsubscribeUsers();
      // Se o usuário ainda estiver online, remove ele da lista ao sair da página.
      if (myUserRef) {
        remove(myUserRef);
      }
    };
  }, [auth.currentUser]); // Re-executa se o usuário mudar (login/logout).

  return onlineUsersCount;
}