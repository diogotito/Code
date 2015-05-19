big_blind = 10
blind_index = 1

pot = 0

class Player:
    def __init__(self, name, money):
        self.name = name
        self.money = money
        self.state = 'waiting'
        self.hand = ()
    
    def bet(self, amount):
        global pot
        amount = min(amount, self.money)
        self.money -= amount
        pot += amount
        
    def request_command(self):
        print(self.name + ", input your action")
        while True:
            action = input(">>> ")
            if action in ["fold", "raise", "call", "check"]:
                return action

def more_than_one(player_does_this):
    return sum(map(player_does_this, players.values())) > 1

print ("Input player names:")
players = {name: Player(name, 1000) for name in iter(input,"")}

while more_than_one(lambda player: player.money > 0):

    for i, player in enumerate(players.values()):
        if player.money == 0:
            continue
        if blind_index == i:
            player.bet(big_blind)
        i = (i+1) % len(players)
        if blind_index == i:
            player.bet(big_blind/2)
            
    while more_than_one(lambda player: player.state != "fold"):
        for player in players.values():
            if player.money == 0 or player.state == "fold":
                continue
            command = player.request_command()
            if command == "fold":
                player.state = "fold"
