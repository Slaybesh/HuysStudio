import time
import pyautogui
import win32api, win32con

def key_pressed(key):
    return win32api.GetAsyncKeyState(0x1B)

while True:
    pyautogui.press('right')

    if win32api.GetAsyncKeyState(0x1B):
        break

    time.sleep(0.3)


