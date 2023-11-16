-- Criação do banco de dados
CREATE DATABASE magister;
USE magister;

-- Criação das tabelas
CREATE TABLE tipoUsuario (
    idTipoUsuario INT PRIMARY KEY IDENTITY,
    tipoUsuario VARCHAR(50) NOT NULL
);

CREATE TABLE situacao (
    idSituacao INT PRIMARY KEY IDENTITY,
    situacao VARCHAR(50) NOT NULL
);

CREATE TABLE medida (
    idMedida INT PRIMARY KEY IDENTITY,
    nome VARCHAR(50),
    unidade VARCHAR(5)
);

CREATE TABLE instituicao (
    idInstituicao INT PRIMARY KEY IDENTITY,
    nome VARCHAR(50) NOT NULL,
    sigla VARCHAR(30) NOT NULL,
    codigoHex CHAR(6) NOT NULL
);

CREATE TABLE processo (
    idProcesso INT PRIMARY KEY IDENTITY,
    nomeProcesso VARCHAR(100) NOT NULL,
    nomeAplicativo VARCHAR(100) NOT NULL
);

CREATE TABLE atuacao (
    idAtuacao INT PRIMARY KEY IDENTITY,
    nome VARCHAR(75) NOT NULL,
    descricao VARCHAR(200) NOT NULL
);

CREATE TABLE tipoHardware (
    idTipoHardware INT PRIMARY KEY IDENTITY,
    tipo VARCHAR(100) NOT NULL,
    fkMedida INT,
    CONSTRAINT tipoHardFkMed FOREIGN KEY (fkMedida) REFERENCES medida(idMedida)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY IDENTITY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    fkInstituicao INT,
    CONSTRAINT usuFkInst FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao),
    fkTipoUsuario INT,
    CONSTRAINT usuFkTipoUsu FOREIGN KEY (fkTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario)
);

CREATE TABLE hardware (
    idHardware INT PRIMARY KEY IDENTITY,
    fabricante VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    especificidade VARCHAR(100),
    fkTipoHardware INT,
    CONSTRAINT hardFkTipoHard FOREIGN KEY (fkTipoHardware) REFERENCES tipoHardware(idTipoHardware)
);

CREATE TABLE maquina (
    idMaquina INT PRIMARY KEY IDENTITY,
    nome VARCHAR(50),
    SO VARCHAR(75) NOT NULL,
    emUso TINYINT NOT NULL,
    fkInstituicao INT,
    CONSTRAINT maqFkInst FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao)
);

CREATE TABLE strike (
    idStrike INT PRIMARY KEY IDENTITY,
    dataHora DATETIME NOT NULL,
    validade TINYINT NOT NULL,
    motivo VARCHAR(255) DEFAULT 'Sem motivo definido',
    duracao INT NOT NULL,
    fkMaquina INT,
    CONSTRAINT strikFkMaq FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE,
    fkSituacao INT,
    CONSTRAINT strikFkSit FOREIGN KEY (fkSituacao) REFERENCES situacao(idSituacao)
);

CREATE TABLE componente (
    idComponente INT PRIMARY KEY IDENTITY,
    max INT NOT NULL DEFAULT 85,
    fkMaquina INT,
    CONSTRAINT compFkMaq FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE,
    fkHardware INT,
    CONSTRAINT compFkHard FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware)
);

