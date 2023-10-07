const mostrarLogin = document.getElementById("activeLogin");
var mostrarCadastro = document.getElementById("closeLogin");

var cadastro = document.getElementById("cadastroSection");
var login = document.getElementById("loginSection")
var txtLogin = document.getElementById("txtLogin")


const toggleLogin = () => {
    if (login.classList.contains("closeLogin")) {
        login.classList.remove('closeLogin')
        login.classList.add('activeLogin')
        cadastro.classList.remove('active')
        cadastro.classList.add("close")
        txtLogin.classList.remove('close')
        txtLogin.classList.add('active')
    }
    else {
        login.classList.add('closeLogin')
        login.classList.remove('activeLogin')
        cadastro.classList.add('active')
        cadastro.classList.remove("close")


    }
}

mostrarLogin.addEventListener("click", function () {


    if (login.classList.contains("closeLogin")) {
        login.classList.remove('closeLogin')
        login.classList.add('activeLogin')
        cadastro.classList.remove('active')
        cadastro.classList.add("close")
        txtLogin.classList.remove('close')
        txtLogin.classList.add('active')
    }
    else {
        login.classList.add('closeLogin')
        login.classList.remove('activeLogin')
        cadastro.classList.add('active')
        cadastro.classList.remove("close")


    }
})

mostrarCadastro.addEventListener("click", () => {

    if (login.classList.contains("closeLogin")) {
        login.classList.remove('closeLogin')
        login.classList.add('activeLogin')
        cadastro.classList.remove('active')
        cadastro.classList.add("close")
        txtLogin.classList.remove('active')
        txtLogin.classList.add('close')
    }
    else {
        login.classList.add('closeLogin')
        login.classList.remove('activeLogin')
        cadastro.classList.add('active')
        cadastro.classList.remove("close")
        txtLogin.classList.remove('active')
        txtLogin.classList.add('close')
    }
})

