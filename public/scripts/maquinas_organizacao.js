b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
// essa função é só para visualização de como a tela fica quando está sendo preenchida, ela vai ser substituída pela 
// função que irá trazer os dados vindos do banco

var maquinas = document.getElementById("maquinas");
const testeViz = () => {

   for(let i = 0; i < 12; i++) {
      maquinas.innerHTML += `
      <div class="maquina-item">
      <img src="../assets/img/Icone/windows_icon.svg" alt="" class="so">
      <div class="stat">
         <div class="stat-texts">
            <h2>Computer Id</h2>
            <span class="maquina-stat">Em uso: <highlight>ON</highlight> </span>
            <span class="maquina-stat">Estado: <highlight>Crítico</highlight> </span>
         </div>
         <div class="stat-alerts">
            <img src="../assets/img/Icone/alert_icon_red.svg" alt="">
            <img src="../assets/img/Icone/alert_icon.svg" alt="">
            <img src="../assets/img/Icone/alert_icon.svg" alt="">
         </div>
      </div>
      </div>
      `;
   }
}

window.onload = () => {
   testeViz()
}