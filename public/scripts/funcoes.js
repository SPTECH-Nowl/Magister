const validarAcesso = () => {
   var acesso = sessionStorage.nivPerm;
   var nome = sessionStorage.nomeUsuario;

   if(acesso != undefined && acesso != null) {
      b_usuario.innerHTML = nome;
   } else {
    window.location = "public/index.html"
   }
}
