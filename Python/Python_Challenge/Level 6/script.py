import os
os.chdir(r"C:\Users\Diogo\Dropbox\Programming\Python\Python_Challenge\Level 6\channel")

import re
digit_re = re.compile("\d+")

nothing = 90052

def next_nothing(n):
    text = open("%s.txt" % n).read()
    print(text)
    matches = digit_re.findall(text)
    return matches[-1]

from itertools import count
for i in count(1):
    try:
        print("Step #%s:\t"%i, end='')
        nothing = next_nothing(nothing)
    except IndexError:
        print("*Oops!*")
        break

    
