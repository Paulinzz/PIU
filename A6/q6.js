const lista = [getStatus(true), getStatus(false), getStatus(true)];

Promise.allSettled(lista).then((resultados) => {
  console.log("Estado de todas:", resultados);
});