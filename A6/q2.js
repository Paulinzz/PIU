function verificarPositivo(n) {
  return new Promise((resolve, reject) => {
    if (typeof n !== "number") {
      reject(`Tipo ${typeof n} não é number.`);
    } else if (n < 0) {
      reject(`O valor ${n} deveria ser maior que 0`);
    } else {
      resolve();
    }
  });
}

const num = 10;
verificarPositivo(num)
  .then(() => console.log(`Número ${num} é positivo.`))
  .catch((erro) => console.error(erro));