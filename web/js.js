const menubar = ["file","edit"];
const menus = {};
const menuchildren = {};

menubar.forEach(x => {
    menus[x] = document.getElementById(x);
    menuchildren[x] = document.getElementById(`child${x}`);
    menus[x].addEventListener("click", function(){
        menubar.forEach(y => {
            menus[y].style.backgroundColor = "#aaa";
            menuchildren[y].style.display = "none";
        });
        menus[x].style.backgroundColor = "#bbb";
        menuchildren[x].style.display = "block";
    });
});


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

async function getcwd(){
    var cwd = await eel.PYgetcwd()();
    return cwd;
}

var pathlist = [];
var count = 0;
const filename = document.getElementById("name");
const readfile = document.getElementById("readfile");
readfile.addEventListener("click",async function(){
    cwd = await getcwd();
    let pathlist = await eel.PYreadfile()();
    pathlist.forEach((imgpath) => {
        var path = new URL(imgpath, `file://${cwd}`).href;
        filename.readOnly = "false";
        filename.value = path;
        filename.readOnly = "true";
        files[cells[count].toLowerCase()].src = path;
    });

});

const save = document.getElementById("save");
save.addEventListener("click",async function(){
    cwd = await getcwd();
    path = 'C:/Users/tsuka/Desktop/新しいフォルダー (3)/みつあみ.png';
    path = new URL(path,`file://${cwd}`);
    filename.readOnly = "false";
    filename.value = path;
    filename.readOnly = "true";
    files["fr"].src = path;
});

const overwrite = document.getElementById("overwrite");
overwrite.addEventListener("click",function(){
    files["fr"].src = "file:///C:/Users/tsuka/Desktop/%E6%96%B0%E3%81%97%E3%81%84%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E3%83%BC%20(3)/ALL1N.jpg"
});
