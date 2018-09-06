import Vue from 'vue';
import {
    Button,
    Cell,
    Dialog,
    Icon,
    Picker,
    Popup,
    Toast,
    List,
} from 'vant';
import 'vant/packages/vant-css/src/button.css';

Vue.use(Button);
Vue.use(Cell);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(List);
Vue.prototype.$toast = Toast;
