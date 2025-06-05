import SDC from '../data/SDC.json';
import SFC from '../data/SFC.json';
import Enfase from '../data/Enfase.json';
import Laboratorio from '../data/Laboratorio.json';

const quizzes = [
  { title: 'SDC', data: SDC },
  { title: 'SFC', data: SFC },
  { title: 'Enfase', data: Enfase },
  { title: 'Laboratorio', data: Laboratorio },
];

export function getQuizByTitle(title: string) {
  if (!title) return undefined;
  return quizzes.find(
    (q) => q.title && q.title.toLowerCase() === title.toLowerCase()
  );
}

// forçar build
