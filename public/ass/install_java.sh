#!/bin/bash
# para rodar localmente só o nome do arquivo
# ir no cmd
# Define cores para formatação
PURPLE='\033[0;35m'
NC='\033[0m'
VERSAO=17
echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Olá usuário, serei seu assistente para instalação do Java!"
echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Verificando se você possui o Java instalado na sua máquina!"
sleep 2
# Verifica se o Java está instalado
java -version
if [ $? -eq 0 ]; then
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Você já possui o Java instalado na sua máquina!"
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Vamos atualizar os pacotes..."
    sudo apt update && sudo apt upgrade -y
    clear
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Pacotes atualizados!"
    # Navega até o diretório Desktop
    cd /home/$USER/Desktop
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Diretório Desktop acessado!"
    sleep 2
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Agora iremos baixar nosso arquivo JAR..."
    # Baixa o arquivo JAR
   wget https://github.com/SPTECH-Nowl/SistemaJava/Java/main/sistemaJava/target/sistema-nowl-1.0-jar-with-dependencies.jar
    sleep 2
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Já temos o arquivo! Vamos executá-lo."
    sleep 2
    # Executa o arquivo JAR
    java -jar sistema-nowl-1.0-jar-with-dependencies.jar
else
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Não foi encontrada nenhuma versão do Java na sua máquina, mas iremos resolver isso!"
    echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Você deseja instalar o Java na sua máquina (S/N)?"
    read inst
    if [ "$inst" == "S" ]; then
        echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Ok! Você decidiu instalar o Java na máquina, uhul!"
        echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Adicionando o repositório!"
        sleep 2
        sudo add-apt-repository ppa:linuxuprising/java
        clear
        echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Atualizando os pacotes... Quase acabando."
        sleep 2
        sudo apt update -y
        clear
        if [ $VERSAO -eq 17 ]; then
            echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Preparando para instalar a versão 17 do Java. Lembre-se de confirmar a instalação quando necessário!"
            sudo apt-get install openjdk-17-jdk
            clear
            echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Java instalado com sucesso!"
            echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Vamos atualizar os pacotes..."
            sudo apt update && sudo apt upgrade -y
            clear
            # Navega até o diretório Desktop
            cd /home/$USER/Desktop
            echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Diretório Desktop acessado!"
            sleep 2
            echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Agora iremos baixar nosso arquivo JAR..."
            # Baixa o arquivo JAR
            wget https://github.com/SPTECH-Nowl/SistemaJava/src/main/java/target/sistema-nowl-1.0-jar-with-dependencies.jar
            sleep 2
            echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Já temos o arquivo! Vamos executá-lo."
            sleep 2
            # Executa o arquivo JAR
            java -jar sistema-nowl-1.0-jar-with-dependencies.jar
        fi
    else
        echo -e "${PURPLE}[SPTECH-Nowl]:${NC} Você optou por não instalar o Java por enquanto, até a próxima então!"
    fi
fi





















