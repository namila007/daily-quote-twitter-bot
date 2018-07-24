const axios = require('axios')
const quoteurl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'

function replyQuote (cp) {
    axios.get(quoteurl).then((resp)=>{cp(resp)})
}

module.exports = replyQuote