dates_to_files = { 
   '24/12/2014': 'very christmas.txt',
   '01/01/2015': 'such year.log',
   '10/11/2012': 'I HAZ',
   '10/11/2012': 'A SAEM DAI',
   '10/10/1337': 'h4X0rz',
   '04/20/2014': 'BLAZE IT',
   '19/01/2037': 'the end of time.muhahaha',
   '01/01/1984': ''
}

print(*map("%s ==> %s".__mod__, 
 sorted( dates_to_files.items(),
  key=lambda t: t[0].split('/')[::-1]
,reverse=True)), sep='\n')



print('-'*35)

items = list(dates_to_files.items())
key = lambda t: t[0].split('/')[::-1]
items.sort(key=key, reverse=True)

f = "'{1}' [{0}]".format
print(*map(f, *items), sep='\n')
