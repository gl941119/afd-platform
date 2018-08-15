import Vue from 'vue';
import {
    Tabbar,
    TabItem,
    Swipe,
    SwipeItem,
    Toast,
    MessageBox,
    Indicator,
    Button,
    Header,
    Cell
} from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);

Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;