function somar(n) {
    return n.reduce((acumulador, num) => acumulador + num, 0);
}

console.log(somar([1, 2, 2, 3, 5, 6]));