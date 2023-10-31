CREATE DATABASE magister;
USE magister;

CREATE TABLE tipoUsuario (
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    tipoUsuario VARCHAR(50) NOT NULL
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
    fkMaquina INT, CONSTRAINT strikFkMaq FOREIGN KEY (fkMaquina)
		REFERENCES maquina(idMaquina)
);
  
  CREATE TABLE componente (
	idComponente INT PRIMARY KEY AUTO_INCREMENT,
	max INT NOT NULL DEFAULT 85,
    fkMaquina INT, CONSTRAINT compFkMaq FOREIGN KEY (fkMaquina)
		REFERENCES maquina(idMaquina),
	fkHardware INT, CONSTRAINT compFkHard FOREIGN KEY (fkHardware)
		REFERENCES hardware(idHardware)
);

CREATE TABLE permissao (
	idPermissao INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
    fkUsuario INT, CONSTRAINT permFKUsu FOREIGN KEY (fkUsuario)
		REFERENCES usuario(idUsuario)
);



CREATE TABLE historico (
	idHistorico INT PRIMARY KEY AUTO_INCREMENT,
	dataHora DATETIME NOT NULL,
	consumo DOUBLE NOT NULL,
     qtdJanelasAbertas INT NOT NULL,
	fkMaquina INT, CONSTRAINT histFkMaq FOREIGN KEY (fkMaquina)
		REFERENCES maquina(idMaquina),
	fkHardware INT, CONSTRAINT histFkHard FOREIGN KEY (fkHardware)
		REFERENCES hardware(idHardware),
	fkComponente INT, CONSTRAINT histFkComp FOREIGN KEY (fkComponente)
		REFERENCES componente(idComponente)
);

select * from historico;
select * from usuario;


