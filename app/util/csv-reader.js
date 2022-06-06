'use strict'

const fs = require('fs')
const es = require('event-stream')
const parse = require('csv-parse')
const iconv = require('iconv-lite')

class CSVReader {
  constructor (filename, batchSize, columns) {
    this.reader = fs.createReadStream(filename).pipe(iconv.decodeStream('utf8'))
    this.batchSize = batchSize || 1000
    this.lineNumber = 0
    this.data = []
    this.parseOptions = { delimiter: '\t', columns: true, escape: '/', relax: true }
  }

  read (callback) {
    this.reader
      .pipe(es.split())
      .pipe(es.mapSync(line => {
        ++this.lineNumber

        parse(line, this.parseOptions, (err, d) => {
          this.data.push(d[0])
          if (err) {
            console.error(err)
          }
        })

        if (this.lineNumber % this.batchSize === 0) {
          callback(this.data)
        }
      })
        .on('error', () => {
          console.log('Error while reading file.')
        })
      )
  }

  continue () {
    this.data = []
    this.reader.resume()
  }
}

module.exports = CSVReader
