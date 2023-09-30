const loadButton = (id_button) => {
   var btn = document.getElementById(id_button);
   var size = btn.getAttribute("fontSize");
   var width = btn.getAttribute("width");

   btn.style.width = `${width}`;
   btn.style.fontSize = `${size}`;
} 

window.onload = () => {
   $("head").append("<link rel='stylesheet' href='../styles/components/button.css'>");
}