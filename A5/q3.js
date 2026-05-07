const animalProto = {
  grupo: '',

  descrever: function () {
    return `Este(a) é um(a) ${this.grupo}`
  }
}

const peba = Object.create(animalProto)
peba.grupo = 'mamífero'

const arribaca = Object.create(animalProto)
arribaca.grupo = 'ave'

console.log(peba.descrever())
console.log(arribaca.descrever())