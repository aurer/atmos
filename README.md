# atmos

Custom setup to displays reading from some temperature and humidity sensors

## Requirements

This project is designed to be run on a Raspberry Pi model 3 or above.

It expects to have serial input via USB containing three float value readings separated by commas which specify the air temperature, humidity and water temperature respectively e.g.

```
...
22.00,15.06,63.20
22.00,15.06,63.21
22.01,15.05,63.21
...
```

I use an Arduino to capture data from a DHT22 for air temperature and humidity, and a DS18B20 for water temperature, a CO2 sensor, PH sensor and water level sensor. This data is sent via `Serial.print` in the format above over USB.

It also expects a webcam feed from Motion on the url "/stream".

## Running

This project should idealy be run via a WSGI server like Gunicorn, it can be set up to run as a service by creating a systemd service file like below:

```
[Unit]
Description=Atmos
After=network.target

[Service]
User=nginx
Group=nginx
WorkingDirectory=/path/to/atmos
ExecStart=/usr/local/bin/gunicorn --workers 3 --bind unix:atmos.sock -m 007 app:app

[Install]
WantedBy=multi-user.target
```
