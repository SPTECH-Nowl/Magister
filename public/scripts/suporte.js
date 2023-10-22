document.addEventListener("DOMContentLoaded", function () {
    const solicitarSuporteBtn = document.getElementById("solicitarSuporteBtn");

    solicitarSuporteBtn.addEventListener("click", function () {
        const slAlert = document.createElement("sl-alert");
        slAlert.setAttribute("type", "success");
        slAlert.textContent = "Sucesso! O suporte foi solicitado.";

        // Adicione a classe personalizada
        slAlert.classList.add("custom-modal");

        // Crie um elemento de contêiner para centralizar o modal e definir a cor de fundo
        const modalContainer = document.createElement("div");
        modalContainer.style.backgroundColor = "#6D499D"; // Cor de fundo rosa
        modalContainer.style.position = "fixed";
        modalContainer.style.top = "50%";
        modalContainer.style.left = "50%";
        modalContainer.style.transform = "translate(-50%, -50%)";
        modalContainer.style.zIndex = "9999";
        modalContainer.appendChild(slAlert);

        document.body.appendChild(modalContainer);
        slAlert.show();
    });
});
