function getFiltrosSelecionados() {
    const nodeList = document.querySelectorAll("sl-select");
    const selects = [...nodeList, nodeList];

    console.log(nodeList);
    
    return {
       dt_hr: selects[0].value,
       situacao: selects[1].value,
       elementos: selects[2]
    }
}

function carregarFeed() {
    var codInstituicao = localStorage.getItem("instituicao");
    var selects = getFiltrosSelecionados();

    fetch(`/strikes/listar/${codInstituicao}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application-json'
        },
        body: JSON.stringify({
            dataHora: selects.dt_hr,
            ativo: selects.situacao.includes('ativo') ? true : false,
            valido: selects.situacao.includes('valido') ? true : false,
            invalido: selects.situacao.includes('invalido') ? true : false,
            inativo: selects.situacao.includes('inativo') ? true : false,
        })
    })
        .then(function (listaStrikes) {
            console.log(listaStrikes);
            if (listaStrikes.ok) {
                if (listaStrikes.status == 204) {
                    var tableStrikes = document.getElementById("listaDeStrikes");
                    tableStrikes.innerHTML = "<tr><td colspan='6'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaStrikes.json().then(function (listaStrikes) {

                        var tableStrikes = document.getElementById("listaDeStrikes");
                        tableStrikes.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaStrikes)
                        
                        for (var i = 0; i < listaStrikes.length; i++) {
                            var strike = listaStrikes[i];
                            console.log('no for')
                            console.log(strike);

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `strike_${strike.idStrike}`)

                            var celulaMaquina = document.createElement("td");
                            var celulaDataHora = document.createElement("td");
                            var celulaMotivo = document.createElement("td");
                            var celulaDuracao = document.createElement("td");
                            var celulaSituacao = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            var dtH = new Date(strike.dataHora);

                            var endDtH = dtH;
                            endDtH.setMinutes(endDtH.getMinutes() + strike.duracao) 

                            celulaMaquina.textContent = strike.nome;
                            celulaDataHora.textContent = dtH.toLocaleString('pt-BR');
                            celulaMotivo.textContent = strike.motivo;
                            celulaDuracao.textContent = `${strike.duracao}min (${endDtH.toLocaleTimeString('pt-BR')})`;
                            celulaSituacao.textContent = strike.situacao;

                            strike.situacao == 'Ativo' 
                            ? celulaSituacao.style.color = 'var(--color-blue-500)'
                            : strike.situacao == 'Válido'
                            ? celulaSituacao.style.color = 'var(--color-green-500)'
                            : strike.situacao == 'Inválido'
                            ? celulaSituacao.style.color = 'var(--color-coral)'
                            : celulaSituacao.style.color = 'var(--color-gray-600)'

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Usuário" id="btn_delete" onclick="deletar(${localStorage.getItem("nivPerm")})">
                            <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Usuário" id="btn_update" onclick="alterar()">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip" title="Mais Informações" id="btn_get" onclick="mostrar_dados()">
                        `;
                     
                        
                        document.addEventListener("DOMContentLoaded", function () {
                            carregarFeed(); // Chame a função para carregar a tabela de usuários
                            tippy(".tooltip", {
                                placement: "top",
                            });
                        });

                            linhaTable.appendChild(celulaMaquina);
                            linhaTable.appendChild(celulaDataHora);
                            linhaTable.appendChild(celulaMotivo);
                            linhaTable.appendChild(celulaDuracao);
                            linhaTable.appendChild(celulaSituacao);
                            linhaTable.appendChild(celulaBotoes);

                            tableStrikes.appendChild(linhaTable);
                        }
                    })
                }
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function contadoresStrike(){
    fetch(`/strikes/contadores/${localStorage.getItem("instituicao")}`)
    .then((contadores) => {
        if (contadores.ok) {
            contadores.json().then(function (contadores) {
                var orderOptions = document.getElementById("orderOptions")

                    var spanTotal = document.createElement("span")
                    var spanAtivos = document.createElement("span")
                    var spanValidos = document.createElement("span")
                    var spanInvalidos = document.createElement("span")
                    var spanInativos = document.createElement("span")

                    spanTotal.textContent = `Total(${contadores[0].total})`
                    spanAtivos.textContent = `Ativos(${contadores[0].ativos})`
                    spanValidos.textContent = `Válidos(${contadores[0].validos})`
                    spanInvalidos.textContent = `Inválidos(${contadores[0].invalidos})`
                    spanInativos.textContent = `Inativos(${contadores[0].inativos})`



                    spanTotal.onclick = () => carregarFeed()
                    spanAtivos.onclick = () => carregarFeedSituacao('Ativo')
                    spanValidos.onclick = () => carregarFeedSituacao('Válido')
                    spanInvalidos.onclick = () => carregarFeedSituacao('Inválido')
                    spanInativos.onclick = () => carregarFeedSituacao('Inativo')
                    // spanTotalAdministrador.onclick = carregarFeedAdm
                    // spanTotalInstrutor.onclick = carregarFeedInstrutor
                    
                    orderOptions.appendChild(spanTotal)
                    orderOptions.appendChild(spanAtivos)
                    orderOptions.appendChild(spanValidos)
                    orderOptions.appendChild(spanInvalidos)
                    orderOptions.appendChild(spanInativos)
                    
            })
        }
    })
}

