function contarParesImpares(numeros) {
    let pares = 0
    let impares = 0

    for (let num of numeros) {
        if (!Number.isInteger(num)) {
            throw new Error("O array deve conter apenas números inteiros");
        }

        if (num % 2 === 0) {
            pares++
        } else {
            impares++
        }
    }

    return { "pares": pares, "impares": impares }
}

let numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(contarParesImpares(numeros))