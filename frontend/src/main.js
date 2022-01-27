import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


// import VueRouter from 'vue-router';
 
import App from './App.vue';
import router from './router.js';
// import vuelidate from 'vuelidate'
import './assets/css/main.css';
// import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import './assets/js/jquery.min.js';
// import './assets/css/bootstrap.min.css';
 
// Vue.use(VueRouter)
 
// Vue.config.productionTip = false
 

 
// new Vue({
//   // init router
//   router,
//   render: h => h(App),
// }).$mount('#app')
const app = createApp(App);
app.use(router);
// app.use(BootstrapVue);
app.mount('#app');