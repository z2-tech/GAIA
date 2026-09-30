# 06 · Página pública por módulo

Complementa o [03](03-analise-produto.md). Base: [../modulos-referencia.md](../modulos-referencia.md).
Aparecem só os módulos contratados (`Project.modules`) que têm cálculo oficial no
documento.

A página é mais curta que o PDF e mais exposta: qualquer pessoa lê, inclusive
consumidor. Por isso cada módulo tem **um número principal e uma frase de aviso**,
e o texto completo fica em "Detalhes técnicos".

## Emissão

- **Número principal:** kgCO₂e por kg do produto (o que faz sentido num pacote).
  No projeto, por produto; o total em tCO₂e vai em detalhes.
- **Detalhes:** fóssil, biogênico e mudança de uso do solo separados; período;
  fronteira (berço à porteira); alocação; GWP; versão dos fatores.
- **Aviso curto:** "Pegada do berço à porteira da fazenda, autodeclarada,
  calculada pela GAIA conforme ISO 14067. Não verificada por terceira parte."
  Troca para "Verificada por … em dd/mm" depois da feature 04. A fronteira é
  obrigatória no claim climático (CONAR Anexo U, 9.1).

## Remoção (RothC)

- **Número principal:** ganho médio anual do projeto (tCO₂e/ha/ano), rotulado
  "estimativa".
- **Regras:**
  - Nunca subtrair da emissão. Nada de "líquido", "neutro", "positivo" ou
    "compensa" na página.
  - Bloco visualmente separado da Emissão.
- **Aviso curto:** "Estimativa de modelo (RothC). Não é crédito de carbono e não
  compensa a pegada." Texto completo em detalhes (o aviso padrão da referência).
- Risco maior aqui que no PDF: o consumidor não lê a metodologia. Vale perguntar
  se a Remoção entra na página pública ou fica só no PDF.

## Regenerativo

- **Número principal:** "X % da área na faixa Bom do índice GAIA v1" (projeto) ou
  a faixa da fazenda (Bom, Atenção, Crítico). Nunca "fazenda regenerativa".
- **Detalhes:** as 5 seções com a faixa de cada; versão do índice.
- **Aviso curto:** "Índice interno GAIA, autodeclarado. Não é certificação nem
  selo."
- Se a fazenda é só de lavoura, a nota inclui pontos de pecuária até o cálculo ser
  corrigido. Não publicar antes disso, ou publicar com aviso.

## Biodiversidade

- **Número principal:** classificação (baixa, média, alta).
- **Aviso curto:** "Autoavaliação de práticas. Indica potencial, não mede espécies."
- Tela ainda em construção. Proposta: fica fora da primeira versão da página.

## Resumo da página por módulo

```
 EMISSÃO                 REMOÇÃO (estimativa)      REGENERATIVO             BIODIVERSIDADE
 0,29 kgCO₂e/kg algodão  +0,8 tCO₂e/ha/ano         62% da área em Bom       (depois)
 Autodeclarado           Não é crédito de carbono  Não é certificação
```
