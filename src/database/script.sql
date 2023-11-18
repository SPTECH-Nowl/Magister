create DATABASE magister;
USE magister;

CREATE TABLE tipoUsuario (
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    tipoUsuario VARCHAR(50) NOT NULL
);

CREATE TABLE situacao (
	idSituacao INT PRIMARY KEY AUTO_INCREMENT,
    situacao VARCHAR(50) NOT NULL
);

CREATE TABLE medida (
	idMedida INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    unidade VARCHAR(5)
);

CREATE TABLE instituicao (
	idInstituicao INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	sigla VARCHAR(30) NOT NULL,
	codigoHex CHAR(6) NOT NULL
);

CREATE TABLE processo (
	idProcesso INT PRIMARY KEY AUTO_INCREMENT,
	nomeProcesso VARCHAR(100) NOT NULL,
	nomeAplicativo VARCHAR(100) NOT NULL
);

CREATE TABLE atuacao (
	idAtuacao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(75) NOT NULL,
    descricao VARCHAR(200) NOT NULL
);

CREATE TABLE tipoHardware (
	idTipoHardware INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(100) NOT NULL,
    fkMedida INT, CONSTRAINT tipoHardFkMed FOREIGN KEY (fkMedida)
		REFERENCES medida(idMedida)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(20) NOT NULL,
	fkInstituicao INT, CONSTRAINT usuFkInst FOREIGN KEY (fkInstituicao)
		REFERENCES instituicao(idInstituicao),
	fkTipoUsuario INT, CONSTRAINT usuFkTipoUsu FOREIGN KEY (fkTipoUsuario)
		REFERENCES tipoUsuario(idTipoUsuario)
);

CREATE TABLE hardware (
	idHardware INT PRIMARY KEY AUTO_INCREMENT,
	fabricante VARCHAR(100) NOT NULL,
	modelo VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    especificidade VARCHAR(100),
    fkTipoHardware INT, CONSTRAINT hardFkTipoHard FOREIGN KEY (fkTipoHardware)
		REFERENCES tipoHardware(idTipoHardware)
);

CREATE TABLE maquina (
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	SO VARCHAR(75) NOT NULL,
	emUso TINYINT NOT NULL,
	fkInstituicao INT, CONSTRAINT maqFkInst FOREIGN KEY (fkInstituicao)
		REFERENCES instituicao(idInstituicao)
);
  
CREATE TABLE strike (
	idStrike INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME NOT NULL,
    validade TINYINT NOT NULL,
    motivo VARCHAR(255) DEFAULT 'Sem motivo definido',
    duracao INT NOT NULL,
    fkMaquina INT, CONSTRAINT strikFkMaq FOREIGN KEY (fkMaquina)
		REFERENCES maquina(idMaquina) ON DELETE CASCADE,
	fkSituacao INT, CONSTRAINT strikFkSit FOREIGN KEY (fkSituacao)
		REFERENCES situacao(idSituacao)
);
  
  CREATE TABLE componente (
	idComponente INT PRIMARY KEY AUTO_INCREMENT,
	max INT NOT NULL DEFAULT 85,
    fkMaquina INT, CONSTRAINT compFkMaq FOREIGN KEY (fkMaquina)
		REFERENCES maquina(idMaquina) ON DELETE CASCADE,
	fkHardware INT, CONSTRAINT compFkHard FOREIGN KEY (fkHardware)
		REFERENCES hardware(idHardware)
);

CREATE TABLE permissao (
	idPermissao INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
    emUso BOOLEAN NOT NULL,
    duracaoStrikePadrao INT,
    fkAtuacao INT, CONSTRAINT permFkAtuac FOREIGN KEY (fkAtuacao)
		REFERENCES atuacao(idAtuacao),
    fkUsuario INT, CONSTRAINT permFKUsu FOREIGN KEY (fkUsuario)
		REFERENCES usuario(idUsuario)
);

