# ORIENTAÇÃO: Normalizar site de trilha para conteúdo 100% data-driven

Texto de orientação reutilizável para preparar um site de trilha para o processo
de manutenção de conteúdo. O modelo final é: **todo o conteúdo dos passos vive em
um arquivo de dados (JSON), o HTML das páginas é GERADO a partir desse arquivo e
nenhuma página de passo deve ser editada manualmente.**

Cole este texto em uma nova sessão do OpenCode e siga as fases abaixo.

---

## Regras obrigatórias desta missão

1. **NÃO redesenhe o visual.** Preserve exatamente o layout, as classes CSS e os
   componentes atuais. A missão é de ESTRUTURA, não de estilo.
2. **NÃO altere conteúdo de texto dos passos** a menos que seja necessário para
   migrar (ex.: mover texto que estava hardcoded no código para o JSON).
3. **Preserve a REGRA DE OURO / Playbook / estilo de linguagem do projeto**
   (se existir CLAUDE.md, siga-o).
4. **NÃO invente conteúdo.** Se uma seção está vazia, ela deve renderizar um
   placeholder "Em breve", nunca sumir nem quebrar o layout.
5. **Ao final, toda alteração deve ser verificável** rodando o gerador.

## Fase 1 — Diagnóstico da estrutura (OBRIGATÓRIA — sempre faça primeiro)

Nesta fase você vai descobrir COMO o site é construído hoje. Não assuma nada.
Explore e registre as respostas:

1. **Localize as páginas de passo.** Liste os arquivos (padrões comuns:
   `passo-1.html … passo-N.html`, ou `p/step/…`). Quantos passos existem?

2. **Identifique a fonte de conteúdo.**
   - a) Existe um arquivo de dados (ex.: `dados/passos.json`, `content/`,
     `data/`) que alimenta as páginas?
   - b) Existe um script gerador (ex.: `scripts/gerar-passos.js`, `build/`)?
   - c) Ou as páginas são HTML estático puro, com conteúdo escrito à mão?

3. **Classifique o site em UM dos cenários abaixo:**
   - **CENÁRIO A:** já existe JSON + gerador → vá para Fase 2A.
   - **CENÁRIO B:** só HTML puro, sem dados nem gerador → vá para Fase 2B.
   - **CENÁRIO C:** parcial (algum gerador, mas conteúdo ainda manual) → Fase 2A
     com atenção extra para migrar o que estiver manual.

4. **No cenário A/C, abra o gerador e registre:** QUAIS seções são renderizadas
   a partir do JSON (data-driven) e QUAIS têm conteúdo hardcoded no código
   (fixo)? Atenção especial a: Ferramentas, Ouça/Áudios, Aprofunde/Livros e
   qualquer seção com itens repetidos.

5. **Verifique a landing/index:** ela carrega os passos via `fetch` do JSON?

6. **Registre as discrepâncias** entre o que o JSON tem e o que o HTML mostra
   (ex.: campo vazio no JSON mas conteúdo fixo no código do gerador).

7. **Reporte o diagnóstico ao usuário** e confirme o cenário identificado antes
   de prosseguir. Se não tiver certeza, pergunte.

## Fase 2A — Já existe JSON + gerador: tornar 100% data-driven

Para CADA seção que estiver hardcoded:

1. **Crie a estrutura de dados no JSON:**
   - Listas de itens (ex.: ferramentas) → array de objetos
     `{ icon, nome, descricao, link, rotulo }` (ajuste os campos ao caso real)
   - Conteúdo simples (ex.: áudio) → objeto com tipo + metadados
     `{ tipo: "placeholder" | "player", src, titulo, descricao }`
   - Pares (ex.: livro + música) → objeto com sub-objetos
     `{ livro: { titulo, autor, link }, musica: { titulo, artista, link } }`
2. **No gerador**, a função de render de cada seção passa a RECEBER o passo e
   ler o campo correspondente do JSON.
3. **Regra de placeholder:** se o campo estiver vazio, renderize o placeholder
   estilizado "Em breve" (reuse a classe CSS de placeholder que já existe).
   NUNCA deixe conteúdo fixo no código.
4. **Migração de conteúdo fixo:** se o site JÁ exibe conteúdo fixo em todas as
   páginas (ex.: mesmas 3 ferramentas em todos os passos), MIGRE esse conteúdo
   para o JSON de cada passo, mantendo o resultado visual idêntico. Não deixe
   nada órfão.
5. **Atualize as chamadas** no template final para passar o passo às funções.

## Fase 2B — HTML puro, sem gerador: criar o gerador do zero

1. **Extraia o padrão do HTML atual.** Identifique:
   - O bloco de `<head>` (meta, OG, favicon, CSS)
   - O header/nav, breadcrumb, footer — o que é igual em todas as páginas
   - As seções de conteúdo que variam por passo (ex.: Para Começar, Ferramentas,
     Ouça, Aprofunde, Pratique, Organize-se)
   - Como o conteúdo de cada seção está marcado (títulos, parágrafos, listas)
2. **Crie o arquivo de dados** (ex.: `dados/passos.json`) com um objeto por
   passo: `id`, `titulo`, `subtitulo`, `resumo` e as seções estruturadas
   conforme acima. Migre o conteúdo REAL já existente no HTML para o JSON —
   copie o texto atual, não invente nada novo.
3. **Crie o gerador** (ex.: `scripts/gerar-passos.js`) em Node.js puro que:
   - Lê o JSON
   - Gera um arquivo `passo-N.html` por objeto, montando o template com header,
     breadcrumb, as seções e o footer
   - Renderiza placeholder "Em breve" para seções vazias
   - Usa as MESMAS classes CSS e estrutura do HTML atual (não reinvente)
4. **Se a landing/index carrega os passos**, faça-a usar o JSON (`fetch`), como
   em um site data-driven.

## Fase 3 — Verificação (obrigatório, não pule)

1. Rode o gerador: `<comando do projeto, ex.: node scripts/gerar-passos.js>`.
2. Para cada página gerada, confirme:
   - Todo conteúdo que existia antes continua aparecendo (nada perdido).
   - Seções vazias mostram "Em breve" e não quebram o layout.
   - HTML válido (tags fechadas, sem duplicação de blocos).
3. Confirme que a landing/index continua carregando o JSON corretamente.
4. Se o projeto usa cache-busting (`?v=`) nas folhas de estilo e você mexeu em
   CSS, suba a versão conforme a convenção do projeto.
5. Relate ao usuário: cenário identificado, seções que estavam hardcoded, o que
   foi migrado e o resultado da verificação.

## Entregáveis esperados

- Diagnóstico documentado (cenário A/B/C identificado)
- Arquivo de dados (JSON) com TODAS as seções dos passos estruturadas
  (no cenário B: criado do zero, com o conteúdo real migrado)
- Gerador lendo 100% do JSON (zero conteúdo fixo de passo no código)
  (no cenário B: criado do zero)
- Páginas de passo regeneradas, visual idêntico, placeholders corretos
- Resumo claro do que foi mudado, para o usuário revisar antes de salvar
