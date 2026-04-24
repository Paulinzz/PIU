function parOuImpar(n) {
    n.forEach((num) => {
        if (num % 2 === 0) {
            console.log(num + " é par");
        } else {
            console.log(num + " é ímpar");
        }
    });
}

parOuImpar([1, 2, 5, 6, 0]);
