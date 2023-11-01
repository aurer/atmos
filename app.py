from flask import Flask, render_template, redirect, jsonify
import RPi.GPIO as GPIO
import sensors as sen
import camera

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.cleanup()

channel = 17
GPIO.setup(channel, GPIO.OUT)

app = Flask(__name__)

@app.route("/")
def index():
  state = GPIO.input(channel)
  data = sen.get_readings();
  return render_template("index.html", state=state, data=data)

@app.route("/on")
def on():
  GPIO.output(channel, GPIO.LOW)
  return redirect("/")

@app.route("/off")
def off():
  GPIO.output(channel, GPIO.HIGH)
  return redirect("/")

@app.route("/sensors")
def sensors():
  return sen.get_readings()

@app.route("/capture")
def capture():
  return camera.capture()
  
if __name__ == "__main__":
  app.run(host="0.0.0.0", port="5000")
