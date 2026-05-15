// Implemente uma biblioteca que atenda aos requisitos abaixo modelando
// os dados e comportamentos utilizando as construções adequadas do JavaScript:

class Livro {
    constructor(isbn, titulo, ano, status = 'disponível'){
        this.isbn = isbn;
        this.titulo = titulo;
        this.ano = ano;
        this.status = status;
    }
}

class Biblioteca{
    constructor(){
        Object.defineProperty(this, 'livros', {
            value: [],
            writable: false,
            enumerable: true,
            configurable: false
        });
    }

    cadastrar(livro){
        this.livros.forEach(l => {
            if (l.isbn === livro.isbn){
                throw new Error(`Livro ${livro.isbn} já está cadastrado`);
            }
        });
        Object.getOwnPropertyDescriptor(this, 'livros').value.push(livro);
    }

    emprestar(isbn){
        let livro = this.livros.find(l => l.isbn === isbn);
        if (!livro){
            throw new Error(`Livro ${isbn} não está cadastrado`);
        }

        if (livro.status !== 'disponível'){
            throw new Error(`Livro ${isbn} está ${livro.status}`);
        }

        livro.status = 'emprestado';
    }

    devolver(isbn){
        let livro = this.livros.find(l => l.isbn === isbn);
        if (!livro){
            throw new Error(`Livro ${isbn} não está cadastrado`)
        }

        if (livro.status !== 'emprestado'){
            throw new Error(`Livro ${isbn} está ${livro.status}`);
        }

        livro.status = 'disponível'
    }
}

let biblioteca = new Biblioteca();

let cadastrados = [
  () => biblioteca.cadastrar(new Livro('123', 'Libertação Animal', 1975, 'disponível')),
  () => biblioteca.cadastrar(new Livro('234', 'Coisa de Rico', 2024, 'disponível')),
  () => biblioteca.cadastrar(new Livro('345', 'O Hobbit', 1934, 'disponível')),
  () => biblioteca.cadastrar(new Livro('345', 'O Alquimista', 1988, 'desaparecido')),
  () => biblioteca.cadastrar(new Livro('456', 'O Alquimista', 1988, 'desaparecido')),
  () => biblioteca.cadastrar(new Livro(567, 'Quarto de Despejo', 1964, 'disponível')),
]

console.log('livros cadastrados:');
cadastrados.forEach(fn => {
    try { fn();}
    catch (err){
        console.log(`erro: ${err.message}`);
    }
});

let operacoes = [
    () => biblioteca.emprestar('123'),
    () => biblioteca.emprestar('234'),
    () => biblioteca.devolver('234'),
    () => biblioteca.devolver('234'),
    () => biblioteca.emprestar('123'),
    () => biblioteca.emprestar('456'),
]

console.log('operacoes');
operacoes.forEach(fn => {
    try { fn();}
    catch (err){
        console.log(`erro: ${err.message}`);
    }
});

console.log('final:');
console.log(biblioteca);
