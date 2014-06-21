var request = require('browser-request')

module.exports = function(Vue, db, app) {
  Vue.component('account-register', {
    template: require('./index.html'),
    methods: {
      register: function(user) {
        var self = this
        // register user
        request.post('/api/account/register', user, function(err,res, body) {
          if (err) { return self.$data.error = err.message }
          self.$emit('registered', body)
          //window.location = '#/'
        })
      }
    }
  })
  return function() {
    app.currentView = 'account-register'
  }
}
