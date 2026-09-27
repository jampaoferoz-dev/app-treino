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

// Cada exercício traz a prescrição padrão (séries, repetições, descanso em segundos)
// e uma dica curta de execução. `carga: true` mostra o campo de peso (kg).
// Os números são um ponto de partida genérico: ajuste com o professor da academia.
export const EXERCICIOS = [
  { id: 'leg_press', nome: 'Leg press', vaga: 'agachar', equip: 'maquina', carga: true,
    series: 3, reps: '10–12', descanso: 90,
    dica: 'Pés na largura dos ombros no meio da plataforma. Desça até os joelhos formarem ~90° e empurre sem travar os joelhos no alto.' },
  { id: 'extensora', nome: 'Cadeira extensora', vaga: 'agachar', equip: 'maquina', carga: true,
    series: 3, reps: '12–15', descanso: 60,
    dica: 'Joelho alinhado com o eixo da máquina. Estenda as pernas, segure 1 segundo em cima e desça devagar.' },
  { id: 'goblet', nome: 'Agachamento goblet', vaga: 'agachar', equip: 'halter', carga: true,
    series: 3, reps: '10–12', descanso: 90,
    dica: 'Segure um halter em pé junto ao peito. Pés na largura dos ombros, desça como quem vai sentar, costas retas, e suba empurrando o chão.' },
  { id: 'agachamento', nome: 'Agachamento livre', vaga: 'agachar', equip: 'peso_corpo', carga: false,
    series: 3, reps: '15–20', descanso: 60,
    dica: 'Braços à frente para equilibrar. Desça com o quadril para trás, calcanhares no chão, até as coxas ficarem paralelas ao chão.' },

  { id: 'flexora', nome: 'Mesa flexora', vaga: 'posterior', equip: 'maquina', carga: true,
    series: 3, reps: '10–12', descanso: 60,
    dica: 'Deitado de bruços, rolo logo acima dos calcanhares. Dobre os joelhos trazendo o rolo em direção ao glúteo e volte devagar.' },
  { id: 'stiff', nome: 'Stiff com halteres', vaga: 'posterior', equip: 'halter', carga: true,
    series: 3, reps: '10–12', descanso: 90,
    dica: 'Em pé, halteres à frente das coxas, joelhos levemente dobrados. Leve o quadril para trás descendo os halteres rente às pernas, costas retas, e volte.' },
  { id: 'elev_pelvica', nome: 'Elevação pélvica', vaga: 'posterior', equip: 'peso_corpo', carga: false,
    series: 3, reps: '12–15', descanso: 60,
    dica: 'Deitado de costas, joelhos dobrados e pés no chão. Suba o quadril contraindo o glúteo até alinhar joelhos, quadril e ombros; desça devagar.' },

  { id: 'supino_maquina', nome: 'Supino máquina', vaga: 'empurrar', equip: 'maquina', carga: true,
    series: 3, reps: '8–12', descanso: 90,
    dica: 'Pegadores na altura do meio do peito. Empurre à frente até quase estender os braços e volte controlando.' },
  { id: 'supino_halter', nome: 'Supino com halteres', vaga: 'empurrar', equip: 'halter', carga: true,
    series: 3, reps: '8–12', descanso: 90,
    dica: 'Deitado no banco, halteres na linha do peito. Empurre para cima até estender os braços e desça devagar até a lateral do peito.' },
  { id: 'desenvolvimento', nome: 'Desenvolvimento com halteres', vaga: 'empurrar', equip: 'halter', carga: true,
    series: 3, reps: '8–12', descanso: 90,
    dica: 'Sentado com as costas apoiadas, halteres na altura das orelhas. Empurre para cima sem arquear a lombar e volte.' },
  { id: 'flexao', nome: 'Flexão de braço', vaga: 'empurrar', equip: 'peso_corpo', carga: false,
    series: 3, reps: 'até perto da falha', descanso: 60,
    dica: 'Mãos um pouco mais abertas que os ombros, corpo reto da cabeça aos pés. Desça o peito perto do chão e empurre. Se pesar, apoie os joelhos.' },

  { id: 'puxada', nome: 'Puxada frente', vaga: 'puxar', equip: 'maquina', carga: true,
    series: 3, reps: '8–12', descanso: 90,
    dica: 'Pegada um pouco mais aberta que os ombros. Puxe a barra até a parte de cima do peito, levando os cotovelos para baixo, e suba devagar.' },
  { id: 'remada_baixa', nome: 'Remada baixa', vaga: 'puxar', equip: 'maquina', carga: true,
    series: 3, reps: '10–12', descanso: 90,
    dica: 'Sentado, costas retas. Puxe o pegador até a barriga juntando as escápulas e estenda os braços de volta sem curvar as costas.' },
  { id: 'remada_halter', nome: 'Remada unilateral com halter', vaga: 'puxar', equip: 'halter', carga: true,
    series: 3, reps: '10–12 (cada lado)', descanso: 60,
    dica: 'Joelho e mão apoiados num banco, costas retas. Puxe o halter em direção ao quadril com o cotovelo rente ao corpo e desça devagar.' },
  { id: 'barra_fixa', nome: 'Barra fixa', vaga: 'puxar', equip: 'barra_fixa', carga: false,
    series: 3, reps: 'até perto da falha', descanso: 120,
    dica: 'Pendurado com os braços estendidos, puxe o corpo até o queixo passar da barra e desça controlando. Se não subir ainda, fique pendurado ou faça só a descida lenta.' },

  { id: 'abdominal_maquina', nome: 'Abdominal na máquina', vaga: 'core', equip: 'maquina', carga: true,
    series: 3, reps: '12–15', descanso: 60,
    dica: 'Ajuste o assento, segure os pegadores e flexione o tronco contraindo o abdômen, sem puxar com os braços. Volte devagar.' },
  { id: 'prancha', nome: 'Prancha', vaga: 'core', equip: 'peso_corpo', carga: false,
    series: 3, reps: '30–45 segundos', descanso: 45,
    dica: 'Antebraços no chão, cotovelos sob os ombros, corpo reto. Contraia abdômen e glúteo e não deixe o quadril cair.' },
  { id: 'elev_pernas', nome: 'Elevação de pernas deitado', vaga: 'core', equip: 'peso_corpo', carga: false,
    series: 3, reps: '12–15', descanso: 45,
    dica: 'Deitado de costas, mãos sob o quadril. Suba as pernas estendidas até 90° e desça devagar sem encostar no chão, lombar colada.' },

  { id: 'rosca', nome: 'Rosca direta com halteres', vaga: 'extra', equip: 'halter', carga: true,
    series: 3, reps: '10–12', descanso: 60,
    dica: 'Em pé, cotovelos colados ao corpo. Suba os halteres dobrando os cotovelos, sem balançar o tronco, e desça devagar.' },
  { id: 'triceps_polia', nome: 'Tríceps na polia', vaga: 'extra', equip: 'maquina', carga: true,
    series: 3, reps: '10–12', descanso: 60,
    dica: 'Em pé de frente para a polia, cotovelos fixos ao lado do corpo. Empurre a barra para baixo até estender os braços e volte até ~90°.' },
  { id: 'elev_lateral', nome: 'Elevação lateral', vaga: 'extra', equip: 'halter', carga: true,
    series: 3, reps: '12–15', descanso: 60,
    dica: 'Em pé, halteres ao lado do corpo, cotovelos levemente dobrados. Suba os braços pelas laterais até a altura dos ombros e desça devagar.' },
];
