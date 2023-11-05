var database = require("../database/config");

function listar(codInstituicao) {
    console.log('no model');
    var instrução = `
    SELECT maq.nome AS nome,
		DATE_FORMAT(str.dataHora, '%Y-%m-%dT%H:%i:%s') AS dataHora, 
        str.motivo AS motivo, 
        str.duracao AS duracao, 
        sit.situacao AS situacao 
        FROM strike AS str
			JOIN situacao AS sit ON sit.idSituacao = str.fkSituacao
			JOIN maquina AS maq ON maq.idMaquina = str.fkMaquina
				WHERE situacao != 'Inativo' AND maq.fkInstituicao = ${codInstituicao};
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function listarSituacao(codInstituicao, situacao) {
    console.log('no model');
    var instrução = `
    SELECT maq.nome AS nome,
		DATE_FORMAT(str.dataHora, '%Y-%m-%dT%H:%i:%s') AS dataHora, 
        str.motivo AS motivo, 
        str.duracao AS duracao, 
        sit.situacao AS situacao 
        FROM strike AS str
			JOIN situacao AS sit ON sit.idSituacao = str.fkSituacao
			JOIN maquina AS maq ON maq.idMaquina = str.fkMaquina
				WHERE situacao = '${situacao}' AND maq.fkInstituicao = ${codInstituicao};
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

function contadores(codInstituicao) {
    console.log('no model');
    var instrução = `
    SELECT COUNT(idStrike) as 'total',
        COUNT(if(fkSituacao = 1 , 1 ,null)) as 'ativos',
        COUNT(if(fkSituacao = 2 ,1 ,null)) as 'inativos',
        COUNT(if(fkSituacao = 3 , 1 ,null)) as 'validos',
        COUNT(if(fkSituacao = 4 ,1 ,null)) as 'invalidos' FROM strike
			JOIN maquina ON idMaquina = fkMaquina
				WHERE fkMaquina = ${codInstituicao};
    `;

    console.log("Executando a instrução SQL: \n" + instrução);
    return database.executar(instrução);
}

module.exports = {
    listar,
    listarSituacao,
    contadores
};
