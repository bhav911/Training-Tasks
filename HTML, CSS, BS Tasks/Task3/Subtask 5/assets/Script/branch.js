let canva_btn = document.getElementById("canvas-btn");
let perm_sb = document.getElementById("perm-sb");
let drop_btn = document.getElementById("drop-btn");
let drop_item = document.getElementById("drop-item");
let main = document.getElementById("main");
let temp_sb = document.getElementById("sidebar");
let tsbul = document.getElementById("tsbul");
let persbul = document.getElementById("persbul");
let active_li = document.getElementById("activeLi");
let pactive_li = document.getElementById("pactiveLi");
let b1rclick = document.getElementsByClassName("psbbtn");

let btn_active = false;
canva_btn.addEventListener("click", function(){
    if(btn_active == true){
        btn_active = false;
        perm_sb.classList.add("displaypsb");
        temp_sb.classList.add("hidetsb");
        perm_sb.classList.remove("hidepsb");
        temp_sb.classList.remove("displaytsb");
        main.classList.remove("enlargeMain");

    }
    else{
        btn_active = true;
        perm_sb.classList.add("hidepsb");
        temp_sb.classList.add("displaytsb");
        perm_sb.classList.remove("displaypsb");
        temp_sb.classList.remove("hidetsb");
        main.classList.add("enlargeMain");
    }
});

drop_btn.addEventListener("click", function(){
    drop_item.classList.toggle("hide");
});

let changeClass = function(){

};


tsbul.addEventListener("click", function(event){
    if(event.target.classList.contains("fa-xl") || event.target.classList.contains("spanText") ){
        event.target.parentNode.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode.parentNode;
    }
    else if(event.target.classList.contains("sbtbla")){
        event.target.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode;
    }
});

persbul.addEventListener("click", function(event){
    if(event.target.classList.contains("persbp") ){
        event.target.parentNode.classList.toggle("psbbtn");
        event.target.parentNode.classList.toggle("psbtbl");
        pactive_li.classList.toggle("psbtbl");
        pactive_li.classList.toggle("psbbtn");
        pactive_li = event.target.parentNode;
    }
    else if(event.target.classList.contains("fa-xl") ){
        event.target.parentNode.parentNode.classList.toggle("psbbtn");
        event.target.parentNode.parentNode.classList.toggle("psbtbl");
        pactive_li.classList.toggle("psbtbl");
        pactive_li.classList.toggle("psbbtn");
        pactive_li = event.target.parentNode.parentNode;
    }
    else if(event.target.classList.contains("btmline") ){
        event.target.classList.toggle("psbbtn");
        event.target.classList.toggle("psbtbl");
        pactive_li.classList.toggle("psbtbl");
        pactive_li.classList.toggle("psbbtn");
        pactive_li = event.target;
    }
});

b1rclick.addEventListener("click", function(event){
    if(event.target.classList.contains("c1")||event.target.classList.contains("c2")||event.target.classList.contains("c3")){
        let p = event.target.parentNode.nextElementSibling;
    }
});