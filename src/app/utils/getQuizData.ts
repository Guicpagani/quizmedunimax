import SDC from '../data/SDC.json';
import SFC from '../data/SFC.json';
import ENFASE from '../data/ENFASE.json';
import LABORATORIO from '../data/LABORATORIO.json';

const quizzes = [
  { title: 'SDC', data: SDC },
  { title: 'SFC', data: SFC },
  { title: 'ENFASE', data: ENFASE },
  { title: 'LABORATORIO', data: LABORATORIO },
];

export function getQuizByTitle(title: string) {
  if (!title) return undefined;
  return quizzes.find(
    (q) => q.title && q.title.toLowerCase() === title.toLowerCase()
  );
}
