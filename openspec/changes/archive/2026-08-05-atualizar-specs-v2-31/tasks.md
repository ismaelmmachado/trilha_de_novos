## 1. Escrita dos deltas

- [x] 1.1 Criar delta spec `specs/step-page-generator/spec.md` (MODIFIED + RENAMED + ADDED)
- [x] 1.2 Criar delta spec `specs/design-system/spec.md` (MODIFIED)

## 2. Validação e sync

- [x] 2.1 Validar a change com `openspec validate --change atualizar-specs-v2-31`
- [x] 2.2 Aplicar os deltas nas main specs (`openspec/specs/`) via sync

## 3. Verificação final

- [x] 3.1 Confirmar que a main spec `step-page-generator` reflete seções condicionais, schema atualizado e formatação inline
- [x] 3.2 Confirmar que a main spec `design-system` inclui `mapa.css` e `material-de-apoio.css`
- [x] 3.3 Garantir que nenhum arquivo de produção mudou (HTML, JSON, CSS, scripts) — `git status` mostra apenas `openspec/`
