## Context

Mudança de documentação viva: alinhar `openspec/specs/` com o comportamento real do gerador (v2.31.0). Não há código novo — o gerador já implementa seções condicionais (`deveRenderizar` em `scripts/gerar-passos.js`), formatação inline (`inlineFormat`) e o JSON já contém os campos `id`, `etapa`, `ocultar_secoes`, `descricao`. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Atualizar a main spec `step-page-generator` para refletir o comportamento atual do gerador
- Atualizar a main spec `design-system` para citar os arquivos CSS por página
- Manter o formato de specs do OpenSpec (delta → sync → archive)

**Non-Goals:**
- Nenhuma mudança em código, HTML, JSON ou CSS de produção
- Nenhuma mudança de comportamento no site
- Não corrigir o cache-busting desalinhado (fora do escopo)

## Decisions

- **Delta `step-page-generator` via MODIFIED + RENAMED + ADDED**: o requirement "Seis seções fixas por passo" vira "Seções condicionais por passo" (RENAMED) e ganha conteúdo novo (MODIFIED); o schema do JSON é atualizado (MODIFIED); a formatação inline vira requirement novo (ADDED). Alternativa considerada: reescrever a spec inteira via um único delta — rejeitada porque perderia o histórico granular de cada mudança.
- **Delta `design-system` apenas MODIFIED**: adiciona `css/mapa.css` e `css/material-de-apoio.css` ao requirement de componentes reutilizáveis, preservando os cenários existentes.
- **Fonte da verdade = código**: todos os deltas foram escritos conferindo `scripts/gerar-passos.js`, `dados/passos.json` e os `<head>` das páginas, não suposições.

## Risks / Trade-offs

- **Sync manual dos deltas** → Mitigação: conferir cada main spec antes e depois da escrita; a operação é idempotente.
- **RENAMED + MODIFIED no mesmo requirement** → Mitigação: o sync aplica primeiro o rename e depois o conteúdo novo, na ordem da seção do delta.
