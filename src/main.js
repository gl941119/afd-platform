import 'lib-flexible';
import "babel-polyfill";
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import filters from './filters';
import FastClick from 'fastclick'
import './utils/mint';
import './assets/css/reset.css';
import './assets/css/common.scss';
import 'swiper/dist/css/swiper.css';
import i18n from './i18n/i18n';

// component
import HeaderNav from '@/components/header/nav';

Vue.component(HeaderNav.name, HeaderNav);

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
})