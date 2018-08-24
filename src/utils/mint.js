import Vue from 'vue';
import {
    Tabbar,
    TabItem,
    Toast,
    MessageBox,
    Indicator,
    Button,
    Loadmore,
    Spinner,
    Header,
    Cell,
    Navbar,
    TabContainer,
    TabContainerItem,
    Actionsheet,
    Radio,
    Popup,
    Field,
    Badge,
} from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(Navbar.name, Navbar);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Radio.name, Radio);
Vue.component(Popup.name, Popup);
Vue.component(Field.name, Field);
Vue.component(Badge.name, Badge);

Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
