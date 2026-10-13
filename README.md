# Dossiê Interativo: Escândalos de Corrupção nos Governos do PT (2003–2024)

> 🌐 **Links de Produção ao Vivo (GitHub Pages):**
> - 📌 **Página 1 - Dossiê de Escândalos (2003–2024):** [https://adrianohenriquedev.github.io/PTScandals/](https://adrianohenriquedev.github.io/PTScandals/)
> - 📊 **Página 2 - Gastos & Estatais (Lula 3):** [https://adrianohenriquedev.github.io/PTScandals/gastos-governo.html](https://adrianohenriquedev.github.io/PTScandals/gastos-governo.html)

Painel analítico e interativo contendo o levantamento histórico e documental dos escândalos de corrupção, operações policiais e desvios apurados durante os mandatos presidenciais do Partido dos Trabalhadores (Lula 1, Lula 2, Dilma 1, Dilma 2 e Lula 3), além do monitoramento em tempo real dos gastos da Presidência e do déficit fiscal das empresas estatais federais no governo atual.

---

## 🚀 Como Executar Localmente

### Opção 1: Via Servidor Embutido (Node.js)
Abra o terminal no diretório da aplicação e execute:
```bash
node server.js
```
Acesse em seu navegador preferido: **[http://localhost:3000](http://localhost:3000)**

### Opção 2: Abertura Direta
Você também pode abrir diretamente o arquivo `index.html` em qualquer navegador web moderno (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).

---

## 📊 Recursos da Dashboard

1. **Painel de Indicadores Globais (KPIs)**:
   - Total de escândalos catalogados com rigor histórico.
   - Período coberto (2003 a 2024).
   - Montante de recursos sob investigação / perdas financeiras (R$ 219,5+ Bilhões).
   - Recursos recuperados / pactuados em delações e leniências (R$ 42,1+ Bilhões).
   - Mais de 55 links e fontes de referência direta.

2. **Gráficos Analíticos Interativos (Chart.js)**:
   - **Casos por Mandato**: visualização da distribuição temporal dos escândalos por período de governo.
   - **Valores por Setor / Categoria**: proporção financeira por área (Petrobras & Estatais, Ministérios, Fundos de Pensão, etc.).
   - **Status no Poder Judiciário**: panorama das condenações mantidas, anulações pelo STF por competência/suspeição, acordos de leniência e inquéritos em andamento.

3. **Filtros e Pesquisa em Tempo Real**:
   - Campo de busca textual instantânea (políticos, operadores, estatais, órgãos).
   - Filtro por Mandato Presidencial (Lula 1, Lula 2, Dilma 1, Dilma 2, Lula 3).
   - Filtro por Categoria Temática.
   - Filtro por Situação Jurídica.
   - Ordenação dinâmica (por ano, valores investigados, valores recuperados ou ordem alfabética).

4. **3 Modos de Visualização Intercambiáveis**:
   - **Modo Cartões (Cards)**: visão moderna com badges, caixas de valores, figuras envolvidas e resumo.
   - **Modo Linha do Tempo (Timeline)**: cronologia visual contínua de 2003 a 2024.
   - **Modo Tabela**: matriz comparativa ordenável com exportação.

5. **Dossiê Completo em Modal com Redirecionamentos Diretos**:
   - Resumo detalhado de cada caso.
   - Modus operandi minucioso.
   - Personagens citados e órgãos afetados.
   - Desdobramentos no Supremo Tribunal Federal e Tribunais Superiores.
   - **Links diretos clicáveis para veículos de referência**: G1, Folha de S.Paulo, O Estado de S. Paulo, UOL, BBC News Brasil, Poder360, Acórdãos do TCU, Portal do MPF e STF.

6. **Exportação de Dados**:
   - Exportação completa dos dados filtrados para planilha **CSV** (codificada em UTF-8 com BOM para Excel).
   - Exportação para arquivo estruturado em **JSON**.
   - Modo de impressão formatado para geração de **PDF**.

---

## ⚖️ Metodologia e Imparcialidade

- **Critério Documental**: Todos os dados foram checados em fontes primárias (decisões do TCU, denúncias do MPF, inquéritos da PF, acórdãos do STF) e reportagens jornalísticas de ampla credibilidade.
- **Diferenciação de Valores**: O painel distingue de forma explícita *valores sob suspeita/investigados* de *recursos efetivamente restituídos aos cofres públicos*.
- **Garantias Constitucionais**: O painel registra as decisões do STF que anularam processos (como nos casos da 13ª Vara Federal de Curitiba na Operação Lava Jato) por vícios de competência de foro ou parcialidade judiciária, respeitando o princípio da presunção de inocência e a vigência das decisões judiciais finais.
