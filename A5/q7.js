class Animal {
  constructor(nome) {
    this.nome = nome
  }

  falar() {
    return `${this.nome} emitiu um som.`
  }
}

class Cachorro extends Animal {
  constructor(nome) {
    super(nome)
  }

  falar() {
    return `${this.nome} latiu: Au au!`
  }
}

class BemTeVi extends Animal {
  constructor(nome) {
    super(nome)
  }

  falar() {
    return `${this.nome} cantou: Bem-te-vi!`
  }
}

const cachorro = new Cachorro('Rex')
const bemtevi = new BemTeVi('Amarelinho')

console.log(cachorro.falar())
console.log(bemtevi.falar())