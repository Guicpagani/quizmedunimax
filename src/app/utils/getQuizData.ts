// Caminho: src/app/utils/getQuizData.ts
import SDC from '../data/SDC.json';
import SFC from '../data/SFC.json';
import Enfase from '../data/Enfase.json';
import Laboratorio from '../data/Laboratorio.json';
import SFC_pmsus from '../data/SFC_pmsus.json'; // <--- ADICIONE ESTA LINHA PARA IMPORTAR O NOVO QUIZ

const quizzes = [
  { title: 'SDC', data: SDC },
  { title: 'SFC', data: SFC },
  { title: 'Enfase', data: Enfase },
  { title: 'Laboratorio', data: Laboratorio },
  { title: 'SFC_pmsus', data: SFC_pmsus }, // <--- E ADICIONE ESTE OBJETO AO ARRAY
];

export function getQuizByTitle(title: string) {
  if (!title) return undefined;
  return quizzes.find(
    (q) => q.title && q.title.toLowerCase() === title.toLowerCase()
  );
}

// forçar build
