class Personagem {
  #ataque

  constructor(nome, vida, ataque) {
    this.nome = nome
    this.vida = vida
    this.#ataque = ataque
  }

  receberDano(valor) {
    this.vida = Math.max(0, this.vida - valor)
  }

  estaVivo() {
    return this.vida > 0
  }

  atacar(alvo) {
    console.log(`  ⚔️  ${this.nome} ataca ${alvo.nome} causando ${this.#ataque} de dano!`)
    alvo.receberDano(this.#ataque)
  }
}

class Guerreiro extends Personagem {
  #escudo

  constructor(nome, vida, ataque, escudo) {
    super(nome, vida, ataque)
    this.#escudo = escudo
  }

  receberDano(valor) {
    const danoReal = Math.max(0, valor - this.#escudo)
    console.log(`  🛡️  ${this.nome} bloqueia ${this.#escudo} de dano com o escudo! (dano real: ${danoReal})`)
    super.receberDano(danoReal)
  }
}

class Mago extends Personagem {
  #magia

  constructor(nome, vida, ataque, magia) {
    super(nome, vida, ataque)
    this.#magia = magia
  }

  lancarFeitico(alvo) {
    const custoMagia = 20

    if (this.#magia >= custoMagia) {
      this.#magia -= custoMagia
      const danoFeitico = 25
      console.log(`  ✨ ${this.nome} lança um feitiço em ${alvo.nome} causando ${danoFeitico} de dano mágico! (magia restante: ${this.#magia})`)
      alvo.receberDano(danoFeitico)
    } else {
      console.log(`  🪄 ${this.nome} não tem magia suficiente! Ataque normal.`)
      this.atacar(alvo)
    }
  }
}

const guerreiro = new Guerreiro('Thorfin', 100, 15, 5)
const mago = new Mago('Gandalf', 70, 12, 60)

console.log('═══════════════════════════════════')
console.log('      ⚔️  BATALHA DE MONSTROS ⚔️      ')
console.log('═══════════════════════════════════')
console.log(`${guerreiro.nome} (Guerreiro) vs ${mago.nome} (Mago)`)
console.log('───────────────────────────────────\n')

let turno = 1

while (guerreiro.estaVivo() && mago.estaVivo()) {
  console.log(`🔁 TURNO ${turno}`)

  guerreiro.atacar(mago)

  if (!mago.estaVivo()) break

  mago.lancarFeitico(guerreiro)

  console.log(`  📊 Status: ${guerreiro.nome} → ${guerreiro.vida} HP | ${mago.nome} → ${mago.vida} HP`)
  console.log()

  turno++
}

console.log('═══════════════════════════════════')
console.log('           🏆 FIM DE JOGO 🏆         ')
console.log('═══════════════════════════════════')

if (guerreiro.estaVivo()) {
  console.log(`🥇 Vencedor: ${guerreiro.nome} com ${guerreiro.vida} HP restantes!`)
} else {
  console.log(`🥇 Vencedor: ${mago.nome} com ${mago.vida} HP restantes!`)
}