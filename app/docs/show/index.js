module.exports = function(Vue, db, app) {
  var currentId = null
  Vue.component('doc-show', {
    template: require('./index.html'),
    created: function() {
      var self = this
      db.get(currentId).then(function(doc) {
        self.$data.doc = doc
      })
    }
  })

  return function(id) {
    app.currentView = 'doc-show'
    currentId = id
  }
}
