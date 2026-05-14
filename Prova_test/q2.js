// Define uma classe Estoque para gerenciar produtos e transações
class Estoque {

    // Construtor: inicializa o array de produtos e o histórico de transações como arrays vazios
    constructor() {
        this.produtos = []              // Lista de produtos no estoque
        this.historicoTransacoes = []   // Lista de todas as movimentações realizadas
    }

    // Método para adicionar produto ao estoque
    adicionarProduto(produto) {
        // Percorre os produtos já existentes para verificar se o código já está cadastrado
        for (const produtoExistente of this.produtos) {
            if (produtoExistente.codigo === produto.codigo) {
                // Se o produto já existe, soma a quantidade nova à existente
                produtoExistente.quantidade += produto.quantidade
                // Registra a transação de entrada no histórico
                this.registrarTransacao(produto.codigo, produto.quantidade, 'entrada')
                return  // Sai do método para não duplicar o produto
            }
        }
        // Se o produto não existe, adiciona como um novo produto na lista
        this.produtos.push(produto)
        // Registra a transação de entrada no histórico
        this.registrarTransacao(produto.codigo, produto.quantidade, 'entrada')
    }

    // Método para remover uma quantidade de produto pelo código
    removerProduto(codigo, quantidade) {
        // Percorre a lista de produtos procurando pelo código informado
        for (const produto of this.produtos) {
            if (produto.codigo === codigo) {
                // Verifica se há quantidade suficiente em estoque
                if (produto.quantidade < quantidade) {
                    // Se não houver estoque suficiente, lança um erro
                    throw new Error(`Produto ${codigo} possui apenas ${produto.quantidade} unidades em estoque.`)
                }
                // Subtrai a quantidade removida do estoque
                produto.quantidade -= quantidade
                // Registra a transação de saída (quantidade negativa) no histórico
                this.registrarTransacao(codigo, -quantidade, 'saida')
                return  // Sai do método após a remoção
            }
        }
        // Se não encontrou o produto, lança um erro
        throw new Error(`Produto ${codigo} não encontrado no estoque.`)
    }

    // Método para registrar cada movimentação no histórico
    registrarTransacao(codigo, quantidade, tipoTransacao) {
        if (quantidade > 0) {
            // Se a quantidade é positiva, registra como entrada
            this.historicoTransacoes.push(`[${tipoTransacao.toUpperCase()}] Adicionou ${quantidade} unidade(s) do produto #${codigo}`)
        } else {
            // Se a quantidade é negativa (ou zero), registra como saída usando valor absoluto
            this.historicoTransacoes.push(`[${tipoTransacao.toUpperCase()}] Removeu ${Math.abs(quantidade)} unidade(s) do produto #${codigo}`)
        }
    }
}

// Função fábrica para criar objetos produto com código, nome e quantidade inicial
function criarProduto(codigo, nome, quantidadeInicial) {
    const produto = {
        codigo: codigo,                // Código identificador do produto
        nome: nome,                    // Nome do produto
        quantidade: quantidadeInicial, // Quantidade inicial em estoque
    }
    return produto  // Retorna o objeto produto criado
}

// Cria uma instância da classe Estoque
const estoque = new Estoque()

// Adiciona 5 produtos ao estoque (o produto 2 é adicionado duas vezes, totalizando 40 unidades)
estoque.adicionarProduto(criarProduto(1, 'Caixa de Tintas', 40))
estoque.adicionarProduto(criarProduto(2, 'Pincel', 20))
estoque.adicionarProduto(criarProduto(3, 'Papel', 500))
estoque.adicionarProduto(criarProduto(4, 'Tesoura', 15))
estoque.adicionarProduto(criarProduto(2, 'Pincel', 20))  // Adiciona mais 20 ao Pincel (já existente)

// Remove 10 unidades da Caixa de Tintas (código 1): 40 - 10 = 30 restantes
estoque.removerProduto(1, 10)

// Remove 40 unidades do Pincel (código 2): 40 - 40 = 0 restantes
estoque.removerProduto(2, 40)

// Remove 10 unidades da Tesoura (código 4): 15 - 10 = 5 restantes
estoque.removerProduto(4, 10)

// Tenta remover 10 unidades da Tesoura, mas só restam 5 — lança erro capturado pelo catch
try {
    estoque.removerProduto(4, 10)
} catch (erro) {
    console.log('Erro:', erro.message)  // Imprime: "Erro: Produto 4 possui apenas 5 unidades em estoque."
}

// Remove 5 unidades da Tesoura (código 4): 5 - 5 = 0 restantes
estoque.removerProduto(4, 5)

// Imprime o estado final do estoque (produtos e histórico de transações)
console.log(estoque)