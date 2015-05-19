import os
os.chdir(r"C:\Users\Diogo\Dropbox\Programming\Python\Python_Challenge\Level 6\channel")

import re
digit_re = re.compile("\d+")

def do_nothing(n):
    try:
        text = open("%s.txt" % n).read(); print(text)
        do_nothing(digit_re.findall(text)[0])
    except Exception as e:
        print("Oops,", e)

do_nothing(90052)
