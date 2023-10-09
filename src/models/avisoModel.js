var database = require("../database/config");

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

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(nome, email, senha , idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nome, email, senha , idUsuario);
    var instrucao = `
        INSERT INTO usuario (nome, email, senha , fkUsuario_cliente) VALUES ('${nome}', '${email}', ${senha} , '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nome, email , senha , idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", nome , email, senha , idAviso);
    var instrucao = `
    UPDATE usuario SET nome = '${nome}' , email = '${email}' , senha = '${senha}' WHERE idusuario = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
    DELETE FROM usuario WHERE idusuario = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function mostrar_dados(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
    SELECT usuario.nome AS nome, usuario.email, instituicao.nome AS instituicao_nome
FROM usuario
JOIN instituicao ON usuario.FkInstituicao = instituicao.codigoHex
WHERE usuario.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    mostrar_dados
}
