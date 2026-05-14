// === q5.js — Relatório de Vendas ===

// Array de vendas realizadas em um mês
const vendas = [
    { produto: 'Notebook', categoria: 'Eletrônicos', valor: 3500, quantidade: 2, vendedor: 'Carlos' },
    { produto: 'Mouse', categoria: 'Eletrônicos', valor: 80, quantidade: 15, vendedor: 'Ana' },
    { produto: 'Cadeira Gamer', categoria: 'Móveis', valor: 1200, quantidade: 3, vendedor: 'Carlos' },
    { produto: 'Teclado', categoria: 'Eletrônicos', valor: 250, quantidade: 8, vendedor: 'Bruna' },
    { produto: 'Mesa', categoria: 'Móveis', valor: 900, quantidade: 2, vendedor: 'Ana' },
    { produto: 'Monitor', categoria: 'Eletrônicos', valor: 2200, quantidade: 4, vendedor: 'Bruna' },
    { produto: 'Estante', categoria: 'Móveis', valor: 650, quantidade: 5, vendedor: 'Carlos' },
    { produto: 'Webcam', categoria: 'Eletrônicos', valor: 350, quantidade: 10, vendedor: 'Bruna' },
]

// 1. Gerar lista formatada de todas as vendas com faturamento individual (map)
const vendasFormatadas = vendas.map(v => ({
    descricao: `${v.produto} (${v.categoria})`,
    faturamento: v.valor * v.quantidade,
    vendedor: v.vendedor,
}))

console.log('=== Todas as vendas formatadas ===')
vendasFormatadas.forEach(v => {
    console.log(`  ${v.descricao} — R$ ${v.faturamento.toFixed(2)} (Vendedor: ${v.vendedor})`)
})

// 2. Filtrar apenas vendas com faturamento acima de 2000 (filter)
const vendasAltoValor = vendasFormatadas.filter(v => v.faturamento > 2000)

console.log('\n=== Vendas com faturamento acima de R$ 2.000 ===')
vendasAltoValor.forEach(v => {
    console.log(`  ${v.descricao} — R$ ${v.faturamento.toFixed(2)}`)
})

// 3. Ordenar todas as vendas por faturamento do maior para o menor (sort)
const vendasOrdenadas = [...vendasFormatadas].sort((a, b) => b.faturamento - a.faturamento)

console.log('\n=== Ranking de vendas (maior faturamento primeiro) ===')
vendasOrdenadas.forEach((v, i) => {
    console.log(`  ${i + 1}º ${v.descricao} — R$ ${v.faturamento.toFixed(2)}`)
})

// 4. Calcular o faturamento total (reduce)
const faturamentoTotal = vendasFormatadas.reduce((soma, v) => soma + v.faturamento, 0)
console.log(`\nFaturamento total: R$ ${faturamentoTotal.toFixed(2)}`)

// 5. Agrupar faturamento por categoria (forEach + objeto acumulador)
const faturamentoPorCategoria = {}
vendas.forEach(v => {
    const totalItem = v.valor * v.quantidade
    if (faturamentoPorCategoria[v.categoria]) {
        faturamentoPorCategoria[v.categoria] += totalItem
    } else {
        faturamentoPorCategoria[v.categoria] = totalItem
    }
})

console.log('\nFaturamento por categoria:')
Object.entries(faturamentoPorCategoria).forEach(([cat, valor]) => {
    console.log(`  ${cat}: R$ ${valor.toFixed(2)}`)
})

// 6. Verificar se algum vendedor vendeu acima de R$ 5.000 (some)
const vendedores = ['Carlos', 'Ana', 'Bruna']
const metaAlta = 5000

vendedores.forEach(vendedor => {
    const totalVendedor = vendas
        .filter(v => v.vendedor === vendedor)
        .reduce((soma, v) => soma + v.valor * v.quantidade, 0)

    const bateuMeta = totalVendedor > metaAlta
    console.log(`\n${vendedor}: R$ ${totalVendedor.toFixed(2)} — ${bateuMeta ? 'Bateu a meta!' : 'Não bateu a meta.'}`)
})

// 7. Verificar se TODOS os produtos têm quantidade maior que zero (every)
const todosEmEstoque = vendas.every(v => v.quantidade > 0)
console.log(`\nTodos os produtos têm estoque? ${todosEmEstoque ? 'Sim' : 'Não'}`)

// 8. Extrair apenas os nomes dos produtos únicos (map + Set)
const nomesUnicos = [...new Set(vendas.map(v => v.produto))]
console.log('\nProdutos vendidos:', nomesUnicos.join(', '))