CREATE TABLE historico (
	idHistorico INT PRIMARY KEY AUTO_INCREMENT,
	dataHora DATETIME NOT NULL,
	consumo DOUBLE NOT NULL,
	fkMaquina INT, CONSTRAINT histFkMaq FOREIGN KEY (fkMaquina)
		REFERENCES maquina(idMaquina) ON DELETE CASCADE,
	fkHardware INT, CONSTRAINT histFkHard FOREIGN KEY (fkHardware)
		REFERENCES hardware(idHardware),
	fkComponente INT, CONSTRAINT histFkComp FOREIGN KEY (fkComponente)
		REFERENCES componente(idComponente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE historicoProcesso (
	idHistoricoProcesso INT PRIMARY KEY AUTO_INCREMENT,
    enderecoProcesso VARCHAR(200) NOT NULL,
    fkHistorico INT, CONSTRAINT histProcFkHist FOREIGN KEY (fkHistorico)
		REFERENCES historico(idHistorico) ON DELETE CASCADE,
	fkProcesso INT, CONSTRAINT histProcFkProc FOREIGN KEY (fkProcesso)
		REFERENCES processo(idProcesso) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE permissaoProcesso (
	idPermissaoProcesso INT PRIMARY KEY AUTO_INCREMENT,
	fkProcesso INT NOT NULL,
	fkPermissao INT NOT NULL,
    dataAlocacao DATETIME NOT NULL,
	CONSTRAINT permProcFkProc FOREIGN KEY (fkProcesso) 
		REFERENCES processo (idProcesso),
	CONSTRAINT permProcFkPerm FOREIGN KEY (fkPermissao)
		REFERENCES permissao (idPermissao)
);

-- EXCLUIR BANCO
-- drop database magister;

-- dados mocados para teste java

select * from usuario;

-- INSERTS TIPOUSUARIO
INSERT INTO tipoUsuario (tipoUsuario) VALUES 
	('ADM Nowl'),
    ('ADM da Instituição'),
    ('Professor');
    
-- INSERTS SITUACAO
INSERT INTO situacao (situacao) VALUES 
	('Ativo'),
    ('Inativo'),
    ('Válido'),
    ('Inválido');

-- INSERTS MEDIDA
INSERT INTO medida (nome, unidade) VALUES
	('Gigahertz', 'GHz'),
	('Gigabyte', 'GB');

-- INSERTS INSTITUICAO
INSERT INTO instituicao (nome, sigla, codigoHex) VALUES
	('Nowl', 'nowl', '000000'),
	('São Paulo Tech School', 'SPTech', 'ABC123'),
	('Universidade São Paulo', 'USP', '456FED'),
	('ETEC de Guaianases', 'ETG', '123456'),
	('Escola Técnica de Informática', 'ETI', '7890AB'),
	('Instituto de Tecnologia e Informação', 'ITI', 'CDEF01'),
	('Faculdade de Ciências da Computação', 'FCC', '234567'),
	('Centro de Ensino de Tecnologia Avançada', 'CETA', '89ABCD');


-- INSERTS PROCESSO
INSERT INTO processo (nomeProcesso, nomeAplicativo) VALUES
	('Google Chrome', 'chrome.exe'),
	('MySQL Workbench', 'MySQLWorkbench.exe'),
    ('Visual Studio', 'devenv.exe'),
    ('NetBeans', 'netbeans.exe'),
    ('Sublime Text', 'sublime_text.exe'),
    ('Atom', 'atom.exe'),
    ('PyCharm', 'pycharm.exe'),
    ('WebStorm', 'webstorm.exe'),
    ('Notepad++', 'notepad++.exe'),
    ('NetBeans', 'netbeans64.exe'),
    ('Code::Blocks', 'codeblocks.exe'),
    ('Spyder', 'spyder.exe');


    
-- INSERTS ATUACAO
INSERT INTO atuacao (nome, descricao) VALUES
	('Conversar com aluno', 'Nenhuma ação com a máquina monitorada, o instrutor irá conversar com o aluno sobre a situação.'),
	('Pop up', 'Notificar o aluno com uma imagem em sua tela e um som de notificação.'),
	('Alarme', 'Um efeito sonoro de alarme será soado na máquina.');

-- INSERTS TIPOHARDWARE
INSERT INTO tipoHardware (tipo, fkMedida) VALUES
	('Disco', 2),
	('Processador', 1),
	('RAM', 2);

-- INSERTS USUARIO
INSERT INTO usuario (nome, email, senha, fkInstituicao, fkTipoUsuario) VALUES
	('Jhulia Cristina', 'jhulia.silva@sptech.school', 'Salada123@', 1, 1),
	('Will Dantas Adolpho', 'will.adolpho@sptech.school', 'SelokoPai69#', 2, 2),
	('João Gabriel', 'joao.gabriel@sptech.school', 'Salada123@', 2, 2),
	('Yuri Martins', 'yuri.silva@pwc.com', 'WorkForce@23', 4, 3),
	('Tiago Alves', 'tiago.asilva@sptech.school', 'WorkForce@23', 2, 3),
	('Caua Gustavo de Souza Mesquita', 'caua.web.data.viz.gustavo.de.souza.mesquita@gmail.com', 'DataAqcuIno69@', 1, 1),
    ('Naruto Uzumaki', 'naruto.uzumaki@sptech.school', 'Rasengan123@', 3, 2),
    ('Sasuke Uchiha', 'sasuke.uchiha@sptech.school', 'Sharingan456@', 1, 2),
    ('Sakura Haruno', 'sakura.haruno@sptech.school', 'CherryBlossom789@', 4, 3),
    ('Kakashi Hatake', 'kakashi.hatake@sptech.school', 'SharinganSenseiABC@', 5, 3),
    ('Hinata Hyuga', 'hinata.hyuga@sptech.school', 'Byakugan123@', 3, 2),
    ('Rock Lee', 'rock.lee@sptech.school', 'DynamicEntry456@', 1, 2),
    ('Neji Hyuga', 'neji.hyuga@sptech.school', 'GentleFist789@', 4, 3),
    ('Tenten', 'tenten@sptech.school', 'WeaponMasterABC@', 5, 3),
	('caua', 'caua@gmail.com', 'caua', 4, 1);



-- INSERTS HARDWARE
INSERT INTO hardware (fabricante, modelo, capacidade, especificidade, fkTipoHardware) VALUES
	('Intel', 'i5-10400F', 3.3, 'Quad-core', 3),
	('Kingston', ' Fury Beast', 8, 'DDR4', 2),
	('Seagate', 'Barracuda', 2048, 'HD', 1),
	('TGT', 'Egon T2', 256, 'SSD', 1),
    ('AMD', 'Ryzen 5 5600X', 4.6, 'Hexa-core', 3),
    ('Crucial', 'MX500', 1000, 'SSD', 1),
    ('Western Digital', 'Black', 4000, 'HD', 1),
    ('NVIDIA', 'GeForce RTX 3070', 8, 'GPU', 3),
    ('Intel', 'i9-11900K', 5.3, 'Octa-core', 3),
    ('G.Skill', 'Trident Z', 32, 'DDR4', 2),
    ('Samsung', '860 EVO', 2000, 'SSD', 1),
    ('ASUS', 'ROG Strix', 12, 'GPU', 2),
    ('Corsair', 'Vengeance RGB Pro', 16, 'DDR4', 2),
    ('Seagate', 'FireCuda', 500, 'SSD', 1);


-- INSERTS MAQUINA
-- Inserir registros na tabela maquina com fkUsuario e fkHardware
-- INSERTS MAQUINA
INSERT INTO maquina (nome, SO, emUso, fkInstituicao) VALUES
	('Desktop-G7205', 'Windows 10', 0, 1),
	('Desktop-G1234', 'Windows 11', 0, 1),
	('Desktop-F5412', 'Linux Ubuntu', 0, 1),
	('Desktop-C9436', 'Arch Linux', 0, 1),
	('Laptop-XB350', 'Windows 10', 0, 1),
	('Workstation-HP123', 'Windows 11', 0, 2),
	('Server-UBT600', 'Linux Ubuntu', 0, 2),
	('Desktop-AL2022', 'Arch Linux', 0, 2),
	('Laptop-Dell555', 'Windows 10', 0, 2),
	('Workstation-ASUS', 'Windows 11', 0, 3),
	('Server-RedHat', 'Red Hat Enterprise Linux', 0, 3),
	('Desktop-IBM2023', 'Fedora', 0, 3),
	('Laptop-HP1122', 'Ubuntu', 0, 3),
	('Workstation-Lenovo', 'Debian', 0, 4);


    -- INSERT STRIKES
-- INSERTS STRIKE
-- INSERTS STRIKE
-- INSERTS STRIKE
-- INSERT INTO strike (dataHora, validade, motivo, duracao, fkMaquina, fkSituacao) VALUES
-- ('2023-07-05 17:42:57', 1, 'Tentativa de fechamento do processo', 300, 1, 3),
-- ('2023-11-05 14:30:00', 1, 'Acessando abas acima de 18 anos', 60, 1, 2),
-- ('2023-11-05 15:45:00', 0, 'Vendo Naruto no meio da aula', 120, 2, 3),
-- ('2023-11-06 10:15:00', 1, 'Uso indevido', 90, 2, 2),
-- ('2023-11-07 14:30:00', 0, 'Acessando sites bloqueados', 60, 3, 3),
-- ('2023-11-08 16:45:00', 1, 'Downloads não autorizados', 120, 4, 2),
-- ('2023-11-05 15:45:00', 0, 'Vendo Naruto no meio da aula', 120, 5, 3),
-- ('2023-11-06 10:15:00', 1, 'Uso indevido', 90, 7, 2),
-- ('2023-11-07 14:30:00', 0, 'Acessando sites bloqueados', 60, 10, 3),
-- ('2023-11-08 16:45:00', 1, 'Downloads não autorizados', 120, 10, 2),
-- ('2023-11-09 09:30:00', 1, 'Assistindo jogo do Flamengo', 60, 11, 2),
-- ('2023-11-09 10:45:00', 0, 'Conversando com Luigi Tadeu', 120, 15, 3);


    
-- INSERTS COMPONENTE
INSERT INTO componente (max, fkMaquina, fkHardware) VALUES
	(default, 1, 1),
	(default, 1, 2),
	(default, 1, 3),
	(85, 1, 4),
	(default, 1, 7),

	(default, 2, 1),
	(80, 2, 2),
	(default, 2, 4),
	(90, 2, 5),
	(default, 2, 7),
	
	(90, 3, 1),
	(90, 3, 2),
	(95, 3, 3),
	(90, 3, 4),
	(default, 3, 6),
	(85, 3, 7),
	
	(default, 4, 1),
	(default, 4, 2),
	(default, 4, 3),
	
	(default, 5, 1),
	(default, 5, 2),
	(default, 5, 3),

	(default, 6, 1),
	(80, 6, 2),
	(default, 6, 4),

	(90, 7, 1),
	(90, 7, 2),
	(95, 7, 3),
	(90, 7, 4),
	(default, 7, 6),
	(85, 7, 7),

	(default, 8, 1),
	(default, 8, 2),
	(default, 8, 3),

	(default, 9, 1),
	(default, 9, 2),
	(default, 9, 3),

	(default, 10, 1),
	(default, 10, 2),
	(default, 10, 3),

	(default, 11, 1),
	(default, 11, 2),
	(default, 11, 3),

	(default, 12, 1),
	(default, 12, 2),
	(default, 12, 3),

	(default, 13, 1),
	(default, 13, 2),
	(default, 13, 3),

	(default, 14, 1),
	(80, 14, 2),
	(default, 14, 4);


-- INSERTS PERMISSAO
INSERT INTO permissao (nome, emUso, duracaoStrikePadrao, fkAtuacao, fkUsuario)
VALUES 
  ('Aula de Programação Java', true, 30, 1, 1),
  ('Aula de Banco de Dados SQL', false, 60, 2, 2),
  ('Aula de Desenvolvimento Web', true, 45, 1, 3),
  ('Aula de Estrutura de Dados', false, 30, 2, 4),
  ('Aula de Sistemas Operacionais', true, 60, 1, 5),
  ('Aula de Redes de Computadores', false, 45, 2, 6),
  ('Aula de Engenharia de Software', true, 30, 1, 7),
  ('Aula de Interface Gráfica', false, 60, 2, 8),
  ('Aula de Testes de Software', true, 45, 1, 9),
  ('Aula de Mobile App Development', false, 30, 2, 10);

  
-- INSERTS HISTORICO
-- INSERT INTO historico (dataHora, consumo, fkComponente, fkHardware, fkMaquina) VALUES
-- 	('2023-08-23 12:17:30', .5, 1, 1, 2),
-- 	('2023-08-23 12:17:35', .6, 1, 1, 2),
-- 	('2023-08-23 12:17:40', 1.1, 1, 1, 2),
-- 	('2023-08-23 12:17:30', .5, 1, 2, 2),
-- 	('2023-08-23 12:17:35', 1.1, 1, 2, 2),
-- 	('2023-08-23 12:17:40', 1.4, 1, 2, 2),
-- 	('2023-08-23 12:17:30', 200, 1, 3, 2),
-- 	('2023-08-23 12:17:35', 200, 1, 3, 2),
-- 	('2023-08-23 12:17:40', 245, 1, 3, 2),
--   ('2023-08-23 12:17:30', .5, 1, 1, 2),
--   ('2023-08-23 12:17:35', .6, 1, 1, 2),
--   ('2023-08-23 12:17:40', 1.1, 1, 1, 2),
--   ('2023-08-23 12:17:30', .5, 1, 2, 2),
--   ('2023-08-23 12:17:35', 1.1, 1, 2, 2),
--   ('2023-08-23 12:17:40', 1.4, 1, 2, 2),
--   ('2023-08-23 12:17:30', 200, 1, 3, 2),
--   ('2023-08-23 12:17:35', 200, 1, 3, 2),
--   ('2023-08-23 12:17:40', 245, 1, 3, 2);


-- INSERTS HISTORICOPROCESSO
-- INSERT INTO historicoProcesso (enderecoProcesso, fkHistorico, fkProcesso) VALUES
-- 	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 1, 1),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 1, 2),
-- 	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 2, 1),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 2, 2),
-- 	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 3, 1),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 3, 2),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 4, 2),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 5, 2),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 6, 2),
-- 	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 4, 1),
-- 	('C:\Program Files\Microsoft Office\Office16\WINWORD.EXE', 5, 1),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 4, 2),
-- 	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 5, 2),
-- 	('D:\Program Files\Adobe\Acrobat\Acrobat.exe', 6, 3),
-- 	('D:\Program Files\Adobe\Acrobat\Acrobat.exe', 7, 3),
-- 	('C:\Program Files\Visual Studio Code\Code.exe', 8, 4),
-- 	('C:\Program Files\Visual Studio Code\Code.exe', 9, 4);


