//  Dada uma lista de vacinas de um cachorro (objetos JavaScript), escreva
//uma função que receba como entrada essa lista e retorne apenas as vacinas atrasadas.

let vacinas = [
    { nome: 'V8', dia: 15, mes: 5, ano: 2026 },
    { nome: 'Antirrábica', dia: 10, mes: 4, ano: 2025 },
    { nome: 'Leishmaniose', dia: 20, mes: 6, ano: 2027 },
    { nome: 'Giárdia', dia: 15, mes: 4, ano: 2026 },
    { nome: 'Gripe Canina', dia: 5, mes: 5, ano: 2026 },
    { nome: 'Sei lá o que mais', dia: 15, mes: 6, ano: 2023 }
]

let hoje = new Date();
let hojestr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

let vacinasAtrasadas = vacinas
.map(v => ({ ...v, atrasada: + (v.ano * 10000 + v.mes * 100 + v.dia < hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate() ? 1:0) }))
.filter(v => v.atrasada === 1)
.map(({ atrasada, ...rest}) => rest);

console.log('Vacinas Atrasadas:');
console.log(vacinasAtrasadas);

