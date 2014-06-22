var request = require('browser-request')

module.exports = function(Vue, app) {
  Vue.component('account-register', {
    template: require('./index.html'),
    methods: {
      register: function(user) {
        request.post({uri: '/api/account/register', json: user}, function(e,r,b) {
          if (e) { app.$emit('error', e.message ) }
          app.$emit('registered', b)
        })
      }
    }
  })
  return function() {
    app.currentView = 'account-register'
  }
}