-- INSERTS PERMISSAOPROCESSO
INSERT INTO permissaoProcesso (dataAlocacao, fkPermissao, fkProcesso) VALUES
	('2012-12-12 00:00:00', 1, 1),
	('2012-12-12 00:00:25', 1, 2),
	('2021-07-15 00:00:25', 2, 2),
	('2023-03-27 00:00:25', 3, 1),
	('2023-08-23 12:00:00', 4, 1),
	('2023-08-23 12:00:45', 5, 1),
	('2023-08-23 12:01:30', 6, 2),
	('2023-08-23 12:02:15', 7, 2),
	('2023-08-23 12:03:00', 8, 3),
	('2023-08-23 12:03:45', 9, 3);
    
    
    
    -- SELECT PARA PORCENTAGEM DE MAQUINAS ACIMA DO DISCO
   SELECT
    (SELECT COUNT(*) FROM maquina) AS total_maquinas,
    (SELECT COUNT(*) FROM componente c
     JOIN hardware h ON c.fkHardware = h.idHardware
     WHERE h.capacidade > c.max) AS maquinas_acima_limite,
    (SELECT COUNT(*) FROM componente c
     JOIN hardware h ON c.fkHardware = h.idHardware
     WHERE h.capacidade > c.max) / (SELECT COUNT(*) FROM maquina) * 100 AS porcentagem_acima_limite_disco;



