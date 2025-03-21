
''' '
import threading
import time
from concurrent.futures import ThreadPoolExecutor


def func(seconds):
    print(f'sleeping for {seconds} seconds')
    time.sleep(seconds)
    return seconds

# time1 = time.perf_counter()

# normal code without threads 
# func(4)
# func(3)
# func(1)

# time2 = time.perf_counter()
# print(f'total time taken by normal without threads {time2 - time1}')



def something():
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
        # future = executor.submit(func , 4)
        # future1 = executor.submit(func , 2)
        # future2 = executor.submit(func , 5)
        # print(future.result())
        # print(future1.result())
        # print(future2.result())
        l = [3,5,1,2]
        results = executor.map(func, l)
        for result in results:
            print(result)


poolingDemo()

'''

import multiprocessing
import requests

def downloadfile(url,name):
    response = requests.get(url)
    open(f'file/{name}.jpg','wb').write(response.content)

if __name__ == '__main__':
    url = 'https://picsum.photos/200'
    proccess = []
    for i in range(5):
        p = multiprocessing.Process(target = downloadfile , args= [ url,i])
        p.start() 
        proccess.append(p)

    for p in proccess:
        p.join()


### NOTE FILE FILE DIRECOTRY HAS NOT BEEN CREATED CREATE IT IN ROOT DIRECTORY 
