var database = require("../database/config")



function capturaIndividual(idMaquina ) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idMaquina )
    var instrucao = `
        SELECT * FROM maquina WHERE idMaquina = '${idMaquina}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    capturaIndividual
};