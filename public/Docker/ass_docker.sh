#!/bin/bash

echo "Olá Cliente, te ajudarei no processo para instalar o Docker e criar o Container com o MySQL 5.7"
echo "Vamos verificar primeiramente se você possui o Docker instalado...;"
sleep 2
docker -v
if [ $? -eq 0 ]
    then
        echo ": O senhor(a) já tem o Docker instalado!!!"
    else
        echo "Não identificamos nenhuma versão do Docker instalado,porém sem problemos, irei resolver isso agora mesmo!"
        echo "Confirme para nosso sistema  se realmente deseja instalar o Docker (S/N)?"
    read inst
    if [ "$inst" == "S" ]
        then
            echo "Ok! Você escolheu instalar o Docker ;D"
            echo "Adicionando o repositório!"
            sleep 2
            sudo apt update -y
            clear
            echo "Atualizando! Quase lá."
            sleep 2
            sudo apt install docker.io -y
            sudo systemctl start docker
            sudo systemctl enable docker
            sleep 2
            sudo docker pull mysql:5.7
            sudo docker run -d -p 3306:3306 --name MagisterNowl -e "MYSQL_DATABASE=magister" -e "MYSQL_ROOT_PASSWORD=aluno" mysql:5.7
            echo "Docker instalado com sucesso e container criado com sucesso!"
            sleep 2
            echo "Agora iremos criar as tabelas no banco de dados"
            sleep 2
            sudo docker exec -i MagisterNowl mysql -uroot -aluno magister < script.sql
            echo "Tabelas criadas com sucesso!"
            echo "Tudo configurado com sucesso, até a próxima!"
        else, .
            echo "Você optou por não instalar o Docker por enquanto, até a próxima então!"
            
        fi
fi