const chkSelectValue = () => {
   var selectValue = document.getElementById("select_ordem").value;
   var select = document.getElementById("select_ordem");
   
   if(selectValue) {
      select.style.backgroundColor = "#9747FF";
      select.style.color = "red !importante";
   } else {
      select.style.backgroundColor = "#bdbdbd";
   }
}

select_ordem.addEventListener("sl-change", () => {
   chkSelectValue();
})

window.onload = () => {
   $("head").append("<link rel='stylesheet' href='../styles/components/select.css'>");
}