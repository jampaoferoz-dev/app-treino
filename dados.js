// Dados fixos do app: vagas, exercícios e equipamentos.
// Para mudar a lista de exercícios, edite só este arquivo.

export const VAGAS = {
  agachar: 'Pernas: agachar',
  posterior: 'Pernas: posterior',
  empurrar: 'Empurrar',
  puxar: 'Puxar',
  core: 'Core',
  extra: 'Extra (braço/ombro)',
};

// Ordem de desempate quando duas vagas estão igualmente "atrasadas".
export const ORDEM_VAGAS = ['agachar', 'empurrar', 'puxar', 'posterior', 'core'];

export const EQUIPAMENTOS = {
  maquina: 'Máquinas',
  halter: 'Halteres',
  barra_fixa: 'Barra fixa',
  peso_corpo: 'Peso do corpo',
};

export const LOCAIS = {
  smartfit: 'Smart Fit',
  casa: 'Casa',
  praca: 'Praça',
};

// Equipamento de cada local na primeira abertura. O usuário pode editar em Ajustes.
export const EQUIPAMENTO_PADRAO = {
  smartfit: ['maquina', 'halter', 'barra_fixa', 'peso_corpo'],
  casa: ['halter', 'barra_fixa', 'peso_corpo'],
  praca: ['peso_corpo'],
};

export const EXERCICIOS = [
  { id: 'leg_press', nome: 'Leg press', vaga: 'agachar', equip: 'maquina' },
  { id: 'extensora', nome: 'Cadeira extensora', vaga: 'agachar', equip: 'maquina' },
  { id: 'goblet', nome: 'Agachamento goblet', vaga: 'agachar', equip: 'halter' },
  { id: 'agachamento', nome: 'Agachamento livre', vaga: 'agachar', equip: 'peso_corpo' },

  { id: 'flexora', nome: 'Mesa flexora', vaga: 'posterior', equip: 'maquina' },
  { id: 'stiff', nome: 'Stiff com halteres', vaga: 'posterior', equip: 'halter' },
  { id: 'elev_pelvica', nome: 'Elevação pélvica', vaga: 'posterior', equip: 'peso_corpo' },

  { id: 'supino_maquina', nome: 'Supino máquina', vaga: 'empurrar', equip: 'maquina' },
  { id: 'supino_halter', nome: 'Supino com halteres', vaga: 'empurrar', equip: 'halter' },
  { id: 'desenvolvimento', nome: 'Desenvolvimento com halteres', vaga: 'empurrar', equip: 'halter' },
  { id: 'flexao', nome: 'Flexão de braço', vaga: 'empurrar', equip: 'peso_corpo' },

  { id: 'puxada', nome: 'Puxada frente', vaga: 'puxar', equip: 'maquina' },
  { id: 'remada_baixa', nome: 'Remada baixa', vaga: 'puxar', equip: 'maquina' },
  { id: 'remada_halter', nome: 'Remada unilateral com halter', vaga: 'puxar', equip: 'halter' },
  { id: 'barra_fixa', nome: 'Barra fixa', vaga: 'puxar', equip: 'barra_fixa' },

  { id: 'abdominal_maquina', nome: 'Abdominal na máquina', vaga: 'core', equip: 'maquina' },
  { id: 'prancha', nome: 'Prancha', vaga: 'core', equip: 'peso_corpo' },
  { id: 'elev_pernas', nome: 'Elevação de pernas deitado', vaga: 'core', equip: 'peso_corpo' },

  { id: 'rosca', nome: 'Rosca direta com halteres', vaga: 'extra', equip: 'halter' },
  { id: 'triceps_polia', nome: 'Tríceps na polia', vaga: 'extra', equip: 'maquina' },
  { id: 'elev_lateral', nome: 'Elevação lateral', vaga: 'extra', equip: 'halter' },
];
