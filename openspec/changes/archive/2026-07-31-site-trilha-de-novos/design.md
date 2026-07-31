## Context

O projeto não tem nenhum arquivo HTML, CSS ou JS atualmente. Todo o conteúdo da Trilha de Novos existe em arquivos .docx em `/tmp/`. O design system e a arquitetura do blueprint "Praticando o Caminho" servem como referência para a implementação — usamos o mesmo padrão de tokens, componentes e pipeline de geração, adaptando para o nome e identidade da Trilha de Novos.

## Goals / Non-Goals

**Goals:**
- Site estático 100% offline (sem frameworks, sem build tools)
- Pipeline de geração simples: JSON → Node.js → HTML estático
- Design consistente com o ecossistema Vitral (mesmo design system do Praticando o Caminho)
- Conteúdo dos 9 passos extraído e adaptado dos .docx originais

**Non-Goals:**
- Conversão dos .docx para PDF (será feito futuramente)
- Autenticação, banco de dados ou backend
- Player de áudio real (placeholders apenas)
- Conteúdo completo do material complementar (placeholders apenas)

## Decisions

- **Framework zero**: HTML semântico + CSS puro sem frameworks. O blueprint já estabelece esse padrão e não há necessidade de complexidade adicional para um site de ~12 páginas estáticas.
- **Gerador Node.js simples**: Um script único (`gerar-passos.js`) lê JSON e escreve HTML. Sem templating engines — string concatenation ou template literals são suficientes para 9 páginas com estrutura idêntica.
- **Design tokens via CSS custom properties**: Mesmo padrão do blueprint. `tokens.css` contém apenas variáveis; `estilo.css` contém componentes. Separação clara de responsabilidades.
- **Etapa 1 (amarelo)**: Única etapa para toda a Trilha de Novos. `data-etapa="1"` em todas as páginas.
- **Conteúdo extraído dos .docx**: Cada passo tem seu conteúdo resumido/extratado para o JSON. As seções vazias (Ferramentas, Ouça, Aprofunde) usam placeholders. "Pratique" e "Organize-se" são preenchidos com conteúdo dos desafios semanais e reflexões.
- **Guia em vez de Facilitador**: A página de orientação chama-se `guia.html` (não `facilitador.html`), com conteúdo extraído da "Apostila do Facilitador".

## Risks / Trade-offs

- **Conteúdo do Organize-se**: Os 7 dias da semana precisam ser escritos do zero para cada passo — os .docx originais não têm esse formato. [Risk] → Escrever conteúdo simples e direto, alinhado com os valores Vitral.
- **Placeholders podem parecer conteúdo vazio**: [Risk] → Usar design visual que deixe claro que é "Em breve" em vez de parecer conteúdo faltando.
- **Apostilas .docx como download**: Arquivos .docx podem abrir de forma inconsistente em dispositivos móveis. [Trade-off] Aceito por enquanto; migração para PDF é planejada como tarefa futura.
