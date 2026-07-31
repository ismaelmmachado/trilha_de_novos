## Context

O site é estático (HTML + CSS + um gerador Node). As páginas `passo-*.html` são geradas por `scripts/gerar-passos.js` a partir de `dados/passos.json`; as demais páginas são escritas à mão. Isso cria duas fontes de verdade que já divergiram (ex.: `og:image` presente nas passos commitadas mas ausente no gerador; nav mobile corrigida só no `complementar.html`). A auditoria também apontou HTML inválido e contraste insuficiente. Ver `proposal.md` para a motivação.

## Goals / Non-Goals

**Goals:**
- Restaurar o gerador como fonte da verdade das páginas de passo (og:image, nav mobile, aria-label)
- Eliminar HTML inválido (atributos duplicados) e estilos inline remanescentes
- Alcançar WCAG AA no texto dos botões (≥ 4.5:1) mantendo a identidade amarela da etapa 1
- Tornar `dados/passos.json` a fonte única dos títulos/descrições dos 9 passos
- Deixar README e CHANGELOG refletindo o estado real do repositório

**Non-Goals:**
- Não alterar o visual geral, layout ou identidade do site
- Não trocar a stack (sem frameworks, sem build)
- Não reestruturar o `mapa.html` nem o `complementar.html` além das correções apontadas

## Decisions

1. **Contraste do botão via fundo sólido, não via gradiente.**
   O gradiente `--accent-gradient` (#EAB308 → #854D0E) não admite uma única cor de texto legível em todo o intervalo: branco falha no amarelo (1.92:1) e `#422006` falha no marrom (2.13:1). Solução: botões passam a usar fundo sólido `var(--accent)` + texto `var(--accent-on-accent)` (#422006) = 7.6:1. Criado o token `--accent-on-accent` em `tokens.css`. O gradiente permanece em usos decorativos (ex.: número "404" em texto). Alternativas descartadas: manter o gradiente escurecido (perde identidade) e manter branco (falha).

2. **`index.html` carrega os cards via `fetch('dados/passos.json')`.**
   Antes, as descrições dos cards eram um array inline que divergia do JSON (`resumo` vs `descricao`). Adicionamos o campo `descricao` a cada passo do JSON (preservando os textos atuais dos cards) e o index busca o arquivo em runtime. Alternativa descartada: gerar os cards via `gerar-passos.js` — tornaria o index dependente de regeração manual e perderia a simplicidade de uma landing estática com um único fetch. O JSON já é servido pelo GitHub Pages, sem custo adicional.

3. **Correções que tocam o gerador são feitas no gerador + regeração.**
   Nav mobile, aria-label e citações NVT vivem em `dados/passos.json` e/ou `scripts/gerar-passos.js`; as 9 `passo-*.html` são regeneradas. O diff pós-regeneração é conferido para garantir que nenhuma edição manual é perdida.

## Risks / Trade-offs

- [Regenerar as passos pode sobrescrever edições manuais] → Conferir `git diff` das `passo-*.html` após `node scripts/gerar-passos.js`; só deve aparecer o que o gerador determina
- [`fetch` no index depende de HTTP (funciona no GitHub Pages, falha abrindo via `file://`)] → adicionado `.catch` com mensagem amigável; aceitável porque o site é servido via Pages
- [Cor sólida no botão muda levemente a aparência] → compensado com `box-shadow` existente e identidade amarela mantida; melhoria de acessibilidade justifica a mudança
