import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

channel = 17
GPIO.setup(channel, GPIO.OUT)

def on():
  GPIO.output(channel, GPIO.HIGH)
  print("on")

def off():
  GPIO.output(channel, GPIO.LOW)
  GPIO.cleanup(channel)
  print("off")
