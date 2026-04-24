function filtrarPares(n) {
    return n.filter(function(num) {
        return num % 2 === 0;
    });
}

console.log(filtrarPares([1, 2, 2, 3, 5, 6]));