CREATE TABLE historicoProcesso (
	idHistoricoProcesso INT PRIMARY KEY AUTO_INCREMENT,
    enderecoProcesso VARCHAR(200) NOT NULL,
    fkHistorico INT, CONSTRAINT histProcFkHist FOREIGN KEY (fkHistorico)
		REFERENCES historico(idHistorico),
	fkProcesso INT, CONSTRAINT histProcFkProc FOREIGN KEY (fkProcesso)
		REFERENCES processo(idProcesso)
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

-- dados mocados para teste java

select * from hardware;

-- INSERTS TIPOUSUARIO
INSERT INTO tipoUsuario (tipoUsuario) VALUES 
	('ADM Nowl'),
    ('ADM da Instituição'),
    ('Professor');

-- INSERTS MEDIDA
INSERT INTO medida (nome, unidade) VALUES
	('Gigahertz', 'GHz'),
	('Gigabyte', 'GB');

-- INSERTS INSTITUICAO
INSERT INTO instituicao (nome, sigla, codigoHex) VALUES
	('Nowl', 'nowl', '000000'),
	('São Paulo Tech School', 'SPTech', 'ABC123'),
	('Universidade São Paulo', 'USP', '456FED'),
	('ETEC de Guaianases', 'ETG', '123456');

-- INSERTS PROCESSO
INSERT INTO processo (nomeProcesso, nomeAplicativo) VALUES
	('Google Chrome', 'chrome.exe'),
	('MySQL Workbench', 'MySQLWorkbench.exe');

-- INSERTS TIPOHARDWARE
INSERT INTO tipoHardware (tipo, fkMedida) VALUES
	('Disco', 2),
	('Processador', 1),
	('RAM', 2);

-- INSERTS USUARIO
INSERT INTO usuario (nome, email, senha, fkInstituicao, fkTipoUsuario) VALUES
	('Jhulia Cristina', 'jhulia.silva@sptech.school', 'Salada123@', 1, 1),
	('Will Dantas Adolpho', 'will.adolpho@sptech.school', 'SelokoPai69#', 2, 2),
	('Yuri Martins', 'yuri.silva@pwc.com', 'WorkForce@23', 4, 3),
	('Tiago Alves', 'tiago.asilva@sptech.school', 'WorkForce@23', 2, 3),
	('Caua Gustavo de Souza Mesquita', 'caua.web.data.viz.gustavo.de.souza.mesquita@gmail.com', 'DataAqcuIno69@', 1, 1);

-- INSERTS HARDWARE
INSERT INTO hardware (fabricante, modelo, capacidade, especificidade, fkTipoHardware) VALUES
	('Intel', 'i5-10400F', 3.3, 'Quad-core', 2),
	('Kingston', ' Fury Beast', 8, 'DDR4', 3),
	('Seagate', 'Barracuda', 2048, 'HD', 1),
	('TGT', 'Egon T2', 256, 'SSD', 1);

-- INSERTS MAQUINA
INSERT INTO maquina (nome, SO, emUso, fkInstituicao) VALUES
	('Desktop-G7205', 'Windows 10', 1, 1),
	('Desktop-G1234', 'Windows 11', 0, 1),
	('Desktop-F5412', 'Linux Ubuntu', 1, 2),
	('Desktop-C9436', 'Arch Linux', 1, 3);

INSERT INTO maquina (nome, SO, emUso, fkInstituicao) VALUES
('Desktop-G7205', 'Windows 10', 1, 1),
('Desktop-G1234', 'Windows 11', 0, 1),
('Desktop-F5412', 'Linux Ubuntu', 1, 1),
('Desktop-C9436', 'Arch Linux', 1, 1),
('Desktop-X3456', 'Windows 10', 1, 1),
('Desktop-Y6789', 'Windows 11', 0, 1),
('Desktop-Z0123', 'Linux Ubuntu', 1, 1),
('Desktop-A4567', 'Arch Linux', 1, 1),
('Desktop-B7890', 'Windows 10', 1, 1),
('Desktop-D8901', 'Windows 11', 0, 1),
('Desktop-E2345', 'Linux Ubuntu', 1, 1),
('Desktop-H6789', 'Arch Linux', 1, 1),
('Desktop-I1234', 'Windows 10', 1, 1),
('Desktop-J5678', 'Windows 11', 0, 1),
('Desktop-K9012', 'Linux Ubuntu', 1, 1),
('Desktop-L3456', 'Arch Linux', 1, 1),
('Desktop-M7890', 'Windows 10', 1, 1),
('Desktop-N8901', 'Windows 11', 0, 1),
('Desktop-O2345', 'Linux Ubuntu', 1, 1),
('Desktop-P6789', 'Arch Linux', 1, 1);

-- INSERTS STRIKE
INSERT INTO strike (dataHora, validade, motivo, fkMaquina) VALUES
	('2023-09-23 12:57:00', 1, null, 1),
	('2022-12-12 15:15:15', 0, 'Uso indevido', 9),
	('2023-07-05 17:42:57', 1, 'Tentaviva de fechamento do processo', 6),
	('2023-09-23 12:57:00', 1, null, 7),
	('2022-12-12 15:15:15', 0, 'Uso indevido', 3),
	('2023-07-05 17:42:57', 1, 'Tentativa de fechamento do processo', 8),
	('2023-08-15 14:20:00', 1, 'Uso indevido', 2),
	('2022-11-11 11:11:11', 0, 'Tentativa de acesso não autorizado', 2),
	('2023-06-30 09:30:45', 1, 'Acesso não autorizado', 3),
	('2023-05-25 17:15:00', 1, 'Uso indevido', 4),
	('2022-10-10 10:10:10', 0, 'Tentativa de fechamento do processo', 4),
	('2023-03-03 03:03:03', 1, 'Acesso não autorizado', 4),
	('2023-08-20 09:45:30', 1, 'Uso indevido', 5),
	('2023-07-10 14:30:15', 0, 'Tentativa de acesso não autorizado', 6),
	('2023-06-05 16:20:30', 1, 'Uso indevido', 7),
	('2023-05-10 10:15:00', 1, 'Tentativa de fechamento do processo', 8),
	('2023-04-15 09:30:45', 0, 'Acesso não autorizado', 9),
	('2023-03-20 14:45:30', 1, 'Uso indevido', 10),
	('2023-02-25 16:30:15', 1, 'Tentativa de acesso não autorizado', 11),
	('2023-01-30 10:20:30', 0, 'Acesso não autorizado', 12),
	('2022-12-05 17:15:00', 1, 'Uso indevido', 13),
	('2022-11-10 10:15:15', 1, 'Tentativa de fechamento do processo', 14),
	('2022-10-15 09:30:45', 0, 'Uso indevido', 15),
	('2022-09-20 14:45:30', 1, 'Tentativa de acesso não autorizado', 16),
	('2022-08-25 16:30:15', 1, 'Uso indevido', 17),
	('2022-07-30 10:20:30', 0, 'Tentativa de fechamento do processo', 18),
	('2022-06-05 17:15:00', 1, 'Uso indevido', 1),
	('2022-05-10 10:15:15', 1, 'Tentativa de acesso não autorizado', 20),
	('2022-04-15 09:30:45', 0, 'Acesso não autorizado', 21),
	('2022-03-20 14:45:30', 1, 'Uso indevido', 22),
	('2022-02-25 16:30:15', 1, 'Tentativa de fechamento do processo', 23),
	('2022-01-30 10:20:30', 0, 'Acesso não autorizado', 24),
    ('2022-01-30 10:20:30', 0, 'Acesso não autorizado', 2);

-- INSERTS COMPONENTE
INSERT INTO componente (max, fkMaquina, fkHardware) VALUES
	(default, 1, 1),
	(default, 1, 2),
	(default, 1, 3),
	(default, 2, 1),
	(80, 2, 2),
	(default, 2, 4),
	(90, 3, 1),
	(90, 3, 2),
	(95, 3, 3),
	(90, 3, 4);

-- INSERTS PERMISSAO
INSERT INTO permissao (nome, fkUsuario) VALUES
	('Urubu100', 3),
	('Urubu200', 3),
	('Aulinha Java', 4);

-- INSERTS HISTORICO
select * from historico;
-- INSERTS HISTORICOPROCESSO
INSERT INTO historicoProcesso (enderecoProcesso, fkHistorico, fkProcesso) VALUES
	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 1, 1),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 1, 2),
	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 2, 1),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 2, 2),
	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 3, 1),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 3, 2),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 4, 2),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 5, 2),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 6, 2);

