from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Operator UI placeholder'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
