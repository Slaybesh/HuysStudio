import time
import datetime

for thing in dir(time):
    print(thing)


eta = time.strftime('%H:%M:%S', time.localtime(time.time()+300))
print(eta)
