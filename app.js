/**
 * APLICAÇÃO PRINCIPAL - DOSSIÊ ESCÂNDALOS PT (2003-2024)
 * Lógica de filtragem, renderização dinâmica, gráficos Chart.js e interatividade.
 */

// Estado Global da Aplicação
const appState = {
  scandals: [...SCANDALS_DATA],
  filteredScandals: [...SCANDALS_DATA],
  activeMandate: 'all',
  activeCategory: 'all',
  activeStatus: 'all',
  searchQuery: '',
  sortBy: 'year-desc',
  currentView: 'cards', // 'cards' | 'timeline' | 'table'
  charts: {
    mandates: null,
    categories: null,
    status: null
  }
};

// Formatação Monetária Abreviada em Português
function formatCurrencyBRL(val) {
  if (!val || val === 0) return 'R$ 0';
  if (val >= 1000000000) {
    return `R$ ${(val / 1000000000).toFixed(1).replace('.', ',')} Bilhões`;
  }
  if (val >= 1000000) {
    return `R$ ${(val / 1000000).toFixed(1).replace('.', ',')} Milhões`;
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

// Mapeamento de Cores por Mandato
function getMandateColor(mandateCode) {
  switch (mandateCode) {
    case 'lula1': return '#e11d48'; // Crimson
    case 'lula2': return '#fb7185'; // Light red
    case 'dilma1': return '#8b5cf6'; // Purple
    case 'dilma2': return '#a78bfa'; // Light purple
    case 'lula3': return '#f59e0b'; // Gold
    default: return '#3b82f6';
  }
}

// Mapeamento de Classe CSS por Status Judicial
function getStatusClass(status) {
  if (status.includes('Condenações')) return 'status-condenado';
  if (status.includes('Anulado')) return 'status-anulado';
  if (status.includes('Andamento')) return 'status-andamento';
  if (status.includes('Impeachment')) return 'status-impeachment';
  if (status.includes('Acordo')) return 'status-acordo';
  return 'status-arquivado';
}

// Inicialização Geral da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  initKPIs();
  initCharts();
  bindEventListeners();
  applyFiltersAndRender();
});

/* ==========================================================================
   KPIS / INDICADORES GLOBAIS
   ========================================================================== */
function initKPIs() {
  const container = document.getElementById('kpiContainer');
  if (!container) return;

  const totalCases = SCANDALS_DATA.length;
  const totalInvestigated = SCANDALS_DATA.reduce((acc, c) => acc + c.estimatedValue, 0);
  const totalRecovered = SCANDALS_DATA.reduce((acc, c) => acc + c.recoveredValue, 0);
  const pctRecovered = ((totalRecovered / totalInvestigated) * 100).toFixed(1);

  container.innerHTML = `
    <div class="kpi-card" style="--card-accent: var(--red-pt);">
      <div class="kpi-top">
        <span class="kpi-label">Casos Catalogados</span>
        <div class="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
      </div>
      <div class="kpi-value" id="kpiCount">${totalCases} Escândalos</div>
      <div class="kpi-meta">
        <strong>5 Mandatos</strong> presidenciais cobertos (2003–2024)
      </div>
    </div>

    <div class="kpi-card" style="--card-accent: #f87171;">
      <div class="kpi-top">
        <span class="kpi-label">Valores Investigados / Perdas</span>
        <div class="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
      </div>
      <div class="kpi-value" style="color: #fca5a5;">${formatCurrencyBRL(totalInvestigated)}</div>
      <div class="kpi-meta">
        Fraudes, rombos contábeis e propinas apuradas
      </div>
    </div>

    <div class="kpi-card" style="--card-accent: var(--emerald);">
      <div class="kpi-top">
        <span class="kpi-label">Recursos Recuperados / Pactuados</span>
        <div class="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
      <div class="kpi-value" style="color: #34d399;">${formatCurrencyBRL(totalRecovered)}</div>
      <div class="kpi-meta">
        <strong>${pctRecovered}% do total</strong> via delações e leniências
      </div>
    </div>

    <div class="kpi-card" style="--card-accent: var(--cyan);">
      <div class="kpi-top">
        <span class="kpi-label">Fontes & Redirecionamentos</span>
        <div class="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </div>
      </div>
      <div class="kpi-value">${APP_METRICS.sourcesCount}+ Links</div>
      <div class="kpi-meta">
        G1, Folha, Estadão, UOL, STF e TCU auditados
      </div>
    </div>
  `;
}

