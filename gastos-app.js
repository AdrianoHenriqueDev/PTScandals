/**
 * APLICAÇÃO DA DASHBOARD DE GASTOS DO GOVERNO ATUAL & ESTATAIS (LULA 3)
 * Lógica de gráficos Chart.js, filtragem dinâmica e modais detalhados.
 */

const gastosState = {
  activeType: 'all', // 'all' | 'estatais' | 'viagens' | 'luxos'
  searchQuery: '',
  charts: {
    estatais: null,
    viagens: null,
    correios: null
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initGastosCharts();
  bindGastosEvents();
  renderGastosGrid();
});

/* ==========================================================================
   GRÁFICOS CHART.JS ESPECÍFICOS PARA GASTOS & ESTATAIS
   ========================================================================== */
function initGastosCharts() {
  if (typeof Chart === 'undefined') return;

  // 1. Gráfico de Evolução Histórica das Estatais (2018–2026)
  const ctxEstatais = document.getElementById('estataisChart')?.getContext('2d');
  if (ctxEstatais) {
    gastosState.charts.estatais = new Chart(ctxEstatais, {
      type: 'bar',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026 (Acum.)'],
        datasets: [{
          label: 'Resultado Primário (R$ Bilhões)',
          data: [0.5, 0.8, -0.6, 2.8, 4.8, -0.65, -6.73, -7.85, -8.40],
          backgroundColor: [
            'rgba(16, 185, 129, 0.6)',
            'rgba(16, 185, 129, 0.6)',
            'rgba(239, 68, 68, 0.6)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(16, 185, 129, 0.9)', // 2022 Superávit
            'rgba(239, 68, 68, 0.7)',  // 2023 Déficit
            'rgba(225, 29, 72, 0.85)', // 2024
            'rgba(225, 29, 72, 0.9)',  // 2025
            'rgba(190, 18, 60, 0.95)'  // 2026 Rombo Recorde
          ],
          borderColor: [
            '#10b981',
            '#10b981',
            '#ef4444',
            '#10b981',
            '#10b981',
            '#ef4444',
            '#e11d48',
            '#e11d48',
            '#be123c'
          ],
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                const val = ctx.raw;
                return val >= 0 
                  ? ` Superávit: R$ ${val.toFixed(2)} Bi` 
                  : ` Déficit: R$ ${val.toFixed(2)} Bi`;
              }
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              callback: value => `${value} Bi`
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Gráfico de Custos de Viagens Internacionais da Presidência (2023–2026)
  const ctxViagens = document.getElementById('viagensChart')?.getContext('2d');
  if (ctxViagens) {
    gastosState.charts.viagens = new Chart(ctxViagens, {
      type: 'bar',
      data: {
        labels: ['Nova York (ONU)', 'COP30 (Navios/Belém)', 'Dubai (COP28)', 'Pequim (China)', 'Londres (Rei)'],
        datasets: [{
          label: 'Custo Total Estimado (R$ Milhões)',
          data: [22.8, 18.5, 9.2, 6.5, 3.1],
          backgroundColor: 'rgba(6, 182, 212, 0.75)',
          borderColor: '#06b6d4',
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` Total: R$ ${ctx.raw.toFixed(1)} Milhões`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { callback: v => `R$ ${v}M` }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 3. Gráfico dos Correios: Lucro vs Prejuízo (2021–2026)
  const ctxCorreios = document.getElementById('correiosChart')?.getContext('2d');
  if (ctxCorreios) {
    gastosState.charts.correios = new Chart(ctxCorreios, {
      type: 'bar',
      data: {
        labels: ['2021', '2022', '2023', '2024', '2025', '2026 (Acum.)'],
        datasets: [{
          label: 'Resultado Líquido (R$ Bilhões)',
          data: [2.3, 1.53, -0.597, -1.8, -2.1, -1.9],
          backgroundColor: [
            'rgba(16, 185, 129, 0.75)',
            'rgba(16, 185, 129, 0.75)',
            'rgba(239, 68, 68, 0.75)',
            'rgba(225, 29, 72, 0.85)',
            'rgba(225, 29, 72, 0.9)',
            'rgba(190, 18, 60, 0.95)'
          ],
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ctx.raw >= 0 ? ` Lucro: R$ ${ctx.raw} Bi` : ` Prejuízo: R$ ${ctx.raw} Bi`
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { callback: v => `${v} Bi` }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function bindGastosEvents() {
  const searchInput = document.getElementById('gastosSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      gastosState.searchQuery = e.target.value.trim().toLowerCase();
      renderGastosGrid();
    });
  }

  const chips = document.querySelectorAll('#gastosFilterChips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      gastosState.activeType = chip.dataset.type;
      renderGastosGrid();
    });
  });

  // Modal close handlers
  const modal = document.getElementById('gastosModal');
  const closeBtn = document.getElementById('gastosModalCloseBtn');
  const closeFooterBtn = document.getElementById('gastosModalCloseFooterBtn');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  closeFooterBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Export CSV e Print
  document.getElementById('btnExportGastosCsv')?.addEventListener('click', exportGastosCSV);
  document.getElementById('btnPrintGastosReport')?.addEventListener('click', () => window.print());
}

/* ==========================================================================
   RENDERIZAÇÃO DA GRADE DE CARDS
   ========================================================================== */
function renderGastosGrid() {
  const container = document.getElementById('gastosGrid');
  const countEl = document.getElementById('gastosResultsCount');
  if (!container) return;

  const items = getFilteredGastosItems();

  if (countEl) {
    countEl.innerHTML = `Exibindo <strong>${items.length}</strong> registros catalogados`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p>Nenhum registro encontrado para os termos buscados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    if (item.type === 'estatais') {
      return renderEstatalCard(item);
    } else if (item.type === 'viagens') {
      return renderViagemCard(item);
    } else {
      return renderLuxoCard(item);
    }
  }).join('');
}

function getFilteredGastosItems() {
  let list = [];

  if (gastosState.activeType === 'all' || gastosState.activeType === 'estatais') {
    list.push(...GASTOS_DATA.estatais.map(e => ({ ...e, type: 'estatais' })));
  }
  if (gastosState.activeType === 'all' || gastosState.activeType === 'viagens') {
    list.push(...GASTOS_DATA.viagens.map(v => ({ ...v, type: 'viagens' })));
  }
  if (gastosState.activeType === 'all' || gastosState.activeType === 'luxos') {
    list.push(...GASTOS_DATA.luxos.map(l => ({ ...l, type: 'luxos' })));
  }

  if (gastosState.searchQuery) {
    const q = gastosState.searchQuery;
    list = list.filter(item => {
      const name = (item.name || item.destination || item.item || '').toLowerCase();
      const sub = (item.event || item.sector || item.supplier || '').toLowerCase();
      const summary = (item.summary || item.details || '').toLowerCase();
      const causes = (item.causes || '').toLowerCase();
      return name.includes(q) || sub.includes(q) || summary.includes(q) || causes.includes(q);
    });
  }

  return list;
}

/* Card de Estatais */
function renderEstatalCard(item) {
  const isNegative = item.result2024 < 0;
  const statusBadge = isNegative ? 'badge-deficit' : 'badge-superavit';

  return `
    <article class="scandal-card">
      <div class="scandal-card-header">
        <span class="badge-mandate lula3">
          ${item.sector}
        </span>
        <span class="${statusBadge}">${item.status}</span>
      </div>

      <h3 class="scandal-card-title">${item.name}</h3>
      <p class="scandal-card-subtitle">${item.tendency}</p>

      <div class="scandal-values-box">
        <div class="scandal-val-row">
          <span class="val-label">Resultado 2022 (Superávit Anterior):</span>
          <span style="font-family: var(--font-mono); color: #34d399; font-weight: 700;">
            ${item.result2022 >= 0 ? '+' : ''}${formatValBRL(item.result2022)}
          </span>
        </div>
        <div class="scandal-val-row">
          <span class="val-label">Situação Recente (2024–2026):</span>
          <span style="font-family: var(--font-mono); color: ${isNegative ? '#fca5a5' : '#34d399'}; font-weight: 700;">
            ${item.resultFormatted2026 || item.resultFormatted2024}
          </span>
        </div>
      </div>

      <p class="scandal-card-summary">${item.summary}</p>

      <div class="defense-box">
        <strong>Posição do Governo (MGI / Planalto):</strong>
        ${item.defenseGov}
      </div>

      <div class="scandal-card-footer" style="margin-top: 1rem;">
        <span class="sources-count-badge">
          ${item.sources.length} Fontes Oficiais
        </span>
        <button class="btn btn-primary btn-sm" onclick="gastosApp.openModal('${item.id}', 'estatais')">
          Ver Dossiê e Fontes
        </button>
      </div>
    </article>
  `;
}

/* Card de Viagens Internacionais */
function renderViagemCard(item) {
  return `
    <article class="scandal-card">
      <div class="scandal-card-header">
        <span class="badge-mandate lula3">
          ${item.date}
        </span>
        <span class="badge-luxury">Viagem Diplomática</span>
      </div>

      <h3 class="scandal-card-title">${item.destination}</h3>
      <p class="scandal-card-subtitle">${item.event}</p>

      <div class="scandal-values-box">
        <div class="scandal-val-row">
          <span class="val-label">Custo Total da Viagem:</span>
          <span style="font-family: var(--font-mono); color: #fca5a5; font-weight: 700;">${item.totalCostFormatted}</span>
        </div>
        <div class="scandal-val-row">
          <span class="val-label">Hospedagem de Alto Luxo:</span>
          <span style="font-family: var(--font-mono); color: #fcd34d; font-weight: 700;">${item.hotelCostFormatted}</span>
        </div>
      </div>

      <div style="margin-bottom: 0.8rem;">
        <span class="hotel-tag">${item.hotel}</span>
      </div>

      <p class="scandal-card-summary">${item.details}</p>

      <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.8rem;">
        <strong>Comitiva:</strong> ${item.delegationSize}
      </div>

      <div class="scandal-card-footer">
        <span class="sources-count-badge">
          ${item.sources.length} Fontes de Imprensa
        </span>
        <button class="btn btn-primary btn-sm" onclick="gastosApp.openModal('${item.id}', 'viagens')">
          Ver Detalhes e Contas
        </button>
      </div>
    </article>
  `;
}

/* Card de Móveis de Luxo e Alvorada */
function renderLuxoCard(item) {
  return `
    <article class="scandal-card">
      <div class="scandal-card-header">
        <span class="badge-mandate lula3">
          ${item.destination}
        </span>
        <span class="badge-luxury">${item.modality}</span>
      </div>

      <h3 class="scandal-card-title">${item.item}</h3>
      <p class="scandal-card-subtitle">${item.supplier}</p>

      <div class="scandal-values-box">
        <div class="scandal-val-row">
          <span class="val-label">Valor do Item / Aquisição:</span>
          <span style="font-family: var(--font-mono); color: #fcd34d; font-weight: 700;">${item.costFormatted}</span>
        </div>
      </div>

      <p class="scandal-card-summary">${item.details}</p>

      <div class="scandal-card-footer" style="margin-top: 1.2rem;">
        <span class="sources-count-badge">
          ${item.sources.length} Fontes Catalogadas
        </span>
        <button class="btn btn-primary btn-sm" onclick="gastosApp.openModal('${item.id}', 'luxos')">
          Ver Dossiê e Fontes
        </button>
      </div>
    </article>
  `;
}

function formatValBRL(val) {
  if (Math.abs(val) >= 1000000000) {
    return `R$ ${(val / 1000000000).toFixed(1).replace('.', ',')} Bi`;
  }
  if (Math.abs(val) >= 1000000) {
    return `R$ ${(val / 1000000).toFixed(1).replace('.', ',')} Mi`;
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

/* ==========================================================================
   MODAL DE DETALHES
   ========================================================================== */
function openGastosModal(itemId, type) {
  let item = null;
  if (type === 'estatais') item = GASTOS_DATA.estatais.find(e => e.id === itemId);
  if (type === 'viagens') item = GASTOS_DATA.viagens.find(v => v.id === itemId);
  if (type === 'luxos') item = GASTOS_DATA.luxos.find(l => l.id === itemId);

  if (!item) return;

  const modal = document.getElementById('gastosModal');
  const title = document.getElementById('gastosModalTitle');
  const subtitle = document.getElementById('gastosModalSubtitle');
  const badges = document.getElementById('gastosModalBadges');
  const body = document.getElementById('gastosModalBody');

  title.textContent = item.name || item.destination || item.item;
  subtitle.textContent = item.sector || item.event || item.supplier;

  badges.innerHTML = `
    <span class="badge-mandate lula3">Governo Lula 3 (2023–2026)</span>
    <span class="badge-luxury">${type.toUpperCase()}</span>
  `;

  let bodyHtml = '';

  if (type === 'estatais') {
    bodyHtml = `
      <div class="modal-stats-grid">
        <div class="modal-stat-item">
          <span class="modal-stat-label">Situação Recente (2024–2026)</span>
          <span class="modal-stat-value" style="color: #fca5a5;">${item.resultFormatted2026 || item.resultFormatted2024}</span>
        </div>
        <div class="modal-stat-item">
          <span class="modal-stat-label">Resultado 2022 (Superávit)</span>
          <span class="modal-stat-value" style="color: #34d399;">${formatValBRL(item.result2022)}</span>
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Resumo do Desempenho</h4>
        <p class="modal-text">${item.summary}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Causas Apontadas por Auditores e Analistas</h4>
        <p class="modal-text">${item.causes}</p>
      </div>

      <div class="defense-box" style="margin-top: 0.5rem;">
        <strong>Contraponto e Defesa Oficial do Governo:</strong>
        ${item.defenseGov}
      </div>
    `;
  } else if (type === 'viagens') {
    bodyHtml = `
      <div class="modal-stats-grid">
        <div class="modal-stat-item">
          <span class="modal-stat-label">Custo Total da Viagem</span>
          <span class="modal-stat-value" style="color: #fca5a5;">${item.totalCostFormatted}</span>
        </div>
        <div class="modal-stat-item">
          <span class="modal-stat-label">Hotel 5 Estrelas</span>
          <span class="modal-stat-value" style="color: #fcd34d;">${item.hotelCostFormatted}</span>
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Hospedagem & Instalações</h4>
        <p class="modal-text"><strong>Hotel Escolhido:</strong> ${item.hotel}</p>
        <p class="modal-text"><strong>Comitiva Oficial:</strong> ${item.delegationSize}</p>
        <p class="modal-text" style="margin-top: 0.5rem;">${item.details}</p>
      </div>
    `;
  } else {
    bodyHtml = `
      <div class="modal-stats-grid">
        <div class="modal-stat-item">
          <span class="modal-stat-label">Valor do Item</span>
          <span class="modal-stat-value" style="color: #fcd34d;">${item.costFormatted}</span>
        </div>
        <div class="modal-stat-item">
          <span class="modal-stat-label">Modalidade de Compra</span>
          <span class="modal-stat-value" style="font-size: 0.95rem; color: #cbd5e1;">${item.modality}</span>
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Detalhamento da Aquisição</h4>
        <p class="modal-text">${item.details}</p>
      </div>
    `;
  }

  // Lista de Fontes com redirecionamento
  bodyHtml += `
    <div class="modal-section" style="margin-top: 1rem;">
      <h4 class="modal-section-title" style="color: var(--cyan);">Fontes Oficiais e Reportagens com Link Direto</h4>
      <div class="modal-sources-list">
        ${item.sources.map(src => `
          <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-item">
            <div class="source-info">
              <span class="source-name">${src.name}</span>
              <span class="source-type">${src.type} • Clique para acessar</span>
            </div>
            <svg class="source-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  body.innerHTML = bodyHtml;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   EXPORTAÇÃO CSV
   ========================================================================== */
function exportGastosCSV() {
  const items = getFilteredGastosItems();
  if (!items.length) return;

  const headers = ['Tipo', 'Identificador/Destino', 'Valor/Resultado', 'Detalhes/Resumo', 'Fontes'];
  const rows = items.map(item => [
    `"${item.type}"`,
    `"${(item.name || item.destination || item.item || '').replace(/"/g, '""')}"`,
    `"${(item.resultFormatted2024 || item.totalCostFormatted || item.costFormatted || '').replace(/"/g, '""')}"`,
    `"${(item.summary || item.details || '').replace(/"/g, '""')}"`,
    `"${item.sources.map(s => `${s.name}: ${s.url}`).join(' | ').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `gastos_governo_lula3_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Expõe métodos
window.gastosApp = {
  openModal: openGastosModal
};
