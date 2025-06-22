export type Questao = {
  pergunta: string;
  alternativas: string[];
  correta: number;
  imagem?: string;
  topicos?: string[]; // <--- ADICIONE ESTA LINHA
};

export type QuizData = {
  title: string;
  data: Questao[];
};