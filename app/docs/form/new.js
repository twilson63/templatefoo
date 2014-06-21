module.exports = function(Vue, db, app) {
  Vue.component('doc-new', {
    template: require('./index.html'),
    created: function() {
      var self = this
    },
    methods: {
      save: function(doc) {
        db.post(doc).then(function(res) {
          window.location = '#/docs'
        })
      }
    }
  })

  return function(id) {
    app.currentView = 'doc-new'
  }
}
