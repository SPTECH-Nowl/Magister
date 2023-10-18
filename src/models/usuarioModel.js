var database = require("../database/config")

function entrar(email, senha) {
    var instrução = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrução);
}

function listar(codInstituicao) {
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
    JOIN instituicao i ON u.fkInstituicao = i.codigoHex  /* Alterado para usar a coluna 'codigoHex' */
    WHERE u.fkInstituicao = '${codInstituicao}';
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrução = `
    SELECT
    u.idUsuario AS idUsuario,
    u.nome,
    u.email,
    u.senha,
    u.fkTipoUsuario AS nivPermissao,
    u.fkInstituicao AS fkInstituicao
FROM
    usuario u
WHERE u.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function mostrar_dados(idUsuario) {
    var instrução = `
    SELECT usuario.nome AS nome, usuario.email,usuario.senha,usuario.nivPermissao, instituicao.nome AS instituicao_nome
FROM usuario
JOIN instituicao ON usuario.FkInstituicao = instituicao.codigoHex
WHERE usuario.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function cadastrar(nome, email, senha, instituicao) {
    var instrução = `
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 3, '${instituicao}');
    `;
    return database.executar(instrução);
}

function cadastrarNaDash(nome, email, senha, nivPerm, instituicao) {
    console.log(nome, email, senha, nivPerm, instituicao);

    if (!isNaN(instituicao)) {
        var instrucao = `
            INSERT INTO usuario (nome, email, senha, fkTipoUsuario, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', '${nivPerm}', '${instituicao}');
        `;
        return database.executar(instrucao)
            .catch(function (erro) {
                console.error("Erro ao realizar o cadastro:", erro);
                return Promise.reject("Erro ao realizar o cadastro: " + erro.message);
            });
    } else {
        console.error('ID da instituição não é um valor numérico válido.');
        return Promise.reject('ID da instituição inválido.');
    }
}




function editar(nome, email, senha, nivPermissao, idUsuario) {
    var instrução = `
    UPDATE usuario
SET nome = '${nome}', email = '${email}', senha = '${senha}', nivPermissao ='${nivPermissao}'
WHERE idUsuario = "${idUsuario}";
    `;
    return database.executar(instrução);
}

function deletar(idUsuario) {
    var instrução = `
    DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}



function cadastrar(nome, email, senha, codigo) {
    var instrução = `
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 1, '${codigo}');
    `;
    return database.executar(instrução);
}




module.exports = {
    entrar,
    cadastrar,
    deletar,
    listar,
    listarPorUsuario,
    cadastrarNaDash,
    editar,
    deletar,
    mostrar_dados
};
