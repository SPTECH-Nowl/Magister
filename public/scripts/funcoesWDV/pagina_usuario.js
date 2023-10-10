// & js - avisoModal -- avisoController
// * verificar nomes = publicar == insert -> aviso/publicar
// * verificar nomes = editar == update -> aviso/editar
// * verificar nomes = deletar == delete -> aviso/deletar
// * verificar nomes = mostrar_dados == select -> aviso/mostrar_dados


b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function publicar() {

    var corpo = {
        nome: form_postagem.nome_input.value,
        email: form_postagem.email_input.value,
        senha: form_postagem.senha_input.value,
        nivPermissão: form_postagem.nivPermissao_input.value
    }

    if (tipo_de_usuario == "usuario") {
        Swal.fire({
            background: '#151515',
            color: '#FFF',
            icon: 'error',
            title: 'Erro',
            html: `Prezado usuário,

Voce não tem permissão para adicionar Usuario`,
        })
        return false;
    } 
    else {
        fetch(`/avisos/publicar/${idUsuario}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    background: '#151515',
                    color: '#FFF',
                    showCancelButton: false,
                    title: 'Bom trabalho!',
                    text: 'Usuário Cadastrado com sucesso',

                })
                document.getElementById('okButton').addEventListener('click', function () {
                    Swal.close()
                    window.location.reload()
                });
                limparFormulario();

            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
                window.location = "usuarios.html"
                alert("ERRO")
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        return false;

    }

}

function mostrar_dados(idAviso) {

    //aguardar();
    fetch(`/avisos/mostrar_dados/${idAviso}`).then(function (resposta_dados_usuario) {

        if (resposta_dados_usuario.ok) {
            if (resposta_dados_usuario.status == 204) {
                alert("ERRO")
            }

            resposta_dados_usuario.json().then(function (resposta_dados_usuario) {
                console.log("Dados recebidos dos usuarios é : ", JSON.stringify(resposta_dados_usuario));


                for (let i = 0; i < resposta_dados_usuario.length; i++) {
                    var dados = resposta_dados_usuario[i];
                    console.log(dados)
                    Swal.fire({
                        background: '#151515',
                        color: '#FFF',
                        confirmButtonColor: 'cornflowerblue',
                        title: 'Dados do Funcionário',
                        html: `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <span><b>Nome</b>: ${dados.nome}</span>
                        <span><b>Email</b>: ${dados.email}</span>
                        <span><b>Senha:</b> ${dados.senha}</span>
                        <span><b>nivPermissao:</b> ${dados.nivPermissao}</span>
                        </div>`,
                    })
                }
            });
        } else {
            console.error('Houve um erro na API!', resposta_dados_usuario.status);

        }
    }).catch(function (erro) {
        console.error(erro);

    });
}

function editar(idAviso) {
    sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
    console.log("cliquei em editar - " + idAviso);
    window.alert("Você será redirecionado à página de edição do aviso de id número: " + idAviso);
    window.location = "/dashboard/usuarios.html"

}

function deletar(idAviso) {
    console.log("Criar função de apagar post escolhido - ID" + idAviso);



    if (tipo_de_usuario == "usuario") {

        Swal.fire({
            icon: 'error',
            title: 'Erro',
            background: '#151515',
            color: '#FFF',
            html: `Prezado usuário,

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
                fetch(`/avisos/deletar/${idAviso}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire('Saved!', '', 'success')
                        Swal.fire({
                            icon: 'success',
                            background: '#151515',
                            color: '#FFF',
                            title: 'Bom trabalho!',
                            text: 'Usuário deletado com sucesso',

                        })
                        document.getElementById('okButton').addEventListener('click', function () {
                            Swal.close();
                            location.reload();
                        });
                        window.location = "cadastrar-usuario.html";
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

function atualizarFeed() {
    var idUsuario = sessionStorage.ID_USUARIO;
    //aguardar();
    fetch(`/avisos/listar/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {

            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

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
                }


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
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
      <input type="text" id="nivPermissaoInput" onkeyup="validar_nivPermissao()" placeholder="insira números" />
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

function alterarUsuario(idAviso) {

    var input_nome = document.getElementById('input_nome')
    var input_email = document.getElementById('emailInput')
    var input_senha = document.getElementById('senhaInput');
    var input_nivPermissao = document.getElementById('nivPermissaoInput');

    var nome = input_nome.value;
    var email = input_email.value
    var senha = input_senha.value
    var nivPermissao = input_nivPermissao.value


    if (nome == "" || email == "" || senha == ""||nivPermissao) {

        input.classList.remove('correto');
        input.classList.add('erro');
        input.placeholder = 'Campo vazio';
    }
    else if (nome.length < 3 || email.indexOf("@") == -1 || email.indexOf(".com") == -1 || email.length < 7
        || senha.length < 8) {
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
                nivPermissaoServer: nivPermissao,
                idSever: idAviso
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
                window.location = "cadastrar-usuario.html"
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



