from turtle import st
import yfinance as yf
from newsapi import NewsApiClient

class Stock:
    quote = ""

    def __init__(self, quote):
        self.quote = quote
    
    def get_stock_info(self):
        stock = yf.Ticker(self.quote).info
        data = {"Sector": stock["sector"],
                "Website": stock["website"],
                "Industry": stock["industry"],
                "ProfitMargin": stock["profitMargins"],
                "GrossMargin": stock["grossMargins"],
                "ReturnOnAssets": stock["returnOnAssets"],
                "TotalCash": stock["totalCash"],
                "TotalDebt": stock["totalDebt"],
                "TotalRevenue": stock["totalRevenue"],
                "LongName": stock["longName"]
                }

        return data

    def get_stock_data(self, time):
        stock = yf.Ticker(self.quote)
        open = stock.history(period=time)["Open"].to_list()
        high = stock.history(period=time)["High"].to_list()
        low = stock.history(period=time)["Low"].to_list()
        close = stock.history(period=time)["Close"].to_list()
        splits = stock.history(period=time)["Stock Splits"].to_list()

        data = {"Open" : open, "High" : high, "Low" : low, "Close" : close, "Splits": splits}

        return data
    
    def get_news(self, company):
        newsapidata = NewsApiClient(api_key="dc59a048131243d1a0eee4737fad9493")

        news = newsapidata.get_everything(q=(company.split()[0]),
                                        from_param="2022-02-01",
                                        language="en",
                                        sort_by='relevancy',
                                        page=1)

        titles, sources = [], []

        articles = news["articles"]
        for i in range(min(10, len(articles))):
            titles.append(articles[i]["title"])
            sources.append(articles[i]["url"])
        
        return {"Titles": titles, "Sources": sources}
