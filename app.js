// Telas do app. Cada ação muda `estado`, salva e redesenha a tela inteira.

import { VAGAS, EQUIPAMENTOS, LOCAIS, EXERCICIOS } from './dados.js';
import { montarTreino, trocarExercicio } from './logica.js';
import { carregar, salvar } from './armazenamento.js';

const estado = carregar();
let aba = 'treino';
let escolha = { minutos: 60, local: 'smartfit' }; // seleção da tela inicial
let aviso = '';

const $app = document.getElementById('app');
const nomeExercicio = (id) => EXERCICIOS.find((e) => e.id === id).nome;

function atualizar() {
  salvar(estado);
  desenhar();
}

// ---------- Aba Treino ----------

function telaInicioTreino() {
  const ultima = estado.sessoes.at(-1);
  const dias = ultima ? Math.floor((Date.now() - ultima.data) / 86400000) : null;
  const textoUltima = ultima
    ? `Último treino: ${dias === 0 ? 'hoje' : dias === 1 ? 'ontem' : `há ${dias} dias`}`
    : 'Nenhum treino registrado ainda.';

  const botoes = (lista, campo) =>
    lista.map(([valor, rotulo]) =>
      `<button class="opcao ${escolha[campo] === valor ? 'ativa' : ''}" data-acao="escolher" data-campo="${campo}" data-valor="${valor}">${rotulo}</button>`,
    ).join('');

  return `
    <p class="discreto">${textoUltima}</p>
    <h2>Quanto tempo você tem hoje?</h2>
    <div class="grade">${botoes([[20, '20 min'], [30, '30 min'], [45, '45 min'], [60, '60 min']], 'minutos')}</div>
    <h2>Onde você vai treinar?</h2>
    <div class="grade">${botoes(Object.entries(LOCAIS), 'local')}</div>
    <button class="principal" data-acao="montar">Montar treino</button>
  `;
}

function telaTreino() {
  const s = estado.sessaoAtual;
  const feitos = s.itens.filter((i) => i.status === 'feito').length;

  const cartoes = s.itens.map((item, i) => {
    const acoes = item.status
      ? `<span class="selo ${item.status}">${item.status === 'feito' ? '✓ feito' : '✗ pulado'}</span>
         <button class="texto" data-acao="desfazer" data-i="${i}">desfazer</button>`
      : `<button data-acao="feito" data-i="${i}">✓ Feito</button>
         <button data-acao="trocar" data-i="${i}">↻ Trocar</button>
         <button data-acao="pular" data-i="${i}">✗ Pular</button>`;
    return `
      <div class="cartao ${item.status ?? ''}">
        <div class="vaga">${VAGAS[item.vaga]}</div>
        <div class="exercicio">${nomeExercicio(item.exercicioId)}</div>
        ${item.tentados.length ? `<div class="discreto">trocado de: ${item.tentados.map(nomeExercicio).join(', ')}</div>` : ''}
        <div class="acoes">${acoes}</div>
      </div>`;
  }).join('');

  return `
    <p class="discreto">${LOCAIS[s.local]} · ${s.minutos} min · ${feitos}/${s.itens.length} feitos</p>
    ${aviso ? `<p class="aviso">${aviso}</p>` : ''}
    ${cartoes}
    <button class="principal" data-acao="encerrar">Encerrar treino</button>
    <button class="texto centro" data-acao="cancelar">Descartar este treino</button>
  `;
}

// ---------- Aba Corrida ----------

function telaCorrida() {
  const hoje = new Date().toISOString().slice(0, 10);
  const lista = [...estado.corridas].reverse().map((c) => {
    const ritmo = c.minutos / c.km;
    const ritmoTxt = `${Math.floor(ritmo)}:${String(Math.round((ritmo % 1) * 60)).padStart(2, '0')} /km`;
    return `<li><span>${c.dia.split('-').reverse().join('/')}</span><span>${c.km} km · ${c.minutos} min · ${ritmoTxt}</span></li>`;
  }).join('');

  return `
    <h2>Registrar corrida</h2>
    <form data-form="corrida">
      <label>Data <input type="date" name="dia" value="${hoje}" required></label>
      <label>Distância (km) <input type="number" name="km" step="0.1" min="0.1" inputmode="decimal" required></label>
      <label>Tempo (min) <input type="number" name="minutos" step="1" min="1" inputmode="numeric" required></label>
      <button class="principal">Salvar corrida</button>
    </form>
    <ul class="lista">${lista || '<li class="discreto">Nenhuma corrida ainda.</li>'}</ul>
  `;
}

