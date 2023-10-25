
window.onscroll = () => {
    if (window.scrollY > 0) {
        nav.style.backdropFilter = "blur(16px)";
        nav.style.borderRadius = "25px";
        nav.style.margin = " 10px 50px";
        nav.style.width = "85vw";
        nav.style.boxShadow = "0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 2px 2px 0px rgba(0, 0, 0, 0.09), 0px 6px 3px 0px rgba(0, 0, 0, 0.05), 0px 10px 4px 0px rgba(0, 0, 0, 0.01), 0px 15px 4px 0px rgba(0, 0, 0, 0.00)"
        nav.style.backgroundColor = "#E3E3E3";

    } else {
        nav.style.backdropFilter = "none";
        nav.style.borderRadius = "0";
        nav.style.margin = "0 0";
        nav.style.width = "100%";
        nav.style.boxShadow = "none"
        nav.style.backgroundColor = "rgba(0, 0, 0, 0)";

    }
}



var menuSwitch = document.getElementById("menuSwitch");
var menuSwitchMobile = document.getElementById("menuSwitchMobile");

var navMobile = document.getElementById("navMobile");
var sectionsArray = document.getElementsByTagName("section");

menuSwitchMobile.addEventListener("click", function(){
    if (navMobile.style.display === "flex") {
        navMobile.style.display = "none"

        navMobile.classList.remove("requires-no-scroll")

        for(i = 0; i < sectionsArray.length; i++){
            sectionsArray[i].style.filter = "brightness(1)"
        }

    } else {
        navMobile.style.display = "flex"

        for(i = 0; i < sectionsArray.length; i++){
            sectionsArray[i].style.filter = "brightness(0.7)"
        }
        
        navMobile.classList.add("requires-no-scroll")
    }
});

menuSwitch.addEventListener("click", function(){
    if (navMobile.style.display === "flex") {
        navMobile.style.display = "none"

        navMobile.classList.remove("requires-no-scroll")

        for(i = 0; i < sectionsArray.length; i++){
            sectionsArray[i].style.filter = "brightness(1)"
        }

    } else {
        navMobile.style.display = "flex"

        for(i = 0; i < sectionsArray.length; i++){
            sectionsArray[i].style.filter = "brightness(0.7)"
        }
        
        navMobile.classList.add("requires-no-scroll")
    }
});