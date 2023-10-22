import pickle
import os.path
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from openpyxl import load_workbook

import DriveFileObject

class DriveInterface():
    def __init__(self):
        self.service = None
        self.files = []

    def authenticate(self):
        # Authenticate
        SCOPES = ['https://www.googleapis.com/auth/drive']
        creds = None
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        # - if not valid, remove token.pickle and authenticate again
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
                with open('token.pickle', 'wb') as token:
                    pickle.dump(creds, token)

        self.service = build('drive', 'v3', credentials=creds)


    #List files with an xlsx extension and return them in a list
    def list_files_with_extension(self, extension):
        results = self.service.files().list(pageSize=10, fields="nextPageToken, files(id, name)").execute()
        items = results.get('files', [])

        if not items:
            print('No files found.')
        else:
            for item in items:
                if item['name'].endswith(extension):
                    self.files.append(DriveFileObject.DriveFileObject(item['name'], item['id']))

        return self.files
    
    #Download File
    def download_file_with_name(self, file_name):
        request = self.service.files().get_media(fileId=self.get_file_id_with_name(file_name))
        with open('downloaded_file.xlsx', 'wb') as fh:
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while done is False:
                status, done = downloader.next_chunk()
                print(f"Download {int(status.progress() * 100)}%.")

    #Parse File
    def parse_file(self):
        #for now, default to loading this 'downloaded_file.xlsx', better solution later
        wb = load_workbook('downloaded_file.xlsx')
        color_guide = wb.worksheets[0]
        questions = wb.worksheets[1]
        #print all entries in color_guide
        for row in color_guide.iter_rows():
            for cell in row:
                print(cell.value + " : " + str(cell.fill.start_color.index))



    def get_file_id_with_name(self, file_name):
        for file in self.files:
            if file.name == file_name:
                return file.id
        return None

