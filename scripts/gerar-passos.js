const fs = require('fs');
const path = require('path');

const passos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dados', 'passos.json'), 'utf-8'));

function renderHeader() {
  return `
<header class="site-header" role="banner">
  <div class="container header-inner">
    <a href="index.html" class="logo" aria-label="Trilha de Novos — Voltar ao início">
      Trilha de Novos
      <span>Comunidade Vitral</span>
    </a>
    <nav class="nav" role="navigation" aria-label="Navegação principal">
      <a href="index.html">Início</a>
      <a href="mapa.html">Mapa</a>
      <a href="complementar.html">Material Complementar</a>
    </nav>
  </div>
</header>

<header class="mobile-header" role="banner">
  <nav class="mobile-nav" role="navigation" aria-label="Navegação principal">
    <a href="index.html">Início</a>
    <a href="mapa.html">Mapa</a>
    <a href="complementar.html">Material</a>
  </nav>
</header>`;
}

function renderBreadcrumb(nome) {
  return `
<div class="container">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="index.html">Início</a>
    <span class="breadcrumb-sep">/</span>
    <span>${nome}</span>
  </nav>
</div>`;
}

function renderPageHeader(passo) {
  return `
<div class="content-container">
  <div class="page-header">
    <div class="step-meta">
      <span class="etapa-badge">Etapa 1 · Passo ${passo.id}</span>
    </div>
    <h1>${passo.titulo}</h1>
    <p class="step-subtitle">${passo.subtitulo}</p>
  </div>
</div>`;
}

function sectionIcon(id) {
  const icons = {
    1: '📖',
    2: '🛠️',
    3: '🎧',
    4: '📚',
    5: '🎯',
    6: '📋'
  };
  return icons[id] || '📄';
}

function renderSectionHeader(icon, titulo) {
  return `
<div class="step-section-header">
  <div class="section-icon">${icon}</div>
  <h2>${titulo}</h2>
</div>`;
}

function renderParaComecar(passo) {
  return `
<div class="step-section">
  ${renderSectionHeader('📖', 'Para Começar')}
  <div class="step-section-content">
    <p>${passo.para_comecar.texto}</p>
    <p><strong>Pergunta para o diálogo:</strong> ${passo.para_comecar.pergunta}</p>
    <div class="para-comecar-footer">
      <a href="${passo.pdf}" class="download-btn" download>
        <span class="download-icon">↓</span>
        Baixar Apostila
      </a>
    </div>
  </div>
</div>`;
}

function renderFerramentas() {
  return `
<div class="step-section">
  ${renderSectionHeader('🛠️', 'Ferramentas')}
  <div class="step-section-content">
    <p class="ferramentas-intro">Ferramentas que podem apoiar sua caminhada:</p>
    <div class="ferramentas-list">
      <div class="ferramenta-item">
        <div class="ferramenta-item-content">
          <span class="ferramenta-icon">📖</span>
          <div class="ferramenta-info">
            <strong>Bible App (YouVersion)</strong>
            <span>A Bíblia no seu bolso. Siga a Comunidade Vitral.</span>
          </div>
        </div>
        <a class="ferramenta-link" href="https://www.bible.com/organizations/79172d03-a943-4051-aebf-285b525546f1" target="_blank" rel="noopener noreferrer">Baixar</a>
      </div>
      <div class="ferramenta-item">
        <div class="ferramenta-item-content">
          <span class="ferramenta-icon">🙏</span>
          <div class="ferramenta-info">
            <strong>Lectio 365</strong>
            <span>Devocional diário em português. Ore com a Bíblia.</span>
          </div>
        </div>
        <a class="ferramenta-link" href="https://lectio365.com/pt-br/o-aplicativo/" target="_blank" rel="noopener noreferrer">Baixar</a>
      </div>
      <div class="ferramenta-item">
        <div class="ferramenta-item-content">
          <span class="ferramenta-icon">🎙️</span>
          <div class="ferramenta-info">
            <strong>Vitral no Spotify</strong>
            <span>Podcast da Comunidade Vitral para sua jornada.</span>
          </div>
        </div>
        <a class="ferramenta-link" href="https://open.spotify.com/show/1prjsrcxPho9otrP1VUWT4" target="_blank" rel="noopener noreferrer">Ouvir</a>
      </div>
    </div>
  </div>
</div>`;
}

function renderOuca() {
  return `
<div class="step-section">
  ${renderSectionHeader('🎧', 'Ouça')}
  <div class="step-section-content">
    <div class="ouca-placeholder"><p>Em breve</p></div>
  </div>
</div>`;
}