-- INSERTS PERMISSAOPROCESSO
INSERT INTO permissaoProcesso (dataAlocacao, fkPermissao, fkProcesso) VALUES
	('2012-12-12 00:00:00', 1, 1),
	('2012-12-12 00:00:25', 1, 2),
	('2021-07-15 00:00:25', 2, 2),
	('2023-03-27 00:00:25', 3, 1);
    
select * from historico;

SELECT 
	h.idHistorico, DATE_FORMAT(h.dataHora, "%d/%m/%y %H:%i") as dataHora, h.consumo, c.max as maxConsumo
FROM 
	historico h
JOIN componente c ON h.fkComponente = c.idComponente
JOIN hardware hw ON c.fkHardware = hw.idHardware
JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
WHERE
	th.tipo = 'RAM' AND h.fkMaquina = 2
ORDER BY dataHora DESC
LIMIT 10;

SELECT 
	h.idHistorico, DATE_FORMAT(h.dataHora, "%d/%m/%y %H:%i") as dataHora, h.consumo, c.max as maxConsumo, th.tipo 
FROM 
	historico h
JOIN componente c ON h.fkComponente = c.idComponente
JOIN hardware hw ON c.fkHardware = hw.idHardware
JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
WHERE
	th.tipo = 'Processador' AND h.fkMaquina = 2
