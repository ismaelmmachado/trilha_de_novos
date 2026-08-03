# ATUALIZAÇÃO GERAL — Runbook do Projeto

Este documento é o **ponto de entrada único** para executar uma atualização geral da
Trilha de Novos. Ele não substitui os documentos que referencia — ele **orquestra** o
fluxo de ponta a ponta. Leia-o por completo antes de começar.

---

## 1. Escopo

A atualização geral cobre **tudo**:

- **Conteúdo:** revisão dos 9 passos (`dados/passos.json`)
- **Código:** correções pendentes da auditoria técnica (`docs/auditoria-2026-08-02.md`)
- **Verificação:** checklist de qualidade (Regra de Ouro, NVT, placeholders, HTML, `?v=`)
- **Versionamento e salvamento:** CHANGELOG, tag, push `homologacao` e `main`

---

## 2. Inventário de conteúdo

Onde tudo mora:

| O quê | Onde | Como editar |
|---|---|---|
| Conteúdo dos 9 passos | `dados/passos.json` | via `docs/MANUTENCAO.md` (nunca editar HTML na mão) |
| Páginas dos passos | `passo-1.html` … `passo-9.html` | **geradas** — não editar |
| Landing / cards dos passos | `index.html` | carrega via `fetch('dados/passos.json')` — não editar à mão |
| Mapa do facilitador | `mapa.html` | estático — editar direto |
| Material complementar | `complementar.html` | estático — editar direto |
| Apostilas | `docs/apostilas/*.docx` | substituir arquivo |
| Estilos | `css/tokens.css`, `estilo.css`, `mapa.css`, `complementar.css`, `print.css` | editar direto + subir `?v=` |
| Gerador | `scripts/gerar-passos.js` | editar direto (gera as passos) |

---

## 3. Workflow de atualização geral

### Etapa 1 — Contexto

Leia antes de mexer em qualquer arquivo:

1. `CLAUDE.md` — **Regra de Ouro** (padrão de conteúdo) e **Regra de Salvamento** (git).
2. `docs/MANUTENCAO.md` — contrato de manutenção de conteúdo (formatos e ações).

### Etapa 2 — Conteúdo (9 passos)

1. Revise cada um dos 9 passos em `dados/passos.json`.
2. Aplique as mudanças conforme `docs/MANUTENCAO.md`:
   - Formato 1 (arquivo Markdown completo) ou Formato 2 (instrução em linha)
   - Ações: `INCLUIR`, `SUBSTITUIR`, `REMOVER`
3. Confira as citações bíblicas: **todas na NVT** (Nova Versão Transformadora).
4. Lembre do placeholder "Em breve": seções vazias (Ferramentas, Ouça, Aprofunde,
   dias de Organize-se) exibem placeholder — não deixe conteúdo órfão.

### Etapa 3 — Código (correções pendentes da auditoria)

Aplique os itens pendentes de `docs/auditoria-2026-08-02.md`:

| Prioridade | Item | Descrição resumida |
|---|---|---|
| Alta | **I2** | Contraste do hover do botão "voltar ao topo" (branco sobre amarelo) |
| Alta | **I3** | `index.html` sem fallback para JavaScript desativado |
| Alta | **I4** | `aria-label` do logo divergente entre index e demais páginas |
| Alta | **I5** | Estado do git pendente (arquivos deletados / CLAUDE.md sem commit) |
| Média | **M5** | `og-image` em SVG → exportar PNG (compartilhamento) |
| Média | **M6** | `print.css` não cobre mapa nem grid de passos |
| Média | **M7** | Terminologia "Estação 1" (index) vs "Etapa 1" (passos) |
| Média | **M8** | Convenção `?v=` (subir a cada mudança de CSS) |
| Baixa | **M1** | `<th>` sem `scope="col"` nas tabelas do mapa |
| Baixa | **M2** | Meta description longas demais nas passos (≤ 160 caracteres) |
| Baixa | **M3** | CSS morto (4 classes sem uso) |
| Baixa | **M4** | `.dica` com `border-color` sem `border-width`/`border-style` |

> ✅ O item **I1** (gerador hardcoded) já foi resolvido na v2.13.0 — não reaplicar.

### Etapa 4 — Regenerar

```bash
node scripts/gerar-passos.js
```

Confirme que as 9 páginas foram geradas sem erro.

### Etapa 5 — Verificar

Passe o checklist da seção 4 abaixo. Corrija o que falhar e regenere novamente.

### Etapa 6 — Versionar e salvar

1. Atualize `CHANGELOG.md` com a nova entrada de versão.
2. Suba o `?v=` se houver mudança de CSS.
3. Salve seguindo a **Regra de Salvamento** do `CLAUDE.md`:
   - commit + tag na branch `homologacao`
   - push `homologacao --tags`
   - sincronize `main` (fast-forward) quando for para produção

---

## 4. Checklist de verificação

Antes de finalizar qualquer atualização geral:

| Critério | Verificação |
|---|---|
| Regra de Ouro | Simples, missional, acolhedor; sem jargões; coerente com o Playbook |
| NVT | Todas as citações bíblicas na Nova Versão Transformadora |
| Placeholders | Seções vazias mostram "Em breve", não quebram o layout |
| HTML | `passo-N.html` válido, sem conteúdo perdido nas 9 páginas |
| Landing | `index.html` carrega os passos via JSON (cards corretos) |
| Cache-busting | `?v=` subiu se houve mudança de CSS (todas as páginas + gerador) |
| Auditoria | Itens I2–I5 e M1–M8 aplicados ou conscientemente adiados |
| Versionamento | CHANGELOG atualizado; tag criada; `homologacao` e `main` sincronizados |

---

## 5. Status das pendências da auditoria (controle)

Marque conforme for resolvendo (usado para rastrear, não substitui a auditoria):

- [ ] I2 — contraste hover back-to-top
- [ ] I3 — fallback sem JS no index
- [ ] I4 — aria-label do logo
- [ ] I5 — estado do git
- [ ] M1 — scope no th
- [ ] M2 — meta description ≤ 160
- [ ] M3 — CSS morto
- [ ] M4 — border-color do .dica
- [ ] M5 — og-image PNG
- [ ] M6 — print do mapa/grid
- [ ] M7 — Estação vs Etapa
- [ ] M8 — convenção ?v=

---

## 6. Referências

| Documento | Papel |
|---|---|
| `CLAUDE.md` | Regra de Ouro + Regra de Salvamento |
| `docs/MANUTENCAO.md` | Contrato de manutenção de conteúdo |
| `docs/auditoria-2026-08-02.md` | Auditoria técnica (achados I1–I5, M1–M8) |
| `README.md` | Visão geral e estrutura do projeto |
| `CHANGELOG.md` | Histórico de versões |
