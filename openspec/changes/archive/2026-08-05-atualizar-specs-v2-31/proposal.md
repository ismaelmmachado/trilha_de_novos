## Why

As specs principais (`openspec/specs/`) ficaram defasadas em relação ao estado real do projeto (v2.31.0): o gerador ganhou seções condicionais (`ocultar_secoes`), formatação inline (`inlineFormat`) e novos campos no JSON, mas as specs ainda descrevem 6 seções fixas e o schema antigo. Manter as specs alinhadas evita que decisões já tomadas sejam reescritas por engano em mudanças futuras.

## What Changes

- **step-page-generator**: atualiza o requirement "Seis seções fixas por passo" para seções **condicionais** (Ferramentas/Ouça só renderizam se `ocultar_secoes` não as listar), atualiza o schema do `passos.json` (novos campos `id`, `etapa`, `ocultar_secoes`, `descricao`) e adiciona requirement novo para a formatação inline (`inlineFormat`).
- **design-system**: adiciona `css/mapa.css` e `css/material-de-apoio.css` ao requirement de componentes reutilizáveis (hoje lista apenas `tokens.css`, `estilo.css` e `print.css`).
- Nenhuma mudança em código, HTML, JSON ou CSS de produção — somente documentação viva.

## Capabilities

### New Capabilities
<!-- Nenhuma capacidade nova é introduzida nesta change. -->

### Modified Capabilities
- `step-page-generator`: comportamento de renderização condicional de seções, schema do JSON e formatação inline dos textos.
- `design-system`: arquivos CSS por página considerados como componentes reutilizáveis.

## Impact

- **Artefatos alterados**: apenas `openspec/specs/step-page-generator/spec.md` e `openspec/specs/design-system/spec.md` (via sync).
- **Sem impacto técnico**: nenhum arquivo de produção é tocado (sem mudança em `dados/passos.json`, `scripts/gerar-passos.js`, CSS, HTML ou apostilas).
- **Fora do escopo** (registrado para decisão futura): cache-busting desalinhado entre páginas estáticas (`?v=2.10.0` em `index.html`/`mapa.html`/`material-de-apoio.html` vs `?v=2.29.0` nos passos gerados).
