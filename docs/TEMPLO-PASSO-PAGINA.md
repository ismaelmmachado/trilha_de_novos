# TEMPLO DE PÁGINA DO PASSO — Tipos de Conteúdo Complementar

Este documento define **que tipo de conteúdo** entra em cada seção da **página do
passo no site** (ex.: `passo-2.html`). Ele complementa o
[TEMPLO DE APOSTILA](TEMPLO-APOSTILA-TIPOS.md): lá se define a apostila (material do
encontro), aqui se define a página web (companheiro digital).

Tudo segue a [REGRA DE OURO](CLAUDE.md). A página **não repete a apostila** — ela
aprofunda, conecta e convida à prática.

---

## 1. Princípio norteador

- A **apostila** é o material do encontro (impresso/PDF).
- A **página web** é o companheiro digital: aprofunda, conecta e convida à prática.

**Regra central:** se o conteúdo já está no PDF do passo, **não duplica**. Usa-se
outro recorte, outra mídia ou outro recurso. A página existe para agregar — não para
espelhar.

Antes de escrever uma seção, pergunte-se:

> Isso é algo que a apostila já diz? Se sim, troque por outro ângulo.
> Isso ajuda a pessoa a viver o tema na semana?
> Isso aponta para fora (cidade, serviço, próximo)?

---

## 2. Seções da página (nesta ordem)

| # | Seção | Estado atual | Tipo de conteúdo complementar proposto | Por quê (REGRA DE OURO) |
|---|---|---|---|---|
| 1 | **Para Começar** 📖 | Texto orientado ao leitor (abertura + **Texto Bíblico** NVT + **Reflita**) | **Âncora de abertura para o leitor**: 1–2 parágrafos curtos com um ângulo novo do tema (uma imagem, um verso NVT, uma pergunta que provoca), fechando com a pergunta central do passo. | Acolhe quem chega na página sozinho; a apostila já tem a abertura narrativa. Aqui vale um *convite*, não orientação interna. |
| 2 | **Ferramentas** 🛠️ | **Oculta em todos os passos** via `ocultar_secoes` (dados permanecem no JSON) | **Ferramenta-tema**: 1–3 itens *específicos* do passo (ex.: passo 2 → meditação/identidade; passo 4 → checklist C.A.F.É./G.A.P.I.S.; passo 6 → recurso sobre Batismo/Ceia). As gerais entram só quando fizerem sentido. | Ferramenta genérica repetida não agrega; a específica ajuda a "viver" o tema na semana. |
| 3 | **Ouça** 🎧 | **Oculta em todos os passos** via `ocultar_secoes` (dados permanecem no JSON) | **Áudio do tema**: episódio do podcast da Vitral sobre o assunto, devocional em áudio (Lectio 365) ou música que acompanha a reflexão. 1 item, com 1 linha de descrição. | O mesmo tema em outra linguagem (auditiva) aprofunda e acomoda outro jeito de aprender. |
| 4 | **Aprofunde** 📚 | "Em breve" (placeholder) | **Trilha de aprofundamento**: livro + música + link externo (artigo, vídeo, perfil de um personagem bíblico). Não repetir versículos da apostila — apontar para fora. | É o espaço natural de aprofundamento; missional por apontar para fora da igreja. |
| 5 | **Pratique** 🎯 | Já tem experimento + pergunta da semana | **Prática**: manter experimento + pergunta, garantindo que a prática aponte para fora. | Converte leitura em discipulado; o missional é o coração da Vitral. |
| 6 | **Organize-se** 📋 | Já tem plano de 7 dias | **Cadência da semana**: manter os 7 dias, com padrão claro — leitura NVT + 1 ação pequena por dia; dias vazios ganham conteúdo (evitar "Em breve"). | Dá ritmo sem virar lista de tarefas; "Em breve" em dias vazios quebra a fluidez. |
| 7 | **Apostila** ↓ | Botão de download | **Botão + frase de contexto** (ex.: "Quer levar para o encontro? Baixe a apostila deste passo"). Sempre presente, acima da dobra. | Reforça que a página é complemento; a apostila segue sendo a fonte. |

