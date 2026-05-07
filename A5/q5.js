class Funcionario {
  #nome
  #salarioBase

  constructor(nome, salarioBase) {
    this.#nome = nome
    this.#salarioBase = salarioBase
  }

  #calcularBonus() {
    return this.#salarioBase * 0.10
  }

  salarioTotal() {
    return this.#salarioBase + this.#calcularBonus()
  }
}

const funcionario = new Funcionario('Maria', 3000)

console.log(`Salário total: R$ ${funcionario.salarioTotal()}`)

// console.log(funcionario.#nome)
// SyntaxError: Private field '#nome' must be declared in an enclosing class