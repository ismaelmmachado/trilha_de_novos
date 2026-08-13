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
      <a href="material-de-apoio.html">Material de Apoio</a>
    </nav>
  </div>
</header>

<header class="mobile-header" role="banner">
  <nav class="mobile-nav" role="navigation" aria-label="Navegação principal">
    <a href="index.html">Início</a>
    <a href="mapa.html">Mapa</a>
    <a href="material-de-apoio.html">Material de Apoio</a>
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

function inlineFormat(texto) {
  if (!texto) return texto;
  return String(texto)
    .replace(/### (.+)/g, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function deveRenderizar(passo, secao) {
  return !(passo.ocultar_secoes || []).includes(secao);
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
    <p>${inlineFormat(passo.para_comecar.texto)}</p>
    <p><strong>Pergunta para o diálogo:</strong> ${inlineFormat(passo.para_comecar.pergunta)}</p>
    <div class="para-comecar-footer">
      <a href="#" class="download-btn apostila-btn" data-apostila-token="${passo.pdf}" aria-busy="true">
        <span class="download-icon">↓</span>
        <span class="download-label">Carregando apostila…</span>
      </a>
    </div>
  </div>
</div>`;
}

function renderFerramentas(passo) {
  const ferramentas = passo.ferramentas || [];
  if (ferramentas.length === 0) {
    return `
<div class="step-section">
  ${renderSectionHeader('🛠️', 'Ferramentas')}
  <div class="step-section-content">
    <div class="ouca-placeholder"><p>Em breve</p></div>
  </div>
</div>`;
  }
  const itens = ferramentas.map(f => `
      <div class="ferramenta-item">
        <div class="ferramenta-item-content">
          <span class="ferramenta-icon">${f.icon || '🛠️'}</span>
          <div class="ferramenta-info">
            <strong>${f.nome}</strong>
            <span>${inlineFormat(f.descricao) || ''}</span>
          </div>
        </div>
        <a class="ferramenta-link" href="${f.link}" target="_blank" rel="noopener noreferrer">${f.rotulo || 'Abrir'}</a>
      </div>`).join('\n');

  return `
<div class="step-section">
  ${renderSectionHeader('🛠️', 'Ferramentas')}
  <div class="step-section-content">
    <p class="ferramentas-intro">Ferramentas que podem apoiar sua caminhada:</p>
    <div class="ferramentas-list">
${itens}
    </div>
  </div>
</div>`;
}

function renderOuca(passo) {
  const ouca = passo.ouca || {};
  if (ouca.tipo !== 'player' || !ouca.src) {
    return `
<div class="step-section">
  ${renderSectionHeader('🎧', 'Ouça')}
  <div class="step-section-content">
    <div class="ouca-placeholder"><p>Em breve</p></div>
  </div>
</div>`;
  }
  return `
<div class="step-section">
  ${renderSectionHeader('🎧', 'Ouça')}
  <div class="step-section-content">
    <div class="aprofunde-list">
      <div class="aprofunde-item">
        <div class="aprofunde-item-content">
          <span class="aprofunde-item-icon">🎧</span>
          <div class="aprofunde-item-info">
            <strong>${ouca.titulo || 'Ouça agora'}</strong>
            <span>${inlineFormat(ouca.descricao) || ''}</span>
          </div>
        </div>
        <a class="aprofunde-link" href="${ouca.src}" target="_blank" rel="noopener noreferrer">Ouvir</a>
      </div>
    </div>
  </div>
</div>`;
}

const APROFUNDE_TIPOS = {
  livro: { icon: '📖', rotulo: 'Abrir' },
  plano: { icon: '📖', rotulo: 'Abrir' },
  video: { icon: '🎬', rotulo: 'Assistir' },
  musica: { icon: '🎵', rotulo: 'Ouvir' },
  pdf: { icon: '📄', rotulo: 'Baixar' }
};

function renderAprofunde(passo) {
  const itensDados = passo.aprofunde || [];
  if (!Array.isArray(itensDados) || itensDados.length === 0) {
    return `
<div class="step-section">
  ${renderSectionHeader('📚', 'Aprofunde')}
  <div class="step-section-content">
    <div class="ouca-placeholder"><p>Em breve</p></div>
  </div>
</div>`;
  }
  const itens = itensDados.map((item) => {
    const tipo = APROFUNDE_TIPOS[item.tipo] || { icon: '🔗', rotulo: 'Abrir' };
    const icon = item.icon || tipo.icon;
    const rotulo = item.rotulo || tipo.rotulo;
    const link = item.link
      ? `<a class="aprofunde-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${rotulo}</a>`
      : `<span class="aprofunde-link is-empty">Em breve</span>`;
    return `
      <div class="aprofunde-item">
        <div class="aprofunde-item-content">
          <span class="aprofunde-item-icon">${icon}</span>
          <div class="aprofunde-item-info">
            <strong>${item.titulo}</strong>
            <span>${inlineFormat(item.descricao) || ''}</span>
          </div>
        </div>
        ${link}
      </div>`;
  }).join('');
  return `
<div class="step-section">
  ${renderSectionHeader('📚', 'Aprofunde')}
  <div class="step-section-content">
    <div class="aprofunde-list">
${itens}
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
      <p>${inlineFormat(passo.pratique.experimento)}</p>
    </div>
    <div class="pratique-pergunta">
      <strong>Pergunta da semana</strong>
      <p>${inlineFormat(passo.pratique.pergunta)}</p>
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
    <p>${inlineFormat(passo.organizese.introducao)}</p>
    <div class="week-plan-grid">`;

  for (const dia of passo.organizese.dias) {
    const nomeCompleto = diasCompletos[dia.dia] || dia.dia;
    html += `
      <div class="week-day-card">
        <strong>${nomeCompleto}</strong>`;
    if (dia.texto) {
      html += `\n        <span>${inlineFormat(dia.texto)}</span>`;
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
  <meta property="og:image" content="https://ismaelmmachado.github.io/trilha_de_novos/og-image.svg" />
  <meta name="twitter:card" content="summary" />
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" /></noscript>
  <link rel="stylesheet" href="css/tokens.css?v=2.29.0" />
  <link rel="stylesheet" href="css/estilo.css?v=2.29.0" />
  <link rel="stylesheet" href="css/print.css?v=2.29.0" media="print" />
</head>
<body>
  <a class="skip-link" href="#main">Ir para o conteúdo</a>

  ${renderHeader()}

  ${renderBreadcrumb(passo.titulo)}

  <main id="main">
    ${renderPageHeader(passo)}

    <div class="content-container" id="passo-container">
      ${renderParaComecar(passo)}

      ${deveRenderizar(passo, 'ferramentas') ? renderFerramentas(passo) : ''}

      ${deveRenderizar(passo, 'ouca') ? renderOuca(passo) : ''}

      ${renderAprofunde(passo)}

      ${renderPratique(passo)}

      ${renderOrganizese(passo)}

      ${renderStepNav(passo.id)}
    </div>
  </main>

  ${renderFooter()}

  <script src="scripts/apostilas.js"></script>
</body>
</html>`;

  const nomeArquivo = `passo-${passo.id}.html`;
  fs.writeFileSync(path.join(__dirname, '..', nomeArquivo), html, 'utf-8');
  console.log(`✓ Gerado: ${nomeArquivo}`);
}

passos.forEach(gerarPagina);
console.log(`\nConcluído! ${passos.length} páginas geradas em ${path.resolve(__dirname, '..')}`);
