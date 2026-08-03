# Template para Criação de Formulários

Use este template para solicitar a criação de formulários no projeto Gaia.

---

## 📋 Template

```markdown
## Nome do Formulário
[Nome descritivo do formulário]

## Localização
- Feature: [pasta dentro de src/features/]
- Componente pai: [onde o formulário será usado]

## Campos

| Campo | Tipo | Label | Placeholder | Obrigatório | Validação |
|-------|------|-------|-------------|-------------|-----------|
| nome  | text | Nome  | Digite...   | Sim         | min 2 chars |

### Tipos de campo disponíveis:
- `text` - Input de texto
- `email` - Input de email
- `password` - Input de senha
- `number` - Input numérico
- `textarea` - Área de texto
- `select` - Dropdown (informar opções)
- `checkbox` - Checkbox único (boolean)
- `checkbox-group` - Grupo de checkboxes (array)
- `radio` - Radio group (informar opções)
- `switch` - Toggle switch
- `date` - Seletor de data

## Opções (se aplicável)
[Para campos select, radio, checkbox-group]

```typescript
const opcoesCampo = [
  { value: "opcao1", label: "Opção 1" },
  { value: "opcao2", label: "Opção 2" },
]
```

## Ação no Submit
[O que deve acontecer ao enviar o formulário]
- [ ] Chamar API
- [ ] Exibir toast de sucesso
- [ ] Fechar modal/dialog
- [ ] Redirecionar para: [rota]
- [ ] Outro: [descrever]

## Contexto adicional
[Informações extras, regras de negócio, dependências entre campos, etc.]
```

---

## 📝 Exemplo Preenchido

```markdown
## Nome do Formulário
Novo Projeto

## Localização
- Feature: projetos/novo-projeto
- Componente pai: FormDialog

## Campos

| Campo | Tipo | Label | Placeholder | Obrigatório | Validação |
|-------|------|-------|-------------|-------------|-----------|
| nome | text | Nome do Projeto | Ex: Fazenda São João | Sim | min 3, max 100 |
| descricao | textarea | Descrição | Descreva o projeto... | Não | max 500 |
| status | select | Status | Selecione... | Sim | - |
| dataInicio | date | Data de Início | - | Sim | não pode ser passado |
| notificacoes | switch | Receber notificações | - | Não | - |

## Opções (se aplicável)

```typescript
const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "em_andamento", label: "Em Andamento" },
  { value: "concluido", label: "Concluído" },
]
```

## Ação no Submit
- [x] Chamar API: POST /api/projetos
- [x] Exibir toast de sucesso
- [x] Fechar modal/dialog
- [ ] Redirecionar para: -

## Contexto adicional
- O campo "dataInicio" só aparece quando status é "em_andamento"
- Usar mutation do TanStack Query para a chamada API
```

---

## 🏗️ Estrutura de Arquivos Gerada

```
src/features/[feature]/[nome-formulario]/
├── [nome-formulario].tsx        # Componente principal (hook + FormProvider)
├── [nome-formulario]-form.tsx   # Formulário com campos (Controller + Field)
└── use-[nome-formulario].tsx    # Hook com schema Zod + useForm
```

---

## 🧩 Stack Utilizada

| Tecnologia | Uso |
|------------|-----|
| `react-hook-form` | Gerenciamento de estado do form |
| `zod` | Validação de schema |
| `@hookform/resolvers` | Integração Zod + RHF |
| `shadcn/ui Field` | Componentes de campo acessíveis |
| `shadcn/ui Input/Select/etc` | Componentes de UI |

---

## 🔗 Referências

- [shadcn/ui Field](https://ui.shadcn.com/docs/components/field)
- [shadcn/ui React Hook Form](https://ui.shadcn.com/docs/forms/react-hook-form)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
