# MANUTENÇÃO — Contrato de Manutenção de Conteúdo dos Passos

Este documento define **como** o conteúdo das páginas de passo da Trilha de Novos
é mantido. Ele vale para qualquer sessão do OpenCode e para qualquer pessoa que vá
editar conteúdo. Siga-o exatamente.

---

## 1. Fonte da verdade

Todo o conteúdo dos 9 passos vive em **`dados/passos.json`**.

- As páginas `passo-1.html` … `passo-9.html` são **geradas** por `scripts/gerar-passos.js`.
- **NUNCA edite `passo-N.html` na mão.** O HTML é descartável — ele é regenerado.
- O fluxo de qualquer manutenção é: **editar o JSON → rodar o gerador → verificar → salvar**.

```bash
node scripts/gerar-passos.js
```

> A `index.html` carrega os passos via `fetch('dados/passos.json')` — portanto, editar o
> JSON também atualiza os cards da página inicial automaticamente.

---

## 2. Mapeamento seção → campo do JSON

Cada seção de um passo no site corresponde a um campo em `dados/passos.json`.

| Seção (HTML) | Campo no JSON | Estrutura | Vazio = |
|---|---|---|---|
| Para Começar | `para_comecar` | `{ texto, pergunta }` | — |
| Ferramentas | `ferramentas` | `[{ icon, nome, descricao, link, rotulo }]` | "Em breve" (se não ocultada) |
| Ouça | `ouca` | `{ tipo: "placeholder" \| "player", src, titulo, descricao }` | "Em breve" (se não ocultada) |
| Aprofunde | `aprofunde` | `{ livro: { titulo, autor, link }, musica: { titulo, artista, link } }` | "Em breve" |
| Pratique | `pratique` | `{ experimento, pergunta }` | — |
| Organize-se | `organizese` | `{ introducao, dias: [{ dia, texto }] }` | dias sem texto → "Em breve" |
| Apostila | `pdf` | `"<token de busca>"` (ex.: `"PASSO 8"`, `"Quem Somos e Como Caminhamos"`) | botão "Apostila em breve" |

Regras do mapeamento:

- **`ferramentas`:** cada item é uma ferramenta com ícone (`icon`), nome (`nome`),
  descrição (`descricao`), URL (`link`) e o texto do botão (`rotulo`, ex.: "Baixar",
  "Ouvir"). Para **incluir** uma ferramenta, adicione um item ao array; para
  **remover**, retire o item.
- **`ouca`:** para publicar um episódio/áudio, use `tipo: "player"` e preencha
  `src` (URL), `titulo` e `descricao`. Para esvaziar, volte para
  `{ "tipo": "placeholder", "src": "" }`.
- **`aprofunde`:** preencha `livro.titulo` (e `autor`, `link`) para exibir o card
  de livro; preencha `musica.titulo` (e `artista`, `link`) para exibir o card de
  música. Deixe `{}` nos sub-objetos para esvaziar.
- **`ocultar_secoes` (controle de exibição):** campo **opcional** por passo —
  lista de seções que **não** devem aparecer na página (ex.: `["ferramentas",
  "ouca"]`). Se ausente, todas as 6 seções são exibidas. Os dados da seção ocultada
  permanecem no JSON (reversível) — só deixam de ser renderizados. É o mecanismo
  usado para remover Ferramentas e Ouça de todos os passos.

---

## 3. Formatos de solicitação de manutenção

Existem **dois formatos aceitos**. Os dois convergem no mesmo fluxo de execução.

### Formato 1 — Arquivo Markdown completo por passo (canônico)

Você envia o passo inteiro em Markdown, no mesmo espelho da página, e eu aplico
**apenas o que mudou** em relação ao JSON atual.

```markdown
PASSO: 1 — ACOLHIMENTO E IDENTIDADE DA CASA

# Acolhimento e Identidade da Casa

O que é essa comunidade e por que ela existe?

📖
## Para Começar

[conteúdo]
Pergunta: [pergunta]

🛠️
## Ferramentas

[nova lista de ferramentas]

🎧
## Ouça

[conteúdo ou "Em breve"]

📚
## Aprofunde

[conteúdo ou "Em breve"]

🎯
## Pratique

[experimento]
Pergunta da semana: [pergunta]

📋
## Organize-se

[introdução]
Dia: Seg — [atividade]
Dia: Ter — [atividade]
```

Regras para o formato completo:

- O conteúdo de cada seção substitui ou completa a seção correspondente no JSON
  conforme a `Ação` informada (ver seção 4).
- A seção que você **não mencionou** permanece exatamente como está.
- `Pergunta:` → campo `pergunta` (Para Começar). `Pergunta da semana:` →
  campo `pergunta` (Pratique). `Dia: Seg — ...` → campo do dia correspondente
  (Organize-se).

### Formato 2 — Instrução em linha (atalho para mudanças pontuais)

Para mudanças pequenas e rápidas, use uma instrução única por seção:

```
PASSO 3 — O RITMO DA VIDA COM DEUS — Seção: ## Ouça — Ação: INCLUIR — Conteúdo: [texto]
```

Pode haver várias instruções na mesma mensagem:

