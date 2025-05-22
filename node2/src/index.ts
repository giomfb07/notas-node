import readlineSync from 'readline-sync';
import chalk from 'chalk';

console.log(chalk.bold.rgb(255, 21, 204)("------------------ SISTEMA DE NOTAS ------------------"));

const NOTA_MINIMA = 18;
const MIN_NOTA = 0;

const totalAlunos = Number(
  readlineSync.question('Quantos alunos você quer cadastrar? ')
);

let aprovados = 0;
let reprovados = 0;
let segundaChamada = 0;
let recuperacao = 0;
let somaTotalNotas = 0;

function validarNota(nota: number): boolean {
  return nota >= MIN_NOTA;
}

function processarAluno(indice: number): void {
  console.log(`\n--- Aluno ${indice + 1} ---`);

  const nome = readlineSync.question('Nome do aluno: ');
  const nota1 = Number(readlineSync.question('Nota PI : '));
  const nota2 = Number(readlineSync.question('Nota PR : '));
  const nota3 = Number(readlineSync.question('Nota PF : '));

  if (!validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
    console.log(chalk.red(`Erro: As notas devem ser maiores ou iguais a ${MIN_NOTA}.`));
    return;
  }

  const soma = nota1 + nota2 + nota3;
  somaTotalNotas += soma;

  let resultado = '';
  if (soma >= NOTA_MINIMA) {
    resultado = chalk.bold.green('Resultado: APROVADO');
    aprovados++;
  } else {
    reprovados++;
    if (soma >= 10) {
      segundaChamada++;
      resultado = chalk.keyword('orange')('Resultado: 2ª CHAMADA');
    } else {
      recuperacao++;
      resultado = chalk.bold.red('Resultado: RECUPERAÇÃO');
    }
  }

  console.log(`${resultado}`);
  console.log(`Soma das notas de ${nome}: ${soma}`);
  console.log(`Total de alunos processados: ${indice + 1}`);
}

for (let i = 0; i < totalAlunos; i++) {
  processarAluno(i);
}

const mediaGeral = somaTotalNotas / totalAlunos;

console.log(chalk.bold.magenta('\n--------- ESTATÍSTICAS ---------'));
console.log(`Total de alunos: ${totalAlunos}`);
console.log(chalk.green(`Aprovados: ${aprovados}`));
console.log(chalk.red(`Reprovados: ${reprovados}`));
console.log(chalk.keyword('orange')(`2ª Chamada: ${segundaChamada}`));
console.log(chalk.redBright(`Recuperação: ${recuperacao}`));
console.log(chalk.blue(`Média geral da turma: ${mediaGeral.toFixed(2)}`));
console.log(chalk.bold.magenta('\nProcessamento concluído!'));
