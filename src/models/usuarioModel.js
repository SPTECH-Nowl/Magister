var database = require("../database/config")

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

/*Corrigir: a gente lista por hexadecimal*/
function listar(id) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT u1.idUsuario, u1.nome, u1.email, u1.senha
    FROM usuario u1
    JOIN usuario u2 ON u1.idUsuario = u2.fkInstituicao
    WHERE u1.idUsuario = ${id}
    LIMIT 0, 1000;
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


function cadastrarInDash(nome, email, senha , nivPermissao, fkInstituicao) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao)
VALUES ('${nome}', '${email}', ${senha} , '${nivPermissao}','${fkInstituicao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nome, email , senha , nivPermissao, idUsuario) {
    var instrucao = `
    UPDATE usuario
SET nome = '${nome}', email = '${email}', senha = '${senha}', nivPermissao ='${nivPermissao}
WHERE idUsuario = "${idUsuario}";
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
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 3, '${codigo}');
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
    cadastrarInDash,
    editar,
    deletar,
    mostrar_dados
};