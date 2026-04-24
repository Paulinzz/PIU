function somar(n) {
    return n.reduce(function(acumulador, num) {
        return acumulador + num;
    }, 0);
}

console.log(somar([1, 2, 2, 3, 5, 6]));     