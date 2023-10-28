var database = require("../database/config")

function buscarIdInst(codInst) {
    var instrucao = `

    Select idInstituicao FROM instituicao 
    WHERE codigoHex = '${codInst}';

 `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarInstituicoes(){
    
    var instrucao = `
        select * from instituicao;
    `

    return database.executar(instrucao)
}


function cadastrarDashEscola(nomeInstituicao, sigla, codigoHex) {


    var instrucao = `
        INSERT INTO instituicao (nome, sigla, codigoHex) 
        VALUES ('${nomeInstituicao}', '${sigla}', '${codigoHex}');
    `;
    
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao realizar o cadastro da instituição:", erro);
            return Promise.reject("Erro ao realizar o cadastro da instituição: " + erro.message);
        });
}

module.exports = {
buscarIdInst,
listarInstituicoes,
cadastrarDashEscola

};