ORDER BY dataHora DESC
LIMIT 10;

SELECT 
	h.idHistorico, DATE_FORMAT(h.dataHora, "%d/%m/%y %H:%i") as dataHora, h.consumo, c.max as maxConsumo
FROM 
	historico h
JOIN componente c ON h.fkComponente = c.idComponente
JOIN hardware hw ON c.fkHardware = hw.idHardware
JOIN tipoHardware th ON hw.fkTipoHardware = th.idTipoHardware
WHERE
	th.tipo = 'RAM' AND h.fkMaquina = 2
ORDER BY dataHora DESC
LIMIT 1;

-- select de capacidade da maquina
SELECT 
	m.idMaquina as id,
	m.nome as nome,
    m.so as so,
    m.emUso as emUso,
    (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = 1) 
    as capacidadeRAM,
    (SELECT especificidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = 1) 
    as capacidadeCPU,
    (SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = 1) 
    as capacidadeHD
FROM maquina m
JOIN componente c ON c.fkMaquina = m.idMaquina
JOIN hardware ram ON c.fkHardware = ram.idHardware
JOIN hardware cpu ON c.fkHardware = cpu.idHardware
JOIN hardware disco ON c.fkHardware = disco.idHardware
WHERE
	m.idMaquina = 1
LIMIT 1;

-- select de tudo da máquina
	SELECT 
		m.idMaquina as id,
		m.nome as nome,
		m.so as so,
		m.emUso as emUso,
		(SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = 1) 
		as componenteRAM,
		(SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 3 AND idMaquina = 1) 
		as capacidadeRAM,
		(SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = 1) 
		as componenteCPU,
		(SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 2 AND idMaquina = 1) 
		as capacidadeCPU,
		(SELECT concat(fabricante, ' ', modelo, ' ', especificidade) FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = 1) 
		as componenteDisco,
		(SELECT capacidade FROM hardware JOIN componente ON fkHardware = idHardware JOIN maquina ON fkMaquina = idMaquina WHERE fkTipoHardware = 1 AND idMaquina = 1) 
		as capacidadeDisco,
		(SELECT COUNT(*) FROM strike JOIN maquina ON fkMaquina = idMaquina WHERE fkMaquina = 1) as qtdStrikes
	FROM maquina m
	JOIN componente c ON c.fkMaquina = m.idMaquina
	JOIN hardware ram ON c.fkHardware = ram.idHardware
	JOIN hardware cpu ON c.fkHardware = cpu.idHardware
	JOIN hardware disco ON c.fkHardware = disco.idHardware;

SELECT
	CASE
		WHEN MAX(h.consumo) >= 85 THEN 'Crítico'
		WHEN MAX(h.consumo) >= 70 THEN 'Alerta'
		ELSE 'Normal'
	END AS status
FROM maquina m
LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
WHERE idInstituicao = 1 AND (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina) > 1
GROUP BY m.idMaquina;

SELECT idMaquina, nome, (SELECT COUNT(*) FROM strike JOIN maquina ON fkMaquina = idMaquina WHERE idMaquina = 1) as qtdStrikes FROM maquina;

SELECT idMaquina FROM maquina;

        SELECT
            m.idMaquina as id,
            m.nome AS nome,
            m.emUso AS emUso,
            (SELECT COUNT(*) FROM strike WHERE fkMaquina = m.idMaquina) AS qtdStrikes,
            CASE
                WHEN MAX(h.consumo) >= 85 THEN 'Crítico'
                WHEN MAX(h.consumo) >= 70 THEN 'Alerta'
                ELSE 'Normal'
            END AS status
        FROM maquina m
        LEFT JOIN historico h ON m.idMaquina = h.fkMaquina
        JOIN instituicao inst ON inst.idInstituicao = m.fkInstituicao
        WHERE idInstituicao = 1        
        GROUP BY m.idMaquina;
        
        
	SELECT * FROM maquina ORDER BY fkInstituicao;