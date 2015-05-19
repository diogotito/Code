import android

print('-'*70)

import time, pprint, android
from collections import defaultdict

def main():
    stations = parse_file("/sdcard/horario.txt")
    pprint.pprint(stations); print()

    origin = list_dialog( title = "Selecione a estação de partida",
                          content = list(stations.keys()))
    if len(stations[origin]) == 1:
        destiny = next(iter(stations[origin]))
    else:
        destiny = list_dialog( title = "... de %s para:" % origin,
                               content = list(stations[origin].keys()))

    arrivals = stations[origin][destiny]
    text = "De:\t\t\t{}\nPara:\t{}\n\n".format(origin, destiny)
    text += format_timetable(arrivals, *time.localtime()[3:5])
    list_dialog("Próximos comboios", text)

  
def parse_file(file_path):
    """ parse /sdcard/horario.txt and return a dictionary which looks like
        {origin: {destiny: [list of arrivals in minutes per hour] } }
    """
    stations = defaultdict(dict) # Spares me 2 lines inside that loop
    for line in open(file_path):
        if '->' in line:
            origin, destiny = map(str.strip, line.split('->'))
        elif '-' in line:
            stations[origin][destiny] = [int(i) for i in line.split('-')]
    return stations

def format_timetable(arrivals, h, m):
    #next_trains = [(h+(t < m),t) for t in sorted(arrivals)]
    next_trains = [(h+(t < m),t) for t in arrivals]
    text = "[{h}:{m:0>2}]".format(h=h, m=m).center(33, '-') + '\n'
    for train in sorted(next_trains):
        minutes_left = (train[0]-h)*60 + train[1]-m
        format = "\n • {h}:{m:0>2} ({t:\t>2} minutos)"
        text += format.format(h=train[0], m=train[1], t=minutes_left)
    return text


def list_dialog(title, content, positive=None, neutral=None, negative=None):
    droid = android.Android()
    droid.dialogCreateAlert(title, content if type(content) == str else None)

    if type(content) == list:
        droid.dialogSetItems(content)
    if positive != None:
        droid.dialogSetPositiveButtonText(positive)
    if neutral != None:
        droid.dialogSetNeutralButtonText(negative)
    if negative != None:
        droid.dialogSetNegativeButtonText(negative)

    droid.dialogShow()
    response = droid.dialogGetResponse()
    
    if type(content) == str:
        return response
    else:
        choosen_option = response.result['item']
        return content[choosen_option]

if __name__ == "__main__":
    main()

# def dialog_select_origin():
#     droid = androidhelper.Android
#     
#     droid = android.Android()
#     origins = list(stations.keys())
# 
#     droid.dialogCreateAlert('Selecione a estação de origem')
#     droid.dialogSetSingleChoiceItems(origins)
#     droid.dialogSetPositiveButtonText('Selecionar')
#     droid.dialogSetNegativeButtonText('Cancelar')
# 
#     droid.dialogShow()
# 
#     #result = droid.eventWaitFor('dialog')
#     print(droid.dialogGetResponse())
#     result = droid.dialogGetSelectedItems()
# 
#     print(result)
#     print("You've choosen option no.", result.result[0] + 1)
#     print(origins[result])

# print('\n','-'*70,'\n')
# time.sleep(3)
# 
# for travel in stations.items():
#     print("%s => %s" % travel)
# 
# minutes = time.localtime().tm_min
# print(minutes)