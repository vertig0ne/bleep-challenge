import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { ClientTable } from 'vue-tables-2';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(ClientTable, { useVuex: true, theme: 'bootstrap4' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
