// ============================================================
// q1_hard.js — Análise Avançada de Vendas por Região
// ============================================================
// Recebe um array de transações de vendas e retorna um relatório
// complexo agrupado por região, com rankings, médias móveis e
// detecção de anomalias.
// ============================================================

function analisarVendas(transacoes) {
    // 1. Agrupar transações por região usando reduce aninhado
    const porRegiao = transacoes.reduce((acc, t) => {
        if (!acc[t.regiao]) {
            acc[t.regiao] = {
                vendedores: {},
                categorias: {},
                totalVendas: 0,
                quantidadeTotal: 0,
                valores: [],
                transacoesPorMes: {}
            }
        }

        const regiao = acc[t.regiao]
        regiao.totalVendas += t.valor
        regiao.quantidadeTotal += t.quantidade
        regiao.valores.push(t.valor)

        // Agrupar por vendedor dentro da região
        if (!regiao.vendedores[t.vendedor]) {
            regiao.vendedores[t.vendedor] = {
                totalVendas: 0,
                quantidade: 0,
                ticketMedio: 0,
                transacoes: 0
            }
        }
        regiao.vendedores[t.vendedor].totalVendas += t.valor
        regiao.vendedores[t.vendedor].quantidade += t.quantidade
        regiao.vendedores[t.vendedor].transacoes++
        regiao.vendedores[t.vendedor].ticketMedio =
            regiao.vendedores[t.vendedor].totalVendas / regiao.vendedores[t.vendedor].transacoes

        // Agrupar por categoria dentro da região
        if (!regiao.categorias[t.categoria]) {
            regiao.categorias[t.categoria] = {
                totalVendas: 0,
                quantidade: 0,
                crescimentoMesAnterior: null
            }
        }
        regiao.categorias[t.categoria].totalVendas += t.valor
        regiao.categorias[t.categoria].quantidade += t.quantidade

        // Agrupar por mês (formato: "YYYY-MM")
        const mes = t.data.slice(0, 7)
        if (!regiao.transacoesPorMes[mes]) {
            regiao.transacoesPorMes[mes] = []
        }
        regiao.transacoesPorMes[mes].push(t.valor)

        return acc
    }, {})

    // 2. Calcular métricas finais por região
    const resultado = Object.entries(porRegiao).map(([regiao, dados]) => {
        // Média móvel de 3 meses para cada região
        const mesesOrdenados = Object.keys(dados.transacoesPorMes).sort()
        const mediasMoveis = []
        for (let i = 0; i < mesesOrdenados.length; i++) {
            const janela = [dados.transacoesPorMes[mesesOrdenados[i]]]
            if (i > 0) janela.push(dados.transacoesPorMes[mesesOrdenados[i - 1]])
            if (i > 1) janela.push(dados.transacoesPorMes[mesesOrdenados[i - 2]])
            const totalJanela = janela.flat().reduce((s, v) => s + v, 0)
            const countJanela = janela.flat().length
            mediasMoveis.push({
                mes: mesesOrdenados[i],
                mediaMovel: +(totalJanela / countJanela).toFixed(2)
            })
        }

        // Cálculo de crescimento mês a mês
        mediasMoveis.forEach((m, i) => {
            if (i > 0) {
                m.crescimentoPercentual = +(((m.mediaMovel - mediasMoveis[i - 1].mediaMovel) / mediasMoveis[i - 1].mediaMovel) * 100).toFixed(2)
            }
        })

        // Detecção de anomalias: valores acima de 2 desvios padrão da média
        const valores = dados.valores
        const media = valores.reduce((s, v) => s + v, 0) / valores.length
        const variancia = valores.reduce((s, v) => s + Math.pow(v - media, 2), 0) / valores.length
        const desvioPadrao = Math.sqrt(variancia)
        const anomalias = transacoes
            .filter(t => t.regiao === regiao && Math.abs(t.valor - media) > 2 * desvioPadrao)
            .map(t => ({
                vendedor: t.vendedor,
                valor: t.valor,
                desviosPadrao: +((t.valor - media) / desvioPadrao).toFixed(2)
            }))

        // Ranking de vendedores por região
        const rankingVendedores = Object.entries(dados.vendedores)
            .map(([nome, info]) => ({ nome, ...info }))
            .sort((a, b) => b.totalVendas - a.totalVendas)
            .map((v, i) => ({ posicao: i + 1, ...v }))

        // Top categoria
        const topCategoria = Object.entries(dados.categorias)
            .map(([nome, info]) => ({ nome, ...info }))
            .sort((a, b) => b.totalVendas - a.totalVendas)[0]

        return {
            regiao,
            totalVendas: +dados.totalVendas.toFixed(2),
            quantidadeTotal: dados.quantidadeTotal,
            ticketMedioRegiao: +(dados.totalVendas / transacoes.filter(t => t.regiao === regiao).length).toFixed(2),
            mediasMoveis,
            anomalias,
            rankingVendedores,
            topCategoria,
            totalTransacoes: transacoes.filter(t => t.regiao === regiao).length
        }
    })

    // 3. Ranking global de vendedores (independente de região)
    const rankingGlobal = transacoes.reduce((acc, t) => {
        if (!acc[t.vendedor]) {
            acc[t.vendedor] = { totalVendas: 0, regiao: t.regiao, transacoes: 0 }
        }
        acc[t.vendedor].totalVendas += t.valor
        acc[t.vendedor].transacoes++
        return acc
    }, {})

    // 4. Resumo executivo
    const todasVendas = transacoes.map(t => t.valor)
    const totalGeral = todasVendas.reduce((s, v) => s + v, 0)
    const regiaoTop = resultado.sort((a, b) => b.totalVendas - a.totalVendas)[0]

    return {
        resumoExecutivo: {
            totalGeral: +totalGeral.toFixed(2),
            totalTransacoes: transacoes.length,
            ticketMedioGlobal: +(totalGeral / transacoes.length).toFixed(2),
            regiaoDestaque: regiaoTop?.regiao,
            valorDestaque: regiaoTop?.totalVendas
        },
        porRegiao: resultado.sort((a, b) => b.totalVendas - a.totalVendas),
        rankingGlobal: Object.entries(rankingGlobal)
            .map(([nome, info]) => ({ nome, ...info }))
            .sort((a, b) => b.totalVendas - a.totalVendas)
            .map((v, i) => ({ posicao: i + 1, ...v }))
    }
}

