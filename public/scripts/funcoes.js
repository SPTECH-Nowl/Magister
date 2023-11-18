const validarAcesso = (permMinima) => {
   let acesso = localStorage.getItem("nivPerm");
   let nome = localStorage.getItem("nome");
   let nav = document.getElementsByClassName("side-menu");
   let h1 = Array.from(document.getElementsByTagName("h1"));
   let waveMenu = document.getElementsByClassName("wave-menu");
   let userLink = document.getElementById("usuarios_item");
   let instLink = document.getElementById("instituicoes_item");

   nav[0].classList = 'side-menu';

   if(acesso > permMinima) {
      window.location = '/public/404.html';
   }

   if(acesso > 2) {
      userLink.style.display = 'none';
      instLink.style.display = 'none';
   } else if(acesso > 1) {
      instLink.style.display = 'none';
      nav[0].classList = 'side-menu dark-menu';
      waveMenu[0].src = '../assets/img/elements/wave-menu-dark.png';
      h1.forEach(e => e.style.color = 'var(--color-purple-800)');
   } else {
      nav[0].classList = 'side-menu black-menu';
      waveMenu[0].src = '../assets/img/elements/wave-menu-black.png';
      h1.forEach(e => e.style.color = 'var(--color-gray-800)');
   }
}

function addDialog() {
   const body = document.querySelector('body');

   const dialogElement = document.createElement('sl-dialog');
   dialogElement.setAttribute('label', 'Últimas máquinas com advertência');
   dialogElement.setAttribute('strike-dialog', true);
   dialogElement.classList.add('dialog-scrolling');
   dialogElement.setAttribute('open', true);
   
   const maquinasStrikeContainer = document.createElement('div');
   maquinasStrikeContainer.classList.add('maquinas-strike-container');
   
   dialogElement.appendChild(maquinasStrikeContainer);
   
   const maquinaStrikeActions = document.createElement('div');
   maquinaStrikeActions.classList.add('maquina-strike-actions');
   
   dialogElement.appendChild(maquinaStrikeActions);
   
   const selectElement = document.createElement('sl-select');
   selectElement.setAttribute('placeholder', 'Selecione uma ação');
   selectElement.setAttribute('placement', 'bottom');
   selectElement.setAttribute('pill', true);
   selectElement.setAttribute('filtered', true);
   selectElement.setAttribute('clearable', true);
   selectElement.setAttribute('acoes', true);
   
   maquinaStrikeActions.appendChild(selectElement);
   
   const maquinaStrikeButtons = document.createElement('div');
   maquinaStrikeButtons.classList.add('maquina-strike-buttons');
   
   maquinaStrikeActions.appendChild(maquinaStrikeButtons);
   
   const botaoAplicarAcao = document.createElement('button');
   botaoAplicarAcao.textContent = 'Aplicar ação';
   botaoAplicarAcao.classList.add('btn', 'primario', 'btn-full');
   maquinaStrikeButtons.appendChild(botaoAplicarAcao);
   
   const botaoInativarStrikes = document.createElement('button');
   botaoInativarStrikes.textContent = 'Inativar strikes';
   botaoInativarStrikes.classList.add('btn', 'secundario', 'btn-full');
   maquinaStrikeButtons.appendChild(botaoInativarStrikes);
   
   body.appendChild(dialogElement);
   
}

function mostrarStrikeDialog() {
   const dialogStrike = document.querySelector("sl-dialog[strike-dialog]");
   dialogStrike.show();
}

function getStrikesPorMaquina() {
   const idInstituicao = localStorage.getItem("instituicao");
   const idUsuario = localStorage.getItem("idUsuario");

   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarStrikesPorMaquina/${idInstituicao}/${idUsuario}`)
      .then((response => {
         if(response.ok) {
            response.json().then((response) => {
               resolve(response)
            })
         }
      }))
      .catch((err) => {
         console.log("Erro de requisição", err);
         reject(err);
      })
   })
}

function getStrikesDaMaquina(idMaquina) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarStrikesDaMaquina/${idMaquina}`)
      .then((response) => {
         if(response.ok) {
            response.json().then((response) => {
               resolve(response);
            })
         }
      })
      .catch((err) => {
         console.log("Erro de requisição", err);
         reject(err);
      })
   })
}

