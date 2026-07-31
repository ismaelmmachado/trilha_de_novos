# Changelog

## Tag: v2.11.0-cache-bust (31/07/2026)

- Adiciona cache-busting (`?v=2.10.0`) a todas as folhas de estilo (`tokens.css`, `estilo.css`, `mapa.css`, `complementar.css`, `print.css`) nas 13 páginas + gerador — força o navegador a baixar o CSS atualizado, corrigindo exibição sem estilo por cache antigo do GitHub Pages
- Torna o carregamento do Google Fonts não-bloqueante (`media="print" onload="this.media='all'"` com fallback `<noscript>`) para evitar página presa em redes lentas/bloqueadas
- Adiciona `.nojekyll` na raiz (desliga o processamento Jekyll do GitHub Pages)
- Documenta a convenção de bump do `?v=` no README

## Tag: v2.10.0-correcoes-auditoria (31/07/2026)

- Corrige atributo `class` duplicado nas 5 pills "Em breve" de `complementar.html`
- Adiciona `og:image` ao template de `scripts/gerar-passos.js` e regenera as 9 passos
- Melhora contraste dos botões (`.download-btn`, `.btn-primary`, back-to-top): fundo amarelo sólido + texto `#422006` (novo token `--accent-on-accent`), 7.6:1 (WCAG AA)
- Padroniza nav mobile para "Material Complementar" em `index`, `mapa`, `404` e gerador
- Padroniza `aria-label` do logo para "Voltar ao início" nas subpáginas
- Remove estilos inline do `index.html` (novas classes `.hero-intro`, `.section-title-center`, `.section-intro`, `.section-cta`) e do `404.html` (migrado para `estilo.css` + `print.css`)
- Corrige back-to-top do `mapa.html` para `href="#top"`
- Move o breadcrumb do `complementar.html` para fora do `<main>`
- Ajusta 3 citações bíblicas para o texto literal da NVT (1 Pedro 2.10, Salmo 42.1, Efésios 2.19)
- `index.html` carrega os passos via `fetch('dados/passos.json')` (novo campo `descricao`) — fonte única
- Atualiza `README.md` (estrutura, tags) e abre a mudança OpenSpec `correcoes-auditoria`

## Tag: v2.9.1-auditoria (31/07/2026)

- Adiciona `docs/auditoria-2026-07-31.md` com auditoria completa do site (achados críticos, importantes e menores)
- Adiciona `og-image.svg` e referência `og:image` em todas as páginas
- Move apostilas `.docx` para `docs/apostilas/` (a pasta `apostilas/` na raiz é removida)

## Tag: v2.9.0-css-card-row (30/07/2026)

- Adiciona classe `.passo-card` com `flex-direction: column` em `css/estilo.css`
- Atualiza `scripts/gerar-passos.js` com `data-etapa` e tokens de etapa

## Tag: v2.8.0-revisao-geral (30/07/2026)

- Adiciona `rel="noopener noreferrer"` em todos os links com `target="_blank"` (31 links em 12 arquivos)
- Remove `@import` do Google Fonts de `tokens.css` e carrega via `<link>` no `<head>` para melhor performance
- Adiciona favicon (`favicon.svg`) em todas as páginas
- Adiciona Open Graph e Twitter Cards em todas as páginas
- Remove todos os `style="..."` inline de `mapa.html` e `complementar.html`, migrando para classes CSS
- Adiciona classes `.mapa-page-header`, `.mapa-subtitle`, `.mapa-dica-mt`, `.mapa-intro-mb`, `.mapa-intro-perguntas`, `.mapa-estrutura-h3`, `.mapa-dica-final` em `css/mapa.css`
- Adiciona classes `.complementar-main`, `.complementar-header`, `.complementar-subtitle`, `.comp-em-breve` em `css/complementar.css`
- Adiciona botão "voltar ao topo" fixo no `mapa.html`
- Corrige nome "Material" → "Material Complementar" na nav mobile do `complementar.html`
- Cria página `404.html` personalizada
- Cria `css/print.css` com estilos de impressão
- Atualiza `scripts/gerar-passos.js` com todas as melhorias de cabeçalho

## Tag: v2.7.0-docs-changelog-readme (30/07/2026)

- Cria `CHANGELOG.md` com histórico completo de versões
- Cria `README.md` com documentação do projeto

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
