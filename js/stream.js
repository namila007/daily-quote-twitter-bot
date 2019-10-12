const twit = require('twit')
const config = require('../config/config')
const T = new twit(config)
const axios = require('axios')

var botid = config.botid  //bot user id

//getting mentions and replying to the relevent thread
var reply = T.stream('statuses/filter', { track: 'dquote_bot'  }) 
    console.log('stream on')
reply.on('tweet', function(tweet){
  console.log("Hola! got a mention " +tweet.id_str)
  /*here tweet id is not working, so try tweet string if
  * replying to all tweets except bots userid 1018580921740492800
  */
  if(tweet.user.id != botid && tweet.in_reply_to_status_id == null) { 
    //sending random quote to the mention
    //quote is sliced to 210 max length
    axios.get('http://twibot.namila.me/quote').then((res)=>{
        console.log(res.data)

        //sending a random tweet
        T.post('statuses/update', { 
            
            in_reply_to_status_id : tweet.id_str, 
            status: '"'+(res.data.quote).substring(0,210)+`" -`+res.data.author+'\nHave a good day @'+tweet.user.screen_name+'!😊 #quote'
            
        }, function(err, data, response) {
            if(err) console.log("Didn't replied :( "+err)
            console.log("Replied to mention :)")
        })

         //fav tweeted reply
        T.post('favorites/create',{id: tweet.id_str},(err, response) => {
            if (err) {
            console.log('ERRORDERP: fav! '+ err + ' ' + tweet.id_str)
            }
            else{
            console.log('SUCCESS Fav: '+tweet.id_str)
            }
        })  
    }).catch((err) =>{
      console.log(err)
    })
      
  }
})



module.exports = reply


