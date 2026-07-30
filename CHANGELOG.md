# Changelog

## Tag: v2.6.0-mapa-secoes-restantes (30/07/2026)

- Alinha visualmente as seções Estrutura, Situações, Cuidado com Quem Cuida e Checklist no `mapa.html` com o design de referência (`facilitador.html`)
- Remove ~255 linhas de CSS não utilizado de `css/mapa.css`

## Tag: v2.5.0-visual-mapa-secoes (30/07/2026)

- Alinha visualmente as seções Seu Papel, Antes do Encontro e Perguntas no `mapa.html` com o design de referência
- Aplica classes `.mapa-section`, `.mapa-card`, `.dica`, `details.mapa-card` de forma consistente

## Tag: v2.4.0-mapa-completo (30/07/2026)

- Renomeia todas as classes `guia-*` e `facilitador-*` para `mapa-*` no CSS e HTML
- Reestrutura `mapa.html` com 10 seções completas (Seu Papel, Antes, Estrutura, Roteiro, Perguntas, Validação, Situações, Cuidado, Checklist, Dica final)
- Remove o arquivo `css/guia.css` e cria `css/mapa.css` com classes renomeadas

## Tag: v2.3.0-mapa-facilitador-ref (30/07/2026)

- Reestrutura `mapa.html` no padrão facilitator: seções com emoji/código, `.mapa-card`, `.dica`
- Implementa seção Seu Papel com "O que você é" / "O que você não é"

## Tag: v2.2.0-guia-para-mapa (30/07/2026)

- Renomeia "Guia" para "Mapa" em todo o site (navegação, breadcrumbs, títulos)
- Renomeia `guia.html` → `mapa.html`
- Atualiza links em todas as páginas

## Tag: v2.1.0-complementar-ref (30/07/2026)

- Reestrutura `complementar.html` com 6 seções idênticas ao design de referência
- Adiciona classes `complementar-grid`, `comp-categoria`, `comp-item`, `podcast-card`
- Links funcionais para Bible App, Lectio 365, Spotify e OneYouVersion

## Tag: v2.0.0-alinhamento-design-reference (30/07/2026)

- Alinhamento completo com design system de referência "Praticando o Caminho" (BluePrint etapa 1 amarelo)
- Design tokens em `css/tokens.css` e componentes em `css/estilo.css`
- Template de passo alinhado: container, page-header, step-section, section-icon, step-section-content, step-nav, ferramenta-item, week-plan-grid, pratique labels, footer-inner
- Atualiza `scripts/gerar-passos.js` com layout idêntico ao reference

## Tag: v1.1.0-apostilas-docs (30/07/2026)

- Adiciona cópia das apostilas .docx em `docs/apostilas/` para fácil acesso via GitHub Pages

## Tag: v1.0.0-site-completo (30/07/2026)

- Site completo da Trilha de Novos — 12 páginas HTML estáticas
- Design system (etapa 1 amarelo, Playfair Display + Inter, tokens CSS)
- `index.html` com hero e grid dos 9 passos
- `guia.html` (hoje `mapa.html`) com orientações para facilitadores
- `complementar.html` com recursos adicionais
- `passo-1.html` a `passo-9.html` gerados via Node.js a partir de `dados/passos.json`
- Gerador em `scripts/gerar-passos.js` com template de 6 seções: Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se
- Conteúdo extraído e adaptado das apostilas .docx originais
- Git init, remote configurado, .gitignore criado
