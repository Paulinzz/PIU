const p1 = getStatus(true);
const p2 = getStatus(true);
const p3 = getStatus(true);

Promise.all([p1, p2, p3])
  .then((resultados) => console.log("Todos:", resultados))
  .catch((erro) => console.error("Um falhou:", erro));