/* ==========================================================================
   GRÁFICOS CHART.JS
   ========================================================================== */
function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Configuração Global Padrão de Estilos do Chart.js
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(19, 27, 46, 0.95)';
  Chart.defaults.plugins.tooltip.titleColor = '#fff';
  Chart.defaults.plugins.tooltip.bodyColor = '#cbd5e1';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.15)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.boxPadding = 6;

  // 1. Gráfico de Mandatos (Bar Chart)
  const ctxMandates = document.getElementById('mandatesChart')?.getContext('2d');
  if (ctxMandates) {
    const mandatesMap = {
      'Lula 1 (2003-06)': SCANDALS_DATA.filter(s => s.mandateCode === 'lula1').length,
      'Lula 2 (2007-10)': SCANDALS_DATA.filter(s => s.mandateCode === 'lula2').length,
      'Dilma 1 (2011-14)': SCANDALS_DATA.filter(s => s.mandateCode === 'dilma1').length,
      'Dilma 2 (2015-16)': SCANDALS_DATA.filter(s => s.mandateCode === 'dilma2').length,
      'Lula 3 (2023-24)': SCANDALS_DATA.filter(s => s.mandateCode === 'lula3').length,
    };

    appState.charts.mandates = new Chart(ctxMandates, {
      type: 'bar',
      data: {
        labels: Object.keys(mandatesMap),
        datasets: [{
          label: 'Quantidade de Casos',
          data: Object.values(mandatesMap),
          backgroundColor: [
            'rgba(225, 29, 72, 0.75)',
            'rgba(251, 113, 133, 0.75)',
            'rgba(139, 92, 246, 0.75)',
            'rgba(167, 139, 250, 0.75)',
            'rgba(245, 158, 11, 0.75)'
          ],
          borderColor: [
            '#e11d48',
            '#fb7185',
            '#8b5cf6',
            '#a78bfa',
            '#f59e0b'
          ],
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Gráfico de Categorias / Valores (Doughnut Chart)
  const ctxCategories = document.getElementById('categoriesChart')?.getContext('2d');
  if (ctxCategories) {
    const categoriesMap = {};
    SCANDALS_DATA.forEach(s => {
      categoriesMap[s.category] = (categoriesMap[s.category] || 0) + s.estimatedValue;
    });

    const catLabels = Object.keys(categoriesMap);
    const catValues = Object.values(categoriesMap);

    appState.charts.categories = new Chart(ctxCategories, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catValues,
          backgroundColor: [
            '#e11d48',
            '#06b6d4',
            '#f59e0b',
            '#8b5cf6',
            '#10b981',
            '#3b82f6'
          ],
          borderColor: '#131b2e',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              font: { size: 10 },
              color: '#94a3b8',
              padding: 12
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw;
                return ` ${context.label}: ${formatCurrencyBRL(val)}`;
              }
            }
          }
        }
      }
    });
  }

  // 3. Gráfico de Situação no Judiciário (Polar / Horizontal Bar)
  const ctxStatus = document.getElementById('statusChart')?.getContext('2d');
  if (ctxStatus) {
    const statusMap = {};
    SCANDALS_DATA.forEach(s => {
      statusMap[s.judicialStatus] = (statusMap[s.judicialStatus] || 0) + 1;
    });

    appState.charts.status = new Chart(ctxStatus, {
      type: 'bar',
      data: {
        labels: Object.keys(statusMap),
        datasets: [{
          data: Object.values(statusMap),
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(217, 70, 239, 0.7)',
            'rgba(6, 182, 212, 0.7)',
            'rgba(148, 163, 184, 0.7)'
          ],
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 10.5 } }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   EVENT LISTENERS & BINDING
   ========================================================================== */
function bindEventListeners() {
  // Busca em tempo real com input
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = appState.searchQuery ? 'block' : 'none';
      }
      applyFiltersAndRender();
    });

    // Atalho de teclado para busca (tecla / ou Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        showToast('Busca ativada');
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      appState.searchQuery = '';
      searchClearBtn.style.display = 'none';
      applyFiltersAndRender();
      searchInput.focus();
    });
  }

  // Chips de Mandatos
  const mandateChips = document.querySelectorAll('#mandateChips .chip');
  mandateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      mandateChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeMandate = chip.dataset.mandate;
      applyFiltersAndRender();
    });
  });

  // Select de Categoria
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      appState.activeCategory = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Select de Status Judicial
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      appState.activeStatus = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Ordenação
  const sortBySelect = document.getElementById('sortBy');
  if (sortBySelect) {
    sortBySelect.addEventListener('change', (e) => {
      appState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Botão Limpar Filtros
  const btnReset = document.getElementById('btnResetFilters');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      resetAllFilters();
    });
  }

  // Alternador de Visualização (Modos de Exibição)
  const viewBtnCards = document.getElementById('viewBtnCards');
  const viewBtnTimeline = document.getElementById('viewBtnTimeline');
  const viewBtnTable = document.getElementById('viewBtnTable');

  viewBtnCards?.addEventListener('click', () => setViewMode('cards'));
  viewBtnTimeline?.addEventListener('click', () => setViewMode('timeline'));
  viewBtnTable?.addEventListener('click', () => setViewMode('table'));

  // Ordenação ao clicar no cabeçalho da Tabela
  const tableHeaders = document.querySelectorAll('#comparisonTable th[data-sort]');
  tableHeaders.forEach(th => {
    th.addEventListener('click', () => {
      const sortField = th.dataset.sort;
      if (sortField === 'year') {
        appState.sortBy = appState.sortBy === 'year-desc' ? 'year-asc' : 'year-desc';
      } else if (sortField === 'estimatedValue') {
        appState.sortBy = 'value-desc';
      } else if (sortField === 'recoveredValue') {
        appState.sortBy = 'recovered-desc';
      } else if (sortField === 'title') {
        appState.sortBy = 'title-asc';
      }
      document.getElementById('sortBy').value = appState.sortBy;
      applyFiltersAndRender();
      showToast(`Tabela reordenada por ${th.innerText}`);
    });
  });

  // Modal Close Handlers
  const modal = document.getElementById('dossierModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseFooterBtn = document.getElementById('modalCloseFooterBtn');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalCloseFooterBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Botões de Ações no Header (Exportar / Imprimir)
  document.getElementById('btnExportCsv')?.addEventListener('click', exportToCSV);
  document.getElementById('btnExportJson')?.addEventListener('click', exportToJSON);
  document.getElementById('btnPrintReport')?.addEventListener('click', () => window.print());
}

