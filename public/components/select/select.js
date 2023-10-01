const selects = document.querySelectorAll("sl-select");

const chkSelectValue = (id_select) => {
   var selectValue = document.getElementById(id_select).value;
   var select = document.getElementById(id_select);
   
   if(selectValue) {
      select.style.backgroundColor = "#9747FF";
   } else {
      select.style.backgroundColor = "#bdbdbd";
   }
}

const addChkValue = () => {
   for(let i = 0; i < selects.length; i++) {
      var select = selects[i];
      var id = select.getAttribute("id");
      select.addEventListener("sl-change", () => {
         chkSelectValue(id);
      })
   }
}