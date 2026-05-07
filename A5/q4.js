class Retangulo {
  constructor(altura, largura) {
    this.altura = altura
    this.largura = largura
  }

  area() {
    return this.altura * this.largura
  }
}

const retangulo = new Retangulo(5, 8)

console.log(`Área do retângulo: ${retangulo.area()}`)