# Auditoria do Site Trilha de Novos

**Data:** 2 de agosto de 2026
**Objetivo:** Auditoria técnica completa (somente leitura) do site estático da Trilha de Novos — Comunidade Vitral. Nenhuma correção foi feita nesta etapa; os achados abaixo servem como roteiro para as próximas correções.
**Escopo:** 13 páginas HTML (`index`, `mapa`, `complementar`, `404`, `passo-1..9`), CSS, JS do gerador, `dados/passos.json`, specs OpenSpec, estado do git e conformidade com o CLAUDE.md (Regra de Ouro).

---

## Resumo executivo

O site está **funcional, consistente e no geral bem feito**. A auditoria anterior (2026-07-31) foi resolvida: não há mais HTML inválido, o gerador emite `og:image`, o contraste dos botões passou para 7.6:1 e as citações bíblicas seguem a NVT.

Esta auditoria encontrou **0 problemas críticos**, **5 achados importantes** e **8 achados menores**. O achado mais relevante é a **fonte da verdade dessincronizada** no gerador: as seções Ferramentas, Ouça e Aprofunde estão "hardcoded" no código e ignoram o JSON — o que limita futuras edições de conteúdo. Também há um **problema de acessibilidade** novo (contraste do hover do botão "voltar ao topo") e um **estado do git pendente** (12 arquivos deletados e `CLAUDE.md` modificado sem commit).

---

## Crítico

Nenhum achado crítico nesta auditoria. Todas as verificações que antes eram críticas estão resolvidas (HTML válido, gerador com `og:image`, links funcionando).

---

## Importante

### I1. Gerador ignora `ferramentas`, `ouca` e `aprofunde` do JSON — conteúdo hardcoded
- **Onde:** `scripts/gerar-passos.js` — `renderFerramentas()` (~linha 92), `renderOuca()` (~linha 134) e `renderAprofunde()` (~linha 144)
- **Problema:** as funções de renderização destas 3 seções **não recebem o passo** e produzem conteúdo fixo: Ferramentas sempre mostra "Bible App, Lectio 365, Vitral no Spotify", Ouça sempre mostra "Em breve" e Aprofunde sempre mostra "Livro Sugerido / Música Sugerida — Em breve". Os campos `ferramentas`, `ouca` e `aprofunde` de `dados/passos.json` **nunca são lidos** (hoje estão vazios em todos os 9 passos).
- **Impacto:** é impossível variar o conteúdo destas seções por passo sem editar o código do gerador. Quem preencher o JSON esperando que ele apareça no site vai se frustrar. É a mesma classe de problema da antiga C1 (gerador dessincronizado das páginas), agora sobre conteúdo, não sobre meta tags. Também diverge da spec `step-page-generator`, que define placeholders "Em breve" **baseados em arrays vazios** do JSON.
- **Correção sugerida:** fazer `renderFerramentas(passo)`, `renderOuca(passo)` e `renderAprofunde(passo)` lerem os dados do JSON; ou, se as 3 seções forem realmente fixas para toda a Trilha, remover os campos do JSON (e ajustar a spec) para eliminar a segunda fonte da verdade.

