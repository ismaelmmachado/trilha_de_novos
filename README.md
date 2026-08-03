# Trilha de Novos — Comunidade Vitral

Site estático da Trilha de Novos, o programa de discipulado da [Comunidade Vitral](https://vitral.com.br) (IPIB), com 9 encontros para quem está começando a caminhada cristã.

## Stack

- **HTML semântico** + **CSS puro** (sem frameworks, sem build)
- **Design tokens** via CSS custom properties (`css/tokens.css`) — etapa 1 amarelo
- **Componentes** em `css/estilo.css`, `css/mapa.css`, `css/complementar.css`, `css/print.css`
- **Gerador Node.js** (`scripts/gerar-passos.js`) 100% data-driven — lê `dados/passos.json` e gera as 9 páginas de passo; todas as 6 seções (Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se) são renderizadas a partir do JSON
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
│   ├── complementar.css    # Classes do material complementar
│   └── print.css           # Estilos de impressão
├── scripts/
│   └── gerar-passos.js     # Gerador das páginas de passo
├── dados/
│   └── passos.json         # Conteúdo dos 9 passos
├── docs/apostilas/         # Apostilas .docx originais (download via GitHub Pages)
├── docs/MANUTENCAO.md      # Contrato de manutenção de conteúdo dos passos
├── docs/ORIENTACAO-AJUSTE-DATA-DRIVEN.md  # Texto reutilizável para normalizar outros sites
├── docs/auditoria-2026-07-31.md  # Relatório de auditoria do site (2026-07-31)
├── docs/auditoria-2026-08-02.md  # Relatório de auditoria técnica (2026-08-02)
├── favicon.svg             # Favicon do site
├── og-image.svg            # Imagem de compartilhamento (Open Graph)
├── 404.html                # Página de erro 404 personalizada
├── openspec/               # Artefatos OpenSpec (proposal, specs, design, tasks)
├── CLAUDE.md               # Regras de Ouro + instruções para IA
├── CHANGELOG.md            # Histórico de versões
└── README.md
```

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero, grid com os 9 passos (montado via `fetch('dados/passos.json')`), CTA para o Mapa |
| `mapa.html` | Orientação para facilitadores: Seu Papel, Antes do Encontro, Estrutura, Roteiro, Perguntas, Validação, Situações, Cuidado, Checklist, Dica final |
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

## Manutenção de conteúdo dos passos

Todo o conteúdo dos 9 passos vive em `dados/passos.json`. **Nunca edite `passo-N.html` na mão** — essas páginas são geradas. Para atualizar o conteúdo de um passo:

1. Edite o campo correspondente no `dados/passos.json` (ex.: `para_comecar`, `pratique`, `organizese`, `ferramentas`, `ouca`, `aprofunde`)
2. Rode `node scripts/gerar-passos.js`
3. Faça o commit das mudanças no JSON + nos HTML gerados

> 📘 **Contrato completo:** veja [docs/MANUTENCAO.md](docs/MANUTENCAO.md) para o
> procedimento de manutenção via Markdown (formatos de solicitação, ações
> INCLUIR/SUBSTITUIR/REMOVER e regras de segurança).

### Campos por seção

| Seção | Campo no JSON | Estrutura |
|---|---|---|
| Para Começar | `para_comecar` | `{ texto, pergunta }` |
| Ferramentas | `ferramentas` | `[{ icon, nome, descricao, link, rotulo }]` — vazio → "Em breve" |
| Ouça | `ouca` | `{ tipo: "placeholder" \| "player", src, titulo, descricao }` — `tipo` ≠ `player` → "Em breve" |
| Aprofunde | `aprofunde` | `{ livro: { titulo, autor, link }, musica: { titulo, artista, link } }` — vazio → "Em breve" |
| Pratique | `pratique` | `{ experimento, pergunta }` |
| Organize-se | `organizese` | `{ introducao, dias: [{ dia, texto }] }` — 7 dias, dias sem texto → "Em breve" |

> **Cache-busting:** todas as folhas de estilo são carregadas com `?v=<versão>`
> (ex.: `css/estilo.css?v=2.10.0`) para forçar o navegador a baixar o CSS atualizado.
> Ao alterar qualquer CSS (mudança em `tokens.css`, `estilo.css`, `mapa.css`,
> `complementar.css` ou `print.css`), **suba o `?v=`** para a nova versão em todas as
> páginas (`index`, `mapa`, `complementar`, `404`) e no `scripts/gerar-passos.js`,
> depois regenere as passos. Tags de documentação pura não exigem bump.
> GitHub Pages não permite cabeçalhos `Cache-Control` personalizados — a query string é o mecanismo.

## Versionamento

- **Branch ativa:** `homologacao`
- **Branch de produção:** `main`
- **Tags:** v1.0.0 a v2.14.0 (ver [CHANGELOG.md](CHANGELOG.md))
- **GitHub Pages:** https://ismaelmmachado.github.io/trilha_de_novos

## Repositório

https://github.com/ismaelmmachado/trilha_de_novos

## Licença

Uso interno — Comunidade Vitral / IPIB.
