import time
import pyautogui
def mousepos():
    while True:
        x, y = pyautogui.position()
        positionStr = 'X: ' + str(x).ljust(10) + ' Y: ' + str(y).ljust(30)
        print(positionStr, end='')
        print('\b' * len(positionStr), end='', flush=True)
        time.sleep(0.01)

mousepos() 