import eel
import tkinter as tk
import os
import platform
from PIL import Image
from tkinter import filedialog, Toplevel

eel.init("web")


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.geometry("0x0")
        self.system = platform.system()

count = 0
selectnum = 0
tkapp = App()

@eel.expose
def PYgetcwd():
    print("getcwd")
    return os.getcwd()

@eel.expose
def PYreadfile():
    global count, selectnum
    tkapp.deiconify()
    tkapp.lift()
    type = [("画像ファイル", "*.jpg;*.jpeg;*.png;*.bmp")]
    paths = filedialog.askopenfilenames(filetypes=type)
    if not paths:
        tkapp.withdraw()
        return "break"
    for imgpath in paths:
        name = os.path.basename(imgpath)
    if count == 0:  # 一度目の追加
        selectnum = 0
        pathlist = [imgpath]
        piclist = [Image.open(imgpath)]
        selectnum += 1
        tkapp.withdraw()
    elif count == selectnum:  # 最後に追加
        pathlist.append(imgpath)
        piclist.append(Image.open(imgpath))
        selectnum += 1
        tkapp.withdraw()
    return pathlist

if __name__ == "__main__":
    eel.start("main.html")
    tkapp.mainloop()
