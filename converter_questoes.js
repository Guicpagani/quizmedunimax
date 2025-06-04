// Salve como converter_questoes.js na pasta do projeto
const fs = require('fs');
const path = require('path');

// Caminho do arquivo TXT de perguntas
const ARQUIVO_TXT = path.join(__dirname, 'src/app/data/importar/questoes_sdc.txt');
// Caminho do arquivo JSON de saída
const ARQUIVO_JSON = path.join(__dirname, 'src/app/data/SDC.json');

// Lê o arquivo TXT
const texto = fs.readFileSync(ARQUIVO_TXT, 'utf8');

// Divide as perguntas por linha em branco
const blocos = texto.trim().split(/\n\s*\n/);

const questoes = [];

for (const bloco of blocos) {
  const linhas = bloco.split('\n').map(l => l.trim()).filter(Boolean);

  let pergunta = "";
  let alternativas = [];
  let correta = "";
  let imagem = null;

  for (const linha of linhas) {
    if (linha.startsWith('PERGUNTA:')) {
      pergunta = linha.replace('PERGUNTA:', '').trim();
    } else if (/^[A-D]\)/.test(linha)) {
      alternativas.push(linha.substring(3).trim());
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

// Monta o JSON final
const jsonFinal = {
  title: "SDC",
  data: questoes
};

// Salva no JSON de saída
fs.writeFileSync(ARQUIVO_JSON, JSON.stringify(jsonFinal, null, 2), 'utf8');
console.log(`Convertido com sucesso: ${questoes.length} questões salvas em ${ARQUIVO_JSON}`);