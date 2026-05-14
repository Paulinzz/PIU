// === q6.js — Cardápio de Restaurante ===

// Array de pratos do cardápio
const cardapio = [
    { nome: 'Feijoada', categoria: 'Prato Principal', preco: 28.90, calorias: 850, disponivel: true },
    { nome: 'Salada Caesar', categoria: 'Entrada', preco: 18.50, calorias: 320, disponivel: true },
    { nome: 'Moqueca', categoria: 'Prato Principal', preco: 42.00, calorias: 680, disponivel: false },
    { nome: 'Tiramisu', categoria: 'Sobremesa', preco: 15.00, calorias: 450, disponivel: true },
    { nome: 'Brigadeiro', categoria: 'Sobremesa', preco: 8.00, calorias: 200, disponivel: true },
    { nome: 'Coxinha', categoria: 'Entrada', preco: 12.00, calorias: 280, disponivel: true },
    { nome: 'Picanha', categoria: 'Prato Principal', preco: 55.00, calorias: 950, disponivel: true },
    { nome: 'Açaí', categoria: 'Bebida', preco: 19.90, calorias: 350, disponivel: true },
    { nome: 'Caipirinha', categoria: 'Bebida', preco: 22.00, calorias: 280, disponivel: false },
]

// 1. Listar todos os pratos disponíveis com preço formatado (filter + map)
const pratosDisponiveis = cardapio
    .filter(p => p.disponivel)
    .map(p => `  🍽️ ${p.nome} — R$ ${p.preco.toFixed(2)} (${p.categoria})`)

console.log('=== Cardápio Disponível ===')
pratosDisponiveis.forEach(item => console.log(item))

// 2. Aplicar desconto de 10% nos pratos principais e retornar novo array (map)
const cardapioComDesconto = cardapio.map(p => {
    if (p.categoria === 'Prato Principal') {
        return { ...p, preco: parseFloat((p.preco * 0.9).toFixed(2)) }
    }
    return { ...p }
})

console.log('\n=== Cardápio com 10% de desconto nos Pratos Principais ===')
cardapioComDesconto
    .filter(p => p.categoria === 'Prato Principal')
    .forEach(p => console.log(`  ${p.nome}: R$ ${p.preco.toFixed(2)} (era R$ ${cardapio.find(o => o.nome === p.nome).preco.toFixed(2)})`))

// 3. Agrupar pratos por categoria (reduce)
const pratosPorCategoria = cardapio.reduce((grupos, prato) => {
    if (!grupos[prato.categoria]) {
        grupos[prato.categoria] = []
    }
    grupos[prato.categoria].push(prato.nome)
    return grupos
}, {})

console.log('\n=== Pratos agrupados por categoria ===')
Object.entries(pratosPorCategoria).forEach(([categoria, pratos]) => {
    console.log(`  ${categoria}: ${pratos.join(', ')}`)
})

// 4. Encontrar o prato mais caro e o mais barato entre os disponíveis (reduce)
const pratosDisponiveisArray = cardapio.filter(p => p.disponivel)

const maisCaro = pratosDisponiveisArray.reduce((max, p) => p.preco > max.preco ? p : max)
const maisBarato = pratosDisponiveisArray.reduce((min, p) => p.preco < min.preco ? p : min)

console.log(`\n🥇 Prato mais caro disponível: ${maisCaro.nome} — R$ ${maisCaro.preco.toFixed(2)}`)
console.log(`🥉 Prato mais barato disponível: ${maisBarato.nome} — R$ ${maisBarato.preco.toFixed(2)}`)

// 5. Calcular calorias totais de um pedido usando map + reduce
const pedido = ['Feijoada', 'Salada Caesar', 'Tiramisu', 'Açaí']

const caloriasDoPedido = pedido
    .map(nome => cardapio.find(p => p.nome === nome))
    .filter(Boolean)
    .reduce((total, p) => total + p.calorias, 0)

console.log(`\n🔥 Calorias totais do pedido [${pedido.join(', ')}]: ${caloriasDoPedido} kcal`)

// 6. Verificar se há pelo menos uma opção vegana (simulando com some)
const ingredientesPorPrato = {
    'Feijoada': ['feijão', 'carne', 'linguiça'],
    'Salada Caesar': ['alface', 'frango', 'parmesão'],
    'Moqueca': ['peixe', 'leite de coco', 'pimentão'],
    'Tiramisu': ['café', 'mascarpone', 'ovos'],
    'Brigadeiro': ['chocolate', 'leite condensado', 'manteiga'],
    'Coxinha': ['frango', 'catupiry', 'massa'],
    'Picanha': ['carne'],
    'Açaí': ['açaí', 'banana'],
    'Caipirinha': ['cachaça', 'limão', 'açúcar'],
}

// Verificar se algum prato NÃO contém carne (simulação de opção vegana)
const pratosSemCarne = cardapio.filter(p => {
    const ingredientes = ingredientesPorPrato[p.nome] || []
    return !ingredientes.some(i => ['carne', 'frango', 'peixe', 'linguiça'].includes(i))
})

console.log('\n🥗 Opções sem carne (potencialmente veganas):')
pratosSemCarne.forEach(p => console.log(`  ${p.nome}`))

// 7. Criar resumo financeiro do cardápio (map + reduce + toFixed)
const totalCardapio = cardapio.reduce((soma, p) => soma + p.preco, 0)
const mediaPreco = totalCardapio / cardapio.length

const resumo = cardapio.map(p => ({
    nome: p.nome,
    preco: p.preco,
    diferencaDaMedia: parseFloat((p.preco - mediaPreco).toFixed(2)),
}))

console.log(`\n=== Resumo Financeiro ===`)
console.log(`Preço médio dos pratos: R$ ${mediaPreco.toFixed(2)}`)
console.log(`Valor total do cardápio: R$ ${totalCardapio.toFixed(2)}`)
console.log(`\nDiferença de cada prato em relação à média:`)
resumo.forEach(r => {
    const sinal = r.diferencaDaMedia >= 0 ? '+' : ''
    console.log(`  ${r.nome}: ${sinal}R$ ${r.diferencaDaMedia.toFixed(2)}`)
})

// 8. Ordenar cardápio por calorias (sort)
const cardapioOrdenado = [...cardapio].sort((a, b) => a.calorias - b.calorias)

console.log('\n=== Cardápio ordenado por calorias (menor → maior) ===')
cardapioOrdenado.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.nome} — ${p.calorias} kcal`)
})