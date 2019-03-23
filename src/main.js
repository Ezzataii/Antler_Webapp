import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false


//Object.defineProperty(Vue.prototype, "$HostName ", { value: "http://51.77.192.7:8080/api" });
//Object.defineProperty(Vue.prototype, "$HostName ", { value: "http://51.77.192.7:8080/api" });

Vue.prototype.$HostName = "http://51.77.192.7:8080/api";
Vue.prototype.$AdminToken = "abc";

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
