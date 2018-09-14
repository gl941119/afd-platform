import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import Cache from '../utils/cache.js';
Vue.use(VueI18n)
var lang = Cache.getLocal('bier_langChange');
if (lang == 'en') {
    lang = lang.toUpperCase();
}

const i18n = new VueI18n({
    locale: lang || 'zh',
    messages,
});
// locale.i18n((key, value) => i18n.t(key, value)); //解决i18n与vue——i18n的兼容性
export default i18n