-- SELECT PARA VER PORCENTAGEM DE STRIKES DAS MAQUINAS
SELECT
    (SELECT COUNT(*) FROM maquina) AS total_maquinas,
    (SELECT COUNT(DISTINCT fkMaquina) FROM strike) AS maquinas_com_strikes,
    (SELECT COUNT(DISTINCT fkMaquina) FROM strike) / (SELECT COUNT(*) FROM maquina) * 100 AS porcentagem_maquinas_com_strikes;
    
    
    
-- SELECT PARA VER PORCENTAGEM DE ALERTAS DAS MÁQUINAS
SELECT
    (SELECT COUNT(*) FROM maquina) AS total_maquinas,
    (SELECT COUNT(DISTINCT fkMaquina) FROM historico) AS maquinas_com_alertas,
    (SELECT COUNT(DISTINCT fkMaquina) FROM historico) / (SELECT COUNT(*) FROM maquina) * 100 AS porcentagem_maquinas_com_alertas;





-- SELECT PARA VER QUANTOS STRIKES TEVE NA SEMANA
SELECT COUNT(*) AS total_strikes_semana
FROM strike
WHERE YEARWEEK(dataHora, 1) = YEARWEEK(NOW(), 1);



-- SELECT PARA VER O DIA QUE HOUVE MAIS STRIKES
SELECT DATE(dataHora) AS Dia, COUNT(*) AS TotalStrikes
FROM strike
GROUP BY Dia
ORDER BY TotalStrikes DESC
LIMIT 1;


