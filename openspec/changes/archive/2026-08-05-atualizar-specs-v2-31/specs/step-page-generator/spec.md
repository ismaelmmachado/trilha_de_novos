## MODIFIED Requirements

### Requirement: Dados estruturados em JSON

O sistema SHALL usar um arquivo `dados/passos.json` contendo dados de todos os 9 passos, com campos para título, subtítulo, resumo, seções (`para_comecar`, `ferramentas`, `ouca`, `aprofunde`, `pratique`, `organizese`), metadados (`id`, `etapa`, `ocultar_secoes`, `descricao`) e referência à apostila: o campo `pdf` guarda o **token de busca** do arquivo a baixar (não o caminho fixo).

#### Scenario: Arquivo passos.json válido

- **WHEN** o script `gerar-passos.js` é executado
- **THEN** ele lê `dados/passos.json` e o arquivo contém 9 objetos no array, cada um com `id`, `etapa`, `titulo`, `subtitulo`, `resumo`, `descricao`, as 6 seções e o campo `pdf`

#### Scenario: Campo ocultar_secoes opcional

- **WHEN** um passo define `ocultar_secoes` (ex.: `["ferramentas", "ouca"]`)
- **THEN** o gerador omite essas seções da página renderizada sem remover os dados do JSON

## RENAMED Requirements

- FROM: `### Requirement: Seis seções fixas por passo`
- TO: `### Requirement: Seções condicionais por passo`

## MODIFIED Requirements

### Requirement: Seções condicionais por passo

Cada página de passo SHALL renderizar as seções na ordem Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se, ocultando aquelas listadas em `ocultar_secoes` do passo. Seções ocultas não geram HTML na página, mas os dados permanecem no JSON.

#### Scenario: Seis seções sem ocultação

- **WHEN** o usuário acessa `passo-{N}.html` e o passo não define `ocultar_secoes`
- **THEN** as 6 seções estão presentes no conteúdo principal na ordem especificada

#### Scenario: Seções ocultas

- **WHEN** o usuário acessa `passo-{N}.html` e o passo define `ocultar_secoes: ["ferramentas", "ouca"]`
- **THEN** a página exibe as demais seções (Para Começar, Aprofunde, Pratique, Organize-se) e não contém as seções Ferramentas e Ouça

## ADDED Requirements

### Requirement: Formatação inline dos textos

O sistema SHALL formatar os textos vindos do JSON em HTML inline antes de renderizá-los: `### ` vira negrito, `**negrito**` vira `<strong>`, `*itálico*` vira `<em>` e quebras de linha viram `<br>`.

#### Scenario: Marcadores de formatação

- **WHEN** um campo de texto do JSON contém `**negrito**`, `*itálico*`, `### ` ou quebras de linha
- **THEN** a página renderiza o equivalente HTML (respectivamente `<strong>`, `<em>`, `<strong>` e `<br>`)
