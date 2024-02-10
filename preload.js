// preload.js
const { contextBridge, ipcRenderer } = require("electron");

// プリロードプロセスでは Node.js の全 API が利用可能です。
// Chrome 拡張機能と同じサンドボックスも持っています。
//setsize = document.getElementById("setsize");
//window.addEventListener("DOMContentLoaded", function () {
//  contextBridge.exposeInMainWorld(
//    "loaded", {send: () => {
//        ipcRenderer.send("loaded", window);
//    }}
//  );
//let submitbtn = document.createElement("button");
//submitbtn.type = "submit";
//submitbtn.id = "submit";
//const save = document.getElementById("save");

//  window.addEventListener("sendimg", function(){
//    console.log(window.size.size);
//    contextBridge.exposeInMainWorld(
//      "size", {send: (imgsize) => {
//          ipcRenderer.send("imagepaths", imgsize);
//      }}
//    );
    //window.size.send(setsize);  
//save.addEventListener("click", function () {
  //form.appendChild(submitbtn);
  //const submit = document.getElementById("submit");
//    console.log("save");
//    contextBridge.exposeInMainWorld(
//      "paths", {send: (files) => {
//          ipcRenderer.send("imagepaths", files, imgsize);
//      }}
//    );
//      window.paths.send("imagepaths", files, imgsize);
  //submit.click();
  //submit.remove();
//  });
//});

contextBridge.exposeInMainWorld(
  'api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  sets: () => ipcRenderer.invoke('sets'),
  // 関数だけでなく、変数も公開できます
  newfile: () => ipcRenderer.invoke("newfile"),
  sendimg: (data) => ipcRenderer.invoke("sendimg", data),
  size: (data) => ipcRenderer.invoke("size", data)
  }
);