/* ==========================================================================
   FILTRAGEM, ORDENAÇÃO E DISPATCH
   ========================================================================== */
function applyFiltersAndRender() {
  let list = [...SCANDALS_DATA];

  // 1. Filtro por Mandato
  if (appState.activeMandate !== 'all') {
    list = list.filter(item => item.mandateCode === appState.activeMandate);
  }

  // 2. Filtro por Categoria
  if (appState.activeCategory !== 'all') {
    list = list.filter(item => item.category === appState.activeCategory);
  }

  // 3. Filtro por Status Judicial
  if (appState.activeStatus !== 'all') {
    list = list.filter(item => item.judicialStatus === appState.activeStatus);
  }

  // 4. Busca por Texto (Busca livre profunda)
  if (appState.searchQuery) {
    const q = appState.searchQuery;
    list = list.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchModus = item.modusOperandi.toLowerCase().includes(q);
      const matchJudicial = item.judicialDetails.toLowerCase().includes(q);
      const matchFigures = item.keyFigures.some(f => f.toLowerCase().includes(q));
      const matchEntities = item.entities.some(e => e.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchSummary || matchModus || matchJudicial || matchFigures || matchEntities;
    });
  }

  // 5. Ordenação
  list.sort((a, b) => {
    switch (appState.sortBy) {
      case 'year-desc':
        return b.year - a.year || b.estimatedValue - a.estimatedValue;
      case 'year-asc':
        return a.year - b.year || b.estimatedValue - a.estimatedValue;
      case 'value-desc':
        return b.estimatedValue - a.estimatedValue;
      case 'recovered-desc':
        return b.recoveredValue - a.recoveredValue;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return b.year - a.year;
    }
  });

  appState.filteredScandals = list;

  // Atualiza indicadores de texto de resultados
  updateResultsCount(list.length);

  // Renderiza a visão ativa
  renderActiveView();
}

