// ============================================================
// q2_hard.js — Sistema Avançado de E-Commerce
// ============================================================
// Implementa um sistema completo com gerenciamento de estoque,
// carrinho de compras, pedidos, descontos por cupom, reserva
// de estoque, cancelamento e reembolso.
// ============================================================

class Produto {
    constructor(id, nome, preco, estoque, categoria) {
        this.id = id
        this.nome = nome
        this.preco = preco
        this.estoque = estoque
        this.categoria = categoria
        this.reservado = 0  // quantidade reservada (em carrinhos/pedidos pendentes)
    }

    get disponivel() {
        return this.estoque - this.reservado
    }

    reservar(quantidade) {
        if (quantidade > this.disponivel) {
            throw new Error(`Estoque insuficiente para "${this.nome}". Disponível: ${this.disponivel}`)
        }
        this.reservado += quantidade
    }

    confirmarReserva(quantidade) {
        this.estoque -= quantidade
        this.reservado -= quantidade
    }

    liberarReserva(quantidade) {
        this.reservado -= quantidade
    }
}

class CupomDesconto {
    constructor(codigo, tipo, valor, minimoCompra = 0, maxUso = 1) {
        this.codigo = codigo
        this.tipo = tipo          // 'percentual' ou 'fixo'
        this.valor = valor
        this.minimoCompra = minimoCompra
        this.maxUso = maxUso
        this.usos = 0
        this.ativo = true
    }

    aplicar(subtotal) {
        if (!this.ativo) throw new Error(`Cupom "${this.codigo}" está inativo.`)
        if (this.usos >= this.maxUso) throw new Error(`Cupom "${this.codigo}" esgotado.`)
        if (subtotal < this.minimoCompra) throw new Error(`Compra mínima de R$${this.minimoCompra} para usar este cupom.`)

        this.usos++

        if (this.tipo === 'percentual') {
            return +(subtotal * (this.valor / 100)).toFixed(2)
        } else {
            return Math.min(this.valor, subtotal) // não pode ultrapassar o subtotal
        }
    }

    desativar() {
        this.ativo = false
    }
}

class Cliente {
    constructor(id, nome, email) {
        this.id = id
        this.nome = nome
        this.email = email
        this.pedidos = []
        this.historicoCupons = []
    }
}

class Carrinho {
    constructor(cliente) {
        this.cliente = cliente
        this.itens = []  // { produto, quantidade }
        this.cupom = null
    }

    adicionarItem(produto, quantidade = 1) {
        if (quantidade <= 0) throw new Error('Quantidade deve ser maior que zero.')

        const existente = this.itens.find(i => i.produto.id === produto.id)
        const quantidadeTotal = (existente ? existente.quantidade : 0) + quantidade

        if (quantidadeTotal > produto.disponivel) {
            throw new Error(`Quantidade solicitada (${quantidadeTotal}) excede o disponível (${produto.disponivel}) para "${produto.nome}".`)
        }

        if (existente) {
            produto.reservar(quantidade)
            existente.quantidade += quantidade
        } else {
            produto.reservar(quantidade)
            this.itens.push({ produto, quantidade })
        }
    }

    removerItem(produtoId, quantidade = 1) {
        const index = this.itens.findIndex(i => i.produto.id === produtoId)
        if (index === -1) throw new Error('Item não encontrado no carrinho.')

        const item = this.itens[index]
        if (quantidade >= item.quantidade) {
            item.produto.liberarReserva(item.quantidade)
            this.itens.splice(index, 1)
        } else {
            item.produto.liberarReserva(quantidade)
            item.quantidade -= quantidade
        }
    }

    aplicarCupom(cupom) {
        this.cupom = cupom
    }

    get subtotal() {
        return this.itens.reduce((s, i) => s + i.produto.preco * i.quantidade, 0)
    }

    get desconto() {
        if (!this.cupom) return 0
        return this.cupom.aplicar(this.subtotal)
    }

    get total() {
        return +(this.subtotal - this.desconto).toFixed(2)
    }

