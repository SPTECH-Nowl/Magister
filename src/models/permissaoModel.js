var database = require("../database/config");

function listar() {
    var instrução = `
    SELECT
    p.nome,
    p.duracaoStrikePadrao,
    a.nome AS Atuacao
FROM permissao p
JOIN atuacao a ON p.fkAtuacao = a.idAtuacao
JOIN usuario u ON p.fkUsuario = u.idUsuario
JOIN tipoUsuario tu ON u.fkTipoUsuario = tu.idTipoUsuario
WHERE tu.idTipoUsuario = 3;`;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function deletar(idPermissao) {
    var instrução = `
    UPDATE permissao 
    SET fkUsuario = NULL, fkAtuacao = NULL 
    WHERE idPermissao = ${idPermissao};

    DELETE FROM permissao WHERE idPermissao = ${idPermissao};
    `;
    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function editar(nome, atuacao, duracaoStrikePadrao, idPermissao) {
    var instrução = `
    UPDATE permissao
    SET nome = '${nome}', atuacao = '${atuacao}', duracaoStrikePadrao = '${duracaoStrikePadrao}'
    WHERE idPermissao = ${ idPermissao };
    `;
    return database.executar(instrução);
}

module.exports = {
    listar,
    deletar,
    editar
    // adicionar
};