# complementar-page Specification

## Purpose

Página de material complementar com placeholders para livros, podcasts, artigos e outros recursos que serão adicionados futuramente ao site da Trilha de Novos.

## Requirements

### Requirement: Estrutura com placeholders

A página SHALL exibir seções para diferentes tipos de material complementar (livros, podcasts, artigos, vídeos) com placeholders visuais indicando "Em breve" para conteúdo ainda não disponível.

#### Scenario: Seções de material

- **WHEN** o usuário acessa `complementar.html`
- **THEN** as seções de material complementar estão visíveis com placeholders estilizados

### Requirement: Navegação e breadcrumb

A página SHALL incluir o mesmo header, navegação e breadcrumb das demais páginas do site.

#### Scenario: Navegação consistente

- **WHEN** o usuário acessa `complementar.html`
- **THEN** o header tem links para Início, Mapa e Material Complementar (destacado como página atual)
- **AND** o breadcrumb mostra "Início / Material Complementar"
