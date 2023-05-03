import schedule
import time
import os

def run_scripts():
    os.system('python web-scraping-Udemy.py')

schedule.every(60).minutes.do(run_scripts)

while True:
    schedule.run_pending()
    time.sleep(1)
