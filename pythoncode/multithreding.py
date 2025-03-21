import threading
import time


def func(seconds):
    print(f'sleeping for {seconds} seconds')
    time.sleep(seconds)


func(4)
func(3)
func(1)






