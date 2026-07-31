## 1. Setup

- [x] 1.1 Criar estrutura de diretórios: `css/`, `scripts/`, `dados/`, `apostilas/`, `assets/`
- [x] 1.2 Copiar arquivos .docx originais para `apostilas/`

## 2. Design System

- [x] 2.1 Criar `css/tokens.css` com design tokens do Blueprint e `data-etapa="1"` (amarelo): fontes (Playfair Display + Inter), cores neutras, cores de acento, espaçamento, border-radius, sombras, container
- [x] 2.2 Criar `css/estilo.css` com estilos globais e componentes: site-header, mobile-header, skip-link, breadcrumb, botão de download, cards de ferramentas, grid semanal (organize-se), seções de passo

## 3. Dados Estruturados

- [x] 3.1 Criar `dados/passos.json` com estrutura completa dos 9 passos (id, titulo, subtitulo, etapa, resumo, para_comecar, ferramentas, ouca, aprofunde, pratique, organizese, pdf)

## 4. Script de Geração

- [x] 4.1 Criar `scripts/gerar-passos.js` — script que lê `dados/passos.json` e gera `passo-1.html` a `passo-9.html` com template HTML completo (header, nav, breadcrumb, 6 seções, footer)

## 5. Páginas HTML

- [x] 5.1 Criar `index.html` — landing page com identidade Vitral, visão geral da trilha, cards dos 9 passos
- [x] 5.2 Criar `guia.html` — página do guia com orientações para facilitadores (extraído da Apostila do Facilitador)
- [x] 5.3 Criar `complementar.html` — página de material complementar com placeholders
- [x] 5.4 Criar `css/guia.css` — estilos específicos da página do guia
- [x] 5.5 Criar `css/complementar.css` — estilos específicos da página complementar

## 6. Geração e Validação

- [x] 6.1 Executar `node scripts/gerar-passos.js` e verificar geração de passo-1.html a passo-9.html
- [x] 6.2 Verificar que todas as páginas têm header, breadcrumb, 6 seções e links corretos
- [x] 6.3 Verificar que placeholders funcionam para seções vazias
