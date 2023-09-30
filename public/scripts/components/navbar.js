const loadNavbar = (nome_usuario) => {
   $("head").append("<link rel='stylesheet' href='../styles/components/navbar.css'>");

   var navbar = document.querySelector("SideNav");
   navbar.innerHTML = `
   <div class="side-menu">
      <img src="../assets/img/elements/wave-menu.svg" alt="" class="wave-menu">
      <div class="user-profile">
         <div id="pfp"></div>
         <div class="texto-user">
            <span>Bem-vindo,</span>
            <span id="usuario">${nome_usuario}</span>
        </div>
      </div>

      <ul class="nav-list">
         <li>
            <img src="../assets/img/elements/dash.svg" alt="">
            Dashboard
         </li>
         <li>
            <img src="../assets/img/elements/pc.svg" alt="">
            Máquinas
         </li>
         <li>
            <img src="../assets/img/elements/programa.svg" alt="">
            Programas
         </li>
      </ul>

      <ul>
         <li>
            <img src="../assets/img/elements/settings.svg" alt="">
            Ajustes
         </li>
      </ul>
   </div>
   `;
}

window.onload = () => {
   loadNavbar("Usuário");
}