# mapa-page Specification

## Purpose

Página do mapa da Trilha de Novos com orientações para quem conduz os encontros, baseada no conteúdo da Apostila do Facilitador.

## Requirements

### Requirement: Conteúdo do mapa

A página SHALL exibir orientações para o facilitador da trilha, incluindo: papel do facilitador, estrutura de cada encontro, perguntas para cada passo, dicas para lidar com situações (silêncio, dúvidas, falta), checklist e acompanhamento entre encontros.

#### Scenario: Seções do mapa

- **WHEN** o usuário acessa `mapa.html`
- **THEN** o conteúdo inclui as seções principais extraídas da Apostila do Facilitador

### Requirement: Navegação e breadcrumb

A página SHALL incluir o mesmo header, navegação e breadcrumb das demais páginas do site.

#### Scenario: Navegação consistente

- **WHEN** o usuário acessa `mapa.html`
- **THEN** o header tem links para Início (ativo), Mapa (destacado como página atual) e Material de Apoio
- **AND** o breadcrumb mostra "Início / Mapa"
