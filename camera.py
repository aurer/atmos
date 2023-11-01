import subprocess

def capture():
  process = subprocess.Popen([
    "libcamera-jpeg", 
    "-o", "static/capture.jpg", 
    "-t", "1",
    "--width", "720",
    "--height", "1080"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  out, err = process.communicate()
  return out
