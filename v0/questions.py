import pandas as pd
import pickle
import os.path
import tkinter as tk

#from object_defs import DriveFileObject
import DriveInterface
import TkManager

driveInterface = DriveInterface.DriveInterface()
tkManager = TkManager.TkManager()


# Load the Excel file
#all_sheets = pd.read_excel('path_to_your_file.xlsx', sheet_name=None, engine='openpyxl')


#The main method
def main():
    
    #check token.pickle and delete if necessary
    driveInterface.authenticate()
    files = driveInterface.list_files_with_extension('xlsx')

    for file in files:
        tkManager.add_file_to_listbox(file)

    # Setup and start the main loop
    tkManager.setup()
    tkManager.run()


if __name__ == '__main__':
    main()