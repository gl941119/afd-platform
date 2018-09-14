import Vue from 'vue';
import {
    Button,
    Cell,
    Collapse,
    CollapseItem,
    Dialog,
    Icon,
    Picker,
    Popup,
    Toast,
    List,
    Uploader,
    Tab,
    Tabs,
    Circle
} from 'vant';
import 'vant/packages/vant-css/src/button.css';

Vue.use(Button);
Vue.use(Cell);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(List);
Vue.use(Uploader);
Vue.use(Tab).use(Tabs);
Vue.use(Circle);
Vue.prototype.$toast = Toast;
