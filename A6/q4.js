Promise.resolve(5)
  .then((n) => n * 2)   
  .then((n) => n * 3)  
  .then((res) => console.log(`Resultado final: ${res}`));