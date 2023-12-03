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
   const idUsuario = localStorage.getItem("idUsuario");
   return new Promise(() => {
      getPermissaoUsuario(idUsuario)
      .then(permissoes => {
         const body = document.querySelector('body');

         const dialogElement = document.createElement('sl-dialog');
         dialogElement.setAttribute('label', 'Últimas máquinas com advertência');
         dialogElement.setAttribute('strike-dialog', true);
         dialogElement.classList.add('dialog-scrolling');
         
         const maquinasStrikeContainer = document.createElement('div');
         maquinasStrikeContainer.classList.add('maquinas-strike-container');
         
         dialogElement.appendChild(maquinasStrikeContainer);
         
         const maquinaStrikeActions = document.createElement('div');
         maquinaStrikeActions.classList.add('maquina-strike-actions');
         
         dialogElement.appendChild(maquinaStrikeActions);
         
         const selectElement = document.createElement('sl-select');
         selectElement.setAttribute('placeholder', 'Selecione uma ação');
         selectElement.setAttribute('placement', 'bottom');
         selectElement.setAttribute('pill', '');
         selectElement.setAttribute('filtered', '');
         selectElement.setAttribute('clearable', '');
         selectElement.setAttribute('acoes', '');
         selectElement.setAttribute('id', 'select_permissao');

         permissoes.forEach(permissao => {
            const optionAtuacao = document.createElement('sl-option');
            optionAtuacao.textContent = permissao.nome;
            optionAtuacao.setAttribute('value', permissao.idAtuacao);
            optionAtuacao.setAttribute('atuacao', '');

            const iconInfoCircle = document.createElement('sl-icon');
            iconInfoCircle.setAttribute('name', 'info-circle');
            iconInfoCircle.setAttribute('slot', 'suffix');
            optionAtuacao.appendChild(iconInfoCircle);

            selectElement.appendChild(optionAtuacao);  
         });

         maquinaStrikeActions.appendChild(selectElement);
      
         const maquinaStrikeButtons = document.createElement('div');
         maquinaStrikeButtons.classList.add('maquina-strike-buttons');
         
         maquinaStrikeActions.appendChild(maquinaStrikeButtons);
         
         const botaoAplicarAcao = document.createElement('button');
         botaoAplicarAcao.textContent = 'Aplicar ação';
         botaoAplicarAcao.classList.add('btn', 'primario', 'btn-full');
         botaoAplicarAcao.id = 'btn_aplicar_acao';
         botaoAplicarAcao.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
               
               const result = await Swal.fire({
                  title: 'Confirmação',
                  text: 'Deseja realmente aplicar a ação?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Sim',
                  cancelButtonText: 'Cancelar'
               });

               if (result.isConfirmed) {
                  await aplicarAdvertencia();
                 
                  Swal.fire({
                     title: 'Sucesso!',
                     text: 'Ação aplicada com sucesso!',
                     icon: 'success',
                     showCancelButton: true,
                     confirmButtonText: 'OK',
                     timer: 50000
                  })
               }
            } catch (error) {
             
               console.error(error);
            }
         });
         maquinaStrikeButtons.appendChild(botaoAplicarAcao);
         
         const botaoInativarStrikes = document.createElement('button');
         botaoInativarStrikes.textContent = 'Inativar strikes';
         botaoInativarStrikes.classList.add('btn', 'secundario', 'btn-full');
         botaoInativarStrikes.id = 'btn_inativar';
         botaoInativarStrikes.addEventListener("click", async (e) => {
            e.preventDefault;
            try {
               await aplicarAdvertencia();
               
               Swal.fire({
                  title: 'Sucesso!',
                  text: 'Ação aplicada com sucesso!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  timer:5000
               });
            } catch (error) {
               
               console.error(error);
            }
         })
         maquinaStrikeButtons.appendChild(botaoInativarStrikes);
         
         body.appendChild(dialogElement);    
      })
   });
}

async function aplicarAdvertencia() {
   return new Promise((resolve, reject) => {
    
      setTimeout(() => {
         resolve();
      }, 5000); 
   });
}