-- SELECT PRA VER QUANTOS STRIKES TEVE NA SEMANA, NO 1 MES, NO 3 MES E NO 6 MES
SELECT COUNT(*) AS strikes_semana
FROM strike
WHERE dataHora >= DATE_SUB(NOW(), INTERVAL 7 DAY);

SELECT COUNT(*) AS strikes_primeiro_mes
FROM strike
WHERE dataHora >= DATE_SUB(NOW(), INTERVAL 1 MONTH);

SELECT COUNT(*) AS strikes_terceiro_mes
FROM strike
WHERE dataHora >= DATE_SUB(NOW(), INTERVAL 3 MONTH);

SELECT COUNT(*) AS strikes_sexto_mes
FROM strike
WHERE dataHora >= DATE_SUB(NOW(), INTERVAL 6 MONTH);


-- SELECT AUTOMATIZADO PARA VER A MAQUINA QUE ESTÁ COM MAIS DEFEITO DE ACORDO NOME DA MAQUINA,COM NUMERO DE STRIKES E NUMERO DE ALERTAS
SELECT m.nome AS nome_maquina, 
        IFNULL(s.strikes, 0) AS numero_strikes, 
        IFNULL(a.alertas, 0) AS numero_alertas
 FROM maquina m
 LEFT JOIN (
     SELECT fkMaquina, COUNT(*) AS strikes
     FROM strike
     WHERE DATEDIFF(NOW(), dataHora) <= 7
     GROUP BY fkMaquina
 ) s ON m.idMaquina = s.fkMaquina
 LEFT JOIN (
     SELECT fkMaquina, COUNT(*) AS alertas
     FROM strike
     WHERE DATEDIFF(NOW(), dataHora) <= 7
     GROUP BY fkMaquina
 ) a ON m.idMaquina = a.fkMaquina
 ORDER BY (s.strikes + a.alertas) DESC
 LIMIT 1;
 
-- SELECT PARA MAQUINAS QUE MAIS USARAM RAM E CPU NA SEMANA
SELECT m.nome AS nome_maquina,
    AVG(CASE WHEN h.fkHardware = 1 THEN h.consumo ELSE 0 END) AS uso_medio_cpu,
    AVG(CASE WHEN h.fkHardware = 2 THEN h.consumo ELSE 0 END) AS uso_medio_ram
FROM maquina m
JOIN historico h ON m.idMaquina = h.fkMaquina
WHERE h.dataHora >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
GROUP BY m.idMaquina, m.nome
ORDER BY uso_medio_cpu DESC, uso_medio_ram DESC
LIMIT 10;

-- SELECT DA QUANTIDADE DE STRIKES POR MÁQUINA (ID apenas)
        SELECT
            m.idMaquina as id,
            m.nome AS nome,
            m.emUso AS emUso,
            m.SO AS so,
            (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) AS qtdStrikes
        FROM maquina m
        LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
        JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
        WHERE idInstituicao = 1 
        GROUP BY m.idMaquina;
        
