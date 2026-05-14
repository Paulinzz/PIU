// Define uma função chamada resumirFuncionarios que recebe um array de objetos funcionários
function resumirFuncionarios(funcionarios) {

    // Cria um objeto inicial com valores padrão para o cálculo do resumo
    const resumoInicial = {
        menorIdade: Infinity,       // Inicia com infinito para garantir que qualquer idade será menor
        maiorIdade: -Infinity,      // Inicia com -infinito para garantir que qualquer idade será maior
        totalMulheres: 0,           // Contador de mulheres começa em 0
        totalHomens: 0,             // Contador de homens começa em 0
        somaSalarios: 0,            // Acumulador de salários começa em 0
    }

    // Usa reduce para iterar sobre o array de funcionários e acumular os dados no objeto resumoInicial
    const resumo = funcionarios.reduce((acumulador, funcionario) => {

        // Atualiza a menor idade comparando o valor atual com a idade do funcionário atual
        acumulador.menorIdade = Math.min(
            acumulador.menorIdade,
            funcionario.idade
        )

        // Atualiza a maior idade comparando o valor atual com a idade do funcionário atual
        acumulador.maiorIdade = Math.max(
            acumulador.maiorIdade,
            funcionario.idade
        )

        // Se o gênero for 'F' (feminino), incrementa o contador de mulheres
        if (funcionario.genero === 'F') {
            acumulador.totalMulheres++
        }

        // Se o gênero for 'M' (masculino), incrementa o contador de homens
        if (funcionario.genero === 'M') {
            acumulador.totalHomens++
        }

        // Acumula o salário do funcionário atual na soma total
        acumulador.somaSalarios += funcionario.salario

        // Retorna o acumulador para a próxima iteração do reduce
        return acumulador
    }, resumoInicial)  // resumoInicial é o valor inicial do acumulador

    // Retorna o objeto final com o resumo calculado
    return {
        menorIdade: resumo.menorIdade,           // Menor idade encontrada
        maiorIdade: resumo.maiorIdade,           // Maior idade encontrada
        totalMulheres: resumo.totalMulheres,     // Total de mulheres
        totalHomens: resumo.totalHomens,         // Total de homens
        mediaSalarial:
            resumo.somaSalarios / funcionarios.length,  // Média salarial = total / número de funcionários
    }
}

// Define um array de objetos funcionários com nome, idade, gênero e salário
const funcionarios = [
    { nome: 'Alice', idade: 40, genero: 'F', salario: 6000 },
    { nome: 'Bruna', idade: 28, genero: 'F', salario: 3200 },
    { nome: 'Carlos', idade: 51, genero: 'M', salario: 7000 },
]

// Chama a função e imprime o resultado no console
// Saída esperada: { menorIdade: 28, maiorIdade: 51, totalMulheres: 2, totalHomens: 1, mediaSalarial: 5400 }
console.log(resumirFuncionarios(funcionarios))