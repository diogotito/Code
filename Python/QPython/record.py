    from collections import UserDict

class Record(UserDict):

    def __init__(self, *args):
        super(self, *args)
        self.data = self.__dict__
    