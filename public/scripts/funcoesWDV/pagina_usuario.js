// & js - avisoModal -- avisoController
// * verificar nomes = publicar == insert -> aviso/publicar
// * verificar nomes = editar == update -> aviso/editar
// * verificar nomes = deletar == delete -> aviso/deletar
// * verificar nomes = mostrar_dados == select -> aviso/mostrar_dados


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
    var input_nome = document.getElementById('input_nome');
    var input_email = document.getElementById('emailInput');
    var input_senha = document.getElementById('senhaInput');
    var input_nivPermissao = document.getElementById('nivPermissaoInput');

    var nome = input_nome.value;
    var email = input_email.value;
    var senha = input_senha.value;
    var nivPermissao = input_nivPermissao.value;

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
                    background: '#151515',
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
