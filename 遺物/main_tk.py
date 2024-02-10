import os
import tkinter as tk
import tkinter.ttk as ttk
from PIL import Image, ImageTk

class MyApp(tk.Tk):
    def __init__(self):
        super().__init__()

        main = tk.Frame(self.master)
        main.pack(expand=True, fill=tk.BOTH)

        # タブ
        tab = ttk.Notebook(main)
        tab.pack(expand=1, fill="both")
        file = tk.Frame(tab)
        tab.add(file, text="file", padding=3)

        # ボタンの画像を読み込む
        readfileimg = tk.PhotoImage(file="meu.png")
        readfileimg.subsample(3)
        readfile = ttk.Label(file, text="readfile", width=100, image=readfileimg, compound="top")
        readfile.pack(anchor=tk.NW)

        self.top = tk.Frame(main, height=300)
        self.top.pack(anchor=tk.N, expand=1, fill=tk.BOTH)

        # ImageTk を使って PhotoImage オブジェクトを作成
        self.previewframe = tk.LabelFrame(self.top, bg="#111111", width=250, height=250, labelanchor="n")
        self.previewframe.propagate(False)
        self.previewframe.place(x=10, y=10)

        # 別の画像を使いたい場合は、適切な画像ファイルを指定する
        self.catban = tk.PhotoImage(file="meu.png")
        self.meumeu = tk.Button(self.previewframe, text="meumeu", image=self.catban)
        self.meumeu.pack()

        # 以下省略


if __name__ == "__main__":
    app = MyApp()
    app.title("charachip-converter")
    app.geometry("800x600")
    app.mainloop()
