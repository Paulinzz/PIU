let n = 3

if (!Number.isInteger(n)) {
    throw new Error("O valor de n deve ser um número inteiro");
}

for (let i = 0; i <= 10; i++) {
    let res = n * i
    console.log(`a multiplicação de ${n} x ${i} é igual a: ${res}`);
}