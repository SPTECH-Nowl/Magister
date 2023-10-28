var database = require("../database/config")


function listar(codInstituicao) {
    var instrução = `
    SELECT
        i.idInstituicao,
        i.nome,
        i.sigla,
        i.codigoHex
    FROM instituicao i
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}


function pesquisarEscola(nomeEscola, instituicao) {
    var instrucao = `
    SELECT
        i.idInstituicao,
        i.nome,
        i.sigla,
        i.codigoHex
    FROM instituicao i
    WHERE i.nome LIKE '%${nomeEscola}' AND i.idInstituicao = ${instituicao};
    `;
    return database.executar(instrucao);
}




function listarAdm(codInstituicao) {
    var instrução = `
    SELECT
        u.idUsuario,
        u.nome as nomeUsuario,
        u.email,
        u.fkTipoUsuario as nivPermissao,
        u.fkInstituicao,
        i.nome as nomeInstituicao,
        i.sigla
    FROM usuario u
    JOIN instituicao i ON u.fkInstituicao = i.idInstituicao
    WHERE u.fkInstituicao = ${codInstituicao} AND fkTipoUsuario = 2;
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}


function listarInstrutor(codInstituicao) {
    var instrução = `
    SELECT
        u.idUsuario,
        u.nome as nomeUsuario,
        u.email,
        u.fkTipoUsuario as nivPermissao,
        u.fkInstituicao,
        i.nome as nomeInstituicao,
        i.sigla
    FROM usuario u
    JOIN instituicao i ON u.fkInstituicao = i.idInstituicao
    WHERE u.fkInstituicao = ${codInstituicao} AND fkTipoUsuario = 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}



function listarPorEscola(idEscola) {
    console.log("Acessando o modelo de instituição...\n\n");
    var instrucao = `
    SELECT
        i.idInstituicao,
        i.nome,
        i.sigla,
        i.codigoHex
    FROM instituicao i
    WHERE i.idInstituicao = ${idEscola};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}



function mostrar_dadosEscola(idInstituicao) {
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



function cadastrarDashEscola(nomeInstituicao, sigla, codigoHex,responsavel) {
    console.log("Cadastrando instituição...");

    var instrucao = `
        INSERT INTO instituicao (nome, sigla, codigoHex,responsavel) 
        VALUES ('${nomeInstituicao}', '${sigla}', '${codigoHex}','${responsavel}');
    `;
    
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao realizar o cadastro da instituição:", erro);
            return Promise.reject("Erro ao realizar o cadastro da instituição: " + erro.message);
        });
}



function editarEscola(nomeInstituicao, sigla, codigoHex, idInstituicao) {
    var instrucao = `
    UPDATE instituicao
    SET nome = '${nomeInstituicao}', sigla = '${sigla}', codigoHex = '${codigoHex}'
    WHERE idInstituicao = ${idInstituicao};
    `;
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao editar a instituição:", erro);
            return Promise.reject("Erro ao editar a instituição: " + erro.message);
        });
}


function deletarEscola(idInstituicao) {
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




function qtdTotal(instituicao){
    
    var instrucao = `
    
    select count(idUsuario) as qtdTotal FROM usuario
    WHERE fkInstituicao = ${instituicao};`

    return database.executar(instrucao)
}



function qtdAdministrador(instituicao){
    
    var instrucao = `
    
    select count(idUsuario) as qtdTotal FROM usuario
    WHERE fkInstituicao = ${instituicao} AND fkTipoUsuario = 2;`

    return database.executar(instrucao)
}




function qtdInstrutor(instituicao){
    
    var instrucao = `
    
    select count(idUsuario) as qtdTotal FROM usuario
    WHERE fkInstituicao = ${instituicao} AND fkTipoUsuario = 3`

    return database.executar(instrucao)
}


module.exports = {
    listarAdm,
    listarInstrutor,

    listarPorEscola,
    cadastrarDashEscola,
    editarEscola,
    deletarEscola,
    mostrar_dadosEscola,
    pesquisarEscola,

    qtdTotal,
    qtdAdministrador,
    qtdInstrutor,

   
}