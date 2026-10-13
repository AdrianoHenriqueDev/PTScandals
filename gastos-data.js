/**
 * Base de dados estruturada de Gastos do Governo Atual (Lula 3 / 2023-2026),
 * Viagens Internacionais, Bens de Luxo e Indicadores Fiscais das Estatais.
 * Fontes: Banco Central do Brasil, Tesouro Nacional, Portal da Transparência,
 * Poder360, G1, Folha de S.Paulo, O Estado de S. Paulo e Metrópoles.
 */

const GASTOS_DATA = {
  // 1. Resumo Consolidado de Indicadores (2023–2026)
  metrics: {
    estataisDeficitAcumuladoQuadrienio: 23630000000,
    estataisDeficitAcumuladoQuadrienioFormatted: "R$ 23,63 Bilhões (2023–2026)",
    
    estataisDeficit2026: 8400000000,
    estataisDeficit2026Formatted: "R$ 8,40 Bilhões (2026)",
    
    estataisDeficit2025: 7850000000,
    estataisDeficit2025Formatted: "R$ 7,85 Bilhões (2025)",
    
    estataisDeficit2024: 6730000000,
    estataisDeficit2024Formatted: "R$ 6,73 Bilhões (2024)",
    
    estataisDeficit2023: 656000000,
    estataisDeficit2023Formatted: "R$ 656 Milhões (2023)",
    
    estataisSuperavit2022: 4800000000,
    estataisSuperavit2022Formatted: "+ R$ 4,80 Bilhões (2022)",
    
    totalPassagensDiariasFederal: 9280000000,
    totalPassagensDiariasFederalFormatted: "R$ 9,28 Bilhões (2023–2026)",
    
    viagensPresidenciaisExterior: 145000000,
    viagensPresidenciaisExteriorFormatted: "R$ 145,0+ Milhões (2023–2026)",
    
    moveisDecoracaoLuxo: 4900000,
    moveisDecoracaoLuxoFormatted: "R$ 4,90 Milhões (2023–2026)"
  },

  // 2. Desempenho e Indicadores das Principais Estatais Federais (2022 a 2026)
  estatais: [
    {
      id: "estatais-geral",
      name: "Consolidado das Estatais Federais (Banco Central)",
      sector: "Setor Público Federal Consolidado",
      status: "Déficit Histórico Recorde",
      result2022: 4800000000,
      result2023: -656000000,
      result2024: -6730000000,
      result2025: -7850000000,
      result2026: -8400000000,
      resultFormatted2024: "Déficit de R$ 6,73 bi (2024)",
      resultFormatted2026: "Déficit acumulado de R$ 8,40 bi (2026)",
      tendency: "Deterioração Contínua no Quadriênio",
      summary: "Entre 2023 e 2026, as empresas estatais federais acumularam mais de R$ 23,6 bilhões em déficit primário segundo as séries oficiais do Banco Central. O resultado representa a mais profunda reversão fiscal da história do setor público empresarial brasileiro, saindo de superávit de R$ 4,8 bilhões em 2022 para déficits sucessivos recordes em 2024 (R$ 6,73 bi), 2025 (R$ 7,85 bi) e 2026 (R$ 8,40 bi).",
      causes: "Crescimento contínuo das despesas de custeio e pessoal, recomposição de estruturas administrativas, perda de competitividade dos Correios, retomada de compras subsidiadas e exaustão do caixa financeiro acumulado nos anos anteriores.",
      defenseGov: "O Ministério da Gestão e da Inovação (MGI) e o Ministério da Fazenda argumentam que o déficit primário não equivale a 'prejuízo corporativo', mas reflete o aumento planejado de investimentos públicos e modernização com consumo de caixa, além do papel social das estatais que transcende a lógica exclusiva de lucro.",
      sources: [
        { name: "Banco Central do Brasil - Séries Estatísticas de Política Fiscal (SGS)", url: "https://www.bcb.gov.br", type: "Oficial" },
        { name: "Poder360 - Rombo das estatais federais bate recorde sucessivo no governo Lula", url: "https://www.poder360.com.br/economia/estatais-fecham-com-maior-deficit-da-serie-historica-do-bc/", type: "Jornalístico" },
        { name: "G1 - Estatais acumulam déficits bilionários nas contas públicas", url: "https://g1.globo.com/economia/noticia/2024/09/estatais-registram-deficit-recorde-bc.ghtml", type: "Jornalístico" },
        { name: "Tesouro Nacional - Relatório Agregado das Empresas Estatais", url: "https://www.tesourotransparente.gov.br", type: "Oficial" }
      ]
    },
    {
      id: "correios",
      name: "Empresa Brasileira de Correios e Telégrafos (ECT)",
      sector: "Logística e Comunicações",
      status: "Prejuízo Crônico Bilionário",
      result2022: 1530000000,
      result2023: -597000000,
      result2024: -1800000000,
      result2025: -2100000000,
      result2026: -1900000000,
      resultFormatted2024: "Prejuízo de R$ 1,8 bilhão (2024)",
      resultFormatted2026: "Rombo acumulado supera R$ 6,3 bilhões (2023-2026)",
      tendency: "Retorno à Crise Estrutural",
      summary: "Após registrar lucros recordes de R$ 2,3 bilhões em 2021 e R$ 1,5 bilhão em 2022, os Correios voltaram ao prejuízo em 2023 (R$ 597 mi negativos), aprofundaram o rombo em 2024 (R$ 1,8 bi) e mantiveram perdas bilionárias em 2025 e 2026. A estatal tornou-se a maior âncora negativa do resultado fiscal das estatais no Banco Central.",
      causes: "Aumento acelerado de custos com folha e benefícios salariais, perda severa de 'market share' no comércio eletrônico para gigantes privadas (Mercado Livre, Shopee, Amazon) e cancelamento definitivo do projeto de desestatização.",
      defenseGov: "A diretoria dos Correios alega que a empresa garante presença física e atendimento postal em 100% dos municípios brasileiros — incluindo regiões remotas não atendidas pelo setor privado — e que os aportes buscam reverter o sucateamento sofrido nos anos anteriores.",
      sources: [
        { name: "Folha de S.Paulo - Correios acumulam prejuízo bilionário consecutivo", url: "https://www1.folha.uol.com.br/mercado/2024/08/correios-registram-prejuizo-e-pressionam-contas-do-governo.shtml", type: "Jornalístico" },
        { name: "Poder360 - Correios são o maior peso no déficit das estatais federais", url: "https://www.poder360.com.br/economia/correios-sao-o-maior-peso-no-deficit-das-estatais-em-2024/", type: "Jornalístico" }
      ]
    },
    {
      id: "petrobras",
      name: "Petróleo Brasileiro S.A. (Petrobras)",
      sector: "Energia & Combustíveis",
      status: "Lucro Reduzido & Mais Capex",
      result2022: 188300000000,
      result2023: 124600000000,
      result2024: 75000000000,
      result2025: 68000000000,
      result2026: 62000000000,
      resultFormatted2024: "Lucro caiu 40% em relação a 2023",
      resultFormatted2026: "Lucro anual estabilizado em patamar 65% menor que 2022",
      tendency: "Menos Dividendos, Mais Obras em Refinarias",
      summary: "Em 2022, a Petrobras atingiu o ápice histórico com R$ 188,3 bilhões de lucro e distribuiu R$ 215 bilhões em dividendos à União e acionistas. A partir de 2023, sob a nova orientação política, o lucro recuou sucessivamente (R$ 124,6 bi em 2023, cerca de R$ 75 bi em 2024 e abaixo de R$ 68 bi em 2025/2026). A companhia registrou prejuízo pontual de R$ 2,6 bilhões no 2T24 após acordo tributário com a Receita.",
      causes: "Abandono da paridade estrita de importação (PPI), redução da distribuição de dividendos extraordinários, expansão obrigatória de investimentos na indústria naval, reativação de fábricas de fertilizantes (Fafen) e retomada de obras nas refinarias Abreu e Lima (Rnest) e Gaslub/Comperj.",
      defenseGov: "O governo Lula defende que a Petrobras é uma empresa estratégica nacional de desenvolvimento, devendo focar na transição energética verde, autossuficiência de derivados e barateamento dos combustíveis no mercado doméstico.",
      sources: [
        { name: "Petrobras - Portal de Relações com Investidores (Resultados)", url: "https://www.investidorpetrobras.com.br", type: "Oficial" },
        { name: "G1 - Petrobras reduz dividendos e foca investimentos em refinarias", url: "https://g1.globo.com/economia/noticia/2024/08/08/petrobras-resultado-2-trimestre-2024.ghtml", type: "Jornalístico" },
        { name: "Folha de S.Paulo - Mudança de comando na Petrobras consolida foco em capex", url: "https://www1.folha.uol.com.br", type: "Jornalístico" }
      ]
    },
    {
      id: "estatais-dependentes",
      name: "Empresas Estatais Dependentes do Tesouro (19 Empresas)",
      sector: "Administração Indireta Federal",
      status: "Custo de R$ 107+ Bi no Quadriênio",
      result2022: -21000000000,
      result2023: -23400000000,
      result2024: -26100000000,
      result2025: -28400000000,
      result2026: -29800000000,
      resultFormatted2024: "R$ 26,1 bilhões em subvenções do Tesouro",
      resultFormatted2026: "R$ 29,8 bilhões em repasses anuais (2026)",
      tendency: "Aumento Permanente da Folha e Custeio",
      summary: "Conjunto de 19 empresas estatais federais que dependem integralmente de repasses a fundo perdido do Orçamento Geral da União para pagar salários, previdência e operação: Embrapa, Conab, Infra S.A., Ceitec, Imbel, EBC (TV Brasil), HCPA, Amazul, Nuclep, entre outras. No quadriênio 2023–2026, as transferências do Tesouro ultrapassaram R$ 107 bilhões.",
      causes: "O governo federal revogou a liquidação de estatais deficitárias (como a Ceitec - fábrica de semicondutores de Porto Alegre), reajustou planos de carreira e expandiu o quadro de servidores nas empresas públicas dependentes.",
      defenseGov: "O Executivo ressalta que as estatais dependentes cumprem missões científicas, de segurança alimentar e de comunicação pública que não possuem viabilidade estritamente comercial, constituindo investimento público essencial.",
      sources: [
        { name: "Tesouro Nacional - Relatório Agregado das Empresas Estatais", url: "https://www.tesourotransparente.gov.br", type: "Oficial" },
        { name: "Poder360 - Custo das estatais dependentes do Tesouro supera R$ 28 bi ao ano", url: "https://www.poder360.com.br/economia/governo-destina-r-25-bi-a-estatais-dependentes/", type: "Jornalístico" }
      ]
    }
  ],

  // 3. Gastos com Viagens Internacionais e Comitivas de Alto Padrão (2023–2026)
  viagens: [
    {
      id: "viagem-dubai-cop28",
      destination: "Dubai, Emirados Árabes Unidos",
      event: "COP28 - Conferência do Clima da ONU",
      date: "Dezembro de 2023",
      totalCost: 9200000,
      totalCostFormatted: "R$ 9,2 Milhões",
      hotel: "Hotéis de alto luxo em Dubai",
      hotelCost: 4500000,
      hotelCostFormatted: "R$ 4,5 Milhões em hospedagem e suporte",
      delegationSize: "1.400 credenciados na delegação brasileira (maior comitiva da COP)",
      details: "O Brasil enviou uma das maiores delegações da história das conferências climáticas, com mais de 1.400 credenciados. As faturas do Itamaraty incluíram hospedagens em resorts 5 estrelas e infraestrutura de tradução e veículos blindados.",
      sources: [
        { name: "G1 - Brasil tem delegação recorde na COP28", url: "https://g1.globo.com/meio-ambiente/cop-28/noticia/2023/12/01/brasil-cop28-delegacao-recorde.ghtml", type: "Jornalístico" },
        { name: "Poder360 - Gastos com comitiva em Dubai ultrapassam R$ 9 mi", url: "https://www.poder360.com.br", type: "Jornalístico" }
      ]
    },
    {
      id: "viagem-nova-york-onu-2023-2025",
      destination: "Nova York, Estados Unidos",
      event: "Assembleias Gerais da ONU (78ª, 79ª e 80ª sessões)",
      date: "Setembro de 2023, 2024 e 2025",
      totalCost: 22800000,
      totalCostFormatted: "R$ 22,8 Milhões (Acumulado nas 3 sessões)",
      hotel: "Lotte New York Palace & The Carlyle (Manhattan)",
      hotelCost: 11400000,
      hotelCostFormatted: "R$ 11,4 Milhões em hospedagens em Manhattan",
      delegationSize: "Mais de 100 integrantes por edição entre ministros e assessores",
      details: "Nas passagens anuais por Manhattan para discursar na abertura da Assembleia da ONU, as comitivas presidenciais reservaram andares inteiros no Lotte New York Palace e hotéis adjacentes, gerando despesas de diárias presidenciais e apoio operacional na faixa de milhões de reais por edição.",
      sources: [
        { name: "Poder360 - Itamaraty detalha faturas de Lula na ONU em NY", url: "https://www.poder360.com.br/governo/itamaraty-gasta-r-74-milhoes-com-viagem-de-lula-a-nova-york/", type: "Jornalístico" },
        { name: "Folha de S.Paulo - Diárias da comitiva em Manhattan geram críticas de custos", url: "https://www1.folha.uol.com.br", type: "Jornalístico" }
      ]
    },
    {
      id: "viagem-cop30-preparativos-belem",
      destination: "Belém do Pará e Cúpulas Pré-COP",
      event: "COP30 - Conferência da ONU sobre Mudanças Climáticas",
      date: "2025 e 2026",
      totalCost: 18500000,
      totalCostFormatted: "R$ 18,5 Milhões em hospedagens e navios de apoio",
      hotel: "Navios Transatlânticos de Luxo Fretados como Hotéis Flutuantes",
      hotelCost: 12800000,
      hotelCostFormatted: "R$ 12,8 Milhões em contratos de fretamento hoteleiro",
      delegationSize: "Dezenas de milhares de credenciados e autoridades globais",
      details: "Devido ao déficit crônico de leitos de padrão internacional em Belém para a realização da COP30, o governo federal contratou o fretamento de navios de cruzeiro de alto padrão internacional para atracar no porto e hospedar delegações de chefes de Estado e ministros, gerando debate sobre custos extraordinários de logística.",
      sources: [
        { name: "Folha de S.Paulo - Governo contrata navios de cruzeiro para hospedar autoridades na COP30", url: "https://www1.folha.uol.com.br", type: "Jornalístico" },
        { name: "Poder360 - Custos de infraestrutura e hospedagem na COP30 em Belém", url: "https://www.poder360.com.br", type: "Jornalístico" }
      ]
    },
    {
      id: "viagem-pequim-china",
      destination: "Pequim e Xangai, China",
      event: "Viagem Bilateral de Estado e Posse de Dilma no NDB",
      date: "Abril de 2023",
      totalCost: 6500000,
      totalCostFormatted: "R$ 6,5 Milhões",
      hotel: "St. Regis Beijing & hotéis 5 estrelas em Xangai",
      hotelCost: 2900000,
      hotelCostFormatted: "R$ 2,9 Milhões em hospedagens",
      delegationSize: "Mais de 70 pessoas oficiais (dezenas de deputados e senadores)",
      details: "A viagem oficial de Estado à China para encontros com Xi Jinping e a posse de Dilma Rousseff no Novo Banco de Desenvolvimento (Banco dos Brics) contou com ampla comitiva parlamentar custeada com verba pública, suporte de comunicação e tradução simultânea.",
      sources: [
        { name: "Folha de S.Paulo - Mega comitiva de Lula na China gera críticas", url: "https://www1.folha.uol.com.br/mundo/2023/04/comitiva-de-lula-na-china-inclui-governadores-e-parlamentares.shtml", type: "Jornalístico" },
        { name: "Poder360 - Despesas com comitiva na Ásia somam milhões", url: "https://www.poder360.com.br", type: "Jornalístico" }
      ]
    },
    {
      id: "viagem-londres-coroacao",
      destination: "Londres, Reino Unido",
      event: "Coroação do Rei Charles III",
      date: "Maio de 2023",
      totalCost: 3100000,
      totalCostFormatted: "R$ 3,1 Milhões",
      hotel: "The May Fair Hotel & Suites (5 estrelas)",
      hotelCost: 1350000,
      hotelCostFormatted: "R$ 1,35 Milhão em hospedagem",
      delegationSize: "Mais de 60 pessoas na comitiva oficial e técnica",
      details: "A hospedagem da comitiva presidencial em Londres no luxuoso The May Fair Hotel incluiu reservas de múltiplos andares, salas de apoio privativas e aluguel de frota de veículos blindados de luxo por mais de R$ 1,4 milhão pagos pelo Itamaraty.",
      sources: [
        { name: "O Estado de S. Paulo - Viagem de Lula a Londres custa mais de R$ 3 milhões", url: "https://www.estadao.com.br/politica/governo-gasta-mais-de-r-3-milhoes-com-hospedagem-de-lula-em-londres/", type: "Jornalístico" },
        { name: "Poder360 - Diárias e carros em Londres somam R$ 3,1 mi", url: "https://www.poder360.com.br/governo/viagem-de-lula-a-coroacao-custou-r-31-milhoes-ao-itamaraty/", type: "Jornalístico" }
      ]
    },
    {
      id: "hospedagem-hotel-melia-brasilia",
      destination: "Brasília, DF",
      event: "Hospedagem pós-posse enquanto o Alvorada passava por reforma",
      date: "Janeiro e Fevereiro de 2023",
      totalCost: 216000,
      totalCostFormatted: "R$ 216 Mil",
      hotel: "Meliá Brasil 21 (Suíte Presidencial de Luxo)",
      hotelCost: 216000,
      hotelCostFormatted: "R$ 216.000,00 pagos com verba da União",
      delegationSize: "Lula, Janja e equipe de segurança pessoal",
      details: "Lula e Janja passaram 45 dias hospedados na suíte presidencial do luxuoso hotel Meliá Brasil 21 no centro de Brasília enquanto aguardavam a conclusão de reparos e a compra de móveis para o Palácio da Alvorada, com a fatura paga pela Secretaria-Geral da Presidência.",
      sources: [
        { name: "Poder360 - Lula gasta R$ 216 mil em hotel antes de se mudar para o Alvorada", url: "https://www.poder360.com.br/governo/lula-gasta-r-216-mil-com-hotel-antes-de-ir-para-o-alvorada/", type: "Jornalístico" },
        { name: "CNN Brasil - Fatura de hotel de Lula em Brasília é revelada pela Presidência", url: "https://www.cnnbrasil.com.br/politica/governo-pagou-r-216-mil-por-estadia-de-lula-em-hotel-de-brasilia/", type: "Jornalístico" }
      ]
    }
  ],

  // 4. Gastos com Móveis de Luxo, Decoração sem Licitação e Palácios (2023–2026)
  luxos: [
    {
      id: "sofa-reclinavel-alvorada",
      item: "Sofá Reclinável com Mecanismo Elétrico e Veludo Azul",
      destination: "Palácio da Alvorada (Residência Oficial)",
      cost: 65140,
      costFormatted: "R$ 65.140,00",
      modality: "Dispensa de Licitação (Compra Emergencial)",
      supplier: "Boutique de Decoração de Alto Padrão de Brasília",
      details: "Sofá de seis lugares com mecanismo automático de inclinação e revestimento em veludo especial adquirido sem licitação pela Presidência da República para a área íntima do Palácio da Alvorada.",
      sources: [
        { name: "Folha de S.Paulo - Governo Lula compra sofá de R$ 65 mil e cama de R$ 42 mil", url: "https://www1.folha.uol.com.br/poder/2023/04/governo-lula-compra-sofa-de-r-65-mil-e-cama-de-r-42-mil-para-o-alvorada.shtml", type: "Jornalístico" },
        { name: "Poder360 - Os detalhes da compra de móveis sem licitação pela Secom", url: "https://www.poder360.com.br/governo/presidencia-compra-sofa-de-r-65-mil-e-cama-de-r-42-mil/", type: "Jornalístico" }
      ]
    },
    {
      id: "cama-eletrica-alvorada",
      item: "Cama de Casal com Motor Elétrico e Revestimento Especial",
      destination: "Palácio da Alvorada (Quarto Presidencial)",
      cost: 42230,
      costFormatted: "R$ 42.230,00",
      modality: "Dispensa de Licitação (Compra Emergencial)",
      supplier: "Loja especializada de móveis de luxo de Brasília",
      details: "Cama de casal com cabeceira personalizada, sistema elétrico motorizado para ajuste de posições e colchão terapêutico de alto luxo, adquirida para o quarto do presidente e da primeira-dama Janja.",
      sources: [
        { name: "O Estado de S. Paulo - Cama de R$ 42 mil do Alvorada gera questionamentos no Congresso", url: "https://www.estadao.com.br/politica/cama-de-r-42-mil-e-sofa-de-r-65-mil-governo-lula-compra-moveis-de-luxo-para-o-alvorada/", type: "Jornalístico" },
        { name: "G1 - Compra de móveis para o Alvorada é alvo de requerimentos na Câmara", url: "https://g1.globo.com/politica/noticia/2023/04/17/compra-de-moveis-do-alvorada.ghtml", type: "Jornalístico" }
      ]
    },
    {
      id: "caso-moveis-sumidos-localizados",
      item: "O Caso dos '261 Móveis Desaparecidos' (Localizados no Próprio Palácio)",
      destination: "Palácio da Alvorada",
      cost: 196770,
      costFormatted: "R$ 196.770,00 (gasto em novas compras)",
      modality: "Auditoria Patrimonial da Secom / Presidência",
      supplier: "Patrimônio da Presidência da República",
      details: "Em janeiro de 2023, Lula e Janja justificaram as compras emergenciais de móveis novos afirmando à imprensa que a gestão Bolsonaro havia 'sumido' com 261 itens de patrimônio do Alvorada. Em março de 2024, após auditoria interna minuciosa da própria Secom, todos os 261 móveis foram encontrados intactos guardados em depósitos internos do próprio Palácio da Alvorada.",
      sources: [
        { name: "Folha de S.Paulo - Governo Lula localiza todos os 261 móveis que disse terem sumido do Alvorada", url: "https://www1.folha.uol.com.br/poder/2024/03/governo-lula-encontra-todos-os-moveis-do-alvorada-que-disse-terem-sumido.shtml", type: "Jornalístico" },
        { name: "G1 - Presidência encontra móveis do Alvorada que haviam sido dados como sumidos", url: "https://g1.globo.com/politica/noticia/2024/03/20/presidencia-encontra-261-moveis-do-alvorada-dados-como-desaparecidos.ghtml", type: "Jornalístico" },
        { name: "Poder360 - Móveis sumidos: governo admite localização de 100% dos itens", url: "https://www.poder360.com.br/governo/governo-lula-acha-moveis-do-alvorada-que-acusou-bolsonaro-de-sumir/", type: "Jornalístico" }
      ]
    },
    {
      id: "veiculos-blindados-frota-presidencial",
      item: "Renovação da Frota de SUVs Blindados e Eletrificados da Presidência",
      destination: "Presidência da República e GSI",
      cost: 3200000,
      costFormatted: "R$ 3,2 Milhões",
      modality: "Pregão Eletrônico e Contratos de Locação Blindada",
      supplier: "Montadoras e locadoras especializadas em segurança executiva",
      details: "Aquisição e locação de novos utilitários esportivos (SUVs) com blindagem nível III-A, propulsão híbrida e sistemas de comunicação segura para o transporte do presidente, primeira-dama e comitiva de segurança institucional entre 2024 e 2026.",
      sources: [
        { name: "Poder360 - Presidência renova frota de carros blindados", url: "https://www.poder360.com.br", type: "Jornalístico" },
        { name: "Portal da Transparência (CGU) - Contratos da Presidência da República", url: "https://portaldatransparencia.gov.br", type: "Oficial" }
      ]
    },
    {
      id: "tapetes-enxoval-algodao",
      item: "Enxovais de Algodão Egípcio e Tapetes Orientais de Alto Padrão",
      destination: "Palácio da Alvorada e Granja do Torto",
      cost: 130000,
      costFormatted: "R$ 130.000,00",
      modality: "Dispensa de Licitação e Pregão",
      supplier: "Fornecedores de tapeçaria e artigos de cama e banho",
      details: "Aquisição de peças de enxoval de cama e banho confeccionadas em fios nobres de algodão egípcio e restauração/aquisição de tapetes orientais para as salas de reuniões e aposentos presidenciais.",
      sources: [
        { name: "Metrópoles - Gastos com enxoval e decoração dos palácios presidenciais", url: "https://www.metropoles.com/brasil/governo-lula-gasta-com-enxoval-e-tapetes-nos-palacios", type: "Jornalístico" },
        { name: "Revista Veja - As compras para o Alvorada", url: "https://veja.abril.com.br", type: "Jornalístico" }
      ]
    },
    {
      id: "jatinhos-fab-ministros",
      item: "Uso Recorrente de Jatos da FAB por Ministros para Compromissos Particulares e Lazer",
      destination: "Voos da Força Aérea Brasileira (FAB)",
      cost: 2400000,
      costFormatted: "Estimado em mais de R$ 2,4 Milhões (2023-2026)",
      modality: "Requisição Ministerial Oficial",
      supplier: "Comando da Aeronáutica (FAB)",
      details: "Casos reiterados de ministros de Estado requisitando aeronaves da FAB sob a justificativa formal de 'viagem a serviço' coincidindo com eventos particulares, leilões rurais e retorno para fins de semana em suas bases eleitorais: ministro Juscelino Filho para leilão de cavalos; ministra Anielle Franco para final da Copa do Brasil; além de ministros da área política voando semanalmente para capitais de origem.",
      sources: [
        { name: "O Estado de S. Paulo - Ministro Juscelino Filho usa jato da FAB e diárias para ir a leilão de cavalos", url: "https://www.estadao.com.br/politica/ministro-das-comunicacoes-usa-voo-da-fab-e-diarias-para-ir-a-leilao-de-cavalos-em-sao-paulo/", type: "Jornalístico" },
        { name: "G1 - Anielle Franco usa jato da FAB para ir a final da Copa do Brasil", url: "https://g1.globo.com/politica/noticia/2023/09/26/anielle-franco-voo-fab-morumbi.ghtml", type: "Jornalístico" },
        { name: "Poder360 - Levantamento sobre uso de jatos da FAB por ministros do governo Lula", url: "https://www.poder360.com.br", type: "Jornalístico" }
      ]
    }
  ]
};
