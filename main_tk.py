import tkinter as tk
import tkinter.ttk as ttk
import os
import platform
from PIL import Image
from tkinter import filedialog, Toplevel

class MyApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.flag = False
        self.count = 0

        main = tk.Frame(self.master)
        main.pack(expand=True, fill=tk.BOTH)

#tab
        tab = ttk.Notebook(main)
        tab.pack(expand=1, fill="both")
        file = tk.Frame(tab)
        tab.add(file, text="file", padding=5)
        readfileimg = tk.PhotoImage(file="みつあみ.png")
        readfile = tk.Button(file, text="readfile", image=readfileimg, compound="top")
        readfile.grid(row=0, column=0)
        readfolderimg = tk.PhotoImage(file="みつあみ.png")
        readfolder = tk.Button(file, text="readfolder", image=readfolderimg, compound="top")
        readfolder.grid(row=0, column=1)
        edit = tk.Frame(tab)
        tab.add(edit, text="edit", padding=5)


if __name__ == "__main__":
    app = MyApp()
    app.title("charachip-converter")
    app.geometry("800x600")
    app.mainloop()

