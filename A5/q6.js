class ContaBancaria {
  #saldo = 0

  get saldo() {
    return `R$ ${this.#saldo.toFixed(2)}`
  }

  set saldo(valor) {
    if (valor < 0) {
      throw new Error('Saldo não pode ser negativo!')
    }
    this.#saldo = valor
  }
}

const conta = new ContaBancaria()

conta.saldo = 100
console.log(`Saldo após depósito: ${conta.saldo}`)

try {
  conta.saldo = -50
} catch (erro) {
  console.log(`Erro capturado: ${erro.message}`)
}

console.log(`Saldo atual: ${conta.saldo}`)