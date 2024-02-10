//renderer-1
//const { ipcRenderer } = require("electron");

var count = 0;

const menubar = ["file","edit","config"];
const menus = {};
const menuchildren = {};

menubar.forEach(x => {
    menus[x] = document.getElementById(x);
    menuchildren[x] = document.getElementById(`child${x}`);
    
    if (menus[x] && menuchildren[x]) {
        menus[x].addEventListener("click", function(){
            menubar.forEach(y => {
                if (menus[y]) {
                    menus[y].style.backgroundColor = "#eee";
                }
                if (menuchildren[y]) {
                    menuchildren[y].style.display = "none";
                }
            });
            if (menus[x]) {
                menus[x].style.backgroundColor = "#def";
            }
            if (menuchildren[x]) {
                menuchildren[x].style.display = "block";
            }
        });
    }
});

var selectimg = document.getElementById("select");
const cells = ["FR","FC","FL","RR","RC","RL","LR","LC","LL","BR","BC","BL"];
const files = {};
const clearbtn = {};
const paths = {};

cells.forEach(x => {
    paths[x.toLowerCase()] = document.getElementById(`i${x.toLowerCase()}`);
    clearbtn[x.toLowerCase()] = document.getElementById(`x${x.toLowerCase()}`);
    clearbtn[x.toLowerCase()].addEventListener("click", function(){
        var getimg = document.getElementById(`get${count}`);
        let preview = files[cells[count].toLowerCase()];
    
        if(getimg){
        getimg.value = "";
        selectimg.src = "";
        preview.src = "";
    
        filename.readOnly = false;
        filename.value = "";
        filename.readOnly = true;
        filetype.readOnly = false;
        filetype.value = "";
        filetype.readOnly = true; 

        }
    });

    files[x.toLowerCase()] = document.getElementById(x);
    files[x.toLowerCase()].addEventListener("click", function(){
        cells.forEach(y => {
            files[y.toLowerCase()].style.border = "none";
            clearbtn[y.toLowerCase()].style.display = "none";
        });
        files[x.toLowerCase()].style.border = "3px dashed #ddd";
        clearbtn[x.toLowerCase()].style.display = "block";
        selectimg.src = files[x.toLowerCase()].src;
        count = cells.indexOf(x,0);
        console.log(count);
    });
});

