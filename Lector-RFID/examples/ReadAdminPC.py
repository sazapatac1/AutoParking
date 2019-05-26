import time
import serial
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

ser = serial.Serial(
        port='COM3',
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1)

driver = webdriver.Chrome()
driver.get('http://autoparkingeafit.herokuapp.com/login')


def testingPage():
    global driver
    if driver.title == 'Actualizar Conductores':
        return True
    return False


def writeInput(data):
    element = driver.find_element_by_id('id_internalCarnet')
    element.clear()
    element.send_keys(data)
    time.sleep(3)


def listener():
    while True:
        x = ser.readline()
        data = x.decode("utf-8")

        if len(data) != 0 and testingPage():
            writeInput(data)

listener()