import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'font-awesome/css/font-awesome.min.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