SELECT 
    m.idMaquina as id,
    m.nome as nome,
    m.so as so,
    m.emUso as emUso,
    (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 3 AND idMaquina = m.idMaquina LIMIT 1) 
    as capacidadeRam,
    (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 2 AND idMaquina = m.idMaquina LIMIT 1) 
    as capacidadeCPU,
    (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware WHERE fkTipoHardware = 1 AND idMaquina = m.idMaquina LIMIT 1) 
    as capacidadeDisco,
    (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE()) as quantidadeStrikes,
    (SELECT COUNT(*) FROM historico WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE() AND consumo > (SELECT max FROM componente WHERE fkMaquina = m.idMaquina AND fkHardware = 3)) as quantidadeAlertas
FROM maquina m
WHERE
    m.idMaquina = 2
LIMIT 1;


SELECT 
    (SELECT COUNT(idStrike) FROM strike
     JOIN maquina ON strike.fkMaquina = maquina.idMaquina
     WHERE WEEK(dataHora) = WEEK(CURDATE()) AND fkInstituicao = 1) as strikesNaSemana,

    (SELECT COUNT(idHistorico) FROM historico
     JOIN maquina ON historico.fkMaquina = maquina.idMaquina
     WHERE WEEK(dataHora) = WEEK(CURDATE()) AND fkInstituicao = 1) as alertasNaSemana,

    (SELECT COUNT(DISTINCT m.idMaquina) AS totalMaquinas
     FROM maquina m
     WHERE m.fkInstituicao = 1) AS totalMaquinas,

    (SELECT COUNT(DISTINCT m.idMaquina) AS maquinasComStrike
     FROM maquina m
     JOIN strike s ON m.idMaquina = s.fkMaquina
     WHERE WEEK(s.dataHora) = WEEK(CURDATE()) AND m.fkInstituicao = 1) AS maquinasComStrike,

    (SELECT COUNT(DISTINCT m.idMaquina) AS maquinasSemStrike
    FROM maquina m
    LEFT JOIN strike s ON m.idMaquina = s.fkMaquina AND WEEK(s.dataHora) = WEEK(CURDATE())
    WHERE s.fkMaquina IS NULL AND m.fkInstituicao = 1) AS maquinasSemStrike,
    
    (SELECT ROUND(COALESCE((COUNT(DISTINCT CASE WHEN s.idStrike IS NOT NULL AND WEEK(s.dataHora) = WEEK(CURDATE()) THEN m.idMaquina END) / COUNT(DISTINCT m.idMaquina)) * 100.0, 0), 1) AS porcentagemComStrike
	 FROM maquina m
	 LEFT JOIN strike s ON m.idMaquina = s.fkMaquina
	 WHERE m.fkInstituicao = 1) AS porcentagemComStrike,
    (SELECT COUNT(DISTINCT m.idMaquina) AS maquinasComAlerta
FROM maquina m
WHERE EXISTS (
    SELECT 1
    FROM historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    WHERE m.idMaquina = h.fkMaquina
        AND c.fkHardware = 3
        AND h.consumo > c.max
        AND DATE(h.dataHora) = CURDATE()
)
AND m.fkInstituicao = 2) AS maquinasComAlerta,
(SELECT COUNT(DISTINCT m.idMaquina) AS maquinasSemAlerta
FROM maquina m
WHERE NOT EXISTS (
    SELECT 1
    FROM historico h
    JOIN componente c ON h.fkComponente = c.idComponente
    WHERE m.idMaquina = h.fkMaquina
        AND c.fkHardware = 3
        AND h.consumo > c.max
        AND DATE(h.dataHora) = CURDATE()
)
AND DATE((SELECT MAX(dataHora) FROM historico WHERE fkMaquina = m.idMaquina)) = CURDATE()
AND m.fkInstituicao = 2) AS maquinasSemAlerta,
(SELECT ROUND(COALESCE((COUNT(DISTINCT CASE WHEN h.consumo > c.max AND DATE(h.dataHora) = CURDATE() THEN m.idMaquina END) / COUNT(DISTINCT m.idMaquina)) * 100.0, 0), 1) AS porcentagemComAlerta
FROM maquina m
LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
LEFT JOIN componente c ON m.idMaquina = c.fkMaquina AND c.fkHardware = 3
WHERE m.fkInstituicao = 2) AS porcentagemComAlerta;

    
SELECT COUNT(DISTINCT m.idMaquina) AS maquinasSemAlerta
FROM maquina m
WHERE m.fkInstituicao = 1
    AND NOT EXISTS (
        SELECT 1
        FROM historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        WHERE m.idMaquina = h.fkMaquina
            AND c.fkHardware = 3
            AND h.consumo > c.max
            AND DATE(h.dataHora) = CURDATE()
            AND h.dataHora = (SELECT MAX(dataHora) FROM historico WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE())
    )
    OR DATE((SELECT MAX(dataHora) FROM historico WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE())) <> CURDATE();

