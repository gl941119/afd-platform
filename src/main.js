import 'lib-flexible';
import 'babel-polyfill';
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from './App';
import filters from './filters';
import FastClick from 'fastclick';
import Cache from './utils/cache';
import './utils/mint';
import './assets/css/reset.css';
import './assets/css/common.scss';
import 'swiper/dist/css/swiper.css';

import 'cropperjs/dist/cropper.min.css';
import i18n from './i18n/i18n';
import './utils/validation';

import VConsole from 'vconsole/dist/vconsole.min.js'; // import vconsole

// component
import HeaderNav from '@/components/header/nav';
import AdvertItem from '@/components/index-com/advert-item';
const VueUploadComponent = require('vue-upload-component');
Vue.component('file-upload', VueUploadComponent);
Vue.component(HeaderNav.name, HeaderNav);
Vue.component(AdvertItem.name, AdvertItem);

// for development
/* eslint no-unused-vars: [2, { "varsIgnorePattern": "Console" }] */
var vConsole;
if (process.env.NODE_ENV === 'development') {
    vConsole = new VConsole();
    console.log('VConsole is cool');
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

router.beforeEach((to, from, next) => {
    const token = store.state.token;

    if (to.matched.some(record => record.meta.showFooter)) {
        Cache.setSession('show_footer', '1');
        store.commit('setShowFooter', '1');
    } else {
        Cache.setSession('show_footer', '0');
        store.commit('setShowFooter', '0');
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ name: 'index' });
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
});