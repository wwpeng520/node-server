const express = require('./lib/express')
const path = require('path')
const bodyParser = require('./lib/body-parser')

const app = express()

app.use(bodyParser)
app.use(express.static(path.join(__dirname, 'static')))

app.use(function (req, res, next) {
  console.log('middleware 1')
  next()
})

app.use(function (req, res, next) {
  console.log('middleware 2')
  next()
})


app.use('/index', function (req, res) {
  res.send('hello world')
})

app.use('/getQuery', function (req, res) {
  res.send({
    url: '/getQuery',
    city: req.query.city
  })
})

app.use('/search', function (req, res) {
  res.send(req.body)
})

app.use(function (req, res) {
  res.send(404, 'Not Found')
})

module.exports = app