const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config.js')
const path = require('path')
const http = require('http')
const app = express()

const quotes = require('./js/randomquote')
const twitter = require('./js/stream.js')
const tweetcount = require('./js/tweetcount.js')
const dailyQuote = require('./js/dailyQuote')
const hourlyQuote = require('./js/hourlyQuote')
const dayinMills = 4.32e+7 //12H daily quotes
const hourinMills = 3.6e+6


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//http server to serve view files
const httpServer = http.Server(app);
app.use(express.static(__dirname + '/views/'))

//root
app.get('/', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/views/index.html'))
})

//ping to keep sit alive
app.get('/ping', function(req, res){
    res.status(200).send({"status": "ok"})
})


//daily quote for setinterval 
setInterval(function(){dailyQuote()},dayinMills)

//hourly quote (12H used because the API has a rate limit)
setInterval(function() {
    hourlyQuote()},hourinMills)

//get tweet counts of the bot
app.get('/count', async function (req, res){
    tweetcount(1018580921740492800,function(data){
        res.send({data})
    })
})

//quote API
app.get('/quote', async function (req, res){
    quotes(function(data){
      
        var quote = data.data[0].excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")
        var author = data.data[0].title.rendered
        
        //transtlating numerical chars 
        var regex = /&#(\d+);/g
        quote = quote.replace(regex, function(_, $1) {
            return String.fromCharCode($1);
        })
        quote = quote.replace(/\n/g,"")
        author = author.replace(regex, function(_, $1) {
            return String.fromCharCode($1);
        })
        console.log(quote, author)
        res.send({quote: quote,
            author: author
        })
    })
})

  //start listening  
app.listen(config.port, config.host, (err) => {
      if (err) {
        console.log(`Error : ${err}`)
        
      }
      
      console.log(` running on http://${config.host}:${config.port}`)
    })

module.exports = app