# material-de-apoio-page Specification

## Purpose

Página de material de apoio com placeholders para livros, podcasts, artigos e outros recursos que serão adicionados futuramente ao site da Trilha de Novos.

## Requirements

### Requirement: Estrutura com placeholders

A página SHALL exibir seções para diferentes tipos de material de apoio (livros, podcasts, artigos, vídeos) com placeholders visuais indicando "Em breve" para conteúdo ainda não disponível.

#### Scenario: Seções de material

- **WHEN** o usuário acessa `material-de-apoio.html`
- **THEN** as seções de material de apoio estão visíveis com placeholders estilizados

### Requirement: Navegação e breadcrumb

A página SHALL incluir o mesmo header, navegação e breadcrumb das demais páginas do site.

#### Scenario: Navegação consistente

- **WHEN** o usuário acessa `material-de-apoio.html`
- **THEN** o header tem links para Início, Mapa e Material de Apoio (destacado como página atual)
- **AND** o breadcrumb mostra "Início / Material de Apoio"

### Requirement: Ferramentas para o Caminho

A página SHALL exibir uma seção "Ferramentas para o Caminho" listando ferramentas da caminhada, incluindo o canal Spotify da Comunidade Vitral como ferramenta de escuta. Cada ferramenta SHALL mostrar nome, descrição e um link de ação (ex.: "Baixar").

#### Scenario: Seção de ferramentas

- **WHEN** o usuário acessa `material-de-apoio.html`
- **THEN** a seção "Ferramentas para o Caminho" lista as ferramentas (Bible App YouVersion, Lectio 365 e Canal Spotify da Comunidade Vitral)
- **AND** cada item mostra nome, descrição e um link rotulado (ex.: "Baixar")
