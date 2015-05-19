from itertools import takewhile, count

print(list(
	takewhile(bool,
		        (input("Player #{}: ".format(n)) for n in count(1)))
))