// ---------- Aba Ajustes ----------

function telaAjustes() {
  const blocos = Object.entries(LOCAIS).map(([local, nome]) => {
    const caixas = Object.entries(EQUIPAMENTOS).map(([equip, rotulo]) => `
      <label class="check">
        <input type="checkbox" data-acao="equip" data-local="${local}" data-equip="${equip}"
          ${estado.equipamento[local].includes(equip) ? 'checked' : ''}> ${rotulo}
      </label>`).join('');
    return `<fieldset><legend>${nome}</legend>${caixas}</fieldset>`;
  }).join('');

  return `
    <h2>Equipamento de cada local</h2>
    ${blocos}
    <h2>Cópia de segurança</h2>
    <p class="discreto">Os dados ficam só neste aparelho. Baixe uma cópia de vez em quando.</p>
    <button data-acao="exportar">Baixar meus dados</button>
  `;
}

// ---------- Desenho e eventos ----------

function desenhar() {
  const conteudo = {
    treino: estado.sessaoAtual ? telaTreino() : telaInicioTreino(),
    corrida: telaCorrida(),
    ajustes: telaAjustes(),
  }[aba];

  const nav = [['treino', 'Treino'], ['corrida', 'Corrida'], ['ajustes', 'Ajustes']]
    .map(([id, rotulo]) => `<button class="${aba === id ? 'ativa' : ''}" data-acao="aba" data-aba="${id}">${rotulo}</button>`)
    .join('');

  $app.innerHTML = `<main>${conteudo}</main><nav>${nav}</nav>`;
}

const acoes = {
  aba: (d) => { aba = d.aba; aviso = ''; },
  escolher: (d) => { escolha[d.campo] = d.campo === 'minutos' ? Number(d.valor) : d.valor; },
  montar: () => {
    estado.sessaoAtual = {
      data: Date.now(),
      ...escolha,
      itens: montarTreino({
        minutos: escolha.minutos,
        equipamentoLocal: estado.equipamento[escolha.local],
        sessoes: estado.sessoes,
        exercicios: EXERCICIOS,
      }),
    };
  },
  feito: (d) => { estado.sessaoAtual.itens[d.i].status = 'feito'; aviso = ''; },
  pular: (d) => { estado.sessaoAtual.itens[d.i].status = 'pulado'; aviso = ''; },
  desfazer: (d) => { estado.sessaoAtual.itens[d.i].status = null; },
  trocar: (d) => {
    const item = estado.sessaoAtual.itens[d.i];
    const novo = trocarExercicio({
      item,
      equipamentoLocal: estado.equipamento[estado.sessaoAtual.local],
      sessoes: estado.sessoes,
      exercicios: EXERCICIOS,
    });
    if (novo) {
      item.tentados.push(item.exercicioId);
      item.exercicioId = novo;
      aviso = '';
    } else {
      aviso = `Sem outra opção de "${VAGAS[item.vaga]}" aqui. Espere a máquina ou pule.`;
    }
  },
  encerrar: () => {
    const s = estado.sessaoAtual;
    s.itens.forEach((i) => { i.status ??= 'pulado'; }); // o que não foi marcado conta como pulado
    estado.sessoes.push(s);
    estado.sessaoAtual = null;
  },
  cancelar: () => { estado.sessaoAtual = null; aviso = ''; },
  equip: (d, alvo) => {
    const lista = estado.equipamento[d.local];
    estado.equipamento[d.local] = alvo.checked ? [...lista, d.equip] : lista.filter((e) => e !== d.equip);
  },
  exportar: () => {
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `treino-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  },
};

$app.addEventListener('click', (ev) => {
  const alvo = ev.target.closest('[data-acao]');
  if (!alvo || alvo.type === 'checkbox') return;
  acoes[alvo.dataset.acao](alvo.dataset, alvo);
  atualizar();
});

$app.addEventListener('change', (ev) => {
  const alvo = ev.target;
  if (alvo.dataset.acao !== 'equip') return;
  acoes.equip(alvo.dataset, alvo);
  atualizar();
});

$app.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = new FormData(ev.target);
  estado.corridas.push({ dia: f.get('dia'), km: Number(f.get('km')), minutos: Number(f.get('minutos')) });
  atualizar();
});

desenhar();
