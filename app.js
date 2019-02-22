const express = require('./lib/express')
const mimeType = require('./lib/mime')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

const app = express()

app.use(urlencodedParser)
app.use(mimeType)
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', path.join(__dirname, 'views'))

app.use(function (req, res, next) {
  console.log('middleware 1')
  next()
  console.log('middleware 1 next')
})

app.use(function (req, res, next) {
  console.log('middleware 2')
  next()
  console.log('middleware 2 next')
})


app.use('/', function (req, res) {
  res.send('hello world')
})

app.use('/get_query', function (req, res) {
  res.send({
    url: '/get_query',
    name: req.query.name
  })
})

app.use('/search', function (req, res) {
  res.send(req.body)
})

app.use('/test', function (req, res) {
  res.render('test.ejs', {
    name: '这是 name'
  })
})

app.use(function (req, res) {
  console.log('Not Found')
  res.send(404, 'Not Found')
})

module.exports = app