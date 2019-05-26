#!/usr/bin/env python

import signal
import time
import sys
import serial
import requests

from pirc522 import RFID

run = True
rdr = RFID()
util = rdr.util()
util.debug = True


GPIO.setmode(GPIO.BOARD)
GPIO.setup(32, GPIO.OUT) #Verde
GPIO.setup(37, GPIO.OUT) #Rojo

def end_read(signal,frame):
    global run
    print("\nCtrl+C captured, ending read.")
    run = False
    rdr.cleanup()
    sys.exit()

signal.signal(signal.SIGINT, end_read)

print("Starting")
while run:
    rdr.wait_for_tag()

    (error, data) = rdr.request()
    if not error:
        print("\nDetected: " + format(data, "02x"))

    (error, uid) = rdr.anticoll()
    if not error:
        print("Card read UID: "+str(uid[0])+","+str(uid[1])+","+str(uid[2])+","+str(uid[3]))

        id_carnet = str(uid[0])+str(uid[1])+str(uid[2])+str(uid[3])
        
        r = requests.post('https://autoparkingeafit.herokuapp.com/api/verifyCarnet' ,data = {'id_carnetFind': id_carnet}).json()
        
        if r['access']:
            print ("You can enter!!")
            GPIO.output(32, GPIO.HIGH)
            time.sleep(5)
            GPIO.output(32, GPIO.LOW)
        else:
            print("You can't enter")
            GPIO.output(37, GPIO.HIGH)
            time.sleep(5)
            GPIO.output(37, GPIO.LOW)