function validar_nome_cadastro() {
    var input = document.getElementById('nome_input_cadastro');
    var nome = nome_input_cadastro.value;
    var span = document.getElementById('span_validar_nome');
    var icon = document.getElementById('icon_nome_input');
    
    if (nome.length < 3) {
        span.innerHTML = 'Insira um nome com pelo menos 3 caracteres.';
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.classList.remove("not-valid");
        span.classList.add("valid");
        span.innerHTML = 'nome válido'
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}




function validar_email_cadastro() {
    var input = document.getElementById('email_input_cadastro');
    var email = email_input_cadastro.value;
    var span = document.getElementById('span_validar_email_cadastro');
    var icon = document.getElementById('icon_email_input');

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1 || email.length < 7) {
        span.innerHTML = 'Insira um e-mail válido.';
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.innerHTML = 'O email é valido.';
        span.classList.remove("not-valid");
        span.classList.add("valid");
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}

function validar_senha_cadastro() {
    var input = document.getElementById('senha_input_cadastro');
    var senha = senha_input_cadastro.value
    var span = document.getElementById('span_senha_cadastro');

    var icon = document.getElementById('icon_senha_input');
    
    if (senha.length < 8) {
        span.innerHTML = 'Insira uma senha com pelo menos 8 caracteres';
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.classList.remove("not-valid");
        span.classList.add("valid");
        span.innerHTML = 'Senha válida'
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}

function validar_conf_senha_cadastro() {
    var input = document.getElementById('conf_senha_input');
    var senha = senha_input_cadastro.value
    var conf_senha = conf_senha_input.value
    var span = document.getElementById('span_validar_conf_senha');
    var icon = document.getElementById('icon_confirmar_senha_input');
    
    if (conf_senha != senha) {
        span.innerHTML = 'Senhas não coincidem.'
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.classList.remove("not-valid");
        span.classList.add("valid");
        span.innerHTML = 'Senha válida'
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}

function validar_codigo() {
    var input = document.getElementById('codigo_input');
    var codigo = codigo_input.value
    var span = document.getElementById('span_validar_codigo');
    var icon = document.getElementById('icon_codigo_input');
    
    if (codigo.length  < 5) {
        span.innerHTML = 'Códigos de intituição devem possuir pelo menos 5 caracteres.';
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.classList.remove("not-valid");
        span.classList.add("valid");
        span.innerHTML = 'Código válido'
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}



//


var status = 1;

function senha(){
	if(status > 0){
      document.getElementById('senha_input').type='text';
      document.getElementById("olho_login").classList.remove("icon_hide")
      document.getElementById("olho_login").classList.add("icon")
      status = 0;
    }else{
    document.getElementById('senha_input').type='password';
    document.getElementById("olho_login").classList.remove("icon")
      document.getElementById("olho_login").classList.add("icon_hide")
      status = 1;
    
    }
     
}

var status_senha = 1;

function senha_cadastro(){

	if(status > 0){
      document.getElementById('senha_input_cadastro').type='text';
      document.getElementById("olho").classList.remove("icon_senha_desativado")
      document.getElementById("olho").classList.add("icon_senha")
      status = 0;
    }else{
    document.getElementById('senha_input_cadastro').type='password';
    document.getElementById("olho").classList.remove("icon_senha")
    document.getElementById("olho").classList.add("icon_senha_desativado")
      status = 1;
    
    }
     
}

var status_confirmar_senha = 1;
function confirmar_senha_cadastro(){

	if(status > 0){
      document.getElementById('conf_senha_input').type='text';
      document.getElementById("olho_confirmar").classList.remove("icon_confirmar_desativado")
      document.getElementById("olho_confirmar").classList.add("icon_confirmar")
      status = 0;
    }else{
    document.getElementById('conf_senha_input').type='password';
    document.getElementById("olho_confirmar").classList.remove("icon_confirmar")
    document.getElementById("olho_confirmar").classList.add("icon_confirmar_desativado")
      status = 1;
    
    }
     
}




function validar_email() {
    var input = document.getElementById('email_input');
    var email = email_input.value;
    var span = document.getElementById('span_validar_email');
    var icon = document.getElementById('icon_email_input');

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1 || email.length < 7) {
        span.innerHTML = 'Por favor, insira um e-mail válido.';
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.classList.remove("not-valid");
        span.innerHTML = "";
        span.classList.add("valid");
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}

function validar_senha() {
    var input = document.getElementById('senha_input');
    var senha = senha_input.value
    var span = document.getElementById('span_validar_senha');
    var icon = document.getElementById('icon_senha_input');

    if (senha.length < 8) {
        span.innerHTML = 'Por favor, insira uma senha com pelo menos 8 caracteres';
        span.classList.remove("valid");
        span.classList.add("not-valid");
        input.classList.add("shake");
        icon.src = "./assets/img/Icone/Não Verificado.svg";

    } else {
        span.classList.remove("not-valid");
        span.classList.add("valid");
        span.innerHTML = 'Senha válida'
        input.classList.remove("shake");
        icon.src = "./assets/img/Icone/Verificado.svg";

    }
}



    

