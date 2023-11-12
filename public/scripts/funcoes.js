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

   const dialog = document.createElement('sl-dialog');
   dialog.setAttribute('label', '3º Strike - Nome da máquina');
   dialog.setAttribute('strike-dialog', true);
   dialog.classList.add('dialog-overview');
   dialog.style.cssText = '--width: 80vw;';
   
   const dialogContent = document.createElement('div');
   dialogContent.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
   dialog.appendChild(dialogContent);
   
   const dialogButtons = document.createElement('div');
   dialogButtons.classList.add('stk-dialog-buttons');
   
   const approveButton = document.createElement('button');
   approveButton.classList.add('btn', 'primario', 'btn-full');
   approveButton.textContent = 'Aprovar strike';
   dialogButtons.appendChild(approveButton);
   
   const reproveButton = document.createElement('button');
   reproveButton.classList.add('btn', 'terciario', 'btn-full');
   reproveButton.textContent = 'Reprovar strike';
   dialogButtons.appendChild(reproveButton);
   
   dialog.appendChild(dialogButtons);

   body.insertBefore(dialog, body.childNodes[0]);
}

function mostrarStrikeDialog() {
   const dialogStrike = document.querySelector("sl-dialog[strike-dialog]");
   dialogStrike.show();
}

function verifStrikes() {
   const idInstituicao = localStorage.getItem("instituicao");
   
   fetch(`/maquina/capturarTodasMaquinas/`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         filtros: false,
         idInstituicao: idInstituicao,
      })
   }).then((response) => {

   })
   .catch((err) => {
      console.log("Erro de requisição.", err);
      reject(err);
   })
}

window.onload = () => {
   addDialog();
}