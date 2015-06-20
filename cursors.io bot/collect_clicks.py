from pymouse import PyMouse, PyMouseEvent
import time

def catch_click_pos():
    
    class EventHandler(PyMouseEvent):        
        def click(self, x, y, button, press):
            if press == False:
                self.click_position = (x,y)
                self.stop()

    click_handler = EventHandler(capture=True)
    click_handler.run() # Makes the program wait untill we get a click
    return click_handler.click_position


def follow_path(mouse, path):
    for i, point in enumerate(path):
        print i+1, "/", len(path)
        (x,y) = mouse.position()
        while (x,y) != point:
            x += cmp(point[0], x)
            y += cmp(point[1], y)
            mouse.move(x,y)
            time.sleep(0.001)

def get_level_path():
    print "Click on the labyrinth starting position: ",
    start_pos = catch_click_pos()
    print start_pos

    print """
Now click on the points where the cursor should go, in order. When you 
finish defining the path, click at the upper left corner of your screen
"""
    print "Path points:"
    
    path = []
    for click in iter(catch_click_pos, (0,0)):
        path.append(click)
        print "Click #{0}: {1}".format(len(path), click)

    return start_pos, path
    

def main():
    start_pos, path = get_level_path()

    print "\nOk, let's roll!"
    mouse = PyMouse()
    mouse.click(*start_pos)
    follow_path(mouse, path)


if __name__ == "__main__":
    main()
