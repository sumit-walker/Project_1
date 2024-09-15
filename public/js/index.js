let btn=document.querySelector(".menu");
let menu=document.querySelector(".menu-pg");
let nav=document.querySelector(".nav");
btn.addEventListener("click",function(){
    console.log("ok")
    if(menu.style.display==="block"){
        menu.style.display="none"
    }else{
        menu.style.display="block"
    }
})


