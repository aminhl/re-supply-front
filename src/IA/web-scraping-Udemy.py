from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
driver = webdriver.Chrome('/chromedriver')
driver.maximize_window()
driver.get('https://www.udemy.com/courses/development/web-development/?price=price-free&sort=newest')
time.sleep(10)

courses = []

# Find all the course elements
course_elements = driver.find_elements(By.XPATH, '//div[@class="course-card--main-content--2XqiY course-card--has-price-text--1c0ze"]')

# Iterate over the course elements and extract the title and description
for elem in course_elements:
    title = elem.find_element(By.XPATH, './/h3').text
    description = elem.find_element(By.XPATH, './/p').text
    
    # Create a dictionary containing the title and description
    course = {'title': title, 'description': description}
    courses.append(course)

# Save the courses to a JSON file with the specified format
data = {'courses': courses}
with open('coursesUdemy.json', 'w') as f:
    json.dump(data, f)

driver.quit()