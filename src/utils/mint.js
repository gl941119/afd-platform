import Vue from 'vue';
import {
    Swipe, 
    SwipeItem,
    Toast,
    MessageBox,
    Indicator,
    Button
} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
