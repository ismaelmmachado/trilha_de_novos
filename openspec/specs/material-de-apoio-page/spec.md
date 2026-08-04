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
