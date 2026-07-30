# Trilha de Novos — Comunidade Vitral

Site estático da Trilha de Novos, o programa de discipulado da [Comunidade Vitral](https://vitral.com.br) (IPIB), com 9 encontros para quem está começando a caminhada cristã.

## Stack

- **HTML semântico** + **CSS puro** (sem frameworks, sem build)
- **Design tokens** via CSS custom properties (`css/tokens.css`) — etapa 1 amarelo
- **Componentes** em `css/estilo.css`, `css/mapa.css`, `css/complementar.css`
- **Gerador Node.js** (`scripts/gerar-passos.js`) que lê `dados/passos.json` e gera as 9 páginas de passo
- **Zero dependências** — site 100% offline, servido via GitHub Pages

## Estrutura

```
trilha_de_novos/
├── index.html              # Landing page com hero + grid dos 9 passos
├── mapa.html               # Orientação para facilitadores (10 seções)
├── complementar.html       # Material complementar (6 seções)
├── passo-1.html … passo-9.html  # Páginas dos 9 encontros
├── css/
│   ├── tokens.css          # Design tokens (cores, fontes, espaçamentos)
│   ├── estilo.css          # Componentes globais
│   ├── mapa.css            # Classes .mapa-* (facilitador)
│   └── complementar.css    # Classes do material complementar
├── scripts/
│   └── gerar-passos.js     # Gerador das páginas de passo
├── dados/
│   └── passos.json         # Conteúdo dos 9 passos
├── apostilas/              # Apostilas .docx originais
├── docs/apostilas/         # Cópia para download via GitHub Pages
├── assets/                 # Imagens e recursos estáticos
├── favicon.svg             # Favicon do site
├── 404.html                # Página de erro 404 personalizada
├── openspec/               # Artefatos OpenSpec (proposal, specs, design, tasks)
├── CLAUDE.md               # Regras de Ouro + instruções para IA
├── CHANGELOG.md            # Histórico de versões
└── README.md
```

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero, grid com os 9 passos, CTA para o Mapa |
| `mapa.html` | Guia do facilitador: Seu Papel, Antes do Encontro, Estrutura, Roteiro, Perguntas, Validação, Situações, Cuidado, Checklist, Dica final |
| `complementar.html` | 6 seções: App da Bíblia, Lectio 365, Devocionais, Podcasts, Playlists, OneYouVersion |
| `404.html` | Página de erro personalizada com link de volta ao início |
| `passo-1` a `passo-9` | Cada passo com 6 seções: Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se |

## Design System

- **Etapa:** 1 (amarelo)
- **Fontes:** Playfair Display (títulos) + Inter (corpo)
- **Design de referência:** BluePrint "Praticando o Caminho"
- **Navegação:** Header fixo com logo + nav (Início, Mapa, Material Complementar); breadcrumb + step-nav (anterior/início/próximo) nas páginas de passo
- **Footer:** "Feito com carinho pela Comunidade Vitral"

## Como gerar as páginas de passo

```bash
node scripts/gerar-passos.js
```

Gera os arquivos `passo-1.html` a `passo-9.html` a partir de `dados/passos.json`.

## Versionamento

- **Branch ativa:** `homologacao`
- **Branch de produção:** `main`
- **Tags:** v1.0.0 a v2.6.0 (ver [CHANGELOG.md](CHANGELOG.md))
- **GitHub Pages:** https://ismaelmmachado.github.io/trilha_de_novos

## Repositório

https://github.com/ismaelmmachado/trilha_de_novos

## Licença

Uso interno — Comunidade Vitral / IPIB.
