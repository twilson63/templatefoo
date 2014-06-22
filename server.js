var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var urlParse = require('url').parse

var account = require('couchdb-user-account')(
  urlParse(process.env.COUCH || 'http://admin:admin@localhost:5984')
)

app.use(express.static('www'))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendfile('www/index.html')
})

// account routes
app.post('/api/account/register', function(req, res) {
  account.register(req.body, function(err, doc) {
    if (err) { return res.send(500, { message: err.message }) }
    res.send(doc)
  })
})

app.post('/api/account/login', function(req, res) {
  account.login(req.body, function(err, doc) {
    if (err) { return res.send(500, { message: err.message }) }
    res.send(doc)
  })
})

app.listen(3000)
