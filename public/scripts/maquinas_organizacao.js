function capturarTodasMaquinas(idInstituicao) {
   return new Promise((resolve, reject) => {
      fetch(`/maquinas/capturarTodasMaquinas/:idInstituicao`)
      .then((response) => {
         if(response.ok) {
            response.json().then((response) => {
               resolve(response);
            });
         }
      })
      .catch((error) => {
         console.log("Erro de requisição", error)
         reject(error);
      })
   }) 
}

function mostrarTodasMaquinas() {
   const maquinas = document.getElementById("maquinas");

   capturarTodasMaquinas(1).then((dadosMaquinas) => {
      console.log(dadosMaquinas);
      dadosMaquinas.forEach(maquina => {
         let nome = maquina.nome;
         let emUso = maquina.emUso == 0 ? "OFF" : "ON";
         let qtdStrikes = maquina.qtdStrikes;
         let status = maquina.status;

         const maquinaItem = document.createElement("div");
         maquinaItem.classList.add("maquina-item");

         maquinaItem.innerHTML = `
            <img src="../assets/img/Icone/windows_icon.svg" alt="" class="so">
            <div class="stat">
               <div class="stat-texts">
                  <h2>${nome}</h2>
                  <span class="maquina-stat">Em uso: <highlight class="uso-maquina">${emUso}</highlight> </span>
                  <span class="maquina-stat">Estado: <highlight class="status-maquina">${status}</highlight> </span>
               </div>
               <div class="stat-alerts">
                  <i class="ph ph-warning strikes" data-qtd="${qtdStrikes}"></i>
                  <i class="ph ph-warning strikes" data-qtd="${qtdStrikes}"></i>
                  <i class="ph ph-warning strikes" data-qtd="${qtdStrikes}"></i>
               </div>
            </div>
         `;

         maquinas.appendChild(maquinaItem);

         const uso_maquina = maquinaItem.querySelector(".uso-maquina");
         const strikes = maquinaItem.querySelectorAll(".strikes");
         const status_maquina = maquinaItem.querySelector(".status-maquina");

         if (emUso === "ON") uso_maquina.style.color = "#BF80FF";

         strikes.forEach((strike, index) => {
            if (index < qtdStrikes) {
               strike.style.color = "red";
            }
         });

         switch (status) {
            case "Crítico":
               status_maquina.style.color = "red";
               break;
            case "Alerta":
               status_maquina.style.color = "yellow";
               break;
            default:
               status_maquina.style.color = "#787878";
               break;
         }
      });
   });
}

window.onload = () => {
   mostrarTodasMaquinas()
}