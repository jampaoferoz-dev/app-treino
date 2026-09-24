# App de Treino — Especificação da v1

App pessoal (um único usuário) para sugerir e registrar treinos de musculação e corrida.
Primeiro app construído como exercício de aprendizado: simples de propósito, descartável.

## Plataforma

- Site estático aberto no Safari do iPhone e adicionado à Tela de Início.
- Dados salvos só no aparelho, sem servidor, login ou nuvem.
- Publicado no GitHub Pages para abrir fora de casa. O código e a lista de exercícios ficam públicos; os dados de treino, não.

## Conceitos

- **Vaga**: um item do treino definido pela função, não por um exercício fixo.
  Vagas: `agachar`, `posterior`, `empurrar`, `puxar`, `core`, `extra` (braço/ombro).
- **Exercício**: pertence a uma vaga e precisa de um equipamento (`maquina`, `halter`, `barra_fixa`, `peso_corpo`, ...).
- **Local**: `smartfit`, `casa`, `praca`. Cada local tem uma lista de equipamentos disponíveis, editável.
  - casa: halter, barra fixa, peso do corpo
  - praca: peso do corpo (aparelhos a confirmar)
  - smartfit: tudo

## Fluxo principal

1. "Quanto tempo você tem hoje?" → 20 / 30 / 45 / 60 min → 2 / 3 / 4 / 5+1 vagas.
2. "Onde você vai treinar?" → filtra os exercícios pelo equipamento do local.
3. O app monta um treino de corpo inteiro:
   - Vagas puladas na sessão anterior vêm primeiro.
   - Dentro de cada vaga, prefere o exercício feito há mais tempo (variedade).
4. Em cada vaga: **✓ feito**, **↻ troquei** (máquina ocupada → sugere outra opção da mesma vaga) ou **✗ pulei**.

## Corrida

Aba separada com registro simples: data, distância, tempo. Fica fora da lógica de musculação.

## Fora da v1

- Registro de peso e repetições; progressão de carga.
- Sugestões por IA (v2 opcional e híbrida, com as regras como plano B).
