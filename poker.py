WAITING = 'waiting' # - The round has just started!
CHECK = 'check'     # *knock* *knock* 'Ok! Move on please.'
RAISE = 'raise'     # 'DIE motherfuckers!'
QUIT = 'quit'       # 'I've just realized my hand sucks! I won't win nothing with this round...'

class Player:
    def __init__(self, initial_money):
        self.money = initial_money
        self.state = WAITING

print("Welcome to the dumbest poker game ever!")
