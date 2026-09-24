// Guarda e lê o estado do app no próprio aparelho (localStorage).

import { EQUIPAMENTO_PADRAO } from './dados.js';

const CHAVE = 'app-treino-v1';

function estadoInicial() {
  return {
    sessoes: [], // treinos encerrados
    corridas: [],
    equipamento: structuredClone(EQUIPAMENTO_PADRAO),
    sessaoAtual: null, // treino em andamento (sobrevive a fechar o app)
  };
}

export function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    return salvo ? { ...estadoInicial(), ...salvo } : estadoInicial();
  } catch {
    return estadoInicial();
  }
}

export function salvar(estado) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {
    // Sem armazenamento (ex.: navegação privada): o app funciona, só não lembra.
  }
}
