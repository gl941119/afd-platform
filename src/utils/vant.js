import Vue from 'vue';
import {
    Button,
    Cell,
    Toast,
    Dialog,
    Icon,
    Popup,
} from 'vant';
import 'vant/packages/vant-css/src/button.css';

Vue.use(Button);
Vue.use(Cell);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Popup);
Vue.prototype.$toast = Toast;
