function validarNome(nome) {
    if (typeof nome !== "string") {
        throw new Error("O nome deve ser uma string");
    }
    if (nome.trim() === "") {
        throw new Error("O nome não pode ser vazio");
    }
    return true;
}

function validarIdade(idade) {
    if (!Number.isInteger(idade)) {
        throw new Error("A idade deve ser um número inteiro");
    }
    if (idade < 0) {
        throw new Error("A idade não pode ser negativa");
    }
    return true;
}

function validarFoiADisney(foiADisney) {
    if (typeof foiADisney !== "boolean") {
        throw new Error("O campo 'foi à Disney' deve ser um booleano");
    }
    return true;
}

function validarPessoa(pessoa) {
    validarNome(pessoa.nome);
    validarIdade(pessoa.idade);
    validarFoiADisney(pessoa.foiADisney);
    return true;
}

const pessoa = {
    nome: "maria",
    idade: 17,
    foiADisney: true
}

validarPessoa(pessoa);

console.log(`Meu nome é ${pessoa.nome}, de idade ${pessoa.idade}, eu ja fui a disney? ${pessoa.foiADisney}`);