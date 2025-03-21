import threading
import time
from concurrent.futures import ThreadPoolExecutor


def func(seconds):
    print(f'sleeping for {seconds} seconds')
    time.sleep(seconds)

# time1 = time.perf_counter()

# normal code without threads 
# func(4)
# func(3)
# func(1)

# time2 = time.perf_counter()
# print(f'total time taken by normal without threads {time2 - time1}')



def main():
    time3 = time.perf_counter()
    # same code using thread
    t1 = threading.Thread(target=func , args=[4])
    t2 = threading.Thread(target=func , args=[2])
    t3 = threading.Thread(target=func , args=[1])

    t1.start() 
    t2.start()
    t3.start()


    t1.join()
    t2.join()
    t3.join()

    time4 = time.perf_counter()
    print(f'total time taken by the code with threads are {time4 - time3}')




def poolingDemo():
    with ThreadPoolExecutor() as executor:
        future = executor.submit(func , 4)
        future1 = executor.submit(func , 2)
        future2 = executor.submit(func , 5)
        print(future.result())
        print(future1.result())
        print(future2.result())


poolingDemo()