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

function buscarPermissoesFunc(idFuncionario) {
    var instrucao = `
    SELECT
    permissao.idPermissao,
    permissao.nome AS permissao_nome,
    permissao.emUso AS permissao_emUso,
    permissao.duracaoStrikePadrao,
    atuacao.nome AS atuacao_nome,
    atuacao.descricao AS atuacao_descricao
    FROM permissao
    JOIN atuacao ON permissao.fkAtuacao = atuacao.idAtuacao
    WHERE permissao.fkUsuario = ${idFuncionario};

`;

    console.log("Executando a instrucao SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPermicao(idPermicao) {
    var instrucao = `
    
    SELECT
    permissao.idPermissao,
    permissao.nome AS permissao_nome,
    permissao.emUso AS permissao_emUso,
    permissao.duracaoStrikePadrao,
    atuacao.nome AS atuacao_nome,
    atuacao.descricao AS atuacao_descricao,
    permissao.fkAtuacao

    FROM permissao
    JOIN atuacao ON permissao.fkAtuacao = atuacao.idAtuacao
    WHERE permissao.idPermissao = ${idPermicao};
`;

    console.log("Executando a instrucao SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idPermissao) {
    var instrução = `
    DELETE FROM permissao WHERE idPermissao = ${ idPermissao };
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

function editarConfig(idAtuacao, idPermissao,  duracaoStrikePadrao) {
    var instrução = `
    UPDATE permissao
    SET fkAtuacao = '${idAtuacao}', duracaoStrikePadrao = '${duracaoStrikePadrao}'
    WHERE idPermissao = ${ idPermissao };
    `;
    return database.executar(instrução);
}

function adicionar(nome, fkAtuacao, tempoPadrao, fkUsuario) {
    var instrucao = `
        insert into permissao values (null, '${nome}', 0, ${tempoPadrao}, ${fkAtuacao}, ${fkUsuario})
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    deletar,
    editar,
    buscarPermissoesFunc,
    editarConfig,
    buscarPermicao,
    adicionar
};