import pandas as pd
import pickle
import os.path
import tkinter as tk

import DriveFileObject, DriveInterface

driveInterface = DriveInterface.DriveInterface()

# Create the main window
root = tk.Tk()
root.title("Simple Tkinter GUI")

# On listbox click
def on_click(event):
    # Get the selected line
    index = listbox.curselection()[0]
    selected_file = listbox.get(index)
    driveInterface.download_file_with_name(selected_file)

    
# Create a clickable list of files
listbox = tk.Listbox(root)
listbox.pack(pady=20)
# display the name of the file
listbox.config(width=0, height=0, font=("Helvetica", 12))
# Bind the listbox click to a function
listbox.bind("<<ListboxSelect>>", on_click)

# Load the Excel file
#all_sheets = pd.read_excel('path_to_your_file.xlsx', sheet_name=None, engine='openpyxl')


#The main method
def main():
    
    driveInterface.authenticate()
    files = driveInterface.list_files_with_extension('xlsx')

    for file in files:
        listbox.insert(tk.END, file)

    # Start the main loop
    root.mainloop()


if __name__ == '__main__':
    main()