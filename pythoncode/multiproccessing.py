import multiprocessing
import requests
import os



def downloadfile(url,name):
    response = requests.get(url)
    open(f'file/{name}.jpg','wb').write(response.content)


url = 'https://picsum.photos/200'


proccess = []

for i in range(5):
    p = multiprocessing.Process(target = downloadfile , args= [ url,i])
    p.start() 
    proccess.append(p)

for p in proccess:
    p.join()