SELECT COUNT(DISTINCT m.idMaquina) AS maquinasComAlerta
FROM maquina m
JOIN historico h ON m.idMaquina = h.fkMaquina
JOIN componente c ON h.fkComponente = c.idComponente
WHERE m.fkInstituicao = 2
    AND c.fkHardware = 3
    AND h.consumo > c.max
    AND DATE(h.dataHora) = CURDATE()
    AND h.dataHora = (SELECT MAX(dataHora) FROM historico WHERE fkMaquina = m.idMaquina AND DATE(dataHora) = CURDATE());


select * from maquina where fkInstituicao = 2;


SELECT
            m.idMaquina AS fkMaquina,
            m.nome AS nomeMaquina,
            COUNT(DISTINCT s.idStrike) AS quantidadeStrikes,
            COUNT(DISTINCT CASE WHEN h.consumo > 80 THEN h.idHistorico END) AS quantidadeAlertas,
            
            RANK() OVER (ORDER BY COUNT(DISTINCT CASE WHEN h.consumo > 80 THEN h.idHistorico END) DESC) AS ranking
        FROM
            maquina m
        LEFT JOIN strike s ON m.idMaquina = s.fkMaquina
        LEFT JOIN historico h ON m.idMaquina = h.fkMaquina AND h.consumo > 80
        WHERE
            m.fkInstituicao = 1
        GROUP BY
            m.idMaquina
        HAVING
            quantidadeStrikes > 0 OR quantidadeAlertas > 0
        ORDER BY
            ranking
        LIMIT 5;
SELECT ROUND(COALESCE((COUNT(DISTINCT CASE WHEN h.consumo > 80 THEN m.idMaquina END) / COUNT(DISTINCT CASE WHEN DATE(h.dataHora) = CURDATE() THEN m.idMaquina END)) * 100.0, 0), 1) AS porcentagemComAlerta
 FROM maquina m
 LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
 WHERE h.fkMaquina IS NOT NULL AND h.consumo > 80 AND DATE(h.dataHora) = CURDATE() AND m.fkInstituicao = 1;


insert into historico values (null, now(), 10, 2, 1, 6),
(null, now(), 10, 2, 2, 7),
(null, now(), 10, 2, 4, 8);

select * from historico ;

select * from componente;
select * from tipohardware;

use magister;
select * from strike;
select * from situacao;

SELECT COUNT(DISTINCT m.idMaquina) AS maquinasComAlerta
FROM maquina m
JOIN historico h ON m.idMaquina = h.fkMaquina
JOIN hardware hw ON h.fkHardware = hw.idHardware
JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
WHERE m.fkInstituicao = 1
AND DATE(h.dataHora) = CURDATE() 
AND (
    (th.tipo = 'Processador' AND h.consumo > 80 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'Processador')) OR
    (th.tipo = 'RAM' AND h.consumo > 80 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'RAM')) OR
    (th.tipo = 'Disco' AND h.consumo > 80 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'Disco'))
);

SELECT COUNT(DISTINCT m.idMaquina) AS maquinasSemAlerta
FROM maquina m
LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
LEFT JOIN hardware hw ON h.fkHardware = hw.idHardware
LEFT JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
WHERE m.fkInstituicao = 1
AND DATE(h.dataHora) = CURDATE()  -- Adicionando a condição para a data de hoje
AND (
    (th.tipo = 'Processador' AND (h.consumo IS NULL OR (h.consumo <= 80 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'Processador')))) OR
    (th.tipo = 'RAM' AND (h.consumo IS NULL OR (h.consumo <= 80 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'RAM')))) OR
    (th.tipo = 'Disco' AND (h.consumo IS NULL OR (h.consumo <= 80 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'Disco'))))
);



 SELECT 
    (SELECT COUNT(idStrike) FROM strike
    JOIN maquina ON strike.fkMaquina = maquina.idMaquina
    WHERE YEARWEEK(dataHora, 1) = YEARWEEK(CURDATE(), 1) AND fkInstituicao = 1) as strikesNaSemana,

    (SELECT COUNT(idHistorico) FROM historico
    JOIN maquina ON historico.fkMaquina = maquina.idMaquina
    WHERE YEARWEEK(dataHora, 1) = YEARWEEK(CURDATE(), 1) AND fkInstituicao = 1) as alertasNaSemana,

    (SELECT COUNT(DISTINCT m.idMaquina) AS totalMaquinas
     FROM maquina m
     WHERE m.fkInstituicao = 1) AS totalMaquinas,

     (SELECT COUNT(DISTINCT m.idMaquina) AS maquinasComStrike
     FROM maquina m
     JOIN strike s ON m.idMaquina = s.fkMaquina
     WHERE DATE(s.dataHora) = CURDATE() AND s.fkSituacao = 1 AND m.fkInstituicao = 1) as maquinasComStrike,
    
     (SELECT COUNT(DISTINCT m.idMaquina) AS maquinasComAlerta
     FROM maquina m
     JOIN historico h ON m.idMaquina = h.fkMaquina
     JOIN hardware hw ON h.fkHardware = hw.idHardware
     JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
     WHERE m.fkInstituicao = 1
     AND DATE(h.dataHora) = CURDATE() 
     AND (
         (th.tipo = 'Processador' AND h.consumo > 70 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'Processador')) OR
         (th.tipo = 'RAM' AND h.consumo > 70 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'RAM')) OR
         (th.tipo = 'Disco' AND h.consumo > 70 AND h.idHistorico = (SELECT MAX(idHistorico) FROM historico WHERE fkMaquina = m.idMaquina AND tipo = 'Disco'))
     )
     ) AS maquinasComAlerta;
     
     
     
                SELECT 
            h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'Disco' AND h.fkMaquina = 4
            AND DATE(h.dataHora) = CURDATE() 
        ORDER BY dataHora DESC
        LIMIT 1;
        
        
        SELECT 
            h.idHistorico, DATE_FORMAT(h.dataHora, "%H:%i:%s") as dataHora, h.consumo, c.max as maxConsumo, th.tipo 
        FROM 
            historico h
        JOIN componente c ON h.fkComponente = c.idComponente
        JOIN hardware hw ON c.fkHardware = hw.idHardware
        JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
        WHERE
            th.tipo = 'Processador' AND h.fkMaquina = 4
        ORDER BY dataHora DESC
        LIMIT 8;
        
