// main.js-1

// このモジュールはアプリケーションの生き死にを制御し、ネイティブブラウザウインドウを作成します
const { spawn } = require('child_process');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const bodyparser = require("body-parser");
const path = require('path');
const fs = require("fs");

const concimg = require("./getimg");
const { eventNames } = require('process');

var size = 16;
function getsize(event, size) {
  size = size;
}
async function createimage(event, filepaths){
  try {
    var newfile;
    await concimg(filepaths, size)
      .then(newfile = fs.readFileSync(`temp/newcharachip.png`));// concimg関数の実行を待つ
    const result = await dialog.showSaveDialog({
      defaultPath: path.join(__dirname,"新しいキャラチップ.png"),
      filters: [
        {
          extensions: ["png"],
          name: "pngファイル",
        },
      ],
    });
    if(!result.canceled && result.filePath) {
      fs.writeFile(result.filePath, newfile, (err) => {
        if(err){
          console.error('Error saving image:', err);
        }
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

const createWindow = () => {
  // ブラウザウインドウを作成します。
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: false, //ここはfalseのまま
      contextIsolation: true,  //trueのまま(case2と違う)
      sandbox: false,
      preload: path.join(__dirname,'preload.js'),
    }
  })
  // そしてアプリの index.html を読み込みます。
  mainWindow.loadFile(`main.html`);

  // デベロッパー ツールを開きます。
  mainWindow.webContents.openDevTools();
}

if(process.env.NODE_ENV === "developement"){
  mainWindow.webContents.openDevTools();
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron")
  });
}

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.on("ready", function(){
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("newfile", createWindow);
  ipcMain.handle("sendimg", createimage);
  ipcMain.handle("size", getsize);

  createWindow();

  app.on('activate', () => {
    // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない
    // 場合、アプリのウインドウを再作成するのが一般的です。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// このファイルでは、アプリ内のとある他のメインプロセスコードを
// インクルードできます。 
// 別々のファイルに分割してここで require することもできます。


