//main-2
const { ipcMain } = require("electron");
const express = require("express");
const sharp = require("sharp");
const fs = require("fs");
const temp = "temp/"
const sets = [];
const resizearray = [];
const allpromises = [];

async function makedir(){
    allpromises.push(new Promise((res, rej) => {
        if(!fs.existsSync(temp)){
            fs.mkdir(temp, { recursive: true }, (err) => {
                if (err) {
                    console.error("failed mkdir:", err);
                    rej(err);
                }else{
                    res("makedir");
                };
            });
        };
    }));
};
async function makeblanc(size){
    allpromises.push(new Promise((res,rej) => {
        const outwidth = size * 3;
        const outheight = size * 4;
        const blanc = `${temp}blanc.png`;
        sharp({
            create:{
                width:outwidth, height:outheight, channels:4,
                background: {r:0,g:0,b:0,alpha:0}
            }
        })
        .toFile(blanc, (err) => {
            if(err){
                rej(err);
            }else{
                res("makeblanc");
            }
        });
    }));
}
async function makesetfiles(files){
    const setpromises = [];
    allpromises.push(new Promise((res, rej) => {
        for (let i = 0; i < files.length; i++){
            var name;
            if (i == 0 || 9 < i){
                name = `${temp}set_${i}.png`;
                sets.push(name);
            }else if(0< i && i < 10){
                name = `${temp}set_0${i}.png`;
                sets.push(name);
            };
            setpromises.push(new Promise((res, rej) => {
                fs.readFile(files[i], (err) => {
                    if(err){
                        fs.promises.unlink(sets[i])
                        .then(() => res())
                        .catch((err) => res())
                    }else{
                        res();
                    }
                })
            }))
        }
    }))
    await Promise.all(setpromises);
}
async function resizeimg(inputpaths, size) {
    const resizepromise = [];
    allpromises.push(new Promise((res, rej) => {
        for(let i = 0; i < 12; i++){
            var inputpath = inputpaths[i];
            var outputpath = sets[i];
            if(fs.existsSync(inputpath)){
                resizepromise.push(new Promise((res, rej) => {
                    sharp(inputpath)
                    .resize(size,size)
                    .toFile(outputpath, (err, info) => {
                        if(err){
                        }else{
                            if (i == 0 || 9 < i){
                                resizearray[i] = `${temp}set_${i}.png`;
                                console.log(`resize${i}`);
                            }else if(i < 10){
                                resizearray[i] = `${temp}set_0${i}.png`;
                                console.log(`resize${i}`);
                            }
                        }
                        res();
                    })    
                }))
            }else{
            }
        }
    }))
    await Promise.all(resizepromise);
}
async function setimage(files,size) {
    new Promise((res, rej) => {
        const Params = [];
        for(let i = 0; i < 12; i++){
            var resize = files[i];
            if(fs.existsSync(resize)){
                var y = size * Math.floor(i / 3);
                if(i % 3 === 1){
                    var x = size;
                }else if(i % 3 === 2){
                    x = size * 2;
                }else if(i % 3 === 0){
                    x = 0;
                }
                var Param = {
                    input: resize,
                    left: x,
                    top: y
                };
                Params.push(Param); 
            }
        }
        const blanc = `${temp}blanc.png`;
        sharp(blanc)
        .composite(Params)
        .toFile(`${temp}newcharachip.png`, (err, info) => {
            if(err){
                console.error("error on concfile",err);
            }else{
                res();
            }
        })
    })
}

var concimg = async function(imagepaths, imagesize) {
    console.log("startconcimg");
    if (imagepaths.length === 0) {
        console.error("any file did not select");
        return;
    }else{    
        var size = 16;
        console.log("start makedir")
        makedir()
        .then(() =>{
            console.log("comp makedir");
            size = imagesize;
            var files = imagepaths;
            makeblanc(size)
            .then(() => {
                console.log("comp makeblanc");
                makesetfiles(files)
                .then(() =>{
                    console.log("comp make sets");
                    resizeimg(files, size)
                    .then(() => {
                        console.log("comp resize");
                        console.log(resizearray);
                        setimage(resizearray,size)
                        .then(() => {
                            console.log("create image 0");
                        })
                    })
                })
            })
        })
    }
    return `${temp}newcharachip.png`;
}

module.exports = concimg;