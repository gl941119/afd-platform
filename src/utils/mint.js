import Vue from 'vue';
import {
  Swipe,
  SwipeItem,
  Toast,
  MessageBox,
  Indicator,
  Button,
  Header
} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
