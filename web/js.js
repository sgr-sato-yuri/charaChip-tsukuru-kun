const menubar = ["file","edit"];
const menus = {};
const menuchildren = {};

menubar.forEach(x => {
    menus[x] = document.getElementById(x);
    menuchildren[x] = document.getElementById(`child${x}`);
    menus[x].addEventListener("click", function(){
        menubar.forEach(y => {
            menus[y].style.backgroundColor = "#aaa";
            menuchildren[y].style.zIndex = "none";
        });
        menus[x].style.backgroundColor = "#bbb";
        menuchildren[y].style.zIndex = "block";
    });
});

const readfile = document.getElementById("readfile");
readfile.addEventListener("click",function(){
    eel.PYreadfile
})

var selectimg = document.getElementById("select");
const cells = ["FR","FC","FL","RR","RC","RL","LR","LC","LL","BR","BC","BL"];
const files = {};

cells.forEach(x => {
    files[x.toLowerCase()] = document.getElementById(x);
    files[x.toLowerCase()].addEventListener("click", function(){
        cells.forEach(y => {
            files[y.toLowerCase()].style.border = "none";
        });
        files[x.toLowerCase()].style.border = "3px dashed #ddd";
        selectimg.src = files[x.toLowerCase()].src;
    });
});