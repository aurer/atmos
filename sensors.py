import serial

ser = serial.Serial('/dev/serial/by-id/usb-Arduino__www.arduino.cc__Arduino_Due_Prog._Port_741363330333517002D0-if00', 9600, timeout=1)

def get_readings():
  out = get_raw_output()
  s = out.split(",")
  
  return {
    "air": s[0],
    "humidity": s[1],
    "water": s[2],
  }

def get_raw_output():
  output = ""
  while output == "":
    output = ser.readline().decode()
  return output
