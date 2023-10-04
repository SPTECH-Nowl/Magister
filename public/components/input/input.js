const loadInputElement = () => {
   var inputList = document.querySelectorAll(".input");
   for(let i = 0; i < inputList.length; i++) {
      var input = inputList[i];
      var size = input.getAttribute("fontSize");

      input.style.fontSize = `${size}`;
   }
}


const eyes = document.querySelectorAll(".ph-eye");
const togglePassword = () => {

   for(let i = 0; i < eyes.length; i++) {
      var eye = eyes[i];
      var input = eye.previousElementSibling;

      input.type = input.type === "password" ? "text" : "password";
      
      if(input.type === "password") {
         eye.classList.remove("ph-eye-closed");
         eye.classList.add("ph-eye");
      } else{
         eye.classList.remove("ph-eye");
         eye.classList.add("ph-eye-closed");
      }
   }
}

const addToggleFunction = () => {
   for(let i = 0; i < eyes.length; i++) {
      var eye = eyes[i];
      eye.addEventListener("click", togglePassword);
   }
}

window.onload = () => {
   loadInputElement();
   addToggleFunction();
}