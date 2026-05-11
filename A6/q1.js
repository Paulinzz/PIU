async function getStatus(condicao) {
if (condicao){
    return "sucesso";
}

throw "falha";

}    

getStatus(true)
.then(console.log)
.catch(console.error);

