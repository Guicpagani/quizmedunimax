const fs = require('fs');
const path = require('path');

const ARQUIVO_TXT = path.join(__dirname, 'src/app/data/importar/questoes_laboratorio.txt');
const ARQUIVO_JSON = path.join(__dirname, 'src/app/data/LABORATORIO.json');

const texto = fs.readFileSync(ARQUIVO_TXT, 'utf8');
const blocos = texto.trim().split(/\n\s*\n/);

const questoes = [];

for (const bloco of blocos) {
  const linhas = bloco.split('\n').map(l => l.trim()).filter(Boolean);
  let pergunta = "", alternativas = [], correta = "", imagem = null;

  for (const linha of linhas) {
    if (linha.startsWith('PERGUNTA:')) {
      pergunta = linha.replace('PERGUNTA:', '').trim();
    } else if (/^[A-D]\)/.test(linha)) {
      const alternativa = linha
        .substring(3) // Remove "A) ", "B) ", etc.
        .replace(/^[a-dA-D][\)\.]\s*/, '') // Remove prefixos como "a)", "B." dentro do texto
        .trim();
      alternativas.push(alternativa);
    } else if (linha.startsWith('CORRETA:')) {
      correta = linha.replace('CORRETA:', '').trim().toUpperCase();
    } else if (linha.startsWith('IMAGEM:')) {
      imagem = linha.replace('IMAGEM:', '').trim();
    }
  }

  if (pergunta && alternativas.length === 4 && correta) {
    questoes.push({
      pergunta,
      alternativas,
      correta: "ABCD".indexOf(correta),
      ...(imagem ? { imagem } : {})
    });
  }
}

const jsonFinal = {
  title: "Laboratorio",
  data: questoes
};

fs.writeFileSync(ARQUIVO_JSON, JSON.stringify(jsonFinal, null, 2), 'utf8');
console.log(`LABORATORIO convertido com sucesso: ${questoes.length} questões salvas em ${ARQUIVO_JSON}`);
