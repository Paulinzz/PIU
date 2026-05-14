// === q4.js — Sistema de Biblioteca ===

class Biblioteca {
    constructor() {
        this.livros = []
        this.historicoMovimentacoes = []
    }

    cadastrarLivro(livro) {
        for (const livroExistente of this.livros) {
            if (livroExistente.isbn === livro.isbn) {
                livroExistente.exemplares += livro.exemplares
                this.registrarMovimentacao(livro.isbn, livro.exemplares, 'cadastro')
                return
            }
        }
        this.livros.push(livro)
        this.registrarMovimentacao(livro.isbn, livro.exemplares, 'cadastro')
    }

    emprestarLivro(isbn) {
        for (const livro of this.livros) {
            if (livro.isbn === isbn) {
                if (livro.exemplares <= 0) {
                    throw new Error(`Livro "${livro.titulo}" (ISBN: ${isbn}) não possui exemplares disponíveis para empréstimo.`)
                }
                livro.exemplares--
                this.registrarMovimentacao(isbn, 1, 'emprestimo')
                return livro
            }
        }
        throw new Error(`Livro com ISBN ${isbn} não encontrado na biblioteca.`)
    }

    devolverLivro(isbn) {
        for (const livro of this.livros) {
            if (livro.isbn === isbn) {
                livro.exemplares++
                this.registrarMovimentacao(isbn, 1, 'devolucao')
                return livro
            }
        }
        throw new Error(`Livro com ISBN ${isbn} não encontrado na biblioteca.`)
    }

    registrarMovimentacao(isbn, quantidade, tipoMovimentacao) {
        const acoes = {
            cadastro: 'Cadastrou',
            emprestimo: 'Emprestou',
            devolucao: 'Recebeu devolução de',
        }
        this.historicoMovimentacoes.push(
            `[${tipoMovimentacao.toUpperCase()}] ${acoes[tipoMovimentacao]} ${quantidade} exemplar(es) do livro "${isbn}"`
        )
    }

    buscarLivro(isbn) {
        for (const livro of this.livros) {
            if (livro.isbn === isbn) {
                return livro
            }
        }
        return null
    }
}

function criarLivro(isbn, titulo, autor, exemplaresIniciais) {
    const livro = {
        isbn: isbn,
        titulo: titulo,
        autor: autor,
        exemplares: exemplaresIniciais,
    }
    return livro
}

const biblioteca = new Biblioteca()

// Cadastra livros na biblioteca
biblioteca.cadastrarLivro(criarLivro('978-3-16', 'Dom Casmurro', 'Machado de Assis', 3))
biblioteca.cadastrarLivro(criarLivro('978-1-23', '1984', 'George Orwell', 5))
biblioteca.cadastrarLivro(criarLivro('978-4-56', 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 2))

// Cadastra exemplares adicionais de um livro já existente
biblioteca.cadastrarLivro(criarLivro('978-1-23', '1984', 'George Orwell', 2))

// Realiza empréstimos
biblioteca.emprestarLivro('978-3-16')
biblioteca.emprestarLivro('978-3-16')
biblioteca.emprestarLivro('978-1-23')

// Devolve um livro
biblioteca.devolverLivro('978-3-16')

// Tenta emprestar um livro com exemplares insuficientes
try {
    biblioteca.emprestarLivro('978-4-56')
    biblioteca.emprestarLivro('978-4-56')
    biblioteca.emprestarLivro('978-4-56')  // Deve lançar erro — só há 2 exemplares
} catch (erro) {
    console.log('Erro:', erro.message)
}

// Busca um livro específico
console.log(biblioteca.buscarLivro('978-1-23'))

// Imprime o estado final da biblioteca
console.log(biblioteca)