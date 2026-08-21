# SHARED-04 — Design da comparação de execuções por módulo

> **Prioridade:** Média | **Assignee:** — | **Status:** Pendente

## Escopo

Redesenhar a comparação conforme os [áudios de produto de 21/08/2026](../../references/meetings/21-08-26-comparacao-permissoes-pousio/21-08-26-audios-whatsapp-transcricao-e-encaminhamentos.md): comparar execuções concluídas do mesmo módulo, partindo dos gráficos de resultado e permitindo selecionar execuções de talhões e fazendas acessíveis.

## Entregáveis

- Wireframe a partir da tela de resultado do módulo
- Fluxo `fazenda -> talhão -> execução`, incluindo múltiplas execuções do mesmo talhão
- Adaptação dos gráficos de Emissão, Remoção e Regenerativo para múltiplas séries
- Definição de limite prático, overflow e legibilidade para mais de duas execuções
- Estados sem dados, sem acesso e para registros legados sem talhão
- Decisões de contrato necessárias para reescrever BE-12 e FE-08

## Referências

- Tela de comparação do ATYHA (inspiração)
- Skills: `.agents/skills/ui-ux-pro-max/`, `.agents/skills/business-product-strategist/`
- Radar, normalização cross-module e veredito pertencem a uma possível evolução separada
