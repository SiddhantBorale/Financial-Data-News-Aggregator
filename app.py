from flask import Flask, request
from flask_cors import CORS

from models.Stock import Stock

import numpy as np

from util import getstockdata

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Hello World from python flask"


@app.route("/news", methods = ["POST"])
def all():
    if request.method == "POST":
        quote = request.form.get("quote")
        stock = Stock(quote)
        stock_info = stock.get_stock_info()
        stock_news = stock.get_news(stock_info["LongName"])

        return {"StockNews": stock_news}


@app.route("/graph", methods = ["POST"])
def graph():
    quote = request.form.get("quote")
    time = request.form.get("time")
    stock = Stock(quote)
    stock_data = stock.get_stock_data(time)
    stock_info = stock.get_stock_info()

    data = []

    for i in range(len(stock_data["Close"])):
        data.append({"Close": round(stock_data["Close"][i], 3), "X": i+1})

    return {"Data": data, "url": stock_info["Website"], "name": stock_info["LongName"]}


@app.route("/info",  methods = ["POST"])
def info():
    quote = request.form.get("quote")
    stock = Stock(quote)
    stock_info = stock.get_stock_info()
    return {"StockInfo": stock_info}
        

@app.route("/predict", methods=["POST"])
def predict():
    quote = request.form.get("quote")
    x, y = getstockdata.getData(quote)

    print("Starting calculations...")

    a, b = np.polyfit(x, y, 1)

    predicted = []
    new_x = []

    data = []

    for i in range(253, 344):
        predicted.append(a*i + b)
        new_x.append(i)
        data.append({"Close": round((a*i + b), 3), "X": i+1})

    print("Ended calcs...")

    return {"data": data}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, threaded=True, debug=True)
