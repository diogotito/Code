from zipfile import ZipFile
channel = ZipFile("/sdcard/AS MINHAS CENAS/channel.zip")

import re
pattern = re.compile(r"Next nothing is (\d+)")

def do_nothing(n):
    text = channel.open("%s.txt" % n).read().decode()
    match = pattern.search(text)
    print(channel.getinfo("%s.txt" % n).comment.decode(), end='')
    if not match: return text
    return do_nothing(int(match.group(1)))

print(do_nothing(90052))