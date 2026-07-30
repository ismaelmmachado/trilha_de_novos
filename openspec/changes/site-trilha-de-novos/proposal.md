## Why

A Trilha de Novos (Estação 1 da Jornada do Discípulo) existe como apostilas .docx, sem uma presença digital própria. A comunidade Vitral precisa de um site estático que apresente a trilha, centralize o conteúdo de cada passo e ofereça downloads das apostilas — seguindo o mesmo padrão visual e arquitetura já definidos pelo projeto "Praticando o Caminho".

## What Changes

- Criar site estático completo da Trilha de Novos (HTML + CSS puro + gerador Node.js)
- Landing page (`index.html`) com identidade visual, visão geral e cards dos 9 passos
- Página de Guia (`guia.html`) para orientadores da trilha
- Página de Material Complementar (`complementar.html`) com placeholders para conteúdo futuro
- 9 páginas de passo (`passo-1.html` a `passo-9.html`) geradas automaticamente a partir de dados JSON
- Design system baseado no Blueprint, com etapa 1 (amarelo) como identidade visual
- Apostilas originais .docx referenciadas para download (migração futura para PDF)

## Capabilities

### New Capabilities

- `landing-page`: Página inicial com identidade da Vitral, mapa da trilha, cards dos 9 passos com links
- `step-page-generator`: Script Node.js que lê `dados/passos.json` e gera páginas HTML estáticas para cada passo, seguindo as 6 seções do Blueprint (Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se)
- `design-system`: Sistema de design com tokens CSS (tipografia, cores, espaçamento, sombras) adaptado do Blueprint, com data-etapa="1" (amarelo) para a Trilha de Novos
- `guia-page`: Página do guia da trilha com orientações para quem conduz os encontros
- `complementar-page`: Página de material complementar com placeholders para livros, podcasts e recursos futuros

### Modified Capabilities

*Nenhuma — é um projeto novo, sem specs existentes para modificar.*

## Impact

- Criação de novos diretórios e arquivos no projeto: `css/`, `scripts/`, `dados/`, `apostilas/`
- Adição de páginas HTML na raiz do projeto (`index.html`, `guia.html`, `complementar.html`, `passo-*.html`)
- Nenhum código existente é modificado
- As apostilas .docx originais permanecem como estão, apenas copiadas para `apostilas/`
