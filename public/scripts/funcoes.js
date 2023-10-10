const validarAcesso = () => {
   var acesso = localStorage.getItem("nivelUsuario");

   if(acesso >= 2 || acesso != undefined || acesso != null) {
      b_usuario.innerHTML = nome;
      alert("Bem vindo!");
   } else {
      window.location.href = "http://127.0.0.1:5500/public/index.html";
   }
}
