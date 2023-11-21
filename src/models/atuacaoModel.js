var database = require("../database/config")

function buscarAcoes() {
    var instrucao = `
    SELECT * from atuacao;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarAcao(idAcao) {
    var instrucao = `
    SELECT * from atuacao where idAtuacao = ${idAcao};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionar(nome, descricao) {
    var instrucao = `
        insert into atuacao values (null, '${nome}', '${descricao}')
    `;
    return database.executar(instrucao);
}
module.exports = {
    buscarAcoes,
    buscarAcao,
    adicionar
};
