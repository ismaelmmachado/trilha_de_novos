# Changelog

## Tag: v2.15.0-runbook-atualizacao-geral (03/08/2026)

- Cria `docs/ATUALIZACAO-GERAL.md` — runbook de atualização geral do projeto: inventário de conteúdo, workflow em 6 etapas (contexto, conteúdo, código, regeneração, verificação, versionamento), checklist de verificação e controle de pendências da auditoria
- Atualiza `openspec/config.yaml`: contexto passa a citar `docs/MANUTENCAO.md` e `docs/ATUALIZACAO-GERAL.md`
- README: referencia o runbook na árvore de estrutura e na seção de manutenção

## Tag: v2.14.1-orientacao-bootstrap (03/08/2026)

- Adiciona `docs/ORIENTACAO-BOOTSTRAP-CONTRATO.md` — texto reutilizável para criar o contrato de manutenção de conteúdo em outro site de trilha (já normalizado/data-driven), com as mesmas regras deste projeto: mapeamento real das seções, criação de `docs/MANUTENCAO.md`, registro no CLAUDE.md e validação ponta a ponta
- README: referencia o novo arquivo na árvore de estrutura

## Tag: v2.14.0-docs (03/08/2026)

- Cria `docs/MANUTENCAO.md` — contrato de manutenção de conteúdo dos passos: fonte da verdade (JSON), tabela seção → campo, formatos de solicitação (arquivo Markdown completo + instrução em linha), ações INCLUIR/SUBSTITUIR/REMOVER, fluxo de execução e regras de segurança
- Documenta o schema das seções Ferramentas, Ouça e Aprofunde na spec `step-page-generator` (`ferramentas` array de `{ icon, nome, descricao, link, rotulo }`, `ouca` com `tipo` placeholder/player, `aprofunde` com `livro`/`musica`) e consolida os cenários de placeholder
- Atualiza `docs/auditoria-2026-08-02.md`: marca I1 (gerador hardcoded) como resolvido na v2.13.0 e ajusta a tabela de prioridades
- README: referencia `docs/MANUTENCAO.md` na seção de manutenção e na árvore de estrutura

## Tag: v2.13.1-orientacao-data-driven (03/08/2026)

- Adiciona `docs/ORIENTACAO-AJUSTE-DATA-DRIVEN.md` — texto reutilizável para preparar outros sites de trilha para o processo de manutenção de conteúdo data-driven (diagnóstico de cenário A/B/C, Fase 2A tornar gerador data-driven, Fase 2B criar gerador do zero, verificação)

## Tag: v2.13.0-gerador-data-driven (03/08/2026)

- Torna o gerador `scripts/gerar-passos.js` 100% data-driven: as seções Ferramentas, Ouça e Aprofunde agora são renderizadas a partir de `dados/passos.json` (antes eram fixas no código do gerador)
- Nova estrutura em `dados/passos.json`: `ferramentas` como array `[{ icon, nome, descricao, link, rotulo }]`, `ouca` com `{ tipo: "placeholder" | "player", src, titulo, descricao }` e `aprofunde` com `{ livro, musica }`
- Migra as 3 ferramentas (Bible App, Lectio 365, Vitral no Spotify) para o JSON dos 9 passos — visual mantido, conteúdo agora editável por passo
- Seções sem conteúdo exibem placeholder "Em breve" (Ferramentas, Ouça, Aprofunde)
- README: documenta o fluxo de manutenção de conteúdo (JSON → gerador → HTML) e a tabela de campos por seção

## Tag: v2.12.0-auditoria-tecnica-2026-08-02 (02/08/2026)

- Adiciona `docs/auditoria-2026-08-02.md` com auditoria técnica completa (somente leitura) do site — 0 críticos, 5 importantes (I1–I5), 8 menores (M1–M8); serve de roteiro para as próximas correções
- Migra comandos `opsx-*` e skills `openspec-*` de `.opencode/` para o diretório global `/root/.opencode/` (6 comandos + 6 skills removidos do repo)
- Atualiza `CLAUDE.md` para apontar para os comandos globais do OpenSpec

## Tag: v2.11.2-docs (31/07/2026)

- Renomeia a spec `guia-page` → `mapa-page` em `openspec/specs/` (pasta + conteúdo: `guia.html` → `mapa.html`, nav "Guia" → "Mapa", breadcrumb "Início / Mapa") — documentação alinhada à página real do site
- Atualiza `complementar-page` e `landing-page`: link de navegação "Guia" → "Mapa"
- Corrige `step-page-generator`: caminho de download `apostilas/` → `docs/apostilas/`
- README: "Guia do facilitador" → "Orientação para facilitadores" e lista de tags até v2.11.2

## Tag: v2.11.1-docs (31/07/2026)

- Finaliza `docs/auditoria-2026-07-31.md` com seção "Situação final" (item → correção → versão)
- Marca como concluídas as tasks 4.1–4.4 de `correcoes-auditoria` e as 14 tasks de `site-trilha-de-novos`
- Arquivamento OpenSpec: `site-trilha-de-novos` (com sync das 5 specs principais em `openspec/specs/`) e `correcoes-auditoria` (skip_specs) movidos para `openspec/changes/archive/`

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
