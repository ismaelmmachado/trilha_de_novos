# design-system Specification

## Purpose

Sistema de design CSS com custom properties, tipografia, cores, espaçamento e componentes reutilizáveis que define a identidade visual da Trilha de Novos seguindo o Blueprint do projeto Praticando o Caminho.

## Requirements

### Requirement: Design tokens via CSS custom properties

O sistema SHALL definir todas as variáveis de design (cores, fontes, espaçamento, bordas, sombras) como CSS custom properties no arquivo `tokens.css`.

#### Scenario: Tokens carregados

- **WHEN** o navegador carrega qualquer página do site
- **THEN** `css/tokens.css` está incluído no `<head>` e todas as custom properties estão disponíveis

### Requirement: data-etapa="1" (amarelo) para etapa 1

O HTML SHALL usar `data-etapa="1"` no elemento `<html>` e as cores de acento devem seguir a paleta amarela do Blueprint.

#### Scenario: Cores de acento aplicadas

- **WHEN** o navegador renderiza qualquer página
- **THEN** `[data-etapa="1"]` define `--accent: #EAB308`, `--accent-soft: #FEF3C7`, `--accent-border`, `--accent-hover`, `--accent-text` e `--accent-gradient` conforme o Blueprint

### Requirement: Fonte Playfair Display + Inter

O sistema SHALL usar `Playfair Display` para títulos e `Inter` para corpo do texto.

#### Scenario: Fontes carregadas

- **WHEN** o navegador carrega a página
- **THEN** as fontes Google são carregadas e aplicadas via `--font-heading` e `--font-body`

### Requirement: Esquema de espaçamento consistente

O sistema SHALL definir as variáveis de espaçamento (`--space-xs` a `--space-3xl`) conforme o Blueprint.

#### Scenario: Espaçamento disponível

- **WHEN** qualquer componente usa os tokens de espaçamento
- **THEN** `--space-xs: 4px`, `--space-sm: 8px`, `--space-md: 16px`, `--space-lg: 24px`, `--space-xl: 32px`, `--space-2xl: 48px`, `--space-3xl: 64px`

### Requirement: Componentes reutilizáveis em estilo.css

O arquivo `css/estilo.css` SHALL definir estilos para: header desktop, mobile header, skip link, breadcrumb, botão de download, cards de ferramentas, grid semanal, e layout de container.

#### Scenario: Componentes estilizados

- **WHEN** o navegador renderiza a página
- **THEN** todos os componentes listados usam classes CSS definidas em `estilo.css` com os tokens de design
