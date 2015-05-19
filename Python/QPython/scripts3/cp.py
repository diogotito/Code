import os, android

stations = {}

os.chdir("sdcard")

# parse /sdcard/horario.txt in order to populate {stations}
for line in open("horario.txt"):
    if '->' in line:
        origin, destiny = map(str.strip, line.split('->'))
        if origin not in stations:
            stations[origin] = {}
    elif any(digit in line for digit in '0123456789'):
        stations[origin][destiny] = [int(i) for i in line.split('-')]

#droid = android.Android()

for origin, destiny in stations.items():
    print('{} => {}'.format(origin, destiny))