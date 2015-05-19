#qpy:webapp:Hello CherryPy
#qpy://127.0.0.1:8080/
	
import cherrypy

class HelloWorld(object):
    @cherrypy.expose
    def index(self):
        return "Hello world!"

if __name__ == '__main__':
    cherrypy.quickstart(HelloWorld())