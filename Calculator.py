import tkinter as tk

def click(event):
    text = event.widget.cget("text")
    if text == "=":
        try:
            result = str(eval(str(screen.get())))
            screen.set(result)
        except Exception as e:
            screen.set("Error")
    elif text == "C":
        screen.set("")
    else:
        screen.set(screen.get() + text)

root = tk.Tk()
root.geometry("300x400")
root.title("Simple Calculator")

screen = tk.StringVar()
entry = tk.Entry(root, textvar=screen, font="Arial 20")
entry.pack(fill=tk.BOTH, ipadx=8, pady=10)

button_frame = tk.Frame(root)
button_frame.pack()

buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C"]
]

for row in buttons:
    row_frame = tk.Frame(button_frame)
    row_frame.pack(side=tk.TOP, fill=tk.BOTH, expand=True)
    for char in row:
        btn = tk.Button(row_frame, text=char, font="Arial 18", height=2, width=5)
        btn.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        btn.bind("<Button-1>", click)

root.mainloop()