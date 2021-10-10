import Vue from 'vue'
import App from './App.vue'
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router'
import store from './store/index.js'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
