## Why

A auditoria de 31/07/2026 (`docs/auditoria-2026-07-31.md`) encontrou problemas de HTML inválido, gerador dessincronizado, contraste de acessibilidade, inconsistências de navegação e documentação desatualizada. Esta mudança aplica as correções acordadas — sem alterar o comportamento esperado do site.

## What Changes

- Corrige atributo `class` duplicado nas 5 pills "Em breve" de `complementar.html` (HTML inválido, opacidade `.comp-em-breve` nunca aplicada)
- Adiciona `og:image` ao template de `scripts/gerar-passos.js`, alinhando o gerador às páginas commitadas
- Ajusta o contraste dos botões (`.download-btn`, `.btn-primary`, back-to-top): fundo amarelo sólido `--accent` + texto `--accent-on-accent` (#422006) — 7.6:1
- Padroniza a navegação mobile para "Material Complementar" em `index`, `mapa`, `404` e gerador
- Padroniza `aria-label` do logo para "Trilha de Novos — Voltar ao início" nas subpáginas
- Remove estilos inline: 5 no `index.html` (migrados para classes em `estilo.css`) e o `<style>` do `404.html` (migrado + adiciona `print.css`)
- Corrige back-to-top do `mapa.html` (`href="#top"`)
- Move o breadcrumb do `complementar.html` para fora do `<main>`
- Ajusta 3 citações bíblicas para o texto literal da NVT (`passo-2`, `passo-4`, `passo-7`)
- `index.html` passa a carregar os passos via `fetch('dados/passos.json')` (campo `descricao` adicionado ao JSON) — uma fonte da verdade
- Atualiza `README.md` (estrutura, tags) e `CHANGELOG.md` (v2.9.0, v2.9.1)

## Capabilities

### New Capabilities

(nenhuma — mudança de correção/refatoração/conteúdo, sem novas capacidades)

### Modified Capabilities

(nenhuma — comportamento esperado preservado; `skip_specs: true` declarado)

## Impact

- **Arquivos HTML:** `index.html`, `mapa.html`, `complementar.html`, `404.html`, `passo-1..9.html` (regeneradas)
- **CSS:** `css/estilo.css` (novas classes e contraste), `css/tokens.css` (novo token `--accent-on-accent`), `css/mapa.css`, `css/complementar.css`
- **Dados e geração:** `dados/passos.json` (campo `descricao` + citações NVT), `scripts/gerar-passos.js` (og:image, nav mobile)
- **Docs:** `README.md`, `CHANGELOG.md`
