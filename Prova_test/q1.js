function resumirFuncionarios(funcionarios) {
    const resumoInicial = {
        menorIdade: Infinity,
        maiorIdade: -Infinity,
        totalMulheres: 0,
        totalHomens: 0,
        somaSalarios: 0,
    }

    const resumo = funcionarios.reduce((acumulador, funcionario) => {
        acumulador.menorIdade = Math.min(
            acumulador.menorIdade,
            funcionario.idade
        )

        acumulador.maiorIdade = Math.max(
            acumulador.maiorIdade,
            funcionario.idade
        )

        if (funcionario.genero === 'F') {
            acumulador.totalMulheres++
        }

        if (funcionario.genero === 'M') {
            acumulador.totalHomens++
        }

        acumulador.somaSalarios += funcionario.salario

        return acumulador
    }, resumoInicial)

    return {
        menorIdade: resumo.menorIdade,
        maiorIdade: resumo.maiorIdade,
        totalMulheres: resumo.totalMulheres,
        totalHomens: resumo.totalHomens,
        mediaSalarial:
            resumo.somaSalarios / funcionarios.length,
    }
}

const funcionarios = [
    { nome: 'Alice', idade: 40, genero: 'F', salario: 6000 },
    { nome: 'Bruna', idade: 28, genero: 'F', salario: 3200 },
    { nome: 'Carlos', idade: 51, genero: 'M', salario: 7000 },
]

console.log(resumirFuncionarios(funcionarios))