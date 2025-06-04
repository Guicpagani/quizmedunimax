export type Questao = {
  pergunta: string;
  alternativas: string[];
  correta: number;
  imagem?: string;
};

export type QuizData = {
  title: string;
  data: Questao[];
};