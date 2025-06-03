import SDC from '../data/SDC.json';

const quizzes = [
  { title: 'SDC', data: SDC }
];

export function getQuizByTitle(title: string) {
  if (!title) return undefined;
  return quizzes.find(
    (q) => q.title && q.title.toLowerCase() === title.toLowerCase()
  );
}

