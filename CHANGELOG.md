# Changelog

## Tag: v2.36.0-specs-v2-33-v2-34 (13/08/2026)

- **Specs OpenSpec sincronizadas com as mudanças v2.33 e v2.34** (as features já estavam no código, mas as specs não refletiam):
  - **`openspec/specs/landing-page/spec.md`**: novo requirement "Box 'Ferramentas para o Caminho' na home" — seção que orienta o novo a usar as ferramentas entre os encontros, com itens (ícone, nome, descrição, link rotulado) e container de ações quando há mais de um link (ex.: Vitral no Spotify com "Ouvir" e "Baixar")
  - **`openspec/specs/material-de-apoio-page/spec.md`**: novo requirement "Ferramentas para o Caminho" — seção que lista as ferramentas da caminhada (Bible App YouVersion, Lectio 365 e o canal Spotify da Comunidade Vitral) com nome, descrição e link rotulado
  - **`openspec/specs/design-system/spec.md`**: componente `ferramentas-box` (box "Ferramentas para o Caminho") incluído na lista de estilos de `css/estilo.css`
- Sem mudança de código/páginas — apenas sincronização de documentação (specs)

## Tag: v2.35.2-passo3-herois-da-fe (13/08/2026)

- **`dados/passos.json`**: seção Aprofunde do passo 3 ("Certeza da Salvação") ganha o plano de leitura da YouVersion **"Heróis da Fé"** (`tipo: "plano"`, 13 dias, `https://www.bible.com/pt/reading-plans/60398`), com **descrição contextualizada** conforme a convenção — conhecer os heróis da fé de Hebreus 11 e aprender com suas histórias de confiança e perseverança
- Página `passo-3.html` regenerada (conteúdo, sem mudança de CSS)

## Tag: v2.35.1-youversion-contexto (13/08/2026)

- **`dados/passos.json`**: descrição do card "Quem Eu Sou Em Cristo" (passo 2) ganha a **contextualização do plano** — "Quem é você? Sua identidade não vem do que você faz, mas de quem Deus diz que você é. Um plano de 10 dias para descobrir quem você é em Cristo." — em vez de apenas "Plano de leitura · YouVersion (10 dias)"
- **`docs/MANUTENCAO.md`**: nova convenção na regra de `aprofunde` — **todo link do YouVersion deve trazer a contextualização na `descricao`** (o que é o plano, para quem, o que a pessoa vai descobrir), nunca apenas o tema
- Página `passo-2.html` regenerada (conteúdo, sem mudança de CSS)

## Tag: v2.35.0-aprofunde-flexivel (13/08/2026)

- **Seção Aprofunde dos passos generalizada para materiais complementares variados**: o schema deixa de ser `{ livro: {...}, musica: {...} }` (2 slots fixos) e passa a ser um **array de itens** `{ tipo, titulo, descricao, link, icon?, rotulo? }` — livro, plano de leitura, vídeo, música ou PDF para baixar, quantos forem necessários
- **`dados/passos.json`**: `aprofunde` de todos os 9 passos vira array (vazio → placeholder "Em breve"); passo 2 ("Quem Somos Diante de Deus") preenchido com o plano de leitura da YouVersion **"Quem Eu Sou Em Cristo"** (`tipo: "plano"`, 10 dias, `https://www.bible.com/pt/reading-plans/17170`)
- **`scripts/gerar-passos.js`**: `renderAprofunde()` reescrito para iterar o array — ícone e rótulo do botão derivam do `tipo` (📖 "Abrir" livro/plano, 🎬 "Assistir" vídeo, 🎵 "Ouvir" música, 📄 "Baixar" PDF, 🔗 "Abrir" padrão), com `icon`/`rotulo` como override opcional; mesmo CSS de card, sem mudança visual
- **Spec `openspec/specs/step-page-generator/spec.md`**: schema de `aprofunde` e cenários atualizados (itens por tipo + placeholder)
- Docs sincronizados: `README.md`, `docs/MANUTENCAO.md`, `docs/ORIENTACAO-BOOTSTRAP-CONTRATO.md`, `docs/TEMPLO-PASSO-PAGINA.md`
- Páginas regeneradas via `node scripts/gerar-passos.js`

## Tag: v2.34.0-box-ferramentas-home (12/08/2026)

