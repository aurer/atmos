import subprocess

def capture():
  process = subprocess.Popen([
    "libcamera-jpeg", 
    "-o", "static/media/capture.jpg", 
    "-t", "1",
    "--width", "1280",
    "--height", "1280"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  out, err = process.communicate()
  return out
