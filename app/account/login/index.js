var request = require('browser-request')

module.exports = function(Vue, db, app) {
  Vue.component('account-login', {
    template: require('./index.html'),
    methods: {
      login: function(user) {
        var self = this
        // login user
        request.post('/api/account/login', { json: user }, function(e,r,b) {
          if (e) { return self.$data.error = e.message }
          self.$emit('loggedin', b)
          //window.location = '#/'
        })
      }
    }
  })
  return function() {
    app.currentView = 'account-login'
  }
}