// ============================================================
// DADOS DE TESTE
// ============================================================
const transacoes = [
    { vendedor: 'Ana', regiao: 'Sudeste', categoria: 'Eletrônicos', valor: 1500, quantidade: 3, data: '2025-01-15' },
    { vendedor: 'Carlos', regiao: 'Sudeste', categoria: 'Eletrônicos', valor: 3200, quantidade: 1, data: '2025-01-20' },
    { vendedor: 'Ana', regiao: 'Sudeste', categoria: 'Móveis', valor: 800, quantidade: 2, data: '2025-02-10' },
    { vendedor: 'Bruna', regiao: 'Sul', categoria: 'Eletrônicos', valor: 2100, quantidade: 1, data: '2025-01-18' },
    { vendedor: 'Bruna', regiao: 'Sul', categoria: 'Móveis', valor: 4500, quantidade: 5, data: '2025-02-05' },
    { vendedor: 'Carlos', regiao: 'Sudeste', categoria: 'Móveis', valor: 1200, quantidade: 1, data: '2025-02-22' },
    { vendedor: 'Diego', regiao: 'Nordeste', categoria: 'Alimentos', valor: 300, quantidade: 10, data: '2025-01-10' },
    { vendedor: 'Diego', regiao: 'Nordeste', categoria: 'Alimentos', valor: 500, quantidade: 20, data: '2025-02-15' },
    { vendedor: 'Ana', regiao: 'Sudeste', categoria: 'Eletrônicos', valor: 9500, quantidade: 1, data: '2025-03-01' },  // anomalia
    { vendedor: 'Bruna', regiao: 'Sul', categoria: 'Eletrônicos', valor: 2800, quantidade: 2, data: '2025-03-10' },
    { vendedor: 'Carlos', regiao: 'Sudeste', categoria: 'Alimentos', valor: 150, quantidade: 5, data: '2025-03-05' },
    { vendedor: 'Diego', regiao: 'Nordeste', categoria: 'Móveis', valor: 2200, quantidade: 2, data: '2025-03-12' },
    { vendedor: 'Ana', regiao: 'Sudeste', categoria: 'Móveis', valor: 600, quantidade: 4, data: '2025-03-20' },
]

console.log(JSON.stringify(analisarVendas(transacoes), null, 2))