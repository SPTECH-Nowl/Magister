const validarAcesso = (permMinima) => {
   let acesso = localStorage.getItem("nivPerm");
   let nome = localStorage.getItem("nome");
   let userLink = document.getElementById("usuarios_item");
   let instLink = document.getElementById("instituicoes_item");

   if(acesso > permMinima) {
      window.location = '/public/404.html';
   }

   if(acesso > 2) {
      userLink.style.display = 'none';
      instLink.style.display = 'none';
   } else if(acesso > 1) {
      instLink.style.display = 'none';
   }
}
