---
name: codegraph
description: Use o CodeGraph para responder perguntas de arquitetura, fluxo de chamadas e impacto de mudanças com contexto semantico indexado. Use quando o usuario pedir "onde fica", "como funciona", "quem chama", "o que isso chama" ou "qual o impacto".
---

# CodeGraph

Use esta skill para explorar o codigo com foco em velocidade e baixo custo de contexto.

## Fluxo padrao

1. Comece com `codegraph_context` para mapear a area.
2. Use `codegraph_explore` uma vez para trazer os trechos relevantes.
3. Use `codegraph_node` apenas para detalhar um simbolo especifico.

## Escolha da ferramenta por intencao

- "Onde esta X?" -> `codegraph_search`
- "Como X funciona?" -> `codegraph_context`
- "Como X chega em Y?" -> `codegraph_trace`
- "Quem chama isso?" -> `codegraph_callers`
- "Isso chama o que?" -> `codegraph_callees`
- "Se eu mudar isso, quebra o que?" -> `codegraph_impact`
- "Quero varios simbolos relacionados" -> `codegraph_explore`
- "Quero estrutura de arquivos indexados" -> `codegraph_files`
- "Indice esta pronto?" -> `codegraph_status`

## Regras de uso

- Prefira CodeGraph antes de `rg`/`ReadFile` para perguntas estruturais.
- Nao reconstrua manualmente fluxos que `codegraph_trace` resolve em uma chamada.
- Se houver aviso de arquivo desatualizado no resultado, leia somente os arquivos citados no aviso.
- Se `.codegraph/` nao existir, orientar a rodar:

```bash
codegraph init -i
```

## Padrao de resposta

- Responda direto com:
  - entrada principal
  - caminho de execucao/relacionamento
  - pontos de extensao/impacto
- Cite simbolos e arquivos relevantes.
