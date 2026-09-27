// Regras do app. Funções puras: recebem dados, devolvem resultado, não mexem na tela
// nem no armazenamento. Por isso dá pra testá-las sozinhas (ver logica.test.js).

import { ORDEM_VAGAS } from './dados.js';

// Quantas vagas cabem em cada duração de treino.
const VAGAS_POR_TEMPO = { 20: 2, 30: 3, 45: 4, 60: 5 };

// Última vez (timestamp) em que cada chave foi feita, olhando o histórico de sessões.
// `chave` escolhe o que contar: a vaga ou o exercício de cada item.
function ultimaVezFeito(sessoes, chave) {
  const ultima = {};
  for (const sessao of sessoes) {
    for (const item of sessao.itens) {
      if (item.status !== 'feito') continue;
      const k = item[chave];
      ultima[k] = Math.max(ultima[k] ?? 0, sessao.data);
    }
  }
  return ultima;
}

function exerciciosDisponiveis(exercicios, vaga, equipamentoLocal) {
  return exercicios.filter((e) => e.vaga === vaga && equipamentoLocal.includes(e.equip));
}

// Escolhe o exercício da vaga feito há mais tempo (ou nunca feito) → variedade.
function escolherExercicio(opcoes, ultimoExercicio) {
  return [...opcoes].sort((a, b) => (ultimoExercicio[a.id] ?? 0) - (ultimoExercicio[b.id] ?? 0))[0];
}

// Monta o treino do dia.
// Regra única de prioridade: a vaga feita há mais tempo vem primeiro. Uma vaga pulada
// não conta como feita, então ela naturalmente sobe para o início da próxima sessão.
export function montarTreino({ minutos, equipamentoLocal, sessoes, exercicios }) {
  const ultimaVaga = ultimaVezFeito(sessoes, 'vaga');
  const ultimoExercicio = ultimaVezFeito(sessoes, 'exercicioId');

  const vagasPossiveis = ORDEM_VAGAS.filter(
    (v) => exerciciosDisponiveis(exercicios, v, equipamentoLocal).length > 0,
  );
  // sort é estável: em caso de empate, mantém a ORDEM_VAGAS.
  const vagas = [...vagasPossiveis]
    .sort((a, b) => (ultimaVaga[a] ?? 0) - (ultimaVaga[b] ?? 0))
    .slice(0, VAGAS_POR_TEMPO[minutos]);

  if (minutos === 60 && exerciciosDisponiveis(exercicios, 'extra', equipamentoLocal).length > 0) {
    vagas.push('extra');
  }

  return vagas.map((vaga) => {
    const opcoes = exerciciosDisponiveis(exercicios, vaga, equipamentoLocal);
    const exercicioId = escolherExercicio(opcoes, ultimoExercicio).id;
    return novoItem(vaga, exercicioId, sessoes);
  });
}

// "Máquina ocupada": sugere outro exercício da mesma vaga, ainda não tentado nesta sessão.
// Prefere opções sem máquina, que raramente têm fila. Devolve null se não há alternativa.
export function trocarExercicio({ item, equipamentoLocal, sessoes, exercicios }) {
  const ultimoExercicio = ultimaVezFeito(sessoes, 'exercicioId');
  const jaTentados = [...item.tentados, item.exercicioId];
  const opcoes = exerciciosDisponiveis(exercicios, item.vaga, equipamentoLocal).filter(
    (e) => !jaTentados.includes(e.id),
  );
  if (opcoes.length === 0) return null;

  const livres = opcoes.filter((e) => e.equip !== 'maquina');
  return escolherExercicio(livres.length > 0 ? livres : opcoes, ultimoExercicio).id;
}

// Peso (kg) usado da última vez neste exercício, ou null se nunca foi anotado.
export function ultimaCarga(sessoes, exercicioId) {
  for (let s = sessoes.length - 1; s >= 0; s--) {
    const item = sessoes[s].itens.find((i) => i.exercicioId === exercicioId && i.carga != null);
    if (item) return item.carga;
  }
  return null;
}

// Item novo do treino, com o peso da última vez já preenchido.
export function novoItem(vaga, exercicioId, sessoes) {
  return { vaga, exercicioId, status: null, tentados: [], seriesFeitas: 0, carga: ultimaCarga(sessoes, exercicioId) };
}

// Ao encerrar o treino: exercício com ao menos uma série feita conta como feito.
export function statusFinal(item) {
  if (item.status) return item.status;
  return (item.seriesFeitas ?? 0) > 0 ? 'feito' : 'pulado';
}
