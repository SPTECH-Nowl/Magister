CREATE DATABASE magister;
USE magister;

CREATE TABLE instituicao (
codigoHex CHAR(6) PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
sigla VARCHAR(30) NOT NULL,
imagem LONGBLOB
);

insert into instituicao values 
('asdqwe', 
'Escola Estadual Socorro Jesus', 
'EE.SJ','salada.png');

drop table usuario;
INSERT INTO usuario (nome, email, senha, nivPermissao, FkInstituicao)
VALUES
    ('Usuário 9', 'user9@gmail.com', 'senha789', 3, 'asdqwe');
    select * from usuario;
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(20) NOT NULL,
nivPermissao INT CONSTRAINT CHK_nivPermissao CHECK (nivPermissao IN (1, 2, 3, 4)),
FkInstituicao CHAR(6), CONSTRAINT fkInst FOREIGN KEY (fkInstituicao)
	REFERENCES instituicao(codigoHex)
);

CREATE TABLE hardware (
  idHardware INT PRIMARY KEY AUTO_INCREMENT,
  modelCPU VARCHAR(45) NOT NULL,
  qtdNucleos INT NOT NULL,
  modelDisco VARCHAR(45) NOT NULL,
  tamDisco INT NOT NULL,
  tipoDisco VARCHAR(45) NOT NULL,
  modelRAM VARCHAR(45) NOT NULL,
  tamRam INT NOT NULL
);

CREATE TABLE maquina (
  idMaquina INT PRIMARY KEY,
  nome VARCHAR(45),
  sistemaOperacional VARCHAR(45) NOT NULL,
  fkHardware INT, CONSTRAINT fkMaqHard FOREIGN KEY (fkHardware)
	REFERENCES hardware(idHardware)
  );

CREATE TABLE grupo (
idGrupo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
sigla VARCHAR(30),
FkInstituicao CHAR(6), CONSTRAINT fkInstGrupo FOREIGN KEY (fkInstituicao)
	REFERENCES instituicao(codigoHex)
);

CREATE TABLE processo (
  idProcesso INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  endereco VARCHAR(45) NOT NULL
  );
  
  CREATE TABLE listaAlocacao (
  idListaAlocacao INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
  );

CREATE TABLE grupoMaquina (
  fkGrupo INT,
  fkMaquina INT,
  idGrupoMaquina INT,
  PRIMARY KEY (fkGrupo, fkMaquina, idGrupoMaquina),
  CONSTRAINT fkGrupo
    FOREIGN KEY (fkGrupo)
    REFERENCES grupo (idGrupo),
  CONSTRAINT fkMaquinanb 
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idMaquina)
    );

CREATE TABLE historicoMaquina (
  idHistoricoMaquina INT PRIMARY KEY AUTO_INCREMENT,
  dataHora DATETIME NOT NULL,
  fkProcesso INT,
  fkMaquina INT,
  CONSTRAINT fkHistoricoMaquina
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idMaquina),
  CONSTRAINT fkProcessoMaquina 
	FOREIGN KEY (fkProcesso) 
	REFERENCES processo (idProcesso) 
    );



CREATE TABLE histConsmRecurso (
  idHistConsmRecurso INT PRIMARY KEY AUTO_INCREMENT,
  consumoCPU INT NOT NULL,
  consumoDisco INT NOT NULL,
  consumoRAM INT NOT NULL,
  qtdJanelasAbertas INT NOT NULL,
  fkMaquina INT,
  CONSTRAINT fkHistConsMaquina
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idMaquina)
);

CREATE TABLE processoLista (
  fkProcesso INT NOT NULL,
  fkAlocacao INT NOT NULL,
  idProcessoLista INT NOT NULL,
  PRIMARY KEY (fkProcesso, fkAlocacao, idProcessoLista),
  CONSTRAINT fkProcessoList
    FOREIGN KEY (fkProcesso)
    REFERENCES processo (idProcesso),
  CONSTRAINT ffkListaProc
    FOREIGN KEY (fkAlocacao)
    REFERENCES listaAlocacao (idListaAlocacao)
    );
    