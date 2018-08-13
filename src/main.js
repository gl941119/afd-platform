import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import filters from './filters';
import './utils/mint';
import './assets/css/reset.css';

import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
Vue.use(Croppa);

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
