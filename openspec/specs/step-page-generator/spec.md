# step-page-generator Specification

## Purpose

Gerador de páginas estáticas que lê dados estruturados em JSON e produz arquivos HTML completos para cada um dos 9 passos da Trilha de Novos.

## Requirements

### Requirement: Dados estruturados em JSON

O sistema SHALL usar um arquivo `dados/passos.json` contendo dados de todos os 9 passos, com campos para título, subtítulo, resumo, seções (`para_comecar`, `ferramentas`, `ouca`, `aprofunde`, `pratique`, `organizese`) e referência ao PDF da apostila.

#### Scenario: Arquivo passos.json válido

- **WHEN** o script `gerar-passos.js` é executado
- **THEN** ele lê `dados/passos.json` e o arquivo contém 9 objetos no array

### Requirement: Schema das seções Ferramentas, Ouça e Aprofunde

O arquivo `dados/passos.json` SHALL estruturar as seções `ferramentas`, `ouca` e `aprofunde` de cada passo conforme o schema definido abaixo, e o gerador SHALL renderizar essas seções a partir desses dados.

- `ferramentas`: array de itens `{ icon, nome, descricao, link, rotulo }`
- `ouca`: objeto `{ tipo, src, titulo, descricao }`, com `tipo` sendo `"placeholder"` ou `"player"`
- `aprofunde`: objeto `{ livro: { titulo, autor, link }, musica: { titulo, artista, link } }`

#### Scenario: Ferramentas preenchidas

- **WHEN** um passo tem itens em `ferramentas`
- **THEN** a seção Ferramentas exibe um card por item, com `nome`, `descricao`, ícone (`icon`) e um link (`link`) rotulado por `rotulo`

#### Scenario: Ferramentas vazias

- **WHEN** `ferramentas` é um array vazio
- **THEN** a seção exibe um placeholder estilizado com o texto "Em breve"

#### Scenario: Ouça com player

- **WHEN** `ouca.tipo` é `"player"` e `ouca.src` está preenchido
- **THEN** a seção exibe um item com `titulo`, `descricao` e um link "Ouvir" apontando para `src`

#### Scenario: Ouça sem player

- **WHEN** `ouca.tipo` é `"placeholder"` (ou `src` está vazio)
- **THEN** a seção exibe um placeholder estilizado com o texto "Em breve" no lugar do player

#### Scenario: Aprofunde com livro e/ou música

- **WHEN** `aprofunde.livro.titulo` e/ou `aprofunde.musica.titulo` estão preenchidos
- **THEN** a seção exibe um card de livro (📖, com `titulo`, `autor` e link "Abrir" quando `livro.link` existe) e/ou um card de música (🎵, com `titulo`, `artista` e link "Ouvir" quando `musica.link` existe)

#### Scenario: Aprofunde sem conteúdo

- **WHEN** `aprofunde` não tem `livro.titulo` nem `musica.titulo`
- **THEN** a seção exibe um placeholder estilizado com o texto "Em breve"

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

O gerador SHALL ler os campos `ferramentas`, `ouca` e `aprofunde` de cada passo do JSON e renderizar as seções a partir desses dados (ver o requirement "Schema das seções Ferramentas, Ouça e Aprofunde"). Seções sem conteúdo preenchido SHALL exibir um placeholder visual indicando "Em breve" em vez de ficarem ocultas ou quebrarem o layout. Nenhum conteúdo dessas seções deve ser fixo no código do gerador.

#### Scenario: Conteúdo preenchido por passo

- **WHEN** um passo tem itens em `ferramentas`, `ouca` ou `aprofunde`
- **THEN** a seção correspondente exibe apenas o conteúdo daquele passo, sem conteúdo hardcoded de outros passos

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
