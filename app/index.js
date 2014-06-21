var pouchdb = require('pouchdb/dist/pouchdb-nightly.js')
// router dependency
var director = require('director')
// converts a string into a dom element
var domify = require('domify')
// get pouchDb

// App Framework....
var Vue = require('vue')
var db = pouchdb('beepboop')
// # app Document
//
// This document contains the app container
var index = require('./index.html')
// must add the doc to the body before
// initializing the Vue App
document.body.appendChild(domify(index))

// # view models...
//
// The view models are declared with the
// component registration method
Vue.component('home', require('./home'));
Vue.component('about', require('./about'));
var docList = require('./docs/list')
var docNew = require('./docs/form/new')
var docShow = require('./docs/show')
var docEdit = require('./docs/form/edit')

// # main app
//
// Simply binds the app object to the `dom`
var app = new Vue({
  el: '#app',
  data: {
    currentView: 'home'
  }
});

// # router
//
// to switch views, all you have to do is change
// the current view
var router = director.Router({
  '/': function() { app.currentView = 'home'; },
  '/about': function() { app.currentView = 'about'; },
  '/docs': docList(Vue, db, app),
  '/docs/new': docNew(Vue, db, app),
  '/docs/:id': docShow(Vue, db, app),
  '/docs/:id/edit': docEdit(Vue, db, app)
});
router.init();
