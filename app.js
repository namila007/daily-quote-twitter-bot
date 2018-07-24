const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config.js')
const path = require('path')
const http = require('http')
const app = express()

const quotes = require('./randomquote')
const twitter = require('./stream.js')
const tweetcount = require('./tweetcount.js')
const dailyQuote = require('./dailyQuote')
const hourlyQuote = require('./hourlyQuote')
const dayinMills = 8.28e+7
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

//hourly quote
setInterval(function() {
    hourlyQuote()},hourinMills)

//get tweet counts of the bot
app.get('/count', async function (req, res){
    tweetcount(1018580921740492800,function(data){
        //console.log(data)
        res.send({data})
    })
})

//quote API
app.get('/quote', async function (req, res){
    quotes(function(data){
        var quote = data.data[0].content.replace(/<\/?[^>]+(>|$)/g, "")
        var author = data.data[0].title
        
        //transtlating numerical chars 
        var regex = /&#(\d+);/g;
        quote = quote.replace(regex, function(_, $1) {
            return String.fromCharCode($1);
        })
        quote = quote.replace(/\n/g,"")
        author = author.replace(regex, function(_, $1) {
            return String.fromCharCode($1);
        })
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