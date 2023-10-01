const loadButton = () => {
   var btn = document.getElementById();
   var size = btn.getAttribute("fontSize");
   var width = btn.getAttribute("width");

   btn.style.width = `${width}`;
   btn.style.fontSize = `${size}`;
} 

window.onload = () => {
   loadButton();
}