const n = 5;

if (typeof n === "number" && !isNaN(n)) {
  console.log("Valor válido: " + n);
} else {
  console.log("Tipo inválido: " + typeof n);
}