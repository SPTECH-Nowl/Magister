const validarAcesso = () => {
   var acesso = localStorage.getItem("nivelUsuario");
   var nome = localStorage.getItem("nomeUsuario")

   if(acesso >= 2 && acesso != undefined && acesso != null) {
      b_usuario.innerHTML = nome;
      alert("Bem vindo!");
   }/* else {
      window.location.href = "http://localhost:3333/index.html";
   }*/
}
