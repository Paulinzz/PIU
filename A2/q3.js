// Escreva um programa Javascript que conta quantos números são pares e quantos são ímpares,
//  dado um array de números inteiros. Considere que zero é par. Use a construção for... of.

let numeros = [0,1,2,3,4,5,6,7,8,9,10]

for (let i in numeros){
    if (i % 2 === 0)
        console.log('Par');

    if (i % 2 != 0 )
        console.log('Impar');
        
        
}