class Estoque {
    constructor() {
        this.produtos = [] 
        this.historicoTransacoes = []  
    }

    adicionarProduto(produto) { 
        for (const produtoExistente of this.produtos) {
            if (produtoExistente.codigo === produto.codigo) {
                produtoExistente.quantidade += produto.quantidade
                this.registrarTransacao(produto.codigo, produto.quantidade, 'entrada')
                return
            }
        }
        this.produtos.push(produto)
        this.registrarTransacao(produto.codigo, produto.quantidade, 'entrada')
    }

    removerProduto(codigo, quantidade) { 
        for (const produto of this.produtos) {
            if (produto.codigo === codigo) {
                if (produto.quantidade < quantidade) {
                    throw new Error(`Produto ${codigo} possui apenas ${produto.quantidade} unidades em estoque.`)
                }
                produto.quantidade -= quantidade
                this.registrarTransacao(codigo, -quantidade, 'saida')
                return
            }
        }
        throw new Error(`Produto ${codigo} não encontrado no estoque.`)
    }

    registrarTransacao(codigo, quantidade, tipoTransacao) { 
        if (quantidade > 0) {
            this.historicoTransacoes.push(`[${tipoTransacao.toUpperCase()}] Adicionou ${quantidade} unidade(s) do produto #${codigo}`)
        } else {
            this.historicoTransacoes.push(`[${tipoTransacao.toUpperCase()}] Removeu ${Math.abs(quantidade)} unidade(s) do produto #${codigo}`)
        }
    }
}

function criarProduto(codigo, nome, quantidadeInicial) {  
    const produto = {
        codigo: codigo, 
        nome: nome,      
        quantidade: quantidadeInicial,
    }
    return produto
}

const estoque = new Estoque()
estoque.adicionarProduto(criarProduto(1, 'Caixa de Tintas', 40))
estoque.adicionarProduto(criarProduto(2, 'Pincel', 20))
estoque.adicionarProduto(criarProduto(3, 'Papel', 500))
estoque.adicionarProduto(criarProduto(4, 'Tesoura', 15))
estoque.adicionarProduto(criarProduto(2, 'Pincel', 20))

estoque.removerProduto(1, 10)
estoque.removerProduto(2, 40)
estoque.removerProduto(4, 10)

try {
    estoque.removerProduto(4, 10)
} catch (erro) {
    console.log('Erro:', erro.message)
}

estoque.removerProduto(4, 5)

console.log(estoque)