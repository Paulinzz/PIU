function filtrar(div, n) {
    return n.filter(num => num % div === 0);
}

console.log(filtrar(3, [1, 2, 2, 3, 5, 6]));