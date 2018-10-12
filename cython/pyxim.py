import pyximport
pyximport.install(setup_args={"script_args":["--compiler=mingw32"]}, reload_support=True)
import fibo

fibs = fibo.fib(20)

print(fibs)