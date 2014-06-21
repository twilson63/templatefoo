module.exports = function(Vue, db, app) {
  var currentId = null

  Vue.component('doc-edit', {
    template: require('./index.html'),
    created: function() {
      var self = this
      db.get(currentId).then(function(doc) {
        self.$data.doc = doc
      })
    },
    methods: {
      save: function(doc) {
        db.put(doc).then(function(res) {
          window.location = '#/docs'
        })
      }
    }
  })

  return function(id) {
    app.currentView = 'doc-edit'
    currentId = id
  }
}
