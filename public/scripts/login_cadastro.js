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
      document.getElementById("olho_login").classList.remove("icon")
      document.getElementById("olho_login").classList.add("icon_hide")
      status = 0;
    }else{
    document.getElementById('senha_input').type='password';
    document.getElementById("olho_login").classList.remove("icon_hide")
      document.getElementById("olho_login").classList.add("icon")
      status = 1;
    
    }
     
}

var status_senha = 1;

function senha_cadastro(){

	if(status > 0){
      document.getElementById('senha_input_cadastro').type='text';
      document.getElementById("olho").classList.remove("icon_senha")
      document.getElementById("olho").classList.add("icon_senha_desativado")
      status = 0;
    }else{
    document.getElementById('senha_input_cadastro').type='password';
    document.getElementById("olho").classList.remove("icon_senha_desativado")
    document.getElementById("olho").classList.add("icon_senha")
      status = 1;
    
    }
     
}

var status_confirmar_senha = 1;
function confirmar_senha_cadastro(){

	if(status > 0){
      document.getElementById('conf_senha_input').type='text';
      document.getElementById("olho_confirmar").classList.remove("icon_confirmar")
      document.getElementById("olho_confirmar").classList.add("icon_confirmar_desativado")
      status = 0;
    }else{
    document.getElementById('conf_senha_input').type='password';
    document.getElementById("olho_confirmar").classList.remove("icon_confirmar_desativado")
    document.getElementById("olho_confirmar").classList.add("icon_confirmar")
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



    





// Validações de login e cadastro

function entrar() {
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        swal("error","Preencha todos os campos","error");
    }
    else {
     
        fetch(`${window.location.origin}/usuarios/entrar/${emailVar}/${senhaVar}`, 
             {cache: "no-cache"}).then((informacoesUsuario) =>{
                if(informacoesUsuario.ok){
                    setInterval(4000);
                    swal('sucess','Redirecionando para dashboard','sucess')
                    informacoesUsuario.json().then(infosUser =>{
                        console.log(infosUser)
                        sessionStorage.emailUsuario = infosUser.email
                        sessionStorage.nomeUsuario = infosUser.nome
                        sessionStorage.idUsuario = infosUser.idUsuario
                        sessionStorage.nivPerm = infosUser.fkTipoUsuario
                        sessionStorage.instituicao = infosUser.fkInstituicao
                        
                        window.location = "dashboard/dashboard_geral.html"
                    })

                } else {
                    swal('warning','Email e/ou senha invalido!','error')

                    informacoesUsuario.text().then(texto => {
                        console.error(texto)
                    })

                }
             }).catch(function (erro) {
                console.log(erro);
            })
        return false
    }
}

// CADASTRO FUNCAO
function cadastrar() {
    var nomeVar = nome_input_cadastro.value;
    var emailVar = email_input_cadastro.value;
    var senhaVar = senha_input_cadastro.value;
    var codigoVar = codigo_input.value;

    if (nomeVar ==""||emailVar == "" || senhaVar == ""|| codigoVar =="") {
      
        swal("error","Preencha todos os campos","error");
        return false;
} 

fetch(`/instituicoes/buscarIdInst/${codigoVar}`, {
    cache: "no-cache"
}).then(idInst => {
    if(idInst.ok){
        idInst.json().then(idInst => {

            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nomeServer: nomeVar,
                    emailServer: emailVar,
                    senhaServer: senhaVar,
                    codigoServer: idInst[0].idInstituicao
                })
            }).then(function (resposta) {
                if (resposta.ok) {
                    toggleLogin()
                    swal("Parábens","Redirecionando para dashboard","sucess");
                    window.location = "login_cadastro.html"
                } else {
                    console.log("erro no cadastro")
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

            return false;
        }) 
    } else {
        swal("Error", "Código de instituição inválido!")
        return false;

    }
})

}

function validar_nome() {
    var input = document.getElementById('nomeInput');
    var nome = input.value;
    if (nome == "") {

        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Campo vazio';
    }
    else if (nome.length < 3) {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Nome muito curto';
    }
    else {
        input.classList.add('correto');
        input.placeholder = 'Nome';

    }
}


function validar_email() {
    var input = document.getElementById('emailInput');
    var email = input.value;

    if (email == '') {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Campo vazio';
    }
    else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1 || email.length < 7) {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Email incorreto';
    }
    else {
        input.classList.add('correto');
        input.placeholder = 'Email';
    }
}


function validar_senha() {
    var input = document.getElementById('senhaInput');
    var senha = input.value;


    if (senha == "") {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Campo vazio';
    }
    else if (senha.length < 8) {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Senha menor que 8 caracteres';
    }
    else {
        input.classList.add('correto');
        input.placeholder = 'Senha';
    }
}