CREATE TABLE permissao (
    idPermissao INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45) NOT NULL,
    emUso BOOLEAN NOT NULL,
    duracaoStrikePadrao INT,
    fkAtuacao INT,
    CONSTRAINT permFkAtuac FOREIGN KEY (fkAtuacao) REFERENCES atuacao(idAtuacao),
    fkUsuario INT,
    CONSTRAINT permFKUsu FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE historico (
    idHistorico INT PRIMARY KEY IDENTITY,
    dataHora DATETIME NOT NULL,
    consumo DOUBLE NOT NULL,
    fkMaquina INT,
    CONSTRAINT histFkMaq FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE,
    fkHardware INT,
    CONSTRAINT histFkHard FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware),
    fkComponente INT,
    CONSTRAINT histFkComp FOREIGN KEY (fkComponente) REFERENCES componente(idComponente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE historicoProcesso (
    idHistoricoProcesso INT PRIMARY KEY IDENTITY,
    enderecoProcesso VARCHAR(200) NOT NULL,
    fkHistorico INT,
    CONSTRAINT histProcFkHist FOREIGN KEY (fkHistorico) REFERENCES historico(idHistorico) ON DELETE CASCADE,
    fkProcesso INT,
    CONSTRAINT histProcFkProc FOREIGN KEY (fkProcesso) REFERENCES processo(idProcesso) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE permissaoProcesso (
    idPermissaoProcesso INT PRIMARY KEY IDENTITY,
    fkProcesso INT NOT NULL,
    fkPermissao INT NOT NULL,
    dataAlocacao DATETIME NOT NULL,
    CONSTRAINT permProcFkProc FOREIGN KEY (fkProcesso) REFERENCES processo(idProcesso),
    CONSTRAINT permProcFkPerm FOREIGN KEY (fkPermissao) REFERENCES permissao(idPermissao)
);

-- EXCLUIR BANCO
-- drop database magister;

-- Dados fictícios para teste em Java
SELECT * FROM usuario;

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
    ('São Paulo Tech School', 'SPTech', 'ABC123'  ),
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
    ('Atom', 'atom.exe');

-- INSERTS ATUACAO
INSERT INTO atuacao (nome, descricao) VALUES
    ('Administrador do Sistema', 'Usuário com permissões totais no sistema'),
    ('Professor', 'Usuário com permissões de professor'),
    ('Aluno', 'Usuário com permissões de aluno');

-- INSERTS TIPOHARDWARE
INSERT INTO tipoHardware (tipo, fkMedida) VALUES
    ('Processador', 1),
    ('Memória RAM', 2),
    ('Placa de Vídeo', 2),
    ('Disco Rígido', 2),
    ('Placa-Mãe', NULL),
    ('Fonte de Alimentação', NULL);

-- INSERTS USUARIO
INSERT INTO usuario (nome, email, senha, fkInstituicao, fkTipoUsuario) VALUES
    ('Admin Nowl', 'admin@nowl.com', 'adminnowl', 1, 1),
    ('Prof. João', 'joao@nowl.com', 'joaonowl', 2, 2),
    ('Prof. Maria', 'maria@nowl.com', 'marianowl', 3, 2),
    ('Aluno1', 'aluno1@nowl.com', 'aluno1nowl', 4, 3),
    ('Aluno2', 'aluno2@nowl.com', 'aluno2nowl', 5, 3),
    ('Aluno3', 'aluno3@nowl.com', 'aluno3nowl', 6, 3),
    ('Aluno4', 'aluno4@nowl.com', 'aluno4nowl', 7, 3),
    ('Aluno5', 'aluno5@nowl.com', 'aluno5nowl', 8, 3);

-- INSERTS HARDWARE
INSERT INTO hardware (fabricante, modelo, capacidade, especificidade, fkTipoHardware) VALUES
    ('Intel', 'Core i7', 3, '3.6 GHz', 1),
    ('Corsair', 'Vengeance', 16, 'DDR4 2400MHz', 2),
    ('NVIDIA', 'GeForce RTX 3080', 10, 'GDDR6X', 3),
    ('Western Digital', 'Blue', 500, 'SSD', 4),
    ('ASUS', 'ROG Strix B450-F', NULL, NULL, 5),
    ('EVGA', '600W 80 Plus', NULL, NULL, 6);

-- INSERTS MAQUINA
INSERT INTO maquina (nome, SO, emUso, fkInstituicao) VALUES
    ('Laboratório 1', 'Windows 10', 1, 1),
    ('Laboratório 2', 'Ubuntu 20.04', 1, 2),
    ('Sala de Aula 1', 'Windows 10', 0, 3),
    ('Sala de Aula 2', 'Windows 10', 1, 4),
    ('Sala de Aula 3', 'Windows 10', 1, 5),
    ('Sala de Aula 4', 'Windows 10', 0, 6),
    ('Sala de Aula 5', 'Windows 10', 1, 7),
    ('Sala de Aula 6', 'Windows 10', 1, 8);

-- INSERTS STRIKE
INSERT INTO strike (dataHora, validade, motivo, duracao, fkMaquina, fkSituacao) VALUES
    ('2023-01-01 10:00:00', 1, 'Uso indevido de software', 3, 1, 1),
    ('2023-01-02 15:30:00', 1, 'Uso indevido de hardware', 1, 2, 1),
    ('2023-01-03 12:45:00', 1, 'Comportamento inadequado', 2, 3, 2),
    ('2023-01-04 09:20:00', 1, 'Uso indevido de software', 3, 4, 3),
    ('2023-01-05 14:10:00', 1, 'Uso indevido de hardware', 1, 5, 4),
    ('2023-01-06 11:55:00', 1, 'Comportamento inadequado', 2, 6, 1),
    ('2023-01-07 08:30:00', 1, 'Uso indevido de software', 3, 7, 2),
    ('2023-01-08 13:25:00', 1, 'Uso indevido de hardware', 1, 8, 3);

-- INSERTS COMPONENTE
INSERT INTO componente (max, fkMaquina, fkHardware) VALUES
    (85, 1, 1),
    (75, 1, 2),
    (90, 1, 3),
    (60, 1, 4),
    (70, 1, 5),
    (80, 1, 6),
    (90, 2, 1),
    (80, 2, 2),
    (85, 2, 3),
    (70, 2, 4),
    (60, 2, 5),
    (75, 2, 6),
    (85, 3, 1),
    (70, 3, 2),
    (80, 3, 3),
    (65, 3, 4),
    (75, 3, 5),
    (80, 3, 6),
    (90, 4, 1),
    (75, 4, 2),
    (85, 4, 3),
    (60, 4, 4),
    (70, 4, 5),
    (80, 4, 6),
    (80, 5, 1),
    (70, 5, 2),
    (75, 5, 3),
    (55, 5, 4),
    (65, 5, 5),
    (75, 5, 6),
    (85, 6, 1),
    (60, 6, 2),
    (80, 6, 3),
    (50, 6, 4),
    (70, 6, 5),
    (75, 6, 6),
    (90, 7, 1),
    (80, 7, 2),
    (85, 7, 3),
    (75, 7, 4),
    (70, 7, 5),
    (80, 7, 6),
    (85, 8, 1),
    (70, 8, 2),
    (80, 8, 3);



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
    
