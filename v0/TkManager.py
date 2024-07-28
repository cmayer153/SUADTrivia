import tkinter as tk
import DriveInterface

class TkManager:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Shut Up and Drink Trivia Helper 1000")
        self.root.geometry("500x500")

        self.fileNameListbox = tk.Listbox(self.root)
        self.fileNameListbox.pack(pady=20)
        self.fileNameListbox.config(width=0, height=0, font=("Helvetica", 12))
        #listbox bind
        self.output_frame = tk.Frame(self.root)
        self.output_label = tk.Label(self.output_frame, text="Output")
        self.output_label.pack()
        self.questions_listbox = tk.Listbox(self.output_frame)
        self.questions_listbox.pack()
        self.output_frame.pack()
        #self.root.mainloop()
        self.driveInterface = DriveInterface.DriveInterface()

    def on_fileNameListbox_click(self, event): 
        # Get the selected line
        index = self.fileNameListbox.curselection()[0]
        selected_file = self.fileNameListbox.get(index)
        self.driveInterface.download_file_with_name(selected_file)
        self.driveInterface.parse_file()

    def setup(self):
       self.fileNameListbox.bind("<<ListboxSelect>>", self.on_fileNameListbox_click)

    def run(self):
        self.root.mainloop()
        
    def add_file_to_listbox(self, file):
        self.fileNameListbox.insert(tk.END, file)
        
    def add_question_to_listbox(self, question):
        self.questions_listbox.insert(tk.END, question)
        
    def get_selected_question(self):
        index = self.questions_listbox.curselection()[0]
        return self.questions_listbox.get(index)
    
    def clear_questions_listbox(self):
        self.questions_listbox.delete(0, tk.END)
        
    def clear_files_listbox(self):
        self.listbox.delete(0, tk.END)
        
    def clear_all(self):
        self.clear_questions_listbox()
        self.clear_files_listbox()
        
    def get_questions_listbox(self):
        return self.questions_listbox
    
    def get_output_frame(self):
        return self.output_frame
    
    def get_output_label(self):
        return self.output_label
        
    def get_selected_question(self):
        index = self.questions_listbox.curselection()[0]
        return self.questions_listbox.get(index)
    
