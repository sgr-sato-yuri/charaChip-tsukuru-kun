//renderer-2

//新規作成コード
const newfile = document.getElementById("newfile");
newfile.addEventListener("click", async function(){
    var res = await window.api.newfile();
})
//ファイル読み込みコード
const form = document.getElementById("sendimg");
function createinput() {
    let newInput = document.createElement("input");
    newInput.type = "file";
    newInput.id = `get${count}`;
    newInput.name = `get${count}`;
    form.appendChild(newInput);
}

var filename = document.getElementById("name");
var filetype = document.getElementById("type");
const readfile = document.getElementById("readfile");
const getfile = document.getElementById("getfile");
const readfolder = document.getElementById("readfolder");
const getfolder =document.getElementById("getfolder");

function readff(event) {
    let gotimg = event.target;

    for(let i=0; i<gotimg.files.length && i < 12; i++){
        let getfilelist = new DataTransfer();
        let reader = new FileReader();
    
        if (gotimg.files && gotimg.files[i]) {
            let currentFile = gotimg.files[i];

            reader.onload = function (e) {
                let mini = files[cells[count].toLowerCase()];

                console.log(mini);
                mini.src = e.target.result;

                let file = new File([currentFile], currentFile.name);

                getfilelist.items.add(file);
                createinput();
                var getimg = document.getElementById(`get${count}`);
                getimg.files = getfilelist.files;
                selectimg.src = mini.src;
                getfile.value = "";
                files[cells[count].toLowerCase()].style.border = "none";
                clearbtn[cells[count].toLowerCase()].style.display = "none";
                count++;
                getimg = document.getElementById(`get${count}`);
                files[cells[count].toLowerCase()].style.border = "3px dashed #ddd";
                clearbtn[cells[count].toLowerCase()].style.display = "block";
            }
        filename.readOnly = false;
        filename.value = gotimg.files[i].name;
        filename.readOnly = true;
        filetype.readOnly = false;
        filetype.value = gotimg.files[i].type;
        filetype.readOnly = true;
        paths[cells[count].toLowerCase()].textContent = gotimg.files[i].path;
        };
        reader.readAsDataURL(gotimg.files[i]);
    }
}

readfile.addEventListener("click", function() { getfile.click(); });
readfolder.addEventListener("click", function() { getfolder.click(); });
getfile.addEventListener("change", function(event) { readff(event); });
getfolder.addEventListener("change",function(event){
    for(let i = 0; i < 12; i++){
        var files = event.target.files[i];
        readff({ target: { files }} );
    }
});



const setsize = document.getElementById("setsize");
const selectsize = document.getElementById("selectsize");
var selectopt = selectsize.selectedIndex;
var imgsize = selectsize.options[selectopt].value;
setsize.value = imgsize;
window.size = imgsize;
selectsize.addEventListener("change", async function () {
    var selectopt = selectsize.selectedIndex;
    var imgsize = selectsize.options[selectopt].value;
    setsize.value = imgsize;
    var res = await window.api.size(imgsize);
    console.log(imgsize);
    console.log(res);
});

const save = document.getElementById("save");
save.addEventListener("click", async function () {
    const pathinfos = [];
    console.log("check path");
    for (var i = 0; i < 12; i++) {
        var input = document.getElementById(`get${i}`);
        if (input && input.files[0]) {
            var pathinfo = document.getElementById(`i${cells[i].toLowerCase()}`).textContent;
            pathinfos.push(pathinfo);
        } else {
            // ファイルが選択されていない場合は、nullを追加する
            pathinfos.push("");
        }
    }
    var result = await window.api.sendimg(pathinfos);
    console.log(result);
});

// レンダラープロセス内でカスタムDOMイベントを発火する

const func = async () => {
    const response = await window.api.ping();
    const test = await window.api.sets();
    console.log(`${response}${test}-rend`) // 'pong' と出力
  }


const overwrite = document.getElementById("overwrite");
overwrite.addEventListener("click", async function(){
    func();
});

//const information = document.getElementById('info')
//information.innerText = 
//`This app is using Chrome (v${api.chrome()}),
// Node.js (v${api.node()}), 
// and Electron (v${api.electron()})`

  