### I2. Contraste do hover do botão "voltar ao topo" (branco sobre amarelo)
- **Onde:** `css/mapa.css:122-126` (`.back-to-top:hover`)
- **Problema:** no hover, o texto muda para `color: white` sobre o fundo amarelo `var(--accent)` (#EAB308). Contraste de **1.92:1**, abaixo do mínimo WCAG AA de 4.5:1. O estado normal usa `--accent-on-accent` (#422006, 7.6:1) — o hover **regride** o contraste.
- **Impacto:** usuários que passam o mouse sobre o botão perdem legibilidade da seta; falha de acessibilidade.
- **Correção sugerida:** no hover, manter `color: var(--accent-on-accent)` (ou remover o override de cor), deixando apenas o `transform`/`opacity`.

### I3. `index.html` sem fallback para JavaScript desativado
- **Onde:** `index.html:87-109` (script que monta o grid via `fetch('dados/passos.json')`)
- **Problema:** o grid "Os 9 Passos" depende 100% de JS. Com JavaScript desativado (ou bloqueado), o `<div id="passos-grid">` fica **vazio** — sem os 9 cards e sem nenhuma mensagem. O único `<noscript>` da página carrega as fontes, não o conteúdo.
- **Impacto:** usuários sem JS não enxergam os passos nem conseguem navegar para eles pela página inicial; impacto também em leitores de tela em navegadores restritivos.
- **Correção sugerida:** adicionar um bloco `<noscript>` com os 9 links estáticos para os passos, ou renderizar o grid no gerador/tempo de build em vez de depender de fetch.

### I4. `aria-label` do logo divergente entre o index e o restante
- **Onde:** `index.html:28` usa "Trilha de Novos — **Página inicial**"; `mapa.html`, `complementar.html`, `404.html` e todas as passos usam "Trilha de Novos — **Voltar ao início**"
- **Problema:** a auditoria anterior (I3) padronizou para "Voltar ao início" nas subpáginas, mas o `index.html` mantém "Página inicial".
- **Impacto:** leitores de tela anunciam labels diferentes conforme a página; incoerência de acessibilidade e de fonte da verdade (o gerador usa um label, o index usa outro).
- **Correção sugerida:** decidir um label único. Sugestão: manter "Página inicial" no index (é a home, não é "voltar") e documentar que essa é a regra; ou unificar tudo. O importante é padronizar e registrar na spec `landing-page`.

### I5. Estado do git pendente: 12 arquivos deletados e `CLAUDE.md` modificado
- **Onde:** repositório, branch `homologacao`
- **Problema:** o `git status` mostra **12 arquivos deletados** em `.opencode/` (6 comandos `opsx-*` e 6 skills `openspec-*`) e `CLAUDE.md` modificado, todos **não commitados**. A deleção é intencional (os comandos/skills foram migrados para o diretório global `/root/.opencode/`), e o `CLAUDE.md` foi atualizado para apontar para os comandos globais — mas nada disso está no commit.
- **Impacto:** se o repositório for clonado/puxado em outra máquina, o estado fica inconsistente com o documento; a branch atual não reflete a intenção documentada.
- **Correção sugerida:** commitar a migração (deleção dos 12 arquivos + `CLAUDE.md` atualizado) em um commit dedicado, ou `git rm` explícito dos arquivos órfãos.

---

## Menor

### M1. `<th>` sem `scope="col"` nas tabelas do mapa
- **Onde:** `mapa.html:146` (Roteiro de Abertura) e `mapa.html:275` (Validação e Encerramento)
- **Problema:** os cabeçalhos `<th>` não declaram `scope="col"`. Em tabelas de dados simples isso é recomendado pelo WCAG para leitores de tela associarem corretamente cabeçalho/coluna.
- **Correção sugerida:** adicionar `scope="col"` aos `<th>` (e, se houver linha de cabeçalho, `scope="row"` nos `<td>` de passo).

### M2. Meta description longas demais nas passos
- **Onde:** `passo-2.html` a `passo-9.html` (meta `description`), derivadas do campo `resumo` do JSON
- **Problema:** comprimentos entre **169 e 251 caracteres** (recomendado ≤ 160 para exibição completa no Google). Exemplos: passo-9 = 251, passo-6 = 231, passo-5 = 230.
- **Impacto:** o Google corta a descrição; o texto visível pode terminar em ponto desconfortável.
- **Correção sugerida:** encurtar os `resumo`/`description` para ≤ 160 caracteres (os campos `descricao` curtos já existem no JSON e podem servir de base).

### M3. CSS morto (4 classes sem uso)
- **Onde:** `css/estilo.css` — `.btn-secondary` (~linha 565), `.day-leitura` (~linha 497), `.placeholder-section` (~linha 630), `.placeholder-icon` (~linha 642)
- **Problema:** nenhuma dessas classes aparece em HTML ou no gerador.
- **Impacto:** CSS desnecessário aumenta o payload (pequeno) e gera confusão de manutenção.
- **Correção sugerida:** remover as 4 classes, ou mantê-las apenas se houver plano de uso.

### M4. `.dica` define `border-color` sem `border-width`/`border-style`
- **Onde:** `css/mapa.css:54` (`details.mapa-card[open]`) e `css/mapa.css:56-59` (`.dica`)
- **Problema:** `.dica` aplica `border-color: var(--accent-border)` mas nenhuma regra define `border: 1px solid ...`; sem `border-style`/`border-width`, a borda **não renderiza**. O efeito visual atual vem só do fundo `--accent-soft`.
- **Impacto:** borda da dica ausente (possivelmente intencional, mas a declaração de `border-color` é inócua).
- **Correção sugerida:** remover o `border-color` da `.dica` ou completar com `border: 1px solid var(--accent-border)` se a borda for desejada.

### M5. Pasta `assets/` vazia e `og:image` em SVG
- **Onde:** `assets/` (raiz) e `og-image.svg`
- **Problema:**
  - `assets/` existe mas está **vazia** — não é referenciada por nada (o README nem a cita mais).
  - `og-image.svg` é um SVG (996 bytes, válido, 1200×630) e é referenciado em todas as 13 páginas. **WhatsApp, Facebook e algumas redes sociais não renderizam SVG como imagem de compartilhamento** — exibem em branco.
- **Impacto:** o preview de compartilhamento pode aparecer sem imagem em plataformas importantes.
- **Correção sugerida:** exportar um PNG 1200×630 de `og-image.svg`, referenciar o PNG nas meta tags e remover a pasta `assets/` vazia (ou usá-la para o PNG).

### M6. `print.css` não cobre o mapa nem o grid de passos
- **Onde:** `css/print.css`
- **Problema:** a folha de impressão trata `.step-section-content`, `.week-day-card`, `.ferramenta-item`, `.comp-item` — mas **não** `.mapa-card`, `.mapa-tabela` nem `.passos-grid`. Ao imprimir o `mapa.html`, os cards podem ficar sem borda/quebra de página.
- **Impacto:** impressão do mapa (um objetivo declarado do material para facilitadores) fica menos polida.
- **Correção sugerida:** adicionar regras de impressão para `.mapa-card`, `.mapa-tabela` e `.passos-grid`.

### M7. Terminologia divergente: "Estação 1" (index) vs "Etapa 1" (passos)
- **Onde:** `index.html:51` ("Estação 1 · Jornada do Discípulo") vs `scripts/gerar-passos.js:47` e todas as passos ("Etapa 1 · Passo N")
- **Problema:** a mesma etapa é chamada de "Estação" na home e "Etapa" nas páginas internas; o `<html>` usa `data-etapa="1"`.
- **Impacto:** incoerência de nomenclatura para o leitor.
- **Correção sugerida:** escolher um termo único ("Estação" ou "Etapa") e aplicar em index, gerador, passos, mapa e specs.

### M8. `?v=` desatualizado em relação à última tag
- **Onde:** todas as 13 páginas e `scripts/gerar-passos.js:263-265` usam `?v=2.10.0`
- **Problema:** a última tag é `v2.11.2-docs`; o README documenta a convenção de **subir o `?v=` a cada nova versão/tag**. Como os CSS não mudaram desde v2.10.0, o cache-busting atual ainda é correto na prática — mas a convenção documentada foi quebrada nas tags v2.11.x.
- **Impacto:** risco futuro: se um CSS mudar e o `?v=` não subir, usuários com cache antigo podem ver página sem estilo (o problema que a v2.11.0 resolveu).
- **Correção sugerida:** na próxima alteração de CSS, subir `?v=` para a nova versão; considerar atualizar o README para "subir `?v=` a cada mudança de CSS", e não necessariamente a cada tag de docs.

---

## Positivos

- **Links internos e downloads:** 9/9 apostilas de `docs/apostilas/` existem e todos os links locais (páginas, CSS, favicon) resolvem — 0 quebrados.
- **Gerador determinístico:** rodar `node scripts/gerar-passos.js` numa cópia temporária produziu **9/9 páginas idênticas** às commitadas (validação completa do diffs).
- **Meta tags:** `og:image`, `og:url` (com URL da página correta em cada passo), `twitter:card` e favicon em 100% das 13 páginas.
- **Acessibilidade básica:** `lang="pt-BR"`, `charset`, viewport, skip-link, 1 `<h1>` por página, hierarquia de títulos, `role="banner"`/`contentinfo`, breadcrumbs — consistentes.
- **HTML:** sem `style=""` inline, sem atributos duplicados (bug C2 da auditoria anterior resolvido), estrutura bem formada em todas as 13 páginas.
- **Segurança:** todos os links `target="_blank"` têm `rel="noopener noreferrer"` (31+ links).
- **Contraste do tema:** texto principal 16.7:1, botões `--accent-on-accent` 7.6:1 — acima de WCAG AA (falha apenas no hover do back-to-top, ver I2).
- **NVT:** as 5 referências bíblicas das passos conferem com o texto literal da Nova Versão Transformadora.
- **Regra de Ouro:** tom acolhedor, linguagem simples e sem jargões em todo o material; coerência com o Playbook.

---

## Situação final

Auditoria **somente leitura** concluída em 2 de agosto de 2026. **Nenhuma correção foi aplicada** — este relatório é o roteiro para a próxima etapa.

Prioridade sugerida para correção:

| Prioridade | Itens |
|---|---|
| Alta | I1 (gerador hardcoded), I2 (contraste hover), I3 (fallback sem JS), I4 (aria-label), I5 (estado do git) |
| Média | M5 (og-image SVG → PNG), M6 (print do mapa), M7 (Estação vs Etapa), M8 (convenção `?v=`) |
| Baixa | M1 (`scope` no th), M2 (meta description), M3 (CSS morto), M4 (border-color sem width) |
