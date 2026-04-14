const pessoa = [
  ["nome", "João"],
  ["idade", 25],
  ["já foi à Disney", true]
];

for (let i in pessoa) {
  console.log(pessoa[i][0] + ": " + pessoa[i][1]);
}