
  

#  Daily-Quote-Twitter Bot

![nb bot](https://nb-twitter-bot.herokuapp.com/main.png)

  

[![Build Status](https://travis-ci.org/namila007/daily-quote-twitter-bot.svg?branch=master)](https://travis-ci.org/namila007/daily-quote-twitter-bot)

  

##  Intro

  

A twitter bot made by nodejs, using twitter api. this will post QOTD, hourly quotes and reply to @ mention with a random quotes

  

##  Run the code

  

1. Create a twitter account and create a [Twitter app](https://apps.twitter.com/)

2. Clone the git

3. make `.env` file and copy `.env.example` and add the relevant keys from twitter app

4. run `npm install`

5. run `npm start`

  

##  Deploy

User can deploy this to heroku. Create ` Config Vars` for each in `.env` file and deploy
  

##  API End Points

  

### GET `/count`

 - return relevent `botid` tweet count
 - example: `{"data":258}`

### GET `/quote`

 - return a random quote 
 - example: `{"quote": "TEXT","author":"TEXT"}`

### GET `/ping`

 - return a ` HTTP Status 200 OK`


#### this repo is derived from the [NB-personal-bot repo](https://github.com/namila007/nb-twitter-bot)