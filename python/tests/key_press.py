from os import system
import win32api, win32con


while True:
    print(win32api.GetAsyncKeyState())
    system('cls')
