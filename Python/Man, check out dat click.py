class get_dat_click(PyMouseEvent):

	def __new__(cls):
		dat_object = PyMouseEvent.__new__(cls)
		dat_object.__init__()
		dat_object.start()
		while dat_object.state: pass # MUHAHAHAHAHAHAHAHAHAHA
		return dat_object.mouse_position

	def click(self, x, y, button, press):
		print "button %s pressed at (%s,%s)" % (button, x, y)
		if button == 1: self.mouse_position = x, y
		self.stop()
