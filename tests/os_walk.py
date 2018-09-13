import os
import glob


os.chdir(r'C:\Users\Huy\Documents\GitHub\Confidential')

folders = []
for model_file in next(os.walk('./models'))[2]:
    if '.pbe' in model_file:
        folders.append(model_file)

print(folders)