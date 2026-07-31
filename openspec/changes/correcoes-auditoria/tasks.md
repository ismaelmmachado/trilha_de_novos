## 1. Críticos

- [x] 1.1 Adicionar meta `og:image` ao template de `scripts/gerar-passos.js` (após `og:url`)
- [x] 1.2 Regenerar as 9 páginas `passo-*.html` e conferir que o diff mostra apenas o `og:image`
- [x] 1.3 Corrigir atributo `class` duplicado nas 5 pills "Em breve" de `complementar.html` (`class="comp-link comp-em-breve"`)

## 2. Importantes

- [x] 2.1 Ajustar contraste dos botões: fundo `var(--accent)` + texto `var(--accent-on-accent)` (#422006) em `.download-btn`, `.btn-primary` e back-to-top; criar token em `css/tokens.css`
- [x] 2.2 Padronizar nav mobile para "Material Complementar" em `index.html`, `mapa.html`, `404.html` e `scripts/gerar-passos.js` (+ regenerar passos)
- [x] 2.3 Padronizar `aria-label` do logo para "Trilha de Novos — Voltar ao início" em `mapa.html`, `complementar.html` e `404.html`
- [x] 2.4 Atualizar `README.md` (estrutura de pastas, tags) e `CHANGELOG.md` (entradas v2.9.0 e v2.9.1)

## 3. Menores

- [x] 3.1 Remover os 5 estilos inline de `index.html` migrando para classes em `css/estilo.css` (`.hero-intro`, `.section-title-center`, `.section-intro`, `.section-cta`)
- [x] 3.2 Mover o `<style>` do `404.html` para `css/estilo.css` e adicionar `css/print.css`
- [x] 3.3 Corrigir back-to-top do `mapa.html` para `href="#top"` (com `id="top"` no body)
- [x] 3.4 Mover o breadcrumb do `complementar.html` para fora do `<main>`
- [x] 3.5 Ajustar 3 citações para o texto literal da NVT em `dados/passos.json` (`passo-2`, `passo-4`, `passo-7`) e regenerar
- [x] 3.6 Adicionar campo `descricao` aos 9 passos em `dados/passos.json` e trocar o array inline do `index.html` por `fetch('dados/passos.json')`

## 4. Verificação

- [ ] 4.1 Validar que todos os `href`/`src`/âncoras internas existem (link checker)
- [ ] 4.2 Recalcular contraste das novas cores de botão (≥ 4.5:1)
- [ ] 4.3 Conferir visual no navegador: pills "Em breve", nav mobile, back-to-top, 404, grid do index
- [ ] 4.4 Revisar contra o checklist da Regra de Ouro (NVT, tom, sem jargões)
