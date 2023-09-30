const loadInputs = () => {
   $("head").append("<link rel='stylesheet' href='../styles/components/input.css'>");

   var inputList = document.querySelectorAll(".input");
   for(let i = 0; i < inputList.length; i++) {
      var input = inputList[i];
      var size = input.getAttribute("fontSize");
      input.style.fontSize = `${size}`;
   }
}

window.onload = () => {
   loadInputs();
}