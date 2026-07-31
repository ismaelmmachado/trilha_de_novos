# step-page-generator Specification

## Purpose

Gerador de páginas estáticas que lê dados estruturados em JSON e produz arquivos HTML completos para cada um dos 9 passos da Trilha de Novos.

## Requirements

### Requirement: Dados estruturados em JSON

O sistema SHALL usar um arquivo `dados/passos.json` contendo dados de todos os 9 passos, com campos para título, subtítulo, resumo, seções (para-comecar, ferramentas, ouca, aprofunde, pratique, organize-se) e referência ao PDF da apostila.

#### Scenario: Arquivo passos.json válido

- **WHEN** o script `gerar-passos.js` é executado
- **THEN** ele lê `dados/passos.json` e o arquivo contém 9 objetos no array

### Requirement: Geração de páginas HTML

O script Node.js SHALL gerar um arquivo `passo-{N}.html` para cada passo, com HTML semântico completo incluindo header, breadcrumb, as 6 seções de conteúdo e footer.

#### Scenario: Páginas geradas

- **WHEN** `node scripts/gerar-passos.js` é executado
- **THEN** os arquivos `passo-1.html` a `passo-9.html` são criados na raiz do projeto

### Requirement: Seis seções fixas por passo

Cada página de passo SHALL conter exatamente 6 seções na seguinte ordem: Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se.

#### Scenario: Seções presentes

- **WHEN** o usuário acessa `passo-{N}.html`
- **THEN** as 6 seções estão presentes no conteúdo principal na ordem especificada

### Requirement: Placeholders para seções vazias

Seções sem conteúdo preenchido SHALL exibir um placeholder visual indicando "Em breve" em vez de ficarem ocultas ou quebrarem o layout.

#### Scenario: Placeholder de áudio

- **WHEN** `ouca.tipo` é `"placeholder"`
- **THEN** a seção exibe um placeholder estilizado com o texto "Em breve" no lugar do player

#### Scenario: Placeholder de ferramentas

- **WHEN** `ferramentas` é um array vazio
- **THEN** a seção exibe um placeholder estilizado

### Requirement: Breadcrumb em páginas de passo

Cada página de passo SHALL incluir um breadcrumb com link para "Início" e o nome do passo atual.

#### Scenario: Breadcrumb navegável

- **WHEN** o usuário acessa `passo-{N}.html`
- **THEN** o breadcrumb contém `<a href="index.html">Início</a>` seguido do separador e do nome do passo

### Requirement: Download de apostila

Cada página de passo SHALL exibir um botão de download que referencie o arquivo .docx da apostila correspondente.

#### Scenario: Botão de download

- **WHEN** o usuário visualiza a seção "Para Começar"
- **THEN** há um botão com classe `.download-btn` e fundo gradiente apontando para `docs/apostilas/{arquivo}.docx`

### Requirement: Grid semanal (Organize-se)

A seção Organize-se SHALL exibir um grid de 7 cards (Seg a Dom) com atividades sugeridas para a semana.

#### Scenario: Grid de 7 dias

- **WHEN** o usuário visualiza a seção Organize-se
- **THEN** há um `.week-plan-grid` com 7 `.week-day-card`, um para cada dia da semana
- **AND** dias sem texto usam a classe `.day-empty`
