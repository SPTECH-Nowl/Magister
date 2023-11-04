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
