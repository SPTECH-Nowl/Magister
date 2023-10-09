var database = require("../database/config")

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, codigo) {

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, nivPermissao, fkInstituicao) VALUES ('${nome}', '${email}', '${senha}', 3, '${codigo}');
    `;
    return database.executar(instrucao);
}

function deletar(id) {

    var instrucao = `DELETE FROM usuario WHERE idUsuario = ${id};`;
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
     update
};