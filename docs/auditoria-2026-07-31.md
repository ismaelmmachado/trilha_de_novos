# Auditoria do Site Trilha de Novos

**Data:** 31 de julho de 2026
**Objetivo:** Auditoria completa (somente leitura) do site estático da Trilha de Novos — Comunidade Vitral. Nenhuma correção foi feita nesta etapa; os achados abaixo servem como roteiro para as próximas correções.
**Escopo:** 13 páginas HTML (`index`, `mapa`, `complementar`, `404`, `passo-1..9`), CSS, JS do gerador, `dados/passos.json`, apostilas, estado do git e conformidade com o CLAUDE.md (Regra de Ouro).

---

## Resumo executivo

O site está **funcional e no geral bem feito**: todos os links de download existem, todas as páginas têm OG image + favicon, o contraste do tema principal é bom e as citações bíblicas seguem a NVT em quase todos os casos.

Porém, há **2 problemas críticos** (HTML inválido e gerador dessincronizado), **5 achados importantes** (contraste, navegação mobile inconsistente, fontes da verdade divergentes e estado do git) e **8 achados menores** que precisam de atenção.

---

## Crítico

### C1. Gerador não emite `og:image` — rodar o gerador apaga o OG das passos
- **Onde:** `scripts/gerar-passos.js` (bloco `<head>`, ~linhas 251-263)
- **Problema:** o template do gerador tem `og:title`, `og:description`, `og:type`, `og:url` e `twitter:card`, mas **não tem `og:image`**. As 9 páginas `passo-*.html` commitadas **têm** `og:image` (foram editadas à mão depois da geração). Se o gerador rodar de novo, as páginas de passo perdem a meta tag OG image.
- **Impacto:** links compartilhados das passos deixariam de exibir a imagem de preview. Fonte da verdade (gerador) dessincronizada das páginas.
- **Correção sugerida:** adicionar `<meta property="og:image" content="https://ismaelmmachado.github.io/trilha_de_novos/og-image.svg" />` ao template do gerador.

### C2. Atributo `class` duplicado — pills "Em breve" quebradas
- **Onde:** `complementar.html:72, 79, 92, 119, 132`
- **Problema:** `<span class="comp-link" class="comp-em-breve">Em breve</span>`. Em HTML, quando um atributo aparece duas vezes, apenas o primeiro valor é considerado; o segundo é ignorado. Resultado: o estilo `.comp-em-breve` (opacidade 0.5) **nunca é aplicado**.
- **Impacto:** as 5 pills "Em breve" aparecem com a mesma aparência dos links funcionais — o usuário não consegue distinguir que aquilo ainda não está disponível. É um bug visual real e HTML inválido.
- **Correção sugerida:** unir as classes em um único atributo: `class="comp-link comp-em-breve"`.

---

## Importante

