const selects = document.querySelectorAll("sl-select");

const chkSelectValue = () => {
   for(let i = 0; i < selects.length; i++) {
      let select = selects[i];
      let value = select.value;

      if(value) {
         select.style.backgroundColor = "#9747FF";
      } else {
         select.style.backgroundColor = "#bfbfbf";
      }
   }
}

for(let i = 0; i < selects.length; i++) {
   selects[i].addEventListener('sl-change', event => {
      chkSelectValue()
    });
}
