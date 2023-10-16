var database = require("../database/config")

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

/*Corrigir: a gente lista por hexadecimal*/
function listar(codInstituicao) {
    var instrucao = `

	SELECT usuario.idUsuario, usuario.nome as nomeUsuario, usuario.email, usuario.nivPermissao, usuario.fkInstituicao, instituicao.nome as nomeInstituicao, instituicao.sigla  FROM usuario
    JOIN instituicao ON usuario.fkInstituicao = instituicao.codigoHex
    WHERE fkInstituicao = '${codInstituicao}';

 `;
    console.log("Executando a instrução SQL: \n" + instrucao); 
        return database.executar(instrucao);
}


/*Filtrar por nome do usuario e fkInstituicao*/
function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
    SELECT
    u.idUsuario AS idUsuario,
    u.nome,
    u.email,
    u.senha,
    u.nivPermissao,
    u.FkInstituicao AS fkInstituicao
FROM usuario u
WHERE u.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrar_dados(idUsuario) {
    var instrucao = `
    SELECT usuario.nome AS nome, usuario.email,usuario.senha,usuario.nivPermissao, instituicao.nome AS instituicao_nome
FROM usuario
JOIN instituicao ON usuario.FkInstituicao = instituicao.codigoHex
WHERE usuario.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome, email, senha, instituicao) {

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 1, '${instituicao}');
    `;
    return database.executar(instrucao);
}


function cadastrarNaDash(nome, email, senha, nivPerm,instituicao) {

    console.log(nome, email, senha, nivPerm, instituicao)
    
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario , fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', ${nivPerm}, '${instituicao}');
    `;
    return database.executar(instrucao);
}

function editar(nome, email , senha , nivPerm, idUsuario) {
    
    var instrucao = `
    UPDATE usuario
SET nome = '${nome}', email = '${email}', senha = '${senha}', fkTipoUsuario = ${nivPerm}
WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}


function deletar(idUsuario) {
    var instrucao = `
    DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha, codigo) {

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 1, '${codigo}');
    `;
    return database.executar(instrucao);
}

function update(novoNome,novoEmail,id) {

    var instrucao = `UPDATE usuario
    SET nome = '${novoNome}', email = '${novoEmail}'
    WHERE idUsuario = '${id}';`;
    return database.executar(instrucao);
}


module.exports = {
    entrar,
    cadastrar,
    deletar,
    update,
    listar,
    listarPorUsuario,
    cadastrarNaDash,
    editar,
    deletar,
    mostrar_dados
};