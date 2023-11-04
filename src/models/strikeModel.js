var database = require("../database/config");

function listar(codInstituicao) {
    console.log('no model');
    var instrução = `
    SELECT maq.nome AS nome,
		DATE_FORMAT(str.dataHora, '%d/%m/%Y %H:%i:%s') AS dataHora, 
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

module.exports = {
    listar
};