    finalizar() {
        if (this.itens.length === 0) throw new Error('Carrinho vazio.')

        const pedido = new Pedido(this)
        this.cliente.pedidos.push(pedido)

        // Confirmar reservas
        for (const item of this.itens) {
            item.produto.confirmarReserva(item.quantidade)
        }

        if (this.cupom) {
            this.cliente.historicoCupons.push(this.cupom.codigo)
        }

        // Limpar carrinho
        this.itens = []
        this.cupom = null

        return pedido
    }
}

class Pedido {
    static #contador = 1000

    constructor(carrinho) {
        this.id = ++Pedido.#contador
        this.itens = carrinho.itens.map(i => ({
            produto: i.produto,
            quantidade: i.quantidade,
            precoUnitario: i.produto.preco
        }))
        this.cliente = carrinho.cliente
        this.cupom = carrinho.cupom
        this.subtotal = carrinho.subtotal
        this.desconto = carrinho.desconto
        this.total = carrinho.total
        this.status = 'pendente'
        this.data = new Date()
        this.log = [{ status: 'pendente', data: this.data }]
    }

    atualizarStatus(novoStatus) {
        const statusValidos = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado', 'reembolsado']
        if (!statusValidos.includes(novoStatus)) {
            throw new Error(`Status inválido: ${novoStatus}`)
        }

        // Regras de transição
        if (this.status === 'cancelado' || this.status === 'reembolsado') {
            throw new Error(`Pedido ${this.id} já está finalizado (${this.status}).`)
        }

        if (novoStatus === 'cancelado') {
            this.#estornarEstoque()
        }

        this.status = novoStatus
        this.log.push({ status: novoStatus, data: new Date() })
    }

    #estornarEstoque() {
        for (const item of this.itens) {
            item.produto.estoque += item.quantidade
        }
    }

    cancelar() {
        if (this.status !== 'pendente' && this.status !== 'confirmado') {
            throw new Error(`Pedido ${this.id} com status "${this.status}" não pode ser cancelado.`)
        }
        this.atualizarStatus('cancelado')
    }

    resumo() {
        return {
            id: this.id,
            cliente: this.cliente.nome,
            itens: this.itens.map(i => `${i.quantidade}x ${i.produto.nome} (R$${i.precoUnitario.toFixed(2)})`),
            subtotal: this.subtotal,
            desconto: this.desconto,
            total: this.total,
            status: this.status,
            data: this.data.toISOString().split('T')[0]
        }
    }
}

class Loja {
    constructor(nome) {
        this.nome = nome
        this.produtos = new Map()
        this.clientes = new Map()
        this.cupons = new Map()
        this.pedidos = []
    }

    cadastrarProduto(id, nome, preco, estoque, categoria) {
        if (this.produtos.has(id)) throw new Error(`Produto ID ${id} já existe.`)
        const produto = new Produto(id, nome, preco, estoque, categoria)
        this.produtos.set(id, produto)
        return produto
    }

    cadastrarCliente(id, nome, email) {
        if (this.clientes.has(id)) throw new Error(`Cliente ID ${id} já existe.`)
        const cliente = new Cliente(id, nome, email)
        this.clientes.set(id, cliente)
        return cliente
    }

    cadastrarCupom(codigo, tipo, valor, minimoCompra = 0, maxUso = 1) {
        if (this.cupons.has(codigo)) throw new Error(`Cupom "${codigo}" já existe.`)
        const cupom = new CupomDesconto(codigo, tipo, valor, minimoCompra, maxUso)
        this.cupons.set(codigo, cupom)
        return cupom
    }

    criarCarrinho(clienteId) {
        const cliente = this.clientes.get(clienteId)
        if (!cliente) throw new Error(`Cliente ID ${clienteId} não encontrado.`)
        return new Carrinho(cliente)
    }

