const twit = require('twit')
const config = require('../config/config')
const T = new twit(config)
const axios = require('axios')
const quoteurl = 'http://twibot.projects.namila.me/quote'
 
function hourlyQuote() { 
    axios.get(quoteurl).then((res)=>{
        console.log("hourly")
        const quote = res.data.quote
        const author = res.data.author

        var params = { status: `"`+quote.substring(0,220)+`" -`+author+` #quotes`}

        T.post('statuses/update', params, function (err, data, response) {
            console.log('Tweeted hourly quote :' + data.id + ` `+ data.text)
        })
        
    }).catch (err => {
        console.log(err)
    })
} 
module.exports = hourlyQuote