function addToast () {
   const idInstituicao = localStorage.getItem("instituicao");
   return new Promise(() => {
      getStrikesToasts(idInstituicao)
      .then(ultimosStrikes => {
         // ultimosStrikes.forEach(strike => {
         //    alert(strike.nome + strike.dataHora)

         // })

         const body = document.querySelector('body')

         const toast = document.createElement('div')
         const toastHeader = document.createElement('div')
         const toastBody = document.createElement('div')

         toast.classList.add('toast')
         toastHeader.classList.add('toast-header')
         toastBody.classList.add('toast-body')

         toast.setAttribute('id', 'toast')
         toastHeader.setAttribute('onclick', 'toggleToast()')
         toastBody.setAttribute('id', 'toastBody')

         toastHeader.innerHTML = `ÚLTIMOS STRIKES (${ultimosStrikes.length}) ▼`

         ultimosStrikes.forEach(strike => {
            const toastLine = document.createElement('div')
            const toastBtns = document.createElement('div')

            toastLine.classList.add('toast-line')
            toastBtns.classList.add('toast-btns')


            const lineName = document.createElement('p')
            const lineHora = document.createElement('p')

            const name = document.createTextNode(strike.nome)
            const hora = document.createTextNode(strike.dataHora)
            
            lineName.appendChild(name)
            lineHora.appendChild(hora)

            toastBtns.innerHTML = `
               <a href="./strikes.html">
                  <img src="../assets/img/Icone/moreInfoIcon.svg" class="tooltip toast-btn" title="Ver Strikes" id="btn_info">
               </a>
            `;
            
            toastLine.appendChild(lineName)
            toastLine.appendChild(lineHora)
            toastLine.appendChild(toastBtns)

            toastBody.appendChild(toastLine);
         })

         // if (ultimosStrikes.length == 3) {
         //    const verMais = document.createElement('a')
         //    verMais.setAttribute('href', './strikes.html')
         //    verMais.classList.add('toast-ver-mais')

         //    const verMaisTexto = document.createTextNode('Ver mais...')

         //    verMais.appendChild(verMaisTexto)
         //    toastBody.appendChild(verMais)
         // }
         
         toast.appendChild(toastHeader)
         toast.appendChild(toastBody)
         body.appendChild(toast);
      })
   });
}

function toggleToast () {
   let toast = document.getElementById('toast');
   let toastBody = document.getElementById('toastBody');

   if (toast.classList.contains('open')) {
      toast.style.transform = `translateY(0px)`
   } else {
      toast.style.transform = `translateY(${toastBody.offsetHeight}px)`
   }

   toast.classList.toggle('open')
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
               resolve(response);
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

function getStrikesToasts(idInstituicao) {
   return new Promise((resolve, reject) => {
      fetch(`/strikes/strikesToast/${idInstituicao}`)
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
   checkbox.setAttribute("idMaquinaCheck", registro.id);
   checkbox.setAttribute("acaoCheckbox", '');
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
      if(dados.length > 0) {
         dados.forEach((registro) => {
            getStrikesDaMaquina(registro.id).then(datas => {
               let dataHora = datas[0];
               addStrike(registro, dataHora);
            })
         });
         setTimeout(() => {
            mostrarStrikeDialog();
         }, 500);
      }
   });
}

function changePageAction() {
   sessionStorage.nomeMaquina = nome;
   sessionStorage.idMaquina = id;
   window.location.href = "http://52.3.127.92//dashboard/dashboard_maquina.html";
}

function getCheckboxAcao() {
   const nodeList = document.querySelectorAll("sl-checkbox[acaoCheckbox]");
   const checkboxes = [...nodeList];
   let checkBool = [];

   checkboxes.forEach((check) => checkBool.push(check.checked))

   console.log(nodeList, checkBool);
   
   return checkboxes;
}

function excluirStrike(checkboxIds) {
   fetch(`/strikes/excluirStrike`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         usarIdMaquina: true,
         checkboxIdsServer: checkboxIds
      })
   })
   .then(response => {
      if(response.ok) {
         if (response.status == 204) {
            console.log(response);
        } else {
            location.reload();
        }
      } else {
         console.log('Houve um erro na requisição da API!')
      }
   })
}

function aplicarAdvertencia() {
   const checkboxes = getCheckboxAcao();
   var checkboxMarcadas = checkboxes.filter((check) => check.checked);
   var checkboxIds = checkboxMarcadas.map((check) => check.getAttribute("idMaquinaCheck")).toString();

   excluirStrike(checkboxIds);
}

window.addEventListener("DOMContentLoaded", async () => {
   window.location.href.slice(-12) != 'strikes.html' ? addToast() : null;
   
   addDialog();
   verifStrikes();
});