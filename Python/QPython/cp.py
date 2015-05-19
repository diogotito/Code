import os, sys, time, android
from collections import defaultdict
import pprint

stations = defaultdict(dict) # Spares me 2 lines inside that loop

os.chdir("/sdcard")

# parse /sdcard/horario.txt in order to populate {stations}
for line in open("horario.txt"):
    if '->' in line:
        origin, destiny = map(str.strip, line.split('->'))
    elif '-' in line:
        stations[origin][destiny] = [int(i) for i in line.split('-')]

print(stations)
pprint.pprint( stations)
#droid = android.Android()

for travel in stations.items():
    print("%s => %s" % travel)

minutes = time.localtime().tm_min
print(minutes)

timetable = next(iter(next(iter(stations.values())).values()))
print(timetable)

#        very poetry
#                                        such beautiful
print(*sorted(
	arrival
	for arrival in timetable
	if arrival >= minutes
))

project_path = 'CP'

"""
path = next(path 
	for path in sys.path
	if path.endswith(project_path)
)


print(path)"""
print(*sys.path,sep='\n')



print('-'*70)