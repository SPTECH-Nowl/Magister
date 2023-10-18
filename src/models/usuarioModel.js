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

<<<<<<< HEAD
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
=======
	SELECT usuario.idUsuario, usuario.nome as nomeUsuario, usuario.email, usuario.nivPermissao, usuario.fkInstituicao, instituicao.nome as nomeInstituicao, instituicao.sigla  FROM usuario
    JOIN instituicao ON usuario.fkInstituicao = instituicao.codigoHex
    WHERE fkInstituicao = '${codInstituicao}';

 `;
    console.log("Executando a instrução SQL: \n" + instrucao); 
        return database.executar(instrucao);
>>>>>>> 889838037b9fecc011c731389b73ff1600886777
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
<<<<<<< HEAD
    var instrução = `
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 3, '${instituicao}');
=======

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 1, '${instituicao}');
>>>>>>> 889838037b9fecc011c731389b73ff1600886777
    `;
    return database.executar(instrução);
}

<<<<<<< HEAD
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
=======

function cadastrarNaDash(nome, email, senha, nivPerm,instituicao) {

    console.log(nome, email, senha, nivPerm, instituicao)
    
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario , fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', ${nivPerm}, '${instituicao}');
    `;
    return database.executar(instrucao);
}

function editar(nome, email , senha , nivPerm, idUsuario) {
    
    var instrucao = `
>>>>>>> 889838037b9fecc011c731389b73ff1600886777
    UPDATE usuario
SET nome = '${nome}', email = '${email}', senha = '${senha}', fkTipoUsuario = ${nivPerm}
WHERE idUsuario = ${idUsuario};
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
<<<<<<< HEAD
    var instrução = `
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 1, '${codigo}');
=======

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 1, '${codigo}');
>>>>>>> 889838037b9fecc011c731389b73ff1600886777
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
