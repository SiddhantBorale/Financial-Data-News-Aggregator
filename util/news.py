from itertools import count
from newsapi import NewsApiClient

newsapidata = NewsApiClient(api_key="dc59a048131243d1a0eee4737fad9493")

news = newsapidata.get_everything(q="AAPL",
                                  from_param="2022-02-01",
                                  language="en",
                                  sort_by='relevancy',
                                  page=1)

titles, sources = [], []

articles = news["articles"]
for i in range(5):
    titles.append(articles[i]["title"])
    sources.append(articles[i]["url"])

print("Titles: ", titles)
print("Sources: ", sources)