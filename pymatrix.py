import curses
import time
import random
from functools import partial

# This is a string containing the ASCII characters from [32, 256] \ [128,160]
# cool_chars = ''.join(map(chr, set(range(32,256)) - set(range(128,160))
# cool_chars = ''.join(chr(i) for i in range(32,256) if i not in range(128,160))
# cool_chars = list(set(range(32,255)) - set(range(128,160)))
cool_chars = list(range(32, 127))

def loop(stdscr):
	random_x, random_y = map(partial(random.randint, 1), map((1).__rsub__, stdscr.getmaxyx()))
	random_char = random.choice(cool_chars)
	try:
		stdscr.addch(random_x, random_y, random_char)
	except Exception:
		stdscr.addstr(5, 5, "ERROR "*5)
		stdscr.refresh()
		time.sleep(1)
	
def main(stdscr):
	curses.noecho()
	for i in range(50):
		stdscr.clear()
		loop(stdscr)
		stdscr.refresh()
		time.sleep(0.1)


if __name__ == "__main__":
	curses.wrapper(main)
