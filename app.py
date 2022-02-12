from flask import Flask, request
from flask_cors import CORS

from models.Stock import Stock

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Hello World from python flask"


@app.route("/all", methods = ["POST"])
def all():
    if request.method == "POST":
        print("Inside post...")
        quote = request.form.get("quote")
        print("Quote: ", quote)
        stock = Stock(quote)

        stock_info = stock.get_stock_info()
        stock_data = stock.get_stock_data("5y")
        stock_news = stock.get_news(stock_info["LongName"])

        return {"StockInfo": stock_info, "StockData": stock_data, "StockNews": stock_news}


@app.route("/graph", methods = ["POST"])
def graph():
    quote = request.form.get("quote")
    time = request.form.get("time")
    stock = Stock(quote)
    stock_data = stock.get_stock_data(time)

    x = []

    data = []

    for i in range(len(stock_data["Close"])):
        data.append({"Close": round(stock_data["Close"][i], 3), "X": i+1})

    return {"Data": data}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, threaded=True, debug=True)
