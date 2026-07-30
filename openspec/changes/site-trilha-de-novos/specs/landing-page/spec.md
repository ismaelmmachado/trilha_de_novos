## Purpose

Página inicial que apresenta a Trilha de Novos à comunidade, com identidade visual da Vitral, visão geral dos 9 passos e navegação para todo o conteúdo do site.

## ADDED Requirements

### Requirement: Landing page apresenta identidade da trilha

A página inicial SHALL exibir o nome da trilha, o nome da comunidade (Vitral), o propósito da trilha e o estágio da jornada (Estação 1).

#### Scenario: Título e identidade visíveis

- **WHEN** o usuário acessa `index.html`
- **THEN** o título "Trilha de Novos" e a identidade "Comunidade Vitral" estão visíveis no header da página

### Requirement: Cards dos 9 passos na página inicial

A página inicial SHALL exibir cards para cada um dos 9 passos, cada um com título, número, e link para a página do passo correspondente.

#### Scenario: Cards dos passos navegáveis

- **WHEN** o usuário visualiza a seção de passos na página inicial
- **THEN** cada um dos 9 passos está representado por um card e cada card contém um link para `passo-{N}.html`

### Requirement: Navegação principal

A página inicial SHALL incluir navegação para as páginas Guia e Material Complementar, tanto em desktop quanto mobile.

#### Scenario: Navegação completa

- **WHEN** o usuário acessa a página inicial
- **THEN** o header contém links para "Início" (ativo), "Guia" e "Material Complementar"

#### Scenario: Navegação mobile responsiva

- **WHEN** o usuário acessa em tela menor que 768px
- **THEN** a navegação exibe o `mobile-header` com os mesmos links

### Requirement: Skip link para acessibilidade

A página SHALL incluir um skip link como primeiro elemento do `<body>` para navegação por teclado.

#### Scenario: Skip link presente

- **WHEN** o usuário inspeciona o HTML da página
- **THEN** o primeiro elemento após `<body>` é `<a class="skip-link" href="#main">Ir para o conteúdo</a>`