SELECT
        m.idMaquina AS fkMaquina,
        m.nome AS nomeMaquina,
        COUNT(DISTINCT s.idStrike) AS quantidadeStrikes,
        COUNT(DISTINCT CASE WHEN h.consumo > 70 THEN h.idHistorico END) AS quantidadeAlertas,
        
        RANK() OVER (ORDER BY COUNT(DISTINCT CASE WHEN h.consumo > 80 THEN h.idHistorico END) DESC) AS ranking
    FROM
        maquina m
    LEFT JOIN strike s ON m.idMaquina = s.fkMaquina
    LEFT JOIN historico h ON m.idMaquina = h.fkMaquina AND h.consumo > 70
    WHERE
        m.fkInstituicao = 1
        AND YEARWEEK(h.dataHora, 1) = YEARWEEK(CURDATE(), 1)  -- Filtrar pela semana atual
    GROUP BY
        m.idMaquina
    HAVING
        quantidadeStrikes > 0 OR quantidadeAlertas > 0
    ORDER BY
        ranking
    LIMIT 5;
    
SELECT
    m.idMaquina as id,
    m.nome AS nome,
    m.emUso AS emUso,
    m.SO AS so,
    (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) AS qtdStrikes,
    CASE
    WHEN (
        SELECT consumo
        FROM historico h
        WHERE h.fkMaquina = m.idMaquina
          AND h.fkComponente IN (
              SELECT idComponente
              FROM componente
              WHERE fkHardware IN (
                  SELECT idHardware
                  FROM hardware
                  WHERE fkTipoHardware IN (
                      SELECT idTipoHardware
                      FROM tipoHardware
                      WHERE tipo = 'RAM'
                  )
              )
          )
        ORDER BY h.dataHora DESC
        LIMIT 1
    ) >= 85 THEN 'Crítico'
    WHEN (
        SELECT consumo
        FROM historico h
        WHERE h.fkMaquina = m.idMaquina
          AND h.fkComponente IN (
              SELECT idComponente
              FROM componente
              WHERE fkHardware IN (
                  SELECT idHardware
                  FROM hardware
                  WHERE fkTipoHardware IN (
                      SELECT idTipoHardware
                      FROM tipoHardware
                      WHERE tipo = 'RAM'
                  )
              )
          )
        ORDER BY h.dataHora DESC
        LIMIT 1
    ) >= 70 THEN 'Alerta'
    ELSE 'Normal'
END AS status
FROM maquina m
JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
WHERE idInstituicao = ${idInstituicao} ${qtdStrikes} ${emUso} ${estado} ${pesquisa}
GROUP BY m.idMaquina
 ${ordAlfabetica};


	SELECT
    m.idMaquina as id,
    m.nome AS nome,
    m.emUso AS emUso,
    m.SO AS so,
    (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina AND fkSituacao IN (1, 3)) AS qtdStrikes,
    (SELECT consumo FROM historico h WHERE h.fkMaquina = m.idMaquina AND h.fkComponente IN (SELECT idComponente FROM componente WHERE fkHardware IN (SELECT idHardware FROM hardware WHERE fkTipoHardware IN (SELECT idTipoHardware FROM tipoHardware WHERE tipo = 'RAM'))) ORDER BY h.dataHora DESC LIMIT 1) AS ultimoConsumoRAM
FROM maquina m
JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
WHERE m.idMaquina = 1;

        
 INSERT INTO historico (dataHora, consumo, fkComponente, fkHardware, fkMaquina) VALUES
 	(now(), 80, 1, 1, 1);

select * from maquina;
select * from componente;
select * from hardware;

INSERT INTO strike (dataHora, validade, motivo, duracao, fkMaquina, fkSituacao) VALUES
  (now(), 1, 'Tentativa de fechamento do processo', 300, 1, 1);
DELETE FROM strike where idStrike = 3;

select * from strike;
select * from historico where fkMaquina = 4;