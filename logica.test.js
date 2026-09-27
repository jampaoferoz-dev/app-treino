// Testes das regras. Rodar com: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { montarTreino, trocarExercicio, ultimaCarga, statusFinal } from './logica.js';
import { EXERCICIOS, EQUIPAMENTO_PADRAO } from './dados.js';

const academia = EQUIPAMENTO_PADRAO.smartfit;

test('número de vagas acompanha o tempo disponível', () => {
  for (const [minutos, esperado] of [[20, 2], [30, 3], [45, 4], [60, 6]]) {
    const treino = montarTreino({ minutos, equipamentoLocal: academia, sessoes: [], exercicios: EXERCICIOS });
    assert.equal(treino.length, esperado, `${minutos} min`);
  }
});

test('vaga pulada na sessão anterior vem primeiro', () => {
  const sessoes = [{
    data: 1,
    itens: [
      { vaga: 'agachar', exercicioId: 'leg_press', status: 'feito' },
      { vaga: 'empurrar', exercicioId: 'supino_maquina', status: 'feito' },
      { vaga: 'puxar', exercicioId: 'puxada', status: 'pulado' },
    ],
  }];
  const treino = montarTreino({ minutos: 20, equipamentoLocal: academia, sessoes, exercicios: EXERCICIOS });
  assert.deepEqual(treino.map((i) => i.vaga), ['puxar', 'posterior']);
});

test('exercício feito na última vez dá lugar a outro da mesma vaga', () => {
  const sessoes = [{ data: 1, itens: [{ vaga: 'agachar', exercicioId: 'leg_press', status: 'feito' }] }];
  const treino = montarTreino({ minutos: 60, equipamentoLocal: academia, sessoes, exercicios: EXERCICIOS });
  const agachar = treino.find((i) => i.vaga === 'agachar');
  assert.notEqual(agachar.exercicioId, 'leg_press');
});

test('em casa não sugere máquina', () => {
  const treino = montarTreino({ minutos: 60, equipamentoLocal: EQUIPAMENTO_PADRAO.casa, sessoes: [], exercicios: EXERCICIOS });
  const equips = treino.map((i) => EXERCICIOS.find((e) => e.id === i.exercicioId).equip);
  assert.ok(!equips.includes('maquina'));
});

test('troca prefere opção sem máquina e não repete o que já foi tentado', () => {
  const item = { vaga: 'puxar', exercicioId: 'puxada', tentados: [] };
  const primeira = trocarExercicio({ item, equipamentoLocal: academia, sessoes: [], exercicios: EXERCICIOS });
  assert.equal(EXERCICIOS.find((e) => e.id === primeira).equip !== 'maquina', true);

  const todas = ['puxada', 'remada_baixa', 'remada_halter', 'barra_fixa'];
  const semSaida = { vaga: 'puxar', exercicioId: 'puxada', tentados: todas.slice(1) };
  assert.equal(trocarExercicio({ item: semSaida, equipamentoLocal: academia, sessoes: [], exercicios: EXERCICIOS }), null);
});

test('traz o peso da última vez que o exercício foi feito', () => {
  const sessoes = [
    { data: 1, itens: [{ vaga: 'agachar', exercicioId: 'leg_press', status: 'feito', carga: 80 }] },
    { data: 2, itens: [{ vaga: 'agachar', exercicioId: 'goblet', status: 'feito', carga: 16 }] },
    { data: 3, itens: [{ vaga: 'agachar', exercicioId: 'leg_press', status: 'feito', carga: 90 }] },
  ];
  assert.equal(ultimaCarga(sessoes, 'leg_press'), 90);
  assert.equal(ultimaCarga(sessoes, 'goblet'), 16);
  assert.equal(ultimaCarga(sessoes, 'extensora'), null);

  const treino = montarTreino({ minutos: 60, equipamentoLocal: academia, sessoes: [sessoes[0]], exercicios: EXERCICIOS });
  const agachar = treino.find((i) => i.vaga === 'agachar');
  assert.equal(agachar.seriesFeitas, 0);
  assert.equal(agachar.carga, ultimaCarga([sessoes[0]], agachar.exercicioId));
});

test('ao encerrar, série parcial conta como feito e nenhuma série como pulado', () => {
  assert.equal(statusFinal({ status: null, seriesFeitas: 1 }), 'feito');
  assert.equal(statusFinal({ status: null, seriesFeitas: 0 }), 'pulado');
  assert.equal(statusFinal({ status: 'pulado', seriesFeitas: 2 }), 'pulado');
});
