// === q3.js — Estatísticas de Alunos ===

// Função que recebe um array de alunos e retorna um resumo com estatísticas
function resumirAlunos(alunos) {
    const resumoInicial = {
        maiorNota: -Infinity,
        menorNota: Infinity,
        totalAprovados: 0,
        totalReprovados: 0,
        somaNotas: 0,
    }

    const resumo = alunos.reduce((acumulador, aluno) => {
        acumulador.maiorNota = Math.max(
            acumulador.maiorNota,
            aluno.nota
        )

        acumulador.menorNota = Math.min(
            acumulador.menorNota,
            aluno.nota
        )

        if (aluno.nota >= 6) {
            acumulador.totalAprovados++
        } else {
            acumulador.totalReprovados++
        }

        acumulador.somaNotas += aluno.nota

        return acumulador
    }, resumoInicial)

    return {
        maiorNota: resumo.maiorNota,
        menorNota: resumo.menorNota,
        totalAprovados: resumo.totalAprovados,
        totalReprovados: resumo.totalReprovados,
        mediaGeral: resumo.somaNotas / alunos.length,
    }
}

const alunos = [
    { nome: 'João', nota: 8.5 },
    { nome: 'Maria', nota: 4.2 },
    { nome: 'Pedro', nota: 9.0 },
    { nome: 'Ana', nota: 5.8 },
    { nome: 'Lucas', nota: 7.3 },
]

console.log(resumirAlunos(alunos))