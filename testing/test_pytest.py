from selenium import webdriver
#driver.implicitly_wait(10)
from selenium.webdriver.chrome.options import Options

option=Options()
option.add_argument("--headless")   
option.add_argument('--no-sandbox')
option.add_argument('start-maximized')
option.add_argument('disable-infobars')
option.add_argument('--disable-extensions')
option.add_argument('--disable-dev-shm-usage')

def test_login():
    global driver
    driver=webdriver.Chrome("./testing/83/chromedriver", options=option)
    driver.implicitly_wait(10)
    driver.get('http://localhost:80')
    driver.maximize_window()
    driver.find_element_by_id("username").send_keys('vishnu')
    driver.find_element_by_id('pwd').send_keys('vishnu@123')
    driver.find_element_by_xpath('/html/body/app-root/app-login/div/div/form/button').click()
    print(driver.title)
def test_title_check():
    assert (driver.title == 'Easy Claim'), 'title not matched'
    driver.close()
    
