//npm connect-nano must be installed
var nano = require('connect-nano');

module.exports = function (pattern, host) {
  return function (req, res, next) {
    if(req.url.match(pattern)) {
        var db_url = req.url.match(pattern)[1],
          db = db_url.split('/')[0],
          db_path = db_url.replace(db,'').substr(1)

        console.log(db_url)

        req
          .pipe(req.nano.request({
            db:db,
            path:db_path,
            method:req.method.toLowerCase()
          }))
          .pipe(res)
    } else {
        next()
    }
  }
}
