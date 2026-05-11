function getStatusDinamico(id, condicao) {
  const tempo = Math.floor(Math.random() * 2000) + 1000; 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      condicao ? resolve(`(${id}) Sucesso :)`) : reject(`(${id}) Erro :(`);
    }, tempo);
  });
}

Promise.any([
  getStatusDinamico(1, false),
  getStatusDinamico(2, true),
  getStatusDinamico(3, false)
])
  .then((res) => console.log("Primeira que resolveu:", res))
  .catch((err) => console.error("Todas falharam", err));