### I1. Contraste baixo do botão de download (texto branco sobre amarelo)
- **Onde:** `css/estilo.css:292` (`.download-btn`) e `css/estilo.css:554` (`.btn-primary`)
- **Problema:** os botões usam `background: var(--accent-gradient)` — gradiente de `#EAB308` (amarelo) até `#854D0E` (marrom) — com texto branco. No extremo amarelo, o contraste é de **1.92:1**, abaixo do mínimo WCAG AA de **4.5:1** para texto normal (e até de 3:1 para texto grande). O texto começa ilegível na ponta esquerda do botão.
- **Impacto:** o botão "Baixar apostila", presente em todas as 9 passos, tem baixa legibilidade. Prejudica acessibilidade e usabilidade.
- **Nota:** as demais combinações do tema estão boas — texto grafite/bege = 16.7:1, `--accent-text` (#92400E) sobre `--accent-soft` (#FEF3C7) = 6.37:1.
- **Correção sugerida:** usar `--accent-text` (#92400E) ou `#422006` como cor de texto sobre o gradiente amarelo (7.6:1), ou escurecer o gradiente.

### I2. Navegação mobile inconsistente
- **Onde:** `complementar.html:44` usa **"Material Complementar"**; `index.html:43`, `mapa.html:44`, `404.html:71` e todas as passos usam **"Material"**.
- **Problema:** o CHANGELOG v2.8.0 corrigiu o label só no `complementar.html`, criando divergência com as outras 12 páginas na navegação mobile.
- **Impacto:** incoerência de UX entre páginas do mesmo site.
- **Correção sugerida:** padronizar o label (recomendado "Material Complementar", como no desktop).

### I3. `aria-label` do logo divergente
- **Onde:** páginas estáticas (`index.html`, `mapa.html`, `complementar.html`, `404.html`) usam "Trilha de Novos — **Página inicial**"; gerador e passos (`scripts/gerar-passos.js` e `passo-*.html`) usam "Trilha de Novos — **Voltar ao início**".
- **Problema:** leitores de tela anunciam labels diferentes dependendo da página.
- **Impacto:** inconsistência de acessibilidade; reforça o problema C1 de fontes da verdade divergentes.
- **Correção sugerida:** escolher um label padrão e aplicar no gerador + páginas estáticas.

### I4. Estado do git: `og-image.svg` untracked e `apostilas/` mal removida
- **Onde:** raiz do repositório
- **Problema:**
  - `og-image.svg` (novo, referenciado em todas as 13 páginas) está **untracked** — se o push ocorrer sem ele, as meta tags `og:image` apontam para um arquivo inexistente no GitHub Pages.
  - A pasta `apostilas/` foi deletada do disco, mas **2 arquivos ainda estão rastreados** no git (`apostilas/doc_065d...ANEXO`, `apostilas/doc_47c24e...FACILITADOR`) — precisam de `git rm` para o estado do repositório ficar consistente.
- **Correção sugerida:** `git add og-image.svg` e `git rm` dos 2 arquivos órfãos de `apostilas/`.

### I5. Documentação desatualizada (README e CHANGELOG)
- **Onde:** `README.md:30-32, 71` e `CHANGELOG.md`
- **Problema:**
  - README linha 30 referencia `apostilas/` ("Apostilas .docx originais") — pasta deletada; agora elas vivem em `docs/apostilas/`.
  - README linha 32 referencia `assets/` — pasta existe mas está vazia.
  - README linha 71: "Tags: v1.0.0 a v2.6.0" — o repositório já tem tags até `v2.9.0-css-card-row`.
  - CHANGELOG não documenta a versão `v2.9.0-css-card-row` nem as mudanças pendentes (og-image, apostilas movidas, tokens no gerador).
- **Correção sugerida:** atualizar a estrutura de pastas e a lista de tags no README; registrar v2.9.0 no CHANGELOG.

---

## Menor

### M1. Estilos inline restantes no `index.html`
- **Onde:** `index.html:53, 61, 62, 69, 71`
- **Problema:** 5 atributos `style="..."` inline (hero, seção "Os 9 Passos", CTA final). A revisão v2.8.0 removeu os inline de `mapa.html` e `complementar.html`, mas não do `index.html`.
- **Correção sugerida:** mover para `css/estilo.css` por consistência.

### M2. `404.html` com `<style>` inline e sem `css/print.css`
- **Onde:** `404.html:20-48` e `<head>` (linha 19)
- **Problema:** a página 404 tem um bloco `<style>` inline no `<head>` (única página assim) e **não carrega** `css/print.css`, ao contrário das outras 12 páginas.
- **Correção sugerida:** mover o estilo para um CSS externo e adicionar o `print.css`.

### M3. Botão "voltar ao topo" com `href="#"`
- **Onde:** `mapa.html:375`
- **Problema:** `<a href="#" class="back-to-top">` — comportamento padrão de âncora; muda a URL para `#` e não dá rolagem suave.
- **Correção sugerida:** `href="#top"` (com `id="top"` no body) ou rolagem via JS.

### M4. Breadcrumb dentro do `<main>` em uma única página
- **Onde:** `complementar.html:48-50` (breadcrumb dentro do `<main>`); em `mapa.html:49-56`, `404.html` e todas as passos o breadcrumb fica **fora** do `<main>`.
- **Problema:** o atalho "pular para o conteúdo" se comporta de forma diferente na página complementar.
- **Correção sugerida:** padronizar o posicionamento do breadcrumb.

### M5. Botão de download some na impressão
- **Onde:** `css/print.css` (oculta `.download-btn`)
- **Problema:** ao imprimir um passo, o botão "Baixar apostila" é removido. Pode ser intencional (evitar imprimir o botão), mas vale confirmar — a impressão é um objetivo declarado do material.
- **Correção sugerida:** confirmar se é desejado; caso contrário, não ocultar.

### M6. Citações com aspas divergem levemente da NVT
- **Onde:**
  - `passo-2.html` (1 Pedro 2.10): "Vocês são povo de Deus" — NVT: "agora são povo de Deus".
  - `passo-4.html` (Salmo 42.1): "Como a corça anseia por águas..." — NVT: "Como a corça anseia pelas correntes de água...".
  - `passo-7.html` (Efésios 2.19): "Vocês já não são estrangeiros, mas membros da família de Deus" — NVT: "Vocês já não são estranhos e forasteiros, mas concidadãos do povo santo e membros da família de Deus".
- **Problema:** são apresentadas como citações diretas (aspas) mas não são literais. As demais citações do site são referências/paráfrases fiéis à NVT (Mateus 28.19, Efésios 2.8-9, João 5.24, Romanos 8.38-39, 1 Coríntios 11.26, etc.) — conformidade com a NVT em ~90% dos casos.
- **Correção sugerida:** ajustar as 3 citações para o texto literal da NVT ou usar sem aspas como paráfrase.

### M7. `index.html` duplica os dados dos passos
- **Onde:** `index.html` (script inline que monta os cards com as 9 descrições)
- **Problema:** as descrições estão embutidas no JS da página, duplicando `dados/passos.json` — duas fontes da verdade.
- **Impacto:** alterar uma descrição exige atualizar em dois lugares.
- **Correção sugerida:** carregar `dados/passos.json` via `fetch` (como em `mapa.html`) ou gerar os cards no `gerar-passos.js`.

### M8. Processo OpenSpec não finalizado
- **Onde:** `openspec/changes/site-trilha-de-novos/`
- **Problema:** a mudança não foi arquivada e o `tasks.md` permanece majoritariamente pendente, embora o site esteja pronto.
- **Correção sugerida:** revisar/arquivar a mudança ou abrir uma nova para as correções desta auditoria.

---

## Positivos

- **Links de download:** 9/9 apostilas de `docs/apostilas/` existem e os caminhos em `passos.json` e `gerar-passos.js` estão consistentes.
- **Links externos:** todos os links `target="_blank"` têm `rel="noopener noreferrer"`.
- **OG + favicon:** 100% das 13 páginas têm `og:title/description/type/url/image`, `twitter:card` e `favicon.svg`.
- **Acessibilidade básica:** todas as páginas têm `lang="pt-BR"`, `charset`, `viewport`, skip-link, `role="banner"`/`contentinfo`, breadcrumb e títulos hierárquicos.
- **Contraste do tema:** texto principal 16.7:1 e pills `--accent-text`/`--accent-soft` 6.37:1 (acima de AA). Falha apenas o branco sobre o extremo amarelo do gradiente (I1).
- **Regra de Ouro / NVT:** tom acolhedor, linguagem simples e sem jargões em todo o material; citações predominantemente na NVT (ver M6).
- **SEO:** meta description, OG e fontes com `preconnect` corretos.

---

## Situação final

Todas as correções desta auditoria foram aplicadas e salvas. Segue o status por item:

| Item | Correção | Versão |
|---|---|---|
| C1 (gerador sem `og:image`) | `og:image` adicionado ao template de `gerar-passos.js` + passos regeneradas | v2.10.0 |
| C2 (pills `class` duplicado) | `class="comp-link comp-em-breve"` nas 5 pills de `complementar.html` | v2.10.0 |
| I1 (contraste do botão) | Token `--accent-on-accent` (#422006) + fundo sólido `var(--accent)` (7.6:1) | v2.10.0 |
| I2 (nav mobile inconsistente) | Label padronizado "Material Complementar" no gerador e em todas as páginas | v2.10.0 |
| I3 (aria-label do logo) | Padronizado "Trilha de Novos — Voltar ao início" nas páginas estáticas | v2.10.0 |
| I4 (estado do git) | `og-image.svg` commitado; apostilas movidas para `docs/apostilas/` e órfãos removidos do git | v2.10.0 |
| I5 (README/CHANGELOG) | Estrutura de pastas e tags atualizadas; entradas v2.9.0 e v2.9.1 adicionadas | v2.10.0 |
| M1 (estilos inline do index) | Movidos para classes em `css/estilo.css` (`.hero-intro`, `.section-title-center`, `.section-intro`, `.section-cta`) | v2.10.0 |
| M2 (404 com `<style>` inline) | Estilo movido para `estilo.css` (classes `.error-page*`) + `print.css` adicionado | v2.10.0 |
| M3 (back-to-top `href="#"`) | `href="#top"` com `id="top"` no body | v2.10.0 |
| M4 (breadcrumb no `<main>`) | Breadcrumb do complementar movido para fora do `<main>` | v2.10.0 |
| M5 (botão some na impressão) | Mantido oculto na impressão (decisão confirmada) | v2.10.0 |
| M6 (citações divergentes da NVT) | 3 citações ajustadas ao texto literal da NVT em `dados/passos.json` | v2.10.0 |
| M7 (index duplica dados) | `fetch('dados/passos.json')` com campo `descricao` | v2.10.0 |
| M8 (processo OpenSpec) | Correções propostas em `correcoes-auditoria`; mudanças arquivadas e specs sincronizadas | v2.11.1 |
| Cache (página sem estilo) | Cache-busting `?v=` nos CSS (13 páginas), fontes async com `<noscript>`, `.nojekyll` | v2.11.0 |

Verificações finais executadas: link checker interno, contraste recalculado (≥ 4.5:1), visual conferido no navegador (desktop e mobile, 13/13 páginas) e revisão contra o checklist da Regra de Ouro (NVT, tom acolhedor, sem jargões).
