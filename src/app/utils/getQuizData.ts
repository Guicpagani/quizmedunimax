// Caminho: src/app/utils/getQuizData.ts
import SDC from '../data/SDC.json';
import SFC from '../data/SFC.json';
import Enfase from '../data/Enfase.json';
import Laboratorio from '../data/Laboratorio.json';
import SFC_pmsus from '../data/SFC_pmsus.json';

const quizzes = [
  // AQUI É ONDE PRECISAMOS MUDAR:
  // Queremos que `data` contenha o ARRAY de questões, que está em `SDC.data` (SDC é o objeto JSON completo)
  { title: 'SDC', data: SDC.data }, // <--- CORRIGIDO
  { title: 'SFC', data: SFC.data }, // <--- CORRIGIDO
  { title: 'Enfase', data: Enfase.data }, // <--- CORRIGIDO
  { title: 'Laboratorio', data: Laboratorio.data }, // <--- CORRIGIDO
  { title: 'SFC_pmsus', data: SFC_pmsus.data }, // <--- CORRIGIDO
];

export function getQuizByTitle(title: string) {
  if (!title) return undefined;
  // AQUI NÃO MEXEMOS MAIS, POIS O ARRAY JÁ ESTARÁ NA PROPRIEDADE `data`
  return quizzes.find(
    (q) => q.title && q.title.toLowerCase() === title.toLowerCase()
  );
}

// forçar build
