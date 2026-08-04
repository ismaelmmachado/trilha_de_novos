(function () {
  'use strict';

  var CONFIG = {
    repo: 'ismaelmmachado/trilha_de_novos',
    branch: 'main',
    pasta: 'docs/apostilas/pdf',
    cacheKey: 'apostilas_pdf_list_v1'
  };

  function normalize(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function buildTokenPattern(token) {
    var normalizado = normalize(token).trim();
    var comNumero = normalizado.match(/^([a-z]+)\s*[-_\s]?\s*(\d+)$/);
    if (comNumero) {
      var palavra = comNumero[1];
      var numero = comNumero[2];
      return new RegExp('(^|[^a-z0-9])' + palavra + '[^a-z0-9]{0,4}' + numero + '(?!\\d)', 'i');
    }
    return new RegExp(normalizado.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }

  function carregarDoCache() {
    try {
      var bruto = localStorage.getItem(CONFIG.cacheKey);
      if (!bruto) return null;
      var dado = JSON.parse(bruto);
      if (!dado || !dado.arquivos) return null;
      return dado.arquivos;
    } catch (e) {
      return null;
    }
  }

  function salvarNoCache(arquivos) {
    try {
      localStorage.setItem(CONFIG.cacheKey, JSON.stringify({ ts: Date.now(), arquivos: arquivos }));
    } catch (e) {
      /* cache indisponível — segue sem */
    }
  }

  function listarArquivos() {
    var url = 'https://api.github.com/repos/' + CONFIG.repo + '/contents/' + CONFIG.pasta + '?ref=' + CONFIG.branch;
    return fetch(url)
      .then(function (resposta) {
        if (resposta.status === 404) return [];
        if (!resposta.ok) throw new Error('api ' + resposta.status);
        return resposta.json();
      })
      .then(function (itens) {
        if (!Array.isArray(itens)) throw new Error('resposta invalida');
        var arquivos = itens.filter(function (item) {
          return item.type === 'file';
        }).map(function (item) {
          return item.name;
        });
        salvarNoCache(arquivos);
        return arquivos;
      })
      .catch(function () {
        var cache = carregarDoCache();
        if (cache) return cache;
        throw new Error('sem cache e sem rede');
      });
  }

  function escolherMatch(arquivos, padrao) {
    var matches = arquivos.filter(function (nome) {
      return padrao.test(normalize(nome));
    });
    if (matches.length === 0) return null;
    matches.sort(function (a, b) {
      return a.length - b.length;
    });
    return matches[0];
  }

  function montarBotao(botao, nomeArquivo) {
    if (!nomeArquivo) {
      botao.setAttribute('href', '#');
      botao.setAttribute('aria-busy', 'false');
      botao.classList.add('is-unavailable');
      botao.querySelector('.download-label').textContent = 'Apostila em breve';
      return;
    }
    botao.setAttribute('href', CONFIG.pasta + '/' + encodeURIComponent(nomeArquivo));
    botao.setAttribute('download', nomeArquivo);
    botao.setAttribute('aria-busy', 'false');
    botao.classList.remove('is-unavailable');
    botao.querySelector('.download-label').textContent = 'Baixar Apostila';
  }

  function tratarFalha(botoes) {
    botoes.forEach(function (botao) {
      botao.setAttribute('href', '#');
      botao.setAttribute('aria-busy', 'false');
      botao.classList.add('is-unavailable');
      botao.querySelector('.download-label').textContent = 'Não foi possível carregar. Tente novamente.';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var botoes = Array.prototype.slice.call(document.querySelectorAll('.apostila-btn[data-apostila-token]'));
    if (botoes.length === 0) return;

    botoes.forEach(function (botao) {
      botao.addEventListener('click', function (evento) {
        if (botao.getAttribute('href') === '#') evento.preventDefault();
      });
    });

    listarArquivos().then(function (arquivos) {
      botoes.forEach(function (botao) {
        var token = botao.getAttribute('data-apostila-token');
        montarBotao(botao, escolherMatch(arquivos, buildTokenPattern(token)));
      });
    }).catch(function () {
      tratarFalha(botoes);
    });
  });
})();