function getPermissaoUsuario(idUsuario) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarPermissoes/${idUsuario}`)
      .then((response) => {
         if(response.ok) {
            response.json().then((response) => {
               resolve(response);
            })
         }
      })
      .catch((err) => {
         console.log("Erro de requisição", err);
         reject(err);
      })
   })
}

function addStrike(registro, dataHora) {
   const maquinasStrikeContainer = document.querySelector('.maquinas-strike-container');

   const maquinaStrike = document.createElement('div');
   maquinaStrike.classList.add('maquina-strike');
   
   const checkboxAndContent = document.createElement('div');
   checkboxAndContent.classList.add('checkbox-and-content');
   
   const checkbox = document.createElement('sl-checkbox');
   checkbox.setAttribute("idStrike", registro.id);
   checkboxAndContent.appendChild(checkbox);
   
   const maquinaStrikeInfo = document.createElement('div');
   maquinaStrikeInfo.classList.add('maquina-strike-info');
   
   const nomeMaquinaStrike = document.createElement('span');
   nomeMaquinaStrike.textContent = registro.nome;
   nomeMaquinaStrike.setAttribute('id', 'nome_maquina_strike');
   nomeMaquinaStrike.setAttribute('strike-link', '');
   maquinaStrikeInfo.appendChild(nomeMaquinaStrike);
   
   const strikesMaquinaStrike = document.createElement('span');

   if(registro.qtdStrikes > 3) {
      strikesMaquinaStrike.innerHTML = `
      <i class="ph ph-warning"><i/>
      <i class="ph ph-warning"><i/>
      <i class="ph ph-warning"><i/>
      `
   } else {
      strikesMaquinaStrike.innerHTML = `
      <i class="ph ph-warning"><i/>
      <i class="ph ph-warning"><i/>
      <i class="ph ph-warning"><i/>
      `
   }

   strikesMaquinaStrike.setAttribute('id', 'strikes_maquina_strike');
   maquinaStrikeInfo.appendChild(strikesMaquinaStrike);
   
   checkboxAndContent.appendChild(maquinaStrikeInfo);
   
   maquinaStrike.appendChild(checkboxAndContent);
   
   const maquinaStrikeHorario = document.createElement('div');
   maquinaStrikeHorario.classList.add('maquina-strike-horario');
   
   const dataMaquinaStrike = document.createElement('span');
   dataMaquinaStrike.textContent = dataHora.data;
   dataMaquinaStrike.setAttribute('id', 'data_maquina_strike');
   maquinaStrikeHorario.appendChild(dataMaquinaStrike);
   
   const horarioMaquinaStrike = document.createElement('span');
   horarioMaquinaStrike.textContent = dataHora.hora;
   horarioMaquinaStrike.setAttribute('id', 'horario_maquina_strike');
   maquinaStrikeHorario.appendChild(horarioMaquinaStrike);
   
   maquinaStrike.appendChild(maquinaStrikeHorario);
   
   maquinasStrikeContainer.appendChild(maquinaStrike);
}

function verifStrikes() {
   getStrikesPorMaquina().then(dados => {
      dados.forEach((registro) => {
         getStrikesDaMaquina(registro.id).then(datas => {
            let dataHora = datas[0];
            addStrike(registro, dataHora);
         })
      })
   });
}

function changePageAction() {
   sessionStorage.nomeMaquina = nome;
   sessionStorage.idMaquina = id;
   window.location.href = "http://localhost:3333/dashboard/dashboard_maquina.html";
}

function addAdvertencias() {
   let idUsuario = localStorage.getItem("idUsuario");
   let idInstituicao = localStorage.getItem("instituicao"); 
   let linksStrikes = [...document.querySelectorAll("span[strike-link]")];
   linksStrikes.forEach(link => {
      link.addEventListener("click", (e) => {
         e.preventDefault;
         changePageAction();
      })
   })
   
   addDialog();
   
   getPermissaoUsuario(idUsuario)
   .then(permissoes => {
      console.log(permissoes);
      permissoes.forEach(permissao => {
         
      })
      verifStrikes();
   }).then(_ => {
      mostrarStrikeDialog()
   })
} 

window.addEventListener("DOMContentLoaded", addAdvertencias);