---

## 3. Regras transversais (valem para toda a página)

1. **Não repetir a apostila** — se o conteúdo já está no PDF do passo, não duplica;
   usa-se outro recorte, outra mídia ou outro recurso.
2. **NVT sempre** — qualquer versículo citado na página é NVT, com referência.
3. **1 seção = 1 pergunta** — cada bloco termina com uma pergunta ou convite, nunca
   com uma ordem.
4. **Curto** — parágrafo de 2–3 linhas por bloco; a página respira, não compete
   com o PDF.
5. **Fonte da verdade** — tudo continua em `dados/passos.json` (o gerador regenera
   as páginas). Nenhuma edição manual em `passo-N.html`.
6. **Placeholders** — seção sem conteúdo mostra "Em breve" (comportamento atual),
   mas a meta é reduzir os vazios.

---

## 4. Mapeamento JSON ↔ tipo esperado

Fonte da verdade: `dados/passos.json`. O campo `pdf` guarda o token de busca da
apostila (contrato com `scripts/apostilas.js`).

| Seção | Campo no JSON | Tipo esperado |
|---|---|---|
| Para Começar | `para_comecar` | `{ texto, pergunta }` — texto = âncora de abertura (leitor) com `**Texto Bíblico:**` (NVT) e `**Reflita:**`, pergunta = pergunta central |
| Ferramentas | `ferramentas` | `[{ icon, nome, descricao, link, rotulo }]` — itens específicos do tema (atualmente oculto via `ocultar_secoes`) |
| Ouça | `ouca` | `{ tipo: "player", src, titulo, descricao }` — áudio do tema (atualmente oculto via `ocultar_secoes`) |
| Aprofunde | `aprofunde` | `{ livro: {...}, musica: {...} }` — trilha de aprofundamento |
| Pratique | `pratique` | `{ experimento, pergunta }` — prática (idealmente com camada missional) |
| Organize-se | `organizese` | `{ introducao, dias: [{ dia, texto }] }` — cadência da semana |
| Apostila | `pdf` | token de busca (ex.: `"PASSO 2"`) — não alterar sem necessidade |
| (Controle de exibição) | `ocultar_secoes` | array opcional de seções a não renderizar (ex.: `["ferramentas", "ouca"]`) |

---

## 5. Impacto de implementação

| Onde | O que muda |
|---|---|
| `dados/passos.json` | Novos conteúdos por campo conforme a seção 4; reduzir dias vazios em `organizese`; ajustar `para_comecar` para ângulo de leitor |
| `scripts/gerar-passos.js` | Mínimo ou nenhum ajuste estrutural — as seções já suportam o formato; possível ajuste de exibição (ex.: frase de contexto do botão) |
| `docs/MANUTENCAO.md` | Atualizar o mapeamento seção → campo com o "tipo esperado" aqui definido |

---

## 6. Checklist rápido antes de finalizar

- [ ] Cada seção segue o **tipo** indicado na tabela?
- [ ] O conteúdo **não repete** a apostila do passo?
- [ ] Citações na **NVT**, com referência?
- [ ] Cada bloco termina com **pergunta ou convite**?
- [ ] Parágrafos curtos (2–3 linhas por bloco)?
- [ ] Edição feita em `dados/passos.json`, não em `passo-N.html`?
- [ ] Placeholders "Em breve" reduzidos ao mínimo?

---

## 7. Referências

- [REGRA DE OURO — CLAUDE.md](CLAUDE.md)
- [MANUTENÇÃO — Contrato de manutenção de conteúdo dos passos](MANUTENCAO.md)
- [TEMPLO DE APOSTILA — Tipos de conteúdo por seção](TEMPLO-APOSTILA-TIPOS.md)