```
PASSO 1 — Seção: ## Pratique — Ação: SUBSTITUIR — Conteúdo: [texto]
PASSO 3 — Seção: ## Ouça — Ação: INCLUIR — Conteúdo: [texto]
PASSO 5 — Seção: ## Aprofunde — Ação: REMOVER
```

### Regra de prioridade entre formatos

- Se os **dois formatos** aparecerem na mesma mensagem, o **arquivo completo tem
  prioridade** (é a fonte mais completa) para as seções que ele cobre.
- Recomendação de uso:
  - Mudança pequena/única → **instrução em linha**
  - Revisão de um passo ou de vários → **arquivo Markdown completo**

---

## 4. Ações

| Ação | O que faz | Aplicação |
|---|---|---|
| **INCLUIR** | Adiciona conteúdo ao final da seção existente | Não apaga nada; apenas acrescenta. |
| **SUBSTITUIR** | Troca todo o conteúdo da seção pelo novo texto | Apaga o conteúdo atual e grava o novo. |
| **REMOVER** | Elimina a seção inteira (título e conteúdo) | Zera o campo no JSON (ou remove o item da lista). |

- Ao **INCLUIR**: o novo conteúdo vai para o fim do conteúdo existente da seção.
- Ao **SUBSTITUIR**: todo o conteúdo atual da seção é descartado.
- Ao **REMOVER**: a seção é eliminada do JSON; no site, seções obrigatórias voltam
  a exibir o placeholder "Em breve" — **exceto** se a seção estiver em
  `ocultar_secoes` do passo (ver seção 2), caso em que não aparece nada.

---

## 5. Fluxo de execução (quem recebe o Markdown)

1. **Ler** `dados/passos.json` — sempre a partir do estado atual, nunca de memória.
2. **Comparar** o conteúdo enviado com o JSON atual antes de qualquer edição.
3. **Aplicar** apenas as seções indicadas, conforme a ação e o formato (seção 4).
4. **Rodar** `node scripts/gerar-passos.js`.
5. **Verificar** que nada foi perdido, que os placeholders estão corretos e que as
   seções em `ocultar_secoes` não aparecem indevidamente.
6. **Reportar** o resumo: por passo, o que foi `INCLUÍDO`, `SUBSTITUÍDO` ou `REMOVIDO`.

### Regras de segurança

- **Não duplicar:** se o texto enviado **já está presente** no JSON, não aplico de
  novo — reporto "já aplicado".
- **Seção inexistente:** se a seção indicada não existir no Markdown, crio-a no
  local apropriado (após a seção anterior) com o conteúdo fornecido.
- **Preservar formatação:** emojis, negritos, links e quebras de linha do conteúdo
  enviado são mantidos na migração para o JSON.
- **Não inventar:** se o conteúdo não foi enviado, ele não é criado nem alterado.

---

## 6. Como publicar uma manutenção

Após aplicar a manutenção, salvar seguindo a [REGRA DE SALVAMENTO](CLAUDE.md):
commit + tag na branch `homologacao` e, quando for para produção, sincronizar
`main`. O conteúdo e o HTML gerado devem ir juntos no mesmo commit.

---

## 7. Manutenção das apostilas (docx/pdf)

As apostilas **não fazem parte do gerador** — são arquivos substituídos nas pastas
de `docs/apostilas/`. Trocar uma apostila **não exige rodar** `gerar-passos.js`.

### Fonte da verdade

| Pasta | Função | Quem baixa |
|---|---|---|
| `docs/apostilas/docx/` | `.docx` — fonte para edição | ninguém (material interno) |
| `docs/apostilas/pdf/` | `.pdf` — versão baixada pelo site | o botão "Baixar Apostila" de cada passo |

> **Regra de ouro:** o que for subido em `main` é a versão oficial. Para atualizar,
> sobrescreva o arquivo em `main` — o site passa a baixar a nova versão sozinho.

### Fluxo de atualização

1. Suba os novos `.docx` em `docs/apostilas/docx/` e os `.pdf` em
   `docs/apostilas/pdf/` em **`main`**.
2. Avisar na sessão → sincronizar a cópia local/VPS com `main` e atualizar a branch
   `homologacao` para ficar **igual a `main`** em `docs/apostilas`.
3. Validar que cada passo tem PDF correspondente (ver token abaixo).

### Token no campo `pdf` (`dados/passos.json`)

O campo `pdf` do passo é o **token de busca** do PDF. O script `scripts/apostilas.js`
lista `docs/apostilas/pdf/` via GitHub API e casa o token com o nome do arquivo.

- **Regra de nomeação:** o nome do PDF **precisa conter o token** do passo
  (ex.: `ESTAÇÃO 1 - PASSO 8 — CELEBRAÇÃO E ENVIO.pdf` contém `PASSO 8`).
- Passos 2–9 usam `PASSO N`; o passo 1 usa `Quem Somos e Como Caminhamos` (o arquivo
  do VITRAL não contém "PASSO 1" no nome).
- Se o token não for encontrado, o botão mostra **"Apostila em breve"**.

> **Não altere o token em `passos.json` sem necessidade:** ele é o contrato entre o
> botão e o nome do arquivo. Se trocar o token, os PDFs existentes podem parar de
> ser encontrados.
