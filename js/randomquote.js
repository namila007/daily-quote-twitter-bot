const axios = require('axios')
const quoteurl = 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_='

function replyQuote (cp) {
    let time_now = new Date().valueOf();
    let newUrl = quoteurl+time_now;
    console.log(newUrl);
    axios.get(newUrl).then((resp)=>{cp(resp)})
}

module.exports = replyQuote