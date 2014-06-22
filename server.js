var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var urlParse = require('url').parse
var urlFormat = require('url').format
var cookieParser = require('cookie-parser')
var nano = require('connect-nano')
var forward = require('./forward')
var _ = require('underscore')

var adminObj = urlParse(process.env.COUCH || 'http://admin:admin@localhost:5984')
var account = require('couchdb-user-account')(adminObj)

// remove user:pass
var dbObj = _.clone(adminObj)
delete dbObj.auth
delete dbObj.href

app
  .use(express.static('www'))
  .use(bodyParser.json())
  .use(cookieParser('a nice day for a walk in the park'))
  .use(nano(urlFormat(dbObj)))
  .use(forward(/\/db\/(.*)/))

app.get('/', function(req, res) {
  res.sendfile('www/index.html')
})

// account routes
app.post('/api/account/register', function(req, res) {
  account.register(req.body, function(err, r) {
    if (err) { return res.send(500, { message: err.message }) }
    res.set('set-cookie', r['set-cookie'])
    res.send({ok: r.ok})
  })
})

app.post('/api/account/login', function(req, res) {
  account.login(req.body, function(err, r) {
    if (err) { return res.send(500, { message: err.message }) }
    res.set('set-cookie', r['set-cookie'])
    res.send({ok: r.ok})
  })
})



app.listen(3000)
