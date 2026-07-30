const fs = require('fs');
const path = require('path');

const dados = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dados', 'passos.json'), 'utf-8'));
const rootDir = path.join(__dirname, '..');

function escapar(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderizarHeader(passoNome) {
  return `
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Trilha de Novos — Voltar ao início">
      Trilha de Novos
      <span class="logo-sub">Comunidade Vitral</span>
    </a>
    <nav class="nav" role="navigation" aria-label="Navegação principal">
      <a href="index.html">Início</a>
      <a href="guia.html">Guia</a>
      <a href="complementar.html">Material Complementar</a>
    </nav>
  </div>
</header>

<header class="mobile-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Trilha de Novos — Voltar ao início">Trilha de Novos</a>
    <nav class="mobile-nav" role="navigation" aria-label="Navegação principal">
      <a href="index.html">Início</a>
      <a href="guia.html">Guia</a>
      <a href="complementar.html">Material</a>
    </nav>
  </div>
</header>
`;
}

function renderizarBreadcrumb(passoNome) {
  return `
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="index.html">Início</a>
  <span class="breadcrumb-sep">/</span>
  <span>${escapar(passoNome)}</span>
</nav>
`;
}

function renderizarFerramentas(ferramentas) {
  if (!ferramentas || ferramentas.length === 0) {
    return `
<div class="placeholder-section">
  <div class="placeholder-icon">🛠️</div>
  <p>Em breve — ferramentas e recursos para este passo.</p>
</div>`;
  }

  let items = ferramentas.map(f => `
<div class="ferramenta-item">
  <div class="ferramenta-item-content">
    <div class="ferramenta-icon">${f.icone || '📖'}</div>
    <div class="ferramenta-info">
      <strong>${escapar(f.titulo)}</strong>
      <span>${escapar(f.descricao)}</span>
    </div>
  </div>
  <a href="${escapar(f.link)}" class="ferramenta-link" target="_blank" rel="noopener">${escapar(f.rotulo || 'Acessar')}</a>
</div>`).join('\n');

  return `<div class="ferramentas-list">${items}</div>`;
}

function renderizarOuça(ouca) {
  if (!ouca || ouca.tipo === 'placeholder' || !ouca.src) {
    return `
<div class="ouca-placeholder">
  <div class="placeholder-icon">🎧</div>
  <p>Em breve — conteúdo em áudio para este passo.</p>
</div>`;
  }

  return `
<div class="spotify-embed">
  <iframe src="${escapar(ouca.src)}" width="100%" height="152" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Player de áudio"></iframe>
</div>`;
}

function renderizarAprofunde(aprofunde) {
  if (!aprofunde || (!aprofunde.livro && !aprofunde.musica)) {
    return `
<div class="placeholder-section">
  <div class="placeholder-icon">📚</div>
  <p>Em breve — recomendações de livros e músicas para este passo.</p>
</div>`;
  }

  let items = [];
  if (aprofunde.livro) {
    items.push(`
<div class="aprofunde-item">
  <h4>${escapar(aprofunde.livro.titulo)}</h4>
  <p class="autor">${escapar(aprofunde.livro.autor)}</p>
  <a href="${escapar(aprofunde.livro.link)}" class="btn btn-outline" target="_blank" rel="noopener">Adquirir</a>
</div>`);
  }
  if (aprofunde.musica) {
    items.push(`
<div class="aprofunde-item">
  <h4>${escapar(aprofunde.musica.titulo)}</h4>
  <p class="autor">${escapar(aprofunde.musica.artista)}</p>
  <a href="${escapar(aprofunde.musica.link)}" class="btn btn-outline" target="_blank" rel="noopener">Ouvir</a>
</div>`);
  }

  return `<div class="aprofunde-list">${items.join('\n')}</div>`;
}

function renderizarOrganizese(organizese) {
  if (!organizese || !organizese.dias) return '';

  const cards = organizese.dias.map(d => {
    const emptyClass = d.texto ? '' : ' day-empty';
    const texto = d.texto || 'Descanso';
    return `
<div class="week-day-card${emptyClass}">
  <strong>${escapar(d.dia)}</strong>
  <span>${escapar(texto)}</span>
</div>`;
  }).join('\n');

  return `
<p>${escapar(organizese.introducao || 'Sugestões para a semana:')}</p>
<div class="week-plan-grid">
${cards}
</div>`;
}

function renderizarPagina(passo) {
  const title = `${escapar(passo.titulo)} · Trilha de Novos`;
  const pdfLink = passo.pdf;

  return `<!DOCTYPE html>
<html lang="pt-BR" data-etapa="${passo.etapa}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${escapar(passo.subtitulo)}" />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/estilo.css" />
</head>
<body>
  <a class="skip-link" href="#main">Ir para o conteúdo</a>

  ${renderizarHeader(passo.titulo)}
  ${renderizarBreadcrumb(passo.titulo)}

  <main id="main">
    <article>
      <header class="hero" style="text-align:left;padding:var(--space-xl) 0 var(--space-lg);">
        <div class="etapa-badge">Etapa 1 · Trilha de Novos</div>
        <h1>Passo ${passo.id}: ${escapar(passo.titulo)}</h1>
        <p class="subtitle" style="margin-left:0;">${escapar(passo.subtitulo)}</p>
      </header>

      <section class="section">
        <h2>Para Começar</h2>
        <div class="para-comecar">
          <p>${escapar(passo.para_comecar.texto)}</p>
          ${passo.para_comecar.pergunta ? `<p><strong>Pergunta para o diálogo:</strong> ${escapar(passo.para_comecar.pergunta)}</p>` : ''}
          <div class="para-comecar-footer">
            <a href="${escapar(pdfLink)}" class="download-btn" download>
              <span class="download-icon">↓</span>
              Baixar Apostila
            </a>
          </div>
        </div>
      </section>

      <section class="section ferramentas-section">
        <h2>Ferramentas</h2>
        ${renderizarFerramentas(passo.ferramentas)}
      </section>

      <section class="section ouca-section">
        <h2>Ouça</h2>
        ${renderizarOuça(passo.ouca)}
      </section>

      <section class="section aprofunde-section">
        <h2>Aprofunde</h2>
        ${renderizarAprofunde(passo.aprofunde)}
      </section>

      <section class="section pratique-section">
        <h2>Pratique</h2>
        <div class="pratique-grid">
          <div class="pratique-experimento">
            <h3><span>🧪</span>Experimento da Semana</h3>
            <p>${escapar(passo.pratique.experimento)}</p>
          </div>
          <div class="pratique-pergunta">
            <h3><span>💭</span>Pergunta para Refletir</h3>
            <p>${escapar(passo.pratique.pergunta)}</p>
          </div>
        </div>
      </section>

      <section class="section organize-section">
        <h2>Organize-se</h2>
        ${renderizarOrganizese(passo.organizese)}
      </section>
    </article>
  </main>

  <footer class="site-footer">
    <p>Trilha de Novos · Comunidade Vitral — IPIB São José do Rio Preto</p>
  </footer>
</body>
</html>`;
}

// Gerar páginas
dados.forEach(passo => {
  const html = renderizarPagina(passo);
  const filename = `passo-${passo.id}.html`;
  const filepath = path.join(rootDir, filename);
  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`✓ Gerado: ${filename}`);
});

console.log(`\nConcluído! ${dados.length} páginas geradas em ${rootDir}`);
