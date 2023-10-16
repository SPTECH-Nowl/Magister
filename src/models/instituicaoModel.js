var database = require("../database/config")

function buscarIdInst(codInst) {
    var instrucao = `

    Select idInstituicao FROM instituicao 
    WHERE codigoHex = '${codInst}';

 `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
buscarIdInst,
};