- **`index.html`**: novo Box Rico **"Ferramentas para o Caminho"** adicionado à home, entre a grid "Os 9 Passos" e a seção CTA "Pronto para começar?"
- Objetivo: orientar e incentivar o novo — se desejar — a usar as ferramentas da caminhada, com os mesmos links da seção 📱 da página de Material de Apoio
- Card `.ferramentas-box-card` com 3 itens: 📖 **Bible App (YouVersion)** e 🙏 **Lectio 365** (link "Baixar" cada) e 🎙️ **Vitral no Spotify** com 2 links — "Ouvir" (direto ao show em `open.spotify.com`) e "Baixar" (`spotify.com/download/`)
- **`css/estilo.css`**: estilos novos do box na seção INDEX (`.ferramentas-box-*`), com variante secundária para o link "Baixar" do Spotify; responsivo mobile empilha itens e alarga links
- Cache-busting do CSS na home: `?v=2.10.0` → `?v=2.34.0`
- Estático no HTML (sem JS/fetch novo); registro via CHANGELOG + tag (sem change OpenSpec — alteração de conteúdo/estilo)
- Mantido em `homologacao` (sem merge em `main`)

## Tag: v2.33.0-podcast-ferramenta (12/08/2026)

- **`material-de-apoio.html`**: seção **"🎙️ Podcast da Comunidade Vitral"** removida — o canal do Spotify da Vitral passa a ser tratado como uma ferramenta da caminhada
- Novo item **"Canal Spotify da Comunidade Vitral"** adicionado à lista **📱 Ferramentas para o Caminho**, no mesmo formato visual dos demais (`apoio-item`), com descrição curta e link "Baixar" → `https://www.spotify.com/download/`
- **`css/material-de-apoio.css`**: removidas as regras órfãs do card antigo (`.podcast-card`, `.podcast-card-content`, `.podcast-convite`, `.podcast-card-actions`, `.podcast-link`)
- Cache-busting do CSS na página: `?v=2.31.0` → `?v=2.33.0`
- Registro via CHANGELOG + tag (sem change OpenSpec — mudança só de conteúdo, specs inalteradas)

## Tag: v2.31.0-material-de-apoio (04/08/2026)

- Página "Material Complementar" renomeada para **"Material de Apoio"** (rename completo):
  - Arquivos: `complementar.html` → `material-de-apoio.html`; `css/complementar.css` → `css/material-de-apoio.css` (via `git mv`, histórico preservado)
  - Classes CSS renomeadas com prefixo `.apoio-*` (`.complementar-*`/`.comp-*` → `.apoio-*`) em `css/material-de-apoio.css`, `css/print.css` e no HTML da página (`.podcast-*` mantido)
  - Navegação (label + `href`) atualizada em `index.html`, `mapa.html`, `404.html` e `scripts/gerar-passos.js` (+ 9 passos regenerados)
  - `<title>`, `og:*`, breadcrumb e `<h1>` da página; meta description → "Materiais de apoio…"; link do CSS com `?v=2.31.0`
- Docs e specs atuais: `README.md`, `docs/ATUALIZACAO-GERAL.md`, `openspec/specs/` (landing-page, mapa-page, design-system) e diretório da spec `complementar-page` → `material-de-apoio-page`
- Fora do escopo (registros históricos): CHANGELOG antigo, `docs/auditoria-*.md`, `openspec/changes/archive/**`; "Anexos complementares" do `mapa.html` e "conteúdo complementar" dos templates são conceitos distintos — mantidos

## Tag: v2.30.0-docs-readme (04/08/2026)

