import yfinance as yf

def getData(quote):
    stock = yf.Ticker(quote)
    close = stock.history(period="3y")["Close"].to_list()
    x = []

    for i in range(len(close)):
        x.append(i+1)

    return x, close
