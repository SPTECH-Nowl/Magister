function cadastrar() {
    var nomeVar = nome_input_cadastro.value;
    var emailVar = email_input_cadastro.value;
    var senhaVar = senha_input_cadastro.value;
    var codigoVar = codigo_input.value;

    if (nomeVar ==""||emailVar == "" || senhaVar == ""|| codigoVar =="") {
      
        swal("error","Preencha todos os campos","error");
        return false;
} 

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            codigoServer: codigoVar
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



}

function cadastrarNaDash() {
    var nome = nomeInput.value
    var email = emailInput.value
    var senha= senhaInput.value
    var nivPerm = tipoInput.value

    fetch(`/usuarios/cadastrarNaDash`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeUsuario: nome,
            emailUsuario: email,
            senhaUsuario: senha,
            nivPermissao: nivPerm,
            instituicao: sessionStorage.instituicao
        })
    }).then(resposta =>{
        if (resposta.ok){
            console.log("deu certo")
        } else{
            console.log("deu errado")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });
}


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
                    informacoesUsuario.json().then(infosUser =>{
                        console.log(infosUser)

                        sessionStorage.emailUsuario = infosUser.email
                        sessionStorage.nomeUsuario = infosUser.nome
                        sessionStorage.idUsuario = infosUser.idUsuario
                        sessionStorage.nivPerm = infosUser.nivPermissao
                        sessionStorage.instituicao = infosUser.FkInstituicao

                        window.location = "dashboard/dashboard_maquina.html"
                    })

                } else {
                    swal('Email e/ou senha invalido!')

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

function atualizarFeed() {
    var codInstituicao = sessionStorage.instituicao
    fetch(`/usuarios/listar/${codInstituicao}`).then(function (listaUsuarios) {
        if (listaUsuarios.ok) {
            if (listaUsuarios.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            } else {
                listaUsuarios.json().then(listaUsuarios =>{
                    console.log(listaUsuarios)
                    console.log(listaUsuarios[0])
                    /*for(i = 0; i < listaUsuarios.length; i++){
                        console.log(listaUsuarios[i])
                    }*/
                })
            }




                /*
                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    
                    var linha = document.createElement("tr");
                    var tdId = document.createElement("td");
                    var tdNome = document.createElement("td");
                    var tdButtons = document.createElement("td");
                  

                    tdId.innerHTML = publicacao.idusuario;
                    var id_usuario = publicacao.idusuario
                    console.log("O id é " + id_usuario)
                    tdNome.innerHTML = publicacao.nome;
                    tdButtons.innerHTML = `
                        <button class="btn-crud red" id="btn_delete${i}" onclick="deletar(${publicacao.idusuario})">Deletar</button>
                        <button class="btn-crud green" id="btn_update${i}" onclick="alterar(${publicacao.idusuario})">Alterar</button>
                        <button class="btn-crud blue" id="btn_get${i}" onclick="mostrar_dados(${publicacao.idusuario})">Informações</button>
                    `
                  


                    tdNome.className = "publicacao-nome";
        

                    linha.appendChild(tdId);
                    linha.appendChild(tdNome);
                    linha.appendChild(tdButtons);
                    feed.appendChild(linha);
                } */


        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}


function cadastrarInDash() {

    var nome = nomeInput.value
    var email = emailInput.value
    var senha= senhaInput.value
    var nivPerm = tipoInput.value

    if (sessionStorage.nivPerm == "1") {
        alert("Nivel de permissão invalida.")
        return false;
    } 
    else {
        fetch(`/usuarios/cadastrarInDash/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                nivPermissao: nivPerm,
                instituicao: sessionStorage.instituicao
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                alert("Cadastro feito com sucesso")
            } else {
                alert("Houve um erro ao cadastrar")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        return false;

    }

}

function mostrar_dados(idUsuario) {
    fetch(`/usuarios/mostrar_dados/${idUsuario}`).then(function (listaDeDadosUsuario) {

        if (listaDeDadosUsuario.ok) {
            if (listaDeDadosUsuario.status == 204) {
                alert("ERRO")  
            }

            listaDeDadosUsuario.json().then(function (listaDeDadosUsuario) {
                console.log("Dados recebidos dos usuarios: ", JSON.stringify(listaDeDadosUsuario));

                Swal.fire({
                    background: '#151515',
                    color: '#FFF',
                    confirmButtonColor: 'cornflowerblue',
                    title: 'Dados do Funcionário',
                    html: `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <span><b>Nome</b>: ${listaDeDadosUsuario.nome}</span>
                    <span><b>Email</b>: ${listaDeDadosUsuario.email}</span> 
                    <span><b>Senha:</b> ${listaDeDadosUsuario.senha}</span>
                    <span><b>nivPermissao:</b> ${listaDeDadosUsuario.nivPermissao}</span>
                    </div>`,
                })

  
            });
        } else {
            console.error('Houve um erro na API!', listaDeDadosUsuario.status);

        }
    }).catch(function (erro) {
        console.error(erro);

    });
}

function editar(idUsuario) {
    var nome = form_postagem.nome_input.value
    var email = form_postagem.email_input.value
    var senha = form_postagem.senha_input.value
    var nivPermissao = form_postagem.codigo_input.value

    fetch(`/usuarios/editar`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            novoNomeUsuario: nome,
            novoEmailUsuario: email,
            novaSenhaUsuario: senha,
            novoNivPerm: nivPermissao,
            idUsuarioPM: idUsuario
        })
    }).then(resposta =>{
        if(resposta.ok){
            swal("edicao feita com sucesso")
        }else{
            swal("houve um erro durante a edicao")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

}

function deletar(idUsuario) {

    if (tipo_de_usuario == "1") {

        Swal.fire({
            icon: 'error',
            title: 'Erro',
            background: '#151515',
            color: '#FFF',
            html: `Prezado ${nome},
                    Voce nao possui permissão para deletar`,
        })
        return false;
    }
    else {
        Swal.fire({
            title: 'Você tem certeza que deseja deletar?',
            background: '#151515',
            color: '#FFF',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Deletar',
            denyButtonText: `Não Deletar`,
            confirmButtonColor: '#FF5555',
            denyButtonColor: '#424242',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/usuarios/deletar/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idUsuarioPE: idUsuario
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire('Saved!', '', 'success')
                        Swal.fire({
                            icon: 'success',
                            background: '#151515',
                            color: '#FFF',
                            text: 'Usuário deletado com sucesso',

                        })
                        document.getElementById('okButton').addEventListener('click', function () {
                            Swal.close();
                            
                        });

                    } else {
                        Swal.fire('Falha ao deletar o usuário', '', 'error')
                    }
                }).catch(function (resposta) {
                    console.log(resposta);
                });
            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'warning',
                    background: '#151515',
                    color: '#FFF',
                    title: 'Bom trabalho!',
                    text: 'Usuário não deletado',
                    confirmButtonColor: '#4CAF50'
                })

            }
        });
    }
}


function testar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));

    var divResultado = document.getElementById("div_feed");

    divResultado.appendChild(document.createTextNode(formulario.get("descricao")));
    divResultado.innerHTML = formulario.get("descricao");



    return false;
}


function alterar(idAviso) {

    Swal.fire({
        background: '#151515',
        color: '#FFF',
        title: '<span class="titulo">Editar Usuário</span>',
        html: `
      <div class="div_crud_alterar">
        
        <input type="text" id="input_nome" onkeyup="validar_nome()" placeholder="Nome de no minimo 3 caracteres" />
      </div>
      <div class="div_crud_alterar">
        <input type="email" id="emailInput" onkeyup="validar_email()" placeholder="Insira um email válido" />
      </div>
      <div class="div_crud_alterar">
        <input type="text" id="senhaInput" onkeyup="validar_senha()" placeholder="Senha de no mínimo 8 caracteres" />
      </div>
      <div class="div_crud_alterar">
        <input type="text" id="nivPermissaoInput" onkeyup="validar_nivPermissao()" />
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: 'Alterar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#74C365',
        cancelButtonColor: '#FF5555',
        preConfirm: () => {
            var nome = document.getElementById('input_nome').value;
            var email = document.getElementById('emailInput').value;
            var senha = document.getElementById('senhaInput').value;
            var nivPermissao = document.getElementById('nivPermissaoInput').value;


            alterarUsuario(idAviso);
        }
    });
}

function validar_nome() {
    var input = document.getElementById('input_nome');
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

function validar_nivPermissao() {
    var input = document.getElementById('nivPermissaoInput');
    var nivPermissao = input.value;


    if (nivPermissao == "") {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Campo vazio';
    }
    else if (nivPermissao != 1 || nivPermissao != 2 || nivPermissao != 3) {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'num inválido';
    }
    else {
        input.classList.add('correto');
        input.placeholder = 'Senha';
    }


function alterarUsuario(idAviso) {

    var input_nome = document.getElementById('input_nome')
    var input_email = document.getElementById('emailInput')
    var input_senha = document.getElementById('senhaInput');
    var input_nivPermissao = document.getElementById('nivPermissaoInput');

    var nome = input_nome.value;
    var email = input_email.value
    var senha = input_senha.value
    var nivPermissao= input_nivPermissao.value

    if (nome == "" || email == "" || senha == ""||nivPermissao=="") {

        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Campo vazio';
    }
    else if (nome.length < 3 || email.indexOf("@") == -1 || email.indexOf(".com") == -1 || email.length < 7
        || senha.length < 8 || nivPermissao.length == 1 || nivPermissao.lenght == 2 || nivPermissao.lenght ==3 ) {
        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Nome muito curto';
    }
    else {
        fetch(`/avisos/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                nivPermissaoServer: nivPermissao
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    background: '#151515',
                    color: '#FFF',
                    title: 'Bom trabalho!',
                    text: 'Usuario Atualizado com sucesso',
                    showConfirmButton: false,
                })
                document.getElementById('okButton').addEventListener('click', function () {
                    Swal.close();
                });
                
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
  }
}
