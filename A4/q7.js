function filtrar(div, num) {
    return num.filter(function(n) {
        return n % div === 0;
    });
}

console.log(filtrar(3, [1, 2, 2, 3, 5, 6]));