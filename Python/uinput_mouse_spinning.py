import uinput
from math import pi, sin, cos
from time import sleep

events = (  uinput.ABS_X + (0, 255, 0, 0),
            uinput.ABS_Y + (0, 255, 0, 0),
            uinput.BTN_LEFT, uinput.BTN_RIGHT
         )

mouse = uinput.Device(events)

def spin(center=(128,128), radius=128, period=1, numSpins=1):
    for angle in range(int(360*numSpins)):
        radians = float(angle) /180 * pi
        center_x, center_y = center
	x = center_x + cos(radians)*radius
	y = center_y + sin(radians)*radius
	mouse.emit(uinput.ABS_X, int(x), False)
	mouse.emit(uinput.ABS_Y, int(y), True)
	sleep(float(period)/float(360))

if __name__ == "__main__":
    spin()
