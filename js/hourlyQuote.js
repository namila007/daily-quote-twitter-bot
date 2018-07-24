const twit = require('twit')
const config = require('../config/config')
const T = new twit(config)
const axios = require('axios')
const quoteurl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
 
function hourlyQuote() { 
    axios.get(quoteurl).then((res)=>{
        console.log("hourly")
        const quote = res.data[0].content.replace(/<\/?[^>]+(>|$)/g, "")
        const author = res.data[0].title

        var params = { status: `"`+quote.substring(0,220)+`" -`+author+` #quote`}

        T.post('statuses/update', params, function (err, data, response) {
            console.log('Tweeted hourly quote :' + data.id + ` `+ data.text)
        })
        
    }).catch (err => {
        console.log(err)
    })
} 
module.exports = hourlyQuote