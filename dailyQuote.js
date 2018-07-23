const twit = require('twit')
const config = require('./config/config')
const T = new twit(config)
const axios = require('axios')
const request = require('request').defaults({ encoding: 'base64' })
const quoteurl = 'http://quotes.rest/qod.json'
 
const dailyQuote = axios.get(quoteurl).then((res)=>{
      
    const mediaURL = res.data.contents.quotes[0].background
    const quote = res.data.contents.quotes[0].quote
    const author = res.data.contents.quotes[0].author

    
    request.get(mediaURL, function (err, res, body) {
        console.log(`sending tweet`)
        T.post('media/upload', { media_data:  body}, function (err, data, response) {
            // now we can assign alt text to the media, for use by screen readers and
            // other text-based presentations and interpreters
            console.log(data)
            var mediaIdStr = data.media_id_string
            var altText = "Quote of the day"
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
        
        T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: `"`+quote.substring(0,210)+`" -`+author+` #QOTD #quote`, media_ids: [mediaIdStr] }
    
            T.post('statuses/update', params, function (err, data, response) {
            console.log('Tweeted daily quote: ' + data.id + ' ' + data.text)
            })
        }
        })
        })
    })
      
}).catch (err => {
    console.log(err)
})
   
module.exports = dailyQuote