function updateResultsCount(count) {
  const countEl = document.getElementById('resultsCount');
  const noResultsEl = document.getElementById('noResultsState');
  const activeFiltersHint = document.getElementById('activeFiltersHint');

  if (countEl) {
    countEl.innerHTML = `Exibindo <strong>${count}</strong> de <strong>${SCANDALS_DATA.length}</strong> escândalos catalogados`;
  }

  if (noResultsEl) {
    noResultsEl.style.display = count === 0 ? 'block' : 'none';
  }

  // Monta hint de filtros ativos
  const activeFilters = [];
  if (appState.activeMandate !== 'all') activeFilters.push(`Mandato: ${appState.activeMandate.toUpperCase()}`);
  if (appState.activeCategory !== 'all') activeFilters.push(appState.activeCategory);
  if (appState.activeStatus !== 'all') activeFilters.push(appState.activeStatus);
  if (appState.searchQuery) activeFilters.push(`Termo: "${appState.searchQuery}"`);

  if (activeFiltersHint) {
    activeFiltersHint.textContent = activeFilters.length ? `[Filtros ativos: ${activeFilters.join(', ')}]` : '';
  }
}

function resetAllFilters() {
  appState.activeMandate = 'all';
  appState.activeCategory = 'all';
  appState.activeStatus = 'all';
  appState.searchQuery = '';
  appState.sortBy = 'year-desc';

  // Reseta elementos DOM
  document.querySelectorAll('#mandateChips .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#mandateChips .chip[data-mandate="all"]')?.classList.add('active');

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const searchClearBtn = document.getElementById('searchClearBtn');
  if (searchClearBtn) searchClearBtn.style.display = 'none';

  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) categoryFilter.value = 'all';

  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) statusFilter.value = 'all';

  const sortBy = document.getElementById('sortBy');
  if (sortBy) sortBy.value = 'year-desc';

  applyFiltersAndRender();
  showToast('Todos os filtros foram redefinidos');
}

/* ==========================================================================
   RENDERIZAÇÃO DOS MODOS DE VISUALIZAÇÃO
   ========================================================================== */
function setViewMode(mode) {
  appState.currentView = mode;

  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  if (mode === 'cards') document.getElementById('viewBtnCards')?.classList.add('active');
  if (mode === 'timeline') document.getElementById('viewBtnTimeline')?.classList.add('active');
  if (mode === 'table') document.getElementById('viewBtnTable')?.classList.add('active');

  const gridEl = document.getElementById('scandalsGrid');
  const timelineEl = document.getElementById('timelineContainer');
  const tableEl = document.getElementById('tableContainer');

  if (gridEl) gridEl.style.display = mode === 'cards' ? 'grid' : 'none';
  if (timelineEl) timelineEl.style.display = mode === 'timeline' ? 'block' : 'none';
  if (tableEl) tableEl.style.display = mode === 'table' ? 'block' : 'none';

  renderActiveView();
}

function renderActiveView() {
  if (appState.currentView === 'cards') {
    renderCardsView();
  } else if (appState.currentView === 'timeline') {
    renderTimelineView();
  } else if (appState.currentView === 'table') {
    renderTableView();
  }
}

