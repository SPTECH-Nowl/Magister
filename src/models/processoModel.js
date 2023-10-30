var database = require("../database/config")


function listarProcessos(codInstituicao) {
    var instrucao = `
    SELECT
        p.idProcesso,
        p.nomeProcesso,
        p.nomeAplicativo,
        p.idInstituicao,
        i.nome as nomeInstituicao,
        i.sigla
    FROM processo p
    JOIN instituicao i ON p.idInstituicao = i.idInstituicao
    WHERE p.idInstituicao = ${codInstituicao};
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}


function listaAppUsados(idUsuario) {
    var instrucao = `
    SELECT DISTINCT
    p.idProcesso,
    p.nomeProcesso,
    p.nomeAplicativo,
    per.fkUsuario,
    per.nome
FROM processo p
LEFT JOIN permissaoProcesso pp ON p.idProcesso = pp.fkProcesso
LEFT JOIN permissao per ON pp.fkPermissao = per.idPermissao
WHERE  pp.fkPermissao = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function listaAppNaoUsados(idUsuario) {
    var instrucao = `

    SELECT p.idProcesso,
    p.nomeProcesso,
    p.nomeAplicativo
    FROM processo p
    WHERE p.idProcesso NOT IN (
      SELECT pp.fkProcesso
      FROM permissaoProcesso pp
      WHERE pp.fkPermissao = ${idUsuario});
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
function listarPorProcesso(idProcesso) {
    console.log("Acessando o modelo de processo...\n\n");
    var instrucao = `
    SELECT
        p.idProcesso,
        p.nomeProcesso,
        p.nomeAplicativo,
        p.fkInstituicao AS idInstituicao,
        i.nome AS nomeInstituicao,
        i.sigla
    FROM processo p
    JOIN instituicao i ON p.fkInstituicao = i.idInstituicao
    WHERE p.idProcesso = ${idProcesso};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}



function mostrar_dadosProcesso(idProcesso) {
    var instrução = `
    SELECT 
        usuario.nome AS nome, 
        usuario.email,
        usuario.senha,
        usuario.fkTipoUsuario, 
        instituicao.nome AS instituicao_nome
    FROM 
        usuario
    JOIN instituicao 
        ON usuario.FkInstituicao = instituicao.idInstituicao
    WHERE usuario.idUsuario = ${idProcesso};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}



function publicar(idProcesso,idUsuario) {
    console.log("Cadastrando processo...");

        var instrucao = `
        insert into permissaoProcesso ( fkProcesso, fkPermissao,dataAlocacao) values(${idProcesso},${idUsuario}, NOW());
        `;
        return database.executar(instrucao)
            .catch(function (erro) {
                console.error("Erro ao realizar o cadastro do processo:", erro);
                return Promise.reject("Erro ao realizar o cadastro do processo: " + erro.message);
            });
   
}

function adicionarProcesso(nomeApp,nomeProcesso) {
    console.log("Cadastrando processo...");

        var instrucao = `
        INSERT INTO processo (nomeProcesso, nomeAplicativo) VALUES ('${nomeApp}','${nomeProcesso}');
        `;
        return database.executar(instrucao)
            .catch(function (erro) {
                console.error("Erro ao realizar o cadastro do processo:", erro);
                return Promise.reject("Erro ao realizar o cadastro do processo: " + erro.message);
            });
   
}


function editarProcesso(nomeProcesso, nomeAplicativo, idInstituicao, idProcesso) {
    var instrucao = `
    UPDATE processo
    SET nomeProcesso = '${nomeProcesso}', nomeAplicativo = '${nomeAplicativo}', idInstituicao = ${idInstituicao}
    WHERE idProcesso = ${idProcesso};
    `;
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao editar o processo:", erro);
            return Promise.reject("Erro ao editar o processo: " + erro.message);
        });
}



function deletarProcesso(idProcesso,idUsuario) {
    var instrucao = `
    delete from permissaoProcesso where fkProcesso = ${idProcesso} and fkPermissao =${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
        .catch(function (erro) {
            console.error("Erro ao deletar o processo:", erro);
            return Promise.reject("Erro ao deletar o processo: " + erro.message);
        });
}



function qtdTotal(instituicao) {

    var instrucao = `
    
    select count(idUsuario) as qtdTotal FROM usuario
    WHERE fkInstituicao = ${instituicao};`

    return database.executar(instrucao)
}



function qtdAdministrador(instituicao) {

    var instrucao = `
    
    select count(idUsuario) as qtdTotal FROM usuario
    WHERE fkInstituicao = ${instituicao} AND fkTipoUsuario = 2;`

    return database.executar(instrucao)
}




function qtdInstrutor(instituicao) {

    var instrucao = `
    
    select count(idUsuario) as qtdTotal FROM usuario
    WHERE fkInstituicao = ${instituicao} AND fkTipoUsuario = 3`

    return database.executar(instrucao)
}


module.exports = {

    listarProcessos,
    listarAdm,
    listarInstrutor,
    publicar,
    listarPorProcesso,
    editarProcesso,
    deletarProcesso,
    mostrar_dadosProcesso,
    listaAppUsados,
    listaAppNaoUsados,
    qtdTotal,
    qtdAdministrador,
    qtdInstrutor,
    adicionarProcesso

}