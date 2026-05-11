Promise.race([
  getStatusDinamico(1, false),
  getStatusDinamico(2, true),
  getStatusDinamico(3, true)
])
  .then((res) => console.log("Vencedora (Sucesso):", res))
  .catch((err) => console.error("Vencedora (Erro):", err));
