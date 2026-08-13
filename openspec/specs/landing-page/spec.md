# landing-page Specification

## Purpose

Página inicial que apresenta a Trilha de Novos à comunidade, com identidade visual da Vitral, visão geral dos 9 passos e navegação para todo o conteúdo do site.

## Requirements

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

A página inicial SHALL incluir navegação para as páginas Mapa e Material de Apoio, tanto em desktop quanto mobile.

#### Scenario: Navegação completa

- **WHEN** o usuário acessa a página inicial
- **THEN** o header contém links para "Início" (ativo), "Mapa" e "Material de Apoio"

#### Scenario: Navegação mobile responsiva

- **WHEN** o usuário acessa em tela menor que 768px
- **THEN** a navegação exibe o `mobile-header` com os mesmos links

### Requirement: Skip link para acessibilidade

A página SHALL incluir um skip link como primeiro elemento do `<body>` para navegação por teclado.

#### Scenario: Skip link presente

- **WHEN** o usuário inspeciona o HTML da página
- **THEN** o primeiro elemento após `<body>` é `<a class="skip-link" href="#main">Ir para o conteúdo</a>`

### Requirement: Box "Ferramentas para o Caminho" na home

A página inicial SHALL exibir uma seção "Ferramentas para o Caminho" que orienta o novo a usar as ferramentas da caminhada entre os encontros. A seção SHALL listar itens com ícone, nome, descrição e um link de ação.

#### Scenario: Seção exibida com ferramentas

- **WHEN** o usuário acessa `index.html`
- **THEN** a página exibe a seção "Ferramentas para o Caminho" com itens (ex.: Bible App YouVersion, Lectio 365, Vitral no Spotify)
- **AND** cada item mostra ícone, nome, descrição e um link rotulado (ex.: "Baixar", "Ouvir")

#### Scenario: Ferramenta com ações múltiplas

- **WHEN** uma ferramenta tem mais de uma ação (ex.: Vitral no Spotify com "Ouvir" e "Baixar")
- **THEN** os links aparecem agrupados em um container de ações, com o link secundário diferenciado visualmente

### Requirement: aria-label do logo

A página inicial SHALL usar o `aria-label` "Trilha de Novos — Página inicial" no logo. Nas demais páginas (mapa, material de apoio, 404 e passos), o logo usa "Trilha de Novos — Voltar ao início", pois nelas ele é um atalho de navegação para a home.

#### Scenario: Label da home

- **WHEN** o usuário inspeciona o logo do `index.html`
- **THEN** o `aria-label` é "Trilha de Novos — Página inicial"

#### Scenario: Label nas subpáginas

- **WHEN** o usuário inspeciona o logo de `mapa.html`, `material-de-apoio.html`, `404.html` ou `passo-{N}.html`
- **THEN** o `aria-label` é "Trilha de Novos — Voltar ao início"
