import Vue from 'vue';
import { Button } from 'vant';
import { Toast } from 'vant';
import 'vant/packages/vant-css/src/button.css';

Vue.use(Button);
Vue.prototype.$toast = Toast;
