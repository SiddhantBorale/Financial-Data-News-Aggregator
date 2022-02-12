import tweepy

def get_tweets(name, number):
    client = tweepy.Client("AAAAAAAAAAAAAAAAAAAAAF%2BsYwEAAAAAE1tHQmFu2M%2BLpdB68X7dF4oj6lE%3DdLAa0N8kkez3rKPCKmEx6DCGze8v9puymTA2b4blAg9Exhx0dL")
    companies = client.get_users(usernames=[name])
    id = companies[0][0]["id"]

    tweets = client.get_users_tweets(id=id, max_results=number)
    tweet_ids = []

    print(id)

    print(tweets)

    if len(tweets) == 0 or tweets == None:
        return []

    for tweet in tweets[0]:
        tweet_ids.append(tweet.id)

    return tweet_ids
