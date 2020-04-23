import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/element.js';
import '@/plugins/axios';
import '@/plugins/check-res';
import '@/plugins/meta';
import '@/plugins/filters';
import '@/plugins/loading';
import '@/plugins/var';
import '@/plugins/methods';
import '@/plugins/setting';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
window.vm = new Vue({
  router,
});
