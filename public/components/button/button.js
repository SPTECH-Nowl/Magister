const buttons = document.querySelectorAll(".btn");

const loadButton = () => {
   for (let i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var size = btn.getAttribute("fontSize");
      var width = btn.getAttribute("width");
   
      btn.style.width = `${width}`;
      btn.style.fontSize = `${size}`;
   }
} 

window.onload = () => {
   loadButton();
}