/* 1. VISÃO EM CARTÕES (CARDS) */
function renderCardsView() {
  const container = document.getElementById('scandalsGrid');
  if (!container) return;

  if (appState.filteredScandals.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = appState.filteredScandals.map(item => {
    const statusClass = getStatusClass(item.judicialStatus);
    const figuresSnippet = item.keyFigures.slice(0, 3).map(f => `<span class="figure-tag">${f}</span>`).join('');
    const firstSource = item.sources[0];

    return `
      <article class="scandal-card" data-id="${item.id}">
        <div class="scandal-card-header">
          <span class="badge-mandate ${item.mandateCode}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ${item.year} • ${item.mandate}
          </span>
          <span class="badge-status ${statusClass}">${item.judicialStatus}</span>
        </div>

        <h3 class="scandal-card-title">${item.title}</h3>
        <p class="scandal-card-subtitle">${item.subtitle}</p>

        <div class="scandal-values-box">
          <div class="scandal-val-row">
            <span class="val-label">Valor Investigado:</span>
            <span class="val-num-investigated">${formatCurrencyBRL(item.estimatedValue)}</span>
          </div>
          <div class="scandal-val-row">
            <span class="val-label">Recuperado / Restituído:</span>
            <span class="val-num-recovered">${formatCurrencyBRL(item.recoveredValue)}</span>
          </div>
        </div>

        <p class="scandal-card-summary">${item.summary}</p>

        <div class="scandal-figures-tags">
          ${figuresSnippet}
          ${item.keyFigures.length > 3 ? `<span class="figure-tag">+${item.keyFigures.length - 3}</span>` : ''}
        </div>

        <div class="scandal-card-footer">
          <span class="sources-count-badge" title="Fontes jornalísticas e oficiais catalogadas">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            ${item.sources.length} Fontes
          </span>

          <div style="display: flex; gap: 0.4rem;">
            ${firstSource ? `
              <a href="${firstSource.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Abrir notícia original: ${firstSource.name}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Fonte
              </a>
            ` : ''}
            
            <button class="btn btn-primary btn-sm" onclick="app.openDossierModal('${item.id}')">
              Dossiê Completo
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* 2. VISÃO EM LINHA DO TEMPO (TIMELINE) */
function renderTimelineView() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  if (appState.filteredScandals.length === 0) {
    container.innerHTML = '';
    return;
  }

  // Ordena por ano na linha do tempo
  const timelineData = [...appState.filteredScandals].sort((a, b) => a.year - b.year);

  container.innerHTML = timelineData.map(item => {
    const statusClass = getStatusClass(item.judicialStatus);

    return `
      <div class="timeline-item" data-id="${item.id}">
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span class="timeline-year-tag">${item.year}</span>
              <span class="badge-mandate ${item.mandateCode}" style="margin-left: 0.5rem;">${item.mandate}</span>
            </div>
            <span class="badge-status ${statusClass}">${item.judicialStatus}</span>
          </div>

          <h3 class="scandal-card-title">${item.title}</h3>
          <p class="scandal-card-subtitle" style="margin-bottom: 0.8rem;">${item.subtitle}</p>

          <p class="scandal-card-summary" style="-webkit-line-clamp: 2;">${item.summary}</p>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 0.8rem;">
            <div style="font-size: 0.82rem; font-family: var(--font-mono); color: #fca5a5;">
              Valor apurado: <strong>${formatCurrencyBRL(item.estimatedValue)}</strong>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="app.openDossierModal('${item.id}')">
              Ver Dossiê e Fontes (${item.sources.length})
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* 3. VISÃO EM TABELA COMPARATIVA */
function renderTableView() {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;

  if (appState.filteredScandals.length === 0) {
    tbody.innerHTML = '';
    return;
  }

  tbody.innerHTML = appState.filteredScandals.map(item => {
    const statusClass = getStatusClass(item.judicialStatus);

    return `
      <tr data-id="${item.id}">
        <td>
          <span style="font-weight: 700; color: #fff;">${item.year}</span>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${item.mandate.split(' ')[0]}</div>
        </td>
        <td>
          <div class="table-title-cell">${item.title}</div>
          <div class="table-subtitle-cell">${item.subtitle}</div>
        </td>
        <td>
          <span class="figure-tag">${item.category}</span>
        </td>
        <td style="font-family: var(--font-mono); color: #fca5a5; font-weight: 600;">
          ${formatCurrencyBRL(item.estimatedValue)}
        </td>
        <td style="font-family: var(--font-mono); color: #34d399; font-weight: 600;">
          ${formatCurrencyBRL(item.recoveredValue)}
        </td>
        <td>
          <span class="badge-status ${statusClass}">${item.judicialStatus}</span>
        </td>
        <td>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-primary btn-sm" onclick="app.openDossierModal('${item.id}')" title="Ver detalhes completos">
              Dossiê
            </button>
            ${item.sources[0] ? `
              <a href="${item.sources[0].url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Acessar ${item.sources[0].name}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   MODAL DE DOSSIÊ COMPLETO E REDIRECIONAMENTOS DE FONTES
   ========================================================================= */
function openDossierModal(scandalId) {
  const item = SCANDALS_DATA.find(s => s.id === scandalId);
  if (!item) return;

  const modal = document.getElementById('dossierModal');
  const metaChips = document.getElementById('modalMetaChips');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const statYear = document.getElementById('modalStatYear');
  const statInvestigated = document.getElementById('modalStatInvestigated');
  const statRecovered = document.getElementById('modalStatRecovered');
  const statEntities = document.getElementById('modalStatEntities');
  const summaryText = document.getElementById('modalSummaryText');
  const modusText = document.getElementById('modalModusText');
  const figuresTags = document.getElementById('modalFiguresTags');
  const judicialText = document.getElementById('modalJudicialText');
  const sourcesList = document.getElementById('modalSourcesList');

  // Metadados e Cabeçalho
  const statusClass = getStatusClass(item.judicialStatus);
  metaChips.innerHTML = `
    <span class="badge-mandate ${item.mandateCode}">${item.mandate}</span>
    <span class="badge-status ${statusClass}">${item.judicialStatus}</span>
    <span class="figure-tag" style="background: rgba(6, 182, 212, 0.15); color: #67e8f9; border-color: rgba(6, 182, 212, 0.3);">
      ${item.category}
    </span>
  `;

  title.textContent = item.title;
  subtitle.textContent = item.subtitle;

  // Grade de Métricas
  statYear.textContent = item.year;
  statInvestigated.textContent = item.valueFormatted || formatCurrencyBRL(item.estimatedValue);
  statRecovered.textContent = item.recoveredFormatted || formatCurrencyBRL(item.recoveredValue);
  statEntities.textContent = item.entities.join(', ');

  // Textos explicativos
  summaryText.textContent = item.summary;
  modusText.textContent = item.modusOperandi;
  judicialText.textContent = item.judicialDetails;

  // Figuras citadas
  figuresTags.innerHTML = item.keyFigures.map(fig => `
    <span class="figure-tag" style="font-size: 0.8rem; padding: 4px 9px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: middle;">
        <circle cx="12" cy="7" r="4"/>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      </svg>
      ${fig}
    </span>
  `).join('');

  // Fontes com redirecionamento direto
  sourcesList.innerHTML = item.sources.map(src => `
    <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-item" title="Abrir link externo em nova aba">
      <div class="source-info">
        <span class="source-name">${src.name}</span>
        <span class="source-type">${src.type} • Clique para ler a reportagem/documento</span>
      </div>
      <svg class="source-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>
  `).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   EXPORTAÇÃO DE DADOS (CSV E JSON)
   ========================================================================== */
function exportToCSV() {
  const data = appState.filteredScandals;
  if (!data.length) {
    showToast('Nenhum dado para exportar');
    return;
  }

  const headers = [
    'Ano',
    'Mandato',
    'Título',
    'Subtítulo',
    'Categoria',
    'Valor Investigado (R$)',
    'Valor Recuperado (R$)',
    'Status Judicial',
    'Figuras Principais',
    'Órgãos Envolvidos',
    'Resumo Histórico',
    'Fontes Citadas (URLs)'
  ];

  const rows = data.map(item => [
    `"${item.year}"`,
    `"${item.mandate}"`,
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.subtitle.replace(/"/g, '""')}"`,
    `"${item.category}"`,
    `"${item.estimatedValue}"`,
    `"${item.recoveredValue}"`,
    `"${item.judicialStatus}"`,
    `"${item.keyFigures.join('; ').replace(/"/g, '""')}"`,
    `"${item.entities.join('; ').replace(/"/g, '""')}"`,
    `"${item.summary.replace(/"/g, '""')}"`,
    `"${item.sources.map(s => `${s.name}: ${s.url}`).join(' | ').replace(/"/g, '""')}"`
  ]);

  // Adiciona BOM (\uFEFF) para compatibilidade perfeita com Excel em UTF-8
  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `dossie_escandalos_pt_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Planilha CSV exportada com ${data.length} registros`);
}

function exportToJSON() {
  const data = appState.filteredScandals;
  if (!data.length) {
    showToast('Nenhum dado para exportar');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `dossie_escandalos_pt_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Arquivo JSON exportado com ${data.length} registros`);
}

/* ==========================================================================
   FEEDBACK VIA TOAST
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--cyan);">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Expõe métodos para chamadas inline seguras no HTML
window.app = {
  openDossierModal,
  resetAllFilters,
  exportToCSV,
  exportToJSON
};
