from collections import namedtuple
from functools import partial
Player = namedtuple('Player', ['name', 'money', 'state', 'hand'])
new_player = lambda name: Player(name, 1000, 'waiting', ('??','??'))

print('Introduce player names:')
players = [new_player(name) for name in iter(input, "")]

for name, money, state, ((val1,suite1),(val2,suite2)) in players:
    print(name, money, state, ((val1,suite1),(val2,suite2)))

    

