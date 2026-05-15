// ========== Q1: Vacinas atrasadas (sem loops, sem if) ==========
const vacinas = [
    { nome: 'V8', dia: 15, mes: 5, ano: 2026 },
    { nome: 'Antirrábica', dia: 10, mes: 4, ano: 2025 },
    { nome: 'Leishmaniose', dia: 20, mes: 6, ano: 2027 },
    { nome: 'Giárdia', dia: 15, mes: 4, ano: 2026 },
    { nome: 'Gripe Canina', dia: 5, mes: 5, ano: 2026 },
    { nome: 'Sei lá o que mais', dia: 15, mes: 6, ano: 2023 },
];

const hoje = new Date();
const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

const vacinasAtrasadas = vacinas
  .map(v => ({ ...v, atrasada: +(v.ano * 10000 + v.mes * 100 + v.dia < hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate() ? 1 : 0) }))
  .filter(v => v.atrasada === 1)
  .map(({ atrasada, ...rest }) => rest);

console.log('Q1 - Vacinas Atrasadas:');
console.log(vacinasAtrasadas);


// ========== Q2: Biblioteca de Livros ==========

class Livro {
  constructor(isbn, titulo, ano, status = 'disponível') {
    this.isbn = isbn;
    this.titulo = titulo;
    this.ano = ano;
    this.status = status;
  }
}

class Biblioteca {
  constructor() {
    Object.defineProperty(this, 'livros', {
      value: [],
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  cadastrar(livro) {
    this.livros.forEach(l => { if (l.isbn === livro.isbn) { throw new Error(`Livro ${livro.isbn} já está cadastrado`); } });
    Object.getOwnPropertyDescriptor(this, 'livros').value.push(livro);
  }

  emprestar(isbn) {
    const livro = this.livros.find(l => l.isbn === isbn);
    if (!livro) { throw new Error(`Livro ${isbn} não está cadastrado`); }
    if (livro.status !== 'disponível') { throw new Error(`Livro ${isbn} está ${livro.status}`); }
    livro.status = 'emprestado';
  }

  devolver(isbn) {
    const livro = this.livros.find(l => l.isbn === isbn);
    if (!livro) { throw new Error(`Livro ${isbn} não está cadastrado`); }
    if (livro.status !== 'emprestado') { throw new Error(`Livro ${isbn} está ${livro.status}`); }
    livro.status = 'disponível';
  }
}

const biblioteca = new Biblioteca();

// Cadastro de livros
const cadastros = [
  () => biblioteca.cadastrar(new Livro('123', 'Libertação Animal', 1975, 'disponível')),
  () => biblioteca.cadastrar(new Livro('234', 'Coisa de Rico', 2024, 'disponível')),
  () => biblioteca.cadastrar(new Livro('345', 'O Hobbit', 1934, 'disponível')),
  () => biblioteca.cadastrar(new Livro('345', 'O Alquimista', 1988, 'desaparecido')),
  () => biblioteca.cadastrar(new Livro('456', 'O Alquimista', 1988, 'desaparecido')),
  () => biblioteca.cadastrar(new Livro(567, 'Quarto de Despejo', 1964, 'disponível')),
];

console.log('\nQ2 - Cadastro de livros:');
cadastros.forEach(fn => {
  try { fn(); }
  catch (err) { console.log(`Erro: ${err.message}`); }
});

// Operações de empréstimo e devolução
const operacoes = [
  () => biblioteca.emprestar('123'),
  () => biblioteca.emprestar('234'),
  () => biblioteca.devolver('234'),
  () => biblioteca.devolver('234'),
  () => biblioteca.emprestar('123'),
  () => biblioteca.emprestar('456'),
];

console.log('\nQ2 - Operações:');
operacoes.forEach(fn => {
  try { fn(); }
  catch (err) { console.log(`Erro: ${err.message}`); }
});

// Estado final
console.log('\nQ2 - Estado Final da Biblioteca:');
console.log(biblioteca);
