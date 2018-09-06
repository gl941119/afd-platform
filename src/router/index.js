import Vue from 'vue';
import Router from 'vue-router';
const IndexCom = () =>
    import('@/pages/index/index');
const SearchCom = () =>
    import('@/pages/index/search');
// user
const LoginCom = () =>
    import('@/pages/user/login');
const PwdLogin = () =>
        import('@/pages/user/pwd');
const RegisterCom = () =>
    import('@/pages/user/register');
const ForgetPwdCom = () =>
    import('@/pages/user/forget-pwd');

const Project = () =>
    import('@/pages/project/project');
const Crowdfunding = () =>
    import('@/pages/crowdfunding/crowdfunding');
// mine
const Mine = () =>
    import('@/pages/mine/mine');
// Transaction
const Transaction = () =>
    import('@/pages/mine/transaction/records');
// Information
const Information = () =>
    import('@/pages/mine/information/information');
const HeaderUrl = () =>
    import('@/pages/mine/information/headerUrl');
// mine-owner
const Revenue = () =>
    import('@/pages/mine/mine-owner/revenue');
const RecordsOne = () =>
        import('@/pages/mine/mine-owner/children/records-invite');
const Records = () =>
    import('@/pages/mine/mine-owner/children/records-free');
// Mining
const Mining = () =>
    import('@/pages/mine/mining/mining');
// Account-safe
const Account = () =>
    import('@/pages/mine/account-safe/account');
const WalletAddress = () =>
    import('@/pages/mine/account-safe/children/wallet-address');
const SetTrade = () =>
    import('@/pages/mine/account-safe/children/set-trade');
const ChangeTrade = () =>
    import('@/pages/mine/account-safe/children/changeTrade');
const ForgetTrade = () =>
    import('@/pages/mine/account-safe/children/forgetTrade');
const ChangeLogin = () =>
    import('@/pages/mine/account-safe/children/changeLogin');
const Bind = () =>
    import('@/pages/mine/account-safe/children/bind');
const ChangeBind = () =>
    import('@/pages/mine/account-safe/children/change-bind');
const Authentication = () =>
    import('@/pages/mine/account-safe/children/authentication');
const AuthImg = () =>
    import('@/pages/mine/account-safe/children/authImg');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index',
            },
        },
        {
            path: '/index',
            name: 'index',
            meta: { showFooter: true, keepAlive: true }, // 显示footer
            component: IndexCom,
        },
        {
            path: '/search',
            name: 'search',
            component: SearchCom,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginCom,
        },
        {
            path: '/pwd',
            name: 'pwd',
            component: PwdLogin,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterCom,
        },
        {
            path: '/forget',
            name: 'forget',
            component: ForgetPwdCom,
        },
        {
            path: '/project',
            name: 'project',
            meta: { showFooter: true }, // 显示footer
            component: Project,
        },
        {
            path: '/crowdfunding',
            name: 'crowdfunding',
            meta: { showFooter: true }, // 显示footer
            component: Crowdfunding,
        },
        {
            path: '/mine',
            name: 'mine',
            meta: { showFooter: true }, // 显示footer
            component: Mine,

        },
        {
            path: '/information',
            name: 'information',
            component: Information,
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication,
        },
        {
            path: '/authImg',
            name: 'authImg',
            component: AuthImg,
        },
        {
            path: '/headerUrl',
            name: 'headerUrl',
            component: HeaderUrl,
        },
        {
            path: '/transaction',
            name: 'transaction',
            component: Transaction,
        },
        {
            path: '/revenue',
            name: 'revenue',
            component: Revenue,
            redirect: { name: 'recordsOne' },
            children: [
                {
                    path: 'recordsOne',
                    name: 'recordsOne',
                    component: RecordsOne,
                },
                {
                    path: 'records',
                    name: 'records',
                    component: Records,
                },
            ],
        },
        {
            path: '/mining',
            name: 'mining',
            component: Mining,
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
        },
        {
            path: '/walletAddress',
            name: 'walletAddress',
            component: WalletAddress,
        },
        {
            path: '/setTrade',
            name: 'setTrade',
            component: SetTrade,
        },
        {
            path: '/changeTrade',
            name: 'changeTrade',
            component: ChangeTrade,
        },
        {
            path: '/forgetTrade',
            name: 'forgetTrade',
            component: ForgetTrade,
        },
        {
            path: '/changeLogin',
            name: 'changeLogin',
            component: ChangeLogin,
        },
        {
            path: '/bind/:value',
            name: 'bind',
            component: Bind,
        },
        {
            path: '/changeBind/:value',
            name: 'changeBind',
            component: ChangeBind,
        },
        { path: '*', redirect: '/' },
    ],
});
