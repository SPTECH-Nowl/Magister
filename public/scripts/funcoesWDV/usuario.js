// CADASTRO DE LOGIN
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



 
document.addEventListener('DOMContentLoaded', function() {
    const adicionarUsuarioButton = document.getElementById('adicionarUsuario');
    adicionarUsuarioButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Adicionar Usuário',
            width:"900px",
            height:"200px",
            html:
                '<input type="text" id="nomeInput" placeholder="Nome" class="swal2-input">' +
                '<input type="email" id="emailInput" placeholder="Email" class="swal2-input">' +
                '<input type="password" id="senhaInput" placeholder="Senha" class="swal2-input">'+
                '<input type="text" id="tipoInput" placeholder="Tipo" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: 'Adicionar usuário',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const nome = Swal.getPopup().querySelector('#nomeInput').value;
                const email = Swal.getPopup().querySelector('#emailInput').value;
                const senha = Swal.getPopup().querySelector('#senhaInput').value;
                const tipoInput = Swal.getPopup().querySelector('#tipoInput').value;

                // Envie os dados para o servidor
                return fetch(`/usuarios/cadastrarNaDash`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeUsuario: nome,
                        emailUsuario: email,
                        senhaUsuario: senha,
                        nivPermissao: tipoInput,
                        instituicao: sessionStorage.instituicao
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erro no servidor');
                    }
                })
                .catch(error => {
                    Swal.showValidationMessage(`Erro: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Sucesso!', 'O usuário foi cadastrado com sucesso.', 'success');
            }
        });
    });
});



function atualizarFeed() {
    var codInstituicao = sessionStorage.instituicao;
    fetch(`/usuarios/listar/${codInstituicao}`)
        .then(function (listaUsuarios) {
            if (listaUsuarios.ok) {
                if (listaUsuarios.status == 204) {
                    var tableUsuarios = document.getElementById("listaDeUsuarios");
                    tableUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaUsuarios.json().then(function (listaUsuarios) {
                        var tableUsuarios = document.getElementById("listaDeUsuarios");
                        tableUsuarios.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        for (var i = 0; i < listaUsuarios.length; i++) {
                            var usuario = listaUsuarios[i];
                            var linhaTable = document.createElement("tr");
                            var celulaNome = document.createElement("td");
                            var celulaEmail = document.createElement("td");
                            var celulaTipo = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            celulaNome.textContent = usuario.nomeUsuario;
                            celulaEmail.textContent = usuario.email;
                            celulaTipo.textContent = usuario.nivPermissao;

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                            <button class="btn-crud red" id="btn_delete${usuario.idUsuario}" onclick="deletar(${usuario.idUsuario}, ${usuario.nivPermissao})">Deletar</button>
                                <button class="btn-crud green" id="btn_update${usuario.idUsuario}" onclick="alterar(${usuario.idUsuario})">Alterar</button>
                                <button class="btn-crud blue" id="btn_get${usuario.idUsuario}" onclick="mostrar_dados(${usuario.idUsuario})">Informações</button>
                            `;

                            linhaTable.appendChild(celulaNome);
                            linhaTable.appendChild(celulaEmail);
                            linhaTable.appendChild(celulaTipo);
                            linhaTable.appendChild(celulaBotoes);

                            tableUsuarios.appendChild(linhaTable);
                        }
                    });
                }
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function mostrar_dados(idUsuario) {
    fetch(`/usuarios/mostrar_dados/${idUsuario}`)
        .then(function (response) {
            if (!response.ok) {
                console.error('Erro na resposta da API:', response.status);
                return;
            }
            return response.json();
        })
        .then(function (dadosUsuario) {
            if (dadosUsuario && dadosUsuario.length > 0) {
                const usuario = dadosUsuario[0]; // Os dados são um array, pegamos o primeiro item
                console.log("Dados recebidos dos usuários: ", JSON.stringify(usuario));
                Swal.fire({
                    title: 'Dados do cliente',
                    width:"500px",
                    height:"550px",
                    confirmButtonColor: 'cornflowerblue',
                    html: `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <span><b>Nome</b>: ${usuario.nome}</span>
                        <span><b>Email</b>: ${usuario.email}</span>
                        <span><b>Senha:</b> ${usuario.senha}</span>
                        <span><b>nivPermissao:</b> ${usuario.nivPermissao}</span>
                    </div>`,
                });
            } else {
                console.error('Dados do usuário não encontrados na resposta da API.');
            }
        })
        .catch(function (erro) {
            console.error('Erro na requisição:', erro);
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

function deletar(idUsuario, tipoPermissao) {
    if (tipoPermissao == "0") {

        Swal.fire({
            icon: 'error',
            title: 'Erro',
            width:"900px",
            height:"200px",
            html: ` Voce nao possui permissão para deletar`,
        })
        return false;
    }
    else {
        Swal.fire({
            title: 'Você tem certeza que deseja deletar?',
            color: '#FFF',
            width:"600px",
            height:"800px",
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
        title: 'Alterar Usuário',
        html:
            '<input type="text" id="nomeInput" placeholder="Nome" class="swal2-input">' +
            '<input type="email" id="emailInput" placeholder="Email" class="swal2-input">' +
            '<input type="password" id="senhaInput" placeholder="Senha" class="swal2-input">'+
            '<input type="text" id="tipoInput" placeholder="Tipo" class="swal2-input">',
        showCancelButton: true,
        confirmButtonText: 'Alterar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#74C365',
        cancelButtonColor: '#FF5555',
        preConfirm: () => {
            var nome = document.getElementById('nomeInput').value;
            var email = document.getElementById('emailInput').value;
            var senha = document.getElementById('senhaInput').value;
            var nivPermissao = document.getElementById('tipoInput').value;


       
            alterarUsuario(idAviso);
        }
    });
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
function alterarUsuario(idAviso) {
    var nome = document.getElementById('nomeInput');
    var email = document.getElementById('emailInput');
    var senha = document.getElementById('senhaInput');
    var nivPermissao = document.getElementById('tipoInput');

    var nome = nomeInput.value;
    var email = emailInput.value;
    var senha = senhaInput.value;
    var nivPermissao = tipoInput.value;

    if (nome === "" || email === "" || senha === "" || nivPermissao === "") {
        Swal.fire({
            icon: 'error',
            background: '#151515',
            color: '#FFF',
            title: 'Erro',
            text: 'Preencha todos os campos corretamente.'
        });
    } else if (nome.length < 3 || email.indexOf("@") === -1 || email.indexOf(".com") === -1 || email.length < 7 || senha.length < 8) {
        Swal.fire({
            icon: 'error',
            background: '#151515',
            color: '#FFF',
            title: 'Erro',
            text: 'Verifique os formatos dos campos.'
        });
    } else {
        fetch(`/usuarios/editar/${idAviso}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                novoNomeUsuario: nome,
                novoEmailUsuario: email,
                novaSenhaUsuario: senha,
                novoNivPerm: nivPermissao,
                idUsuarioPM: idAviso
            })
        })
        .then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    width:"500px",
                    height:"5s00px",
                    color: '#FFF',
                    title: 'Sucesso',
                    text: 'Usuário Atualizado com sucesso.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "usuarios.html";
                    }
                });
            } else if (resposta.status === 404) {
                Swal.fire({
                    icon: 'error',
                    background: '#151515',
                    color: '#FFF',
                    title: 'Erro',
                    text: 'Usuário não encontrado.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    background: '#151515',
                    color: '#FFF',
                    title: 'Erro',
                    text: 'Houve um erro ao tentar realizar a atualização.'
                });
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}
