# Trilha de Novos — Comunidade Vitral

Site estático da Trilha de Novos, o programa de discipulado da [Comunidade Vitral](https://vitral.com.br) (IPIB), com 9 encontros para quem está começando a caminhada cristã.

## Stack

- **HTML semântico** + **CSS puro** (sem frameworks, sem build)
- **Design tokens** via CSS custom properties (`css/tokens.css`) — etapa 1 amarelo
- **Componentes** em `css/estilo.css`, `css/mapa.css`, `css/material-de-apoio.css`, `css/print.css`
- **Gerador Node.js** (`scripts/gerar-passos.js`) 100% data-driven — lê `dados/passos.json` e gera as 9 páginas de passo; as seções (Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se) são renderizadas a partir do JSON, com controle **condicional** por passo via `ocultar_secoes` (hoje Ferramentas e Ouça estão ocultas em todos os passos); textos suportam formatação leve (`**negrito**`, `*itálico*`, quebras de linha) via `inlineFormat()`
- **Zero dependências** — site 100% offline, servido via GitHub Pages

## Estrutura

```
trilha_de_novos/
├── index.html              # Landing page com hero + grid dos 9 passos
├── mapa.html               # Orientação para facilitadores (10 seções)
├── material-de-apoio.html  # Material de Apoio (6 seções)
├── passo-1.html … passo-9.html  # Páginas dos 9 encontros
├── css/
│   ├── tokens.css          # Design tokens (cores, fontes, espaçamentos)
│   ├── estilo.css          # Componentes globais
│   ├── mapa.css            # Classes .mapa-* (facilitador)
│   ├── material-de-apoio.css # Classes do material de apoio
│   └── print.css           # Estilos de impressão
├── scripts/
│   ├── gerar-passos.js     # Gerador das páginas de passo
│   └── apostilas.js        # Resolve o download das apostilas via GitHub API
├── dados/
│   └── passos.json         # Conteúdo dos 9 passos (+ token da apostila no campo `pdf`)
├── docs/apostilas/
│   ├── docx/               # Versões .docx — fonte da verdade (upload manual)
│   └── pdf/                # Versões .pdf — baixadas pelo site (upload manual)
├── docs/MANUTENCAO.md      # Contrato de manutenção de conteúdo dos passos
├── docs/ATUALIZACAO-GERAL.md  # Runbook de atualização geral do projeto (ponto de entrada)
├── docs/ORIENTACAO-AJUSTE-DATA-DRIVEN.md  # Texto reutilizável para normalizar outros sites
├── docs/ORIENTACAO-BOOTSTRAP-CONTRATO.md  # Texto para criar o contrato em outro site (bootstrap)
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
| `material-de-apoio.html` | 6 seções: App da Bíblia, Lectio 365, Devocionais, Podcasts, Playlists, OneYouVersion |
| `404.html` | Página de erro personalizada com link de volta ao início |
| `passo-1` a `passo-9` | Cada passo com 4 seções exibidas: Para Começar (com Texto Bíblico e pergunta), Aprofunde, Pratique, Organize-se — Ferramentas e Ouça estão **ocultas via `ocultar_secoes`** (dados permanecem no JSON, reversível) |

## Design System

- **Etapa:** 1 (amarelo)
- **Fontes:** Playfair Display (títulos) + Inter (corpo)
- **Design de referência:** BluePrint "Praticando o Caminho"
- **Navegação:** Header fixo com logo + nav (Início, Mapa, Material de Apoio); breadcrumb + step-nav (anterior/início/próximo) nas páginas de passo
- **Footer:** "Feito com carinho pela Comunidade Vitral"

## Como gerar as páginas de passo

```bash
node scripts/gerar-passos.js
```

Gera os arquivos `passo-1.html` a `passo-9.html` a partir de `dados/passos.json`.

O gerador também:

- **`ocultar_secoes`:** campo opcional por passo — lista de seções que **não** devem
  aparecer na página (ex.: `["ferramentas", "ouca"]`). Se ausente, todas as seções
  são exibidas. Usado para remover Ferramentas e Ouça de todos os passos.
- **`inlineFormat()`:** converte a formatação leve dos textos — `**negrito**` →
  `<strong>`, `*itálico*` → `<em>`, `###` no início de linha → `<strong>`, e quebras
  de linha (`\n`) → `<br>`. Vale para `para_comecar`, `pratique`, `organizese` e
  descrições.

## Apostilas (download pelos passos)

O botão **"Baixar Apostila"** de cada passo baixa a versão em **PDF** da apostila. O
fluxo foi desenhado para que **a versão subida no GitHub seja sempre a oficial** —
sem precisar mexer no HTML.

### Regra de ouro das apostilas

> **O que for subido em `docs/apostilas/` na branch `main` é a versão oficial.**

- `docs/apostilas/docx/` → suba os `.docx` (fonte da verdade, para edição).
- `docs/apostilas/pdf/` → suba os `.pdf` (é daqui que o site baixa).
- Para atualizar, basta **sobrescrever o arquivo** nas pastas em `main` — o site passa
  a baixar a versão nova automaticamente.

### Fluxo de atualização das apostilas

1. **Suba os arquivos novos em `main`** (via GitHub web ou git): `.docx` em
   `docs/apostilas/docx/` e `.pdf` em `docs/apostilas/pdf/`.
2. **Avisa** (na sessão do OpenCode) que subiu → a cópia local/VPS é **sincronizada
   com `main`** (arquivos baixados e organizados nas pastas) e a branch `homologacao`
   é atualizada para ficar **igual a `main`** em `docs/apostilas`.
3. **Validação automática:** cada passo baixa o PDF cujo nome contém o token dele.
   Se algum passo ficar sem PDF correspondente, o botão mostra "Apostila em breve".

> Os `.docx` não são baixados pelo site — são apenas a fonte de edição. O download
> dos passos é sempre a versão **PDF**.

### Como o botão encontra o arquivo (sem link fixo)

1. `scripts/apostilas.js` (carregado em cada `passo-N.html`) consulta a **GitHub API**:
   `api.github.com/repos/ismaelmmachado/trilha_de_novos/contents/docs/apostilas/pdf?ref=main`
   → lista os arquivos da pasta (o repo é público, funciona sem login).
2. Para cada botão, o script casa o **token** do passo com o nome do arquivo
   (case-insensitive, ignora acentos, respeita a fronteira do número — "PASSO 1" não
   pega "PASSO 10/11/12"; tolera prefixos antigos do tipo `doc_<hash>_`, mas os
   arquivos atuais usam nomes descritivos limpos).
3. Se achar, aponta o botão para `docs/apostilas/pdf/<arquivo>.pdf` com o atributo
   `download` — **o nome descritivo do arquivo é preservado** no download do usuário.

**Tokens por passo** (campo `pdf` em `dados/passos.json`):

| Página | Token no nome do PDF |
|---|---|
| `passo-1.html` | `Quem Somos e Como Caminhamos` |
| `passo-2.html` … `passo-9.html` | `PASSO 2` … `PASSO 9` |

> ⚠️ **Regra de nomeação:** o nome do PDF que você subir **precisa conter o token**
> do passo (ex.: `ESTAÇÃO 1 - PASSO 8 — CELEBRAÇÃO E ENVIO.pdf` contém `PASSO 8`).
> O restante do nome pode ser qualquer coisa (versão, data, etc.). Se o token não
> for encontrado, o botão mostra **"Apostila em breve"**.
> O passo 1 usa o trecho `Quem Somos e Como Caminhamos` (o arquivo `VITRAL — Quem
> Somos e Como Caminhamos Juntos` não contém "PASSO 1" no nome).

### Estados do botão

| Estado | Aparência | Quando |
|---|---|---|
| Carregando… | amarelo | Enquanto a GitHub API responde |
| Baixar Apostila | amarelo | Arquivo encontrado na pasta `pdf/` |
| Apostila em breve | cinza (não clicável) | Pasta vazia ou nenhum arquivo casa com o token |
| Não foi possível carregar | cinza | GitHub API fora do ar / erro inesperado |

### Atualização na hora (sem cache antigo)

O botão **sempre consulta a GitHub API** a cada carregamento de página (sem cache de
longa duração). Ou seja: subiu um PDF novo em `main`? Basta dar **reload** na página
que o botão já resolve para a versão nova — não precisa de nenhum parâmetro extra.

> O script mantém uma cópia em localStorage apenas como **reserva de emergência**:
> se a GitHub API estiver fora do ar, ele usa a última lista salva em vez de quebrar.

## Manutenção de conteúdo dos passos

Todo o conteúdo dos 9 passos vive em `dados/passos.json`. **Nunca edite `passo-N.html` na mão** — essas páginas são geradas. Para atualizar o conteúdo de um passo:

1. Edite o campo correspondente no `dados/passos.json` (ex.: `para_comecar`, `pratique`, `organizese`, `ferramentas`, `ouca`, `aprofunde`)
2. Rode `node scripts/gerar-passos.js`
3. Faça o commit das mudanças no JSON + nos HTML gerados

> 📘 **Contrato completo:** veja [docs/MANUTENCAO.md](docs/MANUTENCAO.md) para o
> procedimento de manutenção via Markdown (formatos de solicitação, ações
> INCLUIR/SUBSTITUIR/REMOVER e regras de segurança).
>
> 🗺️ **Atualização geral do projeto:** veja [docs/ATUALIZACAO-GERAL.md](docs/ATUALIZACAO-GERAL.md)
> para o runbook de ponta a ponta (conteúdo + código + verificação + versionamento).

### Campos por seção

| Seção | Campo no JSON | Estrutura |
|---|---|---|
| Para Começar | `para_comecar` | `{ texto, pergunta }` — `texto` pode incluir `**Texto Bíblico:**` e `**Reflita:**` |
| Ferramentas | `ferramentas` | `[{ icon, nome, descricao, link, rotulo }]` — vazio → "Em breve" (atualmente oculto via `ocultar_secoes`) |
| Ouça | `ouca` | `{ tipo: "placeholder" \| "player", src, titulo, descricao }` — `tipo` ≠ `player` → "Em breve" (atualmente oculto via `ocultar_secoes`) |
| Aprofunde | `aprofunde` | `{ livro: { titulo, autor, link }, musica: { titulo, artista, link } }` — vazio → "Em breve" |
| Pratique | `pratique` | `{ experimento, pergunta }` |
| Organize-se | `organizese` | `{ introducao, dias: [{ dia, texto }] }` — 7 dias, dias sem texto → "Em breve" |
| Apostila | `pdf` | Token de busca do PDF na pasta `docs/apostilas/pdf/` (ver seção "Apostilas") |
| (Controle de exibição) | `ocultar_secoes` | Array opcional de seções a não renderizar (ex.: `["ferramentas", "ouca"]`) |

> **Cache-busting:** todas as folhas de estilo são carregadas com `?v=<versão>`
> (ex.: `css/estilo.css?v=2.29.0`) para forçar o navegador a baixar o CSS atualizado.
> Ao alterar qualquer CSS (mudança em `tokens.css`, `estilo.css`, `mapa.css`,
> `material-de-apoio.css` ou `print.css`), **suba o `?v=`** para a nova versão em todas as
> páginas (`index`, `mapa`, `material-de-apoio`, `404`) e no `scripts/gerar-passos.js`,
> depois regenere as passos. Tags de documentação pura não exigem bump.
> GitHub Pages não permite cabeçalhos `Cache-Control` personalizados — a query string é o mecanismo.

## Versionamento

- **Branch ativa:** `homologacao`
- **Branch de produção:** `main`
- **Tags:** v1.0.0 a v2.29.x (ver [CHANGELOG.md](CHANGELOG.md))
- **GitHub Pages:** https://ismaelmmachado.github.io/trilha_de_novos

## Repositório

https://github.com/ismaelmmachado/trilha_de_novos

## Licença

Uso interno — Comunidade Vitral / IPIB.
