class BagIterator:
    
     def __init__(self, **items_to_iterate):
        self.items = items_to_iterate
        self.index = 0
        
     def __next__(self):
        if self.index < len(self.items):
            item =  self.items[self.index]
            self.index += 1
        else:
            raise StopIteration
        return item



class Bag:

     def __init__(self, initial_items=[]):
          self._items = initial_items
          #self.index = 0

#     def __iter__(self):
#          #return BagIterator(self._items)
#          return iter(self._items)


#     def __getitem__(self, index):
#          return self._items[index]
