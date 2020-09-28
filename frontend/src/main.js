import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './Routes'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



Vue.config.productionTip = false

Vue.use(VueRouter)



const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')
