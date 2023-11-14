CREATE DATABASE magister;
GO

USE magister;
GO

CREATE TABLE tipoUsuario (
idTipoUsuario INT PRIMARY KEY IDENTITY(1,1),
    tipoUsuario VARCHAR(50) NOT NULL
);

CREATE TABLE situacao (
idSituacao INT PRIMARY KEY IDENTITY(1,1),
    situacao VARCHAR(50) NOT NULL
);

CREATE TABLE medida (
idMedida INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(50),
    unidade VARCHAR(5)
);

CREATE TABLE instituicao (
idInstituicao INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(50) NOT NULL,
sigla VARCHAR(30) NOT NULL,
codigoHex CHAR(6) NOT NULL
);

CREATE TABLE processo (
idProcesso INT PRIMARY KEY IDENTITY(1,1),
nomeProcesso VARCHAR(100) NOT NULL,
nomeAplicativo VARCHAR(100) NOT NULL
);

CREATE TABLE atuacao (
idAtuacao INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(75) NOT NULL,
    descricao VARCHAR(200) NOT NULL
);

CREATE TABLE tipoHardware (
idTipoHardware INT PRIMARY KEY IDENTITY(1,1),
    tipo VARCHAR(100) NOT NULL,
    fkMedida INT FOREIGN KEY REFERENCES medida(idMedida)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(20) NOT NULL,
fkInstituicao INT FOREIGN KEY REFERENCES instituicao(idInstituicao),
fkTipoUsuario INT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario)
);

CREATE TABLE hardware (
idHardware INT PRIMARY KEY IDENTITY(1,1),
fabricante VARCHAR(100) NOT NULL,
modelo VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    especificidade VARCHAR(100),
    fkTipoHardware INT FOREIGN KEY REFERENCES tipoHardware(idTipoHardware)
);

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(50),
SO VARCHAR(75) NOT NULL,
emUso TINYINT NOT NULL,
fkInstituicao INT FOREIGN KEY REFERENCES instituicao(idInstituicao)
);
 
CREATE TABLE strike (
idStrike INT PRIMARY KEY IDENTITY(1,1),
    dataHora DATETIME NOT NULL,
    validade TINYINT NOT NULL,
    motivo VARCHAR(255) DEFAULT 'Sem motivo definido',
    duracao INT NOT NULL,
    fkMaquina INT FOREIGN KEY REFERENCES maquina(idMaquina),
fkSituacao INT FOREIGN KEY REFERENCES situacao(idSituacao)
);
 
CREATE TABLE componente (
idComponente INT PRIMARY KEY IDENTITY(1,1),
max INT NOT NULL DEFAULT 85,
    fkMaquina INT FOREIGN KEY REFERENCES maquina(idMaquina),
fkHardware INT FOREIGN KEY REFERENCES hardware(idHardware)
);

CREATE TABLE permissao (
idPermissao INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(45) NOT NULL,
    fkAtuacao INT FOREIGN KEY REFERENCES atuacao(idAtuacao),
    fkUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario)
);

CREATE TABLE historico (
idHistorico INT PRIMARY KEY IDENTITY(1,1),
dataHora DATETIME NOT NULL,
consumo FLOAT NOT NULL,
fkMaquina INT FOREIGN KEY REFERENCES maquina(idMaquina),
fkHardware INT FOREIGN KEY REFERENCES hardware(idHardware),
fkComponente INT FOREIGN KEY REFERENCES componente(idComponente)
);

CREATE TABLE historicoProcesso (
idHistoricoProcesso INT PRIMARY KEY IDENTITY(1,1),
    enderecoProcesso VARCHAR(200) NOT NULL,
    fkHistorico INT FOREIGN KEY REFERENCES historico(idHistorico),
fkProcesso INT FOREIGN KEY REFERENCES processo(idProcesso)
);

CREATE TABLE permissaoProcesso (
idPermissaoProcesso INT PRIMARY KEY IDENTITY(1,1),
fkProcesso INT NOT NULL,
fkPermissao INT NOT NULL,
    dataAlocacao DATETIME NOT NULL,
CONSTRAINT permProcFkProc FOREIGN KEY (fkProcesso)
REFERENCES processo (idProcesso),
CONSTRAINT permProcFkPerm FOREIGN KEY (fkPermissao)
REFERENCES permissao (idPermissao)
);

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
  ('2023-08-23 12:17:45', 5.1, 2, 1, 2);




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
    
    



