//  Escreva um programa Javascript que cadastre os seguintes dados de uma pessoa: nome (s tring), idade (int), 
// já foi à Disney (booleano). Os dados devem ser representados como um objeto javascript 
// (JSON, semelhante aos dicionários Python) usando a sintaxe de pares chave-valor e devem ser exibidos usando 
// a notação de acesso a atributos de objeto (variavel.atributo).

const list = {
    nome: "maria",
    idade: 17,
    Disney: true
}

console.log(`Meu nome é ${list.nome}, de idade ${list.idade}, eu ja fui a disney? ${list.Disney}`);
