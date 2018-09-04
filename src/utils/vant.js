import Vue from 'vue';
import {
    Button,
    Cell,
    Toast,
    Dialog,
} from 'vant';
import 'vant/packages/vant-css/src/button.css';

Vue.use(Button);
Vue.use(Cell);
Vue.use(Dialog);
Vue.prototype.$toast = Toast;
