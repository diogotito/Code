import autopy
import time

def prompt_coord():
    """Returns the mouse position when it is kept in the same position for 1s"""
    last_coord = (0,0)
    while True:
        
        for t in range(10):
            time.sleep(0.1)
            cur_pos = autopy.mouse.get_pos();
            #print "{}/10: {} => {}".format(t, last_coord, cur_pos)

            if cur_pos != last_coord:
                last_coord = cur_pos
                break
        else:
            # The user kept the cursor in the same position for 1s
            return cur_pos
    
def prompt_coords():
    coord_list = []
    
