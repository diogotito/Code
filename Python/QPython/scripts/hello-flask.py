#qpy:webapp:Wow
#qpy:localhost:5000

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello</h1> World!"

if __name__ == "__main__":
    app.run()