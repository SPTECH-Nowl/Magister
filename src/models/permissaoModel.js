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
JOIN tipoUsuario tu ON u.fkTipoUsuario = tu.idTipoUsuario`

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}


function listarPorUsuario(idUsuario) {
    var instrucao = `
    SELECT
        p.nome,
        p.duracaoStrikePadrao,
        a.nome AS Atuacao,
        p.idPermissao
    FROM permissao p
    JOIN atuacao a ON p.fkAtuacao = a.idAtuacao
    JOIN usuario u ON p.fkUsuario = u.idUsuario
    JOIN tipoUsuario tu ON u.fkTipoUsuario = tu.idTipoUsuario
    WHERE u.idUsuario = ${idUsuario};`

    console.log("Executando a instrucao SQL: \n" + instrucao);
    return database.executar(instrucao);
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
    return new Promise(function (resolve, reject) {
        var instrucao1 = `UPDATE permissao 
        SET fkUsuario = NULL, fkAtuacao = NULL 
        WHERE idPermissao = ${idPermissao};`;
        var instrucao2 = `DELETE FROM permissao WHERE idPermissao = ${idPermissao};`;

        console.log("Executando as instruções SQL...");
        var querys = [];

        querys.push(database.executar(instrucao1));
        querys.push(database.executar(instrucao2));
       
        Promise.all(querys)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function editar(nome, atuacao, duracaoStrikePadrao, idPermissao) {
    var instrução = `
    UPDATE permissao
    SET nome = '${nome}', fkAtuacao = '${atuacao}', duracaoStrikePadrao = '${duracaoStrikePadrao}'
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

function cadastrarPermissao(nome, fkAtuacao, tempoPadrao, fkUsuario) {
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
    cadastrarPermissao,
    listarPorUsuario
};