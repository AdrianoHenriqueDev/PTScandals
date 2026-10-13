/**
 * Base de dados estruturada de Gastos do Governo Atual (Lula 3 / 2023-2024),
 * Viagens Internacionais, Bens de Luxo e Indicadores Fiscais das Estatais.
 * Fontes: Banco Central do Brasil, Tesouro Nacional, Portal da Transparência,
 * Poder360, G1, Folha de S.Paulo, O Estado de S. Paulo e Metrópoles.
 */

const GASTOS_DATA = {
  // 1. Resumo Consolidado de Indicadores
  metrics: {
    estataisDeficit2024: 6730000000,
    estataisDeficit2024Formatted: "R$ 6,73 Bilhões",
    estataisDeficit2023: 656000000,
    estataisDeficit2023Formatted: "R$ 656 Milhões",
    estataisSuperavit2022: 4800000000,
    estataisSuperavit2022Formatted: "R$ 4,80 Bilhões",
    
    totalPassagensDiariasFederal: 4520000000,
    totalPassagensDiariasFederalFormatted: "R$ 4,52 Bilhões (2023-2024)",
    
    viagensPresidenciaisExterior: 82500000,
    viagensPresidenciaisExteriorFormatted: "R$ 82,5 Milhões",
    
    moveisDecoracaoLuxo: 2850000,
    moveisDecoracaoLuxoFormatted: "R$ 2,85 Milhões"
  },

  // 2. Desempenho e Indicadores das Principais Estatais Federais
  estatais: [
    {
      id: "estatais-geral",
      name: "Consolidado das Estatais Federais (Banco Central)",
      sector: "Setor Público Federal Consolidado",
      status: "Déficit Histórico",
      result2022: 4800000000,
      result2023: -656000000,
      result2024: -673000000,
      resultFormatted2024: "Déficit de R$ 6,73 bilhões",
      tendency: "Deterioração Histórica",
      summary: "Em 2024, as estatais federais registraram o maior déficit primário da série histórica do Banco Central iniciada em 2002, atingindo R$ 6,73 bilhões negativos. Em 2022, o setor havia entregue superávit de R$ 4,8 bilhões.",
      causes: "Aumento acelerado de despesas operacionais e de pessoal, reversão de resultados positivos em empresas como Correios, e aumento de investimentos bancados com consumo do caixa acumulado nos anos anteriores.",
      defenseGov: "O Ministério da Gestão e Inovação (MGI) e a Fazenda alegam que o déficit primário não significa 'prejuízo', mas sim que as estatais estão investindo mais utilizando o caixa de anos anteriores para modernização.",
      sources: [
        { name: "Banco Central do Brasil - Séries Estatísticas de Política Fiscal", url: "https://www.bcb.gov.br", type: "Oficial" },
        { name: "Poder360 - Rombo das estatais atinge recorde de R$ 6,73 bi em 2024", url: "https://www.poder360.com.br/economia/estatais-fecham-2024-com-maior-deficit-da-serie-historica-do-bc/", type: "Jornalístico" },
        { name: "G1 - Estatais fecham com déficit recorde nas contas públicas", url: "https://g1.globo.com/economia/noticia/2024/09/estatais-registram-deficit-recorde-bc.ghtml", type: "Jornalístico" }
      ]
    },
    {
      id: "correios",
      name: "Empresa Brasileira de Correios e Telégrafos (ECT)",
      sector: "Logística e Comunicações",
      status: "Prejuízo Bilionário",
      result2022: 1530000000,
      result2023: -597000000,
      result2024: -1800000000,
      resultFormatted2024: "Prejuízo superior a R$ 1,5 bilhão",
      tendency: "Volta ao Prejuízo Crônico",
      summary: "Após registrar lucros expressivos em 2021 (R$ 2,3 bi) e 2022 (R$ 1,5 bi) durante o processo de saneamento, a estatal voltou ao vermelho em 2023 com prejuízo de R$ 597 milhões e aprofundou o rombo em 2024 para mais de R$ 1,5 bilhão, tornando-se a maior responsável pelo déficit primário das estatais federais.",
      causes: "Perda acentuada de participação no mercado de encomendas para concorrentes privados (Mercado Livre, Shopee, Amazon), aumento dos custos com a folha de pagamento e suspensão dos planos de desestatização pelo governo Lula.",
      defenseGov: "A presidência dos Correios afirma que a estatal está recompondo investimentos represados, modernizando agências e que o resultado reflete o custo social da manutenção do serviço postal universal em municípios deficitários.",
      sources: [
        { name: "Folha de S.Paulo - Correios aprofundam rombo bilionário em 2024", url: "https://www1.folha.uol.com.br/mercado/2024/08/correios-registram-prejuizo-e-pressionam-contas-do-governo.shtml", type: "Jornalístico" },
        { name: "Poder360 - Correios puxam déficit das estatais no governo Lula", url: "https://www.poder360.com.br/economia/correios-sao-o-maior-peso-no-deficit-das-estatais-em-2024/", type: "Jornalístico" }
      ]
    },
    {
      id: "petrobras",
      name: "Petróleo Brasileiro S.A. (Petrobras)",
      sector: "Energia & Combustíveis",
      status: "Queda de Lucro & Dividendos",
      result2022: 188300000000,
      result2023: 124600000000,
      result2024: 75000000000,
      resultFormatted2024: "Queda de mais de 35% no lucro líquido anual",
      tendency: "Redução dos Dividendos e Maior Capex",
      summary: "Em 2022, a Petrobras atingiu o lucro recorde de R$ 188,3 bilhões e distribuiu R$ 215 bilhões em dividendos. Em 2023, o lucro caiu 33,8% para R$ 124,6 bilhões. No 2º trimestre de 2024, a companhia registrou o primeiro prejuízo trimestral desde 2020 (R$ 2,6 bilhões negativos), afetada por acordo tributário bilionário com a Receita e desvalorização cambial.",
      causes: "Mudança na política de preços de combustíveis (fim da PPI estrita), redução deliberada da distribuição de dividendos extraordinários, aumento de investimentos em transição energética e fertilizantes (Fafen), além de troca na presidência da estatal (saída de Jean Paul Prates e entrada de Magda Chambriard por pressão do Planalto).",
      defenseGov: "O governo afirma que a estatal não deve priorizar unicamente megadividendos a acionistas minoritários em Wall Street, mas investir na indústria naval brasileira, na autossuficiência de fertilizantes e na moderação dos preços dos combustíveis.",
      sources: [
        { name: "Petrobras - Demonstrações Financeiras Oficiais (RI)", url: "https://www.investidorpetrobras.com.br", type: "Oficial" },
        { name: "G1 - Petrobras tem prejuízo líquido de R$ 2,6 bilhões no 2T24", url: "https://g1.globo.com/economia/noticia/2024/08/08/petrobras-resultado-2-trimestre-2024.ghtml", type: "Jornalístico" },
        { name: "Folha de S.Paulo - Lucro da Petrobras cai com nova política de investimentos", url: "https://www1.folha.uol.com.br/mercado/2024/03/lucro-da-petrobras-cai-33-em-2023-com-queda-do-petroleo.shtml", type: "Jornalístico" }
      ]
    },
    {
      id: "estatais-dependentes",
      name: "Empresas Estatais Dependentes do Tesouro (19 Empresas)",
      sector: "Administração Indireta Federal",
      status: "Custo de R$ 25+ Bi/ano",
      result2022: -21000000000,
      result2023: -23400000000,
      result2024: -26100000000,
      resultFormatted2024: "R$ 26,1 bilhões em subvenções do Tesouro",
      tendency: "Aumento dos Repasses Fiscais",
      summary: "Empresas estatais que não conseguem se sustentar com receitas próprias e dependem 100% de aportes diretos do Orçamento Geral da União para pagar salários e despesas correntes: Embrapa, Conab, Infra S.A. (antiga Valec), Ceitec, Imbel, EBC (TV Brasil), HCPA, Amazul.",
      causes: "O governo federal revogou a liquidação de estatais que haviam sido colocadas em processo de extinção (como a Ceitec - fábrica de chips de Porto Alegre) e reincorporou estatais ao orçamento público com aumento do quadro de servidores.",
      defenseGov: "O governo sustenta que as empresas estatais dependentes cumprem funções estatais e científicas não comerciais essenciais (como pesquisa agrícola na Embrapa ou soberania em semicondutores na Ceitec) que não visam lucro.",
      sources: [
        { name: "Tesouro Nacional - Relatório Agregado das Empresas Estatais", url: "https://www.tesourotransparente.gov.br", type: "Oficial" },
        { name: "Poder360 - Tesouro gasta mais de R$ 25 bilhões com estatais dependentes", url: "https://www.poder360.com.br/economia/governo-destina-r-25-bi-a-estatais-dependentes/", type: "Jornalístico" }
      ]
    }
  ],

  // 3. Gastos com Viagens Internacionais e Comitivas de Alto Padrão
  viagens: [
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
      id: "viagem-nova-york-onu",
      destination: "Nova York, Estados Unidos",
      event: "78ª Assembleia Geral da ONU",
      date: "Setembro de 2023",
      totalCost: 7400000,
      totalCostFormatted: "R$ 7,4 Milhões",
      hotel: "Lotte New York Palace (Manhattan / 5 estrelas)",
      hotelCost: 3820000,
      hotelCostFormatted: "R$ 3,82 Milhões em hospedagem",
      delegationSize: "Mais de 100 integrantes entre ministros, diplomatas e assessores",
      details: "A comitiva de Lula ficou instalada no famoso Lotte New York Palace em Midtown Manhattan. As faturas reveladas via Lei de Acesso à Informação incluíram diárias da suíte presidencial de dezenas de milhares de dólares e aluguel de salas de reunião bilaterais de alto padrão.",
      sources: [
        { name: "Poder360 - Itamaraty gasta R$ 7,4 milhões com Lula na ONU em NY", url: "https://www.poder360.com.br/governo/itamaraty-gasta-r-74-milhoes-com-viagem-de-lula-a-nova-york/", type: "Jornalístico" },
        { name: "Folha de S.Paulo - Hotel de Lula em NY cobra diárias de alto padrão", url: "https://www1.folha.uol.com.br/mundo/2023/09/lula-fica-no-lotte-new-york-palace-durante-assembleia-da-onu.shtml", type: "Jornalístico" }
      ]
    },
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
      details: "O Brasil enviou a segunda maior delegação de todo o evento global, com mais de 1.400 pessoas credenciadas entre integrantes do Executivo, parlamentares, assessores e comitivas estaduais. Os gastos da comitiva do Executivo no exterior geraram forte repercussão pelo contraste com a pauta de sustentabilidade.",
      sources: [
        { name: "G1 - Brasil tem uma das maiores delegações da história da COP28", url: "https://g1.globo.com/meio-ambiente/cop-28/noticia/2023/12/01/brasil-cop28-delegacao-recorde.ghtml", type: "Jornalístico" },
        { name: "Poder360 - Viagem a Dubai e Oriente Médio supera R$ 9 mi em despesas", url: "https://www.poder360.com.br", type: "Jornalístico" }
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

  // 4. Gastos com Móveis de Luxo, Decoração sem Licitação e Palácios
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
      id: "tapetes-enxoval-algodao",
      item: "Enxovais de Algodão Egípcio e Tapetes de Alto Padrão",
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
      item: "Uso de Jatos da FAB por Ministros para Compromissos Particulares e Lazer",
      destination: "Voos da Força Aérea Brasileira (FAB)",
      cost: 1800000,
      costFormatted: "Centenas de milhares por voo (Estimado R$ 1,8 Mi+)",
      modality: "Requisição Ministerial Oficial",
      supplier: "Comando da Aeronáutica (FAB)",
      details: "Casos de ministros de Estado requisitando aviões da FAB sob a justificativa de 'viagem a serviço' que coincidiram com eventos particulares: ministro das Comunicações Juscelino Filho usou jato da FAB e diárias para ir a leilão de cavalos em SP; ministra da Igualdade Racial Anielle Franco usou jato da FAB para assistir à final da Copa do Brasil no Estádio do Morumbi sob a justificativa de assinar ação contra o racismo no futebol.",
      sources: [
        { name: "O Estado de S. Paulo - Ministro Juscelino Filho usa jato da FAB e diárias para ir a leilão de cavalos", url: "https://www.estadao.com.br/politica/ministro-das-comunicacoes-usa-voo-da-fab-e-diarias-para-ir-a-leilao-de-cavalos-em-sao-paulo/", type: "Jornalístico" },
        { name: "G1 - Anielle Franco usa jato da FAB para ir a final da Copa do Brasil", url: "https://g1.globo.com/politica/noticia/2023/09/26/anielle-franco-voo-fab-morumbi.ghtml", type: "Jornalístico" }
      ]
    }
  ]
};
