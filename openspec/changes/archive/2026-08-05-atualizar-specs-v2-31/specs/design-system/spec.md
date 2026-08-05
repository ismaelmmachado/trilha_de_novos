## MODIFIED Requirements

### Requirement: Componentes reutilizáveis em estilo.css

O arquivo `css/estilo.css` SHALL definir estilos para: header desktop, mobile header, skip link, breadcrumb, botão de download, cards de ferramentas, grid semanal, e layout de container. O arquivo `css/print.css` SHALL definir os estilos de impressão dos componentes do site. Páginas específicas SHALL carregar estilos próprios por página: `css/mapa.css` para `mapa.html` e `css/material-de-apoio.css` para `material-de-apoio.html`.

#### Scenario: Componentes estilizados

- **WHEN** o navegador renderiza a página
- **THEN** todos os componentes listados usam classes CSS definidas em `estilo.css` com os tokens de design

#### Scenario: Estilos de impressão

- **WHEN** o usuário imprime uma página do site
- **THEN** `css/print.css` está carregado e aplica regras de impressão para os componentes (seções de passo, cards, ferramentas, material de apoio)

#### Scenario: CSS por página

- **WHEN** o usuário acessa `mapa.html`
- **THEN** a página carrega `css/mapa.css` além dos estilos compartilhados

- **WHEN** o usuário acessa `material-de-apoio.html`
- **THEN** a página carrega `css/material-de-apoio.css` além dos estilos compartilhados
