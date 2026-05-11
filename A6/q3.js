function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("terminou!");
    }, ms);
  });
}

const tempo = 1000;
console.log(`Esperando ${tempo}ms...`);

esperar(tempo).then((msg) => console.log(msg));

console.log("Isso aparece antes do 'terminou!'"); 