---
name: ui-ux-pro-max
description: Guia de design e implementacao UI/UX para web e mobile com foco em consistencia visual, acessibilidade, interacao e qualidade de entrega. Use quando o usuario pedir criar, melhorar, revisar ou corrigir interfaces.
---

# UI UX Pro Max

Use esta skill para transformar pedidos de interface em implementacoes profissionais, consistentes e acessiveis.

## Quando ativar

Ative para pedidos como:
- criar landing page, dashboard, tela ou fluxo
- melhorar visual/UX de telas existentes
- revisar qualidade de UI
- ajustar responsividade, contrastes e estados interativos

## Fluxo obrigatorio

1. Identificar contexto:
   - tipo de produto (SaaS, fintech, ecommerce, etc.)
   - plataforma/stack (web, Flutter, React Native, etc.)
   - estilo desejado (minimalista, premium, dark, etc.)
2. Definir sistema visual:
   - paleta (primaria, secundaria, destaque, fundo, texto)
   - tipografia (titulos, corpo, escala)
   - espacamento e raio de borda
   - tokens de estado (hover, focus, disabled, error, success)
3. Implementar em componentes reutilizaveis.
4. Validar checklist de qualidade antes de finalizar.

## Regras de qualidade visual

- Sem emojis como icones em UI de producao.
- Todo elemento clicavel deve ter feedback visual e `cursor-pointer` (quando aplicavel).
- Evitar animacoes agressivas; usar transicoes suaves (150-300ms).
- Evitar mudancas de layout em hover/focus.
- Manter consistencia de espacamento e hierarquia tipografica.

## Regras de acessibilidade

- Contraste minimo de texto normal: 4.5:1.
- Estados de foco sempre visiveis.
- Nao depender apenas de cor para comunicar estado.
- Respeitar `prefers-reduced-motion`.
- Formularios com labels claros e mensagens de erro objetivas.

## Responsividade minima

Validar pelo menos em:
- 375px
- 768px
- 1024px
- 1440px

## Formato de entrega

Sempre entregar:
- decisoes de design aplicadas (curtas e objetivas)
- componentes alterados/criados
- riscos ou pendencias (se houver)
- checklist de validacao final marcada