- **README.md** atualizado: gerador com seções condicionais (`ocultar_secoes`) e `inlineFormat()`; passos com 4 seções exibidas (Ferramentas/Ouça ocultas); tabela de campos ganha `ocultar_secoes` e o padrão **Texto Bíblico**/**Reflita**; cache-busting `?v=2.29.0`; tags até v2.29.x
- **docs/MANUTENCAO.md**: exemplo do Formato 1 atualizado para o PASSO 1 novo ("Vitral — Quem Somos e Como Caminhamos Juntos") + nota de formatação leve e do padrão Texto Bíblico/Reflita
- **docs/ATUALIZACAO-GERAL.md**: placeholder e `ocultar_secoes` refletidos no fluxo e no checklist
- **docs/TEMPLO-PASSO-PAGINA.md**: Ferramentas/Ouça marcadas como ocultas via `ocultar_secoes`; mapeamento JSON ganha o campo
- **docs/ORIENTACAO-BOOTSTRAP-CONTRATO.md**: dica de portabilidade do `ocultar_secoes`
- Documentação apenas — nenhuma mudança em código, JSON ou HTML

## Tag: v2.29.0-espaco-pergunta (04/08/2026)

- Espaçamento na seção "Para Começar" de todos os passos: nova regra `.step-section-content p + p` (margin-top `--space-md`, 16px) cria uma linha em branco entre o texto bíblico e a subseção "Pergunta para o diálogo:" — hoje só o Para Começar tem `<p>` consecutivos, então as demais seções não são afetadas
- `css/estilo.css` + cache-busting: versão dos CSS sobe de `?v=2.10.0` para `?v=2.29.0` nas 9 páginas geradas (garante que os navegadores busquem a nova folha de estilo)

## Tag: v2.28.0-passo1-conteudo (04/08/2026)

- PASSO 1 (site): **substituição total do conteúdo** — `titulo` vira "Vitral — Quem Somos e Como Caminhamos Juntos" (alinhado ao documento/PDF); `subtitulo` vira "Entender a história, os valores e o jeito de ser da comunidade que você está conhecendo."; `para_comecar` reescrito (jeito Vitral, identidade) com "Texto Bíblico" (João 15.5, NVT); `pratique` vira os 5 itens para viver o jeito Vitral (movimentos da missão, três pilares, PG) + pergunta da semana; `organizese` ganha os 7 dias (preenche os 6 que estavam vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (`Quem Somos e Como Caminhamos` — inalterado, o botão continua encontrando o PDF)
- O novo título propaga automaticamente para os cards da `index.html` (fonte: `passos.json`)
- Com este passo, os **9 passos** + o documento VITRAL foram atualizados com o novo conceito

## Tag: v2.27.0-passo9-conteudo (04/08/2026)

- PASSO 9 "Preparação para a Membresia" (site): **substituição total do conteúdo** — `subtitulo` vira "Entender o que significa fazer parte desta família, para que, se decidir, seja com o coração e a mente alinhados."; `para_comecar` reescrito (decisão consciente e madura, sem pressa) com "Texto Bíblico" (Romanos 12.1, NVT); `pratique` vira os 5 itens para se preparar para a decisão + pergunta da semana; `organizese` ganha os 7 dias (preenche Ter/Qui/Sex que estavam vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 9)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente
- Com este passo, **todos os 9 passos** já foram atualizados com o novo conceito

## Tag: v2.26.0-passo8-conteudo (04/08/2026)

- PASSO 8 "Celebração e Envio" (site): **substituição total do conteúdo** — `subtitulo` vira "Olhar para trás com gratidão. Olhar para frente com esperança."; `para_comecar` reescrito (fim da Trilha = começo da caminhada) com "Texto Bíblico" (Mateus 28.19-20, NVT); `pratique` vira os 5 itens para viver o envio + pergunta da semana; `organizese` ganha os 7 dias (preenche Ter/Qui/Sex que estavam vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 8)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.25.0-passo7-conteudo (04/08/2026)

- PASSO 7 "Fazer Parte da Família" (site): **substituição total do conteúdo** — `subtitulo` vira "Pertencer não é sobre ser perfeito. É sobre escolher caminhar junto."; `para_comecar` reescrito (participar ≠ pertencer; "Este é o meu lugar") com "Texto Bíblico" (Efésios 2.19, NVT); `pratique` vira os 5 passos rumo ao pertencimento + pergunta da semana; `organizese` ganha os 7 dias (preenche Ter/Qui/Sex que estavam vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 7)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.24.0-passo6-conteudo (04/08/2026)

- PASSO 6 "Os Sinais da Caminhada" (site): **substituição total do conteúdo** — `subtitulo` vira "O Batismo é o abraço que vem antes. A Ceia é a mesa que continua posta."; `para_comecar` reescrito (batismo e ceia como presentes/sinais) com "Texto Bíblico" (1 Coríntios 11.26, NVT); `pratique` vira os 5 itens para viver os sinais (batizado/não batizado, Ceia, testemunhos) + pergunta da semana; `organizese` ganha os 7 dias (preenche Ter/Qui/Sex que estavam vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 6)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.23.0-passo5-conteudo (04/08/2026)

- PASSO 5 "Seu Lugar no Vitral" (site): **substituição total do conteúdo** — `subtitulo` vira "Cada um de nós tem uma cor que ninguém mais tem — e no vitral, cada cor importa."; `para_comecar` reescrito (não somos espectadores; cor única no vitral) com "Texto Bíblico" (1 Pedro 4.10, NVT); `pratique` vira os 5 passos para descobrir o lugar (dons, times da Vitral, serviço) + pergunta da semana; `organizese` ganha os 7 dias (preenche Ter/Qui/Sex que estavam vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 5)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.22.0-passo4-conteudo (04/08/2026)

- PASSO 4 "O Ritmo da Vida com Deus" (site): **substituição total do conteúdo** — `subtitulo` vira "Cuidar de si para cuidar do outro — um ritmo que cabe no seu dia a dia."; `para_comecar` reescrito (fé sustentável, metáfora do café) com "Texto Bíblico" (1 Coríntios 6.19, NVT); `pratique` vira o "gesto simples" de cuidado do C.A.F.É. (5 itens) + pergunta da semana; `organizese` ganha os 7 dias (cuidado integral, sem dias vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 4)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.21.0-passo3-conteudo (04/08/2026)

- PASSO 3 "A Segurança da Fé" (site): **substituição total do conteúdo** — `subtitulo` vira "A certeza não está em você — está na promessa de Deus."; `para_comecar` reescrito (dúvidas humanas → certeza na promessa) com "Texto Bíblico" (João 5.24, NVT); `pratique` vira o "exame sincero da fé" (5 passos) + pergunta da semana; `organizese` ganha os 7 dias (leitura NVT + ação, sem dias vazios)
- Mantidos: `ferramentas`/`ouca` (ocultos via `ocultar_secoes`), `aprofunde` (placeholder) e token `pdf` (PASSO 3)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.20.1-passo-secoes-todos (04/08/2026)

- Aplica a mesma proposta do passo 2 a **todos** os passos: `ocultar_secoes: ["ferramentas", "ouca"]` adicionado aos passos 1, 3, 4, 5, 6, 7, 8, 9 — nenhuma página exibe mais as seções Ferramentas e Ouça (dados permanecem no JSON, reversível)
- `docs/MANUTENCAO.md`: documenta o campo `ocultar_secoes` na tabela de mapeamento (seção 2), ajusta a regra de REMOVER na seção 4 e o passo 5 do fluxo de execução para considerar seções ocultas

## Tag: v2.20.0-passo2-sem-secoes (04/08/2026)

- Conceito do passo ajustado no PASSO 2: seções **Ferramentas** e **Ouça** removidas da página (fase de testes)
- `scripts/gerar-passos.js`: novo helper `deveRenderizar(passo, secao)` — as seções Ferramentas/Ouça só são renderizadas se `passo.ocultar_secoes` não as listar; os demais passos (sem o campo) continuam com as 6 seções
- `dados/passos.json` (passo 2): `"ocultar_secoes": ["ferramentas", "ouca"]` — dados mantidos no JSON (reversível), apenas ocultos na página

## Tag: v2.19.0-passo2-substituicao (04/08/2026)

- PASSO 2: **substituição total do conteúdo** (fase de testes do procedimento) — `subtitulo` vira "A sua história — com todas as suas marcas — já é parte da história de Deus."; `para_comecar` reescrito (rótulos → você já é amado) com "Texto Bíblico" (Salmo 139.14, NVT); `pratique` vira a lista de "Gestos para viver sua identidade" (5 itens) + pergunta da semana; `organizese` ganha os 7 dias como ações simples (sem leitura/oração)
- Mantidos: `ferramentas` (3 genéricas), `ouca` e `aprofunde` (placeholders — conteúdo narrativo fica para a apostila)
- Mudança de dados apenas (`dados/passos.json`); renderização via `inlineFormat()` existente

## Tag: v2.18.2-passo2-pratique (04/08/2026)

- Pratique do PASSO 2: remove o bloco "Três gestos" (interno/relacional/missional); a seção fica apenas com o experimento da semana + pergunta da semana
- Mudança de dados apenas (`dados/passos.json`)

## Tag: v2.18.1-passo2-organizese (04/08/2026)

- Organize-se do PASSO 2: cada um dos 7 dias vira 2 linhas — leitura (NVT) + "Ação:" em linha própria; bloco "Ore:" removido dos dias
- Mudança de dados apenas (`dados/passos.json`); o gerador usa o `\n` já tratado por `inlineFormat()` para produzir o `<br>`

## Tag: v2.18.0-passo2-conteudo (04/08/2026)

- PASSO 2 "Quem Somos Diante de Deus" (site): aplica o novo conteúdo — `para_comecar` vira âncora de abertura com citação NVT (Salmo 139.14), `pratique` ganha o experimento da semana + os "Três gestos" (interno/relacional/missional), `organizese` preenche todos os 7 dias (antes Ter/Qui/Sex vazios) com leitura NVT + oração + ação
- `scripts/gerar-passos.js`: novo helper `inlineFormat()` — converte `###`, `**negrito**`, `*itálico*` e quebras de linha em HTML nos textos renderizados; os demais passos ficam inalterados (nenhum usava marcadores)
- Sem mudança em `ferramentas` (mantém as 3 genéricas), `ouca` e `aprofunde` (placeholders); alinhado ao TEMPLO-PASSO-PAGINA (não repete a apostila)

## Tag: v2.17.0-templates-tipos-conteudo (04/08/2026)

- Cria `docs/TEMPLO-APOSTILA-TIPOS.md` — define **que tipo de conteúdo** entra em cada seção do template da apostila (espinha dorsal fixa + bloco ANEXO), com regras transversais (NVT, 1 pergunta por tema, ordem fixa) e template markdown de manutenção compatível com `docs/MANUTENCAO.md`
- Cria `docs/TEMPLO-PASSO-PAGINA.md` — define **que tipo de conteúdo complementar** entra em cada seção da página do passo no site (Para Começar, Ferramentas, Ouça, Aprofunde, Pratique, Organize-se, Apostila), com a regra central de "não repetir a apostila", mapeamento JSON ↔ campo e impacto de implementação
- Ambos alinhados à REGRA DE OURO (`CLAUDE.md`); documentação apenas — nenhuma mudança em código, JSON ou páginas HTML

## Tag: v2.16.6-apostilas-api-fresca (04/08/2026)

- `scripts/apostilas.js`: o botão **sempre consulta a GitHub API** (`docs/apostilas/pdf?ref=main`) a cada carregamento — corrige o "Apostila em breve" que persistia após subir um PDF novo (cache de 6h do navegador ignorava arquivos recém-publicados)
- O cache em localStorage virou **reserva de emergência** (usado apenas se a API falhar); removido o TTL de 6h; `?refresh=apostilas` deixa de ser necessário
- README: seção "Atualização na hora" reescrita (reload basta para ver arquivo novo)
- Inclui o v2.16.5 (normalização das apostilas com `main` — PDF do PASSO 9 + documentação das apostilas)

## Apostilas — consolidação do fluxo docx/pdf (03/08/2026, commits v2.16.1–v2.16.4)

- v2.16.1: remove as apostilas `.docx` obsoletas (prefixo `doc_*`) de `docs/apostilas/docx` (local + GitHub, branches `homologacao` e `main`)
- v2.16.2: move `docs/VITRAL — Quem Somos e Como Caminhamos Juntos • v2.2.docx` para `docs/apostilas/docx/`
- v2.16.3: move `docs/apostilas/VITRAL — Quem Somos e Como Caminhamos Juntos • v2.2.pdf` para `docs/apostilas/pdf/`
- v2.16.4: sincroniza `docs/apostilas` (docx + pdf) de `homologacao` com `main` — pasta fica idêntica nas duas branches
- **Documentação:** README ganha o "Fluxo de atualização das apostilas" (subir em `main` → avisar → sincronizar `homologacao`); `docs/MANUTENCAO.md` documenta a manutenção das apostilas (token + regra de nomeação); `docs/ATUALIZACAO-GERAL.md` atualiza inventário e checklist; `CLAUDE.md` ganha a seção 12 "Apostilas — Download e Atualização"; spec `step-page-generator` do `openspec` passa a descrever o download dinâmico de PDF por token

## Tag: v2.16.0-apostilas-pdf (03/08/2026)

- Download de apostilas deixa de usar link fixo `.docx`: cada passo baixa a versão **PDF** via busca dinâmica por token
- Cria `docs/apostilas/docx/` (fonte da verdade — upload manual) e `docs/apostilas/pdf/` (baixadas pelo site); os 11 `.docx` existentes foram movidos para `docx/`
- `dados/passos.json`: campo `pdf` vira **token de busca** (passo 1 = `Quem Somos e Como Caminhamos`; passos 2–9 = `PASSO N`)
- Novo `scripts/apostilas.js`: consulta a GitHub API (`contents/docs/apostilas/pdf?ref=main`), cacheia em localStorage (TTL 6h), casa o token no nome do arquivo (case-insensitive, com fronteira de dígito e tolerância ao prefixo `doc_<hash>_`) e aponta o botão com `download` preservando o nome descritivo; estados: Carregando… / Baixar Apostila / Apostila em breve; `?refresh=apostilas` ignora o cache
- `scripts/gerar-passos.js`: botão gerado com `data-apostila-token` + inclui `scripts/apostilas.js`; páginas `passo-1.html` a `passo-9.html` regeneradas
- `css/estilo.css`: estilo `.is-unavailable` para o estado "Apostila em breve"
- README: nova seção "Apostilas (download pelos passos)" documentando a regra de ouro, os tokens, os estados do botão e o fluxo de atualização

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