    buscarProdutos(filtro) {
        let resultado = [...this.produtos.values()]

        if (filtro.categoria) {
            resultado = resultado.filter(p => p.categoria === filtro.categoria)
        }
        if (filtro.precoMin !== undefined) {
            resultado = resultado.filter(p => p.preco >= filtro.precoMin)
        }
        if (filtro.precoMax !== undefined) {
            resultado = resultado.filter(p => p.preco <= filtro.precoMax)
        }
        if (filtro.ordenarPor === 'preco') {
            resultado.sort((a, b) => filtro.ordem === 'desc' ? b.preco - a.preco : a.preco - b.preco)
        }
        if (filtro.ordenarPor === 'nome') {
            resultado.sort((a, b) => a.nome.localeCompare(b.nome))
        }

        return resultado
    }

    relatorioEstoqueBaixo(limite = 5) {
        return [...this.produtos.values()]
            .filter(p => p.estoque <= limite)
            .sort((a, b) => a.estoque - b.estoque)
    }

    relatorioVendas() {
        const pedidosFinalizados = this.pedidos.filter(p =>
            ['entregue', 'cancelado', 'reembolsado'].includes(p.status)
        )

        const faturamento = pedidosFinalizados
            .filter(p => p.status !== 'cancelado')
            .reduce((s, p) => s + p.total, 0)

        const totalPedidos = pedidosFinalizados.length
        const ticketMedio = totalPedidos > 0 ? +(faturamento / totalPedidos).toFixed(2) : 0

        // Produtos mais vendidos
        const vendasPorProduto = {}
        for (const pedido of this.pedidos) {
            for (const item of pedido.itens) {
                if (!vendasPorProduto[item.produto.id]) {
                    vendasPorProduto[item.produto.id] = { produto: item.produto, quantidade: 0, receita: 0 }
                }
                vendasPorProduto[item.produto.id].quantidade += item.quantidade
                vendasPorProduto[item.produto.id].receita += item.quantidade * item.precoUnitario
            }
        }

        const rankingProdutos = Object.values(vendasPorProduto)
            .sort((a, b) => b.quantidade - a.quantidade)

        return {
            faturamento: +faturamento.toFixed(2),
            totalPedidos,
            ticketMedio,
            rankingProdutos
        }
    }
}

// ============================================================
// SIMULAÇÃO
// ============================================================

const loja = new Loja('TechStore')

// Cadastrar produtos
loja.cadastrarProduto(1, 'Notebook', 4500, 10, 'Eletrônicos')
loja.cadastrarProduto(2, 'Mouse', 80, 50, 'Acessórios')
loja.cadastrarProduto(3, 'Teclado', 250, 20, 'Acessórios')
loja.cadastrarProduto(4, 'Monitor 27"', 1800, 5, 'Eletrônicos')
loja.cadastrarProduto(5, 'Cadeira Gamer', 1200, 3, 'Móveis')

// Cadastrar clientes
loja.cadastrarCliente(1, 'Alice', 'alice@email.com')
loja.cadastrarCliente(2, 'Carlos', 'carlos@email.com')

// Cadastrar cupom
loja.cadastrarCupom('DESCONTO10', 'percentual', 10, 100, 5)

// Cliente cria carrinho
const carrinho = loja.criarCarrinho(1)
carrinho.adicionarItem(loja.produtos.get(1), 1)  // 1x Notebook
carrinho.adicionarItem(loja.produtos.get(2), 2)  // 2x Mouse
carrinho.aplicarCupom(loja.cupons.get('DESCONTO10'))

const pedido = carrinho.finalizar()
console.log('Pedido criado:', JSON.stringify(pedido.resumo(), null, 2))

// Cliente 2
const carrinho2 = loja.criarCarrinho(2)
carrinho2.adicionarItem(loja.produtos.get(3), 1)
carrinho2.adicionarItem(loja.produtos.get(4), 1)
const pedido2 = carrinho2.finalizar()

pedido.atualizarStatus('confirmado')
pedido.atualizarStatus('enviado')
pedido.atualizarStatus('entregue')

// Relatórios
console.log('\nEstoque baixo:', JSON.stringify(loja.relatorioEstoqueBaixo(), null, 2))
console.log('\nRelatório de vendas:', JSON.stringify(loja.relatorioVendas(), null, 2))