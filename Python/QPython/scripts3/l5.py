from urllib.request import urlopen
import pickle
from pprint import pprint

url = "http://www.pythonchallenge.com/pc/def/banner.p"
obj = pickle.load(urlopen(url))
pprint(obj)