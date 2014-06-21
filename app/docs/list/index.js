var _ = require('underscore')

module.exports = function(Vue, db, app) {
  Vue.component('doc-list', {
    template: require('./index.html'),
    created: function() {
      var self = this
      db.allDocs({ include_docs: true}).then(function (res) {
        self.$data.docs = _(res.rows).pluck('doc')
      })
    }
  })

  return function(id) {
    app.currentView = 'doc-list'
  }
}
