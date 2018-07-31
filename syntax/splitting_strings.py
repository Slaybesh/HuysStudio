import glob
import os
folder = 'X:/data'

os.chdir(folder)
files = glob.glob('*jpg')

files = [file[:-4] for file in files]

print(files)
# file_path = folder + file

# splitted = file_path.split('/')[-1].split('.')[0]
# print(splitted)
