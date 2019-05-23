import time
import serial
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


def testingPage(driver):
    if driver.title == 'Actualizar Conductores':
        return True
    return False


def writeInput(code):
    x = ser.readline()
    print(x.decode("utf-8"))
    element = driver.find_element_by_id('id_internalCarnet')
    element.clear()
    element.send_keys(code)


def main():
    driver = webdriver.Chrome()
    driver.get('http://autoparkingeafit.herokuapp.com/login')
    ser = serial.Serial(
        port='COM3',
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1)

main()
