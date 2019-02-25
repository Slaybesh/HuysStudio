import os

# if its a file and exist: True
os.path.isfile('./file.txt')

# if its a folder and exists: True
os.path.isdir('some_dir')

# if its a file or folder that exists: True
os.path.exists('some_dir')


# create directory
os.mkdir('some_dir')

import glob

glob.glob('.')