function renderAprofunde() {
  return `
<div class="step-section">
  ${renderSectionHeader('📚', 'Aprofunde')}
  <div class="step-section-content">
    <div class="aprofunde-list">
      <div class="aprofunde-item">
        <div class="aprofunde-item-content">
          <span class="aprofunde-item-icon">📖</span>
          <div class="aprofunde-item-info">
            <strong>Livro Sugerido</strong>
            <span>Em breve</span>
          </div>
        </div>
        <span class="aprofunde-link is-empty">Em breve</span>
      </div>
      <div class="aprofunde-item">
        <div class="aprofunde-item-content">
          <span class="aprofunde-item-icon">🎵</span>
          <div class="aprofunde-item-info">
            <strong>Música Sugerida</strong>
            <span>Em breve</span>
          </div>
        </div>
        <span class="aprofunde-link is-empty">Em breve</span>
      </div>
    </div>
  </div>
</div>`;
}

function renderPratique(passo) {
  return `
<div class="step-section">
  ${renderSectionHeader('🎯', 'Pratique')}
  <div class="step-section-content">
    <div class="pratique-experimento">
      <strong class="pratique-label">Praticar</strong>
      <p>${passo.pratique.experimento}</p>
    </div>
    <div class="pratique-pergunta">
      <strong>Pergunta da semana</strong>
      <p>${passo.pratique.pergunta}</p>
    </div>
  </div>
</div>`;
}

function renderOrganizese(passo) {
  const diasCompletos = { Seg: 'Segunda-feira', Ter: 'Terça-feira', Qua: 'Quarta-feira', Qui: 'Quinta-feira', Sex: 'Sexta-feira', Sáb: 'Sábado', Dom: 'Domingo' };
  let html = `
<div class="step-section">
  ${renderSectionHeader('📋', 'Organize-se')}
  <div class="step-section-content">
    <p>${passo.organizese.introducao}</p>
    <div class="week-plan-grid">`;

  for (const dia of passo.organizese.dias) {
    const nomeCompleto = diasCompletos[dia.dia] || dia.dia;
    html += `
      <div class="week-day-card">
        <strong>${nomeCompleto}</strong>`;
    if (dia.texto) {
      html += `\n        <span>${dia.texto}</span>`;
    } else {
      html += `\n        <span class="day-empty">Em breve</span>`;
    }
    html += `
      </div>`;
  }

  html += `
    </div>
  </div>
</div>`;
  return html;
}

function renderStepNav(passoId) {
  const prev = passoId > 1 ? `<a href="passo-${passoId - 1}.html" class="step-nav-link">← ${passoId - 1}. Anterior</a>` : `<span class="step-nav-link disabled">← Anterior</span>`;
  const next = passoId < 9 ? `<a href="passo-${passoId + 1}.html" class="step-nav-link">${passoId + 1}. Próximo →</a>` : `<span class="step-nav-link disabled">Próximo →</span>`;

  return `
<div class="step-nav">
  ${prev}
  <a href="index.html" class="step-nav-link">Início</a>
  ${next}
</div>`;
}

function renderFooter() {
  return `
<footer class="site-footer" role="contentinfo">
  <div class="container footer-inner">
    <strong>Trilha de Novos</strong>
    <p>Comunidade Vitral · IPIB São José do Rio Preto</p>
  </div>
</footer>`;
}

function gerarPagina(passo) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR" data-etapa="1">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${passo.titulo} · Trilha de Novos</title>
  <meta name="description" content="${passo.resumo}" />
  <meta property="og:title" content="${passo.titulo} · Trilha de Novos" />
  <meta property="og:description" content="${passo.resumo}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ismaelmmachado.github.io/trilha_de_novos/passo-${passo.id}.html" />
  <meta name="twitter:card" content="summary" />
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/estilo.css" />
  <link rel="stylesheet" href="css/print.css" media="print" />
</head>
<body>
  <a class="skip-link" href="#main">Ir para o conteúdo</a>

  ${renderHeader()}

  ${renderBreadcrumb(passo.titulo)}

  <main id="main">
    ${renderPageHeader(passo)}

    <div class="content-container" id="passo-container">
      ${renderParaComecar(passo)}

      ${renderFerramentas()}

      ${renderOuca()}

      ${renderAprofunde()}

      ${renderPratique(passo)}

      ${renderOrganizese(passo)}

      ${renderStepNav(passo.id)}
    </div>
  </main>

  ${renderFooter()}
</body>
</html>`;

  const nomeArquivo = `passo-${passo.id}.html`;
  fs.writeFileSync(path.join(__dirname, '..', nomeArquivo), html, 'utf-8');
  console.log(`✓ Gerado: ${nomeArquivo}`);
}

passos.forEach(gerarPagina);
console.log(`\nConcluído! ${passos.length} páginas geradas em ${path.resolve(__dirname, '..')}`);
