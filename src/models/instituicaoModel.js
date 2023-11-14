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


function deletarInstituicao(idInstituicao) {
    var instrucao = `
    DELETE FROM instituicao WHERE idInstituicao = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao deletar a instituição:", erro);
            return Promise.reject("Erro ao deletar a instituição: " + erro.message);
        });
}

function listarInstituicaoEsp(idEscola) {

    var instrucao = `
    SELECT
        i.idInstituicao,
        i.nome,
        i.sigla,
        i.codigoHex
    FROM instituicao i
    WHERE i.idInstituicao = ${idEscola};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function editarInstituicao(nomeInstituicao, sigla, idInstituicao) {
    var instrucao = `
    UPDATE instituicao
    SET nome = '${nomeInstituicao}', sigla = '${sigla}'
    WHERE idInstituicao = ${idInstituicao};
    `;
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao editar a instituição:", erro);
            return Promise.reject("Erro ao editar a instituição: " + erro.message);
        });
}


function dadosInstituicao(idInstituicao) {
    var instrucao = `
    SELECT 
        nome,
        sigla,
        codigoHex
    FROM 
        instituicao
    WHERE idInstituicao = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarInstituicao(nomeEscola) {
    var instrucao = `
    SELECT
        i.idInstituicao,
        i.nome,
        i.sigla,
        i.codigoHex
    FROM instituicao i
    WHERE i.nome LIKE '%${nomeEscola}%';
    `;
    return database.executar(instrucao);
}


module.exports = {
buscarIdInst,
listarInstituicoes,
cadastrarDashEscola,
deletarInstituicao,
listarInstituicaoEsp,
editarInstituicao,
dadosInstituicao,
pesquisarInstituicao
};



// var database = require("../database/config");

// function buscarIdInst(codInst) {
//     var instrucao = `
//     SELECT TOP 1 idInstituicao FROM instituicao
//     WHERE codigoHex = '${codInst}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function listarInstituicoes() {
//     var instrucao = `
//     SELECT * FROM instituicao;
//     `;
//     return database.executar(instrucao);
// }

// function cadastrarDashEscola(nomeInstituicao, sigla, codigoHex) {
//     var instrucao = `
//     INSERT INTO instituicao (nome, sigla, codigoHex)
//     VALUES ('${nomeInstituicao}', '${sigla}', '${codigoHex}');
//     `;
//     return database.executar(instrucao)
//         .catch(function (erro) {
//             console.error("Erro ao realizar o cadastro da instituição:", erro);
//             return Promise.reject("Erro ao realizar o cadastro da instituição: " + erro.message);
//         });
// }

// function deletarInstituicao(idInstituicao) {
//     var instrucao = `
//     DELETE FROM instituicao WHERE idInstituicao = ${idInstituicao};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao)
//         .catch(function (erro) {
//             console.error("Erro ao deletar a instituição:", erro);
//             return Promise.reject("Erro ao deletar a instituição: " + erro.message);
//         });
// }

// function listarInstituicaoEsp(idEscola) {
//     var instrucao = `
//     SELECT TOP 1
//         i.idInstituicao,
//         i.nome,
//         i.sigla,
//         i.codigoHex
//     FROM instituicao i
//     WHERE i.idInstituicao = ${idEscola};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function editarInstituicao(nomeInstituicao, sigla, idInstituicao) {
//     var instrucao = `
//     UPDATE instituicao
//     SET nome = '${nomeInstituicao}', sigla = '${sigla}'
//     WHERE idInstituicao = ${idInstituicao};
//     `;
//     return database.executar(instrucao)
//         .catch(function (erro) {
//             console.error("Erro ao editar a instituição:", erro);
//             return Promise.reject("Erro ao editar a instituição: " + erro.message);
//         });
// }

// function dadosInstituicao(idInstituicao) {
//     var instrucao = `
//     SELECT
//         TOP 1 nome,
//         sigla,
//         codigoHex
//     FROM
//         instituicao
//     WHERE idInstituicao = ${idInstituicao};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function pesquisarInstituicao(nomeEscola) {
//     var instrucao = `
//     SELECT TOP 1
//         i.idInstituicao,
//         i.nome,
//         i.sigla,
//         i.codigoHex
//     FROM instituicao i
//     WHERE i.nome LIKE '%${nomeEscola}%';
//     `;
//     return database.executar(instrucao);
// }

// module.exports = {
//     buscarIdInst,
//     listarInstituicoes,
//     cadastrarDashEscola,
//     deletarInstituicao,
//     listarInstituicaoEsp,
//     editarInstituicao,
//     dadosInstituicao,
//     pesquisarInstituicao
// };



