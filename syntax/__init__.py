import sys
import os
import time

timer = time.perf_counter()
while os.getcwd().split('\\')[-1] != 'GitHub':

    os.chdir('..')

    if time.perf_counter() - timer > 2:
        print('Can not find GitHub folder.')
        break

sys.path.append(os.getcwd())

# print('sys.argv: {0!r}'.format(sys.argv))
# print('sys.path: {0!r}'.format(sys.path))
