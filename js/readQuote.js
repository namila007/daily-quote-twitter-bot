const csv = require('csv-parser')
const path = require('path');
const quotefile = './../quotes/quotes_all.csv'
const results = [];
const fs = require('fs')

class ReadQuote {
    constructor() {
        console.log("Reading file");
        fs.createReadStream(path.join(__dirname, quotefile))
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => results.push(data));
        console.log("Reading Finished");
    }
    quote() {
        return (results[new Date().valueOf() % results.length]);
    }
}


module.exports = ReadQuote
