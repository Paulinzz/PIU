function Pessoa(nome, idade) {
  this.nome = nome
  this.idade = idade

  this.apresentar = function () {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos`
  }
}

const pessoa1 = new Pessoa('Ana', 28)
const pessoa2 = new Pessoa('Carlos', 42)

console.log(pessoa1.apresentar())
console.log(pessoa2.apresentar())