function carregarFeedSituacao(situacao) {
    var codInstituicao = localStorage.getItem("instituicao");
    fetch(`/strikes/listar/situacao/${codInstituicao}/${situacao}`)
        .then(function (listaStrikes) {
            console.log(listaStrikes);
            if (listaStrikes.ok) {
                if (listaStrikes.status == 204) {
                    var tableStrikes = document.getElementById("listaDeStrikes");
                    tableStrikes.innerHTML = "<tr><td colspan='6'>Nenhum resultado encontrado.</td></tr>";
                } else {
                    listaStrikes.json().then(function (listaStrikes) {

                        var tableStrikes = document.getElementById("listaDeStrikes");
                        tableStrikes.innerHTML = ""; // Limpar a tabela antes de preencher com os novos dados

                        console.log(listaStrikes)
                        
                        for (var i = 0; i < listaStrikes.length; i++) {
                            var strike = listaStrikes[i];
                            console.log('no for')
                            console.log(strike);

                            var linhaTable = document.createElement("tr");
                            linhaTable.setAttribute('id', `strike_${strike.idStrike}`)

                            var celulaMaquina = document.createElement("td");
                            var celulaDataHora = document.createElement("td");
                            var celulaMotivo = document.createElement("td");
                            var celulaDuracao = document.createElement("td");
                            var celulaSituacao = document.createElement("td");
                            var celulaBotoes = document.createElement("td");

                            var dtH = new Date(strike.dataHora);

                            var endDtH = dtH;
                            endDtH.setMinutes(endDtH.getMinutes() + strike.duracao) 

                            celulaMaquina.textContent = strike.nome;
                            celulaDataHora.textContent = dtH.toLocaleString('pt-BR');
                            celulaMotivo.textContent = strike.motivo;
                            celulaDuracao.textContent = `${strike.duracao}min (${endDtH.toLocaleTimeString('pt-BR')})`;
                            celulaSituacao.textContent = strike.situacao;

                            strike.situacao == 'Ativo' 
                            ? celulaSituacao.style.color = 'var(--color-blue-500)'
                            : strike.situacao == 'Válido'
                            ? celulaSituacao.style.color = 'var(--color-green-500)'
                            : strike.situacao == 'Inválido'
                            ? celulaSituacao.style.color = 'var(--color-coral)'
                            : celulaSituacao.style.color = 'var(--color-gray-600)'

                            // Adicione os botões com base no ID do usuário
                            celulaBotoes.innerHTML = `
                            <img src="../assets/img/Icone/deleteIcon.svg" class="tooltip" title="Excluir Usuário" id="btn_delete" onclick="deletar(${localStorage.getItem("nivPerm")})">
                            <img src="../assets/img/Icone/editIcon.svg" class="tooltip" title="Editar Usuário" id="btn_update" onclick="alterar()">
                            <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip" title="Mais Informações" id="btn_get" onclick="mostrar_dados()">
                        `;
                     
                        
                        document.addEventListener("DOMContentLoaded", function () {
                            carregarFeed(); // Chame a função para carregar a tabela de usuários
                            tippy(".tooltip", {
                                placement: "top",
                            });
                        });

                            linhaTable.appendChild(celulaMaquina);
                            linhaTable.appendChild(celulaDataHora);
                            linhaTable.appendChild(celulaMotivo);
                            linhaTable.appendChild(celulaDuracao);
                            linhaTable.appendChild(celulaSituacao);
                            linhaTable.appendChild(celulaBotoes);

                            tableStrikes.appendChild(linhaTable);
                        }
                    })
                }
            } else {
                throw ('Houve um erro na API!');
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

getFiltrosSelecionados().elementos.forEach((elemento) => {
    elemento.addEventListener('sl-change', event => {
       let strikes = document.getElementById('listaDeStrikes');
    //    strikes.innerHTML = '';
    //    mostrarTodasMaquinas(localStorage.getItem("instituicao"));
    });
 })

document.addEventListener('DOMContentLoaded', function() {
    console.log('carreguei');
    carregarFeed()
    contadoresStrike()
});