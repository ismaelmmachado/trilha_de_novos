# ORIENTAÇÃO: Bootstrap do Contrato de Manutenção de Conteúdo

Texto de orientação reutilizável para preparar um site de trilha (já normalizado,
100% data-driven) para receber o **mesmo contrato de manutenção de conteúdo** usado
neste projeto. O objetivo é que o outro OpenCode *entenda e aplique o contrato da
mesma forma*: fonte da verdade em JSON, HTML gerado, manutenção via Markdown com as
ações INCLUIR / SUBSTITUIR / REMOVER.

Cole este texto em uma nova sessão do OpenCode no projeto de destino e siga os
passos abaixo.

---

## MISSÃO: Criar o contrato de manutenção de conteúdo dos passos

Este site já está normalizado para conteúdo **data-driven**: o conteúdo dos passos
vive em um arquivo de dados (JSON) e as páginas HTML são geradas a partir dele. Sua
missão é criar o **contrato de manutenção** no formato exato usado no projeto de
referência — para que o usuário possa enviar Markdown e você aplicar a manutenção
sempre da mesma forma, sem quebrar nada.

### Regras obrigatórias desta missão

1. **NÃO redesenhe o visual.** Preserve layout, classes CSS e componentes atuais.
2. **NÃO altere conteúdo de texto dos passos** — você apenas vai *documentar* o
   processo de manutenção. Se precisar validar com um exemplo, faça em uma seção
   vazia/placeholder, com conteúdo de teste reversível.
3. **Preserve a REGRA DE OURO / Playbook / estilo do projeto** (se existir
   CLAUDE.md, siga-o).
4. **NÃO invente conteúdo.** O contrato documenta o que JÁ existe na estrutura.
5. **Ao final, valide com um exemplo ponta a ponta** antes de reportar.

### Fase 1 — Mapear as seções reais do site

As seções do site são **semelhantes** às 6 seções de referência abaixo — mas
**NÃO assuma cegamente**. Abra o gerador e o arquivo de dados (JSON) e confirme:

1. Liste as seções que cada página de passo exibe, na ordem real.
2. Para cada seção, identifique o **campo correspondente no JSON**.
3. Registre o mapeamento real em uma tabela como esta:

| Seção (HTML) | Campo no JSON | Estrutura | Vazio = |
|---|---|---|---|
| Para Começar | `para_comecar` | `{ texto, pergunta }` | — |
| Ferramentas | `ferramentas` | `[{ icon, nome, descricao, link, rotulo }]` | "Em breve" (ou oculta via `ocultar_secoes`) |
| Ouça | `ouca` | `{ tipo: "placeholder" \| "player", src, titulo, descricao }` | "Em breve" (ou oculta via `ocultar_secoes`) |
| Aprofunde | `aprofunde` | `{ livro: { titulo, autor, link }, musica: { titulo, artista, link } }` | "Em breve" |
| Pratique | `pratique` | `{ experimento, pergunta }` | — |
| Organize-se | `organizese` | `{ introducao, dias: [{ dia, texto }] }` | dias vazios → "Em breve" |
| (Controle de exibição) | `ocultar_secoes` | array opcional de seções a não renderizar por passo (ex.: `["ferramentas", "ouca"]`) | — |

> Ajuste nomes, ordem e estruturas conforme a realidade deste site. O importante é
> que o mapeamento seja **verdadeiro** para este projeto.
>
> 💡 **Dica de portabilidade:** se o novo site não quiser exibir alguma seção em
> certos passos (ou em todos), pode usar o campo `ocultar_secoes` — os dados da
> seção permanecem no JSON (reversível), apenas deixam de ser renderizados. No
> projeto Trilha, Ferramentas e Ouça são ocultas em todos os passos dessa forma.

### Fase 2 — Criar o contrato de manutenção

Crie o arquivo `docs/MANUTENCAO.md` neste projeto com o **mesmo conteúdo** do
contrato de referência, adaptado ao mapeamento real da Fase 1. O contrato deve
conter:

1. **Fonte da verdade:** o arquivo JSON; HTML é gerado; **nunca editar HTML na mão**;
   fluxo: editar JSON → rodar o gerador → verificar → salvar. Inclua o comando real
   do gerador (ex.: `node scripts/gerar-passos.js`).
2. **Tabela seção → campo do JSON** (a da Fase 1), com regras de mapeamento
   (`ferramentas` como lista de itens, `ouca` com `tipo: "player"` para publicar,
   `aprofunde` com `livro`/`musica`).
3. **Formatos de solicitação** — os DOIS formatos aceitos:
   - **Formato 1 — Arquivo Markdown completo por passo (canônico):** espelho do
     passo inteiro, com `PASSO: N — NOME`, título, seções com emoji, e convenções
     `Pergunta:` → `pergunta`, `Pergunta da semana:` → `pergunta`,
     `Dia: Seg — ...` → dia correspondente.
   - **Formato 2 — Instrução em linha (atalho):**
     `PASSO N — Seção: ## Nome — Ação: INCLUIR/SUBSTITUIR/REMOVER — Conteúdo: [...]`.
   - **Regra de prioridade:** se os dois formatos aparecerem juntos, o arquivo
     completo tem prioridade.
4. **Ações:** INCLUIR (adiciona ao fim), SUBSTITUIR (troca todo o conteúdo),
   REMOVER (elimina a seção). Tabela de aplicação por ação.
5. **Fluxo de execução:** ler o JSON sempre do estado atual → comparar → aplicar só
   as seções indicadas → rodar o gerador → verificar → reportar
   INCLUÍDO/SUBSTITUÍDO/REMOVIDO por passo.
6. **Regras de segurança:** não duplicar (reportar "já aplicado"), seção inexistente
   é criada após a anterior, preservar emojis/negritos/links, não inventar conteúdo.

### Fase 3 — Registrar o contrato para carregamento automático

Adicione ao arquivo `CLAUDE.md` (ou `AGENTS.md`, se existir) deste projeto uma
referência ao contrato, para que **toda sessão futura carregue a regra
automaticamente**. Exemplo:

> **Manutenção de conteúdo dos passos:** antes de aplicar qualquer mudança de
> conteúdo, leia `docs/MANUTENCAO.md` deste projeto e siga exatamente o contrato
> (fonte da verdade em JSON, HTML gerado, ações INCLUIR/SUBSTITUIR/REMOVER).

### Fase 4 — Validar com exemplo ponta a ponta

1. Escolha UMA seção de UM passo (idealmente vazia/placeholder) e aplique um
   exemplo de teste: ex., INCLUIR uma ferramenta fictícia em `ferramentas`.
2. Rode o gerador e confirme que o HTML mudou corretamente.
3. **Reverta o exemplo de teste** (volte o JSON ao estado original) e regenere,
   confirmando que o site voltou ao estado anterior.
4. Relate o resultado ao usuário.

### Entregáveis esperados

- `docs/MANUTENCAO.md` criado com o mapeamento real deste site (Fase 1–2)
- Referência ao contrato registrada no `CLAUDE.md`/`AGENTS.md` (Fase 3)
- Validação ponta a ponta concluída e revertida (Fase 4)
- Resumo claro do que foi criado, para o usuário revisar antes de salvar

---

## Uso depois do bootstrap

Após esta missão, as manutenções do dia a dia são simples — basta o usuário enviar
o Markdown (arquivo completo ou instrução em linha) e dizer algo como:

> "Aplique no contrato deste projeto: [Markdown/instrução]"

Você (OpenCode) lerá `docs/MANUTENCAO.md` automaticamente e seguirá o fluxo.
