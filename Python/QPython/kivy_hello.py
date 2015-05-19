#-*-coding:utf8;-*-
#qpy:2
#qpy:kivy

from kivy.app import App
from kivy.uix.button import Button

class TestApp(App):
    def build(self):
        # display a button with the text : Hello QPython 
        return Button(text='Hello QPython')

TestApp().run()

"""
import kivy
kivy.require('1.0.6') # replace with your current kivy version !

from kivy.app import App
from kivy.uix.label import Label

class MyApp(App):
    def build(self):
        return Label(text='Hello world')
    
if __name__ == '__main__': MyApp().run()
"""