let canva_btn = document.getElementById("canvas-btn");
let drop_btn = document.getElementById("drop-btn");
let drop_item = document.getElementById("drop-item");
let main = document.getElementById("main");
let temp_sb = document.getElementById("sidebar");
let tsbul = document.getElementById("tsbul");
let active_li = document.getElementById("activeLi");
let b1rclick1 = document.getElementById("click-par1");
let d1 = document.getElementById("div1");
let d2 = document.getElementById("div2");
let b5b1 = document.getElementById("b5p1");
let b5b2 = document.getElementById("b5p2");
let b5bp1 = document.getElementById("b5pc1");
let b5bp2 = document.getElementById("b5pc2");

let btn_active = false;


canva_btn.addEventListener("click", function () {
    if (btn_active == true) {
        btn_active = false;
        temp_sb.classList.add("hidetsb");
        temp_sb.classList.remove("displaytsb");
        main.classList.remove("enlargeMain");

    }
    else {
        btn_active = true;
        temp_sb.classList.add("displaytsb");
        temp_sb.classList.remove("hidetsb");
        main.classList.add("enlargeMain");
    }
});

drop_btn.addEventListener("click", function () {
    drop_item.classList.toggle("hide");
});

tsbul.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-xl")) {
        event.target.parentNode.parentNode.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.parentNode.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode.parentNode.parentNode;
    }
    else if(event.target.classList.contains("persbp")){
        event.target.parentNode.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode.parentNode;
    }
    else if(event.target.classList.contains("psbul")){
        event.target.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode;
    }
});

b1rclick1.addEventListener("click", function (event) {
    if (event.target.classList.contains("c1") || event.target.classList.contains("c2")) {
        let parent = event.target.parentNode;
        let p = parent.nextElementSibling;
        p.classList.toggle("d-none");
        parent.lastElementChild.classList.toggle("fa-chevron-up");
        parent.lastElementChild.classList.toggle("fa-chevron-down");
        if(parent == d1){
            if(d2.classList.contains("rounded-bottom-0")){
                d2.lastElementChild.click();
            }
        }
        else{
            if(d1.classList.contains("rounded-bottom-0")){
                d1.lastElementChild.click();
            }
        }
        parent.classList.toggle("rounded-bottom-0");
    }
});

b5b1.addEventListener("click", function(event){
    if(event.target.classList.contains("bg-white") == true){
       change();
    }
});
b5b2.addEventListener("click", function(event){
    if(event.target.classList.contains("bg-white") == true){
        change();
    }
});

let change = function(){
    b5b2.classList.toggle("psbbtn");
    b5b2.classList.toggle("bg-white");
    b5b2.classList.toggle("fw-bold");
    b5bp2.classList.toggle("d-none");
    b5b1.classList.toggle("psbbtn");
    b5b1.classList.toggle("bg-white");
    b5b1.classList.toggle("fw-bold");
    b5bp1.classList.toggle("d-none");
}