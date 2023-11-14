CREATE DATABASE magister;
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
	('caua', 'caua@gmail.com', 'caua', 1, 1);



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
	('Desktop-G7205', 'Windows 10', 1, 1),
	('Desktop-G1234', 'Windows 11', 0, 1),
	('Desktop-F5412', 'Linux Ubuntu', 1, 2),
	('Desktop-C9436', 'Arch Linux', 1, 3),
	('Laptop-XB350', 'Windows 10', 1, 1),
	('Workstation-HP123', 'Windows 11', 0, 1),
	('Server-UBT600', 'Linux Ubuntu', 1, 2),
	('Desktop-AL2022', 'Arch Linux', 1, 3),
	('Laptop-Dell555', 'Windows 10', 0, 2),
	('Workstation-ASUS', 'Windows 11', 1, 2),
	('Server-RedHat', 'Red Hat Enterprise Linux', 1, 1),
	('Desktop-IBM2023', 'Fedora', 0, 4),
	('Laptop-HP1122', 'Ubuntu', 1, 3),
	('Workstation-Lenovo', 'Debian', 0, 4);


    
    
    
    -- INSERT STRIKES
-- INSERTS STRIKE
-- INSERTS STRIKE
INSERT INTO strike (dataHora, validade, motivo, duracao, fkMaquina, fkSituacao) VALUES
('2023-07-05 17:42:57', 1, 'Tentativa de fechamento do processo', 300, 1, 3),
('2023-11-05 14:30:00', 1, 'Acessando abas acima de 18 anos', 60, 1, 2),
('2023-11-05 15:45:00', 0, 'Vendo Naruto no meio da aula', 120, 1, 3),
('2023-11-06 10:15:00', 1, 'Uso indevido', 90, 1, 2),
('2023-11-07 14:30:00', 0, 'Acessando sites bloqueados', 60, 1, 3),
('2023-11-08 16:45:00', 1, 'Downloads não autorizados', 120, 1, 2),
('2023-11-05 14:30:00', 1, 'Acessando abas acima de 18 anos', 60, 6, 2),
('2023-11-05 15:45:00', 0, 'Vendo Naruto no meio da aula', 120, 6, 3),
('2023-11-06 10:15:00', 1, 'Uso indevido', 90, 6, 2),
('2023-11-07 14:30:00', 0, 'Acessando sites bloqueados', 60, 5, 3),
('2023-11-08 16:45:00', 1, 'Downloads não autorizados', 120, 6, 2),
('2023-11-09 09:30:00', 1, 'Assistindo jogo do Flamengo', 60, 6, 2),
('2023-11-09 10:45:00', 0, 'Conversando com Luigi Jadeu', 120, 6, 3);


    



    
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
	(90, 3, 4),
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
INSERT INTO permissao (nome, fkAtuacao, fkUsuario) VALUES
	('Urubu100', 1, 3),
	('Urubu200', 3, 3),
	('Aulinha Java', 2, 4),
('Aula de S.O', 1, 1),
  ('Aula de Análise', 2, 2),
  ('Aula de Sócio', 3, 3),
  ('Aula de Pesquisa Inovação', 1, 1),
  ('Aula de Arq Comp', 2, 2),
  ('Aula de T.I', 3, 3),
  ('Aula de Algoritmo', 1, 1),
  ('Aula de Algoritmo', 2, 2);
  
  
  
-- INSERTS HISTORICO
INSERT INTO historico (dataHora, consumo, fkComponente, fkHardware, fkMaquina) VALUES
	('2023-08-23 12:17:30', .5, 1, 1, 2),
	('2023-08-23 12:17:35', .6, 1, 1, 2),
	('2023-08-23 12:17:40', 1.1, 1, 1, 2),
	('2023-08-23 12:17:30', .5, 1, 2, 2),
	('2023-08-23 12:17:35', 1.1, 1, 2, 2),
	('2023-08-23 12:17:40', 1.4, 1, 2, 2),
	('2023-08-23 12:17:30', 200, 1, 3, 2),
	('2023-08-23 12:17:35', 200, 1, 3, 2),
	('2023-08-23 12:17:40', 245, 1, 3, 2),
  ('2023-08-23 12:17:30', .5, 1, 1, 2),
  ('2023-08-23 12:17:35', .6, 1, 1, 2),
  ('2023-08-23 12:17:40', 1.1, 1, 1, 2),
  ('2023-08-23 12:17:30', .5, 1, 2, 2),
  ('2023-08-23 12:17:35', 1.1, 1, 2, 2),
  ('2023-08-23 12:17:40', 1.4, 1, 2, 2),
  ('2023-08-23 12:17:30', 200, 1, 3, 2),
  ('2023-08-23 12:17:35', 200, 1, 3, 2),
  ('2023-08-23 12:17:40', 245, 1, 3, 2);


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
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 6, 2),
	('C:\Program Files\MySQL\MySQL Workbench 8.0\MySQLWorkbench.exe', 4, 1),
	('C:\Program Files\Microsoft Office\Office16\WINWORD.EXE', 5, 1),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 4, 2),
	('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 5, 2),
	('D:\Program Files\Adobe\Acrobat\Acrobat.exe', 6, 3),
	('D:\Program Files\Adobe\Acrobat\Acrobat.exe', 7, 3),
	('C:\Program Files\Visual Studio Code\Code.exe', 8, 4),
	('C:\Program Files\Visual Studio Code\Code.exe', 9, 4);


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