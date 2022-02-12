from flask import Flask, request
from flask_cors import CORS

from models.Stock import Stock
from util import searchtweets

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, threaded=True, debug=True)
