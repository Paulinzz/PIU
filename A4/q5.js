function multiplicar(fator, n) {
    return n.map(num => num * fator);
}

console.log(multiplicar(3, [1, 2, 2, 3, 5, 6]));