var database = require("../database/config")

function buscarAcoes() {
    var instrucao = `
    SELECT * from atuacao;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarAcoes
};
